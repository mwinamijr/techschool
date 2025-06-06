import { Outlet } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
      <p className="mt-2 text-gray-600">This is your overview page.</p>
      <Outlet />
    </DashboardLayout>
  );
}
