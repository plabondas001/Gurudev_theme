import React from "react";

const For_You = ({ you, handleCart }) => {
  const { img, name, price, old_price } = you;
  return (
    <div className="border rounded-md p-5 flex flex-col h-full">
      <div className="flex justify-center">
        <img
          className=" transition duration-500 hover:scale-105 p-2"
          src={img}
          alt=""
        />
      </div>
      <h1>{name}</h1>
      <div className="flex items-center gap-2">
        <p className="text-orange-400 font-bold">{price}</p>
        <p className="text-gray-400 line-through">{old_price}</p>
      </div>
      <div className="mt-auto">
        <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleCart && handleCart(you); }} className="font-bold border w-full py-2 rounded-md border-orange-400 text-orange-400 hover:text-white hover:bg-orange-400 cursor-pointer transition duration-500 hover:scale-105">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default For_You;
