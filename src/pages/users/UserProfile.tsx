import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { fetchProfile, updateProfile } from "../../features/userSlice";
import DashboardLayout from "../../layouts/DashboardLayout";
import Spinner from "../../components/Spinner";
import TabButton from "../../components/TabButton";
import userImage from "../../assets/user_male.jpg";

export default function UserProfile() {
  const dispatch = useAppDispatch();
  const { userInfo } = useSelector((state: any) => state.auth);
  const { profile, loading, error } = useSelector(
    (state: any) => state.getUsers
  );

  const [tab, setTab] = useState<"profile" | "settings" | "password">(
    "profile"
  );
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    username: "",
    phone_number: "",
    gender: "",
  });
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        middle_name: profile.middle_name || "",
        last_name: profile.last_name || "",
        email: profile.email || "",
        username: profile.username || "",
        phone_number: profile.phone_number || "",
        gender: profile.gender || "",
      });
    }
  }, [profile]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!validatePhone(formData.phone_number)) {
      alert("Phone must be in +255XXXXXXXXX format.");
      return;
    }

    try {
      await dispatch(
        updateProfile({
          id: userInfo.id,
          updates: {
            first_name: formData.first_name,
            middle_name: formData.middle_name,
            last_name: formData.last_name,
            username: userInfo.username,
            email: formData.email,
            phone_number: formData.phone_number,
            gender: formData.gender,
          },
        })
      ).unwrap();

      alert("Profile updated successfully.");
    } catch (err) {
      alert("Failed to update profile. Please try again.");
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwords.newPassword || !passwords.confirmPassword) {
      alert("Please fill out both password fields.");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    // Replace this with your password update dispatch
    alert("Password changed successfully. (Hook to dispatch when ready)");
  };

  const validatePhone = (value: string) => /^\+255\d{9}$/.test(value.trim());

  const validateEmail = (value: string) => /\S+@\S+\.\S+/.test(value.trim());

  const getInputClass = (name: keyof typeof formData) => {
    const value = formData[name].trim();
    const isInvalid =
      (name === "email" && !validateEmail(value)) ||
      (name === "phone_number" && !validatePhone(value)) ||
      (!value && name !== "middle_name");

    const isValid =
      (name === "email" && validateEmail(value)) ||
      (name === "phone_number" && validatePhone(value)) ||
      (value && name !== "middle_name");

    return `w-full p-2 rounded border ${
      isInvalid
        ? "border-red-500"
        : isValid
        ? "border-green-500"
        : "border-gray-300"
    }`;
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">User Profile</h1>

        {loading && <Spinner />}
        {!loading && !profile && <p>User not found.</p>}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        {profile && (
          <>
            <div className="flex gap-6 items-start mb-6">
              <img
                src={profile.profile_picture || userImage}
                alt="Profile"
                className="h-28 w-28 rounded-full border-2 border-orange-500 object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-700">
                  {profile.first_name} {profile?.middle_name}{" "}
                  {profile.last_name}
                </h2>
                <p className="text-gray-500">{profile.email}</p>
                <p className="capitalize text-gray-500">{profile.role}</p>
              </div>
            </div>

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

            {tab === "profile" && (
              <div className="bg-white p-6 rounded shadow space-y-4">
                <div>
                  <span className="font-medium">Phone:</span>{" "}
                  {profile.phone_number}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {profile.email}
                </div>
                <div>
                  <span className="font-medium">Role:</span> {profile.role}
                </div>
                <div>
                  <span className="font-medium">Gender:</span> {profile.gender}
                </div>
              </div>
            )}

            {tab === "settings" && (
              <form
                onSubmit={handleUpdate}
                className="bg-white p-6 rounded shadow space-y-4"
              >
                <div>
                  <label className="block font-medium mb-1">Username</label>
                  <input
                    type="text"
                    className={getInputClass("username")}
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    className={getInputClass("first_name")}
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
                    className={getInputClass("middle_name")}
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
                    className={getInputClass("last_name")}
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
                    className={getInputClass("email")}
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
                    className={getInputClass("phone_number")}
                    value={formData.phone_number}
                    onChange={(e) =>
                      setFormData({ ...formData, phone_number: e.target.value })
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
                  disabled={loading}
                  className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 disabled:opacity-60"
                >
                  {loading ? "Saving..." : "Save Changes"}
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
                    className={getInputClass("first_name")}
                    value={passwords.newPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        newPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className={getInputClass("first_name")}
                    value={passwords.confirmPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
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
