export const formatShortOrderId = (orderId) => {
  if (!orderId) return "#0000";

  const rawId = String(orderId);
  const parsed = Number.parseInt(rawId.slice(-6), 16);
  const code = Number.isFinite(parsed) ? (parsed % 9000) + 1000 : 1000;

  return `#${String(code).padStart(4, "0")}`;
};
