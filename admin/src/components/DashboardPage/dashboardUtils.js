export const formatMoney = (value) =>
  new Intl.NumberFormat("en-In", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);

export const formatDateOnly = (date) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

export const getOrderTotal = (order) => {
  return Number(order?.totalAmount || 0);
};

export const getVisibleOrders = ({
  orders = [],
  search = "",
  status = "All",
  limit,
}) => {
  const query = search.toLowerCase().trim();
  const filtered = orders
    .filter((order) => {
      const orderId = String(order?.orderId || "").toLowerCase();

      const customerName = String(
        order?.customer?.name || order?.customerName || "",
      ).toLowerCase();

      const phone = String(order?.customer?.phone || order?.phone || "");

      const matchsSearch =
        orderId.includes(query) ||
        customerName.includes(query) ||
        phone.includes(query);

      const matchsStatus = status === "All" || order?.orderStatus === status;

      return matchsSearch && matchsStatus;
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.orderDate) -
        new Date(a.createdAt || a.orderDate),
    );
  return limit ? filtered.slice(0, limit) : filtered;
};
