import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { Link, useSearchParams } from "react-router";
import { TbTruckDelivery } from "react-icons/tb";
import { FaSearchLocation } from "react-icons/fa";
import { GrDeliver } from "react-icons/gr";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { useUserData } from "../context/UserDataContext";
import { useAuth } from "../context/AuthContext";
import { useConfig } from "../context/ConfigContext";
import { apiGetOrder } from "../api/authApi";
import { parsePrice } from "../utils/orderUtils";
import {
  TRACKING_FLOW,
  TERMINAL_STATUSES,
  getOrderStatusCode,
  getOrderStatusMeta,
} from "../utils/orderStatus";

// Step labels for TRACKING_FLOW (pending → confirmed → processing → shipped → delivered).
const TRACKING_STEP_LABELS = {
  pending: "Order Placed",
  confirmed: "Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
};
const TRACKING_STEPS = TRACKING_FLOW.map((code) => TRACKING_STEP_LABELS[code]);

const STATUS_MESSAGES = {
  pending: { location: "We've received your order", eta: "Awaiting confirmation" },
  confirmed: { location: "Your order has been confirmed", eta: "Preparing soon" },
  processing: { location: "Your order is being prepared and packed", eta: "Processing" },
  shipped: { location: "Your order is on its way", eta: "In transit" },
  delivered: { location: "Your order has been delivered", eta: "Delivered" },
  cancelled: { location: "This order was cancelled", eta: "Cancelled" },
  returned: { location: "This order was returned", eta: "Returned" },
};

const PAYMENT_METHOD_LABELS = {
  cod: "Cash on delivery",
  sslcommerz: "Online payment",
  bkash: "bKash",
  nagad: "Nagad",
  rocket: "Rocket",
};

const ORDERS_KEY = "gurudev_orders";

function loadStoredOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

