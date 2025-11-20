"use client";

import Link from "next/link";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-brown-900 to-brown-950 border-t z-[99] border-brown-800 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          
          {/* Column 1 */}
          <div>
            <h2 className="text-3xl font-bold text-brown-200 mb-2">
              VASUNDHARA
            </h2>
            <p className="text-brown-400 mb-6">100% Pure Peanut Oil</p>

            <div className="flex gap-3">
              {[Facebook, Instagram, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-brown-700 flex items-center justify-center text-brown-200 hover:bg-brown-500 hover:text-white transition"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-semibold text-brown-300 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-brown-400">
              <li><Link href="/" className="hover:text-brown-200">Home</Link></li>
              <li><Link href="/about" className="hover:text-brown-200">About Us</Link></li>
              <li><Link href="/products" className="hover:text-brown-200">Our Products</Link></li>
              <li><Link href="/cart" className="hover:text-brown-200">My Cart</Link></li>
              <li><Link href="/contact" className="hover:text-brown-200">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-semibold text-brown-300 mb-4">Help</h3>
            <ul className="space-y-2 text-brown-400">
              <li><a className="hover:text-brown-200" href="#">FAQs</a></li>
              <li><a className="hover:text-brown-200" href="#">Shipping Policy</a></li>
              <li><a className="hover:text-brown-200" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-brown-200" href="#">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-lg font-semibold text-brown-300 mb-4">Contact</h3>
            <ul className="space-y-3 text-brown-400">
              <li>
                <strong className="text-brown-300 block">Address:</strong>
                Vasundhara Oil Factory <br /> Industrial Area, Gujarat
              </li>

              <li>
                <strong className="text-brown-300 block">Phone:</strong>
                +91 98765 43210
              </li>

              <li>
                <strong className="text-brown-300 block">Email:</strong>
                info@vasundharaoil.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-brown-700 mt-12 pt-6 text-center">
          <p className="text-sm text-brown-300">
            © {new Date().getFullYear()} Vasundhara Oil. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
