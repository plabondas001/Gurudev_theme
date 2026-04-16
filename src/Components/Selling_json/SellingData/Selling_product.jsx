import React from "react";
import { FiShoppingCart } from "react-icons/fi";

const Selling_product = ({ selling, handleCart }) => {
  return (
    <div className="text-black border rounded-xl">
      <div className="p-5 flex flex-col md:flex-row items-center rounded-xl">
        <img
          className="w-90 h-88 p-10 rounded-2xl transition duration-300 ease-in-out hover:scale-105 px-10 cursor-pointer"
          src={selling.img}
          alt=""
        />
        <div>
          <h1 className="font-semibold text-2xl">{selling.name}</h1>
          <div className="flex items-center gap-5">
            <p className="text-xl text-orange-400 font-bold">{selling.price}</p>
            <p className="line-through text-xl text-gray-400">
              {selling.main_p}
            </p>
          </div>
          <p className="bg-[#bfdb38] inline-block px-2 text-sm py-1 mt-3 font-semibold rounded-2xl">
            Save ৳300
          </p>
          <div className="mt-10 flex gap-5">
            <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleCart && handleCart(selling); }} className="flex items-center gap-3 border border-orange-400 px-3 py-2 rounded-md text-orange-400 font-semibold cursor-pointer hover:bg-orange-400 hover:text-white transition-all duration-450 delay-50">
              <FiShoppingCart />
              Add To Cart
            </button>
            <button type="button" className="flex items-center gap-3 px-3 font-semibold py-1 bg-orange-400 text-white rounded-md cursor-pointer hover:bg-black transition-all duration-450 delay-50">
              <FiShoppingCart />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selling_product;
