import React, { Suspense } from "react";
import Load_You from "./Load_You";

const fetchYou = async () => {
  const res = await fetch("/public/Json/For_You/for_you.json");
  return res.json();
};

const Fetch_You = () => {
  const promise = fetchYou();
  return (
    <div>
      <Suspense>
        <Load_You promise={promise}></Load_You>
      </Suspense>
    </div>
  );
};

export default Fetch_You;
