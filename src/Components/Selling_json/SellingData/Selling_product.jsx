import React from "react";
import { FiShoppingCart } from "react-icons/fi";

const Selling_product = ({ selling, handleCart }) => {
  return (
    <div className="text-black border rounded-lg md:rounded-xl">
      <div className="p-3 md:p-5 flex flex-col items-center md:flex-row gap-3 md:gap-5 rounded-lg md:rounded-xl">
        <img
          className="w-40 md:w-60 lg:w-90 h-40 md:h-60 lg:h-88 p-4 md:p-10 rounded-lg md:rounded-2xl transition duration-300 ease-in-out hover:scale-105 cursor-pointer object-contain"
          src={selling.img}
          alt={selling.name}
        />
        <div className="w-full md:w-auto">
          <h1 className="font-semibold text-base md:text-xl lg:text-2xl">{selling.name}</h1>
          <div className="flex items-center gap-3 md:gap-5 mt-2">
            <p className="text-base md:text-lg lg:text-xl text-orange-400 font-bold">{selling.price}</p>
            <p className="line-through text-base md:text-lg lg:text-xl text-gray-400">
              {selling.main_p}
            </p>
          </div>
          <p className="bg-[#bfdb38] inline-block px-2 text-xs md:text-sm py-1 mt-2 md:mt-3 font-semibold rounded-2xl text-black">
            Save ৳300
          </p>
          <div className="mt-4 md:mt-10 flex flex-col sm:flex-row gap-2 md:gap-5 w-full">
            <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleCart && handleCart(selling); }} className="flex items-center justify-center gap-2 md:gap-3 border border-orange-400 px-2 md:px-3 py-2 rounded-md text-orange-400 font-semibold cursor-pointer hover:bg-orange-400 hover:text-white transition-all duration-450 delay-50 text-sm flex-1 md:flex-none">
              <FiShoppingCart size={16} />
              <span>Add To Cart</span>
            </button>
            <button type="button" className="flex items-center justify-center gap-2 md:gap-3 px-2 md:px-3 font-semibold py-2 bg-orange-400 text-white rounded-md cursor-pointer hover:bg-black transition-all duration-450 delay-50 text-sm flex-1 md:flex-none">
              <FiShoppingCart size={16} />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selling_product;
