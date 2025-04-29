import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { JSX } from "react";

import { RootState } from "../store";

type Props = {
  children: JSX.Element; // The children prop is expected to be a JSX element
};

const ProtectedRoute = ({ children }: Props) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
