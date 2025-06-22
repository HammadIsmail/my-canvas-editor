import React, { useState, useMemo } from 'react';
import { Search, ShoppingBag, Store, Package, CreditCard, Truck, Users, Globe, BarChart3, Settings, Star, TrendingUp, DollarSign, Target, Award, Crown, Zap, Shield, Lock, Check, X, Plus, RefreshCw, ExternalLink, Eye, Edit, Copy, Download, Upload, Filter, Grid, List, AlertCircle, Info, Calendar, Clock, Bookmark, Tag, Heart, Share2, MessageSquare, Bell, Mail, Phone, MapPin, Building, Briefcase, Database, Cloud, Cpu, Monitor, Smartphone, Tablet, Laptop, Headphones, Camera, Video, Image, FileText, Folder, Archive, Save, Trash2, RotateCcw, Maximize, Minimize, Volume2, Wifi, Battery, Bluetooth, HelpCircle } from 'lucide-react';

const EcommerceIntegrationManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [connectedStores, setConnectedStores] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState('all');

  const ecommercePlatforms = [
    {
      id: 'shopify',
      name: 'Shopify',
      icon: ShoppingBag,
      color: 'bg-green-600',
      hoverColor: 'hover:bg-green-700',
      description: 'Complete commerce platform',
      category: 'All-in-One',
      marketShare: '10.3%',
      pricing: 'From $29/month',
      features: ['Inventory Management', 'Payment Processing', 'Mobile Responsive'],
      buttonText: 'Connect Store'
    },
    {
      id: 'woocommerce',
      name: 'WooCommerce',
      icon: Store,
      color: 'bg-purple-600',
      hoverColor: 'hover:bg-purple-700',
      description: 'WordPress e-commerce plugin',
      category: 'WordPress',
      marketShare: '26.9%',
      pricing: 'Free + Extensions',
      features: ['WordPress Integration', 'Flexible Customization', 'Open Source'],
      buttonText: 'Connect Store'
    },
    {
      id: 'magento',
      name: 'Magento',
      icon: Package,
      color: 'bg-orange-600',
      hoverColor: 'hover:bg-orange-700',
      description: 'Enterprise e-commerce solution',
      category: 'Enterprise',
      marketShare: '7.2%',
      pricing: 'From $22K/year',
      features: ['Multi-Store Management', 'B2B Features', 'Advanced SEO'],
      buttonText: 'Connect Store'
    },
    {
      id: 'bigcommerce',
      name: 'BigCommerce',
      icon: Building,
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      description: 'Enterprise e-commerce platform',
      category: 'All-in-One',
      marketShare: '3.1%',
      pricing: 'From $29/month',
      features: ['No Transaction Fees', 'Built-in Features', 'API-First'],
      buttonText: 'Connect Store'
    },
    {
      id: 'prestashop',
      name: 'PrestaShop',
      icon: Globe,
      color: 'bg-pink-600',
      hoverColor: 'hover:bg-pink-700',
      description: 'Open source e-commerce',
      category: 'Open Source',
      marketShare: '5.1%',
      pricing: 'Free',
      features: ['Multi-Language', 'Theme Customization', 'Module Library'],
      buttonText: 'Connect Store'
    },
    {
      id: 'opencart',
      name: 'OpenCart',
      icon: Package,
      color: 'bg-cyan-600',
      hoverColor: 'hover:bg-cyan-700',
      description: 'Free e-commerce platform',
      category: 'Open Source',
      marketShare: '4.8%',
      pricing: 'Free',
      features: ['Easy Setup', 'Multi-Currency', 'Marketplace'],
      buttonText: 'Connect Store'
    },
    {
      id: 'squarespace',
      name: 'Squarespace Commerce',
      icon: Star,
      color: 'bg-gray-800',
      hoverColor: 'hover:bg-gray-900',
      description: 'Design-focused e-commerce',
      category: 'Design-First',
      marketShare: '3.4%',
      pricing: 'From $18/month',
      features: ['Beautiful Templates', 'Integrated Analytics', 'Mobile App'],
      buttonText: 'Connect Store'
    },
    {
      id: 'wix',
      name: 'Wix eCommerce',
      icon: Zap,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      description: 'Drag-and-drop store builder',
      category: 'Website Builder',
      marketShare: '2.6%',
      pricing: 'From $23/month',
      features: ['Drag & Drop Editor', 'App Market', 'SEO Tools'],
      buttonText: 'Connect Store'
    },
    {
      id: 'salesforce',
      name: 'Salesforce Commerce',
      icon: Cloud,
      color: 'bg-blue-700',
      hoverColor: 'hover:bg-blue-800',
      description: 'Enterprise commerce cloud',
      category: 'Enterprise',
      marketShare: '2.8%',
      pricing: 'Custom Pricing',
      features: ['AI-Powered Personalization', 'Omnichannel', 'CRM Integration'],
      buttonText: 'Connect Store'
    },
    {
      id: 'volusion',
      name: 'Volusion',
      icon: TrendingUp,
      color: 'bg-red-600',
      hoverColor: 'hover:bg-red-700',
      description: 'All-in-one e-commerce solution',
      category: 'All-in-One',
      marketShare: '1.2%',
      pricing: 'From $35/month',
      features: ['Inventory Management', 'Marketing Tools', 'Responsive Design'],
      buttonText: 'Connect Store'
    },
    {
      id: 'ecwid',
      name: 'Ecwid',
      icon: Globe,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      description: 'Add store to any website',
      category: 'Widget',
      marketShare: '1.8%',
      pricing: 'Free + Paid Plans',
      features: ['Easy Integration', 'Social Selling', 'Mobile POS'],
      buttonText: 'Connect Store'
    },
    {
      id: 'amazon',
      name: 'Amazon Seller',
      icon: Package,
      color: 'bg-yellow-600',
      hoverColor: 'hover:bg-yellow-700',
      description: 'Sell on Amazon marketplace',
      category: 'Marketplace',
      marketShare: '37.8%',
      pricing: 'From $39.99/month',
      features: ['FBA Integration', 'Prime Shipping', 'Global Reach'],
      buttonText: 'Connect Store'
    },
    {
      id: 'ebay',
      name: 'eBay Store',
      icon: Briefcase,
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      description: 'Online auction & marketplace',
      category: 'Marketplace',
      marketShare: '6.6%',
      pricing: 'From $21.95/month',
      features: ['Auction Format', 'Global Marketplace', 'Seller Tools'],
      buttonText: 'Connect Store'
    },
    {
      id: 'etsy',
      name: 'Etsy Shop',
      icon: Heart,
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      description: 'Handmade & vintage marketplace',
      category: 'Marketplace',
      marketShare: '4.1%',
      pricing: '$0.20 per listing',
      features: ['Handmade Focus', 'Creative Community', 'Marketing Tools'],
      buttonText: 'Connect Store'
    },
    {
      id: '3dcart',
      name: '3dcart',
      icon: ShoppingBag,
      color: 'bg-indigo-600',
      hoverColor: 'hover:bg-indigo-700',
      description: 'Feature-rich e-commerce platform',
      category: 'All-in-One',
      marketShare: '1.1%',
      pricing: 'From $19/month',
      features: ['Built-in Features', 'SEO Tools', 'Mobile Responsive'],
      buttonText: 'Connect Store'
    },
    {
      id: 'nopcommerce',
      name: 'nopCommerce',
      icon: Database,
      color: 'bg-purple-700',
      hoverColor: 'hover:bg-purple-800',
      description: 'ASP.NET e-commerce platform',
      category: 'Open Source',
      marketShare: '0.8%',
      pricing: 'Free',
      features: ['.NET Framework', 'Multi-Vendor', 'Plugin Architecture'],
      buttonText: 'Connect Store'
    },
    {
      id: 'drupalcommerce',
      name: 'Drupal Commerce',
      icon: Cpu,
      color: 'bg-blue-800',
      hoverColor: 'hover:bg-blue-900',
      description: 'Drupal-based e-commerce',
      category: 'CMS-Based',
      marketShare: '0.6%',
      pricing: 'Free',
      features: ['Drupal Integration', 'Flexible Architecture', 'Content Management'],
      buttonText: 'Connect Store'
    },
    {
      id: 'spreecommerce',
      name: 'Spree Commerce',
      icon: Star,
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      description: 'Ruby on Rails e-commerce',
      category: 'Open Source',
      marketShare: '0.4%',
      pricing: 'Free',
      features: ['Ruby on Rails', 'API-First', 'Modular Design'],
      buttonText: 'Connect Store'
    },
    {
      id: 'oscommerce',
      name: 'osCommerce',
      icon: Globe,
      color: 'bg-green-700',
      hoverColor: 'hover:bg-green-800',
      description: 'Pioneer e-commerce platform',
      category: 'Open Source',
      marketShare: '0.5%',
      pricing: 'Free',
      features: ['Community Driven', 'Add-ons Library', 'Multi-Language'],
      buttonText: 'Connect Store'
    },
    {
      id: 'cs-cart',
      name: 'CS-Cart',
      icon: ShoppingBag,
      color: 'bg-teal-600',
      hoverColor: 'hover:bg-teal-700',
      description: 'Multi-vendor marketplace platform',
      category: 'Multi-Vendor',
      marketShare: '0.7%',
      pricing: 'From $385 one-time',
      features: ['Multi-Vendor Support', 'Responsive Design', 'Payment Gateways'],
      buttonText: 'Connect Store'
    }
  ];

  const categories = ['all', ...new Set(ecommercePlatforms.map(p => p.category))];

  const filteredPlatforms = useMemo(() => {
    let filtered = ecommercePlatforms;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(platform => platform.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(platform =>
        platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        platform.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        platform.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        platform.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    return filtered;
  }, [searchQuery, selectedCategory]);

  const toggleConnection = (platformId) => {
    setConnectedStores(prev => {
      const newSet = new Set(prev);
      if (newSet.has(platformId)) {
        newSet.delete(platformId);
      } else {
        newSet.add(platformId);
      }
      return newSet;
    });
  };

  const connectedCount = connectedStores.size;
  const totalPlatforms = ecommercePlatforms.length;

  const getCategoryColor = (category) => {
    const colors = {
      'All-in-One': 'bg-blue-100 text-blue-800',
      'WordPress': 'bg-purple-100 text-purple-800',
      'Enterprise': 'bg-red-100 text-red-800',
      'Open Source': 'bg-green-100 text-green-800',
      'Design-First': 'bg-pink-100 text-pink-800',
      'Website Builder': 'bg-yellow-100 text-yellow-800',
      'Widget': 'bg-cyan-100 text-cyan-800',
      'Marketplace': 'bg-orange-100 text-orange-800',
      'CMS-Based': 'bg-indigo-100 text-indigo-800',
      'Multi-Vendor': 'bg-teal-100 text-teal-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-50">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">E-commerce Integration</h2>
            <p className="text-gray-600">Connect and manage your online stores and marketplaces</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-lg border border-green-200">
              <div className="text-sm font-medium text-green-900">
                {connectedCount} of {totalPlatforms} connected
              </div>
              <div className="w-full bg-green-200 rounded-full h-1.5 mt-1">
                <div 
                  className="bg-green-600 h-1.5 rounded-full transition-all duration-300"
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

      {/* Search and Filters */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search e-commerce platforms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white"
            >
              <option value="all">All Categories</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        
        {(searchQuery || selectedCategory !== 'all') && (
          <div className="mt-3 text-sm text-gray-600">
            Found {filteredPlatforms.length} platform{filteredPlatforms.length !== 1 ? 's' : ''}
            {searchQuery && ` matching "${searchQuery}"`}
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </div>
        )}
      </div>

      {/* Platforms Grid/List */}
      <div className="p-6">
        {filteredPlatforms.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No platforms found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredPlatforms.map((platform) => {
              const IconComponent = platform.icon;
              const isConnected = connectedStores.has(platform.id);

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
                    <div className="absolute top-4 right-4 z-10">
                      <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  )}

                  <div className={`${viewMode === 'list' ? 'flex items-center p-6 flex-1' : 'p-6'}`}>
                    {/* Icon and Header */}
                    <div className={`${viewMode === 'list' ? 'mr-6' : 'mb-4'} flex-shrink-0`}>
                      <div className={`w-14 h-14 rounded-xl ${platform.color} flex items-center justify-center transition-all duration-300 group-hover:scale-110 mb-3`}>
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      
                      <div className={`${viewMode === 'list' ? 'hidden' : ''}`}>
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">{platform.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{platform.description}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                      {viewMode === 'list' && (
                        <div className="mb-4">
                          <h3 className="font-semibold text-gray-900 text-lg mb-1">{platform.name}</h3>
                          <p className="text-gray-600 text-sm">{platform.description}</p>
                        </div>
                      )}

                      <div className={`${viewMode === 'list' ? 'flex items-center justify-between' : ''}`}>
                        <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                          {/* Category and Stats */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(platform.category)}`}>
                              {platform.category}
                            </span>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              {platform.marketShare} market
                            </span>
                          </div>

                          {/* Pricing */}
                          <div className="mb-3">
                            <div className="flex items-center text-sm text-gray-600">
                              <DollarSign className="w-4 h-4 mr-1" />
                              <span className="font-medium">{platform.pricing}</span>
                            </div>
                          </div>

                          {/* Features */}
                          <div className="mb-4">
                            <div className="text-xs text-gray-500 mb-2">Key Features:</div>
                            <div className="flex flex-wrap gap-1">
                              {platform.features.map((feature, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Connect Button */}
                        <div className={`${viewMode === 'list' ? 'ml-6' : ''}`}>
                          <button
                            onClick={() => toggleConnection(platform.id)}
                            className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
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
              <div>Categories: <span className="font-medium text-purple-600">{categories.length - 1}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EcommerceIntegrationManager;