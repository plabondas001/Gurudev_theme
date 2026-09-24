import React, { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { AlertCircle, RotateCcw, Home, ShoppingCart, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { apiInitiateOrderPayment } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

const PaymentFailed = ({ cancelled = false }) => {
  const [searchParams] = useSearchParams();
  const { getAccessToken } = useAuth();
  const orderId = searchParams.get("order_id") || "";
  const tranId = searchParams.get("tran_id") || "";
  const reason = searchParams.get("reason") || "";

  const [retrying, setRetrying] = useState(false);

  const handleRetry = async () => {
    if (!orderId) {
      toast.error("Order ID not found to retry payment.");
      return;
    }
    setRetrying(true);
    try {
      const token = getAccessToken?.();
      const res = await apiInitiateOrderPayment(orderId, token);
      if (res.ok && res.data?.payment_url) {
        toast.info("Redirecting to payment gateway...");
        window.location.href = res.data.payment_url;
      } else {
        toast.error(res.data?.detail || "Could not restart payment session.");
      }
    } catch (err) {
      toast.error("Failed to connect to payment gateway.");
    } finally {
      setRetrying(false);
    }
  };

  const isCancelled = cancelled || reason === "cancelled";

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-gray-50/50 px-4 py-16">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 md:p-10 shadow-xl border border-gray-100 text-center animate-fade-in">
        {/* Failure / Warning Icon */}
        <div
          className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ring-8 ${
            isCancelled
              ? "bg-amber-50 text-amber-600 ring-amber-50/50"
              : "bg-red-50 text-red-600 ring-red-50/50"
          }`}
        >
          <AlertCircle className="h-12 w-12 stroke-[2.2]" />
        </div>

        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-3 ${
            isCancelled
              ? "bg-amber-100/80 text-amber-800"
              : "bg-red-100/80 text-red-800"
          }`}
        >
          {isCancelled ? "Payment Cancelled" : "Payment Incomplete"}
        </span>

        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
          {isCancelled ? "Payment Was Cancelled" : "Payment Could Not Be Completed"}
        </h1>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          {isCancelled
            ? "You cancelled the payment process on the SSLCommerz gateway. Your order is currently saved in pending state."
            : "We were unable to verify your payment. No funds were captured, or the transaction was declined by your bank."}
        </p>

        {/* Order Details info */}
        {orderId && (
          <div className="mt-6 rounded-2xl bg-gray-50 p-5 border border-gray-100 text-left space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Order Number:</span>
              <span className="font-bold text-gray-900">#{orderId}</span>
            </div>
            {tranId && (
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Transaction Reference:</span>
                <span className="font-mono text-xs text-gray-700">{tranId}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Order Status:</span>
              <span className="font-bold text-amber-600 text-xs uppercase bg-amber-100/60 px-2 py-0.5 rounded">
                Pending Payment
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          {orderId ? (
            <button
              onClick={handleRetry}
              disabled={retrying}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-60 cursor-pointer"
            >
              {retrying ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <RotateCcw className="h-4 w-4" />
                  Retry Payment
                </>
              )}
            </button>
          ) : (
            <Link
              to="/cart"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 active:scale-[0.98]"
            >
              <ShoppingCart className="h-4 w-4" />
              Return to Cart
            </Link>
          )}

          <Link
            to="/products"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
          >
            <Home className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
