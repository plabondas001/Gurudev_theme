import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import Navbar from "../../Navbar/Navbar";

const Honey = ({ honey,handleCart }) => {
  const { img, name, price, old_price } = honey;

  return (
    <div className="border shadow-sm p-3 md:p-5 rounded-xl mb-5 flex flex-col h-full">
      <div className="flex justify-center">
        <img
          className="w-40 md:w-60 lg:w-75 p-2 md:p-5 transition duration-300 ease-in-out hover:scale-105 object-contain"
          src={img}
          alt={name}
        />
      </div>
      <h1 className="font-semibold text-base md:text-lg lg:text-xl">{name}</h1>
      <div className="flex items-center gap-2 md:gap-3 mt-2">
        <p className="font-bold text-[#fc6313] text-sm md:text-base">{price}</p>
        <p className="line-through text-gray-400 text-xs md:text-sm">{old_price}</p>
      </div>
      <div className="mt-auto pt-3">
        <button type="button" onClick={(e)=>{e.preventDefault(); e.stopPropagation(); handleCart && handleCart(honey)}} className="flex items-center border w-full justify-center py-2 rounded-md gap-2 border-[#fc6313] text-[#fc6313] cursor-pointer hover:bg-[#fc6313] transition-all duration-500 hover:scale-105 hover:text-white text-sm">
          <FiShoppingCart size={16} />
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Honey;
