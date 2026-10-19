import { useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";
import freshmartLogo from "../../assets/freshmart-logo.svg";

import axios from "axios";
import { adminLoginStyles as s } from "../../assets/dummyStyles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.form?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password },
      );
      if (data.success) {
        if (data.user?.role !== "admin") {
          setError("This action does not have admin access.");
          return;
        }
        localStorage.setItem("token", data.token);
        localStorage.setItem("amazonmart_user", JSON.stringify(data.user));
        navigate(from, { replace: true });
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={s.mainContainer}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className={s.glow1} />
        <div className={s.glow2} />
        <div className={s.glow3} />
      </div>

      <div className={s.contentWrapper}>
        <div className={s.brandHeader}>
          <div className={s.brandInner}>
            <div className={s.logoWrapper}>
              <img src={freshmartLogo} className={s.logoImage} />
            </div>
            <div className="leading-tight">
              <p className={s.adminLabel}>Admin Panel</p>
              <h1 className={s.brandTitle}>AmazonMart</h1>
            </div>
          </div>
        </div>

        <div className={s.card}>
          <div className={s.cardTopLine} />
          <form onSubmit={handleSubmit} className={s.form}>
            {error && (
              <div className={s.errorContainer}>
                <div className={s.errorDot} />
                {error}
              </div>
            )}
            <div className={s.fieldGroup}>
              <label className={s.fieldLabel}>
                <span>Email Address</span>
              </label>

              <div className={s.fieldWrapper}>
                <div className={s.fieldGlow} />
                <div className={s.fieldInputContainer}>
                  <Mail className={s.fieldIcon} />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className={s.fieldInput}
                    required
                    autoFocus
                  />
                </div>
              </div>
            </div>

            <div className={s.fieldGroup}>
              <label className={s.fieldLabel}>
                <span>Password</span>
              </label>
              <div className={s.fieldWrapper}>
                <div className={s.fieldGlow} />
                <div className={s.fieldInputContainer}>
                  <Lock className={s.fieldIcon} />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="*********"
                    className={s.fieldInputPassword}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={s.toggleButton}
                  >
                    {showPassword ? (
                      <EyeOff className={s.toggleIcon} />
                    ) : (
                      <Eye className={s.toggleIcon} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={s.submitButton}
            >
              <span className={s.submitInner}>
                {isLoading ? (
                  <>
                    <div className={s.spinner} />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className={s.submitIcon} />
                    Sign In
                  </>
                )}
              </span>
            </button>
          </form>
        </div>
      </div>
      <style>
        {`
          @keyframes spin-slow {
            0% {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            100% {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }

          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
