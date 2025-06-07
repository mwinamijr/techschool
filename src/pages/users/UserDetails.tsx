import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { approveTeacher, fetchUserDetails } from "../../features/userSlice";
import DashboardLayout from "../../layouts/DashboardLayout";
import Spinner from "../../components/Spinner";
import userImage from "../../assets/user_male.jpg";
import Breadcrumb from "../../components/Breadcrumb";

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { user, loading, error } = useSelector((state: any) => state.getUsers);

  useEffect(() => {
    if (id) dispatch(fetchUserDetails(id));
  }, [dispatch, id]);

  const handleApproveTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(approveTeacher(id)).unwrap();
      alert("Teacher approved successfully.");
    } catch {
      alert("Failed to approve teacher. Please try again.");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <Breadcrumb
          items={[
            { label: "Dashboard", to: "/dashboard" },
            { label: "Users", to: "/users" },
            { label: "User Details" },
          ]}
        />

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
        </div>

        {loading && <Spinner />}
        {!loading && !user && <p className="text-red-600">User not found.</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

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
                  {user.first_name} {user.middle_name} {user.last_name}
                </h2>
                <p className="text-gray-500">{user.email}</p>
                <p className="capitalize text-gray-500">{user.role}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded shadow space-y-4">
              <div>
                <span className="font-medium">Full Name:</span>{" "}
                {user.first_name} {user.middle_name} {user.last_name}
              </div>
              <div>
                <span className="font-medium">Email:</span> {user.email}
              </div>
              <div>
                <span className="font-medium">Phone:</span> {user.phone_number}
              </div>
              <div>
                <span className="font-medium">Role:</span>{" "}
                <span className="capitalize">{user.role}</span>
              </div>
              <div>
                <span className="font-medium">Gender:</span>{" "}
                <span className="capitalize">{user.gender}</span>
              </div>
            </div>

            {user.is_verified && (
              <div className="mt-4 text-green-600 font-medium">
                Status: Verified
              </div>
            )}

            {user.role === "teacher" && !user.is_verified && (
              <div className="bg-white p-6 rounded shadow mt-6">
                <form
                  onSubmit={handleApproveTeacher}
                  className="flex items-center space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <label className="font-medium">Is Approved:</label>
                    <input
                      type="checkbox"
                      checked={user.is_approved}
                      readOnly
                      className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update Approval Status"}
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
