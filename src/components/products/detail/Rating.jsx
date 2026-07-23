import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";

export default function BasicRating({ value = 5, setValue }) {
  const [hoverValue, setHoverValue] = useState(null);

  return (
    <div className="flex items-center gap-1.5 py-2">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= (hoverValue ?? value);

        return (
          <button
            key={index}
            type="button"
            onClick={() => setValue && setValue(starValue)}
            onMouseEnter={() => setHoverValue(starValue)}
            onMouseLeave={() => setHoverValue(null)}
            className="focus:outline-none transition-transform duration-150 hover:scale-110 active:scale-95 cursor-pointer"
            aria-label={`Rate ${starValue} stars`}
          >
            <FaStar
              size={28}
              className={`transition-colors duration-150 ${
                isFilled ? "text-primary" : "text-gray-300"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
