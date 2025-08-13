// app/api/facebook/test/route.js
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const token = await getToken({ req });
    
    if (!token?.accessToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { endpoint, pageAccessToken } = await req.json();
    
    if (!endpoint) {
      return NextResponse.json({ error: 'Endpoint is required' }, { status: 400 });
    }

    // Use page access token if provided, otherwise use user access token
    const accessToken = pageAccessToken || token.accessToken;
    
    console.log('Making Facebook API call:', {
      endpoint,
      tokenLength: accessToken?.length,
      tokenPreview: accessToken ? `${accessToken.substring(0, 20)}...` : 'N/A'
    });

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${endpoint}?access_token=${accessToken}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error('Facebook API Error:', data.error);
      return NextResponse.json(
        { 
          error: 'Facebook API Error', 
          details: data.error.message,
          code: data.error.code,
          type: data.error.type
        }, 
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}