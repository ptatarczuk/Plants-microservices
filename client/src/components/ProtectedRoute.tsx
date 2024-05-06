/* eslint-disable react/jsx-no-useless-fragment */
import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants/constants";

export default function ProtectedRoute({ children }: React.PropsWithChildren) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
