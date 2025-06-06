import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Unauthorized from "../pages/Unauthorized";

interface ProtectedRouteProps {
  allowedRoles?: ("admin" | "teacher" | "student")[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { userInfo } = useSelector((state: any) => state.auth);

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  // Role check
  if (
    allowedRoles &&
    !allowedRoles.some((role) =>
      role === "admin"
        ? userInfo.is_admin
        : role === "teacher"
        ? userInfo.role === "teacher"
        : userInfo.role === "student"
    )
  ) {
    return <Unauthorized />;
  }

  return <Outlet />;
}
