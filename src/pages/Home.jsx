import React, { Suspense, useMemo } from 'react';
import Hero from '../components/HeroSection/Hero';
import CategoriesData from '../components/CategoriesData/CategoriesData';
import Brands from '../components/Brands/Brands';
import Customer from '../components/CustomerReview/Customer';
import ProductSection from '../components/products/ProductSection';
import apiClient from '../api/apiClient';

import ErrorBoundary from '../components/common/ErrorBoundary';

const Home = () => {
    const promise = useMemo(() => apiClient.fetchCategories(), []);

    return (
        <div>
            <Hero />

            <ErrorBoundary>
                <Suspense fallback={<div className="text-center py-10">Loading categories...</div>}>
                    <CategoriesData promise={promise} />
                </Suspense>
            </ErrorBoundary>

            {/* Featured Products */}
            <ProductSection title="Featured Products" params={{ is_featured: true }} />

            {/* Top Selling Products */}
            <ProductSection title="Top Selling Products" params={{ ordering: '-sales' }} />

            <Brands />

            {/* All Products */}
            <ProductSection title="All Products" params={{ page_size: 10 }} />

            <Customer />
        </div>
    );
};

export default Home;
