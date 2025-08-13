import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Youtube, Facebook, User, LogOut, CheckCircle } from 'lucide-react'

export default function MultiProviderAuth() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Social Media Automation</h1>
        <p className="text-gray-600">Connect your social media accounts</p>
      </div>

      {session ? (
        <div className="space-y-4">
          {/* Current Session Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Current Session
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img 
                    src={session.user.image} 
                    alt={session.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{session.user.name}</p>
                    <p className="text-sm text-gray-500">{session.user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {session.provider === 'facebook' ? (
                          <Facebook className="h-3 w-3" />
                        ) : (
                          <Youtube className="h-3 w-3" />
                        )}
                        {session.provider === 'facebook' ? 'Facebook' : 'Google'}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button variant="outline" onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Platform Capabilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Facebook className="h-5 w-5 text-blue-600" />
                  Facebook Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {session.provider === 'facebook' ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">Connected & Ready</span>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1 ml-6">
                      <li>• Post to Facebook Pages</li>
                      <li>• Manage page content</li>
                      <li>• Read insights & analytics</li>
                      <li>• Instagram posting (if linked)</li>
                    </ul>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Sign in with Facebook to access:</p>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Post to Facebook Pages</li>
                      <li>• Instagram automation</li>
                      <li>• Page insights & analytics</li>
                    </ul>
                    <Button 
                      onClick={() => signIn('facebook')}
                      variant="outline"
                      size="sm"
                      className="w-full mt-2"
                    >
                      <Facebook className="mr-2 h-4 w-4" />
                      Connect Facebook
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Youtube className="h-5 w-5 text-red-600" />
                  YouTube Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {session.provider === 'google' ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">Connected & Ready</span>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1 ml-6">
                      <li>• Upload videos</li>
                      <li>• Manage video metadata</li>
                      <li>• Schedule publishing</li>
                      <li>• Access analytics</li>
                    </ul>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Sign in with Google to access:</p>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Video uploads</li>
                      <li>• Channel management</li>
                      <li>• YouTube analytics</li>
                    </ul>
                    <Button 
                      onClick={() => signIn('google')}
                      variant="outline"
                      size="sm"
                      className="w-full mt-2"
                    >
                      <Youtube className="mr-2 h-4 w-4" />
                      Connect Google
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Choose Your Platform</CardTitle>
            <CardDescription>
              Connect your social media accounts to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={() => signIn('facebook')}
              className="w-full"
              size="lg"
              variant="default"
            >
              <Facebook className="mr-2 h-4 w-4" />
              Sign in with Facebook
            </Button>
            <Button 
              onClick={() => signIn('google')}
              className="w-full bg-red-600 hover:bg-red-700"
              size="lg"
            >
              <Youtube className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}