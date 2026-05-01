const BASE_URL = "https://sarker.shop/api";

/**
 * Generic request helper
 */
const request = async (endpoint, params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return await response.json();
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
