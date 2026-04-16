import React from "react";
import { FiShoppingCart } from "react-icons/fi";

const Dates = ({ dates, handleCart }) => {
  const { img, name, price, old_price } = dates;
  return (
    <div className="border rounded-2xl shadow-sm p-5 flex flex-col h-full">
      <img
        className="transition duration-300 ease-in-out hover:scale-105 p-2"
        src={img}
        alt=""
      />
      <h1>{name}</h1>
      <div className="flex items-center gap-2">
        <p className="font-bold text-orange-400">{price}</p>
        <p className="text-gray-400 line-through">{old_price}</p>
      </div>
      <div className="mt-auto">
        <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleCart && handleCart(dates); }} className="flex border border-orange-400 text-orange-400 items-center gap-2 cursor-pointer w-full px-3 py-2 hover:text-white justify-center rounded-md hover:bg-orange-400 transition-all duration-450 delay-50">
          <FiShoppingCart />
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Dates;

