import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold text-red-500">403 - Unauthorized</h1>
      <p className="text-gray-600 mt-2">
        You do not have permission to access this page.
      </p>
      <Link to="/" className="mt-4 text-orange-600 hover:underline font-medium">
        Go to Home
      </Link>
    </div>
  );
}
