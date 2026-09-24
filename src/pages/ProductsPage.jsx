import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router";
import Products from "./Products";
import apiClient from "../api/apiClient";

// ---------------------------------------------------------------------------
// FilterPanel — extracted so it can be shared between desktop sidebar and
// mobile drawer without defining a component inside the render function.
// ---------------------------------------------------------------------------
const FilterPanel = ({
  categories,
  brands,
  selectedCategory,
  onCategoryChange,
  selectedBrand,
  onBrandChange,
  priceRange,
  maxPriceCeiling,
  minPriceInput,
  maxPriceInput,
  onMinSliderChange,
  onMaxSliderChange,
  onMinInputChange,
  onMaxInputChange,
  onMinInputBlur,
  onMaxInputBlur,
  onMinInputFocus,
  onClearFilters,
}) => {
  const currentCatOptionVal =
    categories.find(
      (c) =>
        c.slug?.toLowerCase() === selectedCategory?.toLowerCase() ||
        String(c.id) === String(selectedCategory)
    )?.slug || selectedCategory;

  const currentBrandOptionVal =
    brands.find(
      (b) =>
        b.slug?.toLowerCase() === selectedBrand?.toLowerCase() ||
        String(b.id) === String(selectedBrand)
    )?.slug || selectedBrand;

  return (
    <div className="space-y-6">
      {/* ── Category Dropdown ── */}
      <div>
        <h2 className="font-semibold mb-2 text-base">Category</h2>
        <div className="relative">
          <select
            value={currentCatOptionVal}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 pr-8 text-sm text-gray-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer transition-colors"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug || cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      </div>

      {/* ── Brand Dropdown ── */}
      <div>
        <h2 className="font-semibold mb-2 text-base">Brand</h2>
        <div className="relative">
          <select
            value={currentBrandOptionVal}
            onChange={(e) => onBrandChange(e.target.value)}
            className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 pr-8 text-sm text-gray-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer transition-colors"
          >
            <option value="">All Brands</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.slug || brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      </div>

      {/* ── Price Range ── */}
      <div>
        <h2 className="font-semibold mb-3 text-base">Price Range</h2>
        <div className="space-y-4">
          {/* Min */}
          <div>
            <p className="text-xs text-gray-500 mb-1">Min Price</p>
            <input
              type="range"
              min="0"
              max={maxPriceCeiling}
              step="100"
              value={priceRange.min}
              onChange={onMinSliderChange}
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
                onFocus={onMinInputFocus}
                onChange={onMinInputChange}
                onBlur={onMinInputBlur}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
              />
            </div>
          </div>

          {/* Max */}
          <div>
            <p className="text-xs text-gray-500 mb-1">Max Price</p>
            <input
              type="range"
              min="0"
              max={maxPriceCeiling}
              step="100"
              value={priceRange.max}
              onChange={onMaxSliderChange}
              className="w-full cursor-pointer accent-primary"
            />
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm text-gray-600 shrink-0">৳</span>
              <input
                type="number"
                min={priceRange.min}
                max={maxPriceCeiling}
                step={100}
                value={maxPriceInput}
                onChange={onMaxInputChange}
                onBlur={onMaxInputBlur}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onClearFilters}
        className="w-full bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg py-2 text-sm font-medium cursor-pointer"
      >
        Clear Filters
      </button>
    </div>
  );
};

