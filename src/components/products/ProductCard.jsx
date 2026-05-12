import React from "react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { ShoppingCart } from "lucide-react";
import { FaHeart, FaStar } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router";

const ProductCard = ({ product }) => {
  const { handleCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const rating = product.rating || 0;
  const reviewCount = product.reviews_count || 0;

  const price = product.price || product.sale_price || 0;
  const oldPrice = product.old_price || product.regular_price;
  const onSale = oldPrice && Number(oldPrice) > Number(price);
  const discountPct =
    product.discount ||
    (onSale
      ? Math.round(
          ((Number(oldPrice) - Number(price)) / Number(oldPrice)) * 100,
        )
      : null);

  const image =
    product.img ||
    product.image ||
    (product.images && product.images[0]?.image) ||
    "/Img/logo/logo.png";

  const saved = isInWishlist(product.id);

  const wishlistPayload = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: `৳${price}`,
    image,
    rating: product.rating || 0,
    brand: product.brand,
    category: product.category,
    brandName: product.brand?.name,
    categoryName: product.category?.name,
    originalPrice: onSale ? oldPrice : null,
    discountPrice: onSale ? price : null,
    discountPercent: discountPct,
    attributesText: [
      product.brand?.name && `Brand: ${product.brand.name}`,
      product.category?.name && `Category: ${product.category.name}`,
    ]
      .filter(Boolean)
      .join(", "),
  };

  return (
    <div 
      onClick={() => navigate(`/product/${product.slug}`)}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full group cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <div className="absolute w-full z-10">
          <div className="p-2 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <p className="bg-primary px-1 text-white text-xs lg:px-2 py-1 rounded-md">
                Top selling
              </p>
              <button
                type="button"
                className="bg-gray-200 rounded-full p-1"
                onClick={(e) => e.stopPropagation()}
                aria-hidden
              >
                <FiShoppingBag
                  size={20}
                  className="text-green-800 cursor-pointer "
                />
              </button>
            </div>
            <button
              type="button"
              className={`rounded-full cursor-pointer p-1.5 transition-colors ${
                saved
                  ? "bg-primary/15 text-primary"
                  : "bg-gray-100 text-gray-400 hover:text-primary hover:bg-primary/10"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(wishlistPayload);
              }}
              aria-pressed={saved}
              aria-label={
                saved ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              <FaHeart className={saved ? "fill-current" : ""} size={22} />
            </button>
          </div>
        </div>

        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300 cursor-pointer"
        />
        {(product.discount || (onSale && discountPct)) && (
          <div className="absolute top-2 left-2 bg-primary text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-full">
            -{product.discount || discountPct}%
          </div>
        )}
      </div>

      <div className="p-3 md: space-y-2 flex flex-col flex-grow mt-auto">
        <h3 className="font-semibold text-sm lg:text-xl text-primary line-clamp-2 mb-1 group-hover:text-primary/80 transition-colors">
          {product.name}
        </h3>
        
        {/* Star Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-primary">
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i} 
                size={14} 
                className={i < Math.floor(rating) ? "text-primary" : "text-gray-300"} 
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-500">({reviewCount})</span>
        </div>

        <div className="flex flex-col gap-1.5 mb-3">
          {product.brand && (
            <div className="flex items-center gap-1.5 bg-primary/10 px-2 py-1 rounded-md border border-primary/20 w-fit">
              {product.brand.logo && (
                <img src={product.brand.logo} alt="" className="w-3.5 h-3.5 object-contain rounded-full bg-white p-0.5" />
              )}
              <span className="text-gray-700 font-semibold text-[10px]">{product.brand.name}</span>
            </div>
          )}
          {product.category && (
            <div className="flex items-center gap-1.5 bg-secondary/10 px-2 py-1 rounded-md border border-secondary/20 w-fit">
              {product.category.logo && (
                <img src={product.category.logo} alt="" className="w-3.5 h-3.5 object-contain rounded-full bg-white p-0.5" />
              )}
              <span className="text-gray-700 font-semibold text-[10px]">{product.category.name}</span>
            </div>
          )}
        </div>
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-primary font-bold text-sm md:text-lg">
              ৳{price}
            </span>
            {oldPrice && oldPrice > price && (
              <span className="text-gray-400 line-through text-xs md:text-sm">
                ৳{oldPrice}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCart(product);
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

export default ProductCard;
