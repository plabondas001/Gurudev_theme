import React from "react";
import "./Brands.css";

const Brands = () => {
  const brands = [
    "/Img/brands/Samsung-emblem.png",
    "/Img/brands/Realme_Brand.webp",
    "/Img/brands/oppo-aas.png",
    "/Img/brands/techno-aas.png",
    "/Img/brands/vivo-brand-logo-phone-symbol-design-chinese-mobile-vector-46234545.avif",
    "/Img/brands/XiaomiLogoNew2.avif",
    "/Img/brands/onepng.webp",
    "/Img/brands/infinix-brand-logo-phone-symbol-name-green-design-china-mobile-illustration-free-vector.jpg",
    "/Img/brands/lenovo-300x300.png",
    "/Img/brands/ora.png",
    "/Img/brands/haylou.jpg.webp",
    "/Img/brands/kospet.png",
    "/Img/brands/0x0.png",
  ];
  const firstLine = brands.slice(0, Math.ceil(brands.length / 2));
  const secondLine = brands.slice(Math.ceil(brands.length / 2));

  return (
    <div className="w-11/12 md:w-10/12 mx-auto">
      <div className="flex items-center justify-between border-b-1 border-b-gray-300 p-1 mt-3">
        <h1 className="font-bold text-xl md:text-2xl">Our Brands</h1>
        <button className="text-[#31714f] font-semibold text-xs md:text-sm cursor-pointer underline hover:text-black underline-offset-4 transition">
          SEE ALL
        </button>
      </div>

      <div className="mt-4 md:mt-5 mb-10 md:mb-1 space-y-4">
        <div className="overflow-hidden w-full brands-row">
          <div className="brands-track brands-track-right">
            {[...firstLine, ...firstLine].map((brand, index) => (
              <div
                key={`first-${index}`}
                className="rounded-md h-16 md:h-20 min-w-[130px] md:min-w-[170px] cursor-pointer border-1 flex items-center justify-center transition duration-300 ease-in-out hover:scale-105 p-2"
              >
                <img
                  className="w-20 md:w-70 object-cover h-full"
                  src={brand}
                  alt={`brand-first-${index}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden w-full brands-row">
          <div className="brands-track brands-track-left">
            {[...secondLine, ...secondLine].map((brand, index) => (
              <div
                key={`second-${index}`}
                className="rounded-md h-16 md:h-20 min-w-[130px] md:min-w-[170px] cursor-pointer border-1 flex items-center justify-center transition duration-300 ease-in-out hover:scale-105 p-2"
              >
                <img
                  className="w-20 md:w-70 object-cover h-full"
                  src={brand}
                  alt={`brand-second-${index}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
