import React from 'react';
import chef1 from '../assets/images/chef-1.jpg';
import chef2 from '../assets/images/chef-2.jpg';
import chef3 from '../assets/images/chef-3.jpg';
import chef4 from '../assets/images/chef-4.jpg';

const chefs = [
  {
    name: 'Chef Michael Anderson',
    role: 'Executive Chef',
    image: chef1,
    bio: 'With over 20 years of experience in fine dining, Chef Michael brings his passion for French cuisine and innovative techniques to Gourmet Delight.',
  },
  {
    name: 'Chef Sarah Chen',
    role: 'Sous Chef',
    image: chef2,
    bio: 'Specializing in Asian fusion cuisine, Chef Sarah combines traditional techniques with modern presentation to create unforgettable dishes.',
  },
  {
    name: 'Chef Marco Rossi',
    role: 'Pastry Chef',
    image: chef3,
    bio: 'A master of desserts and pastries, Chef Marco creates sweet masterpieces that are both visually stunning and delicious.',
  },
  {
    name: 'Chef Isabella Martinez',
    role: 'Saucier',
    image: chef4,
    bio: 'Known for her exceptional sauces and stocks, Chef Isabella adds depth and complexity to every dish she creates.',
  },
];

const Chefs = () => {
  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold text-secondary mb-4">
            Meet Our Chefs
          </h2>
          <p className="text-lg text-chocolate max-w-2xl mx-auto">
            Our talented team of culinary experts brings together decades of experience
            and passion for creating exceptional dining experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {chefs.map((chef, index) => (
            <div
              key={chef.name}
              className="bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative h-64">
                <img
                  src={chef.image}
                  alt={chef.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3">
                    <h3 className="text-xl font-bold text-white mb-1">{chef.name}</h3>
                    <p className="text-gold-light text-sm">{chef.role}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-chocolate">{chef.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Chefs; 