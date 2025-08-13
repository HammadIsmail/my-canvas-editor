import { CANVAS_PRESETS } from "./constants";
import { Button } from "@/components/ui/button"; // shadcn Button
import { X } from "lucide-react"; // Import the X icon

const CanvasPreset = ({ setHasSelectedCanvas, setCanvasSize, onClose }) => {
  const selectCanvasType = (preset) => {
    const selected = CANVAS_PRESETS[preset] || CANVAS_PRESETS.portrait;
    setCanvasSize(selected);
    setHasSelectedCanvas(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4 relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 rounded-full hover:bg-slate-200"
        onClick={onClose}
      >
        <X className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </Button>

      <div className="max-w-7xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Create a New Design</h1>
          <p className="text-lg text-slate-600">Select a canvas type to get started</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Object.entries(CANVAS_PRESETS).map(([key, preset]) => (
            <div
              key={key}
              onClick={() => selectCanvasType(key)}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-200 cursor-pointer p-4 flex flex-col items-center"
            >
              <div className="mb-3">{preset.icon}</div>
              <h3 className="text-sm font-semibold text-slate-800 text-center">{preset.label}</h3>
              <p className="text-xs text-slate-500">
                {preset.width}×{preset.height}px
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CanvasPreset;