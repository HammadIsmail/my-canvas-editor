"use client";
import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { TopBar } from '@/components/top-bar';
import { PostCards } from '@/components/post-cards';

import  CalendarView  from '@/components/calendar-view';
import { CreatePostModal } from '@/components/create-post-modal';
import SocialMediaManager from '@/components/SocialMediaManager';
import EcommerceIntegrationManager from '@/components/EcommerceIntegrationManager';
import SettingsPages from '@/components/settings/Setting';
import SocialMediaAnalytics from '@/components/Analytics';

export default function Home() {
  const [activeView, setActiveView] = useState('posts'); 
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  const handlePostCreated = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
  };

  const renderMainContent = () => {
    switch (activeView) {
      case 'posts': // Changed from 'dashboard' to 'posts' to match sidebar
        return (
          <div className="space-y-6">
            <PostCards onCreatePost={() => setIsCreatePostModalOpen(true)} />
          </div>
        );
      case 'calender':
        return <CalendarView posts={posts} />;
      case 'social-accounts':
        return (
         <SocialMediaManager/>
        );
      case 'online-stores':
        return (
        <EcommerceIntegrationManager/>
        );
      case 'ai-content':
        return (
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-2xl font-semibold mb-4">AI Content Generation</h2>
            <div className="text-muted-foreground">AI content generation tools coming soon...</div>
          </div>
        );
      case 'analytics':
        return (
          <SocialMediaAnalytics/>
        );
      case 'settings':
        return (
         <SettingsPages/>
        );
      default:
        return (
          <div className="space-y-6">
            <PostCards onCreatePost={() => setIsCreatePostModalOpen(true)} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      {/* Changed from ml-64 to ml-16 to account for collapsed sidebar */}
      <div className="ml-16 flex flex-col transition-all duration-300">
        <TopBar onCreatePost={() => setIsCreatePostModalOpen(true)} />
        <main className="flex-1 p-6">
          {renderMainContent()}
        </main>
      </div>
     
      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
}