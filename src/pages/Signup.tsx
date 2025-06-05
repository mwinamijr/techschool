import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { register } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [userInfo, navigate]);

  // Validate form inputs
  useEffect(() => {
    const isPhoneValid =
      /^0\d{9}$/.test(form.phone_number) ||
      /^\+255\d{9}$/.test(form.phone_number);
    const isEmailValid = /\S+@\S+\.\S+/.test(form.email);
    const allFilled =
      form.first_name &&
      form.last_name &&
      form.email &&
      form.phone_number &&
      form.password &&
      form.confirmPassword &&
      form.role;

    setPasswordMismatch(form.password !== form.confirmPassword);
    setFormValid(
      allFilled && !passwordMismatch && isPhoneValid && isEmailValid
    );
  }, [form]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordMismatch) {
      dispatch(register(form));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md space-y-4 w-96"
      >
        <h2 className="text-xl font-bold text-center">Sign Up</h2>

        {error && <div className="text-red-500 text-sm">{error}</div>}
        {passwordMismatch && (
          <div className="text-red-500 text-sm">Passwords do not match</div>
        )}

        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="middle_name"
          placeholder="Middle Name (optional)"
          value={form.middle_name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
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
          name="phone_number"
          placeholder="Phone Number (e.g. 0712345678 or +255712345678)"
          value={form.phone_number}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 pr-10 rounded"
            required
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        <input
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <button
          type="submit"
          disabled={!formValid || loading}
          className={`bg-orange-500 text-white w-full py-2 rounded hover:bg-orange-600 ${
            !formValid || loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
