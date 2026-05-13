export const parsePrice = (priceStr) => {
  const clean = String(priceStr)
    .replace(/,/g, "")
    .match(/[0-9.]+/);
  return clean ? Number(clean[0]) : 0;
};

export const getCurrencySymbol = (priceStr) =>
  String(priceStr)
    .replace(/[0-9.,\s]/g, "")
    .trim();

export function snapshotOrderItems(items) {
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    price: item.price,
    quantity: item.quantity || 1,
    img:
      item.img || item.image || (item.images && item.images[0]?.image) || null,
  }));
}

export function computeCartTotals(items) {
  if (!items?.length) {
    return { subtotal: 0, totalLabel: "0", currencySymbol: "" };
  }
  const subtotal = items.reduce(
    (sum, item) => sum + parsePrice(item.price) * (item.quantity || 1),
    0,
  );
  const symbol = getCurrencySymbol(items[0]?.price || "");
  const formatted =
    subtotal % 1 === 0
      ? subtotal.toLocaleString("en-US")
      : subtotal.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
  const totalLabel = symbol ? `${symbol} ${formatted}` : formatted;
  return { subtotal, totalLabel, currencySymbol: symbol };
}
