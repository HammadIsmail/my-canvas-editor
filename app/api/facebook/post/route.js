
// app/api/facebook/post/route.js
import { getServerSession } from 'next-auth'
import { postToFacebookPage, getPageAccessToken } from '@/lib/facebook'

export async function POST(request) {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { pageId, message, scheduledTime } = await request.json()
    
    // Get page access token
    const pageAccessToken = await getPageAccessToken(session.accessToken, pageId)
    
    // Create post
    const postData = {
      message,
      scheduledTime,
      published: !scheduledTime // If scheduled, don't publish immediately
    }
    
    const result = await postToFacebookPage(pageId, pageAccessToken, postData)
    
    return Response.json({
      success: true,
      postId: result.id,
      message: scheduledTime ? 'Post scheduled successfully' : 'Post published successfully'
    })
  } catch (error) {
    console.error('API Error:', error)
    return Response.json(
      { error: 'Failed to create post' }, 
      { status: 500 }
    )
  }
}