import React, { useState, useMemo } from 'react';
import { Search, Facebook, Twitter, Instagram, Linkedin, Youtube, MessageCircle, Users, Camera, Music, MapPin, Github, Globe, Briefcase, Play, Hash, Heart, Send, Video, Phone, Mail, Zap, Tv, Headphones, Coffee, ShoppingBag, Star, Gamepad2, BookOpen, Mic, Monitor, Palette, Code, Rss, Settings, Link, Eye, TrendingUp, Award, Target, Crown, MessageSquare, Share2, UserPlus, Bell, ThumbsUp, Filter, Grid, List, ChevronDown, ExternalLink, Check, X, Plus, Minus, RotateCcw, Download, Upload, Edit, Trash2, Copy, Save, Lock, Unlock, AlertCircle, Info, HelpCircle, Maximize, Minimize, RefreshCw, Clock, Calendar, Archive, Bookmark, Flag, Volume2, VolumeX, Image, FileText, Folder, Database, Cloud, Wifi, WifiOff, Battery, BatteryLow, Bluetooth, Cpu } from 'lucide-react';

const SocialMediaManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [connectedAccounts, setConnectedAccounts] = useState(new Set());

  const socialPlatforms = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      description: 'Connect with friends and family',
      category: 'Social Networking',
      users: '2.9B',
      buttonText: 'Connect'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      hoverColor: 'hover:from-purple-600 hover:to-pink-600',
      description: 'Photo and video sharing',
      category: 'Photo & Video',
      users: '2.0B',
      buttonText: 'Connect'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-500',
      hoverColor: 'hover:bg-sky-600',
      description: 'What\'s happening now',
      category: 'News & Social',
      users: '450M',
      buttonText: 'Connect'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700',
      hoverColor: 'hover:bg-blue-800',
      description: 'Professional networking',
      category: 'Professional',
      users: '900M',
      buttonText: 'Connect'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: Youtube,
      color: 'bg-red-600',
      hoverColor: 'hover:bg-red-700',
      description: 'Video sharing platform',
      category: 'Video',
      users: '2.7B',
      buttonText: 'Connect'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: Music,
      color: 'bg-black',
      hoverColor: 'hover:bg-gray-800',
      description: 'Short-form video content',
      category: 'Entertainment',
      users: '1.0B',
      buttonText: 'Connect'
    },
   
    {
      id: 'pinterest',
      name: 'Pinterest',
      icon: Heart,
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      description: 'Visual discovery engine',
      category: 'Lifestyle',
      users: '450M',
      buttonText: 'Connect'
    },
  
  {
  id: 'telegram',
  name: 'Telegram',
  icon: Send,
  color: 'bg-cyan-500',
  hoverColor: 'hover:bg-cyan-600',
  description: 'Cloud-based messaging app',
  category: 'Messaging',
  users: '900M',
  buttonText: 'Connect'
},
{
  id: 'slack',
  name: 'Slack',
  icon: MessageCircle,
  color: 'bg-purple-600',
  hoverColor: 'hover:bg-purple-700',
  description: 'Team communication platform',
  category: 'Workplace',
  users: '50M',
  buttonText: 'Connect'
},
{
  id: 'threads',
  name: 'Threads',
  icon: Hash,
  color: 'bg-black',
  hoverColor: 'hover:bg-gray-800',
  description: 'Text-based conversation app',
  category: 'Microblogging',
  users: '150M',
  buttonText: 'Connect'
},

    {
      id: 'discord',
      name: 'Discord',
      icon: Users,
      color: 'bg-indigo-600',
      hoverColor: 'hover:bg-indigo-700',
      description: 'Voice, video and text chat',
      category: 'Gaming',
      users: '150M',
      buttonText: 'Connect'
    },
    {
      id: 'reddit',
      name: 'Reddit',
      icon: MessageSquare,
      color: 'bg-orange-600',
      hoverColor: 'hover:bg-orange-700',
      description: 'Social news aggregation',
      category: 'Discussion',
      users: '430M',
      buttonText: 'Connect'
    },
  
   
 
   
  ];

  const filteredPlatforms = useMemo(() => {
    if (!searchQuery) return socialPlatforms;
    return socialPlatforms.filter(platform =>
      platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      platform.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      platform.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const toggleConnection = (platformId) => {
    setConnectedAccounts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(platformId)) {
        newSet.delete(platformId);
      } else {
        newSet.add(platformId);
      }
      return newSet;
    });
  };

  const categories = [...new Set(socialPlatforms.map(p => p.category))];
  const connectedCount = connectedAccounts.size;
  const totalPlatforms = socialPlatforms.length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-50">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Connected Social Accounts</h2>
            <p className="text-gray-600">Manage your social media connections and integrations</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-lg border border-blue-200">
              <div className="text-sm font-medium text-blue-900">
                {connectedCount} of {totalPlatforms} connected
              </div>
              <div className="w-full bg-blue-200 rounded-full h-1.5 mt-1">
                <div 
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${(connectedCount / totalPlatforms) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-6 border-b border-gray-100">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search social platforms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
          />
        </div>
        
        {searchQuery && (
          <div className="mt-3 text-sm text-gray-600">
            Found {filteredPlatforms.length} platform{filteredPlatforms.length !== 1 ? 's' : ''} matching "{searchQuery}"
          </div>
        )}
      </div>

      {/* Platforms Grid/List */}
      <div className="p-6">
        {filteredPlatforms.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No platforms found</h3>
            <p className="text-gray-600">Try searching with different keywords</p>
          </div>
        ) : (
          <div className={`grid gap-4 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredPlatforms.map((platform) => {
              const IconComponent = platform.icon;
              const isConnected = connectedAccounts.has(platform.id);

              return (
                <div
                  key={platform.id}
                  className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    isConnected 
                      ? 'border-green-200 bg-gradient-to-br from-green-50 to-green-100' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  } ${viewMode === 'list' ? 'flex items-center' : ''}`}
                >
                  {/* Connection Status Indicator */}
                  {isConnected && (
                    <div className="absolute top-3 right-3 z-10">
                      <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  )}

                  <div className={`${viewMode === 'list' ? 'flex items-center p-4 flex-1' : 'p-6'}`}>
                    {/* Icon */}
                    <div className={`${viewMode === 'list' ? 'mr-4' : 'mb-4'} flex-shrink-0`}>
                      <div className={`w-12 h-12 rounded-lg ${platform.color} flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <div className={`${viewMode === 'list' ? 'flex items-center justify-between' : ''}`}>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg mb-1">{platform.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">{platform.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                              {platform.category}
                            </span>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-700">
                              <Users className="w-3 h-3 mr-1" />
                              {platform.users} users
                            </span>
                          </div>
                        </div>

                        {/* Connect Button */}
                        <div className={`${viewMode === 'list' ? 'ml-4' : ''}`}>
                          <button
                            onClick={() => toggleConnection(platform.id)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                              isConnected
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : `${platform.color} ${platform.hoverColor} text-white shadow-sm hover:shadow-md`
                            }`}
                          >
                            {isConnected ? 'Disconnect' : platform.buttonText}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Stats */}
      {filteredPlatforms.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
            <div>
              Showing {filteredPlatforms.length} of {totalPlatforms} platforms
            </div>
            <div className="flex gap-6">
              <div>Connected: <span className="font-medium text-green-600">{connectedCount}</span></div>
              <div>Available: <span className="font-medium text-blue-600">{totalPlatforms - connectedCount}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialMediaManager;