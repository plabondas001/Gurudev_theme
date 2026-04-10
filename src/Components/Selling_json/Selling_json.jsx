import React, { Suspense } from "react";
import SellingData from "./SellingData/SellingData";

const sellingFetch = async () => {
  const res = await fetch("/public/Json/selling.json");
  return res.json();
};

const Selling_json = () => {
  const promise = sellingFetch();
  return (
    <div>
      <Suspense>
        <SellingData promise={promise}></SellingData>
      </Suspense>
    </div>
  );
};

export default Selling_json;
