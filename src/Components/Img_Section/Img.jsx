import React from "react";

const Img = () => {
  return (
    <div className="w-11/12 md:w-10/12 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 md:mt-20 gap-3 md:gap-5 p-2 md:p-5 w-full">
        <div className="overflow-hidden">
          <img
            className="object-cover transition duration-300 ease-in-out hover:scale-105"
            src="/public/Img/img_1.png"
            alt=""
          />
        </div>
        <div className="overflow-hidden">
          <img
            className=" object-cover transition duration-300 ease-in-out hover:scale-105"
            src="/public/Img/img_2.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Img;
