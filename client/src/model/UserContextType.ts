import { UserFromToken } from "./UserFromToken";

export type UserContextType = {
  currentUser: UserFromToken | null;
  userModifier: (user: UserFromToken | null) => void;
};
