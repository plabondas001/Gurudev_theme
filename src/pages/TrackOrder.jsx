import React, { useMemo, useState } from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { FaSearchLocation } from "react-icons/fa";
import { GrDeliver } from "react-icons/gr";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineAccessTimeFilled } from "react-icons/md";

const TRACKING_STEPS = [
  "Order Placed",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

const MOCK_ORDER_DB = {
  ORD12345: {
    orderId: "ORD12345",
    currentStep: 3,
    eta: "20-30 minutes",
    location: "Near Mirpur-10",
    rider: "Rakib (01711-000000)",
    items: [
      {
        id: "p-1",
        name: "Redmi Note 13",
        quantity: 1,
        price: 1199,
        image:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
      },
      {
        id: "p-2",
        name: "Wireless Earbuds",
        quantity: 1,
        price: 299,
        image:
          "https://images.unsplash.com/photo-1606400082777-ef05f3c5cde2?w=500",
      },
    ],
    deliveryCharge: 60,
    lastUpdated: "2 min ago",
  },
  ORD67890: {
    orderId: "ORD67890",
    currentStep: 4,
    eta: "Delivered",
    location: "Delivered at Dhanmondi",
    rider: "Mahin (01712-000000)",
    items: [
      {
        id: "p-3",
        name: "Samsung Galaxy A55",
        quantity: 1,
        price: 1499,
        image:
          "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500",
      },
    ],
    deliveryCharge: 0,
    lastUpdated: "Just now",
  },
};

const normalizeOrderId = (value) => value.trim().toUpperCase();

const TrackOrder = () => {
  const [orderIdInput, setOrderIdInput] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const totals = useMemo(() => {
    if (!trackingData) return null;

    const subtotal = trackingData.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
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

    await new Promise((resolve) => setTimeout(resolve, 600));

    const foundOrder = MOCK_ORDER_DB[normalizedOrderId];
    if (!foundOrder) {
      setError("Order not found. Please check your order ID and try again.");
      setTrackingData(null);
      setIsLoading(false);
      return;
    }

    setTrackingData(foundOrder);
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
              placeholder="Example: ORD12345"
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
              Try demo IDs: <span className="font-semibold">ORD12345</span> or{" "}
              <span className="font-semibold">ORD67890</span>
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
                    {trackingData.orderId}
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
              {trackingData.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#f0f7f4] flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-primary font-medium text-sm">
                      {item.name}
                    </p>
                    <p className="text-primary text-xs">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-primary font-semibold">
                    ৳{item.price * item.quantity}
                  </p>
                </div>
              ))}
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
                <span>৳{totals.subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-primary">
                <span>Delivery Charge</span>
                <span>৳{trackingData.deliveryCharge}</span>
              </div>
              <div className="border-t border-primary pt-2 flex justify-between font-bold text-primary">
                <span>Total</span>
                <span className="text-primary">৳{totals.total}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TrackOrder;
