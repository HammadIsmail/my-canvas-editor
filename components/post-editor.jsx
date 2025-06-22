"use client";

import { useState, useRef } from 'react';
import { Upload, Image, Type, Video, Smile, Hash, AtSign, Bold, Italic } from 'lucide-react';
import { Button } from '@/components/ui/button';



const sampleImages = [
  'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
  'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
  'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
];

const quickInserts = [
  { icon: Hash, text: '#hashtag', label: 'Hashtag' },
  { icon: AtSign, text: '@mention', label: 'Mention' },
  { icon: Smile, text: '😊', label: 'Emoji' },
];

export function PostEditor({ content, onContentChange, onComplete, onBack }) {
  const [activeTab, setActiveTab] = useState<'text' | 'media'>('text');
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleTextChange = (text) => {
    onContentChange({ ...content, text });
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files) {
      // In a real app, you would upload these files and get URLs
      // For demo purposes, we'll use sample images
      const newImages = Array.from(files).map((_, index) => sampleImages[index % sampleImages.length]);
      onContentChange({ ...content, images: [...content.images, ...newImages] });
    }
  };

  const handleSampleImageAdd = (imageUrl) => {
    if (!content.images.includes(imageUrl)) {
      onContentChange({ ...content, images: [...content.images, imageUrl] });
    }
  };

  const handleImageRemove = (index) => {
    const newImages = content.images.filter((_, i) => i !== index);
    onContentChange({ ...content, images: newImages });
  };

  const insertText = (insertText) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = content.text;
      const newText = text.substring(0, start) + insertText + text.substring(end);
      
      handleTextChange(newText);
      
      // Set cursor position after inserted text
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + insertText.length, start + insertText.length);
      }, 0);
    }
  };

  const formatText = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = content.text.substring(start, end);
      
      if (selectedText) {
        const wrapper = format === 'bold' ? '**' : '*';
        const formattedText = `${wrapper}${selectedText}${wrapper}`;
        const newText = content.text.substring(0, start) + formattedText + content.text.substring(end);
        handleTextChange(newText);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Content</h2>
        <p className="text-gray-600">Write your post and add media to engage your audience</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('text')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'text'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Type className="w-4 h-4 inline mr-2" />
          Text Content
        </button>
        <button
          onClick={() => setActiveTab('media')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'media'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Image className="w-4 h-4 inline mr-2" />
          Media ({content.images.length})
        </button>
      </div>

      {/* Text Content Tab */}
      {activeTab === 'text' && (
        <div className="space-y-4">
          {/* Formatting Tools */}
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <div className="flex gap-1">
              <button
                onClick={() => formatText('bold')}
                className="p-2 hover:bg-gray-200 rounded-md transition-colors"
                title="Bold"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                onClick={() => formatText('italic')}
                className="p-2 hover:bg-gray-200 rounded-md transition-colors"
                title="Italic"
              >
                <Italic className="w-4 h-4" />
              </button>
            </div>
            
            <div className="w-px h-6 bg-gray-300 mx-2"></div>
            
            <div className="flex gap-1">
              {quickInserts.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    onClick={() => insertText(item.text)}
                    className="p-2 hover:bg-gray-200 rounded-md transition-colors"
                    title={item.label}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Text Area */}
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={content.text}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="What's on your mind? Share your thoughts, updates, or stories with your audience..."
              className="w-full h-48 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute bottom-3 right-3 text-sm text-gray-400">
              {content.text.length}/2200
            </div>
          </div>

          {/* Character Count Warning */}
          {content.text.length > 2000 && (
            <div className="text-sm text-amber-600 bg-amber-50 p-2 rounded-md">
              ⚠️ Your post is getting long. Consider breaking it into multiple posts for better engagement.
            </div>
          )}
        </div>
      )}

      {/* Media Tab */}
      {activeTab === 'media' && (
        <div className="space-y-4">
          {/* Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="space-y-2">
              <Upload className="w-8 h-8 text-gray-400 mx-auto" />
              <div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Click to upload
                </button>
                <span className="text-gray-500"> or drag and drop</span>
              </div>
              <p className="text-sm text-gray-500">PNG, JPG, GIF, MP4 up to 10MB</p>
            </div>
          </div>

          {/* Sample Images */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Or choose from sample images:</h4>
            <div className="grid grid-cols-3 gap-3">
              {sampleImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleSampleImageAdd(image)}
                  className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-colors"
                >
                  <img
                    src={image}
                    alt={`Sample ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {content.images.includes(image) && (
                    <div className="absolute inset-0 bg-blue-600 bg-opacity-20 flex items-center justify-center">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Media */}
          {content.images.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Selected Media ({content.images.length}):</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {content.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Selected ${index + 1}`}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handleImageRemove(index)}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={onComplete}
          disabled={!content.text.trim() && content.images.length === 0}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white disabled:opacity-50"
        >
          Preview Post
        </Button>
      </div>
    </div>
  );
}