import React from "react";
import { FiShoppingCart } from "react-icons/fi";

const Dates = ({ dates, handleCart }) => {
  const { img, name, price, old_price } = dates;
  return (
    <div className="border rounded-lg md:rounded-2xl shadow-sm p-3 md:p-5 flex flex-col h-full">
      <img
        className="transition duration-300 ease-in-out hover:scale-105 p-2 object-contain h-32 md:h-40 w-full"
        src={img}
        alt={name}
      />
      <h1 className="font-semibold text-sm md:text-base mt-2">{name}</h1>
      <div className="flex items-center gap-2 mt-1">
        <p className="font-bold text-orange-400 text-sm md:text-base">{price}</p>
        <p className="text-gray-400 line-through text-xs md:text-sm">{old_price}</p>
      </div>
      <div className="mt-auto pt-3">
        <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleCart && handleCart(dates); }} className="flex border border-orange-400 text-orange-400 items-center gap-2 cursor-pointer w-full px-2 md:px-3 py-2 hover:text-white justify-center rounded-md hover:bg-orange-400 transition-all duration-450 delay-50 text-sm">
          <FiShoppingCart size={14} />
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Dates;

