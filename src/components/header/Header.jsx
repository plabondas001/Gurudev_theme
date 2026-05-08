import {
  Heart,
  List,
  MapPinned,
  Search,
  ShoppingCart,
  UserRoundKey,
  ChevronRight,
  User,
} from "lucide-react";
import { useState, useEffect } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import apiClient from "../../api/apiClient";
import { CiCircleRemove } from "react-icons/ci";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { useCart } from "../../context/CartContext";
import logo from "/Img/logo/ge_main_logo.png";

const Header = () => {
  const { cartItems, removeItem, clearCart, updateQuantity, handleBuyNow } =
    useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await apiClient.fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };
    loadCategories();
  }, []);

  return (
    <div className="w-11/12 md:w-10/12 mx-auto">
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between py-2 gap-4">
        <div>
          <a href="/">
            <img className="w-20 md:w-18 lg:w-22" src={logo} alt="logo" />
          </a>
        </div>
        <div className="flex-1">
          <input
            className="w-full h-11 md:h-12 bg-gray-200 text-black px-3 font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            type="search"
            placeholder="Search in..."
          />
        </div>
        <div className="flex items-center text-black gap-4 lg:gap-9 cursor-pointer flex-wrap justify-end">
          <div className="flex flex-col items-center text-xs lg:text-sm hover:text-primary transition">
            <MapPinned size={20} />
            <p className="hidden lg:block">Track Order</p>
          </div>
          <div className="flex flex-col items-center text-xs lg:text-sm hover:text-primary transition">
            <Heart size={20} />
            <p className="hidden lg:block">Wishlist</p>
          </div>
          <div className="flex flex-col items-center text-xs lg:text-sm hover:text-primary transition">
            <button
              onClick={() => setCartOpen(true)}
              className="cursor-pointer flex flex-col items-center"
              aria-label="Open cart"
            >
              <div className="flex items-center relative">
                <ShoppingCart size={20} />
                <p className="text-white absolute left-3 bottom-0 bg-primary rounded-full min-w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartItems.length}
                </p>
              </div>
              <p className="hidden lg:block">Cart</p>
            </button>
          </div>

          <div className="flex flex-col items-center text-xs lg:text-sm hover:text-primary transition cursor-pointer">
            <UserRoundKey size={20} />
            <p className="hidden lg:block">Sign In</p>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between mt-3 gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="cursor-pointer text-black p-2 hover:text-primary transition"
            aria-label="Open menu"
          >
            <RxHamburgerMenu size={20} />
          </button>
          <a href="/">
            <img className="w-18 p-1" src={logo} alt="logo" />
          </a>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="cursor-pointer text-black p-2 hover:text-primary transition"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          <button
            onClick={() => setCartOpen(true)}
            className="cursor-pointer flex flex-col items-center text-black p-2 hover:text-primary transition relative"
            aria-label="Open cart"
          >
            <div className="flex items-center relative">
              <ShoppingCart size={20} />
              <p className="text-white absolute left-2 -top-1 bg-primary rounded-full min-w-4 h-4 flex items-center justify-center text-xs font-bold">
                {cartItems.length}
              </p>
            </div>
          </button>

          <div className="flex flex-col items-center text-xs lg:text-sm hover:text-primary transition cursor-pointer">
            <UserRoundKey size={20} />
            <p className="hidden lg:block">Sign In</p>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar (Toggleable) */}
      {mobileSearchOpen && (
        <div className="md:hidden mt-3 w-full transition-all duration-300">
          <input
            className="w-full h-10 bg-gray-200 text-black px-3 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            type="search"
            placeholder="Search in..."
            autoFocus
          />
        </div>
      )}

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
            className="text-primary font-bold hover:text-primary transition"
            aria-label="Close cart"
          >
            <RiCloseLargeLine
              className="cursor-pointer text-primary"
              size={25}
            />
          </button>
        </div>

        <div className="p-4 md:p-5 overflow-y-auto overflow-x-hidden flex-1">
          {cartItems.length === 0 ? (
            <p className="text-center text-primary">No items in cart</p>
          ) : (
            cartItems.map((item, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 border-b py-4 relative"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={
                      item.img ||
                      item.image ||
                      (item.images && item.images[0]?.image) ||
                      "/Img/logo/logo.png"
                    }
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
                handleBuyNow
                  ? handleBuyNow(cartItems)
                  : window.alert(`Buy now: ${cartItems.length} items`)
              }
              className="flex flex-1 items-center justify-center gap-2 border px-4 py-3 bg-primary rounded-md hover:scale-105 transition-all text-white font-semibold cursor-pointer text-xs md:text-sm"
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
          className="fixed inset-0 bg-opacity-50 z-40 md:hidden"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#f6f6f6] shadow-lg transform transition-transform duration-300 z-50 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } w-[80%] max-w-[320px] md:hidden`}
      >
        <div className="p-4 flex flex-col gap-5 h-full overflow-y-auto">
          {/* User Info Box */}
          <div className="bg-primary rounded-xl p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="bg-[#85b9e0] rounded-full w-12 h-12 flex items-center justify-center shrink-0">
                <User className="text-white w-6 h-6" fill="white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight">
                  Hello there!
                </span>
                <span className="text-sm cursor-pointer">Signin</span>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-gray-200 transition cursor-pointer"
              aria-label="Close menu"
            >
              <RiCloseLargeLine size={24} />
            </button>
          </div>

          {/* Menu List */}
          <div className="bg-white rounded-xl flex flex-col text-sm text-gray-700 shadow-sm">
            {categories.map((category, index) => (
              <a
                key={category.id || index}
                href={`/category/${category.slug || category.id}`}
                className={`flex justify-between items-center py-3 px-4 ${
                  index !== categories.length - 1
                    ? "border-b border-gray-100"
                    : ""
                } hover:bg-gray-50`}
              >
                <div className="flex items-center gap-3">
                  {category.img && (
                    <img
                      src={category.img}
                      alt={category.name}
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                  <span>{category.name}</span>
                </div>
                <ChevronRight className="text-gray-400 w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay for Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-opacity-60 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Header;
