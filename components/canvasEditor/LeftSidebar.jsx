import { Button } from '@/components/ui/button';
import { Type,  LayoutGrid, Image, X, LayoutPanelTop, Shapes } from 'lucide-react';
import { useState } from 'react';
import Elements from './elements/Elements';
import ImageGallery from './AssetsManagement/ImageGallery';
import TemplateGallery from './TempleteManagement/TemplateGallery';
import TextStylesPanel from './TextStyles/TextStylePanel';


const LeftSidebar = ({ 
  showCanvasOptions,
  setShowCanvasOptions,
  addText,
  addImageToCanvas,
  showTemplates,
  setShowTemplates,
  canvas
}) => {
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [showElements, setShowElements] = useState(false);
  const [showTextPanel, setShowTextPanel] = useState(false);
  
  // Enhanced addText function to handle text styles
  const handleAddText = (textStyle = null) => {
    if (textStyle) {
      // Add text with specific style
      addTextWithStyle(textStyle);
    } else {
      // Default text addition
      addText();
    }
  };

  const addTextWithStyle = (style) => {
    if (!canvas) return;
    
 
    addText();
    

    const objects = canvas.getObjects();
    const lastObject = objects[objects.length - 1];
    
    if (lastObject && (lastObject.type === 'textbox' || lastObject.type === 'i-text')) {
      lastObject.set({
        text: style.text,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        fontFamily: style.fontFamily
      });
      canvas.renderAll();
    }
  };
  
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
          variant={showTextPanel ? "default" : "ghost"}
          size="sm"
          onClick={() => setShowTextPanel(!showTextPanel)}
          className="w-12 h-12 p-2 rounded-lg hover:bg-blue-50"
          title="Add Text"
        >
          <Type size={20} />
        </Button>
        
        <Button
          variant={showElements ? "default" : "ghost"}
          size="sm"
          onClick={() => setShowElements(!showElements)}
          className="w-12 h-12 p-2 rounded-lg hover:bg-blue-50"
          title="Elements"
        >
          <Shapes size={20} />
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

      {showTextPanel && (
        <TextStylesPanel 
          showTextPanel={showTextPanel}
          setShowTextPanel={setShowTextPanel}
          addText={handleAddText}
        />
      )}

      {showElements && (
        <Elements setShowElements={setShowElements} canvas={canvas} />
      )}

      {showTemplates && (
        <TemplateGallery 
          showTemplates={showTemplates}
          setShowTemplates={setShowTemplates}
          canvas={canvas}
        />
      )}

      {showImageGallery && (
        <ImageGallery 
          showImageGallery={showImageGallery}
          setShowImageGallery={setShowImageGallery}
          addImageToCanvas={addImageToCanvas}
        />
      )}
    </>
  );
};

export default LeftSidebar;