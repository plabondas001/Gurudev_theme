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
import { parsePrice } from "../utils/orderUtils";

const TRACKING_STEPS = [
  "Order Placed",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

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

const getOrderCode = (order) => order.id.slice(0, 6).toUpperCase();

const getTrackingStep = (status) => {
  const normalized = String(status || "").toLowerCase();
  if (normalized.includes("deliver")) return 4;
  if (normalized.includes("out")) return 3;
  if (normalized.includes("ship")) return 2;
  if (normalized.includes("pack")) return 1;
  return 0;
};

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

const mapOrderToTracking = (order) => ({
  orderId: order.id,
  orderCode: getOrderCode(order),
  currentStep: getTrackingStep(order.status),
  eta: order.status === "Delivered" ? "Delivered" : "Processing",
  location: "Your order is being prepared",
  rider: "Assigned soon",
  items: order.items.map((item) => ({
    id: item.id,
    slug: item.slug,
    name: item.name,
    quantity: item.quantity || 1,
    price: item.price,
    image: item.img || item.image || "/Img/logo/logo.png",
  })),
  deliveryCharge: 0,
  total: order.total,
  totalLabel: order.totalLabel,
  lastUpdated: formatLastUpdated(order.createdAt),
});

const TrackOrder = () => {
  const { orders } = useUserData();
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
        const fullId = order.id.toUpperCase();
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

    // URL-driven tracking should hydrate the form once on navigation.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrderIdInput(getOrderCode({ id: orderFromUrl }));
    const foundOrder = findOrderById(orderFromUrl);
    if (foundOrder) {
      showOrder(foundOrder);
    } else {
      setTrackingData(null);
      setError("Order not found. Please check your order ID and try again.");
    }
  }, [findOrderById, searchParams, showOrder]);

  const totals = useMemo(() => {
    if (!trackingData) return null;

    const subtotal = trackingData.items.reduce(
      (sum, item) => sum + parsePrice(item.price) * item.quantity,
      0,
    );
    const total = subtotal + trackingData.deliveryCharge;

    return { subtotal, total };
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

    await new Promise((resolve) => setTimeout(resolve, 300));

    const foundOrder = findOrderById(normalizedOrderId);
    if (!foundOrder) {
      setError("Order not found. Please check your order ID and try again.");
      setTrackingData(null);
      setIsLoading(false);
      return;
    }

    showOrder(foundOrder);
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

                  <div className="mt-6 space-y-5">
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
                      const productPath = item.slug || item.id;
                      return (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/60 p-3"
                        >
                          {productPath ? (
                            <Link
                              to={`/product/${productPath}`}
                              className="w-16 h-16 rounded-xl overflow-hidden bg-white flex-shrink-0 ring-2 ring-transparent hover:ring-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-shadow"
                              title={`View ${item.name}`}
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </Link>
                          ) : (
                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-white flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-gray-900 font-bold text-sm line-clamp-2">
                              {item.name}
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="text-primary font-extrabold text-sm md:text-base">
                            {item.price}
                          </p>
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
                      {trackingData.totalLabel ||
                        totals.subtotal.toLocaleString("en-US")}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery Charge</span>
                    <span className="font-semibold text-gray-900">
                      {trackingData.deliveryCharge}
                    </span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between font-extrabold text-gray-900">
                    <span>Total</span>
                    <span className="text-primary">
                      {trackingData.totalLabel ||
                        totals.total.toLocaleString("en-US")}
                    </span>
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
