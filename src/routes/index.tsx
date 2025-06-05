import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import Lessons from "../pages/Lessons";
import Examinations from "../pages/Examinations";

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
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "lessons", element: <Lessons /> },
      { path: "examinations", element: <Examinations /> },
    ],
  },
]);
