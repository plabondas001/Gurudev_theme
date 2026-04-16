import React, { use } from "react";
import For_You from "./For_You";

const Load_You = ({ promise, handleCart }) => {
  const data = use(promise);
  return (
    <div className="w-10/12 mx-auto mt-30">
      <div className="flex items-center justify-between border-b">
        <h1 className="font-bold text-2xl">Just For You</h1>
        <button className="font-bold text-sm text-orange-400 cursor-pointer underline underline-offset-4 hover:text-black">
          VIEW ALL PRODUCTS
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mt-5">
        {data.map((you, i) => (
          <For_You key={i} you={you} handleCart={handleCart}></For_You>
        ))}
      </div>
    </div>
  );
};

export default Load_You;
