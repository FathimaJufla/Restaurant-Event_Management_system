import menu1 from "../assets/images/fruit-salad.png";
import menu2 from "../assets/images/cold-coffee.jpeg";
import menu3 from "../assets/images/milkshake.jpeg";
import menu4 from "../assets/images/brownie-ice-cream.jpeg";
import menu5 from "../assets/images/gulab-jamun.jpeg";
import menu6 from "../assets/images/chocolate-spring-rolls.jpeg";
import menu7 from "../assets/images/mojito.jpeg";
import menu8 from "../assets/images/pastry.jpeg";

export const menuData = [
  {
    id: 1,
    title: "Fruit Salad with Ice Cream",
    subtitle: "Fresh seasonal fruits with vanilla ice cream",
    description:
      "A refreshing mix of freshly cut seasonal fruits served with creamy vanilla ice cream.",
    price: 6.5,
    category: "desserts",
    image: menu1,
    ingredients: ["Seasonal Fruits", "Vanilla Ice Cream"],
    featured: true,
  },
  {
    id: 2,
    title: "Cold Coffee",
    subtitle: "Chilled creamy coffee with rich café flavor",
    description:
      "Smooth and creamy cold coffee blended with milk and ice.",
    price: 4.0,
    category: "drinks",
    image: menu2,
    ingredients: ["Coffee", "Milk", "Ice"],
    featured: true,
  },
  {
    id: 3,
    title: "Chocolate Milkshake",
    subtitle: "Thick, creamy shake blended to perfection",
    description:
      "A thick chocolate milkshake made with premium chocolate.",
    price: 5.0,
    category: "drinks",
    image: menu3,
    ingredients: ["Chocolate", "Milk", "Ice Cream"],
    featured: true,
  },
  {
    id: 4,
    title: "Brownie with Ice Cream",
    subtitle: "Rich brownie topped with vanilla ice cream",
    description:
      "Warm chocolate brownie served with smooth vanilla ice cream.",
    price: 7.5,
    category: "desserts",
    image: menu4,
    ingredients: ["Chocolate Brownie", "Vanilla Ice Cream"],
    featured: true,
  },
  {
    id: 5,
    title: "Gulab Jamun with Ice Cream",
    subtitle: "Warm gulab jamun with chilled ice cream",
    description:
      "Soft gulab jamuns paired with chilled vanilla ice cream.",
    price: 6.5,
    category: "desserts",
    image: menu5,
    ingredients: ["Gulab Jamun", "Vanilla Ice Cream"],
    featured: false,
  },
  {
    id: 6,
    title: "Chocolate Spring Rolls",
    subtitle: "Crispy rolls with melted chocolate filling",
    description:
      "Golden fried spring rolls filled with rich melted chocolate.",
    price: 6.0,
    category: "desserts",
    image: menu6,
    ingredients: ["Chocolate", "Spring Roll Sheets"],
    featured: false,
  },
  {
    id: 7,
    title: "Mojito",
    subtitle: "Refreshing blend of mint, lime & fizz",
    description:
      "A refreshing drink made with fresh mint and lime juice.",
    price: 4.5,
    category: "drinks",
    image: menu7,
    ingredients: ["Mint", "Lime", "Soda"],
    featured: false,
  },
  {
    id: 8,
    title: "Black Forest / White Forest Pastry",
    subtitle: "Soft layered pastry with rich cream",
    description:
      "Soft layered pastry topped with fresh cream and chocolate.",
    price: 5.5,
    category: "desserts",
    image: menu8,
    ingredients: ["Chocolate", "Cream", "Cake Base"],
    featured: false,
  },
];
