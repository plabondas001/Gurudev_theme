import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import {
  apiAddCartItem,
  apiClearCart,
  apiDeleteCartItem,
  apiGetCart,
  apiUpdateCartItem,
} from "../api/authApi";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

// ---------------------------------------------------------------------------
// Normalize a CartItem from the API into the shape the frontend expects:
// { id (cartItemId), product_id, variant_id, name, price, image, quantity, cartItemId }
// ---------------------------------------------------------------------------
function normalizeApiItem(apiItem) {
  const product = apiItem.product || {};
  const variant = apiItem.variant || null;

  const price =
    variant?.discount_price ||
    variant?.price ||
    product?.price ||
    0;

  // Build readable variant label (e.g. "4GB/64GB • Red")
  let variantName = apiItem.variant_name || "";
  if (variant && !variantName) {
    const parts = [];
    if (variant.ram && variant.storage) parts.push(`${variant.ram}GB/${variant.storage}GB`);
    else if (variant.ram) parts.push(`${variant.ram}GB RAM`);
    else if (variant.storage) parts.push(`${variant.storage}GB Storage`);
    if (variant.color) parts.push(variant.color);
    variantName = parts.join(" • ");
  }

  return {
    id: product.id || apiItem.product_id,       // product id (for cart dedup logic)
    cartItemId: apiItem.id,                      // cart item id (for API calls)
    variant_id: variant?.id || apiItem.variant_id || null,
    variant_name: variantName,
    variant,
    name: product.name || "",
    slug: product.slug || "",
    price,
    image: product.image || null,
    quantity: apiItem.quantity || 1,
  };
}

export const CartProvider = ({ children }) => {
  const { isAuthenticated, getAccessToken, ready } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [syncing, setSyncing] = useState(false);

  // Sync guest cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // -----------------------------------------------------------------------
  // Load cart from API when user logs in
  // -----------------------------------------------------------------------
  useEffect(() => {
    // Wait until the silent-refresh boot is complete before acting on auth state.
    // Without this guard, the effect fires with isAuthenticated=false during the
    // refresh cycle (page reload), making the app appear logged out.
    if (!ready) return;

    if (!isAuthenticated) {
      // Keep local cart as-is when logged out (guest cart)
      return;
    }
    const token = getAccessToken();
    if (!token) return;

    setSyncing(true);
    apiGetCart(token)
      .then(({ ok, data }) => {
        if (ok && data?.items) {
          setCartItems(data.items.map(normalizeApiItem));
        }
      })
      .catch(() => {})
      .finally(() => setSyncing(false));
  }, [ready, isAuthenticated, getAccessToken]);

  // -----------------------------------------------------------------------
  // Add to cart
  // -----------------------------------------------------------------------
  const handleCart = useCallback(async (item) => {
    const token = getAccessToken();

    if (token) {
      // Authenticated: use API
      const { ok, data } = await apiAddCartItem(token, {
        product_id: item.id,
        variant_id: item.variant_id || null,
        quantity: 1,
      });
      if (ok) {
        setCartItems((prev) => {
          // Check if same product+variant already in local state
          const idx = prev.findIndex(
            (i) => i.id === item.id && i.variant_id === (item.variant_id || null)
          );
          if (idx !== -1) {
            const updated = [...prev];
            updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 };
            return updated;
          }
          // New item
          return [...prev, normalizeApiItem(data)];
        });
        toast.success("Added to Cart");
      } else {
        toast.error("Failed to add to cart.");
      }
    } else {
      // Guest: in-memory only
      setCartItems((prev) => {
        const idx = prev.findIndex(
          (i) => i.id === item.id && i.variant_id === (item.variant_id || null)
        );
        if (idx !== -1) {
          const updated = [...prev];
          updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 };
          return updated;
        }
        return [...prev, { ...item, quantity: 1, cartItemId: null }];
      });
      toast.success("Added to Cart");
    }
  }, [getAccessToken]);

  // -----------------------------------------------------------------------
  // Update quantity
  // -----------------------------------------------------------------------
  const updateQuantity = useCallback(async (id, amount) => {
    const token = getAccessToken();
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const newQty = Math.max(1, (item.quantity || 1) + amount);

        if (token && item.cartItemId) {
          apiUpdateCartItem(token, item.cartItemId, newQty).catch(() => {});
        }
        return { ...item, quantity: newQty };
      })
    );
  }, [getAccessToken]);

  // -----------------------------------------------------------------------
  // Remove item
  // -----------------------------------------------------------------------
  const removeItem = useCallback(async (id) => {
    const token = getAccessToken();
    const item = cartItems.find((i) => i.id === id);

    if (token && item?.cartItemId) {
      apiDeleteCartItem(token, item.cartItemId).catch(() => {});
    }
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    toast.info("Removed from Cart");
  }, [getAccessToken, cartItems]);

  // -----------------------------------------------------------------------
  // Clear cart
  // -----------------------------------------------------------------------
  const clearCart = useCallback(async () => {
    const token = getAccessToken();
    if (token) {
      apiClearCart(token).catch(() => {});
    }
    setCartItems([]);
    toast.info("Cart Cleared");
  }, [getAccessToken]);

  const clearCartSilent = useCallback(async () => {
    const token = getAccessToken();
    if (token) {
      apiClearCart(token).catch(() => {});
    }
    setCartItems([]);
  }, [getAccessToken]);

  // -----------------------------------------------------------------------
  // Context value
  // -----------------------------------------------------------------------
  const value = useMemo(
    () => ({
      cartItems,
      syncing,
      handleCart,
      updateQuantity,
      removeItem,
      clearCart,
      clearCartSilent,
    }),
    [cartItems, syncing, handleCart, updateQuantity, removeItem, clearCart, clearCartSilent]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
