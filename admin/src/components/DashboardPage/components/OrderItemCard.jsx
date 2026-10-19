import { BadgeIndianRupee } from "lucide-react";
import { formatMoney } from "../dashboardUtils";
import { orderItemCardStyles as s } from "../../../assets/dummyStyles";

const OrderItemCard = ({ item }) => {
  const image =
    typeof item.image === "string"
      ? item.image
      : item.image?.url || "http://via.placeholder.com/150?text=Product";

  return (
    <article className={s.card}>
      <img src={image} className={s.image} />

      <div className={s.content}>
        <h4 className={s.name}>{item.name}</h4>
        <p className={s.company}>{item.company}</p>

        <div className={s.metaGrid}>
          <span className={s.sizeBadge}>{item.size}</span>
          <span className={s.qtyBadge}>Qty: {item.quantity}</span>
        </div>

        <div className={s.eachRow}>
          <span className={s.eachLabel}>Each</span>
          <span className={s.eachValue}>{formatMoney(item.sellingPrice)}</span>
        </div>

        <div className={s.totalRow}>
          <span className={s.totalLabel}>
            <BadgeIndianRupee className={s.totalIcon} />
            Total
          </span>
          <span className={s.totalValue}>
            {formatMoney(item.subtotal || item.sellingPrice * item.quantity)}
          </span>
        </div>
      </div>
    </article>
  );
};

export default OrderItemCard;
