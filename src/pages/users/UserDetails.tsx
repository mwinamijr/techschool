import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { fetchUserDetails } from "../../features/userSlice";
import DashboardLayout from "../../layouts/DashboardLayout";
import Spinner from "../../components/Spinner";
import userImage from "../../assets/user_male.jpg";
import Breadcrumb from "../../components/Breadcrumb";

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { user, loading, error } = useSelector((state: any) => state.getUsers);

  useEffect(() => {
    dispatch(fetchUserDetails(id));
  }, [dispatch, id]);

  return (
    <DashboardLayout>
      <Breadcrumb
        items={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Users", to: "/users" },
          { label: "User Details" },
        ]}
      />
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
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
