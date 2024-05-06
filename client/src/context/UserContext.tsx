import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";

import { UserContextType } from "../model/UserContextType";
import { UserFromToken } from "../model/UserFromToken";
import { ACCESS_TOKEN } from "../constants/constants";

const defaultSettings: UserContextType = {
  currentUser: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  userModifier: (user: UserFromToken | null) => {},
};

export const UserContext = createContext<UserContextType>(defaultSettings);

export function UserContextProvider({ children }: React.PropsWithChildren) {
  const [currentUser, setCurrentUser] = useState<UserFromToken | null>(null);

  const userModifier = (user: UserFromToken | null) => {
    setCurrentUser(user);
  };

  useEffect(() => {
    const token: string | null = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      const decodedAccessToken: UserFromToken = jwtDecode(token);
      userModifier({ ...decodedAccessToken });
    }
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <UserContext.Provider value={{ currentUser, userModifier }}>
      {children}
    </UserContext.Provider>
  );
}
