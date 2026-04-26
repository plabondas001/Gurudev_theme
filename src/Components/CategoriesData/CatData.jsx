import React from "react";

const CatData = ({ catdata }) => {
  const { img, name } = catdata;

  return (
    <div className="text-center">
      <div>
        <img className="rounded-2xl w-40 h-40" src={img} alt="" />
        <h1 className="font-semibold text-xl mt-2 whitespace-nowrap">{name}</h1>
      </div>
    </div>
  );
};

export default CatData;
