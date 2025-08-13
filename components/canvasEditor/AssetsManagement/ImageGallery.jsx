import { Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';

const ImageGallery = ({ 
  showImageGallery, 
  setShowImageGallery, 
  addImageToCanvas 
}) => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

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

  // Load images when gallery opens
  useEffect(() => {
    if (showImageGallery) {
      fetchImages();
    }
  }, [showImageGallery]);

  return (
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
  );
};

export default ImageGallery;