import {
  Bell,
  Heart,
  MapPinned,
  Search,
  ShoppingCart,
  ChevronRight,
  User,
} from "lucide-react";
import { FaRegUserCircle } from "react-icons/fa";
import { useState, useEffect, useRef, useCallback } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import apiClient from "../../api/apiClient";
import { RxHamburgerMenu } from "react-icons/rx";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import logo from "/Img/logo/ge_main_logo.png";
import CartSidebar from "../../pages/CartSection";
import { Link, NavLink, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { getUserAvatarImgProps } from "../../utils/avatarUrl";
import { useConfig } from "../../context/ConfigContext";
import {
  apiGetNotifications,
  apiMarkAllNotificationsRead,
  apiMarkNotificationRead,
} from "../../api/authApi";

const Header = () => {
  const { cartItems, removeItem, updateQuantity } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, isAuthenticated, logout, getAccessToken } = useAuth();
  const { config } = useConfig();
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  // Notifications
  const [notifications, setNotifications] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const fetchNotifications = useCallback(async () => {
    const token = getAccessToken();
    if (!token) return;
    const { ok, data } = await apiGetNotifications(token);
    if (ok && Array.isArray(data)) setNotifications(data);
  }, [getAccessToken]);

  useEffect(() => {
    if (!isAuthenticated) { setNotifications([]); return; }
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60_000);
    return () => clearInterval(interval);
  }, [isAuthenticated, fetchNotifications]);

  // Close notif panel on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleMarkAllRead = async () => {
    const token = getAccessToken();
    if (!token) return;
    await apiMarkAllNotificationsRead(token);
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  const handleNotifClick = async (n) => {
    // Mark as read if unread
    if (!n.is_read) {
      const token = getAccessToken();
      if (token) {
        apiMarkNotificationRead(token, n.id).catch(() => {});
        setNotifications((prev) =>
          prev.map((notif) =>
            notif.id === n.id ? { ...notif, is_read: true } : notif
          )
        );
      }
    }
    setNotifOpen(false);

    // Extract order ID from the notification link, e.g. "/order-tracking/<uuid>"
    // and navigate to /track?order=<id> so TrackOrder auto-loads the order.
    const orderId = n.link
      ? n.link.replace(/.*\/order-tracking\//i, "").replace(/\/+$/, "")
      : null;

    if (orderId) {
      navigate(`/track?order=${encodeURIComponent(orderId)}`);
    } else {
      navigate("/track");
    }
  };

  const websiteName = config?.website_name || "Gurudeb Enterprise";
  const logoUrl = config?.logo_light || config?.dashboard_logo || logo;
  const nameParts = websiteName.split(" ");
  const firstName = nameParts[0] || "Gurudeb";
  const restName = nameParts.slice(1).join(" ") || "Enterprise";

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

  const desktopNavItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="w-full bg-white border-b border-gray-100 shadow-xs">
      {/* Desktop Header */}
      <div className="hidden md:flex w-full items-center justify-between py-2 px-6 lg:px-12 gap-6">
        <div className="shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <img className="h-10 lg:h-12 w-auto object-contain p-0.5" src={logoUrl} alt={`${websiteName} logo`} />
            <div className="flex flex-col">
              <span className="text-sm lg:text-base font-extrabold text-primary tracking-tight leading-none">{firstName}</span>
              <span className="text-[9px] lg:text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none mt-0.5">{restName}</span>
            </div>
          </Link>
        </div>
        <div className="relative flex-1 max-w-[700px]">
          <input
            className="w-full h-10 rounded-full border border-gray-200 bg-gray-50 px-4 pr-10 text-xs text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all duration-200"
            type="search"
            placeholder="Search products..."
          />
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors cursor-pointer"
            size={18}
          />
        </div>

        <nav className="flex items-center gap-5 lg:gap-8 text-xs lg:text-lg font-medium text-zinc-700">
          {desktopNavItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              className={({ isActive }) =>
                `border-b-2 py-1 transition-all duration-200 ${
                  isActive
                    ? "border-primary text-primary font-bold"
                    : "border-transparent text-gray-600 hover:text-primary hover:border-primary"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center text-zinc-700 gap-4 lg:gap-6 cursor-pointer justify-end">
          <Link to="/track" className="hover:text-primary transition-colors duration-200">
            <div className="flex flex-col items-center">
              <MapPinned size={20} className="stroke-[1.5]" />
              <p className="hidden lg:block text-sm font-medium mt-0.5">Track Order</p>
            </div>
          </Link>

          <Link to="/wishlist" className="hover:text-primary transition-colors duration-200">
            <div className="flex flex-col items-center relative">
              <div className="flex items-center relative">
                <Heart size={20} className="stroke-[1.5]" />
                {wishlistItems.length > 0 && (
                  <span className="text-white absolute -right-1.5 -top-1.5 bg-primary rounded-full min-w-4 h-4 px-0.5 flex items-center justify-center text-[9px] font-bold">
                    {wishlistItems.length}
                  </span>
                )}
              </div>
              <p className="hidden lg:block text-sm font-medium mt-0.5">Wishlist</p>
            </div>
          </Link>

          {/* Cart Button */}
          <div className="flex flex-col items-center hover:text-primary transition-colors duration-200">
            <button
              onClick={() => setCartOpen(true)}
              className="cursor-pointer flex flex-col items-center"
              aria-label="Open cart"
            >
              <div className="flex items-center relative">
                <ShoppingCart size={20} className="stroke-[1.5]" />
                {cartItems.length > 0 && (
                  <span className="text-white absolute -right-2 -top-1.5 bg-primary rounded-full min-w-4 h-4 flex items-center justify-center text-[9px] font-bold">
                    {cartItems.length}
                  </span>
                )}
              </div>
              <p className="hidden lg:block text-sm font-medium mt-0.5">Cart</p>
            </button>
          </div>

          {/* Notifications Bell (authenticated only) */}
          {isAuthenticated && (
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen((v) => !v)}
                className="flex flex-col items-center hover:text-primary transition-colors duration-200 cursor-pointer"
                aria-label="Notifications"
              >
                <div className="relative">
                  <Bell size={20} className="stroke-[1.5]" />
                  {unreadCount > 0 && (
                    <span className="absolute -right-1.5 -top-1.5 bg-red-500 text-white rounded-full min-w-4 h-4 px-0.5 flex items-center justify-center text-[9px] font-bold">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </div>
                <p className="hidden lg:block text-sm font-medium mt-0.5">Alerts</p>
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <span className="font-bold text-sm text-gray-900">Notifications</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        className="text-xs text-primary hover:underline font-medium"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <ul className="max-h-72 overflow-y-auto divide-y divide-gray-50">
                    {notifications.length === 0 ? (
                      <li className="px-4 py-6 text-center text-sm text-gray-400">No notifications yet.</li>
                    ) : (
                      notifications.slice(0, 8).map((n) => (
                        <li key={n.id}>
                          <button
                            type="button"
                            onClick={() => handleNotifClick(n)}
                            className={`w-full text-left px-4 py-3 flex gap-3 items-start transition hover:bg-gray-50 cursor-pointer ${
                              !n.is_read ? "bg-primary/5" : ""
                            }`}
                          >
                            <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                              !n.is_read ? "bg-primary" : "bg-gray-300"
                            }`} />
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-gray-900 truncate">{n.title}</p>
                              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.message}</p>
                              <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
                            </div>
                          </button>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}

          {isAuthenticated ? (
            <Link
              to="/profile"
              className="flex flex-col items-center hover:text-primary transition-colors duration-200"
              title="My account"
            >
              <img
                {...getUserAvatarImgProps(user)}
                alt=""
                className="w-6 h-6 rounded-full object-cover border border-primary/25 shrink-0"
              />
              <p className="hidden lg:block text-xs font-medium mt-0.5 max-w-[80px] truncate text-center">
                {user?.username || "Account"}
              </p>
            </Link>
          ) : (
            <Link
              to="/signin"
              className="flex flex-col items-center hover:text-primary transition-colors duration-200"
            >
              <FaRegUserCircle size={20} className="stroke-[1.5]" />
              <p className="hidden lg:block text-sm font-medium mt-0.5">Sign In</p>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden w-full flex items-center justify-between py-1.5 px-4 gap-2 border-b border-gray-100">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="cursor-pointer text-black p-1 hover:text-primary transition"
            aria-label="Open menu"
          >
            <RxHamburgerMenu size={18} />
          </button>
          <a href="/" className="flex items-center gap-1.5">
            <img className="h-7 w-auto object-contain p-0.5" src={logoUrl} alt={`${websiteName} logo`} />
            <div className="flex flex-col">
              <span className="text-[11px] font-extrabold text-primary tracking-tight leading-none">{firstName}</span>
              <span className="text-[7px] font-bold text-gray-500 uppercase tracking-widest leading-none mt-0.5">{restName}</span>
            </div>
          </a>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="cursor-pointer text-black p-1 transition hover:text-primary"
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          <Link
            to="/wishlist"
            className="cursor-pointer flex flex-col items-center text-black p-1 hover:text-primary transition relative"
            aria-label="Wishlist"
          >
            <Heart size={18} />
            {wishlistItems.length > 0 && (
              <span className="text-white absolute right-0 top-0 bg-primary rounded-full min-w-3.5 h-3.5 flex items-center justify-center text-[8px] font-bold">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Mobile Cart Button */}
          <button
            onClick={() => setCartOpen(true)}
            className="cursor-pointer flex flex-col items-center text-black p-1 hover:text-primary transition relative"
            aria-label="Open cart"
          >
            <div className="flex items-center relative">
              <ShoppingCart size={18} />
              {cartItems.length > 0 && (
                <span className="text-white absolute -right-1 -top-1 bg-primary rounded-full min-w-3.5 h-3.5 flex items-center justify-center text-[8px] font-bold">
                  {cartItems.length}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {mobileSearchOpen && (
        <div className="md:hidden w-full px-4 py-1.5 bg-gray-50 border-b border-gray-150 transition-all duration-300">
          <div className="relative">
            <input
              className="w-full h-8 rounded-full border border-gray-200 bg-white px-4 pr-10 text-xs text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
              type="search"
              placeholder="Search products..."
              autoFocus
            />
            <Search
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              size={15}
            />
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <CartSidebar
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        cartItems={cartItems}
        removeItem={removeItem}
        updateQuantity={updateQuantity}
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
            <Link
              to={isAuthenticated ? "/profile" : "/signin"}
              className="flex items-center gap-3 min-w-0 flex-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              {isAuthenticated ? (
                <img
                  {...getUserAvatarImgProps(user)}
                  alt=""
                  className="rounded-full w-12 h-12 object-cover border-2 border-white/40 shrink-0"
                />
              ) : (
                <div className="bg-[#85b9e0] rounded-full w-12 h-12 flex items-center justify-center shrink-0">
                  <User className="text-white w-6 h-6" fill="white" />
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-lg leading-tight truncate">
                  {isAuthenticated
                    ? `Hi, ${user?.name?.split(" ")[0] || "there"}!`
                    : "Hello there!"}
                </span>
                <span className="text-sm opacity-90">
                  {isAuthenticated ? "My profile" : "Sign in"}
                </span>
              </div>
            </Link>
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

          {isAuthenticated && (
            <button
              type="button"
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl border border-zinc-200 bg-white text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
            >
              Sign out
            </button>
          )}
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
