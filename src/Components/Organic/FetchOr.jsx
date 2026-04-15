import React, { Suspense } from "react";
import LoadOr from "./LoadOr";

const fetchOrg = async () => {
  const res = await fetch("/public/Json/Organic/organic.json");
  return res.json();
};

const FetchOr = () => {
  const promise = fetchOrg();
  return (
    <div>
      <Suspense>
        <LoadOr promise={promise}></LoadOr>
      </Suspense>
    </div>
  );
};

export default FetchOr;
