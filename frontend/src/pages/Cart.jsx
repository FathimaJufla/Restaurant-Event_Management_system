import { Link } from "react-router-dom";
import CartImg from "../assets/images/empty-cart.avif";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  console.log("Cart Page Items:", cart);


  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ================= EMPTY CART ================= */
  if (cart.length === 0) {
    return (
      <div className="pt-40 min-h-screen flex flex-col items-center justify-center bg-[#fdfdfd] px-4 text-center">
        <img src={CartImg} alt="Empty Cart" className="w-80 mb-6" />

        <h2 className="text-2xl font-semibold mb-2">
          Your cart is empty
        </h2>

        <p className="text-gray-500 mb-10">
          Looks like you haven’t added anything yet
        </p>

        <Link
          to="/menu"
          className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-900 transition"
        >
          ⬅︎ Browse Menu
        </Link>
      </div>
    );
  }

  /* ================= CART PAGE ================= */
  return (
    <div className="pt-40 pb-32 bg-[#fdfdfd]">
      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-3xl font-serif mb-10">
          Your Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* CART ITEMS */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 bg-white rounded-xl shadow p-5"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-28 h-28 object-cover rounded-md"
                />

                <div className="flex-1">
                  <h3 className="font-medium text-lg">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    £{Number(item.price).toFixed(2)}
                  </p>

                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 border rounded"
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="bg-white rounded-xl shadow p-6 h-fit">
            <h3 className="text-xl font-semibold mb-6">
              Order Summary
            </h3>

            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span>£{totalPrice.toFixed(2)}</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-semibold text-lg mb-6">
              <span>Total</span>
              <span>£{totalPrice.toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              className="block text-center bg-black text-white py-3 rounded-md hover:bg-gray-900 transition"
            >
              Proceed to Checkout
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
