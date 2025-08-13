"use client";

import { useState, useRef } from 'react';
import { 
  X, Calendar, Upload, FileText, Check, ChevronLeft, ChevronRight, 
  Users, Edit3, Hash, Wand2, Plus, Loader2 
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import EngagementChart from './EngagementCard';
import { engagementData, timeSlots } from './constants';
import PostPreview from './PostPreview';
import CanvasEditor from '../canvasEditor';
import ConnectAccountSlider from './ConnectAccountSlider';

const socialAccounts = [
  {
    id: 'fb-1',
    platform: 'Facebook',
    username: '@mybusiness',
    followers: '12.5K',
    connected: true,
    color: 'bg-blue-600',
    icon: '📘',
    engagement: '3.2%'
  },
  {
    id: 'ig-1',
    platform: 'Instagram',
    username: '@mybusiness',
    followers: '8.2K',
    connected: true,
    color: 'bg-gradient-to-br from-purple-600 to-pink-600',
    icon: '📷',
    engagement: '4.8%'
  },
  {
    id: 'tw-1',
    platform: 'Twitter',
    username: '@mybusiness',
    followers: '5.1K',
    connected: true,
    color: 'bg-sky-500',
    icon: '🐦',
    engagement: '2.1%'
  },
  {
    id: 'li-1',
    platform: 'LinkedIn',
    username: 'My Business',
    followers: '3.8K',
    connected: true,
    color: 'bg-blue-700',
    icon: '💼',
    engagement: '5.2%'
  }
];

export default function CreatePostModal({ isOpen, onClose, onPostCreated }) {
  const fileInputRef = useRef(null);
  const [postType, setPostType] = useState('now');
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [postContent, setPostContent] = useState({
    text: '',
    images: [],
    video: null,
    hashtags: [],
    customHashtags: []
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCanvasEditor, setShowCanvasEditor] = useState(false);
  const [newHashtag, setNewHashtag] = useState('');
  const [customTime, setCustomTime] = useState('');
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [showConnectSlider, setShowConnectSlider] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleAccountToggle = (accountId) => {
    setSelectedAccounts(prev => 
      prev.includes(accountId)
        ? prev.filter(id => id !== accountId)
        : [...prev, accountId]
    );
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;
    
    setIsUploading(true);
    let uploadsCompleted = 0;
    
    // Clear existing media when new files are uploaded
    setPostContent(prev => ({
      ...prev,
      images: [],
      video: null
    }));
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            setImageDimensions({
              width: img.width,
              height: img.height
            });
            setPostContent(prev => ({
              ...prev,
              images: [...prev.images, {
                url: e.target.result,
                width: img.width,
                height: img.height
              }]
            }));
            uploadsCompleted++;
            if (uploadsCompleted === files.length) setIsUploading(false);
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      } else if (file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPostContent(prev => ({
            ...prev,
            video: e.target.result,
            images: [] // Clear images if video is uploaded
          }));
          uploadsCompleted++;
          if (uploadsCompleted === files.length) setIsUploading(false);
        };
        reader.readAsDataURL(file);
      } else {
        uploadsCompleted++;
        if (uploadsCompleted === files.length) setIsUploading(false);
      }
    });
  };

  const handlePublish = () => {
    console.log('Publishing post:', {
      type: postType,
      accounts: selectedAccounts,
      date: selectedDate,
      time: selectedTime || customTime,
      content: postContent
    });
    
    if (onPostCreated) {
      onPostCreated({
        id: Date.now(),
        type: postType,
        accounts: selectedAccounts,
        date: selectedDate,
        time: selectedTime || customTime,
        content: postContent,
        createdAt: new Date()
      });
    }
    
    onClose();
  };

  // Calendar functions
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  
  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      direction === 'prev' ? newDate.setMonth(prev.getMonth() - 1) : newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const handleDateSelect = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(date);
  };

  const generateHashtags = () => {
    const aiHashtags = ['#socialmedia', '#marketing', '#digital', '#trending', '#viral'];
    setPostContent(prev => ({ ...prev, hashtags: aiHashtags }));
  };

  const addCustomHashtag = () => {
    if (newHashtag.trim()) {
      const formattedTag = newHashtag.trim().startsWith('#') ? newHashtag.trim() : `#${newHashtag.trim()}`;
      setPostContent(prev => ({
        ...prev,
        customHashtags: [...prev.customHashtags, formattedTag]
      }));
      setNewHashtag('');
    }
  };

  const removeHashtag = (index, type) => {
    setPostContent(prev => ({
      ...prev,
      [type === 'ai' ? 'hashtags' : 'customHashtags']: 
        prev[type === 'ai' ? 'hashtags' : 'customHashtags'].filter((_, i) => i !== index)
    }));
  };

  const enhanceCaption = () => {
    setPostContent(prev => ({
      ...prev,
      text: prev.text + " #EngagingContent #BetterWithAI"
    }));
  };

  // Calendar data
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);
  const today = new Date();
  const optimalTimes = engagementData.filter(d => d.engagement >= 80).map(d => d.time);

  return (
    <>
      <div className={`fixed  inset-0 z-40 overflow-hidden transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        
        <div className={`absolute  inset-y-0 z-50 left-0 flex max-w-full `}>
          <div className="relative w-screen max-w-5xl">
            <div className="flex h-full flex-col bg-white shadow-xl">
              <div className="flex-1 overflow-y-auto">
                <div className="flex h-full">
                  
                  {/* Left Side - Editor */}
                  <div className="w-1/2 p-6 overflow-y-auto">
                    <div className="sticky top-0 bg-white pb-4 z-10 flex justify-between items-center">
                      <h2 className="text-xl font-bold">Create Post</h2>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Post Now / Schedule Buttons */}
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          variant={postType === 'now' ? 'default' : 'outline'}
                          onClick={() => setPostType('now')}
                          className="h-16"
                        >
                          <div className="text-left">
                            <div className="font-semibold">Post Now</div>
                            <div className="text-sm font-normal">Publish immediately</div>
                          </div>
                        </Button>
                        <Button
                          variant={postType === 'schedule' ? 'default' : 'outline'}
                          onClick={() => setPostType('schedule')}
                          className="h-16"
                        >
                          <div className="text-left">
                            <div className="font-semibold">Schedule Post</div>
                            <div className="text-sm font-normal">Choose date & time</div>
                          </div>
                        </Button>
                      </div>
                      
                      {/* Schedule Options */}
                      {postType === 'schedule' && (
                        <Card>
                          <CardContent className="p-4 space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Date</label>
                              <div className="relative">
                                <Button
                                  variant="outline"
                                  className="w-full justify-between"
                                  onClick={() => setShowCalendar(!showCalendar)}
                                >
                                  <span>
                                    {selectedDate
                                      ? selectedDate.toLocaleDateString('en-US', {
                                          weekday: 'short',
                                          month: 'short',
                                          day: 'numeric',
                                          year: 'numeric'
                                        })
                                      : 'Select a date'}
                                  </span>
                                  <Calendar className="w-5 h-5 text-muted-foreground" />
                                </Button>
                                
                                {showCalendar && (
                                  <Card className="absolute z-10 mt-1 w-full">
                                    <CardContent className="p-4">
                                      <div className="flex items-center justify-between mb-4">
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => navigateMonth('prev')}
                                        >
                                          <ChevronLeft className="w-5 h-5" />
                                        </Button>
                                        <h3 className="font-semibold">
                                          {currentMonth.toLocaleDateString('en-US', {
                                            month: 'long',
                                            year: 'numeric'
                                          })}
                                        </h3>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => navigateMonth('next')}
                                        >
                                          <ChevronRight className="w-5 h-5" />
                                        </Button>
                                      </div>
                                      
                                      <div className="grid grid-cols-7 gap-1 mb-2">
                                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                                          <div key={day} className="text-center text-xs font-medium text-muted-foreground">
                                            {day}
                                          </div>
                                        ))}
                                      </div>
                                      
                                      <div className="grid grid-cols-7 gap-1">
                                        {emptyDays.map((_, index) => (
                                          <div key={`empty-${index}`} className="h-8"></div>
                                        ))}
                                        
                                        {days.map(day => {
                                          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                                          const isToday = date.toDateString() === today.toDateString();
                                          const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
                                          
                                          return (
                                            <Button
                                              key={day}
                                              variant={
                                                isSelected 
                                                  ? "default" 
                                                  : isToday 
                                                    ? "secondary" 
                                                    : "ghost"
                                              }
                                              size="sm"
                                              className="h-8 w-8 p-0"
                                              onClick={() => {
                                                handleDateSelect(day);
                                                setShowCalendar(false);
                                              }}
                                            >
                                              {day}
                                            </Button>
                                          );
                                        })}
                                      </div>
                                    </CardContent>
                                  </Card>
                                )}
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-2">Time</label>
                              <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-2">
                                  {timeSlots.map((time, index) => (
                                    <Button
                                      key={index}
                                      variant={selectedTime === time ? "default" : "outline"}
                                      size="sm"
                                      onClick={() => {
                                        setSelectedTime(time);
                                        setCustomTime('');
                                      }}
                                    >
                                      {time}
                                    </Button>
                                  ))}
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="time"
                                    value={customTime}
                                    onChange={(e) => {
                                      setCustomTime(e.target.value);
                                      setSelectedTime('');
                                    }}
                                    className="flex-1"
                                  />
                                  <span className="text-sm text-muted-foreground">or custom time</span>
                                </div>
                                
                                {optimalTimes.length > 0 && (
                                  <div>
                                    <p className="text-sm text-muted-foreground mb-2">AI Recommended Times:</p>
                                    <div className="flex gap-2">
                                      {optimalTimes.map((time, index) => (
                                        <Button
                                          key={`optimal-${index}`}
                                          variant="secondary"
                                          size="sm"
                                          onClick={() => {
                                            setSelectedTime(time);
                                            setCustomTime('');
                                          }}
                                        >
                                          {time}
                                        </Button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                      
                      <EngagementChart 
                        data={engagementData} 
                        selectedTime={selectedTime}
                        onTimeSelect={(time) => {
                          setSelectedTime(time);
                          setCustomTime('');
                        }}
                      />
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            Select Accounts
                          </CardTitle>
                          <CardDescription>
                            <Button 
                              variant="link" 
                              className="p-0 h-auto text-blue-600" 
                              onClick={() => setShowConnectSlider(true)}
                            >
                              + Connect more accounts
                            </Button>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {socialAccounts.map(account => (
                              <Card
                                key={account.id}
                                className={`cursor-pointer transition-colors ${
                                  selectedAccounts.includes(account.id) ? 'border-primary' : ''
                                }`}
                                onClick={() => handleAccountToggle(account.id)}
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${account.color}`}>
                                      {account.icon}
                                    </div>
                                    <div className="flex-1">
                                      <div className="font-medium">{account.platform}</div>
                                      <div className="text-sm text-muted-foreground">{account.username}</div>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                                      selectedAccounts.includes(account.id)
                                        ? 'bg-primary border-primary text-white'
                                        : 'border-muted-foreground'
                                    }`}>
                                      {selectedAccounts.includes(account.id) && <Check className="w-4 h-4" />}
                                    </div>
                                  </div>
                                  
                                  {selectedAccounts.includes(account.id) && (
                                    <div className="mt-3 pt-3 border-t flex items-center justify-between text-xs">
                                      <div>
                                        <div className="text-muted-foreground">Followers</div>
                                        <div className="font-medium">{account.followers}</div>
                                      </div>
                                      <div>
                                        <div className="text-muted-foreground">Engagement</div>
                                        <div className="font-medium text-green-600">{account.engagement}</div>
                                      </div>
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Upload className="w-5 h-5" />
                            Upload Media
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div 
                            className="relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 cursor-pointer hover:border-primary transition-colors"
                            onClick={() => fileInputRef.current.click()}
                          >
                            {isUploading ? (
                              <div className="flex flex-col items-center justify-center gap-2">
                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                <p className="text-sm">Uploading...</p>
                              </div>
                            ) : (
                              <>
                                <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                                <p className="font-medium">Click to upload or drag and drop</p>
                                <p className="text-sm text-muted-foreground">JPG, PNG, GIF, MP4 up to 10MB</p>
                              </>
                            )}
                          </div>
                          
                          <div className="mt-4 flex justify-center">
                            <Button 
                              variant="outline" 
                              onClick={() => setShowCanvasEditor(true)}
                              className="gap-2"
                            >
                              <Edit3 className="w-4 h-4" />
                              Open Design Editor
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Caption & Hashtags
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <Textarea
                            value={postContent.text}
                            onChange={(e) => setPostContent(prev => ({ ...prev, text: e.target.value }))}
                            placeholder="Write your caption here..."
                            className="w-full min-h-[150px]"
                          />
                          
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              {postContent.text.length}/2200 characters
                            </span>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="gap-2"
                                onClick={enhanceCaption}
                              >
                                <Wand2 className="w-4 h-4" />
                                Enhance Caption
                              </Button>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="text-sm font-medium">Hashtags</h4>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="gap-2"
                                onClick={generateHashtags}
                              >
                                <Hash className="w-4 h-4" />
                                Generate Hashtags
                              </Button>
                            </div>
                            
                            {postContent.hashtags.length > 0 && (
                              <div className="mb-4">
                                <p className="text-xs text-muted-foreground mb-1">AI Suggestions:</p>
                                <div className="flex flex-wrap gap-2">
                                  {postContent.hashtags.map((tag, i) => (
                                    <Badge 
                                      key={`ai-${i}`} 
                                      variant="outline"
                                      className="flex items-center gap-1"
                                    >
                                      {tag}
                                      <button 
                                        onClick={() => removeHashtag(i, 'ai')}
                                        className="text-muted-foreground hover:text-destructive"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Your Hashtags:</p>
                              <div className="flex flex-wrap gap-2 mb-2">
                                {postContent.customHashtags.map((tag, i) => (
                                  <Badge 
                                    key={`custom-${i}`} 
                                    variant="outline"
                                    className="flex items-center gap-1"
                                  >
                                    {tag}
                                    <button 
                                      onClick={() => removeHashtag(i, 'custom')}
                                      className="text-muted-foreground hover:text-destructive"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </Badge>
                                ))}
                              </div>
                              
                              <div className="flex gap-2">
                                <Input
                                  value={newHashtag}
                                  onChange={(e) => setNewHashtag(e.target.value)}
                                  placeholder="Add custom hashtag"
                                  className="flex-1"
                                  onKeyDown={(e) => e.key === 'Enter' && addCustomHashtag()}
                                />
                                <Button 
                                  variant="outline" 
                                  size="icon"
                                  onClick={addCustomHashtag}
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Button 
                        onClick={handlePublish}
                        className={`w-full py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white`}
                        disabled={
                          (postContent.text === '' && postContent.images.length === 0 && !postContent.video) ||
                          (postType === 'schedule' && (!selectedDate || (!selectedTime && !customTime))) ||
                          selectedAccounts.length === 0
                        }
                      >
                        {postType === 'now' ? 'Post Now' : 'Schedule Post'}
                      </Button>
                    </div>
                  </div>

                  {/* Preview Here */}
                  <PostPreview postContent={postContent} imageDimensions={imageDimensions} onClose={onClose} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        multiple
        accept="image/*,video/*"
        className="hidden"
      />

      {showCanvasEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
          <div className="w-full h-full">
            <CanvasEditor 
              className="w-full h-full" 
              onSaveImage={(imageData) => {
                const img = new Image();
                img.onload = () => {
                  setImageDimensions({
                    width: img.width,
                    height: img.height
                  });
                  setPostContent(prev => ({
                    ...prev,
                    images: [{
                      url: imageData,
                      width: img.width,
                      height: img.height
                    }],
                    video: null
                  }));
                };
                img.src = imageData;
                setShowCanvasEditor(false);
              }}
              onClose={() => setShowCanvasEditor(false)}
            />  
          </div>
        </div>
      )}

      <ConnectAccountSlider 
        isOpen={showConnectSlider} 
        onClose={() => setShowConnectSlider(false)} 
      />
    </>
  );
}