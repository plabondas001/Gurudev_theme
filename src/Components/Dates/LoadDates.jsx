import React, { use } from "react";
import Dates from "./Dates";

const LoadDates = ({ promise, handleCart }) => {
  const data = use(promise);

  return (
    <div className="w-11/12 md:w-10/12 mx-auto mt-12 md:mt-30">
      <div className="flex items-center justify-between border-b mb-4 md:mb-5 border-gray-300 py-3">
        <h1 className="font-bold text-lg md:text-2xl">Premium Dates</h1>
        <button className="text-[#fc6313] font-bold text-xs md:text-sm underline underline-offset-4 hover:text-black cursor-pointer transition">
          VIEW ALL
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
        {data.map((dates, i) => (
          <Dates key={i} dates={dates} handleCart={handleCart}></Dates>
        ))}
      </div>
    </div>
  );
};

export default LoadDates;
