import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { FaHeart, FaStar } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const parsePrice = (value) => {
  if (value == null || value === "") return null;
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  const clean = String(value)
    .replace(/,/g, "")
    .match(/[0-9.]+/);
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

/** Card layout aligned with ProductCard; heart removes via toggleWishlist. */
const WishlistItemCard = ({ item, currencySymbol }) => {
  const navigate = useNavigate();
  const { handleCart } = useCart();
  const { toggleWishlist } = useWishlist();

  const imageSrc = item.image || item.img || "/Img/logo/logo.png";

  const orig = parsePrice(item.originalPrice) ?? parsePrice(item.old_price);
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
  const reviewCount = item.reviews_count ?? 0;
  const sym = currencySymbol || "৳";

  const wishlistPayload = {
    id: item.id,
    slug: item.slug,
    name: item.name,
    price: item.price ?? `৳${current}`,
    image: imageSrc,
    rating,
    brand: item.brand,
    category: item.category,
    brandName: item.brandName,
    categoryName: item.categoryName,
    originalPrice: item.originalPrice,
    discountPrice: item.discountPrice,
    discountPercent: item.discountPercent,
    attributesText: item.attributesText,
  };

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => navigate(`/product/${item.slug}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate(`/product/${item.slug}`);
        }
      }}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full group cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <div className="absolute w-full z-10">
          <div className="p-2 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <p className="bg-primary px-1.5 text-white text-[10px] sm:text-xs lg:px-2 py-1 rounded-md shrink-0">
                Top selling
              </p>
              <span
                className="bg-gray-200 rounded-full p-1 shrink-0"
                aria-hidden
              >
                <FiShoppingBag
                  size={18}
                  className="text-green-800 sm:w-5 sm:h-5"
                />
              </span>
            </div>
            <button
              type="button"
              className="rounded-full cursor-pointer p-1.5 transition-colors bg-primary/15 text-primary hover:bg-primary/25 shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(wishlistPayload);
              }}
              aria-pressed
              aria-label={`Remove ${item.name} from wishlist`}
            >
              <FaHeart className="fill-current" size={20} />
            </button>
          </div>
        </div>

        <img
          src={imageSrc}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = "/Img/logo/logo.png";
          }}
        />
        {(item.discountPercent || (hasDeal && pct)) && (
          <div className="absolute top-2 left-2 bg-primary text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-full">
            -{item.discountPercent || pct}%
          </div>
        )}
      </div>

      <div className="p-3 md:p-3 space-y-2 flex flex-col flex-grow mt-auto">
        <h3 className="font-semibold text-sm lg:text-base text-primary line-clamp-2 group-hover:text-primary/80 transition-colors">
          {item.name}
        </h3>

        <div className="flex items-center gap-1 flex-wrap">
          <div className="flex text-primary">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                size={12}
                className={
                  i < Math.floor(rating) ? "text-primary" : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-500">({reviewCount})</span>
        </div>

        <div className="flex flex-col gap-1.5">
          {item.brandName && (
            <div className="flex items-center gap-1.5 bg-primary/10 px-2 py-1 rounded-md border border-primary/20 w-fit max-w-full">
              {item.brand?.logo && (
                <img
                  src={item.brand.logo}
                  alt=""
                  className="w-3.5 h-3.5 object-contain rounded-full bg-white p-0.5 shrink-0"
                />
              )}
              <span className="text-gray-700 font-semibold text-[10px] truncate">
                {item.brandName}
              </span>
            </div>
          )}
          {item.categoryName && (
            <div className="flex items-center gap-1.5 bg-secondary/10 px-2 py-1 rounded-md border border-secondary/20 w-fit max-w-full">
              {item.category?.logo && (
                <img
                  src={item.category.logo}
                  alt=""
                  className="w-3.5 h-3.5 object-contain rounded-full bg-white p-0.5 shrink-0"
                />
              )}
              <span className="text-gray-700 font-semibold text-[10px] truncate">
                {item.categoryName}
              </span>
            </div>
          )}
        </div>

        <div className="mt-auto pt-1">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="text-primary font-bold text-sm md:text-lg">
              {formatMoney(current, sym)}
            </span>
            {hasDeal && (
              <span className="text-gray-400 line-through text-xs">
                {formatMoney(orig, sym)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleCart({
                id: item.id,
                name: item.name,
                price: item.price ?? `৳${current}`,
                img: imageSrc,
                slug: item.slug,
              });
            }}
            className="w-full bg-primary text-white py-2.5 rounded-lg flex items-center justify-center gap-2 text-xs md:text-sm font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-md cursor-pointer"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const WishList = () => {
  const { wishlistItems, clearWishlist } = useWishlist();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const currencySymbol = getCurrencySymbol(wishlistItems[0]?.price || "");

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
              Tap the heart on a card to remove it from your wishlist. Add to
              cart when you are ready.
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {wishlistItems.map((item) => (
              <WishlistItemCard
                key={item.id}
                item={item}
                currencySymbol={currencySymbol}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WishList;
