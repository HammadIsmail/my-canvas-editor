import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Minus, Plus, Save } from 'lucide-react';
import RightPropertiesPanel from './RightPropertiesPanel';
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

      
}) => {
  
  // Calculate the maximum size the canvas can be displayed at to fit in viewport
  const calculateMaxDisplaySize = () => {
    // Account for header (60px), padding (48px), and some margin
    const availableHeight = window.innerHeight - 60 - 48 - 40; // 40px for extra margin
    const availableWidth = window.innerWidth - 320 - 48; // 320px for sidebars, 48px padding
    
    // Calculate scale to fit canvas within available space
    const scaleX = availableWidth / canvasSize.width;
    const scaleY = availableHeight / canvasSize.height;
    const maxScale = Math.min(scaleX, scaleY, 1); // Don't scale up beyond 100%
    
    return Math.max(0.1, maxScale); // Minimum 10% scale
  };

  const maxDisplayScale = calculateMaxDisplaySize();
  const actualScale = Math.min(zoomLevel / 100, maxDisplayScale);
  
  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Header */}
      <div className="bg-white border-b p-3 flex items-center justify-between h-[60px] flex-shrink-0">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setHasSelectedCanvas(false)}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Templates
          </Button>
          
          {selectedObject && (
            <span className="text-sm text-gray-500 capitalize">
              {selectedObject.type} selected
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleZoom('out')}
              disabled={zoomLevel <= 20}
              className="h-6 w-6 p-0 text-gray-600 hover:text-gray-800"
            >
              <Minus size={14} />
            </Button>
            <span className="text-sm text-gray-700 min-w-[40px] text-center">
              {zoomLevel}%
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleZoom('in')}
              disabled={zoomLevel >= 100}
              className="h-6 w-6 p-0 text-gray-600 hover:text-gray-800"
            >
              <Plus size={14} />
            </Button>
          </div>
          
          <span className="text-sm text-gray-500">
            {canvasSize.width} × {canvasSize.height}
          </span>
         
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSaveDialog(true)}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Design
          </Button>
          
          <Button 
            onClick={exportCanvas} 
            className="bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-md"
          >
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

        {/* Fixed positioned panels */}
            <TextPropertiesBar
              isTextSelected={isTextSelected}
              textProps={textProps}
              updateTextProperty={updateTextProperty}
              setShowAdvancedOptions={setShowAdvancedOptions}
              showAdvancedOptions={showAdvancedOptions}
              duplicateObject={duplicateObject}
              deleteObject={deleteObject}
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
            {/* Canvas wrapper to maintain aspect ratio */}
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