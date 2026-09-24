import React from "react";
import { Link, useSearchParams } from "react-router";
import { CheckCircle2, ArrowRight, Package, Home, ShieldCheck } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id") || "";
  const tranId = searchParams.get("tran_id") || "";

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-gray-50/50 px-4 py-16">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 md:p-10 shadow-xl border border-gray-100 text-center animate-fade-in">
        {/* Animated Check Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50">
          <CheckCircle2 className="h-12 w-12 stroke-[2.2]" />
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-3.5 py-1 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-3">
          <ShieldCheck className="h-3.5 w-3.5" />
          Payment Verified
        </span>

        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
          Payment Successful!
        </h1>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          Thank you! Your payment has been confirmed via SSLCommerz and your order is now being processed.
        </p>

        {/* Order Info Card */}
        <div className="mt-6 rounded-2xl bg-gray-50 p-5 border border-gray-100 text-left space-y-2.5 text-sm">
          {orderId && (
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Order Number:</span>
              <span className="font-bold text-gray-900">#{orderId}</span>
            </div>
          )}
          {tranId && (
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Transaction ID:</span>
              <span className="font-mono font-semibold text-xs text-gray-800 bg-white px-2 py-0.5 rounded border border-gray-200">
                {tranId}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Payment Status:</span>
            <span className="inline-flex items-center gap-1 font-bold text-emerald-600 text-xs uppercase bg-emerald-100/60 px-2 py-0.5 rounded">
              Paid Online
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            to="/profile?tab=orders"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 active:scale-[0.98]"
          >
            <Package className="h-4 w-4" />
            View My Orders
            <ArrowRight className="h-4 w-4" />
          </Link>
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

export default PaymentSuccess;
