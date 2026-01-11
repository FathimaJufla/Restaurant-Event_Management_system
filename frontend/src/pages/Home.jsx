import heroImage from "../assets/images/hero-restaurant.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl text-center px-6">

          <p className="animate-fade-in text-[#f5e6c8] uppercase tracking-widest mb-4">
            Premium Indo-Chinese Cuisine
          </p>

          <h1 className="animate-fade-in-delay font-serif text-[48px] md:text-[64px] text-[#f5e6c8] mb-6">
            Taste the Tradition
          </h1>

          <h2 className="animate-fade-in-delay-2 text-xl md:text-2xl text-[#F5D000] mb-6">
            Comfort, Tradition & Excellence
          </h2>

          <p className="animate-fade-in-delay-3 text-[#f5e6c8] max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover signature Tawa specials and timeless Indo-Chinese recipes, served in an atmosphere of refined elegance.
          </p>

          <div className="animate-fade-in-delay-3 flex justify-center gap-6">
            <Link to="/menu">
              <button className="px-8 py-3 rounded-full bg-[#F5D000] text-black font-semibold hover:bg-[#D4B200] transition-all duration-300 hover:scale-105">
                Order Now
              </button>
            </Link>

            <Link to="/contact">
              <button className="px-8 py-3 rounded-full border border-[#F5D000] text-[#F5D000] hover:bg-[#F5D000] hover:text-black transition-all duration-300 hover:scale-105">
                Book Your Event
              </button>
            </Link>
          </div>

        </div>
      </section>

    </>
  );
};

export default Home;
