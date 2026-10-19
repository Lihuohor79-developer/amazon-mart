import { Loader2, X, XCircle } from "lucide-react";

import { formatShortOrderId } from "../../../utils/orderIds";

import { cancelConfirmStyles as s } from "../../../assets/dummyStyles";

const CancelConfirm = ({ order, onClose, onConfirm, isLoading = false }) => {
  if (!order) return null;

  return (
    <div className={s.container}>
      <div className={s.inner}>
        <span className={s.iconWrapper}>
          <XCircle className={s.icon} />
        </span>
        <div className={s.content}>
          <div className={s.header}>
            <h3 className={s.title}>Confirm cancel?</h3>

            <button type="button" onClick={onClose} className={s.closeButton}>
              <X className={s.closeIcon} />
            </button>
          </div>
          <p className={s.description}>
            Cancel {formatShortOrderId(order.orderId)} for{" "}
            {order.customerName || order.customer?.name}
          </p>
          <div className={s.actions}>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className={s.confirmButton}
            >
              {isLoading ? <Loader2 className={s.loader} /> : null}
              {isLoading ? "Cancelling..." : "Yes, Cancel"}
            </button>

            <button type="button" onClick={onClose} className={s.cancelButton}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelConfirm;
