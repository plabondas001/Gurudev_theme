import React from "react";

const Brands = () => {
  const brands = [
    "/public/Img/brands/7hNKq1768887947.png",
    "/public/Img/brands/8Gpl21757919440.png",
    "/public/Img/brands/8matO1757919401.png",
    "/public/Img/brands/lCfRt1759553456.png",
    "/public/Img/brands/RNTIU1763611802.png",
  ];

  return (
    <div className="w-11/12 md:w-10/12 mx-auto">
      <div className="flex items-center justify-between border-b-1 border-b-gray-300 py-3 md:py-4">
        <h1 className="font-bold text-xl md:text-2xl">Our Brands</h1>
        <button className="text-[#fc6313] font-semibold text-xs md:text-sm cursor-pointer underline hover:text-black underline-offset-4 transition">
          SEE ALL
        </button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 mt-4 md:mt-5 mb-10 md:mb-20">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="rounded-md h-16 md:h-20 cursor-pointer border-1 flex items-center justify-center transition duration-300 ease-in-out hover:scale-105 p-2"
          >
            <img
              className="w-20 md:w-32 h-full object-contain"
              src={brand}
              alt={`brand-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
