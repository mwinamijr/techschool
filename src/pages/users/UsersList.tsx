import DashboardLayout from "../../layouts/DashboardLayout";

export default function UsersList() {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold text-gray-800">Users List</h1>
        <p className="text-gray-600 mt-2">
          This is the Users List page. You can view and manage users here.
        </p>
      </div>
    </DashboardLayout>
  );
}
