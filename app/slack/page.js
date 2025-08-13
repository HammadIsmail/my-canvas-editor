"use client";
import React, { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, AlertCircle, Clock, Send, Settings, BarChart3, MessageSquare, Users, Loader2 } from 'lucide-react';

export default function SlackAutomationDashboard() {
  const { data: session, status } = useSession();
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [channelsLoading, setChannelsLoading] = useState(false);
  const [scheduledPosts, setScheduledPosts] = useState([
    { id: 1, content: 'Weekly team update reminder', channel: '#general', time: '2025-07-26 09:00', status: 'scheduled' },
    { id: 2, content: 'New product feature announcement', channel: '#announcements', time: '2025-07-26 14:00', status: 'scheduled' }
  ]);
  const [automationRules, setAutomationRules] = useState([
    { id: 1, trigger: 'New team member joins', action: 'Send welcome message', active: true },
    { id: 2, trigger: 'Daily at 9 AM', action: 'Post daily standup reminder', active: true },
    { id: 3, trigger: 'Keyword: "urgent"', action: 'Notify @channel', active: false }
  ]);

  const isSlackConnected = session?.provider === 'slack';

  // Load channels when Slack is connected
  useEffect(() => {
    if (isSlackConnected) {
      loadChannels();
    }
  }, [isSlackConnected]);

  const loadChannels = async () => {
    setChannelsLoading(true);
    try {
      const response = await fetch('/api/slack/test');
      const data = await response.json();
      
      if (data.success) {
        setChannels(data.channels.map(channel => ({
          id: channel.id,
          name: `#${channel.name}`,
          is_member: channel.is_member
        })));
        
        // Set first available channel as default
        if (data.channels.length > 0) {
          setSelectedChannel(data.channels[0].id);
        }
        
        addMessage('Channels loaded successfully!', 'success');
      } else {
        addMessage(`Error loading channels: ${data.error}`, 'error');
      }
    } catch (error) {
      console.error('Error loading channels:', error);
      addMessage('Failed to load channels', 'error');
    } finally {
      setChannelsLoading(false);
    }
  };

  const addMessage = (text, type = 'info') => {
    const newMessage = {
      id: Date.now(),
      text,
      type,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  const handleSlackConnect = () => {
    signIn('slack');
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedChannel) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/slack/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          channel: selectedChannel
        })
      });

      const data = await response.json();
      
      if (data.success) {
        const channelName = channels.find(c => c.id === selectedChannel)?.name || selectedChannel;
        addMessage(`Message sent to ${channelName}: "${messageText}"`, 'success');
        setMessageText('');
      } else {
        addMessage(`Error sending message: ${data.error}`, 'error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage('Failed to send message', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSchedulePost = () => {
    if (!messageText.trim() || !selectedChannel) return;
    
    const selectedChannelName = channels.find(c => c.id === selectedChannel)?.name || selectedChannel;
    const newPost = {
      id: Date.now(),
      content: messageText,
      channel: selectedChannelName,
      time: new Date(Date.now() + 3600000).toISOString().slice(0, 16).replace('T', ' '),
      status: 'scheduled'
    };
    
    setScheduledPosts(prev => [...prev, newPost]);
    setMessageText('');
    
    addMessage(`Post scheduled for ${selectedChannelName}`, 'success');
  };

  const toggleAutomationRule = (ruleId) => {
    setAutomationRules(prev => 
      prev.map(rule => 
        rule.id === ruleId ? { ...rule, active: !rule.active } : rule
      )
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <MessageSquare className="h-4 w-4 text-blue-500" />;
    }
  };

  // Show loading state while session is being fetched
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Social Media Automation</h1>
            <p className="text-slate-600 mt-1">Slack Integration Test Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            {isSlackConnected ? (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Connected to {session.slack?.teamName || 'Slack'}
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => signOut()}
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button onClick={handleSlackConnect} className="bg-purple-600 hover:bg-purple-700">
                Connect to Slack
              </Button>
            )}
          </div>
        </div>

        {/* Connection Status Alert */}
        {!isSlackConnected && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please connect to Slack to start using the automation features.
            </AlertDescription>
          </Alert>
        )}

        {/* Main Dashboard */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Controls */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="compose" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="compose">Compose</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                <TabsTrigger value="automation">Automation</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="compose" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      Compose Message
                    </CardTitle>
                    <CardDescription>Send or schedule messages to your Slack channels</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Channel</label>
                      <Select 
                        value={selectedChannel} 
                        onValueChange={setSelectedChannel}
                        disabled={!isSlackConnected || channelsLoading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={
                            channelsLoading ? "Loading channels..." : 
                            !isSlackConnected ? "Connect to Slack first" : 
                            channels.length === 0 ? "No channels available" :
                            "Select channel"
                          } />
                        </SelectTrigger>
                        <SelectContent>
                          {channels.map(channel => (
                            <SelectItem key={channel.id} value={channel.id}>
                              {channel.name}
                              {!channel.is_member && <span className="text-xs text-slate-500 ml-2">(not a member)</span>}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {channelsLoading && (
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          Loading channels...
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message</label>
                      <Textarea
                        placeholder="Type your message here..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        rows={4}
                        disabled={!isSlackConnected}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleSendMessage} 
                        disabled={!isSlackConnected || !messageText.trim() || !selectedChannel || loading}
                        className="flex-1"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          'Send Now'
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={handleSchedulePost}
                        disabled={!isSlackConnected || !messageText.trim() || !selectedChannel}
                        className="flex-1"
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="scheduled" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Scheduled Posts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {scheduledPosts.map(post => (
                        <div key={post.id} className="p-3 border rounded-lg bg-slate-50">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{post.content}</p>
                              <p className="text-xs text-slate-600 mt-1">
                                {post.channel} • {post.time}
                              </p>
                            </div>
                            <Badge variant="secondary">{post.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="automation" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Automation Rules
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {automationRules.map(rule => (
                        <div key={rule.id} className="p-3 border rounded-lg flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{rule.trigger}</p>
                            <p className="text-xs text-slate-600">{rule.action}</p>
                          </div>
                          <Button
                            size="sm"
                            variant={rule.active ? "default" : "outline"}
                            onClick={() => toggleAutomationRule(rule.id)}
                            disabled={!isSlackConnected}
                          >
                            {rule.active ? "Active" : "Inactive"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Messages Sent</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {messages.filter(m => m.type === 'success' && m.text.includes('Message sent')).length}
                      </div>
                      <p className="text-xs text-slate-600">This session</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Automation Runs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{automationRules.filter(r => r.active).length}</div>
                      <p className="text-xs text-slate-600">Active rules</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Activity Feed */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Connected Channels</span>
                  <span className="font-semibold">{channels.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Scheduled Posts</span>
                  <span className="font-semibold">{scheduledPosts.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Active Rules</span>
                  <span className="font-semibold">{automationRules.filter(r => r.active).length}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Activity Feed
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!isSlackConnected ? (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Connect to Slack to see activity feed
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {messages.length === 0 ? (
                      <p className="text-sm text-slate-500 text-center py-4">
                        No activity yet. Send a message to get started!
                      </p>
                    ) : (
                      messages.map(message => (
                        <div key={message.id} className="flex items-start gap-3 p-2 rounded-lg bg-slate-50">
                          {getStatusIcon(message.type)}
                          <div className="flex-1">
                            <p className="text-sm">{message.text}</p>
                            <p className="text-xs text-slate-500">{message.timestamp}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}