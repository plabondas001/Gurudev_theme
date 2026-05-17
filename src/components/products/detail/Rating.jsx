import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";

export default function BasicRating() {
  const [value, setValue] = useState(4); // Default to a standard 4-star rating
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
            onClick={() => setValue(starValue)}
            onMouseEnter={() => setHoverValue(starValue)}
            onMouseLeave={() => setHoverValue(null)}
            className="focus:outline-none transition-transform duration-150 hover:scale-110 active:scale-95 cursor-pointer"
            aria-label={`Rate ${starValue} stars`}
          >
            <FaStar
              size={28}
              className={`transition-colors duration-150 ${
                isFilled ? "text-[#31714f]" : "text-gray-300"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
