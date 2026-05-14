import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
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
  value.trim().toUpperCase().replace(/^ORDER\s*#?/, "").replace(/^#/, "");

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

  const findOrderById = (value) => {
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
  };

  const showOrder = (order) => {
    setTrackingData(mapOrderToTracking(order));
    setError("");
  };

  useEffect(() => {
    const orderFromUrl = searchParams.get("order");
    if (!orderFromUrl) return;

    setOrderIdInput(getOrderCode({ id: orderFromUrl }));
    const foundOrder = findOrderById(orderFromUrl);
    if (foundOrder) {
      showOrder(foundOrder);
    } else {
      setTrackingData(null);
      setError("Order not found. Please check your order ID and try again.");
    }
  }, [trackableOrders, searchParams]);

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
    <section className="bg-[#f8fbf9] pb-10">
      <div className="bg-[#f0f7f4] border-b border-primary/10">
        <div className="w-11/12 md:w-10/12 mx-auto py-8">
          <div className="flex items-center justify-center gap-3">
            <TbTruckDelivery size={32} className="text-primary" />
            <h1 className="font-bold text-3xl md:text-4xl text-primary">
              Track Your Order
            </h1>
          </div>
          <p className="text-center pt-2 text-base md:text-lg text-primary/90">
            Enter your order ID to get live delivery updates
          </p>

          <form
            onSubmit={fetchTracking}
            className="mt-6 max-w-3xl mx-auto flex flex-col sm:flex-row items-stretch gap-3"
          >
            <label htmlFor="order-id" className="sr-only">
              Order ID
            </label>
            <input
              id="order-id"
              value={orderIdInput}
              onChange={(event) => setOrderIdInput(event.target.value)}
              className="flex-1 border border-primary/30 rounded-md px-4 py-3 font-semibold text-lg text-primary bg-white outline-none transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:border-primary"
              type="text"
              placeholder="Example: A1B2C3 or full order ID"
              autoComplete="off"
              aria-invalid={Boolean(error)}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-50 text-primary border border-primary px-5 py-3 rounded-md cursor-pointer flex items-center justify-center gap-2 transition duration-300 hover:bg-green-100 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <FaSearchLocation />
              {isLoading ? "Tracking..." : "Track Now"}
            </button>
          </form>

          {error && (
            <p className="text-center text-red-600 mt-3 font-medium">{error}</p>
          )}
          {!error && !trackingData && (
            <p className="text-center text-primary/70 mt-3 text-sm">
              Use the order ID from your My Orders section.
            </p>
          )}
        </div>
      </div>

      {trackingData && totals && (
        <div className="w-11/12 md:w-10/12 mx-auto mt-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-[#f0f7f4] rounded-xl border border-primary p-4 md:p-5">
              <div className="flex flex-wrap justify-between gap-2">
                <p className="text-primary text-sm">
                  Order ID:{" "}
                  <span className="text-primary font-semibold">
                    {trackingData.orderCode}
                  </span>
                </p>
                <p className="text-primary text-sm">
                  Updated:{" "}
                  <span className="text-primary">
                    {trackingData.lastUpdated}
                  </span>
                </p>
              </div>

              <div className="mt-5 space-y-4">
                {TRACKING_STEPS.map((step, idx) => {
                  const isDone = idx <= trackingData.currentStep;
                  const isCurrent = idx === trackingData.currentStep;

                  return (
                    <div key={step} className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${
                          isDone
                            ? "border-primary bg-[#f0f7f4] text-primary"
                            : "border-primary text-primary"
                        }`}
                      >
                        {isDone ? (
                          <FaCheckCircle className="text-sm" />
                        ) : (
                          <MdOutlineAccessTimeFilled className="text-sm" />
                        )}
                      </div>
                      <p
                        className={`text-sm md:text-base ${
                          isCurrent
                            ? "text-primary font-semibold"
                            : isDone
                              ? "text-primary"
                              : "text-primary"
                        }`}
                      >
                        {step}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 p-4 bg-[#F0F7F4] rounded-xl border border-primary">
              {trackingData.items.map((item) => {
                const productPath = item.slug || item.id;
                return (
                <div key={item.id} className="flex items-center gap-3">
                  {productPath ? (
                    <Link
                      to={`/product/${productPath}`}
                      className="w-14 h-14 rounded-lg overflow-hidden bg-[#f0f7f4] flex-shrink-0 ring-2 ring-transparent hover:ring-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-shadow"
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
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#f0f7f4] flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-primary font-medium text-sm">
                      {item.name}
                    </p>
                    <p className="text-primary text-xs">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-primary font-semibold">
                    {item.price}
                  </p>
                </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-5">
            <div className="relative rounded-xl overflow-hidden bg-[#f0f7f4] border border-primary h-52 flex items-center justify-center">
              <div className="absolute inset-0 bg-[#f0f7f4] opacity-80" />
              <div className="relative z-10 text-center px-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mx-auto mb-2 animate-pulse">
                  <GrDeliver className="text-primary" />
                </div>
                <p className="text-primary text-sm font-semibold">
                  {trackingData.location}
                </p>
                <p className="text-primary text-xs mt-1">
                  Rider: {trackingData.rider}
                </p>
                <p className="text-primary text-xs mt-1">
                  ETA: {trackingData.eta}
                </p>
              </div>
            </div>

            <div className="bg-[#f0f7f4] rounded-xl border border-primary p-4 space-y-2">
              <h2 className="text-primary font-semibold text-sm pb-1">
                Price Summary
              </h2>
              <div className="flex justify-between text-sm text-primary">
                <span>Subtotal</span>
                <span>{trackingData.totalLabel || totals.subtotal.toLocaleString("en-US")}</span>
              </div>
              <div className="flex justify-between text-sm text-primary">
                <span>Delivery Charge</span>
                <span>{trackingData.deliveryCharge}</span>
              </div>
              <div className="border-t border-primary pt-2 flex justify-between font-bold text-primary">
                <span>Total</span>
                <span className="text-primary">
                  {trackingData.totalLabel || totals.total.toLocaleString("en-US")}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TrackOrder;
