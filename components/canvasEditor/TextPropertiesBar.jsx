import { Button } from '@/components/ui/button';
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, 
  Copy, Trash2, Sliders, Minus, Plus 
} from 'lucide-react';

const fontFamilies = [
  'Arial', 'Times New Roman', 'Helvetica', 'Georgia', 'Verdana', 'Courier New',
  'Impact', 'Comic Sans MS', 'Trebuchet MS', 'Arial Black', 'Palatino',
  'Garamond', 'Bookman', 'Avant Garde', 'Tahoma', 'Arial Narrow'
];

const fontWeights = [
  { value: '100', label: 'Thin' },
  { value: '200', label: 'Extra Light' },
  { value: '300', label: 'Light' },
  { value: '400', label: 'Normal' },
  { value: '500', label: 'Medium' },
  { value: '600', label: 'Semi Bold' },
  { value: '700', label: 'Bold' },
  { value: '800', label: 'Extra Bold' },
  { value: '900', label: 'Black' }
];

const TextPropertiesBar = ({ 
  isTextSelected, 
  textProps, 
  updateTextProperty, 
  setShowAdvancedOptions, 
  showAdvancedOptions,
  duplicateObject,
  deleteObject
}) => {
  if (!isTextSelected) return null;

  return (
    <div className="bg-white border-b p-3 flex items-center gap-3 shadow-sm">
      <select
        value={textProps.fontFamily}
        onChange={(e) => updateTextProperty('fontFamily', e.target.value)}
        className="text-sm border rounded-md px-3 py-1.5 w-40 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {fontFamilies.map(font => (
          <option key={font} value={font}>{font}</option>
        ))}
      </select>
      
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => updateTextProperty('fontSize', Math.max(8, textProps.fontSize - 1))}
          className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
        >
          <Minus size={16} />
        </Button>
        <input
          type="number"
          value={textProps.fontSize}
          onChange={(e) => updateTextProperty('fontSize', Number(e.target.value))}
          className="text-sm border rounded-md px-2 py-1.5 w-16 text-center bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          min="8"
          max="300"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => updateTextProperty('fontSize', textProps.fontSize + 1)}
          className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
        >
          <Plus size={16} />
        </Button>
      </div>

      <select
        value={textProps.fontWeight}
        onChange={(e) => updateTextProperty('fontWeight', e.target.value)}
        className="text-sm border rounded-md px-3 py-1.5 w-28 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {fontWeights.map(weight => (
          <option key={weight.value} value={weight.value}>{weight.label}</option>
        ))}
      </select>

      <div className="flex gap-1">
        <Button
          variant={textProps.isBold ? "default" : "outline"}
          size="sm"
          onClick={() => updateTextProperty('isBold', !textProps.isBold)}
          className="h-8 w-8 p-0"
        >
          <Bold size={16} />
        </Button>
        <Button
          variant={textProps.isItalic ? "default" : "outline"}
          size="sm"
          onClick={() => updateTextProperty('isItalic', !textProps.isItalic)}
          className="h-8 w-8 p-0"
        >
          <Italic size={16} />
        </Button>
        <Button
          variant={textProps.isUnderline ? "default" : "outline"}
          size="sm"
          onClick={() => updateTextProperty('isUnderline', !textProps.isUnderline)}
          className="h-8 w-8 p-0"
        >
          <Underline size={16} />
        </Button>
      </div>

      <div className="flex gap-1">
        <Button
          variant={textProps.textAlign === 'left' ? "default" : "outline"}
          size="sm"
          onClick={() => updateTextProperty('textAlign', 'left')}
          className="h-8 w-8 p-0"
        >
          <AlignLeft size={16} />
        </Button>
        <Button
          variant={textProps.textAlign === 'center' ? "default" : "outline"}
          size="sm"
          onClick={() => updateTextProperty('textAlign', 'center')}
          className="h-8 w-8 p-0"
        >
          <AlignCenter size={16} />
        </Button>
        <Button
          variant={textProps.textAlign === 'right' ? "default" : "outline"}
          size="sm"
          onClick={() => updateTextProperty('textAlign', 'right')}
          className="h-8 w-8 p-0"
        >
          <AlignRight size={16} />
        </Button>
      </div>

      <input
        type="color"
        value={textProps.textColor}
        onChange={(e) => updateTextProperty('textColor', e.target.value)}
        className="w-8 h-8 border rounded-md cursor-pointer hover:border-gray-400"
        title="Text Color"
      />

      <Button
        variant={showAdvancedOptions ? "default" : "outline"}
        size="sm"
        onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
        className="h-8 w-8 p-0"
        title="Advanced Options"
      >
        <Sliders size={16} />
      </Button>

      <div className="border-l h-8 border-gray-200 pl-2 ml-1 flex gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={duplicateObject}
          className="h-8 w-8 p-0"
          title="Duplicate"
        >
          <Copy size={16} />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={deleteObject}
          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
          title="Delete"
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
};

export default TextPropertiesBar;