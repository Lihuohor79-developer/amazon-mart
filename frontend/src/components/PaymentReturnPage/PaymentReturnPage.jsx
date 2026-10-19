import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyPayment } from "../../api/api";
import { useCart } from "../../CartContext";
import { paymentSuccessPageStyles as s } from "../../assets/dummyStyles";

const PENDING_ONLINE_ORDER_KEY = "freshmart-pending-online-order";

export const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const verifiedRef = useRef(false);

  useEffect(() => {
    const completePayment = async () => {
      if (verifiedRef.current) return;
      verifiedRef.current = true;

      const sessionId = searchParams.get("session_id");
      const savedOrder = localStorage.getItem(PENDING_ONLINE_ORDER_KEY);

      if (!sessionId || !savedOrder) {
        navigate("/cart", { replace: true });
        return;
      }

      try {
        const order = JSON.parse(savedOrder);

        await verifyPayment(sessionId, order);

        localStorage.removeItem(PENDING_ONLINE_ORDER_KEY);
        clearCart();
        navigate("/orders", { replace: true });
      } catch (error) {
        console.log(error);
        navigate("/cart", { replace: true });
      }
    };

    completePayment();
  }, [clearCart, navigate, searchParams]);

  return (
    <main className={s.main}>
      <div className={s.container}>
        <Loader2 className={s.loaderIcon} />
        Confirming payment
      </div>
    </main>
  );
};

export const PaymentCancelPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/cart", { replace: true });
  }, [navigate]);

  return null;
};
