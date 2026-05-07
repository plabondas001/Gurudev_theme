import React, { useState } from "react";

const Variant = () => {
  const [variant, setVariant] = useState("");

  const variants = ["8GB/128GB", "12GB/256GB"];

  return (
    <div className="mb-4">
      <h1 className="font-semibold text-2xl">Variant</h1>
      <div className="flex items-center gap-5 mt-1">
        {variants.map((item) => (
          <button
            key={item}
            onClick={() => setVariant(item)}
            className={`border px-3 py-1 cursor-pointer rounded-md transition-colors ${
              variant === item
                ? "transition duration-300 delay-100 bg-primary text-white"
                : "bg-white text-gray-800"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Variant;
