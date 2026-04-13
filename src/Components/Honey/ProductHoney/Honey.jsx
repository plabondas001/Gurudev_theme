import React from "react";
import { FiShoppingCart } from "react-icons/fi";

const Honey = ({ honey }) => {
  const { img, name, price, old_price } = honey;

  return (
    <div className="border shadow-sm p-5 rounded-xl mb-5">
      <div className="flex justify-center">
        <img
          className="w-75 p-5 transition duration-300 ease-in-out hover:scale-105"
          src={img}
          alt=""
        />
      </div>
      <h1 className="font-bold text-xl">{name}</h1>
      <div className="flex items-center gap-3">
        <p className="font-semibold text-orange-400">{price}</p>
        <p className="line-through text-gray-400">{old_price}</p>
      </div>
      <button className="border border-orange-400 w-full flex items-center justify-center gap-3 px-3 py-2 mt-3 rounded-md cursor-pointer text-orange-400 font-bold hover:bg-orange-400 hover:text-white transition-all duration-450 delay-50">
        <FiShoppingCart />
        Add To Cart
      </button>
    </div>
  );
};

export default Honey;
