import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../api/api";
import { forgotPasswordStyles as s } from "../../assets/dummyStyles";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const showToast = (type, message) => {
    setToast({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setToast((prev) => ({
        ...prev,
        show: false,
      }));
    }, 2500);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await forgotPassword({
        email,
      });

      showToast("success", data.message);

      setTimeout(() => {
        navigate("/reset-password", {
          state: {
            email,
          },
        });
      }, 1500);
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message || "Failed to send OTP.",
      );
    } finally {
      setLoading(false);
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
        <h1 className={s.heading}>Forgot Password</h1>
        <p className={s.subtext}>Enter your registered email</p>

        <form onSubmit={handleForgotPassword} className={s.form}>
          <input
            type="email"
            required
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={s.input}
          />

          <button type="submit" disabled={loading} className={s.submitButton}>
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>

        <div className={s.backLinkWrapper}>
          <Link to="/login" className={s.backLink}>
            Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
