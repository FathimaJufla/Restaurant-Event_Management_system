import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetchOrders();
  }, []);

  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {
    try {
      const res = await api.get("orders/");
      console.log("Orders API response:", res.data);
      if (Array.isArray(res.data)) {
        setOrders(res.data);
      } else if (res.data.results && Array.isArray(res.data.results)) {
        setOrders(res.data.results);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="pt-40 text-center text-gray-500">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 bg-[#fdfdfd]">
      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-3xl font-serif mb-12 mt-10">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <p className="text-gray-500">
            You have not placed any orders yet.
          </p>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order.id}
                onClick={() => navigate(`/orders/${order.id}`)}
                className="bg-white rounded-xl shadow p-6 cursor-pointer hover:shadow-lg transition"
              >
                {/* HEADER */}
                <div className="flex justify-between items-center mb-5">
                  <div>
                    <p className="font-medium">
                      Order ID: {order.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()} • {order.order_type}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                      ${order.status === "CONFIRMED"
                        ? "bg-green-100 text-green-700"
                        : order.status === "PREPARING"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "DELIVERED"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* FOOTER */}
                <div className="flex justify-between items-center">
                  <p className="font-semibold">
                    Total: £{Number(order.total_amount).toFixed(2)}
                  </p>

                  <p className="text-sm text-gray-500">
                    View Details →
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Orders;
