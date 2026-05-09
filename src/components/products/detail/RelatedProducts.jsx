import React, { useEffect, useMemo, useState } from "react";
import { apiClient } from "../../../api/apiClient";
import ProductCard from "../ProductCard";
import "../ProductSection.css";

const RelatedProducts = ({ product }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRelated = async () => {
    setLoading(true);
    setError(null);

    try {
      // Keep this section aligned with Home "Featured Products".
      const data = await apiClient.fetchProducts({ is_featured: true });
      const results = data?.results || data || [];

      const currentId = product?.id;
      const filtered = results
        .filter((p) => (currentId ? p.id !== currentId : true))
        .slice(0, 8);

      setItems(filtered);
    } catch (err) {
      console.error("Error fetching related products:", err);
      setError("Failed to load related products.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRelated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  const title = useMemo(() => {
    return "Related Products";
  }, []);

  if (!product) return null;

  const displayProducts = items.slice(0, 20);
  const firstLine = displayProducts.slice(
    0,
    Math.ceil(displayProducts.length / 2),
  );
  const secondLine = displayProducts.slice(
    Math.ceil(displayProducts.length / 2),
  );
  const fillLineForMarquee = (line, minimumItems = 12) => {
    if (line.length === 0) return [];
    const repeatCount = Math.ceil(minimumItems / line.length);
    const filledLine = Array.from({ length: repeatCount }, () => line).flat();
    if (filledLine.length % 2 === 0) return filledLine;
    return [...filledLine, line[0]];
  };
  const firstLineFilled = fillLineForMarquee(firstLine);
  const secondLineFilled = fillLineForMarquee(secondLine);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">
          {title}
        </h2>
      </div>

      {loading && (
        <div className="text-sm text-gray-500">Loading products...</div>
      )}

      {error && <div className="text-sm text-red-600 font-medium">{error}</div>}

      {!loading && !error && items.length === 0 && (
        <div className="text-sm text-gray-500">No featured products found.</div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="space-y-3 md:space-y-5 featured-products">
          <div className="overflow-hidden w-full products-row">
            <div className="products-track products-track-featured-right">
              {[...firstLineFilled, ...firstLineFilled].map((p, index) => (
                <div
                  key={`first-${p.id ?? "product"}-${index}`}
                  className="w-[170px] sm:w-[200px] md:w-[230px] lg:w-[245px] shrink-0"
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>

          {secondLine.length > 0 && (
            <div className="overflow-hidden w-full products-row">
              <div className="products-track products-track-featured-left">
                {[...secondLineFilled, ...secondLineFilled].map((p, index) => (
                  <div
                    key={`second-${p.id ?? "product"}-${index}`}
                    className="w-[170px] sm:w-[200px] md:w-[230px] lg:w-[245px] shrink-0"
                  >
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default RelatedProducts;
