import { useState } from "react";
import api from "../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await api.post("auth/forgot-password/", { email });
      setSent(true);
    } catch (error) {
      alert("Unable to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4efe9] pt-28 px-4">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md text-center">
        {sent ? (
          <p className="text-green-600 font-medium">
            Reset link sent to your email
          </p>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-6">
              Forgot Password
            </h2>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border px-4 py-3 rounded-md mb-4"
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-md"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

