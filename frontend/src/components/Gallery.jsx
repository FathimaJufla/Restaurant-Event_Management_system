import { useEffect, useState } from "react";

// images
import img1 from "../assets/images/chocolate-spring-rolls.jpeg";
import img2 from "../assets/images/brownie-ice-cream.jpeg";
import img3 from "../assets/images/cold-coffee.jpeg";
import img4 from "../assets/images/milkshake.jpeg";
import img5 from "../assets/images/mojito.jpeg";
import img6 from "../assets/images/pastry.jpeg";
import img7 from "../assets/images/fruit-salad.png";
import img8 from "../assets/images/event.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

const EventGallery = () => {
  const [start, setStart] = useState(0);

  // auto rotate
  useEffect(() => {
    const id = setInterval(() => {
      setStart((p) => (p + 1) % images.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // always take 7 images
  const imgs = images
    .slice(start)
    .concat(images.slice(0, start))
    .slice(0, 7);

  return (
    <section className="bg-[#fdfdfd] py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT COLUMN */}
          <div className="grid gap-4">
            <img
              src={imgs[0]}
              className="h-[460px] w-full object-cover rounded-xl transition-all duration-700"
              alt=""
            />
            <img
              src={imgs[1]}
              className="h-[220px] w-full object-cover rounded-xl transition-all duration-700"
              alt=""
            />
          </div>

          {/* MIDDLE COLUMN */}
          <div className="grid gap-6">
            <img
              src={imgs[2]}
              className="h-[220px] w-full object-cover rounded-xl"
              alt=""
            />
            <img
              src={imgs[3]}
              className="h-[220px] w-full object-cover rounded-xl"
              alt=""
            />
            <img
              src={imgs[4]}
              className="h-[220px] w-full object-cover rounded-xl"
              alt=""
            />
          </div>

          {/* RIGHT COLUMN */}
          <div className="grid gap-6">
            <img
              src={imgs[5]}
              className="h-[220px] w-full object-cover rounded-xl"
              alt=""
            />
            <img
              src={imgs[6]}
              className="h-[460px] w-full object-cover rounded-xl"
              alt=""
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default EventGallery;
