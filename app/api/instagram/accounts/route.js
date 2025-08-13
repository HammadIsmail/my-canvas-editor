import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.accessToken) {
      return Response.json({
        success: false,
        error: 'No access token found. Please sign in with Facebook.'
      }, { status: 401 })
    }

    const accessToken = session.accessToken
    
    // First get pages with Instagram accounts
    const pagesResponse = await fetch(
      `https://graph.facebook.com/v18.0/me/accounts?fields=instagram_business_account{id,username,account_type}&access_token=${accessToken}`
    )
    
    if (!pagesResponse.ok) {
      throw new Error(`Facebook API Error: ${pagesResponse.status}`)
    }
    
    const pagesData = await pagesResponse.json()
    const accounts = []
    
    // Get Instagram account details for each connected account
    for (const page of pagesData.data || []) {
      if (page.instagram_business_account) {
        const igResponse = await fetch(
          `https://graph.facebook.com/v18.0/${page.instagram_business_account.id}?fields=id,username,account_type,profile_picture_url&access_token=${accessToken}`
        )
        
        if (igResponse.ok) {
          const igData = await igResponse.json()
          accounts.push(igData)
        }
      }
    }
    
    return Response.json({
      success: true,
      accounts
    })
    
  } catch (error) {
    console.error('Instagram accounts error:', error)
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}