import React, { use } from "react";
import Selling_product from "./Selling_product";

const SellingData = ({ promise, handleCart }) => {
  const sellingdata = use(promise);

  return (
    <div className="w-10/12 mx-auto">
      <h1 className="font-bold text-3xl text-black text-center mt-10">
        Top Selling Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10 mb-5">
        {sellingdata.map((selling, i) => (
          <Selling_product key={i} selling={selling} handleCart={handleCart}></Selling_product>
        ))}
      </div>
    </div>
  );
};

export default SellingData;
