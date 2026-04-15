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
      <div className="flex items-center gap-3 ">
        <p className="font-semibold text-orange-400">{price}</p>
        <p className="line-through text-gray-400">{old_price}</p>
      </div>
      <button className="flex items-center border w-full mb-2 justify-center py-2 rounded-md gap-2 border-orange-400 text-orange-400 cursor-pointer hover:bg-orange-400 transition-all duration-500 hover:scale-105 hover:text-white mt-auto">
        <FiShoppingCart />
        Add To Cart
      </button>
    </div>
  );
};

export default Honey;
