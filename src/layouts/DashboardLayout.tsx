import type { ReactNode } from "react";
import {
  HomeIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const navigation = [
  { name: "Dashboard", icon: HomeIcon, path: "/dashboard" },
  { name: "Users", icon: UserGroupIcon, path: "/users" },
  { name: "Settings", icon: Cog6ToothIcon, path: "/settings" },
];

export default function DashboardLayout({ children }: Props) {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4 text-2xl font-bold text-orange-500">MyPlatform</div>
        <nav className="mt-4 space-y-1">
          {navigation.map((item) => (
            <Link
              to={item.path}
              key={item.name}
              className={`flex items-center px-4 py-2 space-x-3 hover:bg-orange-100 ${
                location.pathname === item.path ? "bg-orange-50" : ""
              }`}
            >
              <item.icon className="w-5 h-5 text-orange-500" />
              <span className="text-gray-700">{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full px-4 py-4">
          <button className="flex items-center space-x-2 text-sm text-red-600 hover:underline">
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
          <div className="text-lg font-semibold text-gray-700">Dashboard</div>
          <div className="text-sm text-gray-500">Welcome, User!</div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
