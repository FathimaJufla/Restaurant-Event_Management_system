import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    setForm({
      first_name: parsedUser.first_name || "",
      last_name: parsedUser.last_name || "",
      email: parsedUser.email || "",
      phone: parsedUser.phone || "",
      address: parsedUser.address || "",
    });
  }, []);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // 🔴 BACKEND API CALL LATER
      // await api.put("/profile/", form);

      // For now: update localStorage
      const updatedUser = { ...user, ...form };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      setEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  return (
    <div className="pt-32 pb-32 bg-[#fdfdfd]">
      <div className="max-w-3xl mx-auto px-6">

        <h1 className="text-3xl font-serif mb-10 mt-16">
          My Profile
        </h1>

        <div className="bg-white rounded-xl shadow p-8 space-y-6">

          {/* FIRST NAME */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              First Name
            </label>
            <input
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full border rounded-md px-4 py-3
                ${editing ? "bg-white" : "bg-gray-100 cursor-not-allowed"}`}
            />
          </div>

          {/* LAST NAME */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Last Name
            </label>
            <input
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full border rounded-md px-4 py-3
                ${editing ? "bg-white" : "bg-gray-100 cursor-not-allowed"}`}
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full border rounded-md px-4 py-3
                ${editing ? "bg-white" : "bg-gray-100 cursor-not-allowed"}`}
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Phone Number
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full border rounded-md px-4 py-3
                ${editing ? "bg-white" : "bg-gray-100 cursor-not-allowed"}`}
            />
          </div>

          {/* ADDRESS */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              disabled={!editing}
              rows={3}
              className={`w-full border rounded-md px-4 py-3 resize-none
                ${editing ? "bg-white" : "bg-gray-100 cursor-not-allowed"}`}
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-4 pt-4">
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-900"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={() => setEditing(false)}
                  className="px-6 py-2 border rounded-md"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-900"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
