import React, { Suspense, useEffect, useMemo, useState } from 'react';
import Hero from '../components/hero/Hero';
import CategoriesData from '../components/categories/CategoriesData';
import Brands from '../components/brands/Brands';
import Reviews from '../components/reviews/Reviews';
import ProductSection from '../components/products/ProductSection';
import apiClient from '../api/apiClient';
import Products from './Products';

import ErrorBoundary from '../components/common/ErrorBoundary';

const Home = () => {
    const [homeProducts, setHomeProducts] = useState(null);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [productError, setProductError] = useState(null);

    const promise = useMemo(() => apiClient.fetchCategories(), []);

    useEffect(() => {
        let isMounted = true;

        const loadHomeProducts = async () => {
            try {
                setLoadingProducts(true);
                const data = await apiClient.fetchProducts({ page: 1, page_size: 60 });
                if (isMounted) {
                    setHomeProducts(data.results || []);
                }
            } catch (error) {
                if (isMounted) {
                    setProductError(error?.message || 'Unable to load products.');
                }
            } finally {
                if (isMounted) {
                    setLoadingProducts(false);
                }
            }
        };

        loadHomeProducts();

        return () => {
            isMounted = false;
        };
    }, []);

    const featuredProducts = useMemo(() => {
        if (!homeProducts) return [];
        return homeProducts.filter((product) => product?.is_featured);
    }, [homeProducts]);

    const topSellingProducts = useMemo(() => {
        if (!homeProducts) return [];
        return [...homeProducts]
            .sort((a, b) => (Number(b?.sales || 0) - Number(a?.sales || 0)))
            .slice(0, 20);
    }, [homeProducts]);

    const newArrivalProducts = useMemo(() => {
        if (!homeProducts) return [];
        return homeProducts.slice(0, 30);
    }, [homeProducts]);

    if (productError) {
        return (
            <div className="text-center py-10 text-red-600">
                {productError}
            </div>
        );
    }

    return (
        <div>
            <Hero />

            <ErrorBoundary>
                <Suspense fallback={<div className="text-center py-10">Loading categories...</div>}>
                    <CategoriesData promise={promise} />
                </Suspense>
            </ErrorBoundary>

            {loadingProducts ? (
                <div className="space-y-10 px-4 md:px-8 py-10">
                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <div className="h-8 w-40 rounded-full bg-gray-200 mb-6" />
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className="h-48 rounded-2xl bg-gray-100 animate-pulse" />
                            ))}
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <div className="h-8 w-44 rounded-full bg-gray-200 mb-6" />
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className="h-48 rounded-2xl bg-gray-100 animate-pulse" />
                            ))}
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <div className="h-8 w-52 rounded-full bg-gray-200 mb-6" />
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className="h-48 rounded-2xl bg-gray-100 animate-pulse" />
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {/* Featured Products */}
                    <ProductSection
                        title="Featured Products"
                        params={{ is_featured: true }}
                        initialProducts={featuredProducts}
                    />

                    {/* Top Selling Products */}
                    <ProductSection
                        title="Top Selling Products"
                        params={{ ordering: '-sales' }}
                        initialProducts={topSellingProducts}
                    />

                    <Brands />

                    {/* New Arrivals */}
                    <Products isHomePage={true} initialProducts={newArrivalProducts} />
                </>
            )}

            <Reviews />
        </div>
    );
};

export default Home;
