import React, { use } from "react";
import Dates from "./Dates";

const LoadDates = ({ promise }) => {
  const data = use(promise);

  return (
    <div className="w-10/12 mx-auto mt-30">
      <div className="flex items-center justify-between border-b mb-5 border-gray-300">
        <h1 className="font-bold text-2xl">All Natural Honey</h1>
        <button className="text-orange-400 font-bold text-sm underline underline-offset-4 hover:text-black cursor-pointer">
          VIEW ALL ITEMS
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
        {data.map((dates, i) => (
          <Dates key={i} dates={dates}></Dates>
        ))}
      </div>
    </div>
  );
};

export default LoadDates;
