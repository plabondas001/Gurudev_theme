import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import { ArrowRight, Heart, ShoppingCart, Sparkles, Trash2 } from "lucide-react";
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
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full group cursor-pointer card-hover fade-in-up"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <div className="absolute w-full z-10">
          <div className="p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <p className="bg-primary px-2 text-white text-[10px] sm:text-xs py-1 rounded-full shrink-0 font-bold shadow-sm">
                Top selling
              </p>
              <span
                className="bg-white/90 rounded-full p-1.5 shrink-0 shadow-sm"
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
              className="rounded-full cursor-pointer p-2 transition-colors bg-white/90 text-primary hover:bg-primary hover:text-white shrink-0 shadow-sm"
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
          <div className="absolute bottom-2 left-2 bg-[#FBBC05] text-gray-950 text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            -{item.discountPercent || pct}%
          </div>
        )}
      </div>

      <div className="p-3 md:p-4 space-y-2.5 flex flex-col flex-grow mt-auto">
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
            className="w-full bg-primary text-white py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs md:text-sm font-semibold hover:bg-[#25573c] transition-all duration-300 hover:shadow-md cursor-pointer"
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
    <>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up { animation: fade-in-up .6s ease-out both; }
        .delay-1    { animation-delay: .1s; }
        .delay-2    { animation-delay: .2s; }

        .card-hover {
          transition: transform .2s ease, box-shadow .15s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,.06);
        }
      `}</style>

      <section className="bg-gray-50/30 min-h-screen">
        <div className="bg-gradient-to-br from-[#183f31] to-[#25573c] text-white py-14 md:py-20 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

          <div className="w-full px-4 md:px-8 max-w-6xl mx-auto relative z-10 fade-in-up">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#FBBC05] mb-4">
                  <Sparkles size={14} />
                  Saved Items
                </span>
                <h1 className="font-extrabold text-4xl md:text-6xl tracking-tight mb-5 leading-tight">
                  Your <span className="text-[#FBBC05]">Wishlist</span>
                </h1>
                <p className="font-medium text-lg md:text-xl text-gray-200/90 leading-relaxed">
                  Keep your favorite Gurudeb Enterprise products in one clean
                  place and move them to cart whenever you are ready.
                </p>
              </div>

              <div className="bg-white/10 border border-white/15 rounded-2xl p-5 min-w-[210px] backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-200">
                  Total Saved
                </p>
                <p className="text-4xl font-extrabold text-[#FBBC05] mt-2">
                  {wishlistItems.length}
                </p>
                <p className="text-sm text-gray-200 mt-1">
                  {wishlistItems.length === 1 ? "Product" : "Products"} waiting
                  for you
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-4 md:px-8 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 fade-in-up delay-1">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-2">
                  Curated By You
                </h2>
                <p className="text-2xl md:text-3xl font-extrabold text-gray-900">
                  Products you saved for later
                </p>
              </div>
              {wishlistItems.length > 0 && (
                <button
                  type="button"
                  onClick={clearWishlist}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 transition text-sm font-semibold cursor-pointer shadow-sm"
                >
                  <Trash2 size={16} />
                  Clear all
                </button>
              )}
            </div>

            {wishlistItems.length === 0 ? (
              <div className="bg-white border border-gray-100 rounded-3xl px-6 py-16 md:py-20 text-center shadow-xl shadow-gray-200/50 fade-in-up delay-2">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Heart
                    className="text-primary w-8 h-8"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                  No saved items yet
                </h2>
                <p className="text-gray-500 mt-3 mb-8 max-w-md mx-auto leading-relaxed">
                  Tap the heart on any product card to build your personal
                  shortlist.
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-[#25573c] transition text-white text-sm font-semibold shadow-sm"
                >
                  Browse products
                  <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5">
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
        </div>
      </section>
    </>
  );
};

export default WishList;
