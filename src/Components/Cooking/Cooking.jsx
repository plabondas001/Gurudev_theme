import React from "react";
import { FiShoppingCart } from "react-icons/fi";

const Cooking = ({ cook, handleCart }) => {
  const { img, name, price, old_price } = cook;
  return (
    <div className="border p-3 md:p-5 rounded-lg md:rounded-2xl flex flex-col h-full">
      <div className="flex items-center justify-center">
        <img
          className="w-40 md:w-60 lg:w-65 p-2 transition-all duration-400 hover:scale-108 object-contain h-32 md:h-40"
          src={img}
          alt={name}
        />
      </div>
      <h1 className="font-semibold text-sm md:text-base mt-2">{name}</h1>
      <div className="flex items-center gap-2 mt-1">
        <p className="font-bold text-orange-400 text-sm md:text-base">{price}</p>
        <p className="text-gray-400 line-through text-xs md:text-sm">{old_price}</p>
      </div>
      <div className="mt-auto pt-3">
        <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleCart && handleCart(cook); }} className="flex items-center justify-center border w-full py-2 rounded-md cursor-pointer border-orange-400 text-orange-400 gap-2 hover:bg-orange-400 hover:text-white transition-all duration-400 hover:scale-105 text-xs sm:text-sm">
          <FiShoppingCart size={14} />
          <span>Add To Cart</span>
        </button>
      </div>
    </div>
  );
};

export default Cooking;
