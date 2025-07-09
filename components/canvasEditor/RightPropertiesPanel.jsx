import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const RightPropertiesPanel = ({ 
  showAdvancedOptions, 
  setShowAdvancedOptions, 
  textProps, 
  updateTextProperty,
  selectedObject,
  duplicateObject,
  deleteObject
}) => {
  if (!showAdvancedOptions) return null;

  // Helper function to handle shadow updates
  const updateShadowProperty = (property, value) => {
    const currentShadow = textProps.shadowBlur > 0 || textProps.shadowOffsetX !== 0 || textProps.shadowOffsetY !== 0;
    
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
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Spacing</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Line Height</label>
              <input
                type="number"
                value={textProps.lineHeight}
                onChange={(e) => updateTextProperty('lineHeight', Number(e.target.value))}
                className="w-full text-sm border rounded-md px-3 py-1.5 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0.5"
                max="5"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Letter Spacing</label>
              <input
                type="number"
                value={textProps.letterSpacing}
                onChange={(e) => updateTextProperty('letterSpacing', Number(e.target.value))}
                className="w-full text-sm border rounded-md px-3 py-1.5 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="-50"
                max="50"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Char Spacing</label>
              <input
                type="number"
                value={textProps.charSpacing}
                onChange={(e) => updateTextProperty('charSpacing', Number(e.target.value))}
                className="w-full text-sm border rounded-md px-3 py-1.5 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="-100"
                max="100"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Opacity</label>
              <input
                type="number"
                value={textProps.opacity}
                onChange={(e) => updateTextProperty('opacity', Number(e.target.value))}
                className="w-full text-sm border rounded-md px-3 py-1.5 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                max="1"
                step="0.1"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Stroke</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Width</label>
              <input
                type="number"
                value={textProps.strokeWidth}
                onChange={(e) => updateTextProperty('strokeWidth', Number(e.target.value))}
                className="w-full text-sm border rounded-md px-3 py-1.5 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                max="20"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Color</label>
              <input
                type="color"
                value={textProps.strokeColor}
                onChange={(e) => updateTextProperty('stroke', e.target.value)}
                className="w-full h-10 border rounded-md cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Transform</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Skew X</label>
              <input
                type="number"
                value={textProps.skewX}
                onChange={(e) => updateTextProperty('skewX', Number(e.target.value))}
                className="w-full text-sm border rounded-md px-3 py-1.5 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="-90"
                max="90"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Skew Y</label>
              <input
                type="number"
                value={textProps.skewY}
                onChange={(e) => updateTextProperty('skewY', Number(e.target.value))}
                className="w-full text-sm border rounded-md px-3 py-1.5 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="-90"
                max="90"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Shadow</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Blur</label>
              <input
                type="number"
                value={textProps.shadowBlur}
                onChange={(e) => updateShadowProperty('shadowBlur', Number(e.target.value))}
                className="w-full text-sm border rounded-md px-3 py-1.5 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                max="50"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">X Offset</label>
              <input
                type="number"
                value={textProps.shadowOffsetX}
                onChange={(e) => updateShadowProperty('shadowOffsetX', Number(e.target.value))}
                className="w-full text-sm border rounded-md px-3 py-1.5 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="-50"
                max="50"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Y Offset</label>
              <input
                type="number"
                value={textProps.shadowOffsetY}
                onChange={(e) => updateShadowProperty('shadowOffsetY', Number(e.target.value))}
                className="w-full text-sm border rounded-md px-3 py-1.5 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="-50"
                max="50"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Color</label>
              <input
                type="color"
                value={textProps.shadowColor.includes('rgba') ? '#000000' : textProps.shadowColor}
                onChange={(e) => updateShadowProperty('shadowColor', e.target.value)}
                className="w-full h-10 border rounded-md cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Background</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Box Background</label>
              <input
                type="color"
                value={textProps.backgroundColor === 'transparent' ? '#ffffff' : textProps.backgroundColor}
                onChange={(e) => updateTextProperty('backgroundColor', e.target.value)}
                className="w-full h-10 border rounded-md cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Text Background</label>
              <input
                type="color"
                value={textProps.textBackgroundColor === 'transparent' ? '#ffffff' : textProps.textBackgroundColor}
                onChange={(e) => updateTextProperty('textBackgroundColor', e.target.value)}
                className="w-full h-10 border rounded-md cursor-pointer"
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

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Cursor</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Color</label>
              <input
                type="color"
                value={textProps.cursorColor}
                onChange={(e) => updateTextProperty('cursorColor', e.target.value)}
                className="w-full h-10 border rounded-md cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Width</label>
              <input
                type="number"
                value={textProps.cursorWidth}
                onChange={(e) => updateTextProperty('cursorWidth', Number(e.target.value))}
                className="w-full text-sm border rounded-md px-3 py-1.5 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="1"
                max="10"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Text Decoration</h4>
          <select
            value={textProps.textDecoration}
            onChange={(e) => updateTextProperty('textDecoration', e.target.value)}
            className="w-full text-sm border rounded-md px-3 py-1.5 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">None</option>
            <option value="underline">Underline</option>
            <option value="overline">Overline</option>
            <option value="linethrough">Line Through</option>
          </select>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Text Direction</h4>
          <select
            value={textProps.direction}
            onChange={(e) => updateTextProperty('direction', e.target.value)}
            className="w-full text-sm border rounded-md px-3 py-1.5 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="ltr">Left to Right</option>
            <option value="rtl">Right to Left</option>
          </select>
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