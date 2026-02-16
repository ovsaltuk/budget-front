import axios from "axios";
import {
  ICreateUserRequest,
  ILoginRequest,
  ILoginResponse,
  IUser,
} from "../types/IUser";

const api = axios.create({
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
    console.log("🔐 Токен добавлен в headers:", token.substring(0, 20) + "...");
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

export const userApi = {
  createUser: (data: ICreateUserRequest): Promise<{ data: IUser }> =>
    api.post("/api/users/register", data),
  login: (data: ILoginRequest): Promise<{ data: ILoginResponse }> =>
    api.post("/api/users/login", data),
  getAllUsers: (): Promise<{ data: IUser[] }> => api.get("/api/users/"),
};
