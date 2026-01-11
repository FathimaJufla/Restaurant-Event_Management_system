import { useState } from "react";
import api from "../services/api";
import Gallery from "../components/Gallery";

const timeSlots = [
  "17:00", "17:30", "18:00", "18:30", "19:00",
  "19:30", "20:00", "20:30", "21:00",
];

export default function Reservation() {

  /* ================= STATE ================= */
  const [step, setStep] = useState(1); // 1 = Details | 2 = Payment | 3 = Confirm

  const [form, setForm] = useState({
    date: "",
    guests: 2,
    time: "",
    name: "",
    email: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("stripe");

  /* ================= HELPERS ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid =
    form.date &&
    form.time &&
    form.name &&
    form.email &&
    form.phone;

  /* ================= UI ================= */
  return (
    <>
      <div className="pt-28 pb-32 bg-white">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-14 px-4">
          <h1 className="font-serif text-4xl md:text-5xl mb-4 mt-16 animate-fade-in">
            Table Reservations
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto animate-fade-in-delay">
            Secure your table at AN NAJEEB. A £10 booking fee is required to confirm your reservation.
          </p>

          {/* STEPS */}
          <div className="flex items-center justify-center gap-6 mt-10 animate-fade-in-delay-2">

            {/* STEP 1 */}
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold
                  ${step === 1
                    ? "border-lime-500 text-lime-500"
                    : "border-gray-300 text-gray-300"
                  }`}
              >
                1
              </div>
              <span className={step === 1 ? "text-lime-500 font-medium" : "text-gray-300"}>
                Details
              </span>
            </div>

            {/* LINE */}
            <div className="w-16 h-[2px] bg-gray-300"></div>

            {/* STEP 2 */}
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold
                  ${step === 2
                    ? "border-lime-500 text-lime-500"
                    : "border-gray-300 text-gray-300"
                  }`}
              >
                2
              </div>
              <span className={step === 2 ? "text-lime-500 font-medium" : "text-gray-300"}>
                Payment
              </span>
            </div>

            {/* LINE */}
            <div className="w-16 h-[2px] bg-gray-300"></div>

            {/* STEP 3 */}
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold
                  ${step === 3
                    ? "border-lime-500 text-lime-500"
                    : "border-gray-300 text-gray-300"
                  }`}
              >
                3
              </div>
              <span className={step === 3 ? "text-lime-500 font-medium" : "text-gray-300"}>
                Confirm
              </span>
            </div>

          </div>

        </div>

        {/* ================= STEP 1 : DETAILS ================= */}
        {step === 1 && (
          <div className="max-w-3xl mx-auto px-4 animate-fade-in-delay-3">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 space-y-8">

              {/* DATE & GUESTS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <input
                    type="date"
                    name="date"
                    onChange={handleChange}
                    className="w-full border rounded-md px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Guests</label>
                  <select
                    name="guests"
                    onChange={handleChange}
                    className="w-full border rounded-md px-4 py-3"
                  >
                    {[1, 2, 3, 4, 5, 6].map(n => (
                      <option key={n} value={n}>{n} People</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* TIME */}
              <div>
                <label className="block text-sm font-medium mb-3">Select Time</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setForm({ ...form, time })}
                      className={`border rounded-md py-2 text-sm
                        ${form.time === time
                          ? "bg-black text-white"
                          : "hover:border-black"
                        }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* USER DETAILS */}
              <input
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                className="w-full border rounded-md px-4 py-3"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  name="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  className="w-full border rounded-md px-4 py-3"
                />
                <input
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  className="w-full border rounded-md px-4 py-3"
                />
              </div>

              {/* BUTTON */}
              <button
                disabled={!isFormValid}
                onClick={() => setStep(2)}
                className={`w-full py-4 rounded-md font-semibold transition
                  ${isFormValid
                    ? "bg-black text-white hover:bg-gray-900"
                    : "bg-gray-400 text-white cursor-not-allowed"
                  }`}
              >
                Proceed to Payment
              </button>

            </div>
          </div>
        )}

        {/* ================= STEP 2 : PAYMENT ================= */}
        {step === 2 && (
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 space-y-6">

              {/* BOOKING SUMMARY */}
              <div className="border rounded-lg p-5 text-sm text-gray-700">
                <p><strong>Date:</strong> {form.date}</p>
                <p><strong>Time:</strong> {form.time}</p>
                <p><strong>Guests:</strong> {form.guests}</p>
                <p><strong>Name:</strong> {form.name}</p>
                <p><strong>Email:</strong> {form.email}</p>
                <p><strong>Phone:</strong> {form.phone}</p>

                <button
                  onClick={() => setStep(1)}
                  className="text-[#F5D000] mt-3 text-sm underline"
                >
                  Edit details
                </button>
              </div>

              {/* PAYMENT METHOD */}
              <div>
                <h3 className="font-medium mb-3">Select Payment Method</h3>

                <label className="flex items-center gap-3 border p-4 rounded mb-3 cursor-pointer">
                  <input
                    type="radio"
                    checked={paymentMethod === "stripe"}
                    onChange={() => setPaymentMethod("stripe")}
                  />
                  Stripe
                </label>

                <label className="flex items-center gap-3 border p-4 rounded cursor-pointer">
                  <input
                    type="radio"
                    checked={paymentMethod === "razorpay"}
                    onChange={() => setPaymentMethod("razorpay")}
                  />
                  Razorpay
                </label>
              </div>

              <button
                onClick={async () => {
                  try {
                    await api.post("reservations/", form);
                    setStep(3);
                  } catch (error) {
                    console.error("Reservation failed", error);
                    alert("Failed to make reservation. Please try again.");
                  }
                }}
                className="w-full py-4 rounded-md bg-black text-white font-semibold"
              >
                Pay £10 & Confirm
              </button>

            </div>
          </div>
        )}

        {/* ================= STEP 3 : CONFIRM ================= */}
        {step === 3 && (
          <div className="max-w-xl mx-auto px-4 text-center">
            <div className="bg-white rounded-2xl shadow-xl p-10">
              <h2 className="text-2xl font-semibold mb-4">
                🎉 Reservation Confirmed!
              </h2>
              <p className="text-gray-600">
                Your table has been successfully booked.
                <br />
                A confirmation email has been sent to <strong>{form.email}</strong>.
              </p>
            </div>
          </div>
        )}

      </div>

      <Gallery />
    </>
  );
}
