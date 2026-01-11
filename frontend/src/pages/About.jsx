import React from "react";
import Chefs from "../components/Chefs";
import heroImage from "../assets/images/menu-bg.jpg";

const AboutPage = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section
        className="relative h-[60vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-serif text-[#F5D000] mb-6 animate-fade-in">
            Our Story
          </h1>
          <p className="text-sm sm:text-lg tracking-widest font-bold text-[#f5e6c8] uppercase mt-7 animate-fade-in-delay">
            Discover the passion, heritage, and dedication behind our culinary journey
          </p>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-black mb-8 animate-fade-in">
            A Legacy of Excellence
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6 animate-fade-in-delay">
            Founded in 2010, our restaurant has been serving exceptional Indo-Chinese
            cuisine to our valued guests for over a decade. What began as a humble
            vision soon became a destination for unforgettable dining experiences.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6 animate-fade-in-delay-2">
            Our philosophy goes beyond food. We believe in thoughtful service,
            warm hospitality, and an atmosphere where tradition meets innovation.
            Every dish reflects our passion, heritage, and commitment to quality.
          </p>

          <p className="text-gray-700 leading-relaxed animate-fade-in-delay-3">
            Today, we continue to push culinary boundaries while honoring the
            timeless flavors our guests love.
          </p>
        </div>
      </section>

      {/* CHEFS SECTION */}
      <Chefs />

      {/* VALUES SECTION */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-serif text-[#F5D000] text-center mb-14">
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {/* QUALITY */}
            <div>
              <div className="w-16 h-16 mx-auto mb-5 rounded-full border border-[#F5D000] flex items-center justify-center text-[#F5D000]">
                ✓
              </div>
              <h3 className="text-xl font-semibold text-[#f5e6c8] mb-3">
                Quality
              </h3>
              <p className="text-gray-400">
                We source the finest ingredients and maintain uncompromising
                standards in every dish.
              </p>
            </div>

            {/* INNOVATION */}
            <div>
              <div className="w-16 h-16 mx-auto mb-5 rounded-full border border-[#F5D000] flex items-center justify-center text-[#F5D000]">
                ⚡
              </div>
              <h3 className="text-xl font-semibold text-[#f5e6c8] mb-3">
                Innovation
              </h3>
              <p className="text-gray-400">
                We blend tradition with creativity to craft flavors that surprise
                and delight.
              </p>
            </div>

            {/* COMMUNITY */}
            <div>
              <div className="w-16 h-16 mx-auto mb-5 rounded-full border border-[#F5D000] flex items-center justify-center text-[#F5D000]">
                ❤
              </div>
              <h3 className="text-xl font-semibold text-[#f5e6c8] mb-3">
                Community
              </h3>
              <p className="text-gray-400">
                We believe in creating a welcoming space where every guest feels
                like family.
              </p>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default AboutPage;
