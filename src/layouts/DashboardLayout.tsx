import { useState } from "react";
import type { ReactNode } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

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
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderNavItems = () =>
    navigation.map((item) => (
      <Link
        to={item.path}
        key={item.name}
        className={clsx(
          "flex items-center px-4 py-2 space-x-3 rounded-md transition hover:bg-orange-100",
          location.pathname === item.path && "bg-orange-100"
        )}
        onClick={() => setMobileOpen(false)}
      >
        <item.icon className="w-5 h-5 text-orange-500" />
        <span>{item.name}</span>
      </Link>
    ));

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white shadow-lg p-4 space-y-4">
        <div className="text-2xl font-bold text-orange-500 mb-6">
          MyPlatform
        </div>
        {renderNavItems()}
        <button className="mt-auto flex items-center space-x-2 text-sm text-red-600 hover:underline">
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 bg-white p-4 space-y-4 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold text-orange-500">
                MyPlatform
              </span>
              <button onClick={() => setMobileOpen(false)}>
                <XMarkIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            {renderNavItems()}
            <button className="mt-10 flex items-center space-x-2 text-sm text-red-600 hover:underline">
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
          <div
            className="flex-1 bg-black bg-opacity-30"
            onClick={() => setMobileOpen(false)}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between md:justify-end">
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open Menu"
          >
            <Bars3Icon className="w-6 h-6 text-gray-700" />
          </button>
          <span className="hidden md:inline text-gray-600 text-sm">
            Welcome, User!
          </span>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
