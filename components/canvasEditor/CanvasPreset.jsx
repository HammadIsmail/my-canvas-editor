
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

const CanvasPreset = ({ setHasSelectedCanvas, setCanvasSize }) => {
  const selectCanvasType = (preset) => {
    const selectedPreset = CANVAS_PRESETS[preset] || CANVAS_PRESETS.portrait;
    setCanvasSize(selectedPreset);
    setHasSelectedCanvas(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-white rounded-xl shadow-xl p-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Create a New Design</h1>
          <p className="text-lg text-gray-600">Select a canvas type to get started</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Object.entries(CANVAS_PRESETS).map(([key, preset]) => (
            <div 
              key={key}
              onClick={() => selectCanvasType(key)}
              className="border-2 border-gray-100 rounded-xl p-6 flex flex-col items-center cursor-pointer hover:border-blue-400 hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="text-5xl mb-4">{preset.icon}</div>
              <div 
                className="border-2 border-gray-200 bg-white flex items-center justify-center mb-4 rounded-md overflow-hidden"
                style={{
                  width: `${preset.displaySize}px`,
                  height: `${preset.displaySize * (preset.height / preset.width)}px`,
                  maxWidth: '100%',
                  maxHeight: '200px'
                }}
              >
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {preset.width} × {preset.height}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{preset.label}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CanvasPreset;