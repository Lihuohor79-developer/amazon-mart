import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail, resendOtp } from "../../api/api";
import { verifyEmailStyles as s } from "../../assets/dummyStyles";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // Toast
  const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 2500);
  };

  // If no email, redirect to signup
  useEffect(() => {
    if (!email) {
      navigate("/signup");
    }
  }, [email, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      return showToast("error", "Please enter a valid 6‑digit OTP.");
    }
    try {
      setLoading(true);
      const { data } = await verifyEmail({ email, otp });
      showToast("success", data.message);
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message || "OTP verification failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResendLoading(true);
      const { data } = await resendOtp({ email });
      showToast("success", data.message);
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message || "Failed to resend OTP.",
      );
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <main className={s.main}>
      {/* Toast */}
      <div
        className={`${s.toastBase} ${toast.show ? s.toastVisible : s.toastHidden} ${
          toast.type === "success" ? s.toastSuccess : s.toastError
        }`}
      >
        {toast.message}
      </div>

      <div className={s.card}>
        <h1 className={s.heading}>Verify Email</h1>
        <p className={s.subtext}>OTP sent to</p>
        <p className={s.emailDisplay}>{email}</p>

        <form onSubmit={handleVerify} className={s.form}>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter OTP"
            className={s.otpInput}
          />
          <button type="submit" disabled={loading} className={s.submitButton}>
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <div className={s.resendWrapper}>
          <button
            onClick={handleResend}
            disabled={resendLoading}
            className={s.resendButton}
          >
            {resendLoading ? "Sending..." : "Resend OTP"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default VerifyEmail;
