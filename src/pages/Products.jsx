import React, { useState, useEffect, useRef, useCallback } from "react";
import ProductCard from "../components/products/ProductCard";
import apiClient from "../api/apiClient";
import "../components/products/ProductSection.css";

const LIMIT = 20;

const Products = ({
  title,
  params = {},
  initialProducts = null,
  isFilterLayout = false,
  filters = {
    categories: [],
    brands: [],
    minPrice: 0,
    maxPrice: Number.MAX_SAFE_INTEGER,
  },
}) => {
  const [products, setProducts] = useState(initialProducts || []);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [loadingInitial, setLoadingInitial] = useState(!initialProducts);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const observer = useRef();

  // =========================
  // FETCH PRODUCTS
  // =========================
  const fetchProducts = async (pageNumber) => {
    try {
      if (pageNumber === 1) {
        setLoadingInitial(true);
      } else {
        setLoadingMore(true);
      }

      // 🔥 allow loader to render first
      await new Promise((resolve) => setTimeout(resolve, 100));

      // ⏳ TEST DELAY (REMOVE IN PRODUCTION)
      await new Promise((resolve) => setTimeout(resolve, 100));

      const data = await apiClient.fetchProducts({
        ...params,
        page: pageNumber,
        page_size: LIMIT,
      });

      const newProducts = data.results || [];

      setProducts((prev) =>
        pageNumber === 1 ? newProducts : [...prev, ...newProducts],
      );

      setHasMore(newProducts.length === LIMIT);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
    } finally {
      setLoadingInitial(false);
      setLoadingMore(false);
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================
  useEffect(() => {
    if (!initialProducts) {
      setPage(1);
      fetchProducts(1);
    }
  }, [JSON.stringify(params)]);

  // =========================
  // INFINITE SCROLL
  // =========================
  const lastProductRef = useCallback(
    (node) => {
      if (loadingMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchProducts(nextPage);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loadingMore, hasMore, page],
  );

  // =========================
  // ERROR STATE
  // =========================
  if (error) {
    return (
      <p className="text-center text-red-500 mt-10">Something went wrong</p>
    );
  }

  const filteredProducts = products.filter((product) => {
    const productCategoryId = product.category?.id;
    const productBrandId = product.brand?.id;
    const productPrice = Number(product.price || product.sale_price || 0);

    const categoryMatch =
      !filters.categories?.length ||
      filters.categories.includes(productCategoryId);
    const brandMatch =
      !filters.brands?.length || filters.brands.includes(productBrandId);
    const minPriceMatch = productPrice >= (filters.minPrice ?? 0);
    const maxPriceMatch =
      productPrice <= (filters.maxPrice ?? Number.MAX_SAFE_INTEGER);

    return categoryMatch && brandMatch && minPriceMatch && maxPriceMatch;
  });

  const wrapperClasses = isFilterLayout
    ? "w-full px-0 py-4 all-products"
    : "w-11/12 md:w-10/12 mx-auto py-8 all-products";

  const gridClasses = isFilterLayout
    ? "all-products-grid grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"
    : "all-products-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4";

  return (
    <div className={wrapperClasses}>
      {title && (
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            {title}
          </h2>
        </div>
      )}

      {/* =========================
          INITIAL LOADING
      ========================= */}
      {loadingInitial ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-100 rounded-xl aspect-3/4"
            />
          ))}
        </div>
      ) : (
        <>
          {/* =========================
              PRODUCT GRID
          ========================= */}
          <div className={gridClasses}>
            {filteredProducts.map((product, index) => {
              if (filteredProducts.length === index + 1) {
                return (
                  <div ref={lastProductRef} key={product.id}>
                    <ProductCard product={product} />
                  </div>
                );
              }

              return <ProductCard key={product.id} product={product} />;
            })}
          </div>

          {!loadingMore && filteredProducts.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
              No products found for selected filters
            </p>
          )}

          {/* =========================
              LOAD MORE SPINNER
          ========================= */}
          {loadingMore && (
            <div className="flex justify-center py-6">
              <div className="w-6 h-6 border-4 border-gray-300 border-t-[#31714f] rounded-full animate-spin"></div>
            </div>
          )}

          {/* =========================
              END MESSAGE
          ========================= */}
          {!hasMore && (
            <p className="text-center text-gray-400 mt-10">
              No more products to load
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
