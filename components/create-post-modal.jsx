"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { X, Calendar, Clock, Sparkles, Upload, Image, Type, Video, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PostScheduler } from './post-scheduler';
import { SocialAccountSelector } from './social-account-selector';
import { PostTemplates } from './post-templates';
import { PostEditor } from './post-editor';


export function CreatePostModal({ isOpen, onClose, onPostCreated }) {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [step, setStep] = useState('action');
  const [postAction, setPostAction] = useState('now');
  const [scheduledDate, setScheduledDate] = useState(null);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [contentType, setContentType] = useState(null);
  const [postContent, setPostContent] = useState({
    text: '',
    images: [],
    video: null,
  });

  if (!isOpen) return null;

  const handlePostNow = () => {
    setPostAction('now');
    setStep('accounts');
  };

  const handleSchedule = () => {
    setPostAction('schedule');
    setStep('schedule');
  };

  const handleScheduleComplete = (date) => {
    setScheduledDate(date);
    setStep('accounts');
  };

  const handleAccountsSelected = (accounts) => {
    setSelectedAccounts(accounts);
    setStep('content');
  };

  const handleContentTypeSelected = (type) => {
    setContentType(type);
    
    if (type === 'template') {
      // Navigate to editor endpoint
      router.push('/editor');
      onClose(); // Close modal when navigating
    } else if (type === 'upload') {
      // Trigger file input for upload
      fileInputRef.current?.click();
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        // Handle image upload
        const reader = new FileReader();
        reader.onload = (e) => {
          setPostContent(prev => ({
            ...prev,
            images: [...prev.images, e.target.result]
          }));
        };
        reader.readAsDataURL(file);
      } else if (file.type.startsWith('video/')) {
        // Handle video upload
        const reader = new FileReader();
        reader.onload = (e) => {
          setPostContent(prev => ({
            ...prev,
            video: e.target.result
          }));
        };
        reader.readAsDataURL(file);
      }
    });
    
    // Move to editor step after file upload
    setStep('editor');
  };

  const handlePostComplete = (content) => {
    const newPost = {
      id: Date.now(),
      ...content,
      scheduledFor: postAction === 'schedule' ? scheduledDate : null,
      platforms: selectedAccounts,
      status: postAction === 'now' ? 'published' : 'scheduled',
      createdAt: new Date(),
    };
    
    onPostCreated(newPost);
    onClose();
    resetModal();
  };

  const resetModal = () => {
    setStep('action');
    setPostAction('now');
    setScheduledDate(null);
    setSelectedAccounts([]);
    setContentType(null);
    setPostContent({ text: '', images: [], video: null });
  };

  const renderStep = () => {
    switch (step) {
      case 'action':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Post</h2>
              <p className="text-gray-600">Choose when you want to publish your content</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handlePostNow}
                className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Post Now</h3>
                <p className="text-sm text-gray-600">Publish your content immediately across selected platforms</p>
              </button>
              
              <button
                onClick={handleSchedule}
                className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Schedule Post</h3>
                <p className="text-sm text-gray-600">Choose the perfect time to publish your content</p>
              </button>
            </div>
          </div>
        );

      case 'schedule':
        return (
          <PostScheduler
            onScheduleSet={handleScheduleComplete}
            onBack={() => setStep('action')}
          />
        );

      case 'accounts':
        return (
          <SocialAccountSelector
            selectedAccounts={selectedAccounts}
            onAccountsSelected={handleAccountsSelected}
            onBack={() => setStep(postAction === 'schedule' ? 'schedule' : 'action')}
          />
        );

      case 'content':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Content</h2>
              <p className="text-gray-600">Choose how you want to create your post</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handleContentTypeSelected('upload')}
                className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Content</h3>
                <p className="text-sm text-gray-600">Upload your own images, videos, or create from scratch</p>
              </button>
              
              <button
                onClick={() => handleContentTypeSelected('template')}
                className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Use Template</h3>
                <p className="text-sm text-gray-600">Start with professionally designed templates</p>
              </button>
            </div>
            
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*,video/*"
              multiple
              style={{ display: 'none' }}
            />
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep('accounts')}>
                Back
              </Button>
            </div>
          </div>
        );

      case 'editor':
        return (
          <PostEditor
            content={postContent}
            onContentChange={setPostContent}
            onComplete={() => setStep('preview')}
            onBack={() => setStep('content')}
          />
        );

      case 'preview':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Preview Your Post</h2>
              <p className="text-gray-600">Review your content before publishing</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                {postContent.images.length > 0 && (
                  <div className="mb-4 grid grid-cols-2 gap-2">
                    {postContent.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Post preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
                
                {postContent.video && (
                  <div className="mb-4">
                    <video
                      src={postContent.video}
                      controls
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                {postContent.text && (
                  <p className="text-gray-900 mb-4">{postContent.text}</p>
                )}
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex gap-2">
                    {selectedAccounts.map(account => (
                      <span key={account} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md">
                        {account}
                      </span>
                    ))}
                  </div>
                  
                  {scheduledDate && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {scheduledDate.toLocaleDateString()} at {scheduledDate.toLocaleTimeString()}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep('editor')}>
                Back to Edit
              </Button>
              <Button
                onClick={() => handlePostComplete(postContent)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                {postAction === 'now' ? 'Publish Now' : 'Schedule Post'}
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900">SocialFit</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}