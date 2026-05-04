import React from "react";
import { useCart } from "../../context/CartContext";
import { ShoppingCart } from "lucide-react";
import { FaHeart, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router";

const ProductCard = ({ product }) => {
  const { handleCart } = useCart();
  const navigate = useNavigate();

  const rating = product.rating || 0;
  const reviewCount = product.reviews_count || 0;

  const price = product.price || product.sale_price || 0;
  const oldPrice = product.old_price || product.regular_price;
  const image =
    product.img ||
    product.image ||
    (product.images && product.images[0]?.image) ||
    "/Img/logo/logo.png";

  return (
    <div 
      onClick={() => navigate(`/product/${product.slug}`)}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full group cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <div className="absolute w-full z-10">
          <div className="p-2 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <p className="bg-red-600 px-1 text-white text-xs lg:px-2 py-1  rounded-md">
                Top selling
              </p>
              <button className="bg-gray-200 rounded-full p-1">
                <FiShoppingBag
                  size={20}
                  className="text-green-800 cursor-pointer "
                />
              </button>
            </div>
            <button className="bg-gray-100 rounded-full cursor-pointer">
              <FaHeart className="text-primary" size={25} />
            </button>
          </div>
        </div>

        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300 cursor-pointer"
        />
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-full">
            -{product.discount}%
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
