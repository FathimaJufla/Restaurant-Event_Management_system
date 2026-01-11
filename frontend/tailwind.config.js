/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        /* Fade animations */
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-delay": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "50%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-delay-2": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "75%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-delay-3": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "80%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },

        /* Arrow animation */
        arrowMove: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(6px)" },
        },
      },

      animation: {
        "fade-in": "fade-in 1s ease-out forwards",
        "fade-in-delay": "fade-in-delay 1.5s ease-out forwards",
        "fade-in-delay-2": "fade-in-delay-2 2s ease-out forwards",
        "fade-in-delay-3": "fade-in-delay-3 2.5s ease-out forwards",

        "arrowMove": "arrowMove 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
