import React, { use, useState } from "react";
import Cooking from "./Cooking";

const LoadCooking = ({ promise, handleCart }) => {
  const data = use(promise);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div
      id="cooking-section"
      className="w-11/12 md:w-10/12 mx-auto mt-6 md:mt-10"
    >
      <div className="flex items-center justify-between border-b mb-3 md:mb-4 py-3">
        <h1 className="font-bold text-lg md:text-2xl">All Products</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 mt-4 md:mt-5">
        {currentItems.map((cook, i) => (
          <Cooking
            key={`${currentPage}-${i}`}
            cook={cook}
            handleCart={handleCart}
            index={i}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 0 && (
        <div className="flex justify-center items-center gap-2 mt-8 md:mt-10">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${currentPage === 1 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-[#31714f] text-white hover:bg-[#255c40]"}`}
          >
            Prev
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`w-8 h-8 flex items-center justify-center rounded-md font-medium transition-colors cursor-pointer ${
                  currentPage === index + 1
                    ? "bg-[#31714f] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${currentPage === totalPages ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-[#31714f] text-white hover:bg-[#255c40]"}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default LoadCooking;
