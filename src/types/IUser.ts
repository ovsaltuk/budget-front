export interface IUser {
  email: string;
  id: number;
}

export interface ICreateUserRequest {
  email: string;
  password: string;
}