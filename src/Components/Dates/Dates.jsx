import React from "react";
import { FiShoppingCart } from "react-icons/fi";

const Dates = ({ dates, handleCart }) => {
  const { img, name, price} = dates;
  return (
    <div className="border rounded-lg md:rounded-2xl shadow-sm p-3 md:p-5 flex flex-col h-full">
      <img
        className="w-40 md:w-60 lg:w-75 p-2 md:p-5 transition duration-300 ease-in-out hover:scale-105 object-contain"
        src={img}
        alt={name}
      />
      <h1 className="font-semibold text-sm md:text-base mt-2">{name}</h1>
      <div className="flex items-center gap-2 mt-1">
        <p className="font-bold text-[#31714f] text-sm md:text-base">{price}</p>
      </div>
      <div className="mt-auto pt-3">
        <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleCart && handleCart(dates); }} className="flex items-center border w-full justify-center py-2 rounded-md gap-2 border-[#31714f] text-[#31714f] cursor-pointer hover:bg-[#31714f] transition-all duration-500 hover:scale-105 hover:text-white text-xl">
          <FiShoppingCart size={16} />
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Dates;

