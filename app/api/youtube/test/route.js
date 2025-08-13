import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function GET() {
  console.log('=== YouTube Test API Called ===')
  
  try {
    // Get the session
    const session = await getServerSession(authOptions)
    console.log('Session:', session ? 'Found' : 'Not found')
    
    if (!session?.accessToken) {
      return NextResponse.json({ 
        error: 'No session or access token',
        authenticated: false 
      }, { status: 401 })
    }

    // Set up OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    )

    oauth2Client.setCredentials({
      access_token: session.accessToken,
      refresh_token: session.refreshToken
    })

    // Create YouTube service
    const youtube = google.youtube({
      version: 'v3',
      auth: oauth2Client
    })

    // Test API access by getting channel info
    console.log('Testing YouTube API access...')
    const channelResponse = await youtube.channels.list({
      part: ['snippet', 'statistics'],
      mine: true
    })

    const channel = channelResponse.data.items?.[0]
    
    if (!channel) {
      return NextResponse.json({
        error: 'No YouTube channel found for this account',
        authenticated: true,
        hasChannel: false
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      authenticated: true,
      hasChannel: true,
      channel: {
        id: channel.id,
        title: channel.snippet.title,
        description: channel.snippet.description?.substring(0, 100) + '...',
        subscriberCount: channel.statistics?.subscriberCount || 'Hidden',
        videoCount: channel.statistics?.videoCount || '0',
        viewCount: channel.statistics?.viewCount || '0'
      },
      session: {
        user: session.user.name,
        email: session.user.email,
        provider: session.provider
      }
    })

  } catch (error) {
    console.error('YouTube test error:', error)
    
    return NextResponse.json({
      error: 'YouTube API test failed: ' + error.message,
      authenticated: !!session?.accessToken,
      errorCode: error.code,
      errorDetails: error.message
    }, { status: 500 })
  }
}