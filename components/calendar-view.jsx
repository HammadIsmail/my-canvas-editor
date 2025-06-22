import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Calendar,
  Clock,
  MoreVertical,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  ShoppingBag,
  Image,
  Video,
  FileText,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Settings,
  Filter,
  Search,
  Grid,
  List,
  Download,
  Upload,
  Edit,
  Trash2,
  Copy,
  Send,
  Pause,
  Play,
  AlertCircle,
  CheckCircle,
  XCircle,
  Zap
} from 'lucide-react';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // month, week, day
  const [selectedDate, setSelectedDate] = useState(null);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [filter, setFilter] = useState('all');

  // Sample scheduled posts data
  const [scheduledPosts] = useState([
    {
      id: 1,
      date: '2025-06-23',
      time: '09:00',
      content: 'Check out our new summer collection! 🌞 #SummerFashion #NewArrivals',
      platforms: ['facebook', 'instagram', 'twitter'],
      status: 'scheduled',
      type: 'image',
      engagement: { likes: 0, comments: 0, shares: 0 },
      ecommerce: { platform: 'shopify', productId: 'summer-collection-2025' }
    },
    {
      id: 2,
      date: '2025-06-23',
      time: '14:30',
      content: 'Behind the scenes of our photoshoot 📸',
      platforms: ['instagram', 'youtube'],
      status: 'scheduled',
      type: 'video',
      engagement: { likes: 0, comments: 0, shares: 0 }
    },
    {
      id: 3,
      date: '2025-06-24',
      time: '10:15',
      content: 'LinkedIn article about industry trends',
      platforms: ['linkedin'],
      status: 'draft',
      type: 'article',
      engagement: { likes: 0, comments: 0, shares: 0 }
    },
    {
      id: 4,
      date: '2025-06-22',
      time: '12:00',
      content: 'Product launch announcement! 🚀',
      platforms: ['facebook', 'twitter', 'linkedin'],
      status: 'published',
      type: 'image',
      engagement: { likes: 156, comments: 23, shares: 34 },
      ecommerce: { platform: 'woocommerce', productId: 'new-product-launch' }
    },
    {
      id: 5,
      date: '2025-06-25',
      time: '16:00',
      content: 'Customer testimonial video 💬',
      platforms: ['facebook', 'instagram', 'youtube'],
      status: 'scheduled',
      type: 'video',
      engagement: { likes: 0, comments: 0, shares: 0 }
    },
    {
      id: 6,
      date: '2025-06-26',
      time: '11:30',
      content: 'Flash sale starts tomorrow! ⚡ 50% off selected items',
      platforms: ['instagram', 'twitter'],
      status: 'scheduled',
      type: 'image',
      engagement: { likes: 0, comments: 0, shares: 0 },
      ecommerce: { platform: 'shopify', productId: 'flash-sale-items' }
    }
  ]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const platformIcons = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    linkedin: Linkedin,
    youtube: Youtube
  };

  const platformColors = {
    facebook: 'text-blue-600',
    instagram: 'text-pink-500',
    twitter: 'text-sky-500',
    linkedin: 'text-blue-700',
    youtube: 'text-red-600'
  };

  const statusColors = {
    scheduled: 'bg-blue-100 text-blue-800 border-blue-200',
    published: 'bg-green-100 text-green-800 border-green-200',
    draft: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    failed: 'bg-red-100 text-red-800 border-red-200'
  };

  const statusIcons = {
    scheduled: Clock,
    published: CheckCircle,
    draft: Edit,
    failed: XCircle
  };

  const typeIcons = {
    image: Image,
    video: Video,
    article: FileText
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDay = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }
    
    return days;
  };

  const getPostsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return scheduledPosts.filter(post => post.date === dateStr);
  };

  const filteredPosts = useMemo(() => {
    if (filter === 'all') return scheduledPosts;
    return scheduledPosts.filter(post => post.status === filter);
  }, [filter, scheduledPosts]);

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const PostCard = ({ post, mini = false }) => {
    const StatusIcon = statusIcons[post.status];
    const TypeIcon = typeIcons[post.type];

    if (mini) {
      return (
        <div className={`p-2 rounded-md border text-xs ${statusColors[post.status]} mb-1 cursor-pointer hover:shadow-sm transition-all`}>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1">
              <StatusIcon className="w-3 h-3" />
              <span className="font-medium">{post.time}</span>
            </div>
            <TypeIcon className="w-3 h-3" />
          </div>
          <div className="text-xs opacity-75 mb-1 line-clamp-2">
            {post.content.substring(0, 50)}...
          </div>
          <div className="flex gap-1">
            {post.platforms.map(platform => {
              const Icon = platformIcons[platform];
              return (
                <Icon key={platform} className={`w-3 h-3 ${platformColors[platform]}`} />
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-200">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[post.status]}`}>
              <StatusIcon className="w-3 h-3 inline mr-1" />
              {post.status}
            </div>
            <div className="text-sm text-gray-500">
              {post.date} at {post.time}
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <TypeIcon className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 capitalize">{post.type} Post</span>
            {post.ecommerce && (
              <div className="flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                <ShoppingBag className="w-3 h-3" />
                {post.ecommerce.platform}
              </div>
            )}
          </div>
          <p className="text-gray-800 text-sm line-clamp-3">{post.content}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {post.platforms.map(platform => {
                const Icon = platformIcons[platform];
                return (
                  <div key={platform} className="p-1 rounded bg-gray-100">
                    <Icon className={`w-4 h-4 ${platformColors[platform]}`} />
                  </div>
                );
              })}
            </div>
            
            {post.status === 'published' && (
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  {post.engagement.likes}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  {post.engagement.comments}
                </div>
                <div className="flex items-center gap-1">
                  <Share2 className="w-3 h-3" />
                  {post.engagement.shares}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {post.status === 'scheduled' && (
              <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                <Pause className="w-4 h-4" />
              </button>
            )}
            <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
              <Edit className="w-4 h-4" />
            </button>
            <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-50">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Content Calendar</h2>
            <p className="text-gray-600">Schedule and manage your social media posts</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Posts</option>
                <option value="scheduled">Scheduled</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
              </select>
            </div>
            
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === 'month' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === 'week' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Week
              </button>
            </div>
            
            <button
              onClick={() => setShowNewPostModal(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Post
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <h3 className="text-xl font-semibold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
          >
            Today
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
          {/* Day Headers */}
          {dayNames.map(day => (
            <div key={day} className="bg-gray-50 p-3 text-center">
              <span className="text-sm font-medium text-gray-700">{day}</span>
            </div>
          ))}
          
          {/* Calendar Days */}
          {generateCalendarDays().map((date, index) => {
            const posts = getPostsForDate(date);
            const isCurrentMonthDay = isCurrentMonth(date);
            const isTodayDate = isToday(date);
            
            return (
              <div
                key={index}
                className={`bg-white min-h-[120px] p-2 transition-all duration-200 cursor-pointer hover:bg-gray-50 ${
                  !isCurrentMonthDay ? 'opacity-50' : ''
                } ${isTodayDate ? 'ring-2 ring-blue-500 ring-inset' : ''}`}
                onClick={() => setSelectedDate(date)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${
                    isTodayDate 
                      ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center' 
                      : isCurrentMonthDay 
                        ? 'text-gray-900' 
                        : 'text-gray-400'
                  }`}>
                    {date.getDate()}
                  </span>
                  
                  {posts.length > 0 && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                      {posts.length}
                    </span>
                  )}
                </div>
                
                <div className="space-y-1">
                  {posts.slice(0, 3).map(post => (
                    <PostCard key={post.id} post={post} mini={true} />
                  ))}
                  {posts.length > 3 && (
                    <div className="text-xs text-gray-500 text-center py-1">
                      +{posts.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Posts */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Posts</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            {filteredPosts.filter(p => p.status === 'scheduled').length} scheduled
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.slice(0, 6).map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        
        {filteredPosts.length > 6 && (
          <div className="text-center mt-6">
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              View All Posts ({filteredPosts.length})
            </button>
          </div>
        )}
      </div>

      {/* Stats Footer */}
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
          <div className="flex gap-6">
            <div>Total Posts: <span className="font-medium text-gray-900">{scheduledPosts.length}</span></div>
            <div>Scheduled: <span className="font-medium text-blue-600">{scheduledPosts.filter(p => p.status === 'scheduled').length}</span></div>
            <div>Published: <span className="font-medium text-green-600">{scheduledPosts.filter(p => p.status === 'published').length}</span></div>
            <div>Drafts: <span className="font-medium text-yellow-600">{scheduledPosts.filter(p => p.status === 'draft').length}</span></div>
          </div>
          <div className="text-xs text-gray-500">
            Last updated: Just now
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;