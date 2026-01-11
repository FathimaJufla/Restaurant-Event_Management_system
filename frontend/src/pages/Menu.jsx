import React, { useState, useEffect } from 'react'
import MenuCarousel from '../components/MenuCarousel'
import MenuSection from '../components/MenuSection'
import api from '../services/api'

function Menu() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('products/');
        console.log("Menu: API Response Data:", res.data);
        const featured = res.data.filter(p => p.featured);
        console.log("Menu: Featured items:", featured);
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <div className="text-center mb-16 px-4 mt-40">
        <p className="text-sm sm:text-lg tracking-widest font-bold text-black mt-6 animate-fade-in">
          MENU
        </p>
        <h2 className="font-serif text-3xl sm:text-[52px] mt-6 animate-fade-in-delay">
          Taste Our Foods & Enjoy
        </h2>
        <p className="text-sm sm:text-lg tracking-widest font-bold text-black mt-6 animate-fade-in-delay-2">
          POPULAR DISHES
        </p>
      </div>
      <MenuCarousel items={products.filter(p => p.featured)} />
      <MenuSection items={products} />
    </>
  )
}

export default Menu
