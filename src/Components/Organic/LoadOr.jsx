import React, { use } from "react";
import Organic from "./Organic";

const LoadOr = ({ promise }) => {
  const data = use(promise);
  console.log(data);

  return (
    <div className="w-10/12 mx-auto mt-20">
      <div className="flex items-center justify-between border-b">
        <h1 className="font-bold text-2xl">Organic Certified</h1>
        <button className="font-semibold text-sm cursor-pointer text-orange-400 hover:text-black underline underline-offset-4">
          VIEW ALL ITEMS
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
        {data.map((org, i) => (
          <Organic key={i} org={org}></Organic>
        ))}
      </div>
    </div>
  );
};

export default LoadOr;
