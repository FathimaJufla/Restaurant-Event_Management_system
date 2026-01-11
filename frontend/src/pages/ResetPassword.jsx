import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";

export default function ResetPassword() {
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const uidb64 = searchParams.get('uid');
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!password) {
      alert("Please enter a new password");
      return;
    }

    try {
      setLoading(true);
      await api.post("auth/reset-password/", {
        token,
        uidb64,
        password,
        confirm_password: password,
      });
      alert("Password reset successful");
      navigate("/login");
    } catch (error) {
      alert("Invalid or expired reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4efe9] pt-28 px-4">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md text-center">
        <h2 className="text-xl font-semibold mb-6">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-4 py-3 rounded-md mb-4"
        />

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-md hover:bg-[#222] transition disabled:opacity-50"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}