const normalizeOrderId = (value) =>
  value
    .trim()
    .toUpperCase()
    .replace(/^ORDER\s*#?/, "")
    .replace(/^#/, "");

const formatWithSymbol = (amount, symbol) => {
  const num = typeof amount === "number" ? amount : parsePrice(amount);
  const formatted =
    num % 1 === 0
      ? num.toLocaleString("en-US")
      : num.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
  return symbol ? `${symbol} ${formatted}` : formatted;
};

const getOrderCode = (order) => String(order.id).slice(0, 6).toUpperCase();

// Index in TRACKING_FLOW, or -1 for cancelled / returned orders.
const getTrackingStep = (statusCode) => TRACKING_FLOW.indexOf(statusCode);

const formatLastUpdated = (iso) => {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return "Just now";
  }
};

const mapOrderToTracking = (order) => {
  const statusCode = getOrderStatusCode(order);
  const messages = STATUS_MESSAGES[statusCode] || STATUS_MESSAGES.pending;
  return {
  orderId: order.id,
  orderCode: getOrderCode(order),
  statusCode,
  statusLabel: getOrderStatusMeta(order).label,
  isTerminal: TERMINAL_STATUSES.includes(statusCode),
  currentStep: getTrackingStep(statusCode),
  eta: messages.eta,
  location: messages.location,
  rider: statusCode === "shipped" ? "On the way" : "Assigned soon",
  items: order.items?.map((item) => {
    const product = item.product || {};
    const variant = item.variant || {};
    const variantLabel = [
      item.ram && `${item.ram}GB RAM`,
      item.storage && `${item.storage}GB`,
      item.color,
    ]
      .filter(Boolean)
      .join(" / ");
    return {
      id: item.id,
      slug: product.slug,
      name: product.name || "Unknown Product",
      variantLabel,
      quantity: item.quantity || 1,
      price: item.price,
      image: variant.image || product.image || "/Img/logo/logo.png",
    };
  }) || [],
  // Totals come from the backend so they match the invoice exactly.
  subtotal: order.subtotal != null ? parseFloat(order.subtotal) : null,
  discount: parseFloat(order.discount) || 0,
  deliveryCharge: parseFloat(order.delivery_charge) || 0,
  tax: parseFloat(order.tax) || 0,
  total: parseFloat(order.grand_total) || parseFloat(order.total_amount) || 0,
  paid: parseFloat(order.paid_amount) || 0,
  due: order.due_amount != null ? parseFloat(order.due_amount) : null,
  isPaid: Boolean(order.payment?.is_paid),
  paymentMethod: order.payment?.payment_method || "",
  totalLabel: "Grand Total",
  lastUpdated: formatLastUpdated(order.updated_at || order.created_at),
  };
};

const TrackOrder = () => {
  const { orders } = useUserData();
  const { getAccessToken } = useAuth();
  const { config } = useConfig();
  const currencySymbol = config?.currency_symbol || config?.currency || "৳";
  const [searchParams] = useSearchParams();
  const [orderIdInput, setOrderIdInput] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [searchParams]);

  const trackableOrders = useMemo(() => {
    const byId = new Map();
    [...orders, ...loadStoredOrders()].forEach((order) => {
      if (order?.id) byId.set(order.id, order);
    });
    return Array.from(byId.values());
  }, [orders]);

  const findOrderById = useCallback(
    (value) => {
      const normalizedOrderId = normalizeOrderId(value);
      return trackableOrders.find((order) => {
        const fullId = String(order.id).toUpperCase();
        const shortCode = getOrderCode(order);
        return (
          fullId === normalizedOrderId ||
          shortCode === normalizedOrderId ||
          fullId.startsWith(normalizedOrderId)
        );
      });
    },
    [trackableOrders],
  );

  const showOrder = useCallback((order) => {
    setTrackingData(mapOrderToTracking(order));
    setError("");
  }, []);

  useEffect(() => {
    const orderFromUrl = searchParams.get("order");
    if (!orderFromUrl) return;

    setOrderIdInput(getOrderCode({ id: orderFromUrl }));
    const foundOrder = findOrderById(orderFromUrl);
    if (foundOrder) {
      showOrder(foundOrder);
    } else {
      // Attempt API lookup from database
      const token = getAccessToken();
      if (token) {
        setIsLoading(true);
        apiGetOrder(token, orderFromUrl)
          .then(({ ok, data }) => {
            if (ok && data && data.id) {
              showOrder(data);
            } else {
              setTrackingData(null);
              setError("Order not found. Please check your order ID and try again.");
            }
          })
          .catch(() => {
            setTrackingData(null);
            setError("Order not found. Please check your order ID and try again.");
          })
          .finally(() => setIsLoading(false));
      } else {
        setTrackingData(null);
        setError("Order not found. Please check your order ID and try again.");
      }
    }
  }, [findOrderById, getAccessToken, searchParams, showOrder]);

  const totals = useMemo(() => {
    if (!trackingData) return null;

    const subtotal =
      trackingData.subtotal ??
      trackingData.items.reduce(
        (sum, item) => sum + parsePrice(item.price) * item.quantity,
        0,
      );
    const discount = trackingData.discount || 0;
    const deliveryCharge = trackingData.deliveryCharge || 0;
    const tax = trackingData.tax || 0;
    const total =
      trackingData.total || Math.max(0, subtotal + deliveryCharge + tax - discount);
    const paid = trackingData.paid || 0;
    const due = trackingData.due ?? Math.max(0, total - paid);

    return { subtotal, discount, deliveryCharge, tax, total, paid, due };
  }, [trackingData]);

  const fetchTracking = async (event) => {
    event.preventDefault();
    const normalizedOrderId = normalizeOrderId(orderIdInput);

    if (!normalizedOrderId) {
      setError("Please enter a valid order ID.");
      setTrackingData(null);
      return;
    }

    setError("");
    setIsLoading(true);

    const foundOrder = findOrderById(normalizedOrderId);
    if (foundOrder) {
      showOrder(foundOrder);
      setIsLoading(false);
      return;
    }

    // Query backend database via Order API endpoint
    const token = getAccessToken();
    if (token) {
      try {
        const { ok, data } = await apiGetOrder(token, normalizedOrderId);
        if (ok && data && data.id) {
          showOrder(data);
          setIsLoading(false);
          return;
        }
      } catch {
        // Fall through to error state
      }
    }

    setError("Order not found. Please check your order ID and try again.");
    setTrackingData(null);
    setIsLoading(false);
  };

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
        .delay-3 { animation-delay: .3s; }
        .card-hover {
          transition: transform .2s ease, box-shadow .15s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,.06);
        }
      `}</style>

      <section className="bg-gray-50/30 min-h-screen">
        <div className="bg-gradient-to-br from-[#183f31] to-[#25573c] text-white py-16 md:py-20 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

          <div className="w-full px-4 md:px-8 max-w-6xl mx-auto relative z-10 text-center fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#FBBC05] mb-4">
              <TbTruckDelivery size={16} />
              Order Tracking
            </span>
            <h1 className="font-extrabold text-4xl md:text-6xl tracking-tight mb-5 max-w-4xl mx-auto leading-tight">
              Track Your <span className="text-[#FBBC05]">Order</span>
            </h1>
            <p className="font-medium text-lg md:text-xl text-gray-200/90 leading-relaxed max-w-3xl mx-auto">
              Enter your order ID to see the latest delivery progress, ordered
              items, and payment summary in one place.
            </p>

            <form
              onSubmit={fetchTracking}
              className="mt-8 max-w-3xl mx-auto bg-white/95 border border-white/20 rounded-2xl p-3 shadow-xl shadow-black/10 flex flex-col sm:flex-row items-stretch gap-3"
            >
              <label htmlFor="order-id" className="sr-only">
                Order ID
              </label>
              <input
                id="order-id"
                value={orderIdInput}
                onChange={(event) => setOrderIdInput(event.target.value)}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 font-semibold text-base md:text-lg text-gray-900 bg-white outline-none transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:border-primary"
                type="text"
                placeholder="Example: A1B2C3 or full order ID"
                autoComplete="off"
                aria-invalid={Boolean(error)}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary text-white px-5 py-3 rounded-xl cursor-pointer flex items-center justify-center gap-2 font-bold transition duration-300 hover:bg-[#25573c] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <FaSearchLocation />
                {isLoading ? "Tracking..." : "Track Now"}
              </button>
            </form>

            {error && (
              <p className="text-center text-red-100 bg-red-500/20 border border-red-200/20 rounded-full px-4 py-2 mt-4 font-medium inline-block">
                {error}
              </p>
            )}
            {!error && !trackingData && (
              <p className="text-center text-gray-200/90 mt-4 text-sm">
                Use the order ID from your My Orders section.
              </p>
            )}
          </div>
        </div>

        {trackingData && totals && (
          <div className="w-full px-4 md:px-8 py-16">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-7 shadow-sm card-hover fade-in-up delay-1">
                  <div className="flex flex-wrap justify-between gap-3 border-b border-gray-100 pb-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                        Order ID
                      </p>
                      <p className="text-xl font-extrabold text-gray-900 mt-1">
                        {trackingData.orderCode}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                        Updated
                      </p>
                      <p className="text-sm font-semibold text-gray-600 mt-1">
                        {trackingData.lastUpdated}
                      </p>
                    </div>
                  </div>

                  {trackingData.isTerminal && (
                    <div className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                      <p className="text-sm font-bold text-red-700">
                        Order {trackingData.statusLabel}
                      </p>
                      <p className="text-xs text-red-600 mt-1">
                        Please contact us if you have any questions about this order.
                      </p>
                    </div>
                  )}

                  <div className={`mt-6 space-y-5 ${trackingData.isTerminal ? "opacity-50" : ""}`}>
                    {TRACKING_STEPS.map((step, idx) => {
                      const isDone = idx <= trackingData.currentStep;
                      const isCurrent = idx === trackingData.currentStep;

                      return (
                        <div key={step} className="flex items-center gap-4">
                          <div
                            className={`w-9 h-9 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              isDone
                                ? "border-primary bg-primary text-white"
                                : "border-gray-200 text-gray-400 bg-white"
                            }`}
                          >
                            {isDone ? (
                              <FaCheckCircle className="text-sm" />
                            ) : (
                              <MdOutlineAccessTimeFilled className="text-sm" />
                            )}
                          </div>
                          <div>
                            <p
                              className={`text-sm md:text-base ${
                                isCurrent
                                  ? "text-primary font-extrabold"
                                  : isDone
                                    ? "text-gray-900 font-semibold"
                                    : "text-gray-500"
                              }`}
                            >
                              {step}
                            </p>
                            {isCurrent && (
                              <p className="text-xs text-gray-500 mt-1">
                                Current status
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-7 shadow-sm card-hover fade-in-up delay-2">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                    Ordered Items
                  </h2>
                  <div className="grid grid-cols-1 gap-3">
                    {trackingData.items.map((item) => {
                      const content = (
                        <>
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-white flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-gray-900 font-bold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                              {item.name}
                            </p>
                            {item.variantLabel && (
                              <p className="text-gray-500 text-xs mt-0.5">
                                {item.variantLabel}
                              </p>
                            )}
                            <p className="text-gray-500 text-xs mt-1">
                              Qty: {item.quantity} × {formatWithSymbol(item.price, currencySymbol)}
                            </p>
                          </div>
                          <p className="text-primary font-extrabold text-sm md:text-base">
                            {formatWithSymbol(parsePrice(item.price) * item.quantity, currencySymbol)}
                          </p>
                        </>
                      );

                      // Only link when the product slug is known; the item id is the order line, not the product.
                      return item.slug ? (
                        <Link
                          key={item.id}
                          to={`/product/${item.slug}`}
                          title={`View ${item.name}`}
                          className="group flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/60 p-3 hover:border-primary/40 hover:bg-white hover:shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          {content}
                        </Link>
                      ) : (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/60 p-3"
                        >
                          {content}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-[#25573c] min-h-56 flex items-center justify-center shadow-xl shadow-primary/20 fade-in-up delay-2">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
                  <div className="relative z-10 text-center px-6 py-8">
                    <div className="w-14 h-14 rounded-full bg-white/15 border border-white/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <GrDeliver className="text-[#FBBC05]" size={24} />
                    </div>
                    <p className="text-white text-base font-bold">
                      {trackingData.location}
                    </p>
                    <p className="text-gray-100 text-sm mt-2">
                      Rider: {trackingData.rider}
                    </p>
                    <p className="text-[#FBBC05] text-sm font-bold mt-1">
                      ETA: {trackingData.eta}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm card-hover fade-in-up delay-3 space-y-3">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary pb-1">
                    Price Summary
                  </h2>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      {formatWithSymbol(totals.subtotal, currencySymbol)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery Charge</span>
                    <span className="font-semibold text-gray-900">
                      {totals.deliveryCharge > 0
                        ? `+ ${formatWithSymbol(totals.deliveryCharge, currencySymbol)}`
                        : "Free"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tax</span>
                    <span className="font-semibold text-gray-900">
                      {totals.tax > 0
                        ? `+ ${formatWithSymbol(totals.tax, currencySymbol)}`
                        : formatWithSymbol(0, currencySymbol)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Discount</span>
                    <span className={`font-semibold ${totals.discount > 0 ? "text-emerald-600" : "text-gray-900"}`}>
                      {totals.discount > 0
                        ? `- ${formatWithSymbol(totals.discount, currencySymbol)}`
                        : formatWithSymbol(0, currencySymbol)}
                    </span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between font-extrabold text-gray-900">
                    <span>Total</span>
                    <span className="text-primary">
                      {formatWithSymbol(totals.total, currencySymbol)}
                    </span>
                  </div>

                  <div className="border-t border-dashed border-gray-200 pt-3 space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Payment</span>
                      <span className="flex items-center gap-2">
                        {trackingData.paymentMethod && (
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            {PAYMENT_METHOD_LABELS[trackingData.paymentMethod.toLowerCase()] ||
                              trackingData.paymentMethod}
                          </span>
                        )}
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${
                            totals.due <= 0
                              ? "bg-green-100 text-green-700"
                              : totals.paid > 0
                                ? "bg-amber-100 text-amber-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {totals.due <= 0 ? "Paid" : totals.paid > 0 ? "Partially paid" : "Unpaid"}
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Paid</span>
                      <span className="font-semibold text-emerald-600">
                        {formatWithSymbol(totals.paid, currencySymbol)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold">
                      <span className="text-gray-900">Due</span>
                      <span className={totals.due > 0 ? "text-red-600" : "text-gray-900"}>
                        {formatWithSymbol(totals.due, currencySymbol)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default TrackOrder;
