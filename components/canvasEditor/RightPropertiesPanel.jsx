import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { X } from 'lucide-react';
import ColorPicker from './colorPicker/ColorPicker';

const RightPropertiesPanel = ({ 
  showAdvancedOptions, 
  setShowAdvancedOptions, 
  textProps, 
  updateTextProperty,
  setShowBgColorPicker,
  setShowStrokeColorPicker,
}) => {
  const [showShadowColorPicker, setShowShadowColorPicker] = useState(false);
  const [showTextBgColorPicker, setShowTextBgColorPicker] = useState(false);
const [showCursorColorPicker, setShowCursorColorPicker] = useState(false);
  if (!showAdvancedOptions) return null;

  // Helper function to handle shadow updates
  const updateShadowProperty = (property, value) => {
    if (property === 'shadowBlur') {
      updateTextProperty('shadowBlur', value);
    } else if (property === 'shadowOffsetX') {
      updateTextProperty('shadowOffsetX', value);
    } else if (property === 'shadowOffsetY') {
      updateTextProperty('shadowOffsetY', value);
    } else if (property === 'shadowColor') {
      updateTextProperty('shadowColor', value);
    }
  };

  return (
    <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg z-10 border-l">
      {/* Color Pickers */}
      <ColorPicker
        isOpen={showShadowColorPicker}
        onClose={() => setShowShadowColorPicker(false)}
        selectedColor={textProps.shadowColor}
        onColorSelect={(color) => updateShadowProperty('shadowColor', color)}
        title="Shadow color"
        position="left"
      />

      <ColorPicker
        isOpen={showTextBgColorPicker}
        onClose={() => setShowTextBgColorPicker(false)}
        selectedColor={textProps.textBackgroundColor}
        onColorSelect={(color) => updateTextProperty('textBackgroundColor', color)}
        title="Text background color"
        position="left"
      />

      <ColorPicker
  isOpen={showCursorColorPicker}
  onClose={() => setShowCursorColorPicker(false)}
  selectedColor={textProps.cursorColor}
  onColorSelect={(color) => updateTextProperty('cursorColor', color)}
  title="Cursor color"
  position="left"
/>

      <div className="p-4 border-b flex justify-between items-center bg-gray-50">
        <h3 className="font-semibold text-gray-800">Text Properties</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAdvancedOptions(false)}
          className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
        >
          <X size={16} />
        </Button>
      </div>
      
      <div className="p-4 space-y-6 overflow-y-auto h-[calc(100%-56px)]">
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Spacing</h4>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-gray-600">Character Spacing</label>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {textProps.charSpacing}
                </span>
              </div>
              <Slider
                value={[textProps.charSpacing]}
                onValueChange={([value]) => updateTextProperty('charSpacing', value)}
                min={-100}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-gray-600">Opacity</label>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {(textProps.opacity * 100).toFixed(0)}%
                </span>
              </div>
              <Slider
                value={[textProps.opacity]}
                onValueChange={([value]) => updateTextProperty('opacity', value)}
                min={0}
                max={1}
                step={0.01}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Stroke</h4>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-gray-600">Stroke Width</label>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {textProps.strokeWidth}px
                </span>
              </div>
              <Slider
                value={[textProps.strokeWidth]}
                onValueChange={([value]) => updateTextProperty('strokeWidth', value)}
                min={0}
                max={20}
                step={0.5}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-2">Stroke Color</label>
              <button
                onClick={() => setShowStrokeColorPicker(true)}
                className="w-full h-10 border rounded-md cursor-pointer flex items-center justify-start px-3"
              >
                <div 
                  className="w-6 h-6 rounded-full border border-gray-300 mr-2" 
                  style={{ backgroundColor: textProps.strokeColor }}
                />
                <span className="text-sm text-gray-700">
                  {textProps.strokeColor}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Transform</h4>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-gray-600">Skew X</label>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {textProps.skewX}°
                </span>
              </div>
              <Slider
                value={[textProps.skewX]}
                onValueChange={([value]) => updateTextProperty('skewX', value)}
                min={-90}
                max={90}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-gray-600">Skew Y</label>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {textProps.skewY}°
                </span>
              </div>
              <Slider
                value={[textProps.skewY]}
                onValueChange={([value]) => updateTextProperty('skewY', value)}
                min={-90}
                max={90}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Shadow</h4>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-gray-600">Shadow Blur</label>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {textProps.shadowBlur}px
                </span>
              </div>
              <Slider
                value={[textProps.shadowBlur]}
                onValueChange={([value]) => updateShadowProperty('shadowBlur', value)}
                min={0}
                max={50}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-gray-600">Shadow X Offset</label>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {textProps.shadowOffsetX}px
                </span>
              </div>
              <Slider
                value={[textProps.shadowOffsetX]}
                onValueChange={([value]) => updateShadowProperty('shadowOffsetX', value)}
                min={-50}
                max={50}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-gray-600">Shadow Y Offset</label>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {textProps.shadowOffsetY}px
                </span>
              </div>
              <Slider
                value={[textProps.shadowOffsetY]}
                onValueChange={([value]) => updateShadowProperty('shadowOffsetY', value)}
                min={-50}
                max={50}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-2">Shadow Color</label>
              <button
                onClick={() => setShowShadowColorPicker(true)}
                className="w-full h-10 border rounded-md cursor-pointer flex items-center justify-start px-3"
              >
                <div 
                  className="w-6 h-6 rounded-full border border-gray-300 mr-2" 
                  style={{ backgroundColor: textProps.shadowColor }}
                />
                <span className="text-sm text-gray-700">
                  {textProps.shadowColor}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Background</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Box Background</label>
              <button
                onClick={() => setShowBgColorPicker(true)}
                className="w-8 h-8 border rounded-md cursor-pointer hover:border-gray-400 transition-colors"
                style={{ backgroundColor: textProps.backgroundColor }}
                title="Background Color"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Text Background</label>
              <button
                onClick={() => setShowTextBgColorPicker(true)}
                className="w-8 h-8 border rounded-md cursor-pointer hover:border-gray-400 transition-colors"
                style={{ backgroundColor: textProps.textBackgroundColor }}
                title="Text Background Color"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateTextProperty('backgroundColor', 'transparent')}
              className="text-xs"
            >
              Clear Box BG
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateTextProperty('textBackgroundColor', 'transparent')}
              className="text-xs"
            >
              Clear Text BG
            </Button>
          </div>
        </div>

       <div className="space-y-4">
  <h4 className="text-sm font-medium text-gray-700">Cursor</h4>
  
  <div className="space-y-3">
    <div>
      <label className="block text-xs text-gray-600 mb-2">Cursor Color</label>
      <button
        onClick={() => setShowCursorColorPicker(true)}
        className="w-full h-10 border rounded-md cursor-pointer flex items-center justify-start px-3"
      >
        <div 
          className="w-6 h-6 rounded-full border border-gray-300 mr-2" 
          style={{ backgroundColor: textProps.cursorColor }}
        />
        <span className="text-sm text-gray-700">
          {textProps.cursorColor}
        </span>
      </button>
    </div>

    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs text-gray-600">Cursor Width</label>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {textProps.cursorWidth}px
        </span>
      </div>
      <Slider
        value={[textProps.cursorWidth]}
        onValueChange={([value]) => updateTextProperty('cursorWidth', value)}
        min={1}
        max={10}
        step={1}
        className="w-full"
      />
    </div>
  </div>
