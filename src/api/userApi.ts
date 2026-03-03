import {api } from "./baseApi";
import {
  ICreateUserRequest,
  ILoginRequest,
  ILoginResponse,
  IUser,
} from "../types/IUser";

export const userApi = {
  createUser: (data: ICreateUserRequest): Promise<{ data: IUser }> =>
    api.post("/api/users/register", data),
  login: (data: ILoginRequest): Promise<{ data: ILoginResponse }> =>
    api.post("/api/users/login", data),
  getAllUsers: (): Promise<{ data: IUser[] }> => api.get("/api/users/"),
};
