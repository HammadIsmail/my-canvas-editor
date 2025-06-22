import React, { useState } from 'react';
import { User, CreditCard, Calendar, Download, Edit, Save, X, Check, AlertCircle, Shield, Bell, Globe, Smartphone, Mail, Phone, MapPin, Building, Users, Crown, Zap, Star, TrendingUp, BarChart3, Settings, Lock, Unlock, Eye, EyeOff, Copy, RefreshCw, Plus, Trash2, ExternalLink, ChevronRight, ChevronDown, Info, HelpCircle, Award, Target, Package, DollarSign, Receipt, FileText, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const SettingsPages = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showBillingDetails, setShowBillingDetails] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('pro');

  // Profile state
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Social Media Agency',
    website: 'https://example.com',
    bio: 'Digital marketing specialist with 5+ years of experience in social media automation and content strategy.',
    location: 'New York, NY',
    timezone: 'America/New_York',
    avatar: null
  });

  const [billingData, setBillingData] = useState({
    currentPlan: 'Pro Plan',
    billingCycle: 'monthly',
    nextBilling: '2025-07-22',
    amount: '$49.99',
    paymentMethod: '**** **** **** 4532',
    billingAddress: {
      street: '123 Business St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States'
    }
  });

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: { monthly: 19, annual: 190 },
      features: [
        '5 Social Accounts',
        '100 Posts/Month',
        'Basic Analytics',
        'Email Support',
        'Content Calendar'
      ],
      popular: false,
      color: 'border-gray-200'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: { monthly: 49, annual: 490 },
      features: [
        '15 Social Accounts',
        '500 Posts/Month',
        'Advanced Analytics',
        'Priority Support',
        'Team Collaboration',
        'Custom Branding'
      ],
      popular: true,
      color: 'border-blue-500 ring-2 ring-blue-200'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: { monthly: 99, annual: 990 },
      features: [
        'Unlimited Accounts',
        'Unlimited Posts',
        'White-label Solution',
        '24/7 Phone Support',
        'API Access',
        'Custom Integrations'
      ],
      popular: false,
      color: 'border-gray-200'
    }
  ];

  const invoices = [
    { id: 'INV-001', date: '2025-06-22', amount: '$49.99', status: 'paid', plan: 'Pro Plan' },
    { id: 'INV-002', date: '2025-05-22', amount: '$49.99', status: 'paid', plan: 'Pro Plan' },
    { id: 'INV-003', date: '2025-04-22', amount: '$49.99', status: 'paid', plan: 'Pro Plan' },
    { id: 'INV-004', date: '2025-03-22', amount: '$49.99', status: 'paid', plan: 'Pro Plan' }
  ];

  const handleProfileSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handlePlanChange = (planId) => {
    setSelectedPlan(planId);
    // Plan change logic here
  };

  const ProfilePage = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-gray-600">{profileData.email}</p>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <MapPin className="w-4 h-4 mr-1" />
                {profileData.location}
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-lg font-semibold mb-6">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              value={profileData.firstName}
              onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              value={profileData.lastName}
              onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
            <input
              type="text"
              value={profileData.company}
              onChange={(e) => setProfileData({...profileData, company: e.target.value})}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
            <input
              type="url"
              value={profileData.website}
              onChange={(e) => setProfileData({...profileData, website: e.target.value})}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
          <textarea
            value={profileData.bio}
            onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
            disabled={!isEditing}
            rows={4}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
          />
        </div>

        {isEditing && (
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleProfileSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Account Security */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-lg font-semibold mb-6">Account Security</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <div className="font-medium">Two-Factor Authentication</div>
                <div className="text-sm text-gray-600">Add an extra layer of security</div>
              </div>
            </div>
            <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
              Enabled
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Lock className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <div className="font-medium">Password</div>
                <div className="text-sm text-gray-600">Last changed 30 days ago</div>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const BillingPage = () => (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{billingData.currentPlan}</h2>
              <p className="text-gray-600">Next billing: {billingData.nextBilling}</p>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <CreditCard className="w-4 h-4 mr-1" />
                {billingData.paymentMethod}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{billingData.amount}</div>
            <div className="text-sm text-gray-600">per month</div>
          </div>
        </div>
      </div>

      {/* Plan Selection */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Choose Your Plan</h3>
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setBillingData({...billingData, billingCycle: 'monthly'})}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                billingData.billingCycle === 'monthly' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingData({...billingData, billingCycle: 'annual'})}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                billingData.billingCycle === 'annual' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-xl border-2 p-6 transition-all cursor-pointer hover:shadow-lg ${
                plan.popular ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
              } ${selectedPlan === plan.id ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => handlePlanChange(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{plan.name}</h4>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  ${plan.price[billingData.billingCycle]}
                </div>
                <div className="text-sm text-gray-600">
                  per {billingData.billingCycle === 'monthly' ? 'month' : 'year'}
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  selectedPlan === plan.id
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {selectedPlan === plan.id ? 'Current Plan' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Payment Method</h3>
          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </button>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CreditCard className="w-8 h-8 text-gray-400 mr-3" />
              <div>
                <div className="font-medium">•••• •••• •••• 4532</div>
                <div className="text-sm text-gray-600">Expires 12/2027</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Edit className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Billing History</h3>
          <button
            onClick={() => setShowBillingDetails(!showBillingDetails)}
            className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            {showBillingDetails ? <ChevronDown className="w-4 h-4 mr-2" /> : <ChevronRight className="w-4 h-4 mr-2" />}
            View Details
          </button>
        </div>
        
        {showBillingDetails && (
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Receipt className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <div className="font-medium">{invoice.id}</div>
                    <div className="text-sm text-gray-600">{invoice.plan} - {invoice.date}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-900">{invoice.amount}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    invoice.status === 'paid' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {invoice.status === 'paid' ? 'Paid' : 'Pending'}
                  </span>
                  <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Social Accounts</div>
              <div className="text-2xl font-bold text-gray-900">12/15</div>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Posts This Month</div>
              <div className="text-2xl font-bold text-gray-900">234/500</div>
            </div>
            <BarChart3 className="w-8 h-8 text-green-600" />
          </div>
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: '47%' }}></div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">API Calls</div>
              <div className="text-2xl font-bold text-gray-900">1.2K/10K</div>
            </div>
            <Zap className="w-8 h-8 text-purple-600" />
          </div>
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '12%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'profile'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <User className="w-5 h-5 inline mr-2" />
              Profile Settings
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'billing'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <CreditCard className="w-5 h-5 inline mr-2" />
              Billing & Plans
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'profile' ? <ProfilePage /> : <BillingPage />}
    </div>
  );
};

export default SettingsPages;