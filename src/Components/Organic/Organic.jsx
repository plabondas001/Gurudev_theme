import React from "react";
import { FiShoppingCart } from "react-icons/fi";

const Organic = ({ org, handleCart }) => {
  const { img, name, price } = org;
  return (
    <div className="flex flex-col border rounded-2xl mt-5 p-3 h-full">
      <div className="flex justify-center">
        <img
          className="w-60 object-cover transition-all duration-500 hover:scale-105 p-2"
          src={img}
          alt=""
        />
      </div>
      <h1>{name}</h1>
      <p className="font-bold text-orange-400 mt-2 mb-2">{price}</p>
      <div className="mt-auto">
        <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleCart && handleCart(org); }} className="flex items-center border w-full justify-center py-2 rounded-md gap-2 border-orange-400 text-orange-400 cursor-pointer hover:bg-orange-400 transition-all duration-500 hover:scale-105 hover:text-white">
          <FiShoppingCart />
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Organic;
