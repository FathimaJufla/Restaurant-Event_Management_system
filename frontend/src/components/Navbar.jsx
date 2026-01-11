import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, User, LogOut } from "lucide-react";
import LogoImg from "../assets/images/logo.png";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black">
      <div className="max-w-[90rem] mx-auto px-6 py-5 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img
            src={LogoImg}
            alt="Logo"
            className="h-20 md:h-20 w-auto object-contain"
          />
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center space-x-10 text-[#f5e6c8] font-medium">

          <Link to="/"><li className="hover:text-[#F5D000]">Home</li></Link>
          <Link to="/menu"><li className="hover:text-[#F5D000]">Menu</li></Link>
          <Link to="/about"><li className="hover:text-[#F5D000]">About</li></Link>
          <Link to="/contact"><li className="hover:text-[#F5D000]">Contact</li></Link>
          <Link to="/reservations"><li className="hover:text-[#F5D000]">Reservations</li></Link>

          {/* Divider */}
          <li className="h-6 w-px bg-white/30"></li>

          {/* AUTH AREA */}
          {!user ? (
            /* BEFORE LOGIN */
            <Link
              to="/login"
              className="flex items-center gap-2 text-[#f5e6c8] hover:text-[#F5D000] transition"
            >
              <User size={18} />
              <span>Login</span>
            </Link>
          ) : (
            /* AFTER LOGIN */
            <div className="relative group cursor-pointer">
              <span className="flex items-center gap-2 text-[#f5e6c8] hover:text-[#F5D000] transition">
                <User size={18} />
                <span>Hi, {user.first_name}</span>
                <span className="text-xs">⌄</span>
              </span>

              {/* DROPDOWN */}
              <div
                className="
                    absolute right-0 mt-3 w-44
                    bg-white text-black rounded-lg shadow-lg
                    opacity-0 group-hover:opacity-100
                    invisible group-hover:visible
                    transition-all duration-200
                  "
              >
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  My Profile
                </Link>

                <Link
                  to="/orders"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  My Orders
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>

              </div>
            </div>
          )}

          {/* CART ICON (UNCHANGED) */}
          <Link to="/cart" className="relative hover:text-[#F5D000]">
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="
                absolute -top-2 -right-2
                bg-[#F5D000] text-black
                text-xs px-1.5 py-0.5
                rounded-full font-semibold
              ">
                {totalItems}
              </span>
            )}
          </Link>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
