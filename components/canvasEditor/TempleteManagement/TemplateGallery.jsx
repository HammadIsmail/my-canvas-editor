import { X, Search, Heart, Download, Eye, Star, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';

const TemplateGallery = ({ 
  showTemplates, 
  setShowTemplates, 
  canvas 
}) => {
  const [designs, setDesigns] = useState([]);
  const [templatesLoading, setTemplatesLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All', icon: '🎨' },
    { value: 'social-media', label: 'Social', icon: '📱' },
    { value: 'marketing', label: 'Marketing', icon: '📊' },
    { value: 'presentation', label: 'Presentation', icon: '📽️' },
    { value: 'print', label: 'Print', icon: '🖨️' },
    { value: 'web', label: 'Web', icon: '🌐' },
    { value: 'other', label: 'Other', icon: '📄' }
  ];

  // Fetch templates
  const fetchTemplates = async () => {
    setTemplatesLoading(true);
    try {
      const params = new URLSearchParams({
        page: '1',
        limit: '20',
        category: selectedCategory,
        search: searchTerm,
        sort: 'newest',
        public: 'true'
      });

      const response = await fetch(`/api/designs?${params}`);
      if (response.ok) {
        const data = await response.json();
        setDesigns(data.designs || []);
      }
    } catch (error) {
      console.error('Error fetching designs:', error);
    } finally {
      setTemplatesLoading(false);
    }
  };

  const handleUseTemplate = async (design) => {
    try {
      await fetch(`/api/designs/${design._id}/use`, {
        method: 'POST'
      });

      const response = await fetch(`/api/designs/${design._id}`);
      const data = await response.json();

      const canvasData = JSON.parse(data.design.canvasData);
      
      canvas.clear();
      canvas.loadFromJSON(canvasData, () => {
        canvas.renderAll();
        setShowTemplates(false);
      });
    } catch (error) {
      console.error('Error using template:', error);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // Load templates when gallery opens
  useEffect(() => {
    if (showTemplates) {
      fetchTemplates();
    }
  }, [showTemplates, selectedCategory, searchTerm]);

  return (
    <div className="fixed left-16 top-0 bottom-0 w-80 bg-white border-r shadow-lg z-50 flex flex-col">
      <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50">
        <div>
          <h3 className="font-bold text-lg text-gray-800">Templates</h3>
          <p className="text-sm text-gray-600">Choose a design to start</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowTemplates(false)}
          className="p-2 hover:bg-white/50 rounded-lg"
        >
          <X size={16} />
        </Button>
      </div>
      
      {/* Search and Filter */}
      <div className="p-4 border-b bg-gray-50 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-9 text-sm rounded-lg border-gray-200"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="h-9 text-sm rounded-lg border-gray-200">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="rounded-lg">
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value} className="rounded-md">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{category.icon}</span>
                  <span className="text-sm">{category.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Templates List */}
      <div className="flex-1 overflow-y-auto">
        {templatesLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Loading templates...</p>
            </div>
          </div>
        ) : designs.length === 0 ? (
          <div className="text-center py-12 px-4">
            <div className="text-4xl mb-3">🎨</div>
            <p className="text-sm text-gray-600 mb-2">No templates found</p>
            <p className="text-xs text-gray-500">Try adjusting your search</p>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {designs.map((design) => (
              <div
                key={design._id}
                className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 hover:border-blue-200"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={design.thumbnail}
                    alt={design.title}
                    className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                    onClick={() => handleUseTemplate(design)}
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Status badges */}
                  <div className="absolute top-2 left-2 flex gap-1">
                    {design.isPublic && (
                      <Badge variant="secondary" className="bg-green-500/90 text-white border-0 text-xs px-2 py-0.5 rounded-full">
                        Public
                      </Badge>
                    )}
                    {design.usage.likes > 100 && (
                      <Badge variant="secondary" className="bg-amber-500/90 text-white border-0 text-xs px-2 py-0.5 rounded-full">
                        <Star size={8} className="mr-1" />
                        Popular
                      </Badge>
                    )}
                  </div>
                  
                  {/* Category */}
                  <div className="absolute top-2 right-2 text-lg bg-white/90 backdrop-blur-sm rounded-full p-1">
                    {categories.find(c => c.value === design.category)?.icon || '🎨'}
                  </div>
                  
                  {/* Use button */}
                  <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      onClick={() => handleUseTemplate(design)}
                      size="sm"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 rounded-lg"
                    >
                      Use Template
                    </Button>
                  </div>
                </div>
                
                <div className="p-3">
                  <h4 className="font-medium text-sm text-gray-800 mb-1 line-clamp-1">
                    {design.title}
                  </h4>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span className="line-clamp-1">{design.author?.name || 'Anonymous'}</span>
                    <div className="flex items-center gap-1">
                      <Star size={10} className="fill-amber-400 text-amber-400" />
                      <span>{((design.usage?.likes || 0) / Math.max(design.usage?.views || 1, 1) * 5).toFixed(1)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Eye size={10} />
                        <span>{formatNumber(design.usage?.views || 0)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart size={10} />
                        <span>{formatNumber(design.usage?.likes || 0)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download size={10} />
                        <span>{formatNumber(design.usage?.downloads || 0)}</span>
                      </div>
                    </div>
                    
                    <Badge variant="outline" className="text-xs px-2 py-0.5 rounded-full border-gray-200">
                      {categories.find(c => c.value === design.category)?.label || 'Other'}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateGallery;