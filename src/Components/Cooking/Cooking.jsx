import React from "react";
import { FiShoppingCart } from "react-icons/fi";

const Cooking = ({ cook, handleCart }) => {
  const { img, name, price, old_price } = cook;
  return (
    <div className="border p-5 rounded-2xl flex flex-col h-full">
      <div className="flex items-center justify-center">
        <img
          className="w-65 p-2 transition-all duration-400 hover:scale-108"
          src={img}
          alt=""
        />
      </div>
      <h1>{name}</h1>
      <div className="flex items-center gap-2">
        <p>{price}</p>
        <p>{old_price}</p>
      </div>
      <div className="mt-auto">
        <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleCart && handleCart(cook); }} className="flex items-center justify-center border w-full py-2 rounded-md cursor-pointer border-orange-400 text-orange-400 gap-2 hover:bg-orange-400 hover:text-white transition-all duration-400 hover:scale-105">
          <FiShoppingCart />
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Cooking;
