import { Link } from "react-router";
import { useEffect } from "react";
import { FiShoppingBag, FiArrowRight } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { useCart } from "../context/CartContext";

const parsePrice = (priceStr) => {
  const clean = String(priceStr)
    .replace(/,/g, "")
    .match(/[0-9.]+/);
  return clean ? Number(clean[0]) : 0;
};

const getCurrencySymbol = (priceStr) => {
  return String(priceStr)
    .replace(/[0-9.,\s]/g, "")
    .trim();
};

const formatWithSymbol = (amount, symbol) => {
  const formatted =
    amount % 1 === 0
      ? amount.toLocaleString("en-US")
      : amount.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

  return symbol ? `${symbol} ${formatted}` : formatted;
};

const ViewCart = () => {
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.price) * (item.quantity || 1),
    0,
  );
  const shipping = cartItems.length ? 0 : 0;
  const total = subtotal + shipping;
  const currencySymbol = getCurrencySymbol(cartItems[0]?.price || "");

  return (
    <>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up { animation: fade-in-up .6s ease-out both; }
        .delay-1 { animation-delay: .1s; }
        .delay-2 { animation-delay: .2s; }
        .card-hover {
          transition: transform .2s ease, box-shadow .15s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,.06);
        }
      `}</style>

      <section className="bg-gray-50/30 min-h-[70vh]">
        <div className="bg-gradient-to-br from-[#183f31] to-[#25573c] text-white py-14 md:py-20 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

          <div className="w-full px-4 md:px-8 max-w-6xl mx-auto relative z-10 text-center fade-in-up">
            <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#FBBC05] mb-4">
              Shopping Cart
            </span>
            <h1 className="font-extrabold text-4xl md:text-6xl tracking-tight mb-5 leading-tight">
              Your Selected <span className="text-[#FBBC05]">Products</span>
            </h1>
            <p className="font-medium text-lg md:text-xl text-gray-200/90 leading-relaxed max-w-3xl mx-auto">
              Review your items, adjust quantities, and continue to checkout when everything looks right.
            </p>
          </div>
        </div>

        <div className="w-full px-4 md:px-8 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 fade-in-up delay-1">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Order Review
                </h2>
                <p className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-2">
                  {cartItems.length
                    ? `${cartItems.length} ${cartItems.length === 1 ? "item" : "items"} in your cart`
                    : "Your cart is waiting"}
                </p>
              </div>
          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
                  className="px-4 py-2.5 rounded-xl border border-primary/30 text-primary hover:bg-primary/5 transition text-sm font-semibold cursor-pointer"
            >
              Clear cart
            </button>
          )}
            </div>

        {cartItems.length === 0 ? (
              <div className="bg-white border border-gray-100 rounded-3xl px-6 py-14 text-center shadow-sm card-hover fade-in-up delay-2">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                  <FiShoppingBag size={34} />
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 mt-5">
              Your cart is empty
            </h2>
                <p className="text-gray-600 mt-2 mb-6">
              Looks like you have not added anything yet.
            </p>
            <Link
              to="/products"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary hover:bg-[#25573c] transition text-white text-sm font-bold shadow-sm"
            >
              Continue shopping
                  <FiArrowRight size={16} />
            </Link>
          </div>
        ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-2 bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden fade-in-up delay-1">
                  <div className="hidden md:grid grid-cols-12 px-5 py-4 bg-gray-100/60 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                <p className="col-span-6">Product</p>
                <p className="col-span-2 text-center">Price</p>
                <p className="col-span-2 text-center">Quantity</p>
                <p className="col-span-2 text-right">Subtotal</p>
              </div>

              {cartItems.map((item) => {
                const imageSrc =
                  item.img ||
                  item.image ||
                  (item.images && item.images[0]?.image) ||
                  "/Img/logo/logo.png";
                const quantity = item.quantity || 1;
                const itemPrice = parsePrice(item.price);
                const rowSubtotal = itemPrice * quantity;

                return (
                  <div
                    key={item.id}
                        className="grid grid-cols-1 md:grid-cols-12 gap-4 px-5 py-5 border-t border-gray-100 first:border-t-0"
                  >
                    <div className="md:col-span-6 flex gap-4">
                      <img
                        src={imageSrc}
                        alt={item.name}
                            className="w-20 h-24 object-cover rounded-2xl border border-gray-100 bg-gray-50 shrink-0 shadow-sm"
                      />
                      <div>
                            <h3 className="text-base font-bold text-gray-900 leading-snug">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeItem(item.id)}
                              className="mt-3 inline-flex items-center gap-1.5 text-red-500 hover:text-red-600 text-sm font-semibold cursor-pointer"
                        >
                          <MdDeleteForever size={19} />
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2 flex md:justify-center md:items-center">
                          <p className="text-primary font-bold text-sm md:text-base">
                        {formatWithSymbol(itemPrice, currencySymbol)}
                      </p>
                    </div>

                    <div className="md:col-span-2 flex md:justify-center md:items-center">
                          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50/70">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                              className="w-9 h-9 text-gray-500 hover:bg-primary/10 hover:text-primary transition cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                            <span className="w-10 h-9 flex items-center justify-center text-sm font-bold text-gray-900 border-x border-gray-200 bg-white">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                              className="w-9 h-9 text-gray-500 hover:bg-primary/10 hover:text-primary transition cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2 flex md:justify-end md:items-center">
                          <p className="text-base font-extrabold text-primary">
                        {formatWithSymbol(rowSubtotal, currencySymbol)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

                <aside className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 h-fit lg:sticky lg:top-28 card-hover fade-in-up delay-2">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                    <FiShoppingBag size={24} />
                  </div>
                  <h2 className="text-xl font-extrabold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between text-gray-600">
                  <span>Subtotal</span>
                      <span className="font-bold text-gray-900">
                    {formatWithSymbol(subtotal, currencySymbol)}
                  </span>
                </div>
                    <div className="flex items-center justify-between text-gray-600">
                  <span>Delivery Charge</span>
                      <span className="font-bold text-gray-900">0</span>
                </div>
                    <div className="flex items-center justify-between text-gray-600">
                  <span>Discount</span>
                      <span className="font-bold text-gray-900">0%</span>
                </div>
                    <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
                      <span className="text-base font-bold text-primary">
                    Total
                  </span>
                      <span className="text-2xl font-extrabold text-primary">
                    {formatWithSymbol(total, currencySymbol)}
                  </span>
                </div>
              </div>

              <Link
                to="/checkout"
                    className="block w-full mt-6 py-3 rounded-xl bg-primary hover:bg-[#25573c] transition text-white font-bold text-sm text-center shadow-sm"
              >
                Proceed to Checkout
              </Link>
              <Link
                to="/products"
                    className="block w-full mt-3 py-3 rounded-xl border border-gray-200 text-center text-primary hover:bg-primary/5 transition font-bold text-sm"
              >
                Add More Items
              </Link>
            </aside>
          </div>
        )}
      </div>
        </div>
      </section>
    </>
  );
};

export default ViewCart;
