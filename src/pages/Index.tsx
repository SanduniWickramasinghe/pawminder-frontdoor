import { Navigate } from "react-router-dom";
import { authService } from "@/services/authService";

export default function Index() {
  return <Navigate to={authService.isAuthenticated() ? "/dashboard" : "/login"} replace />;
}
