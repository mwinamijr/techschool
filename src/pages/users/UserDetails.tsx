import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { fetchUserDetails, updateUser } from "../../features/userSlice";
import DashboardLayout from "../../layouts/DashboardLayout";
import Spinner from "../../components/Spinner";
import TabButton from "../../components/TabButton";
import userImage from "../../assets/user_male.jpg";

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { user, loading, error } = useSelector((state: any) => state.getUsers);
  const { updating } = useSelector((state: any) => state.updateUser || {});

  const [tab, setTab] = useState<"profile" | "settings">("profile");
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
  });

  useEffect(() => {
    dispatch(fetchUserDetails(id));
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        middle_name: user.middle_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone_number || "",
        gender: user.gender || "",
      });
    }
  }, [user]);

  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.phone) {
      alert("All fields are required.");
      return;
    }
    try {
      await dispatch(
        updateUser({
          id,
          first_name: formData.first_name,
          middle_name: formData.middle_name,
          last_name: formData.last_name,
          email: formData.email,
          phone_number: formData.phone,
          gender: formData.gender,
        })
      ).unwrap();
      alert("Profile updated successfully.");
    } catch (err) {
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">User Profile</h1>

        {loading && <Spinner />}
        {!loading && !user && <p>User not found.</p>}
        {error && <div className="text-red-500 text-sm">{error}</div>}

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
                  {user.first_name} {user?.middle_name} {user.last_name}
                </h2>
                <p className="text-gray-500">{user.email}</p>
                <p className="capitalize text-gray-500">{user.role}</p>
              </div>
            </div>

            <div className="flex space-x-2 border-b border-gray-300 mb-4 pb-2">
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
            </div>

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
                <div>
                  <span className="font-medium">Gender:</span> {user.gender}
                </div>
              </div>
            )}

            {tab === "settings" && (
              <form
                onSubmit={handleSettingsSubmit}
                className="bg-white p-6 rounded shadow space-y-4"
              >
                <div>
                  <label className="block font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={formData.first_name}
                    onChange={(e) =>
                      setFormData({ ...formData, first_name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Middle Name</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={formData.middle_name}
                    onChange={(e) =>
                      setFormData({ ...formData, middle_name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={formData.last_name}
                    onChange={(e) =>
                      setFormData({ ...formData, last_name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full border rounded px-3 py-2"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
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
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={updating}
                  className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 disabled:opacity-60"
                >
                  {updating ? "Saving..." : "Save Changes"}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
