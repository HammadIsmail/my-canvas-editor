"use client";

import { Clock, Eye, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';



const defaultUpcomingPosts = [
  {
    id: 1,
    title: 'Summer Sale Announcement',
    scheduledFor: new Date('2025-01-16T10:00:00'),
    platforms: ['Facebook', 'Instagram', 'Twitter'],
    status: 'scheduled' ,
    text: 'Get ready for our biggest summer sale! 🌞 Up to 50% off selected items...',
    createdAt: new Date(),
  },
  {
    id: 2,
    title: 'Product Launch Teaser',
    scheduledFor: new Date('2025-01-16T14:00:00'),
    platforms: ['Instagram', 'LinkedIn'],
    status: 'draft' ,
    text: 'Something exciting is coming your way! Can you guess what it is? 🤔...',
    createdAt: new Date(),
  },
  {
    id: 3,
    title: 'Customer Success Story',
    scheduledFor: new Date('2025-01-17T09:00:00'),
    platforms: ['LinkedIn', 'Facebook'],
    status: 'scheduled' ,
    text: 'Meet Sarah, who transformed her business using our platform! Her story...',
    createdAt: new Date(),
  },
];

export function UpcomingPosts({ posts = [] }) {
  // Combine user-created posts with default posts
  const allPosts = [...posts, ...defaultUpcomingPosts];
  
  // Filter and sort posts
  const upcomingPosts = allPosts
    .filter(post => post.status === 'scheduled' || post.status === 'draft')
    .sort((a, b) => {
      if (!a.scheduledFor && !b.scheduledFor) return 0;
      if (!a.scheduledFor) return 1;
      if (!b.scheduledFor) return -1;
      return a.scheduledFor.getTime() - b.scheduledFor.getTime();
    })
    .slice(0, 5); // Show only first 5 posts

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Upcoming Posts</h2>
        <Button variant="outline" size="sm">
          <Eye className="w-4 h-4 mr-2" />
          View All
        </Button>
      </div>
      
      <div className="space-y-4">
        {upcomingPosts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No upcoming posts scheduled</p>
            <p className="text-sm">Create your first post to get started!</p>
          </div>
        ) : (
          upcomingPosts.map((post) => (
            <div
              key={post.id}
              className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-gray-900">{post.title}</h3>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  post.status === 'scheduled' 
                    ? 'bg-green-100 text-green-700' 
                    : post.status === 'published'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {post.status}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.text}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {post.scheduledFor 
                      ? post.scheduledFor.toLocaleDateString() + ' ' + post.scheduledFor.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      : 'Not scheduled'
                    }
                  </div>
                  <div className="flex gap-1">
                    {post.platforms.map((platform) => (
                      <span
                        key={platform}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Button variant="ghost" size="sm">
                  <Edit3 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}