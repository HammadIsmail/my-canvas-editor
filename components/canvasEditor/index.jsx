"use client"
import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

import LeftSidebar from './LeftSidebar';
import CanvasOptions from './CanvasOptions';
import RightPropertiesPanel from './RightPropertiesPanel';
import CanvasComponent from './CanvasComponent';
import CanvasPreset from './CanvasPreset';
import SaveDesignDialog from './SaveDesignDialog';
import { CANVAS_PRESETS } from './constants';
import ColorPicker from './colorPicker/ColorPicker';



const CanvasEditor = ({ onSaveImage, onClose }) => {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const bgImageInputRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [copiedObject, setCopiedObject] = useState(null);
  const [isTextSelected, setIsTextSelected] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [showCanvasOptions, setShowCanvasOptions] = useState(false);
  const [canvasSize, setCanvasSize] = useState(CANVAS_PRESETS.portrait);
  const [hasSelectedCanvas, setHasSelectedCanvas] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
const [showStrokeColorPicker, setShowStrokeColorPicker] = useState(false);
const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [fabricCanvas, setFabricCanvas] = useState(null);

  const [textProps, setTextProps] = useState({

    fontSize: 20,
    fontFamily: 'Arial',
    textColor: '#000000',
    isBold: false,
    isItalic: false,
    isUnderline: false,
    textAlign: 'left',
    lineHeight: 1.16,
    letterSpacing: 0,
    strokeWidth: 0,
    strokeColor: '#000000',
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    backgroundColor: 'transparent',
    opacity: 1,
    skewX: 0,
    skewY: 0,
    charSpacing: 0,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: '',
    textBackgroundColor: 'transparent',
    selectionColor: 'rgba(17,119,255,0.3)',
    editingBorderColor: 'rgba(102,153,255,0.25)',
    cursorColor: '#333333',
    cursorWidth: 2,
    direction: 'ltr',
  });

  // Initialize canvas
  const initCanvas = () => {
    if (!canvasRef.current) return;

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      willReadFrequently: true,
      width: canvasSize.width,
      height: canvasSize.height,
      backgroundColor: 'white', // Default background color
      selection: true,
      evented: true,
      perPixelTargetFind: true,
      targetFindTolerance: 5
    });

    // Set initial zoom
    fabricCanvas.setZoom(zoomLevel / 100);
 setFabricCanvas(fabricCanvas);
    const handleSelection = (e) => {
      const obj = e.selected?.[0] || null;
      setSelectedObject(obj);
      setIsTextSelected(obj?.type === 'textbox' || obj?.type === 'i-text');
      
      if (obj?.type === 'textbox' || obj?.type === 'i-text') {
        const textObj = obj;
        const shadow = textObj.shadow;
        
        setTextProps({
          fontSize: textObj.fontSize || 20,
          fontFamily: textObj.fontFamily || 'Arial',
          textColor: textObj.fill || '#000000',
          isBold: textObj.fontWeight === 'bold',
          isItalic: textObj.fontStyle === 'italic',
          isUnderline: textObj.underline || false,
          textAlign: textObj.textAlign || 'left',
          lineHeight: textObj.lineHeight || 1.16,
          letterSpacing: textObj.letterSpacing || 0,
          strokeWidth: textObj.strokeWidth || 0,
          strokeColor: textObj.stroke || '#000000',
          shadowColor: shadow?.color || 'rgba(0,0,0,0.3)',
          shadowBlur: shadow?.blur || 0,
          shadowOffsetX: shadow?.offsetX || 0,
          shadowOffsetY: shadow?.offsetY || 0,
          backgroundColor: textObj.backgroundColor || 'transparent',
          opacity: textObj.opacity || 1,
          skewX: textObj.skewX || 0,
          skewY: textObj.skewY || 0,
          charSpacing: textObj.charSpacing || 0,
          fontWeight: textObj.fontWeight || 'normal',
          fontStyle: textObj.fontStyle || 'normal',
          textDecoration: textObj.textDecoration || '',
          textBackgroundColor: textObj.textBackgroundColor || 'transparent',
          selectionColor: textObj.selectionColor || 'rgba(17,119,255,0.3)',
          editingBorderColor: textObj.editingBorderColor || 'rgba(102,153,255,0.25)',
          cursorColor: textObj.cursorColor || '#333333',
          cursorWidth: textObj.cursorWidth || 2,
          direction: textObj.direction || 'ltr',
        });
      }
    };

    fabricCanvas.on('selection:created', handleSelection);
    fabricCanvas.on('selection:updated', handleSelection);
    fabricCanvas.on('selection:cleared', () => {
      setSelectedObject(null);
      setIsTextSelected(false);
    });
    fabricCanvas.on('object:modified', handleSelection);

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  };

  // Effect for canvas initialization and updates
  useEffect(() => {
    if (hasSelectedCanvas) {
      initCanvas();
    }
  }, [canvasSize,  hasSelectedCanvas]);


 

  // Keyboard shortcuts
  useEffect(() => {
    if (!canvas) return;

    const handleKeyDown = (e) => {
      const activeObject = canvas.getActiveObject();

      if (e.key === 'Delete' && activeObject) {
        e.preventDefault();
        canvas.remove(activeObject);
        setSelectedObject(null);
        setIsTextSelected(false);
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c' && activeObject) {
        e.preventDefault();
        activeObject.clone(cloned => setCopiedObject(cloned));
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v' && copiedObject) {
        e.preventDefault();
        copiedObject.clone(cloned => {
          cloned.set({ left: (cloned.left || 0) + 10, top: (cloned.top || 0) + 10 });
          canvas.add(cloned);
          canvas.setActiveObject(cloned);
          canvas.renderAll();
        });
        return;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [canvas, copiedObject]);

  // Text property updates
  const updateTextProperty = (property, value) => {
    if (!canvas || !selectedObject || (selectedObject.type !== 'textbox' && selectedObject.type !== 'i-text')) return;
    
    const textObj = selectedObject;
    
    // Handle shadow properties specially
    if (property === 'shadowBlur' || property === 'shadowOffsetX' || property === 'shadowOffsetY' || property === 'shadowColor') {
      const currentShadow = textObj.shadow || {};
      
      const newShadow = {
        color: property === 'shadowColor' ? value : (currentShadow.color || textProps.shadowColor),
        blur: property === 'shadowBlur' ? value : (currentShadow.blur || textProps.shadowBlur),
        offsetX: property === 'shadowOffsetX' ? value : (currentShadow.offsetX || textProps.shadowOffsetX),
        offsetY: property === 'shadowOffsetY' ? value : (currentShadow.offsetY || textProps.shadowOffsetY)
      };
      
      // Only create shadow if there's actually a shadow effect
      if (newShadow.blur > 0 || newShadow.offsetX !== 0 || newShadow.offsetY !== 0) {
        textObj.set('shadow', new fabric.Shadow(newShadow));
      } else {
        textObj.set('shadow', null);
      }
      
      // Update the textProps state
      const propertyMap = {
        'shadowColor': 'shadowColor',
        'shadowBlur': 'shadowBlur',
        'shadowOffsetX': 'shadowOffsetX',
        'shadowOffsetY': 'shadowOffsetY'
      };
      
      setTextProps(prev => ({ ...prev, [propertyMap[property]]: value }));
    } 
    // Handle text color
    else if (property === 'textColor') {
      textObj.set('fill', value);
      setTextProps(prev => ({ ...prev, textColor: value }));
    }
    // Handle stroke color
    else if (property === 'strokeColor') {
      textObj.set('stroke', value);
      setTextProps(prev => ({ ...prev, strokeColor: value }));
    }
    // Handle font weight for bold
    else if (property === 'isBold') {
      const fontWeight = value ? 'bold' : 'normal';
      textObj.set('fontWeight', fontWeight);
      setTextProps(prev => ({ ...prev, isBold: value, fontWeight }));
    }
    // Handle font style for italic
    else if (property === 'isItalic') {
      const fontStyle = value ? 'italic' : 'normal';
      textObj.set('fontStyle', fontStyle);
      setTextProps(prev => ({ ...prev, isItalic: value, fontStyle }));
    }
    // Handle underline
    else if (property === 'isUnderline') {
      textObj.set('underline', value);
      setTextProps(prev => ({ ...prev, isUnderline: value }));
    }
    // Handle background colors
    else if (property === 'backgroundColor') {
      const bgColor = value === 'transparent' ? '' : value;
      textObj.set('backgroundColor', bgColor);
      setTextProps(prev => ({ ...prev, backgroundColor: value }));
    }
    else if (property === 'textBackgroundColor') {
      const bgColor = value === 'transparent' ? '' : value;
      textObj.set('textBackgroundColor', bgColor);
      setTextProps(prev => ({ ...prev, textBackgroundColor: value }));
    }
    // Handle all other properties normally
    else {
      textObj.set(property, value);
      setTextProps(prev => ({ ...prev, [property]: value }));
    }
    
    canvas.renderAll();
  };

  // Canvas actions
const addText = (styleOptions = null) => {
  if (!canvas) return;
  
  // Default text properties
  let textOptions = {
    text: 'Edit this text',
    fontSize: textProps.fontSize,
    fontFamily: textProps.fontFamily,
    fontWeight: textProps.isBold ? 'bold' : textProps.fontWeight,
    fontStyle: textProps.isItalic ? 'italic' : textProps.fontStyle,
    fill: textProps.textColor,
    textAlign: textProps.textAlign,
  };

  // Override with style options if provided
  if (styleOptions) {
    textOptions = {
      ...textOptions,
      text: styleOptions.text || textOptions.text,
      fontSize: styleOptions.fontSize || textOptions.fontSize,
      fontFamily: styleOptions.fontFamily || textOptions.fontFamily,
      fontWeight: styleOptions.fontWeight || textOptions.fontWeight,
    };
  }

  const shadow = textProps.shadowBlur > 0 || textProps.shadowOffsetX !== 0 || textProps.shadowOffsetY !== 0 
    ? new fabric.Shadow({
        color: textProps.shadowColor,
        blur: textProps.shadowBlur,
        offsetX: textProps.shadowOffsetX,
        offsetY: textProps.shadowOffsetY
      })
    : null;

  const text = new fabric.Textbox(textOptions.text, {
    left: 100,
    top: 100,
    width: 200,
    hasControls: true,
    fontSize: textOptions.fontSize,
    fontFamily: textOptions.fontFamily,
    fill: textOptions.fill,
    textAlign: textOptions.textAlign,
    fontWeight: textOptions.fontWeight,
    fontStyle: textOptions.fontStyle,
    underline: textProps.isUnderline,
    lineHeight: textProps.lineHeight,
    letterSpacing: textProps.letterSpacing,
    strokeWidth: textProps.strokeWidth,
    stroke: textProps.strokeColor,
    shadow: shadow,
    backgroundColor: textProps.backgroundColor === 'transparent' ? '' : textProps.backgroundColor,
    opacity: textProps.opacity,
    skewX: textProps.skewX,
    skewY: textProps.skewY,
    charSpacing: textProps.charSpacing,
    textBackgroundColor: textProps.textBackgroundColor === 'transparent' ? '' : textProps.textBackgroundColor,
    selectionColor: textProps.selectionColor,
    editingBorderColor: textProps.editingBorderColor,
    cursorColor: textProps.cursorColor,
    cursorWidth: textProps.cursorWidth,
    direction: textProps.direction,
  });
  
  canvas.add(text);
  canvas.setActiveObject(text);
  canvas.renderAll();
};

 

 
  const exportCanvas = () => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2
    });
    const link = document.createElement('a');
    link.download = 'design.png';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteObject = () => {
    if (!canvas || !selectedObject) return;
    canvas.remove(selectedObject);
    setSelectedObject(null);
    setIsTextSelected(false);
    canvas.renderAll();
  };

  const duplicateObject = () => {
    if (!selectedObject || !canvas) return;
    selectedObject.clone((cloned) => {
      cloned.set({
        left: (cloned.left || 0) + 10,
        top: (cloned.top || 0) + 10
      });
      canvas.add(cloned);
      canvas.setActiveObject(cloned);
      canvas.renderAll();
    });
  };

  const addImageToCanvas = (imageUrl) => {
    if (!canvas) return;
    
    fabric.Image.fromURL(imageUrl, (img) => {
      // Scale image to fit canvas if it's too large
      const maxWidth = canvasSize.width * 0.8;
      const maxHeight = canvasSize.height * 0.8;
      
      if (img.width > maxWidth || img.height > maxHeight) {
        const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
        img.scale(scale);
      }
      
      // Center the image on canvas
      img.set({
        left: (canvasSize.width - img.getScaledWidth()) / 2,
        top: (canvasSize.height - img.getScaledHeight()) / 2,
        selectable: true,
        evented: true,
        hasControls: true,
        hasBorders: true,
        lockMovementX: false,
        lockMovementY: false,
        lockRotation: false,
        lockScalingX: false,
        lockScalingY: false,
        hoverCursor: 'move'
      });
      
      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
    }, {
      crossOrigin: 'anonymous'
    });
  };

  const handleBgImageUpload = (e) => {
    if (!e.target.files?.length) return;
    
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      setBgImage(event.target.result);
    };
    
    reader.readAsDataURL(file);
    if (e.target) e.target.value = '';
  };

 const handleZoom = (direction) => {
  if (!canvas) return;

  
  
  let newZoom = zoomLevel;
  
  if (direction === 'in') {
    newZoom = Math.min(zoomLevel + 10, 300);
  } else if (direction === 'out') {
    newZoom = Math.max(zoomLevel - 10, 10);
  } else if (direction === 'fit') {
    // Reset to 100% for fit-to-screen
    newZoom = 100;
  }
  
  setZoomLevel(newZoom);
};

