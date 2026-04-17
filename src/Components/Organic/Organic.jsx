import React from "react";
import { FiShoppingCart } from "react-icons/fi";

const Organic = ({ org, handleCart }) => {
  const { img, name, price } = org;
  return (
    <div className="flex flex-col border rounded-lg md:rounded-2xl mt-3 md:mt-5 p-3 md:p-3 h-full">
      <div className="flex justify-center">
        <img
          className="w-40 md:w-60 object-contain transition-all duration-500 hover:scale-105 p-2 h-32 md:h-40"
          src={img}
          alt={name}
        />
      </div>
      <h1 className="font-semibold text-sm md:text-base mt-2">{name}</h1>
      <p className="font-bold text-[#fc6313] text-sm md:text-base mt-2 mb-2">{price}</p>
      <div className="mt-auto">
        <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleCart && handleCart(org); }} className="flex items-center border w-full justify-center py-2 rounded-md gap-2 border-[#fc6313] text-[#fc6313] cursor-pointer hover:bg-[#fc6313] transition-all duration-500 hover:scale-105 hover:text-white text-xs sm:text-sm">
          <FiShoppingCart size={14} />
          <span>Add To Cart</span>
        </button>
      </div>
    </div>
  );
};

export default Organic;
