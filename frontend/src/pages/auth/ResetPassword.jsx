import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { resetPassword } from "../../api/api";
import { resetPasswordStyles as s } from "../../assets/dummyStyles";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Show/Hide Password States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      return showToast("error", "Email not found.");
    }

    if (password !== confirmPassword) {
      return showToast("error", "Passwords do not match.");
    }

    try {
      setLoading(true);

      const { data } = await resetPassword({
        email,
        otp,
        password,
      });

      showToast("success", data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message || "Failed to reset password.",
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
        <h1 className={s.heading}>Reset Password</h1>
        <p className={s.subtext}>Reset your account password</p>

        <form onSubmit={handleResetPassword} className={s.form}>
          {/* Email */}
          <input type="email" value={email} readOnly className={s.input} />

          {/* OTP */}
          <input
            type="text"
            placeholder="Enter OTP"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className={s.input}
            required
          />

          {/* New Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={s.inputWithIcon}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={s.toggleButton}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={s.inputWithIcon}
              required
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={s.toggleButton}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading} className={s.submitButton}>
            {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
