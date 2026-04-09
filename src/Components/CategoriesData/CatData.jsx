import React from "react";

const CatData = ({ catdata }) => {
  const { img, name } = catdata;

  return (
    <div>
      <div>
        <img className="rounded-2xl" src={img} alt="" />
        <h1 className="font-semibold">{name}</h1>
      </div>
    </div>
  );
};

export default CatData;
