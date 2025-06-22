'use client';

import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Sparkles,
  Calendar,
  BarChart3,
  Settings,
  ChevronRight,
} from 'lucide-react';

const navigationItems = [
  { id: 'posts', label: 'Posts', icon: LayoutDashboard },
  { id: 'social-accounts', label: 'Social Accounts', icon: Users },
  { id: 'online-stores', label: 'Online Stores', icon: ShoppingBag },
  { id: 'ai-content', label: 'AI Content', icon: Sparkles },
  { id: 'calender', label: 'Calender', icon: Calendar },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activeView, setActiveView }) {
  return (
    <div className="fixed left-0 top-0 h-full z-40 bg-white border-r border-gray-200 group transition-all duration-300 w-16 hover:w-64">
      <div className="flex flex-col h-full p-4 space-y-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-2 min-h-[32px]">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap overflow-hidden">
            SocialFit
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-2 mt-6">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={cn(
                  'flex items-center gap-3 px-3 py-3 rounded-md transition-all duration-200 relative min-h-[44px]',
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 rounded-r-full" />
                )}
                
                {/* Icon - always visible */}
                <div className="flex-shrink-0 flex  items-center justify-center w-5 h-5">
                  <Icon
                    className={cn(
                      'w-5 h-5',
                      isActive ? 'text-blue-700' : 'text-gray-600'
                    )}
                  />
                </div>
                
                {/* Label - shows on hover */}
                <span className="whitespace-nowrap font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                  {item.label}
                </span>
                
                {/* Chevron - shows on hover for active item */}
                {isActive && (
                  <ChevronRight className="w-4 h-4 ml-auto text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}