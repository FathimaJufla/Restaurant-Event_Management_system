import { useState } from "react";
import Feedback from "../components/Feedback.jsx";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

const faqs = [
  {
    question: "Do you serve Halal food?",
    answer: "Yes, all our meat is 100% HMC certified Halal.",
  },
  {
    question: "Is there parking available?",
    answer: "Yes, parking is available near the restaurant premises.",
  },
  {
    question: "Do I need to book a table?",
    answer:
      "Walk-ins are welcome, but we recommend booking in advance during peak hours.",
  },
];

export default function Contact() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      {/* PAGE WRAPPER */}
      <div className="pt-28 bg-white">

        {/* PAGE TITLE */}
        <h1 className="text-center font-serif text-4xl md:text-5xl mb-7 mt-14 animate-fade-in">
          Contact Us
        </h1>
        <p className="text-sm sm:text-lg tracking-widest uppercase font-bold text-black mb-16 text-center animate-fade-in-delay">We'd love to hear from you. Get in touch with us.</p>

        {/* CONTACT SECTION */}
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 mb-24 animate-fade-in-delay-2">

          {/* LEFT CARD */}
          <div className="bg-black text-white rounded-2xl p-10 shadow-xl">
            <h2 className="text-[#F5D000] text-2xl font-serif mb-8">
              Get in Touch
            </h2>

            <div className="space-y-6 text-gray-300">

              <div className="flex gap-4 items-start">
                <FaMapMarkerAlt className="text-[#F5D000] mt-1" />
                <p>
                  <span className="text-white font-medium">Address</span><br />
                  123 Culinary Avenue, Food City, FC1 2BA
                </p>
              </div>

              <div className="flex gap-4 items-start">
                <FaPhoneAlt className="text-[#F5D000] mt-1" />
                <p>
                  <span className="text-white font-medium">Phone</span><br />
                  +44 20 1234 5678
                </p>
              </div>

              <div className="flex gap-4 items-start">
                <FaEnvelope className="text-[#F5D000] mt-1" />
                <p>
                  <span className="text-white font-medium">Email</span><br />
                  info@annajeeb.com
                </p>
              </div>

              <div className="flex gap-4 items-start">
                <FaClock className="text-[#F5D000] mt-1" />
                <p>
                  <span className="text-white font-medium">Opening Hours</span><br />
                  Monday – Sunday: 12:00 PM – 11:00 PM
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT MAP */}
          <div className="rounded-2xl overflow-hidden shadow-xl bg-gray-100 flex items-center justify-center">
            <div className="text-gray-600 bg-white px-6 py-4 rounded-lg shadow">
              Google Maps Integration Placeholder
            </div>
          </div>

        </section>

        {/* FEEDBACK FORM */}
        <Feedback />

        {/* FAQ SECTION */}
        <section className="max-w-4xl mx-auto px-6 mb-32">

          <h2 className="text-center font-serif text-4xl mb-14">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => {
              const isOpen = activeIndex === index;

              return (
                <div
                  key={index}
                  className="border rounded-xl p-6 cursor-pointer transition hover:shadow"
                  onClick={() =>
                    setActiveIndex(isOpen ? null : index)
                  }
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-lg">
                      {faq.question}
                    </h3>
                    <span className="text-[#F5D000] text-xl">
                      {isOpen ? <FaTimes /> : <FaPlus />}
                    </span>
                  </div>

                  {isOpen && (
                    <p className="mt-4 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

        </section>
      </div>
    </>
  );
}
