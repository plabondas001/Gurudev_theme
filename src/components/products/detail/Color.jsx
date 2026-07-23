import React from "react";

const colorClassMap = {
  red: "bg-red-500",
  blue: "bg-blue-500",
  sky: "bg-sky-400",
  cyan: "bg-cyan-400",
  black: "bg-black",
  white: "bg-white border-gray-300 text-gray-800",
  gray: "bg-gray-400",
  grey: "bg-gray-400",
  green: "bg-emerald-500",
  purple: "bg-purple-500",
  gold: "bg-amber-400",
  yellow: "bg-yellow-400",
  pink: "bg-pink-400",
  orange: "bg-orange-400",
};

const Color = ({ variants = [], selectedColor = "", onSelectColor }) => {
  // Extract unique colors from product variants
  const colors = Array.from(
    new Set(
      variants
        .map((v) => v?.color?.trim())
        .filter(Boolean)
    )
  );

  if (!colors.length) return null;

  return (
    <div className="mb-4">
      <h3 className="font-semibold text-lg text-gray-900 mb-2">
        Color: <span className="font-normal text-gray-600">{selectedColor || "Select color"}</span>
      </h3>
      <div className="flex items-center gap-3 p-2 rounded-xl border border-gray-100 w-fit bg-gray-50/70">
        {colors.map((c) => {
          const colorKey = c.toLowerCase();
          const bgClass = colorClassMap[colorKey] || "bg-gray-300";
          const isSelected = selectedColor.toLowerCase() === colorKey;

          return (
            <button
              key={c}
              type="button"
              onClick={() => onSelectColor && onSelectColor(c)}
              title={c}
              className={`relative h-8 px-3 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer border ${bgClass} ${
                isSelected
                  ? "ring-2 ring-primary ring-offset-2 scale-105 shadow-md"
                  : "hover:scale-105 opacity-80 hover:opacity-100"
              }`}
            >
              <span className={colorKey === "white" ? "text-gray-900" : "text-white drop-shadow-sm"}>
                {c}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Color;
