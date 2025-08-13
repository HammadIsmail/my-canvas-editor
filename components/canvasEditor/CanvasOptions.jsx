// Updated CanvasOptions component
import { XIcon } from "lucide-react";
import { CANVAS_PRESETS } from "./constants";

const CanvasOptions = ({  setCanvasSize, show, onClose, canvasSize, canvas, updateCanvasSize }) => {
  const selectCanvasType = (preset) => {
    const selected = CANVAS_PRESETS[preset] || CANVAS_PRESETS.portrait;
    
    // Use the updateCanvasSize function instead of setCanvasSize when canvas exists
    if (canvas && updateCanvasSize) {
      updateCanvasSize(selected);
    } else {
      setCanvasSize(selected);
    }
    
    onClose();
  };

  return show ? (
    <div className="bg-white h-screen overflow-auto absolute top-0 left-16 w-80 z-50 p-4 border-r border-gray-200">
      <div className="w-full">
        <div className="flex justify-between items-center  mb-6 pt-4">
          <h1 className="text-lg font-semibold text-gray-700">Canvas Size </h1>
          <XIcon className="w-5 h-5 text-gray-500 cursor-pointer" onClick={onClose} />
        </div>

        <div className="flex flex-col space-y-3">
          {Object.entries(CANVAS_PRESETS).map(([key, preset]) => (
            <div
              key={key}
              onClick={() => selectCanvasType(key)}
              className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer p-3 flex items-center space-x-3 border hover:border-blue-200 ${
                canvasSize.label === preset.label 
                  ? 'border-blue-300 bg-blue-50' 
                  : 'border-gray-100'
              }`}
            >
              <div className="flex items-center justify-center w-10 h-10 flex-shrink-0">
                {preset.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-slate-800 truncate">{preset.label}</h3>
                <p className="text-xs text-slate-500">
                  {preset.width}×{preset.height}px
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null;
};

export default CanvasOptions;
