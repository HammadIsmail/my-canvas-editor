// app/api/facebook/pages/route.js
import { getServerSession } from 'next-auth'
import { getUserPages } from '@/lib/facebook'

export async function GET() {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const pages = await getUserPages(session.accessToken)
    return Response.json(pages)
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch pages' }, 
      { status: 500 }
    )
  }
}
