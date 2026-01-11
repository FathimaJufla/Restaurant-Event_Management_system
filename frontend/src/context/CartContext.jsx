import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  /* ================= IMAGE NORMALIZER ================= */
  const normalizeImage = (image) => {
    if (!image) return null;
    return image.startsWith("http")
      ? image
      : `http://127.0.0.1:8000${image}`;
  };

  /* ================= LOAD CART ON LOGIN ================= */
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [user]);

  /* ================= FETCH CART ================= */
  const fetchCart = async () => {
    try {
      const res = await api.get("orders/cart/");

      const mappedItems = res.data.items.map((item) => ({
        ...item.product,
        product_id: item.product.id,
        quantity: item.quantity,
        cart_item_id: item.id,
        image: normalizeImage(item.product.image),
      }));

      setCart(mappedItems);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    }
  };

  /* ================= ADD TO CART ================= */
  const addToCart = async (item) => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await api.post("orders/cart/add/", {
        product_id: item.id,
        quantity: 1,
      });

      fetchCart(); // refresh cart
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  /* ================= REMOVE FROM CART ================= */
  const removeFromCart = async (id) => {
    try {
      await api.post("orders/cart/remove/", {
        product_id: id,
      });

      fetchCart();
    } catch (error) {
      console.error("Failed to remove from cart", error);
    }
  };

  /* ================= UPDATE QUANTITY ================= */
  const updateQuantity = async (id, amount) => {
    const currentItem = cart.find((item) => item.id === id);
    if (!currentItem) return;

    const newQuantity = currentItem.quantity + amount;
    if (newQuantity < 1) return;

    try {
      await api.post("orders/cart/update_quantity/", {
        product_id: id,
        quantity: newQuantity,
      });

      fetchCart();
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  /* ================= TOTAL ITEMS ================= */
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
