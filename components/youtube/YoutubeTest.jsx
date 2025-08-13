import React, { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Upload, Youtube, User, LogOut, CheckCircle, AlertCircle, TestTube } from 'lucide-react'

export default function YouTubeUploadTest() {
  const { data: session, status } = useSession()
  const [uploading, setUploading] = useState(false)
  const [testing, setTesting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [result, setResult] = useState(null)
  const [testResult, setTestResult] = useState(null)
  const [error, setError] = useState(null)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    privacy: 'private'
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const testYouTubeAPI = async () => {
    setTesting(true)
    setError(null)
    setTestResult(null)

    try {
      const response = await fetch('/api/youtube/test')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Test failed')
      }

      setTestResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setTesting(false)
    }
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    if (!file.type.startsWith('video/')) {
      setError('Please select a valid video file')
      return
    }

    const maxSize = 100 * 1024 * 1024 // 100MB limit for demo
    if (file.size > maxSize) {
      setError('File size must be less than 100MB for this demo')
      return
    }

    setUploading(true)
    setError(null)
    setResult(null)
    setUploadProgress(0)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('video', file)
      formDataToSend.append('title', formData.title || file.name)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('tags', formData.tags)
      formDataToSend.append('privacy', formData.privacy)

      // Simulate progress (real progress tracking requires more complex setup)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 500)

      const response = await fetch('/api/youtube/upload', {
        method: 'POST',
        body: formDataToSend,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      setResult(data)
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        tags: '',
        privacy: 'private'
      })
      event.target.value = ''

    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
      setTimeout(() => setUploadProgress(0), 2000)
    }
  }

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Youtube className="text-red-600" />
          YouTube Upload Test
        </h1>
        <p className="text-gray-600">Test YouTube API integration with video uploads</p>
      </div>

      {!session || session.provider !== 'google' ? (
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <User className="h-5 w-5" />
              Authentication Required
            </CardTitle>
            <CardDescription>
              {!session 
                ? "Sign in with Google to access YouTube upload functionality"
                : "Google authentication required for YouTube features. Please sign in with Google."
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              onClick={() => signIn('google')}
              className="w-full"
              size="lg"
            >
              <Youtube className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* User Info */}
          <Card>
            <CardContent className="pt-6">
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
                  </div>
                </div>
                <Button variant="outline" onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={testYouTubeAPI}
                  disabled={testing}
                >
                  <TestTube className="mr-2 h-4 w-4" />
                  {testing ? 'Testing...' : 'Test API'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upload Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Video
              </CardTitle>
              <CardDescription>
                Fill in the details and select a video file to upload to YouTube
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter video title..."
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter video description..."
                    rows={3}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    placeholder="tag1, tag2, tag3..."
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="privacy">Privacy</Label>
                  <Select value={formData.privacy} onValueChange={(value) => handleInputChange('privacy', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="unlisted">Unlisted</SelectItem>
                      <SelectItem value="public">Public</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="video">Video File</Label>
                  <Input
                    id="video"
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Max file size: 100MB (for demo purposes)
                  </p>
                </div>
              </div>

              {uploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Test Results */}
          {testResult && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-1">
                  <p className="font-medium">YouTube API Test Successful!</p>
                  <p className="text-sm">Channel: {testResult.channel?.title}</p>
                  <p className="text-sm">Videos: {testResult.channel?.videoCount}</p>
                  <p className="text-sm">Subscribers: {testResult.channel?.subscriberCount}</p>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Results */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-1">
                  <p className="font-medium">{result.message}</p>
                  <p className="text-sm">Video ID: {result.videoId}</p>
                  <a 
                    href={result.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View on YouTube →
                  </a>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  )
}