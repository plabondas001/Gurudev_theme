import React from "react";

const Brands = () => {
  return (
    <div className="w-10/12 mx-auto">
      <div className="flex items-center justify-between border-b-1 border-b-gray-300">
        <h1 className="font-bold text-2xl">Our Brands</h1>
        <button className="text-orange-400 font-semibold text-sm cursor-pointer underline hover:text-black underline-offset-4">
          SEE ALL
        </button>
      </div>
      <div className="flex justify-between mt-5 mb-20 gap-5">
        <div className=" w-80 rounded-md h-20 cursor-pointer border-1 flex items-center justify-center transition duration-300 ease-in-out hover:scale-106">
          <img
            className="w-32 "
            src="/public/Img/brands/7hNKq1768887947.png"
            alt=""
          />
        </div>
        <div className="w-80 rounded-md h-20 cursor-pointer border-1 flex items-center justify-center transition duration-300 ease-in-out hover:scale-106">
          <img
            className="w-32"
            src="/public/Img/brands/8Gpl21757919440.png"
            alt=""
          />
        </div>
        <div className="w-80 rounded-md h-20 cursor-pointer border-1 flex items-center justify-center transition duration-300 ease-in-out hover:scale-106">
          <img
            className="w-32"
            src="/public/Img/brands/8matO1757919401.png"
            alt=""
          />
        </div>
        <div className="w-80 rounded-md h-20 cursor-pointer border-1 flex items-center justify-center transition duration-300 ease-in-out hover:scale-106">
          <img
            className="w-32"
            src="/public/Img/brands/lCfRt1759553456.png"
            alt=""
          />
        </div>
        <div className="w-80 rounded-md h-20 cursor-pointer border-1  flex items-center justify-center transition duration-300 ease-in-out hover:scale-106">
          <img
            className="w-32"
            src="/public/Img/brands/RNTIU1763611802.png"
            alt=""
          />
        </div>
      </div>
      <div className="">
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default Brands;
