import { Link } from "react-router";
import { useEffect } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { useCart } from "../context/CartContext";
import { usePlaceOrder } from "../hooks/usePlaceOrder";

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
  const placeOrder = usePlaceOrder();

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
    <section className="bg-zinc-50 min-h-[70vh] py-10 md:py-14">
      <div className="w-11/12 md:w-10/12 mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
              Your Cart
            </h1>
            <p className="text-zinc-500 mt-1 text-sm md:text-base">
              Review your selected items before checkout.
            </p>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="px-4 py-2.5 rounded-xl border border-green-600 text-green-600 hover:bg-green-50 transition text-sm font-semibold cursor-pointer"
            >
              Clear cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white border-zinc-200 rounded-2xl px-6 py-14 text-center shadow-sm">
            <FiShoppingBag className="mx-auto text-primary/70" size={54} />
            <h2 className="text-2xl font-semibold text-primary mt-4">
              Your cart is empty
            </h2>
            <p className="text-zinc-500 mt-2 mb-6 whitespace-nowrap">
              Looks like you have not added anything yet.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 transition text-white text-sm font-semibold"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="hidden md:grid grid-cols-12 px-5 py-4 bg-zinc-50 text-xs font-semibold uppercase tracking-wide text-zinc-500">
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
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 px-5 py-5 border-t border-zinc-100 first:border-t-0"
                  >
                    <div className="md:col-span-6 flex gap-4">
                      <img
                        src={imageSrc}
                        alt={item.name}
                        className="w-20 h-24 object-cover rounded-xl border border-zinc-200 bg-zinc-50 shrink-0"
                      />
                      <div>
                        <h3 className="text-base font-semibold text-primary leading-snug">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="mt-3 inline-flex items-center gap-1.5 text-red-500 hover:text-red-600 text-sm font-medium cursor-pointer"
                        >
                          <MdDeleteForever size={19} />
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2 flex md:justify-center md:items-center">
                      <p className="text-primary font-semibold text-sm md:text-base">
                        {formatWithSymbol(itemPrice, currencySymbol)}
                      </p>
                    </div>

                    <div className="md:col-span-2 flex md:justify-center md:items-center">
                      <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-9 h-9 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 transition cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-10 h-9 flex items-center justify-center text-sm font-semibold text-zinc-800 border-x border-zinc-200">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-9 h-9 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 transition cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2 flex md:justify-end md:items-center">
                      <p className="text-base font-bold text-primary">
                        {formatWithSymbol(rowSubtotal, currencySymbol)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <aside className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-5 h-fit lg:sticky lg:top-28">
              <h2 className="text-lg font-semibold text-primary mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-zinc-800">
                    {formatWithSymbol(subtotal, currencySymbol)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-zinc-600">
                  <span>Delivery Charge</span>
                  <span className="font-semibold text-zinc-800">0</span>
                </div>
                <div className="flex items-center justify-between text-zinc-600">
                  <span>Discount</span>
                  <span className="font-semibold text-zinc-800">0%</span>
                </div>
                <div className="border-t border-zinc-200 pt-3 flex items-center justify-between">
                  <span className="text-base font-semibold text-primary">
                    Total
                  </span>
                  <span className="text-xl font-bold text-primary">
                    {formatWithSymbol(total, currencySymbol)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => placeOrder()}
                className="w-full mt-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 transition text-white font-semibold text-sm cursor-pointer"
              >
                Proceed to Checkout
              </button>
              <Link
                to="/products"
                className="block w-full mt-3 py-3 rounded-xl border border-zinc-200 text-center text-primary hover:bg-zinc-50 transition font-semibold text-sm"
              >
                Add More Items
              </Link>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
};

export default ViewCart;
