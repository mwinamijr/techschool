import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { fetchUsers } from "../../features/userSlice";
import DashboardLayout from "../../layouts/DashboardLayout";
import Spinner from "../../components/Spinner";
import TabButton from "../../components/TabButton";

import userImage from "../../assets/user_male.jpg"; // Placeholder image

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { users, loading } = useSelector((state: any) => state.getUsers);

  const [tab, setTab] = useState<"profile" | "settings" | "password">(
    "profile"
  );
  const [formData, setFormData] = useState({ email: "", phone: "" });
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const user = users.find((u: any) => u.id.toString() === id);

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        phone: user.phone_number || "",
      });
    }
  }, [user]);

  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Settings updated! (hook this to dispatch update)");
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password changed! (hook this to dispatch change)");
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">User Profile</h1>

        {loading && <Spinner />}
        {!loading && !user && <p>User not found.</p>}

        {user && (
          <>
            <div className="flex gap-6 items-start mb-6">
              <img
                src={user.profile_picture || userImage}
                alt="Profile"
                className="h-28 w-28 rounded-full border-2 border-orange-500 object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-700">
                  {user.first_name} {user.last_name}
                </h2>
                <p className="text-gray-500">{user.email}</p>
                <p className="capitalize text-gray-500">{user.role}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-2 border-b border-gray-300 mb-4">
              <TabButton
                label="Profile"
                active={tab === "profile"}
                onClick={() => setTab("profile")}
              />
              <TabButton
                label="Settings"
                active={tab === "settings"}
                onClick={() => setTab("settings")}
              />
              <TabButton
                label="Password"
                active={tab === "password"}
                onClick={() => setTab("password")}
              />
            </div>

            {/* Tab Content */}
            {tab === "profile" && (
              <div className="bg-white p-6 rounded shadow space-y-4">
                <div>
                  <span className="font-medium">Phone:</span>{" "}
                  {user.phone_number}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {user.email}
                </div>
                <div>
                  <span className="font-medium">Role:</span> {user.role}
                </div>
              </div>
            )}

            {tab === "settings" && (
              <form
                onSubmit={handleSettingsSubmit}
                className="bg-white p-6 rounded shadow space-y-4"
              >
                <div>
                  <label className="block font-medium mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full border rounded px-3 py-2"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Phone Number</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
                >
                  Save Changes
                </button>
              </form>
            )}

            {tab === "password" && (
              <form
                onSubmit={handlePasswordReset}
                className="bg-white p-6 rounded shadow space-y-4"
              >
                <div>
                  <label className="block font-medium mb-1">New Password</label>
                  <input
                    type="password"
                    className="w-full border rounded px-3 py-2"
                    value={passwords.newPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        newPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="w-full border rounded px-3 py-2"
                    value={passwords.confirmPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
                >
                  Reset Password
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
