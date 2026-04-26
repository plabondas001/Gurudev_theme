import React from "react";
import { FiShoppingCart } from "react-icons/fi";

const Cooking = ({ cook, handleCart }) => {
  const { img, name, price} = cook;
  return (
    <div className="border p-3 md:p-5 rounded-lg md:rounded-2xl flex flex-col h-full">
      <div className="flex items-center justify-center">
        <img
          className="w-40 md:w-60 lg:w-75 p-2 md:p-5 transition duration-300 ease-in-out hover:scale-105 object-contain"
          src={img}
          alt={name}
        />
      </div>
      <h1 className="font-semibold text-sm md:text-base mt-2">{name}</h1>
      <div className="flex items-center gap-2 mt-1">
        <p className="font-bold text-[#31714f] text-sm md:text-base">{price}</p>
      </div>
      <div className="mt-auto pt-3">
        <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleCart && handleCart(cook); }} className="flex items-center border w-full justify-center py-2 rounded-md gap-2 border-[#31714f] text-[#31714f] cursor-pointer hover:bg-[#31714f] transition-all duration-500 hover:scale-105 hover:text-white text-xl">
          <FiShoppingCart size={14} />
          <span>Add To Cart</span>
        </button>
      </div>
    </div>
  );
};

export default Cooking;