// ---------------------------------------------------------------------------
// ProductsPage
// ---------------------------------------------------------------------------
const ProductsPage = () => {
  const { categorySlug, brandSlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [maxPriceCeiling, setMaxPriceCeiling] = useState(50000);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // ── Filter state — initialized from path param (:categorySlug / :brandSlug) or URL query param ──
  const [selectedCategory, setSelectedCategory] = useState(
    () => categorySlug || searchParams.get("category") || ""
  );
  const [selectedBrand, setSelectedBrand] = useState(
    () => brandSlug || searchParams.get("brand") || ""
  );
  const [priceRange, setPriceRange] = useState({
    min: Number(searchParams.get("min_price") || 0),
    max: Number(searchParams.get("max_price") || 50000),
  });
  const [minPriceInput, setMinPriceInput] = useState(
    searchParams.get("min_price") || "0"
  );
  const [maxPriceInput, setMaxPriceInput] = useState(
    searchParams.get("max_price") || "50000"
  );

  // Keep state in sync whenever route params or query params change
  useEffect(() => {
    setSelectedCategory(categorySlug || searchParams.get("category") || "");
  }, [categorySlug, searchParams]);

  useEffect(() => {
    setSelectedBrand(brandSlug || searchParams.get("brand") || "");
  }, [brandSlug, searchParams]);

  // ── Load categories, brands, and real price ceiling ──
  useEffect(() => {
    const load = async () => {
      try {
        const [categoriesData, brandsData, priceData] = await Promise.all([
          apiClient.fetchCategories(),
          apiClient.fetchBrands(),
          apiClient.fetchPriceRange(),
        ]);
        setCategories(categoriesData || []);
        setBrands(brandsData || []);

        if (priceData?.max) {
          // Round ceiling up to nearest 1 000 for a clean slider
          const ceil = Math.ceil(priceData.max / 1000) * 1000;
          setMaxPriceCeiling(ceil);
          // Only set defaults when the URL doesn't already specify a max
          if (!searchParams.get("max_price")) {
            setPriceRange((prev) => ({ ...prev, max: ceil }));
            setMaxPriceInput(String(ceil));
          }
        }
      } catch (err) {
        console.error("Error loading filter options:", err);
      }
    };
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const searchQuery = searchParams.get("search") || "";

  // ── Navigation handlers when category / brand change ──
  const handleCategoryChange = useCallback(
    (newCat) => {
      setSelectedCategory(newCat);
      if (categorySlug) {
        const p = new URLSearchParams(searchParams);
        p.delete("category");
        const qs = p.toString() ? `?${p.toString()}` : "";
        if (newCat) {
          navigate(`/category/${newCat}${qs}`);
        } else {
          navigate(`/products${qs}`);
        }
      }
    },
    [categorySlug, searchParams, navigate]
  );

  const handleBrandChange = useCallback(
    (newBrand) => {
      setSelectedBrand(newBrand);
      if (brandSlug) {
        const p = new URLSearchParams(searchParams);
        p.delete("brand");
        const qs = p.toString() ? `?${p.toString()}` : "";
        if (newBrand) {
          navigate(`/brand/${newBrand}${qs}`);
        } else {
          navigate(`/products${qs}`);
        }
      }
    },
    [brandSlug, searchParams, navigate]
  );

  // ── Sync filters → URL query string ──
  const updateURL = useCallback(
    (cat, brand, minP, maxP, ceil, search) => {
      const p = {};
      if (search) p.search = search;
      // Do not duplicate in query params if already in route path
      if (cat && !categorySlug) p.category = cat;
      if (brand && !brandSlug) p.brand = brand;
      if (minP > 0) p.min_price = String(minP);
      if (maxP < ceil) p.max_price = String(maxP);
      setSearchParams(p, { replace: true });
    },
    [categorySlug, brandSlug, setSearchParams]
  );

  useEffect(() => {
    updateURL(
      selectedCategory,
      selectedBrand,
      priceRange.min,
      priceRange.max,
      maxPriceCeiling,
      searchQuery
    );
  }, [
    selectedCategory,
    selectedBrand,
    priceRange.min,
    priceRange.max,
    maxPriceCeiling,
    searchQuery,
    updateURL,
  ]);

  // ── API params passed to <Products> ──
  const apiParams = useMemo(() => {
    const p = {};
    if (searchQuery) p["search"] = searchQuery;
    if (selectedCategory) {
      const catVal = decodeURIComponent(selectedCategory).trim();
      if (/^\d+$/.test(catVal)) {
        p["category"] = catVal;
      } else {
        p["category__slug"] = catVal.toLowerCase();
      }
    }
    if (selectedBrand) {
      const brandVal = decodeURIComponent(selectedBrand).trim();
      if (/^\d+$/.test(brandVal)) {
        p["brand"] = brandVal;
      } else {
        p["brand__slug"] = brandVal.toLowerCase();
      }
    }
    if (priceRange.min > 0) p["price__gte"] = priceRange.min;
    if (priceRange.max < maxPriceCeiling) p["price__lte"] = priceRange.max;
    return p;
  }, [
    searchQuery,
    selectedCategory,
    selectedBrand,
    priceRange.min,
    priceRange.max,
    maxPriceCeiling,
  ]);

  // ── Price helpers ──
  const clampMin = (value, max) =>
    Math.min(Math.max(0, Math.round(value)), max);
  const clampMax = (value, min) =>
    Math.min(Math.max(min, Math.round(value)), maxPriceCeiling);

  const clearFilters = useCallback(() => {
    setSelectedCategory("");
    setSelectedBrand("");
    setPriceRange({ min: 0, max: maxPriceCeiling });
    setMinPriceInput("0");
    setMaxPriceInput(String(maxPriceCeiling));
    if (categorySlug || brandSlug) {
      navigate("/products", { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [maxPriceCeiling, categorySlug, brandSlug, navigate, setSearchParams]);

  // ── Active filter chips ──
  const activeFilters = useMemo(() => {
    const chips = [];
    if (searchQuery) {
      chips.push({
        key: "search",
        label: `Search: "${searchQuery}"`,
        onRemove: () => {
          updateURL(
            selectedCategory,
            selectedBrand,
            priceRange.min,
            priceRange.max,
            maxPriceCeiling,
            ""
          );
        },
      });
    }
    if (selectedCategory) {
      const cat = categories.find(
        (c) =>
          c.slug?.toLowerCase() === selectedCategory.toLowerCase() ||
          String(c.id) === String(selectedCategory)
      );
      chips.push({
        key: "category",
        label: cat ? cat.name : selectedCategory,
        onRemove: () => handleCategoryChange(""),
      });
    }
    if (selectedBrand) {
      const brand = brands.find(
        (b) =>
          b.slug?.toLowerCase() === selectedBrand.toLowerCase() ||
          String(b.id) === String(selectedBrand)
      );
      chips.push({
        key: "brand",
        label: brand ? brand.name : selectedBrand,
        onRemove: () => handleBrandChange(""),
      });
    }
    const priceActive =
      priceRange.min > 0 || priceRange.max < maxPriceCeiling;
    if (priceActive) {
      chips.push({
        key: "price",
        label: `৳${priceRange.min.toLocaleString()} – ৳${priceRange.max.toLocaleString()}`,
        onRemove: () => {
          setPriceRange({ min: 0, max: maxPriceCeiling });
          setMinPriceInput("0");
          setMaxPriceInput(String(maxPriceCeiling));
        },
      });
    }
    return chips;
  }, [
    searchQuery,
    selectedCategory,
    selectedBrand,
    priceRange,
    categories,
    brands,
    maxPriceCeiling,
    updateURL,
    handleCategoryChange,
    handleBrandChange,
  ]);

  // ── Page Heading Title ──
  const pageTitle = useMemo(() => {
    if (searchQuery) return `Search results for "${searchQuery}"`;
    const cat = categories.find(
      (c) =>
        c.slug?.toLowerCase() === selectedCategory?.toLowerCase() ||
        String(c.id) === String(selectedCategory)
    );
    const brand = brands.find(
      (b) =>
        b.slug?.toLowerCase() === selectedBrand?.toLowerCase() ||
        String(b.id) === String(selectedBrand)
    );
    if (cat && brand) return `${cat.name} (${brand.name})`;
    if (cat) return cat.name;
    if (brand) return brand.name;
    if (selectedCategory) {
      const decoded = decodeURIComponent(selectedCategory);
      return decoded.charAt(0).toUpperCase() + decoded.slice(1).replace(/-/g, " ");
    }
    if (selectedBrand) {
      const decoded = decodeURIComponent(selectedBrand);
      return decoded.charAt(0).toUpperCase() + decoded.slice(1).replace(/-/g, " ");
    }
    return "Products";
  }, [searchQuery, categories, brands, selectedCategory, selectedBrand]);

  // ── Shared panel props ──
  const panelProps = {
    categories,
    brands,
    selectedCategory,
    onCategoryChange: handleCategoryChange,
    selectedBrand,
    onBrandChange: handleBrandChange,
    priceRange,
    maxPriceCeiling,
    minPriceInput,
    maxPriceInput,
    onMinSliderChange: (e) => {
      const v = Math.min(Number(e.target.value), priceRange.max);
      setPriceRange((prev) => ({ ...prev, min: v }));
      setMinPriceInput(String(v));
    },
    onMaxSliderChange: (e) => {
      const v = Math.max(Number(e.target.value), priceRange.min);
      setPriceRange((prev) => ({ ...prev, max: v }));
      setMaxPriceInput(String(v));
    },
    onMinInputFocus: () => {
      if (priceRange.min === 0 && minPriceInput === "0") setMinPriceInput("");
    },
    onMinInputChange: (e) => {
      const raw = e.target.value;
      setMinPriceInput(raw);
      if (raw === "") return;
      const n = Number(raw);
      if (Number.isNaN(n)) return;
      setPriceRange((prev) => ({ ...prev, min: clampMin(n, prev.max) }));
    },
    onMaxInputChange: (e) => {
      const raw = e.target.value;
      setMaxPriceInput(raw);
      if (raw === "") return;
      const n = Number(raw);
      if (Number.isNaN(n)) return;
      setPriceRange((prev) => ({ ...prev, max: clampMax(n, prev.min) }));
    },
    onMinInputBlur: () => {
      if (minPriceInput === "") setMinPriceInput(String(priceRange.min));
    },
    onMaxInputBlur: () => {
      if (maxPriceInput === "") setMaxPriceInput(String(priceRange.max));
    },
    onClearFilters: clearFilters,
  };

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 my-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* ── Desktop sidebar ── */}
        <aside className="hidden lg:block w-full lg:w-[280px] bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-6 h-fit sticky top-24">
          <h1 className="text-2xl font-bold">Filter</h1>
          <FilterPanel {...panelProps} />
        </aside>

        {/* ── Product grid ── */}
        <div className="flex-1">
          <div className="mb-2 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-gray-700">{pageTitle}</h2>

            {/* Mobile filter button */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white text-primary px-3 py-2 text-sm font-medium shadow-sm cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
              >
                <path d="M3 5h18M6 12h12M10 19h4" />
              </svg>
              Filter
              {activeFilters.length > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  {activeFilters.length}
                </span>
              )}
            </button>
          </div>

          {/* ── Active filter chips ── */}
          {activeFilters.length > 0 && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {activeFilters.map((chip) => (
                <span
                  key={chip.key}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {chip.label}
                  <button
                    onClick={chip.onRemove}
                    aria-label={`Remove ${chip.label} filter`}
                    className="rounded-full hover:bg-primary/20 p-0.5 transition-colors cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-3 w-3"
                    >
                      <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                    </svg>
                  </button>
                </span>
              ))}
              <button
                onClick={clearFilters}
                className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 cursor-pointer transition-colors"
              >
                Clear all
              </button>
            </div>
          )}

          <Products params={apiParams} isFilterLayout />
        </div>
      </div>

      {/* ── Mobile filter drawer ── */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          isMobileFilterOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <button
          type="button"
          aria-label="Close filter drawer"
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isMobileFilterOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileFilterOpen(false)}
        />

        {/* Drawer panel */}
        <aside
          className={`absolute right-0 top-0 h-full w-[70%] max-w-sm overflow-y-auto bg-white p-4 shadow-xl transform transition-transform duration-300 ease-out ${
            isMobileFilterOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-5 flex items-center justify-between">
            <h1 className="text-xl font-bold">Filter</h1>
            <button
              type="button"
              className="rounded-md p-1 text-gray-500 hover:text-gray-800 cursor-pointer transition-colors"
              onClick={() => setIsMobileFilterOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <FilterPanel {...panelProps} />
        </aside>
      </div>
    </div>
  );
};

export default ProductsPage;
