import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import api from "../services/api";
import Logo2 from "../assets/images/logo2.png";
import { useAuth } from "../context/AuthContext";


export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();


  // Redirect user back to protected page or home
  const redirectTo = location.state?.from || "/";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await api.post("auth/login/", form);

      // Use helper from context
      login({ ...res.data.user, refresh: res.data.refresh }, res.data.token);

      // Redirect
      navigate(redirectTo, { replace: true });

    } catch (error) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4efe9] pt-28 px-4">
      <div className="w-full max-w-4xl min-h-[520px] bg-white rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT PANEL */}
        <div className="bg-black p-10 flex flex-col justify-between">
          <div className="w-52">
            <img src={Logo2} alt="logo" />
          </div>

          <div>
            <h3 className="text-white text-3xl font-serif mb-4">
              Welcome Back.
            </h3>
            <p className="text-gray-400">
              Login to reserve tables, order food, and manage your account.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-10">
          <h3 className="text-xl font-semibold mb-8 text-gray-800">
            Sign In
          </h3>

          <div className="space-y-5">
            <input
              name="email"
              type="email"
              placeholder="Email address"
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-md focus:outline-none focus:border-black"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-md focus:outline-none focus:border-black"
            />

            {/* Forgot Password */}
            <p className="text-sm text-right">
              <Link
                to="/forgot-password"
                className="text-gray-600 hover:underline hover:text-blue-500"
              >
                Forgot password?
              </Link>
            </p>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-md mt-4 hover:bg-[#222] transition disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>

          <p className="text-sm text-center text-gray-500 mt-6">
            Not registered yet?{" "}
            <Link
              to="/register"
              className="text-black font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
