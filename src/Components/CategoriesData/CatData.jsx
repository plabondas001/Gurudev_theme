import React from "react";

const CatData = ({ catdata }) => {
  const { img, name } = catdata;

  return (
    <div className="text-center">
      <div>
        <img className="rounded-2xl w-30 h-24 object-cover" src={img} alt="" />
        <h1 className="font-semibold text-sm mt-2 whitespace-nowrap">{name}</h1>
      </div>
    </div>
  );
};

export default CatData;
