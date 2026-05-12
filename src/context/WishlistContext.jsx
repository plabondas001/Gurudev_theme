import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";
import { toast } from "react-toastify";

const STORAGE_KEY = "gurudev_wishlist";

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

const normalizeItem = (item) => ({
  id: item.id,
  slug: item.slug,
  name: item.name,
  price: item.price,
  image: item.image ?? item.img ?? item.image_url,
  rating: item.rating ?? 0,
  brandName: item.brand?.name ?? item.brandName ?? "",
  categoryName: item.category?.name ?? item.categoryName ?? "",
  brand: item.brand,
  category: item.category,
  originalPrice:
    item.originalPrice ?? item.old_price ?? item.regular_price ?? null,
  discountPrice: item.discountPrice ?? item.discount_price ?? null,
  discountPercent: item.discountPercent ?? item.discount ?? null,
  attributesText: item.attributesText ?? "",
});

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const wishlistItemsRef = useRef([]);
  wishlistItemsRef.current = wishlistItems;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setWishlistItems(parsed);
      }
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch {
      /* quota / private mode */
    }
  }, [wishlistItems]);

  const isInWishlist = useCallback(
    (productId) =>
      wishlistItems.some((i) => String(i.id) === String(productId)),
    [wishlistItems],
  );

  const addToWishlist = useCallback((item) => {
    const normalized = normalizeItem(item);
    if (
      wishlistItemsRef.current.some(
        (i) => String(i.id) === String(normalized.id),
      )
    ) {
      return;
    }
    setWishlistItems((prev) => [...prev, normalized]);
    toast.success("Saved to wishlist");
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setWishlistItems((prev) =>
      prev.filter((i) => String(i.id) !== String(productId)),
    );
    toast.info("Removed from wishlist");
  }, []);

  const toggleWishlist = useCallback(
    (item) => {
      const id = item.id;
      if (isInWishlist(id)) {
        removeFromWishlist(id);
      } else {
        addToWishlist(item);
      }
    },
    [addToWishlist, removeFromWishlist, isInWishlist],
  );

  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
    toast.info("Wishlist cleared");
  }, []);

  const value = useMemo(
    () => ({
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      clearWishlist,
      isInWishlist,
    }),
    [
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      clearWishlist,
      isInWishlist,
    ],
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
