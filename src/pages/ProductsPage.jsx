import React, { useEffect, useMemo, useState } from "react";
import Products from "./Products";
import apiClient from "../api/apiClient";

const ProductsPage = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });

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

  const filterValues = useMemo(
    () => ({
      categories: selectedCategories,
      brands: selectedBrands,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
    }),
    [selectedCategories, selectedBrands, priceRange.min, priceRange.max],
  );

  const toggleSelection = (value, setSelectedValues) => {
    setSelectedValues((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  return (
    <div className="w-11/12 md:w-10/12 mx-auto my-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="w-full lg:w-[280px] bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-6 h-fit">
          <h1 className="text-2xl font-bold">Filter</h1>

          <div>
            <h2 className="font-semibold mb-3 text-lg">Categories</h2>
            <div className="space-y-2 max-h-44 overflow-auto pr-1 bg-gray-100 p-4 rounded-lg">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() =>
                      toggleSelection(category.id, setSelectedCategories)
                    }
                    className="cursor-pointer"
                  />
                  <span>{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-3 text-lg">Brands</h2>
            <div className="space-y-2 max-h-44 overflow-auto pr-1 bg-gray-100 p-4 rounded-lg">
              {brands.map((brand) => (
                <label
                  key={brand.id}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand.id)}
                    onChange={() =>
                      toggleSelection(brand.id, setSelectedBrands)
                    }
                    className="cursor-pointer"
                  />
                  <span>{brand.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-3">Price Range</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">
                  Min Price: ৳{priceRange.min}
                </p>
                <input
                  type="range"
                  min="0"
                  max={priceRange.max}
                  step="100"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange((prev) => ({
                      ...prev,
                      min: Math.min(Number(e.target.value), prev.max),
                    }))
                  }
                  className="w-full cursor-pointer"
                />
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">
                  Max Price: ৳{priceRange.max}
                </p>
                <input
                  type="range"
                  min={priceRange.min}
                  max="100000"
                  step="100"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange((prev) => ({
                      ...prev,
                      max: Math.max(Number(e.target.value), prev.min),
                    }))
                  }
                  className="w-full cursor-pointer"
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedCategories([]);
              setSelectedBrands([]);
              setPriceRange({ min: 0, max: 50000 });
            }}
            className="w-full bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg py-2 text-sm font-medium cursor-pointer"
          >
            Clear Filters
          </button>
        </aside>

        <div className="flex-1">
          <div className="mb-2">
            <h2 className="text-lg font-semibold text-gray-700">Products</h2>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            <Products filters={filterValues} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
