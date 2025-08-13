// /app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      authorization: {
        params: {
          scope: [
            'email',
            'public_profile',
            'pages_show_list',
            'pages_read_engagement',
            'pages_manage_posts',
            'pages_read_user_content',
            'pages_manage_cta',
            'read_insights'
          ].join(','),
        },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: [
            'openid',
            'email',
            'profile',
            'https://www.googleapis.com/auth/youtube.upload',
            'https://www.googleapis.com/auth/youtube'
          ].join(' '),
        },
      },
    }),
    // Fixed Slack Provider
    {
      id: "slack",
      name: "Slack",
      type: "oauth",
      clientId: process.env.SLACK_CLIENT_ID,
      clientSecret: process.env.SLACK_CLIENT_SECRET,
      authorization: {
        url: "https://slack.com/oauth/v2/authorize",
        params: {
          scope: [
            'channels:read',
            'chat:write',
            'users:read',
           
          
          ].join(','),
          user_scope: [
            'channels:read',
            'users:read',
          ].join(',')
        }
      },
      token: "https://slack.com/api/oauth.v2.access",
      userinfo: {
        url: "https://slack.com/api/users.identity",
        async request({ tokens }) {
          // Use the user token for identity, not bot token
          const userToken = tokens.access_token;
          
          const response = await fetch("https://slack.com/api/users.identity?token=" + userToken, {
            headers: {
              "Authorization": `Bearer ${userToken}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });
          
          const data = await response.json();
          console.log("Slack identity response:", data);
          
          if (!data.ok) {
            throw new Error(`Slack API error: ${data.error}`);
          }
          
          return data;
        },
      },
      profile(profile) {
        console.log("Processing Slack profile:", profile);
        
        // Handle the Slack profile structure properly
        if (!profile.ok) {
          throw new Error(`Slack profile error: ${profile.error}`);
        }
        
        const user = profile.user;
        if (!user || !user.id) {
          throw new Error("User ID not found in Slack profile");
        }
        
        return {
          id: user.id,
          name: user.name || user.real_name || "Slack User",
          email: user.email || null,
          image: user.image_192 || user.image_72 || user.image_48 || null,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        token.provider = account.provider;
        
        // Store Slack-specific tokens and data
        if (account.provider === 'slack') {
          token.slackBotToken = account.bot_token;
          token.slackUserToken = account.access_token;
          token.slackTeamId = account.team?.id;
          token.slackTeamName = account.team?.name;
          token.slackUserId = account.authed_user?.id;
          
          // Store additional team info if available
          if (account.team) {
            token.slackTeam = {
              id: account.team.id,
              name: account.team.name
            };
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expiresAt = token.expiresAt;
      session.provider = token.provider;
      
      // Add Slack data to session for easy access
      if (token.provider === 'slack') {
        session.slack = {
          botToken: token.slackBotToken,
          userToken: token.slackUserToken,
          teamId: token.slackTeamId,
          teamName: token.slackTeamName,
          userId: token.slackUserId,
          team: token.slackTeam
        };
      }
      
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === 'development',
  
  // Important: Handle ngrok URLs properly
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === 'development' ? '' : '__Secure-'}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NEXTAUTH_URL?.startsWith('https://') || false
      }
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };