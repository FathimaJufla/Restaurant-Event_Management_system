import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import Logo2 from "../assets/images/logo2.png";


export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (form.password !== form.confirm_password) {
      alert("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (!form.email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      await api.post("auth/register/", form);
      navigate("/");
    } catch (error) {
      console.error("Registration error", error);
      if (error.response && error.response.data) {
        // Backend returns object with field errors, e.g. { email: ["Enter a valid email."], non_field_errors: [...] }
        const messages = Object.values(error.response.data).flat().join("\n");
        alert("Registration failed:\n" + messages);
      } else {
        alert("Registration failed. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#f4efe9] pt-28 px-4">
        <div className="w-full max-w-4xl min-h-[520px] bg-white rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

          {/* LEFT */}
          <div className="bg-black p-10 flex flex-col justify-between">
            <div className="w-52">
              <img src={Logo2} alt="logo" />
            </div>

            <div>
              <h3 className="text-white text-3xl font-serif mb-4">
                Join Us.
              </h3>
              <p className="text-gray-400">
                Create your account to enjoy seamless dining and reservations.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="p-10">
            <h3 className="text-xl font-semibold mb-8 text-gray-800">
              Create Account
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input name="first_name" placeholder="First Name" onChange={handleChange} className="border px-4 py-3 rounded-md" />
                <input name="last_name" placeholder="Last Name" onChange={handleChange} className="border px-4 py-3 rounded-md" />
              </div>

              <input name="email" placeholder="Email" onChange={handleChange} className="border px-4 py-3 rounded-md w-full" />
              <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border px-4 py-3 rounded-md w-full" />
              <input name="confirm_password" type="password" placeholder="Confirm Password" onChange={handleChange} className="border px-4 py-3 rounded-md w-full" />

              <button
                onClick={handleRegister}
                className="w-full bg-black text-white py-3 rounded-md mt-4"
              >
                Sign Up
              </button>
            </div>

            <p className="text-sm text-center mt-6">
              Already have an account?{" "}
              <Link to="/login" className="font-medium underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
