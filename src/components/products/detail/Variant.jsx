import React from "react";

const getVariantLabel = (v) => {
  if (!v) return "";
  if (v.ram && v.storage) return `${v.ram}GB/${v.storage}GB`;
  if (v.ram) return `${v.ram}GB RAM`;
  if (v.storage) return `${v.storage}GB Storage`;
  return v.sku || `Variant #${v.id}`;
};

const Variant = ({ variants = [], selectedVariant = null, onSelectVariant }) => {
  // Extract unique spec combinations (RAM/Storage)
  const optionMap = new Map();
  variants.forEach((v) => {
    const label = getVariantLabel(v);
    if (label && !optionMap.has(label)) {
      optionMap.set(label, v);
    }
  });

  const options = Array.from(optionMap.entries());

  if (!options.length) return null;

  const currentLabel = selectedVariant ? getVariantLabel(selectedVariant) : "";

  return (
    <div className="mb-6">
      <h3 className="font-semibold text-lg text-gray-900 mb-2">
        Variant: <span className="font-normal text-gray-600">{currentLabel || "Select variant"}</span>
      </h3>
      <div className="flex flex-wrap items-center gap-3">
        {options.map(([label, variantObj]) => {
          const isSelected = selectedVariant?.id === variantObj.id || currentLabel === label;

          return (
            <button
              key={label}
              type="button"
              onClick={() => onSelectVariant && onSelectVariant(variantObj)}
              className={`px-4 py-2.5 cursor-pointer rounded-xl font-bold text-sm transition-all border ${
                isSelected
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-102"
                  : "bg-white text-gray-800 border-gray-200 hover:border-primary/50 hover:bg-primary/5"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Variant;
