import { useSelector } from "react-redux";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useAppDispatch } from "../../app/hooks";
import { useEffect } from "react";
import { fetchUsers } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function UsersList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { users, loading, error } = useSelector((state: any) => state.getUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Users List</h1>

        {loading && <p>Loading users...</p>}
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
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate(`/dashboard/users/${user.id}`)}
                  >
                    <td className="py-2 px-4">{user.first_name}</td>
                    <td className="py-2 px-4">{user.last_name}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.phone_number}</td>
                    <td className="py-2 px-4 capitalize">{user.role}</td>
                    <td
                      className="py-2 px-4 flex gap-2"
                      onClick={(e) => e.stopPropagation()} // Prevent row click
                    >
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() =>
                          navigate(`/dashboard/users/${user.id}/edit`)
                        }
                      >
                        <PencilSquareIcon className="w-4 h-4 text-blue-500" />
                      </button>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => console.log("Delete user", user.id)}
                      >
                        <TrashIcon className="w-4 h-4 text-red-500" />
                      </button>
                    </td>
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
