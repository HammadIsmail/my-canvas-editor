"use client"
import React, { useState, useMemo } from 'react';
import { 
  BarChart3, TrendingUp, TrendingDown, Users, Heart, MessageCircle, Share2, 
  Eye, Clock, Calendar, DollarSign, ShoppingCart, Target, Award, Zap,
  Filter, Download, RefreshCw, MoreHorizontal, ArrowUpRight, ArrowDownRight,
  Facebook, Instagram, Twitter, Linkedin, Youtube, ChevronDown, ExternalLink,
  PieChart, Activity, Globe, Smartphone, Monitor, Tablet
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie,Cell, AreaChart, Area } from 'recharts';

const SocialMediaAnalytics = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['all']);
  const [viewType, setViewType] = useState('overview');
  
  // Sample data for charts
  const engagementData = [
    { date: '2024-01-01', likes: 120, comments: 45, shares: 23, reach: 2500 },
    { date: '2024-01-02', likes: 150, comments: 52, shares: 31, reach: 3200 },
    { date: '2024-01-03', likes: 95, comments: 38, shares: 18, reach: 2100 },
    { date: '2024-01-04', likes: 200, comments: 67, shares: 42, reach: 4100 },
    { date: '2024-01-05', likes: 180, comments: 59, shares: 35, reach: 3800 },
    { date: '2024-01-06', likes: 165, comments: 48, shares: 28, reach: 3400 },
    { date: '2024-01-07', likes: 210, comments: 72, shares: 45, reach: 4500 }
  ];

  const platformData = [
    { name: 'Instagram', value: 35, color: '#E4405F', posts: 45, engagement: 4.2 },
    { name: 'Facebook', value: 28, color: '#1877F2', posts: 32, engagement: 3.8 },
    { name: 'Twitter', value: 20, color: '#1DA1F2', posts: 28, engagement: 2.9 },
    { name: 'LinkedIn', value: 12, color: '#0A66C2', posts: 15, engagement: 5.1 },
    { name: 'YouTube', value: 5, color: '#FF0000', posts: 8, engagement: 6.3 }
  ];

  const ecommerceData = [
    { date: '2024-01-01', sales: 450, clicks: 120, conversion: 3.2 },
    { date: '2024-01-02', sales: 680, clicks: 150, conversion: 4.1 },
    { date: '2024-01-03', sales: 320, clicks: 95, conversion: 2.8 },
    { date: '2024-01-04', sales: 890, clicks: 200, conversion: 5.2 },
    { date: '2024-01-05', sales: 750, clicks: 180, conversion: 4.8 },
    { date: '2024-01-06', sales: 620, clicks: 165, conversion: 3.9 },
    { date: '2024-01-07', sales: 950, clicks: 210, conversion: 5.8 }
  ];

  const deviceData = [
    { name: 'Mobile', value: 65, color: '#10B981' },
    { name: 'Desktop', value: 25, color: '#3B82F6' },
    { name: 'Tablet', value: 10, color: '#F59E0B' }
  ];

  const topPosts = [
    {
      id: 1,
      platform: 'Instagram',
      content: 'Summer Collection Launch 🌟',
      engagement: 1250,
      reach: 15600,
      clicks: 89,
      date: '2024-01-07'
    },
    {
      id: 2,
      platform: 'Facebook',
      content: 'Customer Success Story',
      engagement: 890,
      reach: 12300,
      clicks: 67,
      date: '2024-01-06'
    },
    {
      id: 3,
      platform: 'Twitter',
      content: 'Industry Insights Thread',
      engagement: 650,
      reach: 8900,
      clicks: 45,
      date: '2024-01-05'
    }
  ];

  const metrics = [
    {
      title: 'Total Reach',
      value: '147.2K',
      change: '+12.5%',
      trend: 'up',
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Engagement Rate',
      value: '4.8%',
      change: '+0.8%',
      trend: 'up',
      icon: Heart,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      title: 'Total Posts',
      value: '128',
      change: '+15',
      trend: 'up',
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Click-through Rate',
      value: '2.4%',
      change: '-0.2%',
      trend: 'down',
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'E-commerce Sales',
      value: '$12.4K',
      change: '+23.1%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Conversion Rate',
      value: '4.2%',
      change: '+1.1%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    }
  ];

  const getPlatformIcon = (platform) => {
    const icons = {
      'Instagram': Instagram,
      'Facebook': Facebook,
      'Twitter': Twitter,
      'LinkedIn': Linkedin,
      'YouTube': Youtube
    };
    return icons[platform] || Globe;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Analytics Dashboard</h1>
            <p className="text-gray-600">Track your social media performance and e-commerce metrics</p>
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 3 months</option>
              <option value="1y">Last year</option>
            </select>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
            
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <RefreshCw className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
        
        {/* View Toggle */}
        <div className="flex items-center gap-1 mt-4 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setViewType('overview')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewType === 'overview' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setViewType('platforms')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewType === 'platforms' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Platforms
          </button>
          <button
            onClick={() => setViewType('ecommerce')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewType === 'ecommerce' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            E-commerce
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <IconComponent className={`w-5 h-5 ${metric.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {metric.change}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.title}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Based on View Type */}
        {viewType === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Engagement Trends */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Engagement Trends</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="likes" 
                      stackId="1" 
                      stroke="#3B82F6" 
                      fill="#3B82F6" 
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="comments" 
                      stackId="1" 
                      stroke="#10B981" 
                      fill="#10B981" 
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="shares" 
                      stackId="1" 
                      stroke="#F59E0B" 
                      fill="#F59E0B" 
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Platform Distribution */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Platform Performance</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {viewType === 'ecommerce' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Sales Performance */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Sales Performance</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ecommerceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="clicks" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Device Analytics */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Traffic by Device</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {deviceData.map((device, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: device.color }}></div>
                      <span className="font-medium text-gray-900">{device.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${device.value}%`,
                            backgroundColor: device.color
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-700 w-12">{device.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Platform Details & Top Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Platform Stats */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Platform Statistics</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {platformData.map((platform, index) => {
                const IconComponent = getPlatformIcon(platform.name);
                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: `${platform.color}15` }}>
                        <IconComponent className="w-5 h-5" style={{ color: platform.color }} />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{platform.name}</div>
                        <div className="text-sm text-gray-600">{platform.posts} posts this month</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{platform.engagement}%</div>
                      <div className="text-sm text-gray-600">engagement</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Performing Posts */}
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Top Posts</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {topPosts.map((post, index) => {
                const IconComponent = getPlatformIcon(post.platform);
                return (
                  <div key={index} className="p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-all">
                    <div className="flex items-start gap-3 mb-3">
                      <IconComponent className="w-4 h-4 text-gray-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 mb-1">{post.content}</div>
                        <div className="text-xs text-gray-500">{post.platform} • {post.date}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">{post.engagement.toLocaleString()}</div>
                        <div className="text-gray-600">Engagement</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">{post.reach.toLocaleString()}</div>
                        <div className="text-gray-600">Reach</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">{post.clicks}</div>
                        <div className="text-gray-600">Clicks</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaAnalytics;