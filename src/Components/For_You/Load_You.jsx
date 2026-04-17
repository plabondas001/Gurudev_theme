import React, { use } from "react";
import For_You from "./For_You";

const Load_You = ({ promise, handleCart }) => {
  const data = use(promise);
  return (
    <div className="w-11/12 md:w-10/12 mx-auto mt-12 md:mt-30">
      <div className="flex items-center justify-between border-b mb-4 md:mb-5 py-3">
        <h1 className="font-bold text-lg md:text-2xl">Just For You</h1>
        <button className="font-bold text-xs md:text-sm text-[#fc6313] cursor-pointer underline underline-offset-4 hover:text-black transition">
          VIEW ALL
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-5 mt-4 md:mt-5">
        {data.map((you, i) => (
          <For_You key={i} you={you} handleCart={handleCart}></For_You>
        ))}
      </div>
    </div>
  );
};

export default Load_You;
