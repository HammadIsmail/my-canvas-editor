import { Button } from '@/components/ui/button';
import { X, ImageIcon } from 'lucide-react';

const CANVAS_PRESETS = {
  portrait: { width: 800, height: 1000, label: 'Portrait', icon: '🖼️', displaySize: 300 },
  landscape: { width: 1000, height: 800, label: 'Landscape', icon: '🌄', displaySize: 350 },
  square: { width: 800, height: 800, label: 'Square', icon: '⬜', displaySize: 300 },
  instagramPost: { width: 1080, height: 1080, label: 'Instagram Post', icon: '📷', displaySize: 300 },
  instagramStory: { width: 1080, height: 1920, label: 'Instagram Story', icon: '📱', displaySize: 200 },
  facebookPost: { width: 1200, height: 630, label: 'Facebook Post', icon: '👍', displaySize: 350 },
  twitterPost: { width: 1024, height: 512, label: 'Twitter Post', icon: '🐦', displaySize: 400 },
  linkedinPost: { width: 1200, height: 627, label: 'LinkedIn Post', icon: '💼', displaySize: 350 },
  pinterestPin: { width: 1000, height: 1500, label: 'Pinterest Pin', icon: '📌', displaySize: 250 },
  custom: { width: 800, height: 600, label: 'Custom', icon: '⚙️', displaySize: 300 }
};

const CanvasOptions = ({ 
  show, 
  onClose, 
  canvasSize, 
  setCanvasSize, 
  bgColor, 
  setBgColor, 
  bgImage, 
  setBgImage 
}) => {
  if (!show) return null;

  return (
    <div className="absolute left-16 top-0 h-full w-64 bg-white shadow-lg z-10 border-r">
      <div className="p-4 border-b flex justify-between items-center bg-gray-50">
        <h3 className="font-semibold text-gray-800">Canvas Settings</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
        >
          <X size={16} />
        </Button>
      </div>
      
      <div className="p-4 space-y-6 overflow-y-auto h-[calc(100%-56px)]">
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Canvas Size</h4>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(CANVAS_PRESETS).map(([key, preset]) => (
              <Button
                key={key}
                variant={canvasSize.label === preset.label ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setCanvasSize(preset);
                  onClose();
                }}
                className="justify-start text-xs"
              >
                {preset.label} ({preset.width}×{preset.height})
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-6 border-t">
          <h4 className="text-sm font-medium text-gray-700">Background</h4>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Color</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full h-9 border rounded-md cursor-pointer hover:border-gray-400"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Image</label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('bgImageInput').click()}
                  className="text-xs flex-1"
                >
                  <ImageIcon size={14} className="mr-2" />
                  Upload Image
                </Button>
                {bgImage && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setBgImage(null);
                      onClose();
                    }}
                    className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasOptions;