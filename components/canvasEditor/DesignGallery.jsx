import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { 
  Search, 
  Heart, 
  Eye, 
  Download, 
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  Loader2,
  User,
  Calendar,
  Trash2,
  Edit3,
  ExternalLink,
  Star,
  Share2,
  MoreVertical,
  Filter,
  TrendingUp,
  Award
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';

const DesignGallery = ({ 
  onUseTemplate, 
  showMyDesigns = false, 
  currentUserId = null,
  onEditDesign = null 
}) => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDesigns, setTotalDesigns] = useState(0);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [deletingDesign, setDeletingDesign] = useState(null);

  const categories = [
    { value: 'all', label: 'All Categories', icon: '🎨' },
    { value: 'social-media', label: 'Social Media', icon: '📱' },
    { value: 'marketing', label: 'Marketing', icon: '📊' },
    { value: 'presentation', label: 'Presentation', icon: '📽️' },
    { value: 'print', label: 'Print', icon: '🖨️' },
    { value: 'web', label: 'Web', icon: '🌐' },
    { value: 'other', label: 'Other', icon: '📄' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First', icon: <Calendar size={16} /> },
    { value: 'oldest', label: 'Oldest First', icon: <Calendar size={16} /> },
    { value: 'popular', label: 'Most Popular', icon: <TrendingUp size={16} /> },
    { value: 'most-liked', label: 'Most Liked', icon: <Heart size={16} /> },
    { value: 'most-used', label: 'Most Used', icon: <Download size={16} /> }
  ];

  useEffect(() => {
    fetchDesigns();
  }, [currentPage, selectedCategory, searchTerm, showMyDesigns, sortBy]);

  const fetchDesigns = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12',
        category: selectedCategory,
        search: searchTerm,
        sort: sortBy,
        public: (!showMyDesigns).toString()
      });

      if (showMyDesigns && currentUserId) {
        params.append('userId', currentUserId);
      }

      const response = await fetch(`/api/designs?${params}`);
      if (response.ok) {
        const data = await response.json();
        console.log("data.designs : ",data.designs)
        setDesigns(data.designs || []);
        setTotalPages(data.pagination?.pages || 1);
        setTotalDesigns(data.pagination?.total || 0);
      } else {
        console.error("Failed to fetch designs");
      }
    } catch (error) {
      console.error('Error fetching designs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handleLike = async (designId) => {
    if (!currentUserId) {
      console.error("Authentication Required - Please login to like designs");
      return;
    }

    try {
      const response = await fetch(`/api/designs/${designId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUserId })
      });

      if (response.ok) {
        const data = await response.json();
        setDesigns(prev => prev.map(design => 
          design._id === designId 
            ? { 
                ...design, 
                usage: { 
                  ...design.usage, 
                  likes: design.usage.likes + (data.liked ? 1 : -1) 
                },
                likedBy: data.liked 
                  ? [...(design.likedBy || []), currentUserId]
                  : (design.likedBy || []).filter(id => id !== currentUserId)
              }
            : design
        ));
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleUseTemplate = async (design) => {
    try {
      // Record usage
      await fetch(`/api/designs/${design._id}/use`, {
        method: 'POST'
      });

      const response = await fetch(`/api/designs/${design._id}`);
      const data = await response.json();

      // Parse and use the template
      const canvasData = JSON.parse(data.design.canvasData);
      console.log("canvasData :", canvasData);
      onUseTemplate?.(canvasData, design);
      
      // Update usage count in UI
      setDesigns(prev => prev.map(d => 
        d._id === design._id 
          ? { ...d, usage: { ...d.usage, downloads: d.usage.downloads + 1 } }
          : d
      ));
    } catch (error) {
      console.error('Error using template:', error);
    }
  };

  const handleDeleteDesign = async (designId) => {
    if (!currentUserId) return;

    setDeletingDesign(designId);
    try {
      const response = await fetch(`/api/designs/${designId}?userId=${currentUserId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setDesigns(prev => prev.filter(d => d._id !== designId));
        setTotalDesigns(prev => prev - 1);
      }
    } catch (error) {
      console.error('Error deleting design:', error);
    } finally {
      setDeletingDesign(null);
    }
  };

  const handleShareDesign = async (design) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: design.title,
          text: design.description,
          url: `${window.location.origin}/design/${design._id}`
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      const url = `${window.location.origin}/design/${design._id}`;
      navigator.clipboard.writeText(url);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const DesignCard = ({ design }) => (
    <Card className="group relative overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 rounded-3xl">
      <CardContent className="p-0 relative">
        <div className="relative overflow-hidden rounded-t-3xl">
          <div className="aspect-[4/3] w-full overflow-hidden">
            <img
              src={design.thumbnail}
              alt={design.title}
              className="w-full h-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-110"
              onClick={() => {
                setSelectedDesign(design);
                setPreviewOpen(true);
              }}
            />
          </div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <Button
              size="sm"
              variant="secondary"
              className="h-9 w-9 p-0 bg-white/95 backdrop-blur-md hover:bg-white rounded-full border-0 shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                handleLike(design._id);
              }}
            >
              <Heart 
                size={16} 
                className={design.likedBy?.includes(currentUserId) ? 'fill-red-500 text-red-500' : 'text-gray-600'} 
              />
            </Button>
            
            {showMyDesigns && design.author.id === currentUserId && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-9 w-9 p-0 bg-white/95 backdrop-blur-md hover:bg-white rounded-full border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <MoreVertical size={16} className="text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-xl border-0 shadow-xl bg-white/95 backdrop-blur-sm">
                  <DropdownMenuItem onClick={() => onEditDesign?.(design)} className="rounded-lg">
                    <Edit3 size={16} className="mr-2" />
                    Edit Design
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShareDesign(design)} className="rounded-lg">
                    <Share2 size={16} className="mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => handleDeleteDesign(design._id)}
                    className="text-red-600 rounded-lg"
                    disabled={deletingDesign === design._id}
                  >
                    <Trash2 size={16} className="mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          
          {/* Status badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {design.isPublic && (
              <Badge variant="secondary" className="bg-emerald-500/90 text-white border-0 backdrop-blur-md rounded-full px-3 py-1 text-xs font-medium">
                Public
              </Badge>
            )}
            {design.usage.likes > 100 && (
              <Badge variant="secondary" className="bg-amber-500/90 text-white border-0 backdrop-blur-md rounded-full px-3 py-1 text-xs font-medium">
                <Award size={12} className="mr-1" />
                Popular
              </Badge>
            )}
          </div>
          
          {/* Category emoji */}
          <div className="absolute bottom-4 right-4 text-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 bg-white/90 backdrop-blur-md rounded-full p-2">
            {categories.find(c => c.value === design.category)?.icon || '🎨'}
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-lg mb-1 line-clamp-1 text-gray-800 group-hover:text-blue-600 transition-colors duration-200">{design.title}</h3>
            <div className="flex items-center gap-1 text-amber-500 ml-2 flex-shrink-0">
              <Star size={14} className="fill-current" />
              <span className="text-sm font-medium text-gray-600">
                {((design.usage?.likes || 0) / Math.max(design.usage?.views || 1, 1) * 5).toFixed(1)}
              </span>
            </div>
          </div>
          
          {design.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
              {design.description}
            </p>
          )}
          
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Eye size={14} />
                <span>{formatNumber(design.usage?.views || 0)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart size={14} />
                <span>{formatNumber(design.usage?.likes || 0)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Download size={14} />
                <span>{formatNumber(design.usage?.downloads || 0)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User size={12} className="text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700">{design.author?.name || 'Anonymous'}</div>
                <div className="text-xs text-gray-500">{formatDate(design.createdAt)}</div>
              </div>
            </div>
            
            <Badge variant="outline" className="rounded-full px-3 py-1 text-xs border-gray-200">
              {categories.find(c => c.value === design.category)?.label || 'Other'}
            </Badge>
          </div>
          
          <Button
            onClick={() => handleUseTemplate(design)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg"
          >
            Use This Template
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {showMyDesigns ? 'My Designs' : 'Design Gallery'}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {showMyDesigns ? 'Manage and edit your creative designs' : 'Discover amazing templates created by our community'}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full lg:w-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search designs..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-12 py-3 rounded-2xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 w-full"
              />
            </div>

            {/* Category Filter */}
            <div className="w-full lg:w-auto lg:min-w-[200px]">
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="rounded-2xl border-gray-200 py-3">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value} className="rounded-lg">
                      <div className="flex items-center gap-2">
                        <span>{category.icon}</span>
                        <span>{category.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <div className="w-full lg:w-auto lg:min-w-[200px]">
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="rounded-2xl border-gray-200 py-3">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="rounded-lg">
                      <div className="flex items-center gap-2">
                        {option.icon}
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* View Mode */}
            <div className="flex bg-gray-100 rounded-2xl p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-xl px-4"
              >
                <Grid size={16} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-xl px-4"
              >
                <List size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="text-gray-600">
            Showing {designs.length} of {totalDesigns} designs
          </div>
          <div className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading designs...</p>
            </div>
          </div>
        )}

        {/* Design Grid */}
        {!loading && designs.length > 0 && (
          <div className={`grid gap-6 mb-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1 lg:grid-cols-2'
          }`}>
            {designs.map((design) => (
              <DesignCard key={design._id} design={design} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && designs.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🎨</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No designs found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setCurrentPage(1);
              }}
              variant="outline"
              className="rounded-xl"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {!loading && designs.length > 0 && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="rounded-xl"
            >
              <ChevronLeft size={16} />
              Previous
            </Button>
            
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="rounded-xl w-10 h-10"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="rounded-xl"
            >
              Next
              <ChevronRight size={16} />
            </Button>
          </div>
        )}
      </div>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{selectedDesign?.title}</DialogTitle>
          </DialogHeader>
          {selectedDesign && (
            <div className="space-y-6">
              <div className="aspect-video w-full overflow-hidden rounded-2xl">
                <img
                  src={selectedDesign.thumbnail}
                  alt={selectedDesign.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-lg mb-2">Description</h4>
                  <p className="text-gray-600">{selectedDesign.description || 'No description available'}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg mb-2">Statistics</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <div className="text-2xl font-bold text-blue-600">{formatNumber(selectedDesign.usage?.views || 0)}</div>
                      <div className="text-sm text-gray-600">Views</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <div className="text-2xl font-bold text-red-600">{formatNumber(selectedDesign.usage?.likes || 0)}</div>
                      <div className="text-sm text-gray-600">Likes</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <div className="text-2xl font-bold text-green-600">{formatNumber(selectedDesign.usage?.downloads || 0)}</div>
                      <div className="text-sm text-gray-600">Downloads</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={() => {
                handleUseTemplate(selectedDesign);
                setPreviewOpen(false);
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-6 py-2"
            >
              Use This Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DesignGallery;