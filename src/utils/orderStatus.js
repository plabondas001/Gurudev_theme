// Order statuses, mirroring the backend (backend/orders/models.py OrderStatus.CANONICAL).
// Keep codes, labels and order in sync with the backend and admin dashboard.
export const ORDER_STATUSES = [
  { code: "pending", label: "Pending", badge: "bg-amber-100 text-amber-700" },
  { code: "confirmed", label: "Confirmed", badge: "bg-blue-100 text-blue-700" },
  { code: "processing", label: "Processing", badge: "bg-cyan-100 text-cyan-700" },
  { code: "shipped", label: "Shipped", badge: "bg-purple-100 text-purple-700" },
  { code: "delivered", label: "Delivered", badge: "bg-green-100 text-green-700" },
  { code: "cancelled", label: "Cancelled", badge: "bg-red-100 text-red-700" },
  { code: "returned", label: "Returned", badge: "bg-orange-100 text-orange-700" },
];

// The normal delivery path shown on the tracking page.
export const TRACKING_FLOW = ["pending", "confirmed", "processing", "shipped", "delivered"];

// End states that leave the normal delivery path.
export const TERMINAL_STATUSES = ["cancelled", "returned"];

const findStatus = (value) => {
  const key = String(value || "").toLowerCase();
  return ORDER_STATUSES.find((s) => s.code === key || s.label.toLowerCase() === key);
};

// Status code for an order, falling back to the display name for older payloads.
export const getOrderStatusCode = (order) => {
  if (!order) return "pending";
  if (order.status_code) return order.status_code;
  return findStatus(order.status || order.order_status?.display_name)?.code || "pending";
};

export const getOrderStatusMeta = (order) =>
  findStatus(getOrderStatusCode(order)) || ORDER_STATUSES[0];
