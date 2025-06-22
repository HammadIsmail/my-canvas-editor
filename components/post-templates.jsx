"use client";

import { useState } from 'react';
import { Search, Filter, Heart, Download, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';


const templates= [
  {
    id: '1',
    title: 'Summer Sale Announcement',
    category: 'Sales',
    image: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
    text: '🌞 SUMMER SALE IS HERE! 🌞\n\nGet ready for our biggest sale of the season! Up to 50% off on selected items.\n\n✨ Limited time offer\n🚚 Free shipping on orders over $50\n💳 Easy returns\n\n#SummerSale #Shopping #Deals',
    tags: ['sale', 'summer', 'discount'],
    likes: 234
  },
  {
    id: '2',
    title: 'Product Launch Teaser',
    category: 'Product',
    image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
    text: '🚀 Something BIG is coming! 🚀\n\nWe\'ve been working on something special just for you. Can you guess what it is?\n\n💡 Hint: It\'s going to change the way you work\n⏰ Launching next week\n🎉 Early bird pricing available\n\n#ComingSoon #Innovation #ProductLaunch',
    tags: ['launch', 'teaser', 'product'],
    likes: 189
  },
  {
    id: '3',
    title: 'Customer Success Story',
    category: 'Testimonial',
    image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
    text: '⭐ SUCCESS STORY SPOTLIGHT ⭐\n\nMeet Sarah, who transformed her business using our platform!\n\n"In just 3 months, I increased my revenue by 150% and saved 20 hours per week. This platform is a game-changer!"\n\n📈 Results speak for themselves\n💪 Join thousands of successful entrepreneurs\n\n#SuccessStory #Testimonial #BusinessGrowth',
    tags: ['testimonial', 'success', 'customer'],
    likes: 156
  },
  {
    id: '4',
    title: 'Monday Motivation',
    category: 'Inspiration',
    image: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
    text: '💪 MONDAY MOTIVATION 💪\n\n"Success is not final, failure is not fatal: it is the courage to continue that counts."\n\nStart your week with purpose and determination. Every small step counts towards your bigger goals.\n\n🎯 What\'s your Monday goal?\n✨ Share in the comments!\n\n#MondayMotivation #Success #Goals',
    tags: ['motivation', 'monday', 'inspiration'],
    likes: 312
  },
  {
    id: '5',
    title: 'Behind the Scenes',
    category: 'Lifestyle',
    image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
    text: '🎬 BEHIND THE SCENES 🎬\n\nEver wondered what goes on behind the magic? Here\'s a sneak peek into our creative process!\n\n☕ Fueled by coffee and creativity\n💡 Brainstorming sessions that spark innovation\n🤝 Teamwork makes the dream work\n\nWhat would you like to see more of?\n\n#BehindTheScenes #TeamWork #Creative',
    tags: ['behind-scenes', 'team', 'process'],
    likes: 98
  },
  {
    id: '6',
    title: 'Tips & Tricks',
    category: 'Educational',
    image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
    text: '💡 PRO TIP TUESDAY 💡\n\n5 Quick Ways to Boost Your Productivity:\n\n1️⃣ Time-block your calendar\n2️⃣ Use the 2-minute rule\n3️⃣ Eliminate distractions\n4️⃣ Take regular breaks\n5️⃣ Plan your day the night before\n\nWhich tip will you try first?\n\n#ProductivityTips #TipTuesday #Efficiency',
    tags: ['tips', 'productivity', 'education'],
    likes: 267
  }
];

const categories = ['All', 'Sales', 'Product', 'Testimonial', 'Inspiration', 'Lifestyle', 'Educational'];

export function PostTemplates({ onTemplateSelected, onBack }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleTemplateSelect = (template) => {
    onTemplateSelected({
      text: template.text,
      images: [template.image],
      video: null,
      title: template.title
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose a Template</h2>
        <p className="text-gray-600">Start with professionally designed templates and customize them</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-96 overflow-y-auto">
        {filteredTemplates.map(template => (
          <div
            key={template.id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <img
                src={template.image}
                alt={template.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded-md">
                  {template.category}
                </span>
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-black bg-opacity-70 text-white px-2 py-1 rounded-md text-xs">
                <Heart className="w-3 h-3" />
                {template.likes}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{template.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">{template.text}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {template.tags.slice(0, 2).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Use Template
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">No templates found</div>
          <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>
    </div>
  );
}