import React from 'react';
import { X,  Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TextStylesPanel = ({ showTextPanel, setShowTextPanel, addText }) => {
  if (!showTextPanel) return null;

  const textStyles = [
    {
      id: 'heading',
      label: 'Add a heading',
      fontSize: 32,
      fontWeight: 'bold',
      fontFamily: 'Inter, sans-serif',
      sample: 'Add a heading'
    },
    {
      id: 'subheading',
      label: 'Add a subheading',
      fontSize: 24,
      fontWeight: '600',
      fontFamily: 'Inter, sans-serif',
      sample: 'Add a subheading'
    },
    {
      id: 'body',
      label: 'Add a little bit of body text',
      fontSize: 16,
      fontWeight: 'normal',
      fontFamily: 'Inter, sans-serif',
      sample: 'Add a little bit of body text'
    },
    {
      id: 'title',
      label: 'Bold Title',
      fontSize: 28,
      fontWeight: 'bold',
      fontFamily: 'Helvetica, Arial, sans-serif',
      sample: 'Bold Title'
    },
    {
      id: 'subtitle',
      label: 'Elegant Subtitle',
      fontSize: 20,
      fontWeight: '500',
      fontFamily: 'Georgia, serif',
      sample: 'Elegant Subtitle'
    },
    {
      id: 'caption',
      label: 'Small Caption',
      fontSize: 14,
      fontWeight: 'normal',
      fontFamily: 'Inter, sans-serif',
      sample: 'Small Caption'
    }
  ];

  const handleAddText = (style) => {
    addText({
      text: style.sample,
      fontSize: style.fontSize,
      fontWeight: style.fontWeight,
      fontFamily: style.fontFamily
    });
  };

  return (
    <div className="w-80 absolute top-0 left-16 z-50 bg-white border-r border-gray-200 shadow-lg flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Text</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowTextPanel(false)}
          className="h-8 w-8 p-0 hover:bg-gray-100"
        >
          <X size={16} />
        </Button>
      </div>

     

      {/* Add Text Box Button */}
      <div className="p-4">
        <Button
          onClick={() => handleAddText(textStyles[0])}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2"
        >
          <span className="text-lg">T</span>
          Add a text box
        </Button>
      </div>

      {/* Magic Write */}
      <div className="px-4 pb-4">
        <Button
          variant="outline"
          className="w-full border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-lg flex items-center justify-center gap-2"
        >
          <Sparkles size={16} className="text-purple-500" />
          Magic Write
        </Button>
      </div>

  

      {/* Default Text Styles */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Default text styles</h3>
          
          <div className="space-y-2">
            {textStyles.map((style) => (
              <Button
                key={style.id}
                variant="ghost"
                onClick={() => handleAddText(style)}
                className="w-full text-left p-4 h-auto hover:bg-gray-50 border border-gray-200 rounded-lg group"
              >
                <div
                  className="text-gray-800 group-hover:text-gray-900 transition-colors"
                  style={{
                    fontSize: Math.min(style.fontSize * 0.8, 20),
                    fontWeight: style.fontWeight,
                    fontFamily: style.fontFamily,
                    lineHeight: '1.2'
                  }}
                >
                  {style.sample}
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextStylesPanel;