import {
  Heart,
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
import { RxHamburgerMenu } from "react-icons/rx";
import { useCart } from "../../context/CartContext";
import logo from "/Img/logo/ge_main_logo.png";
import CartSidebar from "../products/CartSection";
import { Link, NavLink } from "react-router";

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
          <Link href="/">
            <img className="w-20 md:w-18 lg:w-22" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="flex-1">
          <input
            className="w-full h-11 md:h-12 bg-gray-200 text-black px-3 font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            type="search"
            placeholder="Search in..."
          />
        </div>
        <div className="flex items-center text-black gap-4 lg:gap-9 cursor-pointer flex-wrap justify-end">
          <Link to="/track">
            <div className="flex flex-col items-center text-xs lg:text-sm hover:text-primary transition">
              <MapPinned size={20} />
              <p className="hidden lg:block">Track Order</p>
            </div>
          </Link>

          <div className="flex flex-col items-center text-xs lg:text-sm hover:text-primary transition">
            <Heart size={20} />
            <p className="hidden lg:block">Wishlist</p>
          </div>

          {/* Cart Button */}
          <div className="flex flex-col items-center text-xs lg:text-sm hover:text-primary transition">
            <button
              onClick={() => setCartOpen(true)}
              className="cursor-pointer flex flex-col items-center"
              aria-label="Open cart"
            >
              <div className="flex items-center relative">
                <ShoppingCart size={20} />
                <span className="text-white absolute left-3 bottom-0 bg-primary rounded-full min-w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartItems.length}
                </span>
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

          {/* Mobile Cart Button */}
          <button
            onClick={() => setCartOpen(true)}
            className="cursor-pointer flex flex-col items-center text-black p-2 hover:text-primary transition relative"
            aria-label="Open cart"
          >
            <div className="flex items-center relative">
              <ShoppingCart size={20} />
              <span className="text-white absolute left-2 -top-1 bg-primary rounded-full min-w-4 h-4 flex items-center justify-center text-xs font-bold">
                {cartItems.length}
              </span>
            </div>
          </button>

          <div className="flex flex-col items-center text-xs lg:text-sm hover:text-primary transition cursor-pointer">
            <UserRoundKey size={20} />
            <p className="hidden lg:block">Sign In</p>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
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

      {/* ✅ Cart Sidebar — সব props পাঠানো হয়েছে */}
      <CartSidebar
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        cartItems={cartItems}
        removeItem={removeItem}
        clearCart={clearCart}
        updateQuantity={updateQuantity}
        handleBuyNow={handleBuyNow}
      />

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

          {/* Category List */}
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
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Header;
