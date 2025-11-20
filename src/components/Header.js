"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Navbar({ totalItems = 0 }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setMenuOpen(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const isActive = (path) => pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Health Benefits", path: "/health" },
    { name: "Our Products", path: "/products" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-sky-700 to-sky-500 border-gray-800 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="relative max-w-6xl mx-auto px-4 py-6 md:px-6 md:py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="logo.png"
              alt="Vasundhara Logo"
              className="w-20 h-10 lg:w-50 lg:h-22"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative group pb-1 font-semibold text-lg transition-colors duration-300 ${
                  isActive(link.path)
                    ? "text-yellow-500"
                    : "text-white hover:text-yellow-500"
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-yellow-500 transition-all duration-300 ease-in-out ${
                    isActive(link.path)
                      ? "w-full opacity-100"
                      : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                  }`}
                ></span>
              </Link>
            ))}

            {/* Contact Us Button (Desktop) */}
            <Link
              href="/contact"
              className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-yellow-400 transition"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-white hover:text-yellow-500 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="lg:w-6 lg:h-6 h-5 w-5" />
            ) : (
              <Menu className="lg:w-6 lg:h-6 h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`absolute left-0 right-0 top-full mt-2 mx-4 bg-gray-800 rounded-lg shadow-lg transition-all duration-500 ease-in-out overflow-hidden ${
            menuOpen
              ? "opacity-100 translate-y-0 max-h-80"
              : "opacity-0 -translate-y-2 max-h-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col space-y-4 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMenuOpen(false)}
                className={`relative group pb-1 text-base font-medium transition-colors duration-300 ${
                  isActive(link.path)
                    ? "text-yellow-500"
                    : "text-white hover:text-yellow-500"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Contact Us - Mobile */}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg text-center shadow-md hover:bg-yellow-400 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
