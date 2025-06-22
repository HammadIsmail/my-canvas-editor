"use client";

import { useState } from 'react';
import { Check, Plus, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';


const socialAccounts= [
  {
    id: 'fb-1',
    platform: 'Facebook',
    username: '@mybusiness',
    avatar: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    followers: '12.5K',
    connected: true,
    color: 'bg-blue-600'
  },
  {
    id: 'ig-1',
    platform: 'Instagram',
    username: '@mybusiness',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    followers: '8.2K',
    connected: true,
    color: 'bg-gradient-to-br from-purple-600 to-pink-600'
  },
  {
    id: 'tw-1',
    platform: 'Twitter',
    username: '@mybusiness',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    followers: '5.1K',
    connected: true,
    color: 'bg-sky-500'
  },
  {
    id: 'li-1',
    platform: 'LinkedIn',
    username: 'My Business',
    avatar: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    followers: '3.8K',
    connected: true,
    color: 'bg-blue-700'
  },
  {
    id: 'yt-1',
    platform: 'YouTube',
    username: 'My Business Channel',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    followers: '2.3K',
    connected: false,
    color: 'bg-red-600'
  },
  {
    id: 'tt-1',
    platform: 'TikTok',
    username: '@mybusiness',
    avatar: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    followers: '15.7K',
    connected: false,
    color: 'bg-black'
  }
];

export function SocialAccountSelector({ selectedAccounts, onAccountsSelected, onBack }) {
  const [selected, setSelected] = useState(selectedAccounts);

  const handleAccountToggle = (accountId) => {
    const account = socialAccounts.find(acc => acc.id === accountId);
    if (!account?.connected) return;

    setSelected(prev => 
      prev.includes(accountId)
        ? prev.filter(id => id !== accountId)
        : [...prev, accountId]
    );
  };

  const handleContinue = () => {
    onAccountsSelected(selected);
  };

  const connectedAccounts = socialAccounts.filter(acc => acc.connected);
  const disconnectedAccounts = socialAccounts.filter(acc => !acc.connected);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Social Accounts</h2>
        <p className="text-gray-600">Choose where you want to publish your content</p>
      </div>

      {/* Connected Accounts */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Accounts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {connectedAccounts.map(account => (
            <button
              key={account.id}
              onClick={() => handleAccountToggle(account.id)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                selected.includes(account.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${account.color} flex items-center justify-center text-white font-bold text-sm`}>
                    {account.platform[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{account.platform}</div>
                    <div className="text-sm text-gray-600">{account.username}</div>
                  </div>
                </div>
                
                {selected.includes(account.id) && (
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {account.followers} followers
                </div>
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={account.avatar}
                    alt={account.platform}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Disconnected Accounts */}
      {disconnectedAccounts.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Platforms</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {disconnectedAccounts.map(account => (
              <div
                key={account.id}
                className="p-4 rounded-xl border-2 border-gray-200 bg-gray-50 opacity-75"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${account.color} flex items-center justify-center text-white font-bold text-sm`}>
                      {account.platform[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{account.platform}</div>
                      <div className="text-sm text-gray-500">Not connected</div>
                    </div>
                  </div>
                  
                  <Button size="sm" variant="outline" className="text-xs">
                    <Plus className="w-3 h-3 mr-1" />
                    Connect
                  </Button>
                </div>
                
                <div className="text-sm text-gray-500">
                  Connect to start posting
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selection Summary */}
      {selected.length > 0 && (
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">
            Selected Accounts ({selected.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {selected.map(accountId => {
              const account = socialAccounts.find(acc => acc.id === accountId);
              return account ? (
                <span
                  key={accountId}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {account.platform}
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={selected.length === 0}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white disabled:opacity-50"
        >
          Continue ({selected.length})
        </Button>
      </div>
    </div>
  );
}