import { Role } from "./Role";

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
  role: Role | null;
};
