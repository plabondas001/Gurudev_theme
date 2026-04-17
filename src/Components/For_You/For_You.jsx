import React from "react";

const For_You = ({ you, handleCart }) => {
  const { img, name, price, old_price } = you;
  return (
    <div className="border rounded-lg md:rounded-md p-3 md:p-5 flex flex-col h-full">
      <div className="flex justify-center">
        <img
          className="w-40 md:w-56 transition duration-500 hover:scale-105 p-2 object-contain h-32 md:h-40"
          src={img}
          alt={name}
        />
      </div>
      <h1 className="font-semibold text-sm md:text-base mt-2">{name}</h1>
      <div className="flex items-center gap-2 mt-1">
        <p className="text-[#fc6313] font-bold text-sm md:text-base">{price}</p>
        <p className="text-gray-400 line-through text-xs md:text-sm">{old_price}</p>
      </div>
      <div className="mt-auto pt-3">
        <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleCart && handleCart(you); }} className="font-bold border w-full py-2 rounded-md border-[#fc6313] text-[#fc6313] hover:text-white hover:bg-[#fc6313] cursor-pointer transition duration-500 hover:scale-105 text-sm">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default For_You;