</div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Text Direction</h4>
          <div className="flex gap-2">
            {[
              { label: 'Left to Right', value: 'ltr' },
              { label: 'Right to Left', value: 'rtl' },
            ].map(({ label, value }) => (
              <Button
                key={value}
                variant={textProps.direction === value ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateTextProperty('direction', value)}
                className="text-xs"
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-6 border-t">
          <h4 className="text-sm font-medium text-gray-700">Quick Presets</h4>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                updateShadowProperty('shadowBlur', 5);
                updateShadowProperty('shadowOffsetX', 2);
                updateShadowProperty('shadowOffsetY', 2);
                updateShadowProperty('shadowColor', '#000000');
              }}
              className="text-xs"
            >
              Drop Shadow
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                updateTextProperty('strokeWidth', 2);
                updateTextProperty('stroke', '#000000');
              }}
              className="text-xs"
            >
              Outline
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                updateTextProperty('textBackgroundColor', '#ffff00');
              }}
              className="text-xs"
            >
              Highlight
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                updateTextProperty('skewX', -15);
                updateTextProperty('fontStyle', 'italic');
              }}
              className="text-xs"
            >
              Italic Skew
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                updateTextProperty('letterSpacing', 10);
                updateTextProperty('fontWeight', 'bold');
              }}
              className="text-xs"
            >
              Spaced Bold
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                updateTextProperty('fontSize', 12);
                updateTextProperty('fontWeight', '300');
                updateTextProperty('letterSpacing', 2);
                updateTextProperty('fill', '#666666');
              }}
              className="text-xs"
            >
              Small Caps
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                updateTextProperty('fontSize', 20);
                updateTextProperty('fontFamily', 'Arial');
                updateTextProperty('fontWeight', 'normal');
                updateTextProperty('fontStyle', 'normal');
                updateTextProperty('textDecoration', '');
                updateTextProperty('fill', '#000000');
                updateTextProperty('backgroundColor', 'transparent');
                updateTextProperty('textBackgroundColor', 'transparent');
                updateTextProperty('strokeWidth', 0);
                updateShadowProperty('shadowBlur', 0);
                updateShadowProperty('shadowOffsetX', 0);
                updateShadowProperty('shadowOffsetY', 0);
                updateTextProperty('skewX', 0);
                updateTextProperty('skewY', 0);
                updateTextProperty('letterSpacing', 0);
                updateTextProperty('charSpacing', 0);
                updateTextProperty('opacity', 1);
              }}
              className="text-xs text-red-600 hover:text-red-700"
            >
              Reset All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightPropertiesPanel;