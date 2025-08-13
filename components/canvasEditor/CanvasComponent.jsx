import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Minus, Plus, Save, X } from 'lucide-react'; // Added X icon
import TextPropertiesBar from './TextPropertiesBar';

const CanvasComponent = ({ 
  canvasRef, 
  canvasSize, 
  zoomLevel, 
  selectedObject,
  setHasSelectedCanvas,
  exportCanvas,
  handleZoom,
  setShowSaveDialog,
  isTextSelected,
  textProps,
  updateTextProperty,
  setShowAdvancedOptions,
  showAdvancedOptions,
  duplicateObject,
  deleteObject,
  setShowTextColorPicker,
  onClose,
  onSaveImage, // Added onSaveImage prop
}) => {
  
  const calculateMaxDisplaySize = () => {
    const availableHeight = window.innerHeight - 60 - 48 - 40;
    const availableWidth = window.innerWidth - 320 - 48;
    
    const scaleX = availableWidth / canvasSize.width;
    const scaleY = availableHeight / canvasSize.height;
    const maxScale = Math.min(scaleX, scaleY, 1);
    
    return Math.max(0.1, maxScale);
  };

  const maxDisplayScale = calculateMaxDisplaySize();
  const actualScale = Math.min(zoomLevel / 100, maxDisplayScale);

  // Modified export function to handle saving to website
  const handleExport = async () => {
    if (!canvasRef.current) return;
    
    const dataURL = canvasRef.current.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2
    });

    if (onSaveImage) {
      await onSaveImage(dataURL); // Save to website if handler provided
    } else {
      exportCanvas(); // Fallback to download
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between h-[72px] flex-shrink-0">
  {/* Left Section */}
  <div className="flex items-center space-x-6">
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={() => setHasSelectedCanvas(false)}
      className="text-gray-700 hover:bg-gray-100/80 hover:text-gray-900 px-3 py-1.5 rounded-lg transition-colors"
    >
      <ArrowLeft size={18} className="mr-2" />
      <span className="font-medium">Templates</span>
    </Button>
    
    {selectedObject && (
      <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-1.5 border border-gray-200">
        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
        <span className="text-sm font-medium text-gray-700 capitalize">
          {selectedObject.type} selected
        </span>
      </div>
    )}
  </div>
  
 
  
  {/* Right Section - Controls */}
  <div className="flex items-center space-x-3">
     {/* Center Section - Canvas Info */}
  <div className="hidden md:flex items-center space-x-4">
    <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-1.5 border border-gray-200">
      <span className="text-sm font-medium text-gray-700">
        {canvasSize.width} × {canvasSize.height} px
      </span>
    </div>
  </div>
    {/* Zoom Controls */}
    <div className="hidden sm:flex items-center space-x-1 bg-gray-50 rounded-lg px-2 py-1 border border-gray-200">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => handleZoom('out')}
        disabled={zoomLevel <= 20}
        className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
      >
        <Minus size={16} />
      </Button>
      <div className="flex items-center justify-center w-16">
        <span className="text-sm font-medium text-gray-700">
          {zoomLevel}%
        </span>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => handleZoom('in')}
        disabled={zoomLevel >= 100}
        className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
      >
        <Plus size={16} />
      </Button>
    </div>
    
    {/* Action Buttons */}
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowSaveDialog(true)}
        className="px-4 py-1.5 rounded-lg border-gray-300 hover:bg-gray-50"
      >
        <Save className="mr-2 h-4 w-4" />
        <span className="font-medium">Save Draft</span>
      </Button>
      
      <div className="relative group">
        <Button 
          onClick={handleExport}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-4 py-1.5 rounded-lg shadow-sm hover:shadow-md transition-all"
        >
          <Download size={16} className="mr-2" />
          <span className="font-medium">Publish</span>
        </Button>
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button 
            onClick={handleExport}
            className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-t-lg"
          >
            Save to SocialFit
          </button>
          <button 
            onClick={exportCanvas}
            className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-b-lg"
          >
            Save to Device
          </button>
        </div>
      </div>
      
      {/* Close Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClose}
        className="h-9 w-9 p-0 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
      >
        <X size={18} />
      </Button>
    </div>
  </div>
</div>

      {/* Text Properties Bar */}
      <TextPropertiesBar
        isTextSelected={isTextSelected}
        textProps={textProps}
        updateTextProperty={updateTextProperty}
        setShowAdvancedOptions={setShowAdvancedOptions}
        showAdvancedOptions={showAdvancedOptions}
        duplicateObject={duplicateObject}
        deleteObject={deleteObject}
        setShowTextColorPicker={setShowTextColorPicker}
      />

      {/* Canvas Area */}
      <div className="flex-1 relative bg-gray-100 overflow-hidden">
        {/* Canvas Container */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div 
            className="bg-white rounded-lg shadow-lg flex items-center justify-center relative"
            style={{
              width: `${canvasSize.width * actualScale}px`,
              height: `${canvasSize.height * actualScale}px`,
              minWidth: `${canvasSize.width * actualScale}px`,
              minHeight: `${canvasSize.height * actualScale}px`,
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          >
            <div 
              className="relative"
              style={{
                width: `${canvasSize.width}px`,
                height: `${canvasSize.height}px`,
                transform: `scale(${actualScale})`,
                transformOrigin: 'center center'
              }}
            >
              <canvas
                ref={canvasRef}
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  borderRadius: '4px'
                }}
              />
            </div>
          </div>
        </div>

        {/* Zoom to fit button */}
        {zoomLevel !== Math.round(maxDisplayScale * 100) && (
          <Button
            variant="outline"
            size="sm"
            className="absolute bottom-4 right-4 bg-white shadow-lg"
            onClick={() => handleZoom('fit')}
          >
            Fit to Screen
          </Button>
        )}
      </div>
    </div>
  );
};

export default CanvasComponent;