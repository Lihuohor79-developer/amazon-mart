import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
if (!baseURL) {
  throw new Error(
    "VITE_API_URL is missing. Configure it in your frontend .env file.",
  );
}

const API = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    Accept: "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getDashboard = () => API.get("/admin");

// orders

export const getAllOrders = (params) => API.get("/admin/orders", { params });

export const getSingleOrder = (id) => API.get(`/admin/orders/${id}`);

export const updateOrderStatus = (id, status) =>
  API.put(`/admin/orders/${id}/status`, {
    orderStatus: status,
  });

export const deleteOrder = (id) => API.delete(`/admin/orders/${id}`);

// Category

export const getCategories = () => API.get("/categories");

export const getCategory = (id) => API.get(`/categories/${id}`);

export const createCategory = (data) => API.post(`/categories/add`, data);

export const updateCategory = (id, data) => API.put(`/categories/${id}`, data);

export const deleteCategory = (id) => API.delete(`/categories/${id}`);

// Products

export const getProducts = (params = {}) => API.get("/products", { params });

export const getProduct = (id) => API.get(`/products/${id}`);

export const createProduct = (data) => API.post("/products/add", data);

export const updateProduct = (id, data) => API.put(`/products/${id}`, data);

export const deleteProduct = (id) => API.delete(`/products/${id}`);

// Hookahs

export const getHookahs = () => API.get("/hookahs");

export const getHookah = (id) => API.get(`/hookahs/${id}`);

export const createHookah = (data) => API.post("/hookahs", data);

export const updateHookah = (id, data) => API.put(`/hookahs/${id}`, data);

export const deleteHookah = (id) => API.delete(`/hookahs/${id}`);

// Upload Images

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await API.post("/upload", formData);

  console.log("UPLOAD API RESPONSE:", response.data);

  return response.data;
};

export default API;
