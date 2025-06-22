"use client";

import { Sparkles, ThumbsUp, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const suggestions = [
  {
    id: 1,
    type: 'Caption',
    content: 'Transform your Monday blues into Monday motivation! ✨ Start your week with purpose and watch how everything falls into place. What\'s your Monday mantra?',
    platforms: ['Instagram', 'Facebook'],
    engagement: 'High',
  },
  {
    id: 2,
    type: 'Hashtags',
    content: '#MondayMotivation #Entrepreneurship #BusinessTips #Productivity #Success #Mindset #GrowthMindset #BusinessOwner #Inspiration #Goals',
    platforms: ['Instagram', 'Twitter'],
    engagement: 'Medium',
  },
  {
    id: 3,
    type: 'Product Post',
    content: 'Introducing our latest innovation! 🚀 Designed with you in mind, this game-changing solution will revolutionize the way you work. Early bird pricing available now!',
    platforms: ['LinkedIn', 'Facebook'],
    engagement: 'High',
  },
];

export function AIContentSuggestions() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">AI Suggestions</h2>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Generate New
        </Button>
      </div>
      
      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                  {suggestion.type}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  suggestion.engagement === 'High' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {suggestion.engagement} Engagement
                </span>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <p className="text-sm text-gray-700 mb-3 leading-relaxed">{suggestion.content}</p>
            
            <div className="flex gap-1">
              {suggestion.platforms.map((platform) => (
                <span
                  key={platform}
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}