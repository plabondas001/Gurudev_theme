import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import apiClient from "../../api/apiClient";
import "./ProductSection.css";

const ProductSection = ({ title, params = {}, initialProducts = null }) => {
  const [products, setProducts] = useState(initialProducts || []);
  const [loading, setLoading] = useState(!initialProducts);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!initialProducts) {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          const data = await apiClient.fetchProducts(params);
          setProducts(data.results || []);
        } catch (err) {
          console.error(`Error fetching ${title}:`, err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [title, JSON.stringify(params), initialProducts]);

  if (loading) {
    return (
      <div className="w-11/12 md:w-10/12 mx-auto py-10">
        <h2 className="text-xl md:text-2xl font-bold mb-6">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-100 rounded-xl aspect-3/4"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) return null;
  if (products.length === 0) return null;

  const shouldAnimateProducts =
  title === "Featured Products" || title === "Top Selling Products";
  const isFeaturedProducts = title === "Featured Products";
  const isTopSellingProducts = title === "Top Selling Products";
  const displayProducts = products.slice(0, 10);
  const firstLine = displayProducts.slice(0, Math.ceil(displayProducts.length / 2));
  const secondLine = displayProducts.slice(Math.ceil(displayProducts.length / 2));
  const fillLineForMarquee = (line, minimumItems = 12) => {
    if (line.length === 0) return [];
    const repeatCount = Math.ceil(minimumItems / line.length);
    const filledLine = Array.from({ length: repeatCount }, () => line).flat();
    if (filledLine.length % 2 === 0) return filledLine;
    return [...filledLine, line[0]];
  };
  const firstLineFilled = fillLineForMarquee(firstLine);
  const secondLineFilled = fillLineForMarquee(secondLine);
  const firstTrackClass = isFeaturedProducts
    ? "products-track-featured-right"
    : isTopSellingProducts
    ? "products-track-top-selling-right"
    : "products-track-right";
  const secondTrackClass = isFeaturedProducts
    ? "products-track-featured-left"
    : isTopSellingProducts
    ? "products-track-top-selling-left"
    : "products-track-left";

  return (
    <div className="w-11/12 md:w-10/12 mx-auto py-8 md:py-5">
      <div className="flex items-center justify-between mb-6 md:mb-8 border-b pb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h2>
        <a
          href="/product"
          className="text-[#31714f] font-semibold text-sm hover:underline"
        >
          View All
        </a>
      </div>

      {shouldAnimateProducts ? (
        <div
          className={`space-y-3 md:space-y-5 ${
            isTopSellingProducts ? "top-selling-products" : ""
          }`}
        >
          <div className="overflow-hidden w-full products-row">
            <div className={`products-track ${firstTrackClass}`}>
              {[...firstLineFilled, ...firstLineFilled].map((product, index) => (
                <div
                  key={`first-${product.id ?? "product"}-${index}`}
                  className="w-[170px] sm:w-[200px] md:w-[230px] lg:w-[245px] shrink-0"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {secondLine.length > 0 && (
            <div className="overflow-hidden w-full products-row">
              <div className={`products-track ${secondTrackClass}`}>
                {[...secondLineFilled, ...secondLineFilled].map((product, index) => (
                  <div
                    key={`second-${product.id ?? "product"}-${index}`}
                    className="w-[170px] sm:w-[200px] md:w-[230px] lg:w-[245px] shrink-0"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSection;
