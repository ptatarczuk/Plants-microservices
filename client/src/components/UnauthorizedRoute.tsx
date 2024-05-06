/* eslint-disable react/jsx-no-useless-fragment */
import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants/constants";

export default function UnauthorizedRoute({
  children,
}: React.PropsWithChildren) {
  if (localStorage.getItem(ACCESS_TOKEN)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
