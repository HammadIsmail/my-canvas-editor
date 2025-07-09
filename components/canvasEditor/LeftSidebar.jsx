import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Type, Square, Circle, Upload, LayoutGrid, Image, X, LayoutPanelTop, Search, Heart, Download, Eye, Star, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const LeftSidebar = ({ 
  showCanvasOptions,
  setShowCanvasOptions,
  addText, 
  addRectangle, 
  addCircle, 
  addImageToCanvas,
  showTemplates,
  setShowTemplates,
  canvas
}) => {
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Template gallery states
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

  // Fetch images from database
  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/images');
      if (response.ok) {
        const data = await response.json();
        setImages(data.images || []);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  // Upload image to Cloudinary and save URL to MongoDB
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setImages(prev => [data.image, ...prev]);
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
      e.target.value = '';
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

  // Load images when gallery opens
  useEffect(() => {
    if (showImageGallery) {
      fetchImages();
    }
  }, [showImageGallery]);

  return (
    <>
      <div className="w-16 bg-white border-r flex flex-col items-center py-4 space-y-4">
        <Button
          variant={showCanvasOptions ? "default" : "ghost"}
          size="sm"
          onClick={() => setShowCanvasOptions(!showCanvasOptions)}
          className="w-12 h-12 p-2 rounded-lg hover:bg-blue-50"
          title="Canvas Options"
        >
          <LayoutGrid size={20} />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={addText}
          className="w-12 h-12 p-2 rounded-lg hover:bg-blue-50"
          title="Add Text"
        >
          <Type size={20} />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={addRectangle}
          className="w-12 h-12 p-2 rounded-lg hover:bg-blue-50"
          title="Add Rectangle"
        >
          <Square size={20} />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={addCircle}
          className="w-12 h-12 p-2 rounded-lg hover:bg-blue-50"
          title="Add Circle"
        >
          <Circle size={20} />
        </Button>
        
        <Button
          variant={showTemplates ? "default" : "ghost"}
          size="sm"
          onClick={() => setShowTemplates(!showTemplates)}
          className="w-12 h-12 p-2 rounded-lg hover:bg-blue-50"
          title="Templates"
        >
          <LayoutPanelTop size={20} />
        </Button>

        <Button
          variant={showImageGallery ? "default" : "ghost"}
          size="sm"
          onClick={() => setShowImageGallery(!showImageGallery)}
          className="w-12 h-12 p-2 rounded-lg hover:bg-blue-50"
          title="Image Gallery"
        >
          <Image size={20} />
        </Button>
      </div>

      {/* Templates Panel */}
      {showTemplates && (
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
      )}

      {/* Image Gallery Panel */}
      {showImageGallery && (
        <div className="fixed left-16 top-0 bottom-0 w-80 bg-white border-r shadow-lg z-50 flex flex-col">
          <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50">
            <div>
              <h3 className="font-bold text-lg text-gray-800">Images</h3>
              <p className="text-sm text-gray-600">Add images to your design</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowImageGallery(false)}
              className="p-2 hover:bg-white/50 rounded-lg"
            >
              <X size={16} />
            </Button>
          </div>
          
          <div className="p-4 border-b bg-gray-50">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="gallery-upload"
            />
            <Button
              onClick={() => document.getElementById('gallery-upload').click()}
              disabled={uploading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image
                </>
              )}
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Loading images...</p>
                </div>
              </div>
            ) : images.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="text-4xl mb-3">🖼️</div>
                <p className="text-sm text-gray-600 mb-2">No images uploaded yet</p>
                <p className="text-xs text-gray-500">Upload your first image to get started</p>
              </div>
            ) : (
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  {images.map((image) => (
                    <div
                      key={image._id}
                      className="relative group cursor-pointer border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 hover:border-blue-200"
                      onClick={() => addImageToCanvas(image.url)}
                    >
                      <div className="aspect-square">
                        <img
                          src={image.url}
                          alt={image.filename}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <span className="text-white text-xs font-medium bg-black/20 backdrop-blur-sm px-2 py-1 rounded">
                          Click to add
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LeftSidebar;