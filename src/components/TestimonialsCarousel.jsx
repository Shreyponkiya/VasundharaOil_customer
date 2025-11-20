"use client";

import { useState, useEffect, useRef } from "react";

export default function TestimonialsCarousel() {
  const testimonials = [
    { text: "The best peanut oil I've ever used. The flavor is amazing!", name: "Priya Sharma" },
    { text: "Our restaurant uses only Vasundhara. Customers love the taste!", name: "Rajesh Kumar" },
    { text: "Pure, healthy and premium quality oil for every household.", name: "Anita Desai" },
    { text: "Affordable and exceptional aroma. My family loves it!", name: "Mehul Patel" },
    { text: "Great quality — better than any oil I've used before.", name: "Nidhi Thakkar" },
  ];

  const [index, setIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const timeoutRef = useRef(null);

  const updateItemsPerView = () => {
    if (window.innerWidth >= 1024) setItemsPerView(3);
    else if (window.innerWidth >= 640) setItemsPerView(2);
    else setItemsPerView(1);
  };

  useEffect(() => {
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  useEffect(() => {
    const total = Math.ceil(testimonials.length / itemsPerView);
    const next = (index + 1) % total;
    timeoutRef.current = setTimeout(() => setIndex(next), 3500);
    return () => clearTimeout(timeoutRef.current);
  }, [index, itemsPerView]);

  const totalSlides = Math.ceil(testimonials.length / itemsPerView);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="flex-none w-full flex gap-6">
              {testimonials
                .slice(slideIndex * itemsPerView, (slideIndex + 1) * itemsPerView)
                .map((item, i) => (
                  <div key={i} className="flex-1">
                    <div className="p-8 rounded-2xl bg-white shadow-lg border border-blue-200 hover:shadow-2xl">
                      <p className="text-gray-700 italic mb-4">"{item.text}"</p>
                      <p className="text-blue-700 font-semibold text-center text-lg">
                        - {item.name}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === index ? "bg-blue-600 scale-110" : "bg-blue-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
