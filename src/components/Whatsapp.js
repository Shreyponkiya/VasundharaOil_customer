"use client";
import { useEffect, useState } from "react";

export default function WhatsAppButton() {
  const [label, setLabel] = useState("For Order"); // default English text

  // Alternate text between English and Gujarati every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLabel((prevLabel) =>
        prevLabel === "For Order" ? "ઓર્ડર માટે" : "For Order"
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <a
      href="https://wa.me/9023976061" 
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-2xl shadow-xl z-[99999] flex items-center gap-3"
    >
      <span className="text-lg font-semibold">{label}</span>

      <img
        src="/whatsapp.png"
        alt="WhatsApp"
        className="w-8 h-8"
      />
    </a>
  );
}