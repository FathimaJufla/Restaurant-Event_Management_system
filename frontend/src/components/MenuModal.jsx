import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";


const MenuModal = ({ item, onClose }) => {
  console.log("MenuModal item:", item);
  const navigate = useNavigate();
  const { addToCart } = useCart();


  return (
    <div
      className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-xl w-full rounded-lg p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500"
        >
          ✕
        </button>

        <h2 className="font-serif text-2xl mb-4">{item.title}</h2>

        <img
          src={item.image}
          alt={item.title}
          className="w-full h-56 object-contain mb-6"
        />

        <p className="text-gray-600 mb-6">{item.description}</p>

        <div className="flex flex-wrap gap-2 mb-6 text-sm text-gray-500">
          {item.ingredients.map((ing, i) => (
            <span key={i}>{ing}</span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold text-yellow-500">
            £{Number(item.price).toFixed(2)}
          </span>

          <button
            onClick={() => {
              addToCart(item); // Context handles navigation if needed, or we check auth here
              onClose();
            }}
            className="bg-yellow-400 px-8 py-3 font-semibold hover:bg-yellow-500 transition"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
