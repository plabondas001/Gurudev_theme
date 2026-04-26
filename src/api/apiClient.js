const BASE_URL = "https://sarker.shop/api";

/**
 * Generic API client for fetching data from the Sarker.shop API
 * Supports categories, products, brands, and other endpoints
 */

export const apiClient = {
  /**
   * Fetch categories from the API
   * @returns {Promise<Array>} Array of category objects with id, name, slug, logo, etc.
   */
  fetchCategories: async () => {
    try {
      const response = await fetch(`${BASE_URL}/categories/`);
      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }
      const data = await response.json();
      // Map API response to a format compatible with the component
      return data.results.map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        img: category.logo, // Map 'logo' to 'img' for consistency
        logo: category.logo,
        parent: category.parent,
        children: category.children,
        breadcrumbs: category.breadcrumbs,
      }));
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  /**
   * Fetch products from the API
   * @param {Object} params - Query parameters (page, search, category, etc.)
   * @returns {Promise<Object>} Products data with count, next, previous, results
   */
  fetchProducts: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${BASE_URL}/products/${queryString ? `?${queryString}` : ""}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  /**
   * Fetch brands from the API
   * @param {Object} params - Query parameters
   * @returns {Promise<Array|Object>} Brands data
   */
  fetchBrands: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${BASE_URL}/brands/${queryString ? `?${queryString}` : ""}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch brands: ${response.statusText}`);
      }
      const data = await response.json();
      return Array.isArray(data) ? data : data.results || data;
    } catch (error) {
      console.error("Error fetching brands:", error);
      throw error;
    }
  },

  /**
   * Generic method to fetch from any API endpoint
   * @param {string} endpoint - API endpoint path (without base URL)
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} Response data
   */
  fetch: async (endpoint, params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ""}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  },
};

export default apiClient;
