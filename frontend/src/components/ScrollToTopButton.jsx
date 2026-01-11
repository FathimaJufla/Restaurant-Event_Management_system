import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="
        fixed bottom-6 right-6 z-50
        w-12 h-12 rounded-full
        bg-[#F5D000] text-black
        flex items-center justify-center
        shadow-lg
        hover:bg-[#D4B200]
        transition-all duration-300
        hover:scale-110
      "
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}
