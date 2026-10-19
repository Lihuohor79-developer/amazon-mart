import { useLayoutEffect } from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import AddItems from "./pages/AddItems/AddItems";
import Orders from "./pages/Orders/Orders";
import ItemList from "./pages/ItemList/ItemList";
import AddHookah from "./pages/AddHookah/AddHookah";
import HookahList from "./pages/HookahList/HookahList";

const hasAdminSession = () => {
  const token = localStorage.getItem("token");
  const saveUser = localStorage.getItem("amazonmart_user");

  if (!token || !saveUser) return false;

  try {
    return JSON.parse(saveUser).role === "admin";
  } catch {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  return hasAdminSession() ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

const PublicOnlyRoute = ({ children }) =>
  hasAdminSession() ? <Navigate to="/dashboard" replace /> : children;

const ScrollToTop = (children) => {
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
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-items"
          element={
            <ProtectedRoute>
              <AddItems />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-item"
          element={
            <ProtectedRoute>
              <AddItems />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/item-list"
          element={
            <ProtectedRoute>
              <ItemList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-hookah"
          element={
            <ProtectedRoute>
              <AddHookah />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hookah-list"
          element={
            <ProtectedRoute>
              <HookahList />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
