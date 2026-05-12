import { Link } from "react-router";
import { useMemo, useEffect } from "react";
import { Heart, ShoppingCart, Trash2, Plus } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const parsePrice = (value) => {
  if (value == null || value === "") return null;
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  const clean = String(value).replace(/,/g, "").match(/[0-9.]+/);
  return clean ? Number(clean[0]) : null;
};

const getCurrencySymbol = (priceStr) => {
  return String(priceStr ?? "")
    .replace(/[0-9.,\s]/g, "")
    .trim();
};

const formatMoney = (amount, symbol) => {
  if (amount == null || Number.isNaN(amount)) return "—";
  const formatted =
    amount % 1 === 0
      ? amount.toLocaleString("en-US")
      : amount.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
  const sym = symbol || "৳";
  return `${sym} ${formatted}`;
};

const groupLabel = (item) =>
  (item.brandName && String(item.brandName).trim()) ||
  (item.categoryName && String(item.categoryName).trim()) ||
  "Saved items";

const WishList = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { handleCart } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const currencySymbol = getCurrencySymbol(wishlistItems[0]?.price || "");

  const grouped = useMemo(() => {
    const map = new Map();
    for (const item of wishlistItems) {
      const key = groupLabel(item);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(item);
    }
    return [...map.entries()];
  }, [wishlistItems]);

  return (
    <section className="bg-zinc-50 min-h-[70vh] py-10 md:py-14">
      <div className="w-11/12 md:w-10/12 mx-auto">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              Saved items
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
              Your wishlist
            </h1>
            <p className="text-zinc-500 mt-1 text-sm md:text-base max-w-xl">
              Review saved products by store, then add to cart when you are
              ready.
            </p>
          </div>
          {wishlistItems.length > 0 && (
            <button
              type="button"
              onClick={clearWishlist}
              className="px-4 py-2.5 rounded-xl border border-zinc-300 text-zinc-700 hover:bg-zinc-100 transition text-sm font-semibold cursor-pointer"
            >
              Clear all
            </button>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white border border-zinc-200 rounded-2xl px-6 py-16 md:py-20 text-center shadow-sm">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Heart
                className="text-primary w-8 h-8"
                strokeWidth={1.75}
                aria-hidden
              />
            </div>
            <h2 className="text-2xl font-semibold text-primary">
              No saved items yet
            </h2>
            <p className="text-zinc-500 mt-2 mb-8 max-w-md mx-auto">
              Tap the heart on any product card to save it here.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 transition text-white text-sm font-semibold shadow-sm"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {grouped.map(([sectionTitle, items]) => (
              <div
                key={sectionTitle}
                className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="px-4 md:px-6 py-3 md:py-4 border-b border-zinc-200">
                  <h2 className="text-sm md:text-base font-bold text-zinc-900 tracking-wide uppercase">
                    {sectionTitle}
                  </h2>
                </div>
                <ul className="divide-y divide-zinc-100">
                  {items.map((item) => {
                    const imageSrc =
                      item.image ||
                      item.img ||
                      "/Img/logo/logo.png";

                    const orig =
                      parsePrice(item.originalPrice) ??
                      parsePrice(item.old_price);
                    let current =
                      parsePrice(item.discountPrice) ??
                      parsePrice(item.discount_price) ??
                      parsePrice(item.price);
                    if (current == null || Number.isNaN(current)) current = 0;

                    const hasDeal = orig != null && orig > current;
                    let pct = item.discountPercent;
                    if (hasDeal && (pct == null || pct <= 0)) {
                      pct = Math.round(((orig - current) / orig) * 100);
                    }
                    const rating =
                      typeof item.rating === "number"
                        ? item.rating
                        : parseFloat(item.rating) || 0;
                    const ratingLabel =
                      rating > 0 ? rating.toFixed(1) : null;

                    const attrLine =
                      item.attributesText?.trim() ||
                      [
                        item.categoryName &&
                          `Category: ${item.categoryName}`,
                        item.brandName && `Brand: ${item.brandName}`,
                      ]
                        .filter(Boolean)
                        .join(", ");

                    const sym = currencySymbol || "৳";

                    return (
                      <li
                        key={item.id}
                        className="flex flex-col md:flex-row md:items-stretch gap-4 p-4 md:p-5 hover:bg-zinc-50/80 transition-colors"
                      >
                        <Link
                          to={`/product/${item.slug}`}
                          className="shrink-0 mx-auto md:mx-0"
                        >
                          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-lg border border-zinc-200 bg-zinc-50 overflow-hidden">
                            <img
                              src={imageSrc}
                              alt=""
                              className="w-full h-full object-cover transition-all duration-300 delay-75 hover:scale-105"
                              onError={(e) => {
                                e.currentTarget.src = "/Img/logo/logo.png";
                              }}
                            />
                          </div>
                        </Link>

                        <div className="flex-1 min-w-0 flex flex-col gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            {ratingLabel && (
                              <span className="inline-flex items-center rounded-md bg-primary px-2 py-0.5 text-xs font-bold text-white">
                                {ratingLabel}
                              </span>
                            )}
                          </div>
                          <Link
                            to={`/product/${item.slug}`}
                            className="font-semibold text-zinc-900 text-sm md:text-base leading-snug hover:text-primary transition-colors line-clamp-2"
                          >
                            {item.name}
                          </Link>
                          {attrLine && (
                            <p className="text-xs md:text-sm text-zinc-500 leading-relaxed line-clamp-2">
                              {attrLine}
                            </p>
                          )}
                          <button
                            type="button"
                            onClick={() => removeFromWishlist(item.id)}
                            className="self-start mt-1 p-1.5 text-zinc-400 hover:text-zinc-700 transition cursor-pointer rounded-lg hover:bg-zinc-200/60"
                            aria-label={`Remove ${item.name} from wishlist`}
                          >
                            <Trash2 size={20} strokeWidth={1.5} />
                          </button>
                        </div>

                        <div className="flex flex-row md:flex-col items-end md:items-end justify-between md:justify-center gap-3 md:min-w-[140px] shrink-0 border-t md:border-t-0 border-zinc-100 pt-3 md:pt-0">
                          <div className="text-left md:text-right">
                            <p className="text-lg md:text-xl font-bold text-primary">
                              {formatMoney(current, sym)}
                            </p>
                            {hasDeal && (
                              <>
                                <p className="text-sm text-zinc-400 mt-0.5">
                                  <span className="line-through">
                                    {formatMoney(orig, sym)}
                                  </span>
                                  <span className="text-zinc-800 ml-2 font-medium">
                                    -{pct}%
                                  </span>
                                </p>
                                <p className="text-xs font-semibold text-emerald-600 mt-1">
                                  Price dropped
                                </p>
                              </>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              handleCart({
                                id: item.id,
                                name: item.name,
                                price: item.price ?? `৳${current}`,
                                img: imageSrc,
                                slug: item.slug,
                              })
                            }
                            className="relative flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-lg bg-primary text-white shadow-sm hover:bg-primary/90 transition cursor-pointer"
                            aria-label={`Add ${item.name} to cart`}
                          >
                            <ShoppingCart
                              className="w-6 h-6"
                              strokeWidth={2}
                              aria-hidden
                            />
                            <span className="absolute -right-0.5 -bottom-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-primary shadow">
                              <Plus className="w-3 h-3" strokeWidth={3} />
                            </span>
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        )}

        {wishlistItems.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-dashed border-zinc-300 bg-white/80 px-5 py-4">
            <p className="text-sm text-zinc-600">
              <span className="font-semibold text-zinc-800">
                {wishlistItems.length}
              </span>{" "}
              {wishlistItems.length === 1 ? "item" : "items"} saved
            </p>
            <Link
              to="/products"
              className="text-sm font-semibold text-primary hover:text-primary/80 underline-offset-4 hover:underline"
            >
              Continue shopping
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default WishList;
