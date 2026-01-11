import LogoImg from "../assets/images/logo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function FooterMain() {
  return (
    <footer className="bg-black text-white">
      {/* ================= INFO BAR ================= */}
      <div className="bg-[#F5D000] text-black">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* OPENING HOURS — LEFT */}
          <div className="flex items-center justify-center md:justify-start gap-3 text-center md:text-left">
            <span className="text-xl">🕒</span>
            <div>
              <p className="font-semibold">Opening Hours</p>
              <p className="text-sm">Mon–Sun: 12pm – 11pm</p>
            </div>
          </div>
          {/* LOCATION — RIGHT */}
          <div className="flex items-center justify-center md:justify-end gap-3 text-center md:text-right">
            <div className="order-2 md:order-1">
              <p className="font-semibold">Services</p>
              <p className="text-sm">Dine-in, Takeaway & Delivery</p>
            </div>
            <span className="text-xl order-1 md:order-2">🍽️</span>
          </div>

        </div>
      </div>


      {/* ================= TOP CTA STRIP ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#222]">

        {/* ORDER NOW */}
        <div className="bg-[#111111] flex items-center justify-center gap-6 py-10 md:border-r border-[#222]">
          <div className="w-14 h-14 rounded-full border border-[#F5D000] flex items-center justify-center text-[#F5D000]">
            <FaPhoneAlt />
          </div>
          <div>
            <p className="text-sm tracking-widest text-gray-400">
              ORDER NOW
            </p>
            <a href="tel:+918100666444">
              <p className="text-[#F5D000] text-xl font-semibold flex items-center gap-2 hover:opacity-80 transition">
                +91 8100 666 444
                <span className="inline-block animate-arrowMove">→</span>
              </p>
            </a>
          </div>
        </div>

        {/* SUPPORT */}
        <div className="bg-[#111111] flex items-center justify-center gap-6 py-10">
          <div className="w-14 h-14 rounded-full border border-[#F5D000] flex items-center justify-center text-[#F5D000]">
            <FaEnvelope />
          </div>
          <div>
            <p className="text-sm tracking-widest text-gray-400">
              NEED SUPPORT
            </p>
            <a href="mailto:info@annajeeb.com">
              <p className="text-[#F5D000] text-xl font-semibold flex items-center gap-2 hover:opacity-80 transition">
                Ready To Help
                <span className="inline-block animate-arrowMove">→</span>
              </p>
            </a>
          </div>
        </div>
      </div>

      {/* ================= MAIN FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <img src={LogoImg} alt="AN NAJEEB" className="w-48 mb-4" />
          <p className="text-gray-400 text-sm leading-relaxed">
            Experience premium Indo-Chinese cuisine in an elegant atmosphere.
            Perfect for family dining, events, and celebrations.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-[#F5D000] font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/menu" className="hover:text-[#F5D000] transition">
                Menu
              </Link>
            </li>
            <li>
              <Link to="/reservations" className="hover:text-[#F5D000] transition">
                Reservations
              </Link>
            </li>
            <li>
              <Link to="/catering" className="hover:text-[#F5D000] transition">
                Events
              </Link>
            </li>
            <li>
              <Link to="/menu" className="hover:text-[#F5D000] transition">
                Order Online
              </Link>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h4 className="text-[#F5D000] font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/about" className="hover:text-[#F5D000] transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#F5D000] transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-[#F5D000] transition">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-[#F5D000] font-semibold mb-4">Contact</h4>
          <p className="text-gray-400 text-sm mb-2">
            123 Culinary Avenue <br />
            London, FC1 2BA
          </p>
          <p className="text-gray-400 text-sm mb-2">
            info@annajeeb.com
          </p>
          <p className="text-[#F5D000] font-semibold mb-4">
            +44 20 1234 5678
          </p>

          {/* SOCIAL */}
          <div className="flex gap-4 text-gray-400 text-lg">
            <a href="#" className="hover:text-[#F5D000] transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-[#F5D000] transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-[#F5D000] transition">
              <FaTwitter />
            </a>
          </div>
        </div>

      </div>

      {/* ================= COPYRIGHT ================= */}
      <div className="border-t border-[#222] py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          <div className="w-24 hidden md:block"></div>

          <div className="text-center text-gray-500 text-sm flex-1">
            © {new Date().getFullYear()} AN NAJEEB Restaurant. All Rights Reserved.
          </div>

          <div className="w-24 text-right">
            <a
              href="/staff-login"
              className="text-sm text-gray-400 hover:text-[#F5D000] transition"
            >
              Staff Login
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
}
