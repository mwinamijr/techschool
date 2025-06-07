import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { register } from "../features/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    username: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
    gender: "male",
    role: "student",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) navigate("/dashboard");
  }, [userInfo, navigate]);

  const validatePhone = (value: string) => /^\+255\d{9}$/.test(value.trim());

  const validateEmail = (value: string) => /\S+@\S+\.\S+/.test(value.trim());

  useEffect(() => {
    const isPhoneValid = validatePhone(form.phone_number);
    const isEmailValid = validateEmail(form.email);
    const allFilled =
      form.first_name &&
      form.last_name &&
      form.email &&
      form.phone_number &&
      form.password &&
      form.confirmPassword &&
      form.gender &&
      form.role;

    setPasswordMismatch(form.password !== form.confirmPassword);
    setFormValid(
      allFilled && !passwordMismatch && isPhoneValid && isEmailValid
    );
  }, [form, passwordMismatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "phone_number") {
      // Automatically prefix +255 if user starts with 0 or nothing
      let formatted = value;
      if (value.startsWith("0")) {
        formatted = "+255" + value.substring(1);
      } else if (!value.startsWith("+255")) {
        formatted = "+255" + value;
      }
      setForm((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordMismatch) {
      dispatch(register(form));
    }
  };

  const getInputClass = (name: keyof typeof form) => {
    const value = form[name].trim();
    const isInvalid =
      (name === "email" && !validateEmail(value)) ||
      (name === "phone_number" && !validatePhone(value)) ||
      (!value && name !== "middle_name");

    const isValid =
      (name === "email" && validateEmail(value)) ||
      (name === "phone_number" && validatePhone(value)) ||
      (value && name !== "middle_name");

    return `w-full p-2 rounded border ${
      isInvalid
        ? "border-red-500"
        : isValid
        ? "border-green-500"
        : "border-gray-300"
    }`;
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
          placeholder="First Name"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          className={getInputClass("first_name")}
          required
        />

        <input
          type="text"
          placeholder="Middle Name"
          name="middle_name"
          value={form.middle_name}
          onChange={handleChange}
          className={getInputClass("middle_name")}
        />

        <input
          type="text"
          placeholder="Last Name"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          className={getInputClass("last_name")}
          required
        />

        <input
          type="text"
          placeholder="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          className={getInputClass("username")}
        />

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className={getInputClass("email")}
          required
        />

        <input
          type="tel"
          name="phone_number"
          placeholder="+255712345678"
          value={form.phone_number}
          onChange={handleChange}
          className={getInputClass("phone_number")}
          required
        />

        {passwordMismatch && (
          <div className="text-red-500 text-sm">Passwords do not match</div>
        )}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={`${getInputClass("password")} pr-10`}
            required
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </button>
        </div>

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          className={getInputClass("confirmPassword")}
          required
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

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

        <div className="text-sm text-center mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-600 hover:underline">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
