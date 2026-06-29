const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const inFlightRequests = new Map();
const responseCache = new Map();

const getCacheKey = (endpoint, params = {}, method = "GET") => {
    const sortedParams = Object.keys(params)
        .sort()
        .filter((key) => params[key] !== undefined && params[key] !== null)
        .map((key) => [key, params[key]]);
    const queryString = new URLSearchParams(sortedParams).toString();
    return `${method.toUpperCase()} ${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ""}`;
};

/**
 * Generic request helper
 */
const request = async (endpoint, params = {}) => {
    try {
        const cacheKey = getCacheKey(endpoint, params, "GET");

        if (responseCache.has(cacheKey)) {
            return responseCache.get(cacheKey);
        }

        if (inFlightRequests.has(cacheKey)) {
            return inFlightRequests.get(cacheKey);
        }

        const queryString = new URLSearchParams(
            Object.entries(params).sort(),
        ).toString();
        const url = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ""}`;

        const responsePromise = fetch(url)
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                responseCache.set(cacheKey, data);
                return data;
            })
            .catch((error) => {
                throw error;
            })
            .finally(() => {
                inFlightRequests.delete(cacheKey);
            });

        inFlightRequests.set(cacheKey, responsePromise);
        return responsePromise;
    } catch (error) {
        console.error(`API Error (${endpoint}):`, error);
        throw error;
    }
};

/**
 * API Client
 * Centralized place for all backend calls
 */
export const apiClient = {
    // =========================
    // PRODUCTS
    // =========================
    fetchProducts: async (params = {}) => {
        return request("/products/", {
            page: 1,
            page_size: 20, // default for infinite scroll
            ...params,
        });
    },

    fetchProductById: async (id) => {
        return request(`/products/${id}/`);
    },

    fetchProductBySlug: async (slug) => {
        return request(`/products/${slug}/`);
    },

    // =========================
    // CATEGORIES
    // =========================
    fetchCategories: async () => {
        const data = await request("/categories/");

        // Normalize data for frontend use
        return data.results.map((category) => ({
            id: category.id,
            name: category.name,
            slug: category.slug,
            img: category.logo,
            logo: category.logo,
            parent: category.parent,
            children: category.children,
            breadcrumbs: category.breadcrumbs,
        }));
    },

    // =========================
    // BRANDS
    // =========================
    fetchBrands: async (params = {}) => {
        const data = await request("/brands/", params);
        return Array.isArray(data) ? data : data.results || [];
    },

    // =========================
    // GENERIC ENDPOINT ACCESS
    // =========================
    fetch: request,
};

export default apiClient;
