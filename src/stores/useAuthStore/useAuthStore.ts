import { create } from "zustand";
import { ILoginRequest, IUser } from "../../types/IUser";
import { jwtDecode } from "jwt-decode";
import { userApi } from "../../api/userApi";

interface IJwtPayload {
  userId: number;
  email: string;
  exp: number;
}

interface IAuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (data: ILoginRequest) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
  getAllUsers: () => Promise<{ data: IUser[] }>;
}

export const useAuthStore = create<IAuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  loading: true,
  checkAuth: () => {
    const token = localStorage.getItem("token");
    if (!token) {
      set({ loading: false });
      return;
    }

    try {
      const { userId, email, exp } = jwtDecode<IJwtPayload>(token);
      if (exp * 1000 > Date.now()) {
        set({
          user: { id: userId, email },
          isAuthenticated: true,
          loading: false,
        });
      } else {
        localStorage.removeItem("token");
        set({ loading: false });
      }
    } catch (error) {
      localStorage.removeItem("token");
      set({ loading: false });
    }
  },
  login: async ({ email, password }: ILoginRequest) => {
    set({ loading: true });
    try {
      const respone = await userApi.login({ email, password });
      const { token, user } = respone.data;

      localStorage.setItem("token", token);
      set({ user, isAuthenticated: true, loading: false });
      return true;
    } catch (error) {
      set({ loading: false });
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, isAuthenticated: false });
  },
  getAllUsers: async () => {
    const response = await userApi.getAllUsers();
    console.log(response);
    return response;
  },
}));
