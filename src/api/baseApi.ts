import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Интерцептор запроса — добавляет токен автоматически!
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("🔐 Токен добавлен в headers:", token);
  }
  return config;
});

// Интерцептор ответа — автологаут при 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("❌ Токен недействителен — logout");
      localStorage.removeItem("token");
      window.location.href = "/login"; // или используй navigate
    }
    return Promise.reject(error);
  },
);