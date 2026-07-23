import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import apiClient from "../../api/apiClient";
import "./Brands.css";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    apiClient
      .fetchBrands()
      .then((data) => {
        if (isMounted) {
          setBrands(data || []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading || !brands.length) return null;

  const firstLine = brands.slice(0, Math.ceil(brands.length / 2));
  const secondLine = brands.slice(Math.ceil(brands.length / 2));

  return (
    <div className="w-full px-4 md:px-8">
      <div className="flex items-center justify-between border-b border-gray-200 p-1 mt-3">
        <h2 className="font-bold text-xl md:text-2xl text-gray-900">Our Brands</h2>
        <Link
          to="/products"
          className="text-primary font-semibold text-xs md:text-sm cursor-pointer underline hover:text-black underline-offset-4 transition"
        >
          SEE ALL
        </Link>
      </div>

      <div className="mt-4 md:mt-5 mb-10 md:mb-1 space-y-4">
        <div className="overflow-hidden w-full brands-row">
          <div className="brands-track brands-track-right">
            {[...firstLine, ...firstLine].map((brand, index) => (
              <Link
                to={`/brand/${brand.slug || brand.id}`}
                key={`first-${brand.id || index}-${index}`}
                className="rounded-xl h-16 md:h-20 min-w-[130px] md:min-w-[170px] cursor-pointer border border-gray-200 flex items-center justify-center transition duration-300 ease-in-out hover:scale-105 p-2 bg-white shadow-sm"
              >
                <img
                  className="w-20 md:w-36 object-contain h-full"
                  src={brand.logo || "/Img/logo/logo.png"}
                  alt={brand.name}
                  onError={(e) => {
                    e.currentTarget.src = "/Img/logo/logo.png";
                  }}
                />
              </Link>
            ))}
          </div>
        </div>

        {secondLine.length > 0 && (
          <div className="overflow-hidden w-full brands-row">
            <div className="brands-track brands-track-left">
              {[...secondLine, ...secondLine].map((brand, index) => (
                <Link
                  to={`/brand/${brand.slug || brand.id}`}
                  key={`second-${brand.id || index}-${index}`}
                  className="rounded-xl h-16 md:h-20 min-w-[130px] md:min-w-[170px] cursor-pointer border border-gray-200 flex items-center justify-center transition duration-300 ease-in-out hover:scale-105 p-2 bg-white shadow-sm"
                >
                  <img
                    className="w-20 md:w-36 object-contain h-full"
                    src={brand.logo || "/Img/logo/logo.png"}
                    alt={brand.name}
                    onError={(e) => {
                      e.currentTarget.src = "/Img/logo/logo.png";
                    }}
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Brands;
