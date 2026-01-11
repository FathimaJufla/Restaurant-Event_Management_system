import { useState, useRef, useEffect } from "react";
import MenuItem from "../components/MenuItem";
import MenuModal from "../components/MenuModal";

// category images
import allImg from "../assets/categories/all-item.png";
import maincourseImg from "../assets/categories/main-course.png";
import startersImg from "../assets/categories/starters.png";
import dessertsImg from "../assets/categories/desserts.png";
import drinksImg from "../assets/categories/drinks.png";

const categories = [
  { key: "all", label: "All", image: allImg },
  { key: "main", label: "Main Course", image: maincourseImg },
  { key: "drinks", label: "Drinks", image: drinksImg },
  { key: "starters", label: "Starters", image: startersImg },
  { key: "desserts", label: "Desserts", image: dessertsImg },
];

const MenuSection = ({ items = [] }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);

  const tabsRef = useRef([]);
  const underlineRef = useRef(null);

  /* ================= FILTER ITEMS ================= */
  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  /* ================= UNDERLINE ANIMATION ================= */
  useEffect(() => {
    const activeIndex = categories.findIndex(
      (cat) => cat.key === activeCategory
    );

    const activeTab = tabsRef.current[activeIndex];
    const underline = underlineRef.current;

    if (activeTab && underline) {
      const tabRect = activeTab.getBoundingClientRect();
      const parentRect = activeTab.parentElement.getBoundingClientRect();

      underline.style.left = `${
        tabRect.left -
        parentRect.left +
        tabRect.width / 2 -
        underline.offsetWidth / 2
      }px`;
    }
  }, [activeCategory]);

  return (
    <section id="menu" className="bg-[#fdfdfd] pb-20 animate-fade-in-delay-3">

      {/* ================= CATEGORY BAR ================= */}
      <div className="relative flex justify-center gap-14 py-8">

        {categories.map((cat, index) => (
          <button
            key={cat.key}
            ref={(el) => (tabsRef.current[index] = el)}
            onClick={() => setActiveCategory(cat.key)}
            className="flex flex-col items-center gap-3 group"
          >
            <img
              src={cat.image}
              alt={cat.label}
              className={`w-8 h-8 sm:w-9 sm:h-9 object-contain transition-opacity duration-300
                ${
                  activeCategory === cat.key
                    ? "opacity-100"
                    : "opacity-40 group-hover:opacity-70"
                }`}
            />

            <span
              className={`text-sm font-medium transition-colors duration-300
                ${
                  activeCategory === cat.key
                    ? "text-black"
                    : "text-gray-400 group-hover:text-black"
                }`}
            >
              {cat.label}
            </span>
          </button>
        ))}

        {/* SLIDING UNDERLINE */}
        <span
          ref={underlineRef}
          className="absolute bottom-0 h-[2px] w-16 bg-yellow-400 rounded transition-all duration-500 ease-in-out"
        />
      </div>

      {/* ================= CENTER DIVIDER ================= */}
      <div className="flex justify-center">
        <div className="h-[3px] w-[70%] bg-gray-300 rounded-full" />
      </div>

      {/* ================= MENU ITEMS ================= */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        {filteredItems.length === 0 ? (
          <p className="text-center text-gray-400">
            No items available
          </p>
        ) : (
          <div
            key={activeCategory}
            className="grid md:grid-cols-2 gap-12 animate-fade-in"
          >
            {filteredItems.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {selectedItem && (
        <MenuModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </section>
  );
};

export default MenuSection;
