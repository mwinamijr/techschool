import { useSelector } from "react-redux";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useAppDispatch } from "../../app/hooks";
import { useEffect } from "react";
import { deleteUser, fetchUsers } from "../../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import Breadcrumb from "../../components/Breadcrumb";

export default function UsersList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { users, loading, error, deleteLoading, deleteError, successDelete } =
    useSelector((state: any) => state.getUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (successDelete) {
      toast.success("User deleted successfully.");
      dispatch(fetchUsers()); // Optionally refresh
    }
  }, [successDelete, deleteError, dispatch]);

  const handleDeleteUser = (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <DashboardLayout>
      <Breadcrumb
        items={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Users List" },
        ]}
      />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Users List</h1>
          <Link
            to="/users/unverified-teachers"
            className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 hover:text-black"
          >
            View Unverified Teachers
          </Link>
        </div>

        {loading && <Spinner />}
        {error && <p className="text-red-500">{error}</p>}
        {deleteError && (
          <p className="text-red-500 pb-4">
            Can not delete user! <br />
            {deleteError}
          </p>
        )}

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
                    onClick={() => navigate(`/users/${user.id}`)}
                  >
                    <td className="py-2 px-4">{user.first_name}</td>
                    <td className="py-2 px-4">{user.last_name}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.phone_number}</td>
                    <td className="py-2 px-4 capitalize">{user.role}</td>
                    <td
                      className="py-2 px-4 flex gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => navigate(`/users/${user.id}/edit`)}
                      >
                        <PencilSquareIcon className="w-4 h-4 text-blue-500" />
                      </button>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        {deleteLoading ? (
                          <div className="w-4 h-4 animate-spin border-2 border-t-transparent border-red-500 rounded-full" />
                        ) : (
                          <TrashIcon className="w-4 h-4 text-red-500" />
                        )}
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
