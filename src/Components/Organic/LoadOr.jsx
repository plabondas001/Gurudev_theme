import React, { use } from "react";
import Organic from "./Organic";

const LoadOr = ({ promise, handleCart }) => {
  const data = use(promise);
  console.log(data);

  return (
    <div className="w-11/12 md:w-10/12 mx-auto mt-10 md:mt-20">
      <div className="flex items-center justify-between border-b mb-4 md:mb-5 py-3">
        <h1 className="font-bold text-lg md:text-2xl">Organic Certified</h1>
        <button className="font-semibold text-xs md:text-sm cursor-pointer text-[#fc6313] hover:text-black underline underline-offset-4 transition">
          VIEW ALL
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-5 mt-4 md:mt-5">
        {data.map((org, i) => (
          <Organic key={i} org={org} handleCart={handleCart}></Organic>
        ))}
      </div>
    </div>
  );
};

export default LoadOr;
