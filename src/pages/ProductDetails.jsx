import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  FaStar,
  FaHeart,
  FaShareAlt,
  FaMinus,
  FaPlus,
  FaCheckCircle,
} from "react-icons/fa";
import { ShoppingCart, ArrowLeft, Zap } from "lucide-react";
import { useCart } from "../context/CartContext";
import { apiClient } from "../api/apiClient";
import Infographics from "../components/products/detail/Infographics";
import Color from "../components/products/detail/Color";
import Variant from "../components/products/detail/Variant";
import Description from "../components/products/detail/Description";
import Specification from "../components/products/detail/Specification";
import Reviews from "../components/products/detail/Reviews";
import UserReview from "../components/products/detail/UserReview";
import Faq from "../components/products/detail/Faq";
import SelectOption from "../components/products/detail/SelectOption";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { handleCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await apiClient.fetchProductBySlug(slug);
        setProduct(data);
        setActiveImage(0);
        setIsAnimating(true);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details.");
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const galleryImages = product?.gallery_images?.map((img) => img.image) || [];
  const allImages = [product?.image, ...galleryImages].filter(Boolean);
  const loopImages =
    allImages.length > 1 ? [...allImages, allImages[0]] : allImages;

  useEffect(() => {
    if (allImages.length <= 1) return;

    const interval = setInterval(() => {
      setActiveImage((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [allImages.length]);

  useEffect(() => {
    if (allImages.length <= 1) return;
    if (activeImage < allImages.length) return;

    const timeout = setTimeout(() => {
      setIsAnimating(false);
      setActiveImage(0);
    }, 700);

    return () => clearTimeout(timeout);
  }, [activeImage, allImages.length]);

  useEffect(() => {
    if (isAnimating) return;

    const frame = requestAnimationFrame(() => {
      setIsAnimating(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [isAnimating]);

  const handlePrevImage = () => {
    if (allImages.length <= 1) return;

    setIsAnimating(true);

    if (activeImage === 0) {
      setIsAnimating(false);
      setActiveImage(allImages.length);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
          setActiveImage(allImages.length - 1);
        });
      });
      return;
    }

    setActiveImage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextImage = () => {
    if (allImages.length <= 1) return;
    setIsAnimating(true);
    setActiveImage((prev) => Math.min(prev + 1, allImages.length));
  };

  const handleQuantityChange = (type) => {
    if (type === "minus" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === "plus") {
      setQuantity(quantity + 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {error || "Product not found"}
        </h2>
        <button
          onClick={() => navigate("/products")}
          className="bg-primary text-white px-6 py-2 rounded-lg font-bold"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const price = product.price || 0;
  const discountPrice = product.discount_price;
  const hasDiscount = discountPrice && discountPrice < price;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-6 group cursor-pointer"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-medium">Back to Products</span>
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="lg:w-1/2 p-6 md:p-10 bg-gray-50/50">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-inner bg-white mb-6">
                <div
                  className={`flex h-full ${isAnimating ? "transition-transform duration-700 ease-in-out" : ""}`}
                  style={{ transform: `translateX(-${activeImage * 100}%)` }}
                >
                  {loopImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={product.name}
                      className="w-full h-full shrink-0 object-contain p-4 cursor-zoom-in"
                    />
                  ))}
                </div>
                {hasDiscount && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white font-bold px-3 py-1 rounded-full text-sm shadow-lg">
                    -{Math.round(((price - discountPrice) / price) * 100)}% OFF
                  </div>
                )}

                {/* Image Navigation Arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-primary p-2 rounded-full shadow-md text-white transition-all cursor-pointer"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary p-2 rounded-full shadow-md text-white transition-all rotate-180 cursor-pointer"
                    >
                      <ArrowLeft size={20} />
                    </button>
                  </>
                )}
              </div>

              <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-4 overflow-visible sm:overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-2 p-2 sm:p-5">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAnimating(true);
                      setActiveImage(index);
                    }}
                    className={`relative w-16 h-16 sm:w-24 sm:h-24 shrink-0 snap-start rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${activeImage % allImages.length === index ? "border-primary shadow-md scale-105" : "border-transparent hover:border-gray-300"}`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:w-1/2 p-6 md:p-10 flex flex-col">
              {/* Breadcrumbs / Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                {product.brand && (
                  <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20">
                    {product.brand.logo && (
                      <img
                        src={product.brand.logo}
                        alt={product.brand.name}
                        className="w-5 h-5 object-contain rounded-full bg-white p-0.5"
                      />
                    )}
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {product.brand.name}
                    </span>
                  </div>
                )}
                {product.category && (
                  <div className="flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1.5 rounded-full border border-secondary/20">
                    {product.category.logo && (
                      <img
                        src={product.category.logo}
                        alt={product.category.name}
                        className="w-5 h-5 object-contain rounded-full bg-white p-0.5"
                      />
                    )}
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {product.category.name}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-4 py-1.5 rounded-full text-xs font-bold border border-green-100">
                  <FaCheckCircle size={14} />
                  {product.stock_quantity > 0
                    ? `In Stock (${product.stock_quantity})`
                    : "Out of Stock"}
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Ratings */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-1 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      size={18}
                      className={
                        i < Math.floor(product.rating || 0)
                          ? "text-primary"
                          : "text-gray-300"
                      }
                    />
                  ))}
                  <span className="ml-1 font-bold text-gray-900">
                    {product.rating || 0}
                  </span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <span className="text-gray-500 font-medium">
                  {product.reviews_count || 0} Reviews
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="flex flex-col">
                  {hasDiscount && (
                    <span className="text-gray-400 text-sm font-medium line-through">
                      ৳{price}
                    </span>
                  )}
                  <span className="text-3xl font-black text-primary">
                    ৳{hasDiscount ? discountPrice : price}
                  </span>
                </div>
                {hasDiscount && (
                  <div className="ml-auto">
                    <span className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/20">
                      Save ৳{price - discountPrice}
                    </span>
                  </div>
                )}
              </div>

              {product.short_description && (
                <div
                  className="text-gray-600 leading-relaxed mb-8 text-lg"
                  dangerouslySetInnerHTML={{
                    __html: product.short_description,
                  }}
                />
              )}

              {/* Infographics */}

              {product.category?.slug === "smart-phones" && <Infographics />}

              {/* Color */}
              {product.category?.slug === "smart-phones" && <Color />}

              {/* Variants */}
              {product.category?.slug === "smart-phones" && <Variant />}

              {/* Actions */}
              <div className="mt-auto space-y-6">
                <div className="flex flex-col mt-5 sm:flex-row sm:items-center space-y-3 gap-2">
                  <div className="flex w-full items-center gap-3 sm:contents">
                    {/* Quantity Selector */}
                    <div className="order-1 flex items-center bg-gray-100 p-1.5 rounded-xl border border-gray-200">
                      <button
                        onClick={() => handleQuantityChange("minus")}
                        className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm hover:text-primary transition-colors cursor-pointer"
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="w-12 text-center font-bold text-gray-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange("plus")}
                        className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm hover:text-primary transition-colors cursor-pointer"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>

                    {/* Favorite Button */}
                    <button className="order-4 w-14 h-14 flex items-center justify-center border-2 border-gray-200 rounded-2xl text-gray-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all cursor-pointer">
                      <FaHeart size={24} />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleCart({ ...product, quantity })}
                    className="order-2 w-full sm:w-auto bg-gray-100 text-gray-800 h-14 px-8 rounded-2xl flex items-center justify-center gap-3 font-bold text-lg hover:bg-primary hover:text-white transition-all duration-300 delay-100 hover:scale-103 active:scale-95 cursor-pointer group"
                  >
                    <ShoppingCart className="group-hover:translate-x-1 transition-transform" />
                    Add to Cart
                  </button>

                  {/* Buy Now Button */}
                  <button
                    onClick={() => {
                      handleCart({ ...product, quantity });
                      navigate("/cart"); // Assuming there is a cart page
                    }}
                    className="order-3 grow w-full sm:w-auto bg-primary text-white h-14 rounded-2xl flex items-center justify-center gap-3 font-bold text-lg hover:bg-primary/90 transition-all active:scale-95 shadow-xl shadow-primary/20 cursor-pointer group"
                  >
                    <Zap className="fill-white group-hover:scale-110 transition-transform" />
                    Buy Now
                  </button>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-6 pt-4 border-t border-gray-100">
                  <button className="flex items-center gap-2 text-gray-500 hover:text-primary font-medium transition-colors cursor-pointer">
                    <FaShareAlt size={16} />
                    Share
                  </button>
                  <div className="w-px h-4 bg-gray-200"></div>
                  <p className="text-gray-400 text-sm">
                    Free shipping across Bangladesh on orders over ৳5000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Option */}
        <SelectOption></SelectOption>

        {/* Specification section */}
        <Specification product={product}></Specification>

        {/* Full Description Section */}
        <Description product={product}></Description>

        {/* Reviews */}
        <Reviews product={product}></Reviews>

        {/* Write Review */}
        <UserReview></UserReview>

        {/* FAQ */}
        <Faq product={product}></Faq>
      </div>
    </div>
  );
};

export default ProductDetails;
