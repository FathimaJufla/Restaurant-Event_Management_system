import { useEffect, useRef } from "react";
import { menuData } from "../data/menuData";

const MenuCarousel = ({ items = [] }) => {
  console.log("MenuCarousel received items:", items);
  const sliderRef = useRef(null);
  const directionRef = useRef(1); // 1 = forward, -1 = backward

  /* ================= AUTO SCROLL (PING-PONG) ================= */
  useEffect(() => {
    if (items.length === 0) return;
    const slider = sliderRef.current;
    if (!slider) return;

    const getCardWidth = () => {
      if (window.innerWidth < 640) return 220;
      if (window.innerWidth < 1024) return 260;
      return 300;
    };

    const interval = setInterval(() => {
      const cardWidth = getCardWidth();
      const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

      if (slider.scrollLeft >= maxScrollLeft - 5) {
        directionRef.current = -1;
      } else if (slider.scrollLeft <= 5) {
        directionRef.current = 1;
      }

      slider.scrollBy({
        left: cardWidth * directionRef.current,
        behavior: "smooth",
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [items]);

  /* ================= MANUAL CONTROLS ================= */
  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="py-10 sm:py-14 bg-[#fdfdfd]">

      {/* CAROUSEL WRAPPER */}
      <div className="relative max-w-[90rem] mx-auto group">

        {/* LEFT ARROW */}
        <button
          onClick={scrollLeft}
          className="
            hidden lg:flex
            absolute left-6 top-1/2 -translate-y-1/2 z-20
            w-12 h-12 rounded-full
            bg-white/70 backdrop-blur-sm
            border border-white/80
            items-center justify-center
            text-black
            opacity-0 group-hover:opacity-70
            transition-all duration-300
            hover:opacity-100 hover:scale-110
          "
        >
          ←
        </button>

        {/* SLIDER */}
        <div
          ref={sliderRef}
          className="
            flex gap-2
            overflow-x-auto scroll-smooth
            px-6 sm:px-14
            no-scrollbar
          "
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="
                min-w-[220px] sm:min-w-[260px] lg:min-w-[300px]
                h-[300px] sm:h-[360px]
                rounded-lg overflow-hidden relative
                group/card
              "
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />

              {/* HOVER OVERLAY */}
              <div
                className="
                  absolute inset-0 bg-black/60
                  flex flex-col justify-end p-4 sm:p-6
                  text-white opacity-0
                  group-hover/card:opacity-100
                  transition-opacity duration-300
                "
              >
                <h3 className="text-base sm:text-lg font-semibold">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-xs sm:text-sm text-gray-300">
                    {item.subtitle}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT ARROW */}
        <button
          onClick={scrollRight}
          className="
            hidden lg:flex
            absolute right-6 top-1/2 -translate-y-1/2 z-20
            w-12 h-12 rounded-full
            bg-white/70 backdrop-blur-sm
            border border-white/80
            items-center justify-center
            text-black
            opacity-0 group-hover:opacity-70
            transition-all duration-300
            hover:opacity-100 hover:scale-110
          "
        >
          →
        </button>

      </div>
    </section>
  );
};

export default MenuCarousel;
