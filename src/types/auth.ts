export interface LoginPayload {
  username: string;
  password: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  accessToken: string;
  image: string
}