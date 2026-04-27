import React from 'react';
import { useCart } from '../../context/CartContext';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
    const { handleCart } = useCart();

    const price = product.price || product.sale_price || 0;
    const oldPrice = product.old_price || product.regular_price;
    const image = product.img || product.image || (product.images && product.images[0]?.image) || '/Img/logo/logo.png';

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden flex flex-col h-full group">
            <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img 
                    src={image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.discount && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-full">
                        -{product.discount}%
                    </div>
                )}
            </div>
            
            <div className="p-3 md:p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-2 group-hover:text-[#31714f] transition-colors">
                    {product.name}
                </h3>
                
                <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[#31714f] font-bold text-sm md:text-lg">
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
                        className="w-full bg-[#31714f] text-white py-2 rounded-lg flex items-center justify-center gap-2 text-xs md:text-sm font-medium hover:bg-[#255c40] transition-colors"
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
