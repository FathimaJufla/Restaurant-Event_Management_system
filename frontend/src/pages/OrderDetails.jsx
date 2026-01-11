import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetchOrder();
  }, [id]);

  /* ================= FETCH ORDER ================= */
  const fetchOrder = async () => {
    try {
      const res = await api.get(`orders/${id}/`);
      setOrder(res.data);
    } catch (error) {
      console.error("Failed to fetch order", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="pt-40 text-center text-gray-500">
        Loading order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="pt-40 text-center text-gray-500">
        Order not found
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 bg-[#fdfdfd]">
      <div className="max-w-4xl mx-auto px-6">

        <button
          onClick={() => navigate("/orders")}
          className="text-sm text-gray-500 mb-6 hover:underline"
        >
          ← Back to Orders
        </button>

        <h1 className="text-3xl font-serif mb-8">
          Order #{order.id}
        </h1>

        {/* ORDER INFO */}
        <div className="mb-8 space-y-2 text-sm text-gray-600">
          <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
          <p>Order Type: {order.order_type}</p>
          <p>Status: <span className="font-medium">{order.status}</span></p>
        </div>

        {/* ITEMS */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="font-medium mb-4">Items</h2>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{item.product.title}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-medium">
                  £{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* TOTAL */}
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total</span>
          <span>£{Number(order.total_amount).toFixed(2)}</span>
        </div>

      </div>
    </div>
  );
}
