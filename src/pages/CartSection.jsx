import { RiCloseLargeLine } from "react-icons/ri";
import { BsFillCartCheckFill } from "react-icons/bs";
import { BsCartXFill } from "react-icons/bs";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { FaOpencart } from "react-icons/fa";
export default function CartSidebar({
  cartOpen,
  setCartOpen,
  cartItems = [],
  updateQuantity,
  removeItem,
}) {
  const navigate = useNavigate();

  const handleProductClick = (item) => {
    setCartOpen(false);
    if (item?.slug) {
      navigate(`/product/${item.slug}`);
      return;
    }
    if (item?.id) {
      navigate(`/product/${item.id}`);
    }
  };

  const parsePrice = (priceStr) => {
    const clean = String(priceStr)
      .replace(/,/g, "")
      .match(/[0-9.]+/);
    return clean ? Number(clean[0]) : 0;
  };

  const formatPrice = (priceStr, quantity = 1) => {
    const num = parsePrice(priceStr);
    const total = num * quantity;
    const formatted =
      total % 1 === 0
        ? total.toLocaleString("en-US")
        : total.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
    return String(priceStr).replace(/[0-9.,]+/, formatted);
  };

  const goToCheckout = () => {
    setCartOpen(false);
    navigate("/checkout");
  };

  return (
    <>
      {/* Backdrop */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full z-50 flex flex-col
          bg-gray-50 dark:bg-zinc-900
          w-full sm:w-[400px] max-w-[100vw]
          shadow-2xl
          transform transition-transform duration-300 ease-in-out
          ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* ── Header ── */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#183f31] to-[#25573c] text-white px-5 py-6 shrink-0">
          <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-44 h-44 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative z-10 flex items-start justify-between gap-4">
            <div>
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#FBBC05] mb-2">
                Shopping Cart
              </span>
              <h2 className="font-extrabold text-3xl tracking-tight">
                Your Cart
              </h2>
              {cartItems.length > 0 && (
                <p className="text-sm font-medium text-gray-200/90 mt-1">
                  {cartItems.length} {cartItems.length === 1 ? "item" : "items"}{" "}
                  ready for checkout
                </p>
              )}
            </div>
            <button
              onClick={() => setCartOpen(false)}
              aria-label="Close cart"
              className="p-2 rounded-xl text-white bg-white/10 cursor-pointer hover:bg-white/20 transition-colors shrink-0"
            >
              <RiCloseLargeLine size={20} />
            </button>
          </div>
        </div>

        {/* ── Items ── */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center bg-white border border-gray-100 rounded-3xl px-6 py-16 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <BsCartXFill size={34} />
              </div>
              <p className="text-lg font-extrabold text-gray-900">
                Your cart is empty
              </p>
              <p className="text-sm text-gray-500">
                Add products to review them here.
              </p>
            </div>
          ) : (
            cartItems.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-2xl shadow-sm relative group"
              >
                {/* Product image */}
                <div
                  className="w-[72px] h-[84px] rounded-xl border border-gray-100 bg-gray-50 dark:bg-zinc-800 overflow-hidden shrink-0 cursor-pointer shadow-sm"
                  onClick={() => handleProductClick(item)}
                >
                  <img
                    src={
                      item.img ||
                      item.image ||
                      (item.images && item.images[0]?.image) ||
                      "/Img/logo/logo.png"
                    }
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 pr-6">
                  <h3
                    className="text-sm font-bold leading-snug cursor-pointer text-gray-900 hover:text-primary transition-colors"
                    onClick={() => handleProductClick(item)}
                  >
                    {item.name}
                  </h3>

                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-primary text-sm font-semibold">
                      {formatPrice(item.price, item.quantity || 1)}
                    </p>
                    {item.old_price && (
                      <p className="line-through text-zinc-400 dark:text-zinc-500 text-xs">
                        {formatPrice(item.old_price, item.quantity || 1)}
                      </p>
                    )}
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center mt-2.5 border border-gray-200 dark:border-zinc-700 rounded-xl overflow-hidden w-fit bg-gray-50/70">
                    <button
                      onClick={() =>
                        updateQuantity && updateQuantity(item.id, -1)
                      }
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-primary/10 dark:hover:bg-zinc-700 transition-colors text-base font-medium cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-8 h-8 flex items-center justify-center text-sm font-bold text-gray-900 dark:text-zinc-100 border-x border-gray-200 dark:border-zinc-700 bg-white">
                      {item.quantity || 1}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity && updateQuantity(item.id, 1)
                      }
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-primary/10 dark:hover:bg-zinc-700 transition-colors text-base font-medium cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-3 right-3 cursor-pointer text-primary hover:text-red-500 transition-colors"
                  aria-label="Remove item"
                >
                  <MdOutlineDeleteForever size={22} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* ── Footer ── */}
        {cartItems.length > 0 && (
          <div className="px-5 pt-4 pb-[80px] sm:pb-4 border-t border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shrink-0">
            {/* Total Price */}
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-lg text-primary font-bold">
                Total Price
              </span>
              <span className="text-3xl font-extrabold text-primary">
                {(() => {
                  const total = cartItems.reduce((sum, item) => {
                    return sum + parsePrice(item.price) * (item.quantity || 1);
                  }, 0);
                  const formatted =
                    total % 1 === 0
                      ? total.toLocaleString("en-US")
                      : total.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        });
                  // currency symbol নেওয়া হচ্ছে প্রথম item থেকে
                  const symbol = String(cartItems[0]?.price)
                    .replace(/[0-9.,\s]/g, "")
                    .trim();
                  return symbol ? `${symbol} ${formatted}` : formatted;
                })()}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <Link to="/cart" className="flex-1">
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 text-primary hover:bg-primary/5 transition-all text-sm font-bold cursor-pointer"
                >
                  <FaOpencart size={20} />
                  ViewCart
                </button>
              </Link>
              <button
                onClick={goToCheckout}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary hover:bg-[#25573c] active:scale-[0.98] transition-all text-white text-sm font-bold cursor-pointer flex-1 shadow-sm"
              >
                <BsFillCartCheckFill size={17} />
                Buy Now
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
