"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar({ totalItems = 0 }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll < lastScrollY || currentScroll < 10) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setMenuOpen(false);
      }

      setLastScrollY(currentScroll);
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
      className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-sky-700 to-sky-500 shadow-md transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              width={120}
              height={50}
              alt="Vasundhara Logo"
              priority
              className="object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative group pb-1 font-medium text-lg transition-colors ${
                  isActive(link.path)
                    ? "text-yellow-300"
                    : "text-white hover:text-yellow-300"
                }`}
              >
                {link.name}

                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-yellow-300 transition-all duration-300 ${
                    isActive(link.path)
                      ? "w-full opacity-100"
                      : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                  }`}
                />
              </Link>
            ))}

            <Link
              href="/contact"
              className="bg-yellow-400 text-black px-5 py-2.5 rounded-lg font-semibold shadow hover:bg-yellow-300 transition"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden bg-gray-900 rounded-lg mt-3 transition-all duration-500 ${
            menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-5 p-5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMenuOpen(false)}
                className={`font-medium text-base ${
                  isActive(link.path)
                    ? "text-yellow-300"
                    : "text-white hover:text-yellow-300"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg text-center shadow hover:bg-yellow-300 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
