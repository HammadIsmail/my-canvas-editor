'use client';

import {  Plus, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function TopBar({ onCreatePost }) {
  return (
    <TooltipProvider>
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          {/* You can add more items here */}
        </div>

        <div className="flex items-center gap-4">
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

          <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-700">Sarah Johnson</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
}
