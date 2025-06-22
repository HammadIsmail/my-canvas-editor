'use client';

import { Check, Plus } from 'lucide-react';
import Image from 'next/image';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button'; // Assuming you use shadcn/ui

export function PostCards({onCreatePost}) {
 

  return (
    <div className="min-h-screen text-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Image */}
          <div className="w-full h-full flex items-center justify-center">
            <Image
              src="/postImage.jpeg"
              alt="Post Illustration"
              width={500}
              height={500}
              className="rounded-xl shadow-lg object-cover"
            />
          </div>

          {/* Right Side - Form */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Create your first post</h1>
              <p className="text-gray-700 text-lg">
                Easy to get followers when they are most engaged! Design posts and schedule when to post.
              </p>
            </div>

            <div className="space-y-6">
              {/* Features List */}
              <div className="space-y-4">
                {[
                  'Choose from different post variations, including general',
                  'Determine posting schedule according to you',
                  'Use pre-designed templates to get started quickly',
                ].map((text, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-900">{text}</span>
                  </div>
                ))}
              </div>

              {/* Create Button with Tooltip */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={onCreatePost}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Post
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    
                    sideOffset={5}
                    className="bg-gradient-to-br from-blue-600 to-purple-600 text-white px-3 py-1.5 rounded-md shadow-lg text-sm animate-tooltip"
                  >
                    Create a new post
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
