import { useState } from "react";
import api from "../services/api";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    subject: "",
    email: "",
    message: "",
    copy: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const isFormValid =
    form.name &&
    form.subject &&
    form.email &&
    form.message;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
      await api.post("contact/", form);
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to send message", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen bg-[#fdfdfd] pt-32 pb-24"
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADING */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-4xl mb-4">
            Feel free to drop us a line!
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Let's talk if you have any query or suggestion. We are open to learn from you. So don't hesitate to reach us anytime.
          </p>
        </div>

        {/* SUCCESS MESSAGE */}
        {submitted ? (
          <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-10 text-center">
            <h3 className="text-2xl font-semibold mb-3">
              🎉 Message Sent!
            </h3>
            <p className="text-gray-600">
              Thank you for reaching out. We’ll get back to you shortly.
            </p>
          </div>
        ) : (

          /* FORM */
          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-10"
          >

            {/* LEFT */}
            <div className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-5 py-4 focus:outline-none focus:border-black"
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-5 py-4 focus:outline-none focus:border-black"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-5 py-4 focus:outline-none focus:border-black"
              />

              <label className="flex items-center gap-3 text-gray-600 text-sm">
                <input
                  type="checkbox"
                  name="copy"
                  checked={form.copy}
                  onChange={handleChange}
                  className="accent-black"
                />
                Send me a copy
              </label>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-6">
              <textarea
                name="message"
                rows="8"
                placeholder="Type your message here"
                value={form.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-5 py-4 resize-none focus:outline-none focus:border-black"
              />

              <button
                type="submit"
                disabled={!isFormValid}
                className={`self-start px-10 py-4 rounded-md tracking-widest transition
                  ${isFormValid
                    ? "bg-black text-white hover:bg-gray-900"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                GIVE US A SHOT
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};

export default Contact;