useEffect(() => {
  if (canvas) {

    canvas.setZoom(1);
    canvas.renderAll();
  }
}, [zoomLevel, canvas]);


  if (!hasSelectedCanvas) {
    return (
      <CanvasPreset 
      onClose={onClose}
        setHasSelectedCanvas={setHasSelectedCanvas} 
        setCanvasSize={setCanvasSize}
      />
    );
  }

 const updateCanvasSize = (newSize) => {
  if (!canvas) return;
  
  canvas.clear();
  canvas.setDimensions({
    width: newSize.width,
    height: newSize.height
  });
  
  setCanvasSize(newSize);
  setZoomLevel(100);
  canvas.setZoom(1);
  canvas.renderAll();
};

 


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <input
        id="bgImageInput"
        ref={bgImageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleBgImageUpload}
      />
      
    <ColorPicker
  isOpen={showTextColorPicker}
  onClose={() => setShowTextColorPicker(false)}
  selectedColor={textProps.textColor}
  onColorSelect={(color) => updateTextProperty('textColor', color)}
  title="Text color"
  
/>

<ColorPicker
  isOpen={showStrokeColorPicker}
  onClose={() => setShowStrokeColorPicker(false)}
  selectedColor={textProps.strokeColor}
  onColorSelect={(color) => updateTextProperty('strokeColor', color)}
  title="Stroke color"
