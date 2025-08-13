import { X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
  Users,
  Music,
  Hash,
  Heart,
  Send,
  MessageSquare,
} from "lucide-react";

const ConnectAccountSlider = ({ isOpen, onClose }) => {
  const socialPlatforms = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      description: 'Connect with friends and family',
      category: 'Social Networking',
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
      buttonText: 'Connect'
    },
  ];

  return (
    <div 
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-bold">Connect Accounts</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>
      <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
        <div className="space-y-3">
          {socialPlatforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <Button 
                key={platform.id}
                variant="outline" 
                className="w-full justify-start gap-2"
              >
                <span className={`${platform.color} text-white rounded p-1 flex items-center justify-center`}>
                  <Icon className="w-4 h-4" />
                </span>
                Connect {platform.name}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ConnectAccountSlider;