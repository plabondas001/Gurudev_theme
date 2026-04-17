import React, { use } from "react";
import CatData from "./CatData";
import "./CategoriesData.css";

const CategoriesData = ({ promise }) => {
  const cateData = use(promise);

  return (
    <div className="w-11/12 md:w-10/12 mx-auto">
      <div className="mt-4 md:mt-7 text-black">
        <h1 className="text-center font-semibold text-xl md:text-2xl">
          Featured Categories
        </h1>
        <div className="mt-5 text-center categories-marquee">
          <div className="categories-track">
            <div className="categories-track__inner">
              {cateData.map((catdata, i) => (
                <div key={i} className="categories-item">
                  <CatData catdata={catdata}></CatData>
                </div>
              ))}
            </div>
            <div aria-hidden className="categories-track__inner">
              {cateData.map((catdata, i) => (
                <div key={`dup-${i}`} className="categories-item">
                  <CatData catdata={catdata}></CatData>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesData;
