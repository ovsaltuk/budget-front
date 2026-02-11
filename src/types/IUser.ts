export interface IUser {
  email: string;
  id: number;
}

export interface ICreateUserRequest {
  email: string;
  password: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  success: boolean;
  token: string;
  user: IUser;
}