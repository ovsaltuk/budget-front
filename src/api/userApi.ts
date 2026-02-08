import axios from "axios";
import { ICreateUserRequest, IUser } from "../types/IUser";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const userApi = {
  createUser: (data: ICreateUserRequest ): Promise<IUser> =>
    api.post("/api/users/create", data),
};
