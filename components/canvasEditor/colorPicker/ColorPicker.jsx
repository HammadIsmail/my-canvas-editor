import React, { useState, useRef, useEffect } from "react";
import { X, ChevronLeft, Palette, Plus, Check, Droplet } from "lucide-react";
import { HexColorPicker } from "react-colorful";

const defaultSolidColors = [
  ["#451A03", "#7C2D12", "#EA580C", "#F97316", "#FB923C", "#FED7AA", "#FEF3E2"],
  ["#365314", "#4D7C0F", "#84CC16", "#EAB308", "#FACC15", "#FEF08A", "#FEFCE8"],
  ["#14532D", "#166534", "#16A34A", "#22C55E", "#4ADE80", "#BBF7D0", "#F0FDF4"],
  ["#064E3B", "#065F46", "#059669", "#10B981", "#34D399", "#A7F3D0", "#ECFDF5"],
  ["#134E4A", "#155E63", "#0891B2", "#0EA5E9", "#38BDF8", "#BAE6FD", "#F0F9FF"],
  ["#1E3A8A", "#1D4ED8", "#2563EB", "#3B82F6", "#60A5FA", "#DBEAFE", "#EFF6FF"],
  ["#3730A3", "#4338CA", "#5B21B6", "#7C3AED", "#8B5CF6", "#DDD6FE", "#F5F3FF"],
  ["#701A75", "#86198F", "#A21CAF", "#C026D3", "#D946EF", "#F3E8FF", "#FAF5FF"],
  ["#881337", "#9F1239", "#BE185D", "#DB2777", "#EC4899", "#FBCFE8", "#FDF2F8"],
  ["#7F1D1D", "#991B1B", "#DC2626", "#EF4444", "#F87171", "#FECACA", "#FEF2F2"],
  ["#78716C", "#A8A29E", "#D6D3D1", "#E7E5E4", "#F5F5F4", "#FAFAF9", "#FFFFFF"],
  ["#6366F1", "#10B981", "#14B8A6", "#06B6D4", "#EF4444", "#F59E0B"],
  ["#F59E0B", "#D97706", "#A16207", "#78716C", "#57534E", "#1C1917"],
];

