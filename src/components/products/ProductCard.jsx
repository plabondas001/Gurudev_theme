import React from "react";
import { useCart } from "../../context/CartContext";
import { ShoppingCart } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";

const ProductCard = ({ product }) => {
  const { handleCart } = useCart();

  const price = product.price || product.sale_price || 0;
  const oldPrice = product.old_price || product.regular_price;
  const image =
    product.img ||
    product.image ||
    (product.images && product.images[0]?.image) ||
    "/Img/logo/logo.png";

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden flex flex-col h-full group">
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
              <FaHeart className="text-secondary" size={25} />
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
        <h3 className="font-semibold text-sm lg:text-xl line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <h3 className="bg-primary text-white px-2 py-1 text-xs rounded-md">
            Brand :{" "}
          </h3>
          <p className="font-semibold text-xs">{product.brand?.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <h3 className="bg-secondary text-white px-2  py-1 text-xs rounded-md">
            Category:{" "}
          </h3>
          <p className="font-semibold text-xs">{product.category?.name}</p>
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
            onClick={() => handleCart(product)}
            className="w-full bg-primary text-white py-2 rounded-lg flex items-center justify-center gap-2 text-xs md:text-sm font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 delay-75 cursor-pointer"
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
