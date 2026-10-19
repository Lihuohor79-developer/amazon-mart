import { useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProductItems from "./pages/ProductItems/ProductItems";
import Hookah from "./pages/Hookah/Hookah";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Address from "./pages/Address/Address";
import Cart from "./pages/Cart/Cart";
import Orders from "./pages/Orders/Orders";
import {
  PaymentCancelPage,
  PaymentSuccessPage,
} from "./components/PaymentReturnPage/PaymentReturnPage";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";
    const root = document.documentElement;
    const previousBehaviour = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    root.style.scrollBehavior = previousBehaviour;
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductItems />} />
        <Route path="/hookah-products" element={<Hookah />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/address" element={<Address />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/payment-cancel" element={<PaymentCancelPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default App;
