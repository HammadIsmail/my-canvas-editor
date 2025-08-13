// lib/facebook.js
import axios from 'axios'

const FACEBOOK_GRAPH_URL = 'https://graph.facebook.com/v19.0'

// Get user's Facebook pages
export async function getUserPages(accessToken) {
  try {
    const response = await axios.get(`${FACEBOOK_GRAPH_URL}/me/accounts`, {
      params: {
        access_token: accessToken,
        fields: 'id,name,access_token,category,picture'
      }
    })
    return response.data.data
  } catch (error) {
    console.error('Error fetching user pages:', error)
    throw new Error('Failed to fetch Facebook pages')
  }
}

// Post to Facebook page
export async function postToFacebookPage(pageId, pageAccessToken, postData) {
  try {
    const endpoint = `${FACEBOOK_GRAPH_URL}/${pageId}/feed`
    
    const response = await axios.post(endpoint, {
      message: postData.message,
      access_token: pageAccessToken,
      published: postData.published || true,
      scheduled_publish_time: postData.scheduledTime ? Math.floor(new Date(postData.scheduledTime).getTime() / 1000) : undefined
    })
    
    return response.data
  } catch (error) {
    console.error('Error posting to Facebook:', error)
    throw new Error('Failed to post to Facebook')
  }
}

// Post with image to Facebook page
export async function postWithImageToFacebookPage(pageId, pageAccessToken, postData, imageUrl) {
  try {
    const endpoint = `${FACEBOOK_GRAPH_URL}/${pageId}/feed`
    
    const response = await axios.post(endpoint, {
      message: postData.message,
      link: imageUrl, // For external images
      access_token: pageAccessToken,
      published: postData.published || true,
      scheduled_publish_time: postData.scheduledTime ? Math.floor(new Date(postData.scheduledTime).getTime() / 1000) : undefined
    })
    
    return response.data
  } catch (error) {
    console.error('Error posting image to Facebook:', error)
    throw new Error('Failed to post image to Facebook')
  }
}

// Get page access token with extended permissions
export async function getPageAccessToken(userAccessToken, pageId) {
  try {
    const response = await axios.get(`${FACEBOOK_GRAPH_URL}/${pageId}`, {
      params: {
        fields: 'access_token',
        access_token: userAccessToken
      }
    })
    return response.data.access_token
  } catch (error) {
    console.error('Error getting page access token:', error)
    throw new Error('Failed to get page access token')
  }
}