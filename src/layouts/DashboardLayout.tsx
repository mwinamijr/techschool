import { useState } from "react";
import type { ReactNode } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  BellIcon,
  UserCircleIcon,
  ArrowDownIcon,
  BookOpenIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice"; // Make sure you have this action

interface Props {
  children: ReactNode;
}

const navigation = [
  { name: "Dashboard", icon: HomeIcon, path: "/dashboard" },
  { name: "Users", icon: UserGroupIcon, path: "/users" },
  { name: "Lessons", icon: BookOpenIcon, path: "/lessons" },
  { name: "Examinations", icon: PencilIcon, path: "/examinations" },
  { name: "Settings", icon: Cog6ToothIcon, path: "/settings" },
];

export default function DashboardLayout({ children }: Props) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { userInfo } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

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
          Tech School
        </div>
        {renderNavItems()}
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 bg-white p-4 space-y-4 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold text-orange-500">
                TechSchool
              </span>
              <button onClick={() => setMobileOpen(false)}>
                <XMarkIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            {renderNavItems()}
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
        <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between">
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open Menu"
          >
            <Bars3Icon className="w-6 h-6 text-gray-700" />
          </button>

          <div className="flex items-center space-x-4 ml-auto relative">
            <button
              className="relative p-1 rounded-full hover:bg-gray-100"
              aria-label="Notifications"
            >
              <BellIcon className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Avatar Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center space-x-2 hover:bg-gray-100 rounded-full p-1"
              >
                <UserCircleIcon className="w-8 h-8 text-orange-500" />
                <span className="hidden md:inline text-gray-700 text-sm font-medium">
                  {userInfo?.username}
                </span>
                <ArrowDownIcon className="w-3 h-3 text-orange-500" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-md z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    View Profile
                  </Link>
                  <Link
                    to="/notifications"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Notifications
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
