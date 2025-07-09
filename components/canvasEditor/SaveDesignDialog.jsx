import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Save, Loader2 } from 'lucide-react';

const SaveDesignDialog = ({ 
  isOpen, 
  onClose, 
  canvas, 
  canvasSize, 
  backgroundColor, 
  backgroundImage,
  onSave 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isPublic: false,
    category: 'other',
    tags: []
  });
  const [newTag, setNewTag] = useState('');
  const [saving, setSaving] = useState(false);

  const categories = [
    { value: 'social-media', label: 'Social Media' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'presentation', label: 'Presentation' },
    { value: 'print', label: 'Print' },
    { value: 'web', label: 'Web' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const generateThumbnail = () => {
    if (!canvas) return null;
    
    return canvas.toDataURL({
      format: 'png',
      quality: 0.8,
      multiplier: 0.5 // Smaller size for thumbnail
    });
  };

 const handleSave = async () => {
  if (!canvas || !formData.title.trim()) return;

  setSaving(true);
  
  try {
    // Generate thumbnail
    const thumbnail = generateThumbnail();
    
    // Get canvas data
    const canvasData = JSON.stringify(canvas.toJSON());
    
    // Get user info
    const user = {
      id: 'user-123', // Replace with actual user ID
      name: 'John Doe', // Replace with actual user name
      email: 'john@example.com' // Replace with actual user email
    };
    
    const designData = {
      title: formData.title,
      description: formData.description,
      thumbnail,
      canvasData,
      canvasSize: {
        width: canvasSize.width,
        height: canvasSize.height,
        preset: canvasSize.label // Add the preset label here
      },
      backgroundColor,
      backgroundImage,
      isPublic: formData.isPublic,
      category: formData.category,
      tags: formData.tags,
      author: user
    };
    
    const response = await fetch('/api/designs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(designData),
    });
    
    if (response.ok) {
      const result = await response.json();
      onSave?.(result.design);
      onClose();
      // Reset form
      setFormData({
        title: '',
        description: '',
        isPublic: false,
        category: 'other',
        tags: []
      });
    } else {
      console.error('Failed to save design');
    }
  } catch (error) {
    console.error('Error saving design:', error);
  } finally {
    setSaving(false);
  }
};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Save Design</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter design title"
              className="w-full"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your design (optional)"
              className="w-full h-20"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X
                    size={12}
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a tag"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTag}
                disabled={!newTag.trim()}
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>

          {/* Public Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Make Public</Label>
              <p className="text-sm text-gray-500">
                Allow others to view and use this design
              </p>
            </div>
            <Switch
              checked={formData.isPublic}
              onCheckedChange={(checked) => handleInputChange('isPublic', checked)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!formData.title.trim() || saving}
          >
            {saving ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                Save Design
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveDesignDialog;