import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import Products from "./Products";
import apiClient from "../api/apiClient";

const ProductsPage = () => {
  const { categorySlug, brandSlug } = useParams();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [minPriceInput, setMinPriceInput] = useState("0");
  const [maxPriceInput, setMaxPriceInput] = useState("50000");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [filteredCatalogProducts, setFilteredCatalogProducts] = useState([]);

  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const [categoriesData, brandsData] = await Promise.all([
          apiClient.fetchCategories(),
          apiClient.fetchBrands(),
        ]);
        setCategories(categoriesData || []);
        setBrands(brandsData || []);
      } catch (error) {
        console.error("Error loading filter options:", error);
      }
    };

    loadFilterOptions();
  }, []);

  // Fetch products matching selected category or brand to cross-filter available sidebar options
  useEffect(() => {
    let isMounted = true;
    const fetchCatalogForFilter = async () => {
      if (!selectedCategories.length && !selectedBrands.length) {
        if (isMounted) setFilteredCatalogProducts([]);
        return;
      }

      try {
        const queryParams = { page_size: 100 };
        if (selectedCategories.length) {
          queryParams.category = selectedCategories.join(",");
        }
        if (selectedBrands.length) {
          queryParams.brand = selectedBrands.join(",");
        }
        const data = await apiClient.fetchProducts(queryParams);
        if (isMounted) {
          const list = Array.isArray(data) ? data : data?.results || [];
          setFilteredCatalogProducts(list);
        }
      } catch (err) {
        console.error("Error fetching catalog for filter:", err);
      }
    };

    fetchCatalogForFilter();
    return () => {
      isMounted = false;
    };
  }, [selectedCategories, selectedBrands]);

  // Pre-select category if categorySlug is passed in URL
  useEffect(() => {
    if (!categorySlug || !categories.length) return;
    const match = categories.find(
      (c) => c.slug?.toLowerCase() === categorySlug.toLowerCase() || String(c.id) === String(categorySlug)
    );
    if (match) {
      setSelectedCategories([match.id]);
    }
  }, [categorySlug, categories]);

  // Pre-select brand if brandSlug is passed in URL
  useEffect(() => {
    if (!brandSlug || !brands.length) return;
    const match = brands.find(
      (b) => b.slug?.toLowerCase() === brandSlug.toLowerCase() || String(b.id) === String(brandSlug)
    );
    if (match) {
      setSelectedBrands([match.id]);
    }
  }, [brandSlug, brands]);

  // Filter categories to show ONLY those available under the selected brand
  const visibleCategories = useMemo(() => {
    if (!selectedBrands.length) {
      return categories;
    }
    const catIdentifiers = new Set();
    filteredCatalogProducts.forEach((p) => {
      const cId = p.category?.id ?? p.category;
      const cSlug = p.category?.slug;
      if (cId !== undefined && cId !== null) catIdentifiers.add(String(cId));
      if (cSlug) catIdentifiers.add(String(cSlug).toLowerCase());
    });

    return categories.filter(
      (c) =>
        catIdentifiers.has(String(c.id)) ||
        (c.slug && catIdentifiers.has(String(c.slug).toLowerCase()))
    );
  }, [categories, selectedBrands, filteredCatalogProducts]);

  // Filter brands to show ONLY those available under the selected category
  const visibleBrands = useMemo(() => {
    if (!selectedCategories.length) {
      return brands;
    }
    const brandIdentifiers = new Set();
    filteredCatalogProducts.forEach((p) => {
      const bId = p.brand?.id ?? p.brand;
      const bSlug = p.brand?.slug;
      if (bId !== undefined && bId !== null) brandIdentifiers.add(String(bId));
      if (bSlug) brandIdentifiers.add(String(bSlug).toLowerCase());
    });

    return brands.filter(
      (b) =>
        brandIdentifiers.has(String(b.id)) ||
        (b.slug && brandIdentifiers.has(String(b.slug).toLowerCase()))
    );
  }, [brands, selectedCategories, filteredCatalogProducts]);

  const filterValues = useMemo(
    () => ({
      categories: selectedCategories,
      brands: selectedBrands,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
    }),
    [selectedCategories, selectedBrands, priceRange.min, priceRange.max],
  );

  const selectSingle = (value, setSelectedValues) => {
    setSelectedValues((prev) => (prev.includes(value) ? [] : [value]));
  };

  const MAX_PRICE_CEILING = 100000;

  const clampMinPrice = (value, max) =>
    Math.min(Math.max(0, Math.round(value)), max);

  const clampMaxPrice = (value, min) =>
    Math.min(Math.max(min, Math.round(value)), MAX_PRICE_CEILING);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange({ min: 0, max: 50000 });
    setMinPriceInput("0");
    setMaxPriceInput("50000");
  };

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 my-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="hidden lg:block w-full lg:w-[280px] bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-6 h-fit sticky top-24">
          <h1 className="text-2xl font-bold">Filter</h1>

          <div>
            <h2 className="font-semibold mb-3 text-lg">Categories</h2>
            <div className="space-y-2 max-h-44 overflow-auto pr-1 bg-gray-100 text-primary p-4 rounded-lg">
              {visibleCategories.length > 0 ? (
                visibleCategories.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="desktop_category"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => selectSingle(category.id, setSelectedCategories)}
                      onClick={() => {
                        if (selectedCategories.includes(category.id)) {
                          setSelectedCategories([]);
                        }
                      }}
                      className="cursor-pointer accent-primary"
                    />
                    <span>{category.name}</span>
                  </label>
                ))
              ) : (
                <p className="text-xs text-gray-500 italic">No available categories</p>
              )}
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-3 text-lg">Brands</h2>
            <div className="space-y-2 max-h-44 overflow-auto pr-1 bg-gray-100  text-primary p-4 rounded-lg">
              {visibleBrands.length > 0 ? (
                visibleBrands.map((brand) => (
                  <label
                    key={brand.id}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="desktop_brand"
                      checked={selectedBrands.includes(brand.id)}
                      onChange={() => selectSingle(brand.id, setSelectedBrands)}
                      onClick={() => {
                        if (selectedBrands.includes(brand.id)) {
                          setSelectedBrands([]);
                        }
                      }}
                      className="cursor-pointer accent-primary"
                    />
                    <span>{brand.name}</span>
                  </label>
                ))
              ) : (
                <p className="text-xs text-gray-500 italic">No available brands</p>
              )}
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-3">Price Range</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Min Price</p>
                <input
                  type="range"
                  min="0"
                  max={MAX_PRICE_CEILING}
                  step="100"
                  value={priceRange.min}
                  onChange={(e) => {
                    const nextMin = Math.min(
                      Number(e.target.value),
                      priceRange.max,
                    );
                    setPriceRange((prev) => ({
                      ...prev,
                      min: nextMin,
                    }));
                    setMinPriceInput(String(nextMin));
                  }}
                  className="w-full cursor-pointer accent-primary"
                />
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-gray-600 shrink-0">৳</span>
                  <input
                    type="number"
                    min={0}
                    max={priceRange.max}
                    step={100}
                    value={minPriceInput}
                    onFocus={() => {
                      if (priceRange.min === 0 && minPriceInput === "0") {
                        setMinPriceInput("");
                      }
                    }}
                    onChange={(e) => {
                      const raw = e.target.value;
                      setMinPriceInput(raw);
                      if (raw === "") return;
                      const n = Number(raw);
                      if (Number.isNaN(n)) return;
                      setPriceRange((prev) => ({
                        ...prev,
                        min: clampMinPrice(n, prev.max),
                      }));
                    }}
                    onBlur={() => {
                      if (minPriceInput === "") {
                        setMinPriceInput(String(priceRange.min));
                      }
                    }}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
                  />
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Max Price</p>
                <input
                  type="range"
                  min="0"
                  max={MAX_PRICE_CEILING}
                  step="100"
                  value={priceRange.max}
                  onChange={(e) => {
                    const nextMax = Math.max(
                      Number(e.target.value),
                      priceRange.min,
                    );
                    setPriceRange((prev) => ({
                      ...prev,
                      max: nextMax,
                    }));
                    setMaxPriceInput(String(nextMax));
                  }}
                  className="w-full cursor-pointer accent-primary"
                />
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-gray-600 shrink-0">৳</span>
                  <input
                    type="number"
                    min={priceRange.min}
                    max={MAX_PRICE_CEILING}
                    step={100}
                    value={maxPriceInput}
                    onChange={(e) => {
                      const raw = e.target.value;
                      setMaxPriceInput(raw);
                      if (raw === "") return;
                      const n = Number(raw);
                      if (Number.isNaN(n)) return;
                      setPriceRange((prev) => ({
                        ...prev,
                        max: clampMaxPrice(n, prev.min),
                      }));
                    }}
                    onBlur={() => {
                      if (maxPriceInput === "") {
                        setMaxPriceInput(String(priceRange.max));
                      }
                    }}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={clearFilters}
            className="w-full bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg py-2 text-sm font-medium cursor-pointer"
          >
            Clear Filters
          </button>
        </aside>

        <div className="flex-1">
          <div className="mb-2 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-gray-700">Products</h2>
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white text-primary px-3 py-2 text-sm font-medium text-gray-700 shadow-sm cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4 text-primary"
              >
                <path d="M3 5h18M6 12h12M10 19h4" />
              </svg>
              Filter
            </button>
          </div>
          <div>
            <Products filters={filterValues} isFilterLayout />
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          isMobileFilterOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          type="button"
          aria-label="Close filter drawer"
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isMobileFilterOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileFilterOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 h-full w-[60%] max-w-sm overflow-y-auto bg-white p-4 shadow-xl transform transition-transform duration-400 ease-out ${
            isMobileFilterOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Filter</h1>
              <button
                type="button"
                className="rounded-md p-1 text-gray-600 cursor-pointer"
                onClick={() => setIsMobileFilterOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5 text-primary"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="font-semibold mb-3 text-lg">Categories</h2>
                <div className="space-y-2 max-h-44 overflow-auto pr-1 bg-gray-100 text-primary p-4 rounded-lg">
                  {visibleCategories.length > 0 ? (
                    visibleCategories.map((category) => (
                      <label
                        key={`mobile-category-${category.id}`}
                        className="flex items-center gap-2 text-sm cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="mobile_category"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => selectSingle(category.id, setSelectedCategories)}
                          onClick={() => {
                            if (selectedCategories.includes(category.id)) {
                              setSelectedCategories([]);
                            }
                          }}
                          className="cursor-pointer accent-primary"
                        />
                        <span>{category.name}</span>
                      </label>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500 italic">No available categories</p>
                  )}
                </div>
              </div>

              <div>
                <h2 className="font-semibold mb-3 text-lg">Brands</h2>
                <div className="space-y-2 max-h-44 overflow-auto pr-1 bg-gray-100 text-primary p-4 rounded-lg">
                  {visibleBrands.length > 0 ? (
                    visibleBrands.map((brand) => (
                      <label
                        key={`mobile-brand-${brand.id}`}
                        className="flex items-center gap-2 text-sm cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="mobile_brand"
                          checked={selectedBrands.includes(brand.id)}
                          onChange={() => selectSingle(brand.id, setSelectedBrands)}
                          onClick={() => {
                            if (selectedBrands.includes(brand.id)) {
                              setSelectedBrands([]);
                            }
                          }}
                          className="cursor-pointer accent-primary"
                        />
                        <span>{brand.name}</span>
                      </label>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500 italic">No available brands</p>
                  )}
                </div>
              </div>

              <div>
                <h2 className="font-semibold mb-3">Price Range</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Min Price</p>
                    <input
                      type="range"
                      min="0"
                      max={MAX_PRICE_CEILING}
                      step="100"
                      value={priceRange.min}
                      onChange={(e) => {
                        const nextMin = Math.min(
                          Number(e.target.value),
                          priceRange.max,
                        );
                        setPriceRange((prev) => ({
                          ...prev,
                          min: nextMin,
                        }));
                        setMinPriceInput(String(nextMin));
                      }}
                      className="w-full cursor-pointer accent-primary"
                    />
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm text-gray-600 shrink-0">৳</span>
                      <input
                        type="number"
                        min={0}
                        max={priceRange.max}
                        step={100}
                        value={minPriceInput}
                        onFocus={() => {
                          if (priceRange.min === 0 && minPriceInput === "0") {
                            setMinPriceInput("");
                          }
                        }}
                        onChange={(e) => {
                          const raw = e.target.value;
                          setMinPriceInput(raw);
                          if (raw === "") return;
                          const n = Number(raw);
                          if (Number.isNaN(n)) return;
                          setPriceRange((prev) => ({
                            ...prev,
                            min: clampMinPrice(n, prev.max),
                          }));
                        }}
                        onBlur={() => {
                          if (minPriceInput === "") {
                            setMinPriceInput(String(priceRange.min));
                          }
                        }}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">Max Price</p>
                    <input
                      type="range"
                      min="0"
                      max={MAX_PRICE_CEILING}
                      step="100"
                      value={priceRange.max}
                      onChange={(e) => {
                        const nextMax = Math.max(
                          Number(e.target.value),
                          priceRange.min,
                        );
                        setPriceRange((prev) => ({
                          ...prev,
                          max: nextMax,
                        }));
                        setMaxPriceInput(String(nextMax));
                      }}
                      className="w-full cursor-pointer accent-primary"
                    />
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm text-gray-600 shrink-0">৳</span>
                      <input
                        type="number"
                        min={priceRange.min}
                        max={MAX_PRICE_CEILING}
                        step={100}
                        value={maxPriceInput}
                        onChange={(e) => {
                          const raw = e.target.value;
                          setMaxPriceInput(raw);
                          if (raw === "") return;
                          const n = Number(raw);
                          if (Number.isNaN(n)) return;
                          setPriceRange((prev) => ({
                            ...prev,
                            max: clampMaxPrice(n, prev.min),
                          }));
                        }}
                        onBlur={() => {
                          if (maxPriceInput === "") {
                            setMaxPriceInput(String(priceRange.max));
                          }
                        }}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={clearFilters}
                className="w-full bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg py-2 text-sm font-medium cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
        </aside>
      </div>
    </div>
  );
};

export default ProductsPage;