const ColorPicker = ({
  isOpen,
  onClose,
  selectedColor,
  onColorSelect,
  title = "Colors",
  position = "left",
}) => {
  const [showAllColors, setShowAllColors] = useState(false);
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [customColor, setCustomColor] = useState("#3b82f6");
  const [recentColors, setRecentColors] = useState([]);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (selectedColor && !defaultSolidColors.flat().includes(selectedColor)) {
      setCustomColor(selectedColor);
    }
  }, [selectedColor]);

  if (!isOpen) return null;

  const handleColorSelect = (color) => {
    if (!recentColors.includes(color)) {
      const newRecent = [color, ...recentColors].slice(0, 6);
      setRecentColors(newRecent);
    }
    onColorSelect(color);
    setShowCustomPicker(false);
  };

  const ColorCircle = ({
    color,
    size = "w-8 h-8",
    onClick,
    isSelected = false,
    showCheck = true,
  }) => (
    <button
      className={`${size} rounded-full border-2 flex items-center justify-center ${
        isSelected
          ? "border-blue-500"
          : "border-gray-200 hover:border-gray-300"
      } transition-all duration-200 hover:scale-105 relative`}
      style={{ backgroundColor: color }}
      onClick={() => onClick(color)}
      title={color}
    >
      {isSelected && showCheck && (
        <Check
          size={16}
          className="text-white"
          style={{
            filter: "drop-shadow(0 0 1px rgba(0,0,0,0.5))",
          }}
        />
      )}
      {color === "transparent" && (
        <div className="absolute inset-1 bg-white rounded-full">
          <div className="w-full h-full bg-gradient-to-br from-red-500 via-red-500 to-transparent rounded-full opacity-50"></div>
        </div>
      )}
    </button>
  );

  return (
    <div
      ref={menuRef}
      className={`fixed top-0 ${position === "left" ? "left-0" : "right-0"} h-full bg-white shadow-xl z-50 w-80 flex flex-col transition-all duration-300 ease-in-out`}
      style={{
        transform: isOpen ? "translateX(0)" : position === "left" ? "translateX(-100%)" : "translateX(100%)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {showAllColors ? (
          <button
            onClick={() => setShowAllColors(false)}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ChevronLeft size={20} />
            <span className="ml-1">Default colors</span>
          </button>
        ) : (
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Palette size={18} className="mr-2" />
            {title}
          </h3>
        )}
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 p-1"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {showAllColors ? (
          /* Full Color Grid */
          <div className="p-4">
            <div className="grid grid-cols-7 gap-3">
              {defaultSolidColors.flat().map((color, index) => (
                <ColorCircle
                  key={index}
                  color={color}
                  onClick={handleColorSelect}
                  isSelected={selectedColor === color}
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Recent Colors */}
            {recentColors.length > 0 && (
              <div className="px-4 pb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Recent colors
                </h4>
                <div className="grid grid-cols-7 gap-2">
                  {recentColors.map((color, index) => (
                    <ColorCircle
                      key={`recent-${index}`}
                      color={color}
                      onClick={handleColorSelect}
                      isSelected={selectedColor === color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Default Solid Colors Preview */}
            <div className="px-4 pb-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-700">
                  Default colors
                </h4>
                <button
                  onClick={() => setShowAllColors(true)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  View all
                </button>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {defaultSolidColors[0].slice(0, 7).map((color, index) => (
                  <ColorCircle
                    key={index}
                    color={color}
                    onClick={handleColorSelect}
                    isSelected={selectedColor === color}
                  />
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2 mt-2">
                {defaultSolidColors[1].slice(0, 7).map((color, index) => (
                  <ColorCircle
                    key={index}
                    color={color}
                    onClick={handleColorSelect}
                    isSelected={selectedColor === color}
                  />
                ))}
              </div>
               <div className="grid grid-cols-7 gap-2 mt-2">
                {defaultSolidColors[2].slice(0, 7).map((color, index) => (
                  <ColorCircle
                    key={index}
                    color={color}
                    onClick={handleColorSelect}
                    isSelected={selectedColor === color}
                  />
                ))}
              </div>
               <div className="grid grid-cols-7 gap-2 mt-2">
                {defaultSolidColors[3].slice(0, 7).map((color, index) => (
                  <ColorCircle
                    key={index}
                    color={color}
                    onClick={handleColorSelect}
                    isSelected={selectedColor === color}
                  />
                ))}
              </div>
               <div className="grid grid-cols-7 gap-2 mt-2">
                {defaultSolidColors[4].slice(0, 7).map((color, index) => (
                  <ColorCircle
                    key={index}
                    color={color}
                    onClick={handleColorSelect}
                    isSelected={selectedColor === color}
                  />
                ))}
              </div>
            </div>

            {/* Custom Color Picker - Now inline */}
            <div className="px-4 pb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <Droplet size={16} className="mr-2" />
                Custom color
              </h4>
              
              {showCustomPicker ? (
                <div className="space-y-4">
                  <HexColorPicker
                    color={customColor}
                    onChange={setCustomColor}
                    className="w-full h-40"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className="w-8 h-8 rounded border border-gray-300 mr-3"
                        style={{ backgroundColor: customColor }}
                      />
                      <span className="text-sm font-mono">{customColor}</span>
                    </div>
                    <button
                      onClick={() => handleColorSelect(customColor)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowCustomPicker(true)}
                  className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <div
                    className="w-5 h-5 rounded-full mr-2 border border-gray-300"
                    style={{ backgroundColor: customColor }}
                  />
                  <span>Custom color picker</span>
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ColorPicker;