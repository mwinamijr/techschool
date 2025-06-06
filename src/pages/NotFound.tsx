import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-gray-800">404 - Not Found</h1>
      <p className="text-gray-600 mt-2">
        The page you’re looking for doesn’t exist.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 text-orange-600 hover:underline font-medium"
      >
        Return to Last Page
      </button>
    </div>
  );
}
