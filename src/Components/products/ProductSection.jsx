import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import apiClient from '../../api/apiClient';

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
                        <div key={i} className="animate-pulse bg-gray-100 rounded-xl aspect-[3/4]"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) return null;
    if (products.length === 0) return null;

    return (
        <div className="w-11/12 md:w-10/12 mx-auto py-8 md:py-5">
            <div className="flex items-center justify-between mb-6 md:mb-8 border-b pb-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h2>
                <a href="/product" className="text-[#31714f] font-semibold text-sm hover:underline">
                    View All
                </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
                {products.slice(0, 10).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductSection;
