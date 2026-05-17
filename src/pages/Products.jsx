import React, { useState, useEffect } from "react";
import ProductCard from "../components/products/ProductCard";
import ProductSkeleton from "../components/products/ProductSkeleton";
import apiClient from "../api/apiClient";
import "../components/products/ProductSection.css";

const LIMIT = 20;

const Products = ({
  params = {},
  initialProducts = null,
  isFilterLayout = false,
  isHomePage = false,
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

      // Prototyping realistic API loading state transition
      await new Promise((resolve) => setTimeout(resolve, 300));

      // 30 products is the mathematical sweet spot:
      // - Divides perfectly by 5 columns on laptop (6 rows)
      // - Divides perfectly by 6 columns on desktop (5 rows)
      // Leaving ZERO empty slots or incomplete lines!
      const pageSize = isHomePage ? 30 : LIMIT;
      const data = await apiClient.fetchProducts({
        ...params,
        page: pageNumber,
        page_size: pageSize,
      });

      const newProducts = data.results || [];

      setProducts((prev) =>
        pageNumber === 1 ? newProducts : [...prev, ...newProducts],
      );

      // On Homepage, we cap it at exactly 30 products and never load more
      if (isHomePage) {
        setHasMore(false);
      } else {
        setHasMore(newProducts.length === LIMIT);
      }
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
  // ERROR STATE
  // =========================
  if (error) {
    return (
      <p className="text-center text-red-500 mt-10">Something went wrong</p>
    );
  }

  // Filter products locally based on side bar options
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
    : "w-full px-4 md:px-8 py-8 all-products";

  // Grid styling layout
  const gridClasses = isFilterLayout
    ? "all-products-grid grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
    : "all-products-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4";

  return (
    <div className={wrapperClasses}>
      {/* Heading - Renamed to 'New Arrivals' on Homepage, Hidden on Filter Page */}
      {!isFilterLayout && (
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-800">
            {isHomePage ? "New Arrivals" : "All Products"}
          </h2>
          {isHomePage && (
            <a href="/products" className="text-primary text-sm font-bold hover:underline">
              View All
            </a>
          )}
        </div>
      )}

      {/* =========================
          INITIAL LOADING SKELETON
      ========================= */}
      {loadingInitial ? (
        <div className={gridClasses}>
          {[...Array(isHomePage ? 30 : LIMIT)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          {/* =========================
              PRODUCT GRID
          ========================= */}
          <div className={gridClasses}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

            {/* Premium Skeletons loaded inside grid on load more */}
            {!isHomePage && loadingMore && [...Array(LIMIT)].map((_, i) => (
              <ProductSkeleton key={`skeleton-more-${i}`} />
            ))}
          </div>

          {!loadingMore && filteredProducts.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
              No products found for selected filters
            </p>
          )}

          {/* =========================
              LOAD MORE BUTTON (DEDICATED PRODUCTS PAGE)
          ========================= */}
          {!isHomePage && hasMore && !loadingInitial && (
            <div className="flex justify-center mt-12 pb-4">
              <button
                onClick={() => {
                  const nextPage = page + 1;
                  setPage(nextPage);
                  fetchProducts(nextPage);
                }}
                disabled={loadingMore}
                className="flex items-center cursor-pointer justify-center gap-2 rounded-xl border border-primary/20 bg-white px-8 py-3.5 text-sm font-bold text-primary shadow-sm shadow-primary/5 transition-all duration-200 hover:bg-primary/5 hover:border-primary active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-4 focus-visible:ring-primary/10 outline-none"
              >
                Load More Products
              </button>
            </div>
          )}

          {/* =========================
              ALL PRODUCTS BUTTON (HOMEPAGE)
          ========================= */}
          {isHomePage && (
            <div className="flex justify-center mt-12">
              <a
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-white shadow-md shadow-primary/20 transition-all duration-200 hover:bg-[#25573c] hover:scale-[1.01] active:scale-[0.99] focus-visible:ring-4 focus-visible:ring-primary/30 outline-none cursor-pointer"
              >
                All Products →
              </a>
            </div>
          )}

          {/* =========================
              END MESSAGE
          ========================= */}
          {!isHomePage && !hasMore && filteredProducts.length > 0 && (
            <p className="text-center text-gray-400 mt-12">
              No more products to load
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
