import { RiCloseLargeLine } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";
import { BsCartXFill } from "react-icons/bs";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router";
export default function CartSidebar({
  cartOpen,
  setCartOpen,
  cartItems = [],
  updateQuantity,
  removeItem,
  clearCart,
  handleBuyNow,
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
          bg-white dark:bg-zinc-900
          w-full sm:w-[400px] max-w-[100vw]
          shadow-2xl
          transform transition-transform duration-300 ease-in-out
          ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <h2 className="font-semibold text-primary text-2xl dark:text-zinc-100 tracking-tight">
              Your Cart
            </h2>
            {cartItems.length > 0 && (
              <span className="text-[11px] font-semibold bg-emerald-700 text-emerald-50 px-2 py-0.5 rounded-full">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
              </span>
            )}
          </div>
          <button
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
            className="p-1.5 rounded-lg text-primary cursor-pointer hover:bg-green-50 transition-colors"
          >
            <RiCloseLargeLine size={20} />
          </button>
        </div>

        {/* ── Items ── */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-5 py-3 space-y-1">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-zinc-400 dark:text-zinc-500 py-16">
              <BsCartXFill className="text-primary" size={50} />
              <p className="text-lg font-medium text-primary opacity-70">
                Your cart is empty
              </p>
            </div>
          ) : (
            cartItems.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-4 border-b border-zinc-100 dark:border-zinc-800 last:border-0 relative group"
              >
                {/* Product image */}
                <div
                  className="w-[72px] h-[84px] rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 overflow-hidden shrink-0 cursor-pointer"
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
                    className="text-sm font-semibold leading-snug cursor-pointer text-primary transition-colors"
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
                  <div className="flex items-center mt-2.5 border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden w-fit">
                    <button
                      onClick={() =>
                        updateQuantity && updateQuantity(item.id, -1)
                      }
                      className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors text-base font-medium cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-8 h-8 flex items-center justify-center text-sm font-semibold text-zinc-800 dark:text-zinc-100 border-x border-zinc-200 dark:border-zinc-700">
                      {item.quantity || 1}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity && updateQuantity(item.id, 1)
                      }
                      className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors text-base font-medium cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-4 right-0 cursor-pointer text-primary transition-colors"
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
          <div className="px-5 py-4 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shrink-0">
            {/* Total Price */}
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-lg text-primary font-medium">
                Total Price
              </span>
              <span className="text-3xl font-bold text-primary">
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
              <button
                onClick={() => clearCart && clearCart()}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-red-500 dark:hover:text-red-400 transition-all text-sm font-semibold cursor-pointer flex-1"
              >
                <MdDeleteForever size={18} />
                Remove All
              </button>
              <button
                onClick={() =>
                  handleBuyNow
                    ? handleBuyNow(cartItems)
                    : window.alert(`Buy now: ${cartItems.length} items`)
                }
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] transition-all text-white text-sm font-semibold cursor-pointer flex-1 shadow-sm"
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
