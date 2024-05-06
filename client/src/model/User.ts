export interface User {
  id: string;
  username: string;
  email: string;
  imageUrl: string;
  role: "USER" | "ADMIN";
}
