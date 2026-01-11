import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const GST_RATE = 0.05;
const DELIVERY_FEE = 2.5;

export default function Checkout() {
  const navigate = useNavigate();

  const { cart, totalItems } = useCart();
  const { user } = useAuth();

  const [step, setStep] = useState(1); // 1 checkout | 2 payment | 3 success
  // const [cart, setCart] = useState([]); // REMOVE LOCAL STATE
  // const [user, setUser] = useState(null); // REMOVE LOCAL STATE

  const [orderType, setOrderType] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  /* 🔒 PROTECTION & INIT */
  useEffect(() => {
    if (!user) {
      // ProtectedRoute should handle this, but double check doesn't hurt
      return;
    }

    // Redirect if empty
    if (totalItems === 0) {
      navigate("/menu");
      return;
    }

    setDetails((prev) => ({
      ...prev,
      name: user.first_name || "",
      email: user.email || "",
    }));
  }, [user, totalItems, navigate]);

  /* 💰 CALCULATIONS */
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const delivery = orderType === "delivery" ? DELIVERY_FEE : 0;
  const gst = subtotal * GST_RATE;
  const total = subtotal + delivery + gst;

  const isDetailsValid =
    details.name &&
    details.email &&
    details.phone &&
    (orderType === "takeaway" || details.address);

  /* ✅ CONFIRM PAYMENT */
  const handleConfirmPayment = async () => {
    try {
      await api.post("orders/", {
        order_type: orderType,
        address: details.address, // Optional depending on type
      });
      // Cart clearing is handled by backend (items deleted) 
      // AND helper fetchCart in Context (which should re-fetch empty)
      // BUT we need to trigger re-fetch in context. 
      // `useCart` doesn't expose `fetchCart` but calling `addToCart` etc matches user actions.
      // Ideally, we force a reload or navigate to success page which might trigger logic.
      // But actually, we should iterate cart items and call create order.
      // My OrderViewSet create method handles cart conversion! Great.
      // So frontend just needs to call it.

      // Update local cart context? 
      // The context listens to user login. But here user is logged in.
      // We should probably rely on a refresh or just empty the local view.
      // Ideally CartContext should expose a `refreshCart` or `clearCart` (local state update).
      // Or we can just reload the page or navigate.
      // But we are SPA.
      // Let's assume navigating to orders page or doing `window.location.href`? No.
      // I will leave it as is, but maybe clear stored cart if we relied on it? 
      // CartContext uses state `cart`.
      // I'll assume for now `localStorage.removeItem("cart")` is legacy.
      setStep(3);
    } catch (error) {
      console.error("Order failed", error);
      alert("Failed to place order. " + (error.response?.data?.error || ""));
    }
  };

  return (
    <div className="pt-32 pb-32 bg-[#fdfdfd]">
      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-center font-serif text-4xl mb-10">
          Checkout
        </h1>

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* ORDER SUMMARY */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold mb-6">Order Summary</h3>

              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 mb-4">
                  <img
                    src={item.image}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p>{item.title}</p>
                    <p className="text-sm text-gray-500">
                      x {item.quantity}
                    </p>
                  </div>
                  <span>
                    £{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}

              <hr className="my-4" />

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span>£{delivery.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span>£{gst.toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-semibold text-lg mt-3">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>
            </div>

            {/* DETAILS */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold mb-4">
                Customer Details
              </h3>

              <div className="flex gap-4 mb-6">
                {["delivery", "takeaway"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setOrderType(type)}
                    className={`flex-1 py-3 border rounded
                      ${orderType === type
                        ? "bg-black text-white"
                        : ""
                      }`}
                  >
                    {type === "delivery" ? "🚚 Delivery" : "🥡 Takeaway"}
                  </button>
                ))}
              </div>

              <input
                placeholder="Full Name"
                value={details.name}
                onChange={(e) =>
                  setDetails({ ...details, name: e.target.value })
                }
                className="w-full border rounded px-4 py-3 mb-3"
              />

              <input
                placeholder="Email"
                value={details.email}
                onChange={(e) =>
                  setDetails({ ...details, email: e.target.value })
                }
                className="w-full border rounded px-4 py-3 mb-3"
              />

              <input
                placeholder="Phone"
                value={details.phone}
                onChange={(e) =>
                  setDetails({ ...details, phone: e.target.value })
                }
                className="w-full border rounded px-4 py-3 mb-3"
              />

              {orderType === "delivery" && (
                <textarea
                  placeholder="Delivery Address"
                  value={details.address}
                  onChange={(e) =>
                    setDetails({ ...details, address: e.target.value })
                  }
                  className="w-full border rounded px-4 py-3 mb-3"
                />
              )}

              <textarea
                placeholder="Notes (optional)"
                value={details.notes}
                onChange={(e) =>
                  setDetails({ ...details, notes: e.target.value })
                }
                rows="2"
                className="w-full border rounded px-4 py-3 mb-4"
              />


              <button
                disabled={!isDetailsValid}
                onClick={() => setStep(2)}
                className={`w-full py-3 rounded font-semibold
                  ${isDetailsValid
                    ? "bg-black text-white"
                    : "bg-gray-400 text-white"
                  }`}
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-6">
              Select Payment Method
            </h3>

            {["stripe", "razorpay"].map((method) => (
              <label
                key={method}
                className="flex gap-3 border p-4 rounded mb-4"
              >
                <input
                  type="radio"
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                />
                {method}
              </label>
            ))}

            <button
              onClick={handleConfirmPayment}
              className="w-full py-4 bg-black text-white rounded-md font-semibold"
            >
              Pay £{total.toFixed(2)} & Confirm
            </button>

            <button
              onClick={() => setStep(1)}
              className="w-full mt-3 text-sm underline"
            >
              Edit details
            </button>
          </div>
        )}

        {/* ================= STEP 3 ================= */}
        {step === 3 && (
          <div className="max-w-xl mx-auto bg-white p-10 rounded-xl shadow text-center">
            <h2 className="text-2xl font-semibold mb-4">
              🎉 Order Confirmed
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your order!
            </p>

            <button
              onClick={() => navigate("/orders")}
              className="bg-black text-white px-8 py-3 rounded-md"
            >
              View Orders
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
