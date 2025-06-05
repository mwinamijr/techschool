export default function Login() {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <form className="bg-white p-6 rounded shadow-md space-y-4 w-96">
          <h2 className="text-xl font-bold">Login</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
          />
          <button className="bg-orange-500 text-white w-full py-2 rounded hover:bg-orange-600">
            Sign In
          </button>
        </form>
      </div>
    );
  }
  