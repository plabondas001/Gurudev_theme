import React, { Suspense } from "react";
import Load_You from "./Load_You";
import LoadOr from "../Organic/LoadOr";

const fetchYou = async () => {
  const res = await fetch("/public/Json/For_You/for_you.json");
  return res.json();
};

const Fetch_You = ({ handleCart }) => {
  const promise = fetchYou();
  return (
    <div>
      <Suspense>
        <Load_You promise={promise} handleCart={handleCart}></Load_You>
      </Suspense>
    </div>
  );
};

export default Fetch_You;
