import { useSelector } from "react-redux";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useAppDispatch } from "../../app/hooks";
import { useEffect } from "react";
import { fetchUnverifiedTeachers } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import Breadcrumb from "../../components/Breadcrumb";

export default function UnverifiedTeachersList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { users, loading, error } = useSelector((state: any) => state.getUsers);

  useEffect(() => {
    dispatch(fetchUnverifiedTeachers());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <Breadcrumb
        items={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Users", to: "/users" },
          { label: "Unverified Teachers" },
        ]}
      />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Unverified Teachers List
        </h1>

        {loading && <Spinner />}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && users.length === 0 && <p>No users found.</p>}

        {!loading && !error && users.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 text-left">First Name</th>
                  <th className="py-2 px-4 text-left">Last Name</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Phone Number</th>
                  <th className="py-2 px-4 text-left">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate(`/users/${user.id}`)}
                  >
                    <td className="py-2 px-4">{user.first_name}</td>
                    <td className="py-2 px-4">{user.last_name}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.phone_number}</td>
                    <td className="py-2 px-4 capitalize">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