/>

<ColorPicker
  isOpen={showBgColorPicker}
  onClose={() => setShowBgColorPicker(false)}
  selectedColor={textProps.backgroundColor}
  onColorSelect={(color) => updateTextProperty('backgroundColor', color)}
  title="Background color"
/>

    

  <CanvasOptions
  show={showCanvasOptions}
  onClose={() => setShowCanvasOptions(false)}
  canvasSize={canvasSize}
  setCanvasSize={setCanvasSize}
  canvas={canvas}
  updateCanvasSize={updateCanvasSize} // Add this line
/>

      {/* Main layout */}
      <div className="flex flex-1 h-screen overflow-hidden">
        <LeftSidebar
          showCanvasOptions={showCanvasOptions}
          setShowCanvasOptions={setShowCanvasOptions}
          addText={addText}
         
          fileInputRef={fileInputRef}
          addImageToCanvas={addImageToCanvas} 
          setShowTemplates={setShowTemplates}
          showTemplates={showTemplates}
          canvas={canvas}
        />

      <CanvasComponent
  canvasRef={canvasRef}
  canvasSize={canvasSize}
  zoomLevel={zoomLevel}
  selectedObject={selectedObject}
  setHasSelectedCanvas={setHasSelectedCanvas}
  exportCanvas={exportCanvas}
  handleZoom={handleZoom}
  setShowSaveDialog={setShowSaveDialog}
  setZoomLevel={setZoomLevel} // Add this line
        isTextSelected={isTextSelected}
              textProps={textProps}
              updateTextProperty={updateTextProperty}
              setShowAdvancedOptions={setShowAdvancedOptions}
              showAdvancedOptions={showAdvancedOptions}
              duplicateObject={duplicateObject}
              deleteObject={deleteObject}
              setShowTextColorPicker={setShowTextColorPicker}
              onClose={onClose}
              onSaveImage={onSaveImage} 
    
      
/>
      </div>
         <RightPropertiesPanel
        showAdvancedOptions={showAdvancedOptions}
        setShowAdvancedOptions={setShowAdvancedOptions}
        textProps={textProps}
        updateTextProperty={updateTextProperty}
        setShowBgColorPicker={setShowBgColorPicker}
        setShowStrokeColorPicker={setShowStrokeColorPicker}

      
      />

      <SaveDesignDialog
        isOpen={showSaveDialog}
        onClose={() => setShowSaveDialog(false)}
        canvas={canvas}
        canvasSize={canvasSize}
        onSave={(savedDesign) => {
          console.log('Design saved:', savedDesign);
        }}
      />
    </div>
  );
}

export default CanvasEditor