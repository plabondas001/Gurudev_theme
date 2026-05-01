import React, { Suspense, useMemo } from 'react';
import Hero from '../components/hero/Hero';
import CategoriesData from '../components/categories/CategoriesData';
import Brands from '../components/brands/Brands';
import Reviews from '../components/reviews/Reviews';
import ProductSection from '../components/products/ProductSection';
import apiClient from '../api/apiClient';
import Products from './Products';

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
            <Products />

            <Reviews />
        </div>
    );
};

export default Home;
