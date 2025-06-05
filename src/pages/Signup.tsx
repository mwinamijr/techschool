import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { register } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    isTeacher: false,
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { userInfo, loading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard"); // redirect on successful signup
    }
  }, [userInfo, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(register(form));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md space-y-4 w-96"
      >
        <h2 className="text-xl font-bold text-center">Sign Up</h2>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <div className="flex flex-col space-y-1">
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              name="isTeacher"
              checked={form.isTeacher}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span>Teacher</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-orange-500 text-white w-full py-2 rounded hover:bg-orange-600 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
