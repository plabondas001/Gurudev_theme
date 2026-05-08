import React from "react";

const Specification = ({ product }) => {
  const specifications = Array.isArray(product?.specifications)
    ? product.specifications.filter((item) => item?.key || item?.value)
    : [];
  const specificationHtml = product?.specification;

  if (!specifications.length && !specificationHtml) {
    return null;
  }

  return (
    <div className="mt-12 bg-white rounded-3xl p-8 shadow-lg border border-primary">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-primary w-fit">
        Product Specification
      </h2>

      {specifications.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-gray-100">
          {specifications.map((item, index) => (
            <div
              key={`${item.key || "spec"}-${index}`}
              className={`flex items-start ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } border-b border-gray-100 last:border-b-0`}
            >
              {/* Key */}
              <div className="w-[160px] min-w-[160px] sm:w-[220px] sm:min-w-[220px] px-4 py-3 font-semibold text-black border-r border-gray-200">
                {item.key}
              </div>

              {/* Value */}
              <div className="flex-1 px-4 py-3 text-black">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="prose prose-lg max-w-none text-gray-600 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: specificationHtml }}
        />
      )}
    </div>
  );
};

export default Specification;
