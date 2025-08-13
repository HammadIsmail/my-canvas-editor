// /app/api/slack/test/route.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.provider !== 'slack') {
      return Response.json({ error: 'Slack authentication required' }, { status: 401 });
    }

    if (!session.slack?.botToken) {
      return Response.json({ error: 'Bot token not available' }, { status: 401 });
    }

    const { message, channel } = await request.json();
    
    if (!message || !channel) {
      return Response.json({ error: 'Message and channel are required' }, { status: 400 });
    }

    console.log('Sending message to Slack:', { channel, message: message.substring(0, 50) + '...' });
    
    // Send message using Slack Web API
    const response = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.slack.botToken}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        channel: channel,
        text: message,
        as_user: false
      })
    });

    const result = await response.json();
    console.log('Slack API response:', result);
    
    if (result.ok) {
      return Response.json({ 
        success: true, 
        message: 'Message sent successfully!',
        messageId: result.ts,
        channel: result.channel
      });
    } else {
      return Response.json({ 
        success: false,
        error: result.error || 'Unknown error',
        details: result 
      }, { status: 400 });
    }

  } catch (error) {
    console.error('Slack API error:', error);
    return Response.json({ 
      success: false,
      error: 'Internal server error',
      details: error.message 
    }, { status: 500 });
  }
}

// GET route to test connection and get channels
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.provider !== 'slack') {
      return Response.json({ error: 'Slack authentication required' }, { status: 401 });
    }

    if (!session.slack?.botToken) {
      return Response.json({ error: 'Bot token not available' }, { status: 401 });
    }

    console.log('Fetching Slack channels for team:', session.slack.teamName);

    // Get channels list - only public channels the bot is a member of
    const channelsResponse = await fetch('https://slack.com/api/conversations.list?types=public_channel,private_channel&exclude_archived=true', {
      headers: {
        'Authorization': `Bearer ${session.slack.botToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    const channelsResult = await channelsResponse.json();
    console.log('Channels API response:', channelsResult);

    if (!channelsResult.ok) {
      return Response.json({ 
        success: false,
        error: channelsResult.error || 'Failed to fetch channels',
        details: channelsResult 
      }, { status: 400 });
    }

    // Filter and format channels
    const channels = channelsResult.channels
      .filter(channel => !channel.is_archived)
      .map(channel => ({
        id: channel.id,
        name: channel.name,
        is_member: channel.is_member,
        is_private: channel.is_private,
        member_count: channel.num_members
      }))
      .sort((a, b) => {
        // Sort by membership first, then alphabetically
        if (a.is_member && !b.is_member) return -1;
        if (!a.is_member && b.is_member) return 1;
        return a.name.localeCompare(b.name);
      });

    // Also get user info to verify connection
    const userResponse = await fetch('https://slack.com/api/auth.test', {
      headers: {
        'Authorization': `Bearer ${session.slack.botToken}`,
      }
    });

    const userResult = await userResponse.json();
    
    return Response.json({ 
      success: true,
      channels,
      teamInfo: {
        id: session.slack.teamId,
        name: session.slack.teamName,
        botUserId: userResult.user_id,
        url: userResult.url
      },
      connectionStatus: userResult.ok ? 'connected' : 'error'
    });

  } catch (error) {
    console.error('Slack API error:', error);
    return Response.json({ 
      success: false,
      error: 'Internal server error',
      details: error.message 
    }, { status: 500 });
  }
}