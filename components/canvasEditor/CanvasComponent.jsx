import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Minus, Plus, Save } from 'lucide-react';

const CanvasComponent = ({ 
  canvasRef, 
  canvasSize, 
  zoomLevel, 
  selectedObject,
  setHasSelectedCanvas,
  exportCanvas,
  handleZoom,
  setShowSaveDialog
}) => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white border-b p-3 flex items-center justify-between">
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
            <span className="text-sm text-gray-700">{zoomLevel}%</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleZoom('in')}
              disabled={zoomLevel >= 200}
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

      <div className="flex-1 p-6 overflow-auto flex items-center justify-center bg-gray-100">
        <div 
          className="bg-white rounded-xl shadow-lg p-6 flex justify-center items-center"
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'center',
            transition: 'transform 0.2s ease-in-out',
            width: `${canvasSize.width}px`,
            height: `${canvasSize.height}px`
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              display: 'block',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              width: '100%',
              height: '100%'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CanvasComponent;