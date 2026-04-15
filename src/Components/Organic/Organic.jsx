import React from "react";
import { FiShoppingCart } from "react-icons/fi";

const Organic = ({ org }) => {
  const { img, name, price } = org;
  return (
    <div className="flex flex-col border rounded-2xl mt-5 p-3">
      <div className="flex justify-center">
        <img
          className="w-60 object-cover transition-all duration-500 hover:scale-105 p-2"
          src={img}
          alt=""
        />
      </div>
      <h1>{name}</h1>
      <p className="font-bold text-orange-400 mt-auto mb-2">{price}</p>
      <button className="flex items-center border w-full mb-2 justify-center py-2 rounded-md gap-2 border-orange-400 text-orange-400 cursor-pointer hover:bg-orange-400 transition-all duration-500 hover:scale-105 hover:text-white mt-auto">
        <FiShoppingCart />
        Add To Cart
      </button>
    </div>
  );
};

export default Organic;
