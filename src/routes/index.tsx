import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Lessons from "../pages/lessons/Lessons";
import LessonDetails from "../pages/lessons/LessonDetails";
import Examinations from "../pages/Examinations";
import Signup from "../pages/Signup";
import Unauthorized from "../pages/Unauthorized";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import UsersList from "../pages/users/UsersList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },

  // General authenticated access (all roles)
  {
    element: <ProtectedRoute allowedRoles={["admin", "teacher", "student"]} />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      // Public to all authenticated users
      { path: "/examinations", element: <Examinations /> },

      // Route for teachers only
      {
        element: <ProtectedRoute allowedRoles={["teacher"]} />,
        children: [
          { path: "/lessons", element: <Lessons /> },
          { path: "/lessons/:lessonId", element: <LessonDetails /> },
        ],
      },

      // Admin-only route
      {
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [{ path: "/users", element: <UsersList /> }],
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
