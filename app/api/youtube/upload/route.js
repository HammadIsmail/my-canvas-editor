import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { Readable } from 'stream'

export async function POST(request) {
  console.log('=== YouTube Upload API Called ===')
  
  try {
    // Get the session
    const session = await getServerSession(authOptions)
    console.log('Session:', session ? 'Found' : 'Not found')
    console.log('Access Token:', session?.accessToken ? 'Present' : 'Missing')
    
    if (!session?.accessToken) {
      console.log('No session or access token')
      return NextResponse.json({ error: 'Unauthorized - No session or access token' }, { status: 401 })
    }

    // Set up OAuth2 client
    console.log('Setting up OAuth2 client...')
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    )

    oauth2Client.setCredentials({
      access_token: session.accessToken,
      refresh_token: session.refreshToken
    })

    // Create YouTube service
    console.log('Creating YouTube service...')
    const youtube = google.youtube({
      version: 'v3',
      auth: oauth2Client
    })

    // Get form data
    console.log('Getting form data...')
    const formData = await request.formData()
    const file = formData.get('video')
    const title = formData.get('title')
    const description = formData.get('description')
    const tags = formData.get('tags')
    const privacy = formData.get('privacy') || 'private'

    console.log('Form data received:', {
      hasFile: !!file,
      fileName: file?.name,
      fileType: file?.type,
      fileSize: file?.size,
      title,
      description: description?.substring(0, 50) + '...',
      privacy
    })

    if (!file) {
      console.log('No video file provided')
      return NextResponse.json({ error: 'No video file provided' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('video/')) {
      return NextResponse.json({ error: 'Invalid file type. Please upload a video file.' }, { status: 400 })
    }

    // Convert file to buffer and create stream
    console.log('Converting file to stream...')
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    console.log('Buffer size:', buffer.length)

    // Create a readable stream from buffer
    const stream = new Readable({
      read() {}
    })
    stream.push(buffer)
    stream.push(null) // End the stream

    // Prepare upload parameters
    const uploadParams = {
      part: ['snippet', 'status'],
      requestBody: {
        snippet: {
          title: title || `Uploaded video ${new Date().toISOString()}`,
          description: description || 'Uploaded via API',
          tags: tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : [],
          categoryId: '22', // People & Blogs category
          defaultLanguage: 'en',
          defaultAudioLanguage: 'en'
        },
        status: {
          privacyStatus: privacy,
          embeddable: true,
          license: 'youtube',
          publicStatsViewable: true
        },
      },
      media: {
        mimeType: file.type,
        body: stream,
      },
    }

    console.log('Upload parameters:', {
      parts: uploadParams.part,
      title: uploadParams.requestBody.snippet.title,
      privacy: uploadParams.requestBody.status.privacyStatus,
      mimeType: uploadParams.media.mimeType
    })

    // Upload video
    console.log('Starting video upload...')
    const response = await youtube.videos.insert(uploadParams)

    console.log('Upload successful:', response.data.id)

    return NextResponse.json({
      success: true,
      videoId: response.data.id,
      videoUrl: `https://www.youtube.com/watch?v=${response.data.id}`,
      message: 'Video uploaded successfully!',
      details: {
        title: response.data.snippet.title,
        privacy: response.data.status.privacyStatus,
        publishedAt: response.data.snippet.publishedAt
      }
    })

  } catch (error) {
    console.error('=== YouTube upload error ===')
    console.error('Error message:', error.message)
    console.error('Error code:', error.code)
    console.error('Error status:', error.status)
    console.error('Full error:', JSON.stringify(error, null, 2))
    
    // Handle specific error cases
    if (error.code === 400) {
      return NextResponse.json({ 
        error: 'Invalid request parameters. Please check your video file and metadata.',
        details: error.message
      }, { status: 400 })
    }
    
    if (error.code === 401) {
      return NextResponse.json({ 
        error: 'Authentication failed. Please sign in again.',
        details: error.message
      }, { status: 401 })
    }
    
    if (error.code === 403) {
      return NextResponse.json({ 
        error: 'YouTube API access denied. Check your permissions and quota.',
        details: error.message
      }, { status: 403 })
    }
    
    if (error.code === 409) {
      return NextResponse.json({ 
        error: 'Upload conflict. This video might already exist.',
        details: error.message
      }, { status: 409 })
    }
    
    if (error.message?.includes('quota')) {
      return NextResponse.json({ 
        error: 'YouTube API quota exceeded. Please try again tomorrow.',
        details: error.message
      }, { status: 429 })
    }
    
    return NextResponse.json({ 
      error: 'Failed to upload video: ' + error.message,
      details: error.code ? `Error code: ${error.code}` : 'Unknown error'
    }, { status: 500 })
  }
}