import {
  Heart,
  List,
  MapPinned,
  ShoppingCart,
  UserRoundKey,
} from "lucide-react";
import { useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
const Header = ({
  cartItems = [],
  removeItem,
  clearCart,
  buyNow,
  updateQuantity,
}) => {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <div className="w-11/12 md:w-10/12 mx-auto">
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between mt-6 md:mt-8 gap-4">
        <div>
          <a href="/">
            <img
              className="w-20 md:w-28 lg:w-45"
              src="/Img/logo/logo.png"
              alt="logo"
            />
          </a>
        </div>
        <div className="flex-1">
          <input
            className="w-full h-11 md:h-12 bg-gray-200 text-black px-3 font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-[#31714f]"
            type="search"
            placeholder="Search in..."
          />
        </div>
        <div className="flex items-center text-black gap-4 lg:gap-9 cursor-pointer flex-wrap justify-end">
          <div className="flex flex-col items-center text-xs lg:text-sm hover:text-[#31714f] transition">
            <MapPinned size={20} />
            <p className="hidden lg:block">Track Order</p>
          </div>
          <div className="flex flex-col items-center text-xs lg:text-sm hover:text-[#31714f] transition">
            <Heart size={20} />
            <p className="hidden lg:block">Wishlist</p>
          </div>
          <div className="flex flex-col items-center text-xs lg:text-sm hover:text-[#31714f] transition">
            <button
              onClick={() => setCartOpen(true)}
              className="cursor-pointer flex flex-col items-center"
              aria-label="Open cart"
            >
              <div className="flex items-center relative">
                <ShoppingCart size={20} />
                <p className="text-white absolute left-3 bottom-0 bg-[#31714f] rounded-full min-w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartItems.length}
                </p>
              </div>
              <p className="hidden lg:block">Cart</p>
            </button>
          </div>

          <div className="flex flex-col items-center text-xs lg:text-sm hover:text-[#31714f] transition">
            <UserRoundKey size={20} />
            <p className="hidden lg:block">Sign In</p>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between mt-3 gap-2">
        <div>
          <a href="/">
            <img className="w-22" src="/Img/logo/logo.png" alt="logo" />
          </a>
        </div>
        <div className="flex-1">
          <input
            className="w-full h-10 bg-gray-200 text-black px-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#31714f]"
            type="search"
            placeholder="Search..."
          />
        </div>
        <button
          onClick={() => setCartOpen(true)}
          className="cursor-pointer flex flex-col items-center text-black p-2 hover:text-[#31714f] transition relative"
          aria-label="Open cart"
        >
          <div className="flex items-center relative">
            <ShoppingCart size={20} />
            <p className="text-white absolute left-2 -top-1 bg-[#31714f] rounded-full min-w-4 h-4 flex items-center justify-center text-xs font-bold">
              {cartItems.length}
            </p>
          </div>
        </button>

        <div className="flex flex-col items-center text-xs lg:text-sm hover:text-[#31714f] transition">
          <UserRoundKey size={20} />
          <p className="hidden lg:block">Sign In</p>
        </div>
      </div>

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        } w-full sm:w-[384px] max-w-[100vw] md:w-90`}
      >
        <div className="p-4 md:p-5 flex justify-between items-center border-b">
          <h2 className="text-lg md:text-xl font-bold">Your Cart</h2>
          <button
            onClick={() => setCartOpen(false)}
            className="text-[#31714f] font-bold hover:text-[#31714f] transition"
            aria-label="Close cart"
          >
            <RiCloseLargeLine
              className="cursor-pointer text-[#31714f]"
              size={25}
            />
          </button>
        </div>

        <div className="p-4 md:p-5 overflow-y-auto overflow-x-hidden flex-1">
          {cartItems.length === 0 ? (
            <p className="text-center text-[#31714f]">No items in cart</p>
          ) : (
            cartItems.map((item, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 border-b py-4 relative"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded shrink-0"
                  />
                  <div className="flex-1 min-w-0 pr-6">
                    <h3 className="font-bold text-sm md:text-base break-words whitespace-normal">
                      {item.name}
                    </h3>
                    <p className="text-orange-500 text-md mt-1 font-semibold">
                      {(() => {
                        const priceStr = String(item.price);
                        const cleanNumStr = priceStr
                          .replace(/,/g, "")
                          .match(/[0-9.]+/);
                        if (!cleanNumStr) return priceStr;
                        const num = Number(cleanNumStr[0]);
                        const total = num * (item.quantity || 1);
                        const formattedTotal =
                          total % 1 === 0
                            ? total.toLocaleString("en-US")
                            : total.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              });
                        return priceStr.replace(/[0-9.,]+/, formattedTotal);
                      })()}
                    </p>
                    {item.old_price && (
                      <p className="line-through text-gray-500 text-xs md:text-sm">
                        {(() => {
                          const priceStr = String(item.old_price);
                          const cleanNumStr = priceStr
                            .replace(/,/g, "")
                            .match(/[0-9.]+/);
                          if (!cleanNumStr) return priceStr;
                          const num = Number(cleanNumStr[0]);
                          const total = num * (item.quantity || 1);
                          const formattedTotal =
                            total % 1 === 0
                              ? total.toLocaleString("en-US")
                              : total.toLocaleString("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                });
                          return priceStr.replace(/[0-9.,]+/, formattedTotal);
                        })()}
                      </p>
                    )}

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 mt-2 bg-gray-100 w-fit px-2 py-1 rounded">
                      <button
                        onClick={() =>
                          updateQuantity && updateQuantity(item.id, -1)
                        }
                        className="text-gray-600 hover:text-black font-bold px-2 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-semibold">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity && updateQuantity(item.id, 1)
                        }
                        className="text-gray-600 hover:text-black font-bold px-2 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {/* Keep a small X just in case they want to remove specific items */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-4 right-0 text-red-500 hover:text-red-700 transition"
                    aria-label="Remove item"
                  >
                    <CiCircleRemove size={24} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Global Footer Buttons */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t flex justify-between items-center gap-2 bg-white shrink-0">
            <button
              onClick={() => {
                if (clearCart) clearCart();
              }}
              className="flex flex-1 items-center justify-center gap-2 border px-4 py-3 bg-red-600 rounded-md hover:scale-105 transition-all text-white font-semibold cursor-pointer text-xs md:text-sm"
            >
              REMOVE ALL
              <MdDeleteForever size={20} />
            </button>
            <button
              onClick={() =>
                buyNow
                  ? buyNow(cartItems)
                  : window.alert(`Buy now: ${cartItems.length} items`)
              }
              className="flex flex-1 items-center justify-center gap-2 border px-4 py-3 bg-[#31714f] rounded-md hover:scale-105 transition-all text-white font-semibold cursor-pointer text-xs md:text-sm"
            >
              BUY NOW
              <BsFillCartCheckFill size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Overlay for Cart */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setCartOpen(false)}
        />
      )}
    </div>
  );
};

export default Header;
