# API Client Documentation

This directory contains the API client module for interacting with the Sarker.shop API.

## Installation & Usage

### Fetching Categories

```javascript
import apiClient from "@/api/apiClient";

// Fetch all categories
const categories = await apiClient.fetchCategories();
```

The response is automatically mapped to include both `img` (alias for logo) and the full category data.

### Fetching Products

```javascript
// Fetch products with optional filters
const products = await apiClient.fetchProducts({
  page: 1,
  category: "smart-phones",
  search: "iphone",
});
```

### Fetching Brands

```javascript
// Fetch brands
const brands = await apiClient.fetchBrands();
```

### Generic Fetch

For any other endpoint:

```javascript
// Fetch from any endpoint
const data = await apiClient.fetch("/endpoint-name/", {
  param1: "value1",
  param2: "value2",
});
```

## Base URL

- **API Base:** `https://sarker.shop/api`

## Available Methods

| Method | Endpoint | Returns |
|--------|----------|---------|
| `fetchCategories()` | `/categories/` | Array of categories |
| `fetchProducts(params)` | `/products/` | Paginated products |
| `fetchBrands(params)` | `/brands/` | Array of brands |
| `fetch(endpoint, params)` | Any endpoint | Raw API response |

## Error Handling

All methods include built-in error handling. Errors are logged to the console and thrown for component-level handling.

```javascript
try {
  const categories = await apiClient.fetchCategories();
} catch (error) {
  console.error("Failed to load categories:", error);
  // Handle error in UI
}
```

## Future Expansion

As more API endpoints become available, add new methods to `apiClient` following the existing patterns:

```javascript
fetchOrderHistory: async (params = {}) => {
  // Implementation
},
```
