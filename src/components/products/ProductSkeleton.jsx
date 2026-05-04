import React from 'react';

const ProductSkeleton = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full animate-pulse">
            {/* Image Placeholder */}
            <div className="relative aspect-square bg-gray-200"></div>

            <div className="p-3 space-y-3 flex flex-col flex-grow">
                {/* Title Placeholder */}
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>

                {/* Stars Placeholder */}
                <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-3.5 h-3.5 bg-gray-100 rounded-full"></div>
                    ))}
                </div>

                {/* Badges Placeholder */}
                <div className="flex flex-col gap-2">
                    <div className="h-6 bg-gray-100 rounded-md w-20"></div>
                    <div className="h-6 bg-gray-100 rounded-md w-24"></div>
                </div>

                {/* Price Placeholder */}
                <div className="mt-auto pt-2">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                        <div className="h-4 bg-gray-100 rounded w-12"></div>
                    </div>

                    {/* Button Placeholder */}
                    <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
                </div>
            </div>
        </div>
    );
};

export default ProductSkeleton;
