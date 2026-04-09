import React, { use } from "react";
import CatData from "./CatData";

const CategoriesData = ({ promise }) => {
  const cateData = use(promise);

  return (
    <div className="w-10/12 mx-auto">
      <div className="mt-7 text-black">
        <h1 className="text-center font-semibold text-2xl">
          Featured Categories
        </h1>
        <div className="grid grid-cols-10 gap-8 mt-5 text-center">
          {cateData.map((catdata, i) => (
            <CatData key={i} catdata={catdata}></CatData>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesData;
