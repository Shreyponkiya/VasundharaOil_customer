"use client";
import { useEffect } from "react";
import {
  Leaf,
  Factory,
  ShieldCheck,
  Users,
  Store,
  BadgeCheck,
} from "lucide-react";
import ProcessSection from "@/components/ProcessSection";
export const metadata = {
  title: "Home | My Website",
  description:
    "Welcome to our official website. Learn more about us and our products.",
  keywords: ["Home", "Best Products", "Company"],
};

export default function Home() {
  useEffect(() => {
    const initAOS = async () => {
      const AOS = await import("aos");
      const style = document.createElement("link");
      style.rel = "stylesheet";
      style.href = "https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css";
      document.head.appendChild(style);

      AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: false,
        mirror: true,
        offset: 100,
      });

      setTimeout(() => {
        AOS.refresh();
      }, 200);
    };

    initAOS();
  }, []);

  return (
    <main className="w-full bg-yellow-100 overflow-hidden">
      {/* ⭐ HERO SECTION ⭐ */}
      <section className="relative w-full overflow-hidden">
        <img
          src="about_section.jpg"
          alt="Home Banner"
          className="w-full h-auto object-contain sm:object-cover sm:h-[120vh]"
        />
      </section>

      {/* ⭐ MOVING MARQUEE ⭐ */}
      <section className="w-full overflow-hidden bg-yellow-200 py-4">
        <div className="inline-block whitespace-nowrap animate-marquee text-xl md:text-2xl font-semibold text-gray-900">
          ★ 100% Pure Cold-Pressed Oils • Freshness Guaranteed • Trusted by
          5,00,000+ Families • Premium Quality You Can Taste ★ 100% Pure
          Cold-Pressed Oils • Freshness Guaranteed • Trusted by 5,00,000+
          Families • Premium Quality You Can Taste ★
        </div>
      </section>

      {/* ⭐ ABOUT SECTION 1 – IMAGE LEFT, TEXT RIGHT ⭐ */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <img
          src="image1.jpg"
          alt="About Us"
          data-aos="fade-right"
          className="rounded-xl shadow-lg"
        />

        <div data-aos="fade-left">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Pure Goodness in Every Drop
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our oils are made with 100% premium peanuts using the cold-pressed
            method. No chemicals, no heat, no compromise on quality — just pure
            nutrition the way nature intended. Every bottle is packed with rich
            aroma, natural flavour and essential nutrients.
          </p>
        </div>
      </section>

      {/* ⭐ ABOUT SECTION 2 – TEXT LEFT, IMAGE RIGHT ⭐ */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div data-aos="fade-right">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            From Farm to Bottle, With Care
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            We source peanuts directly from trusted farmers and use traditional
            wood-pressed methods to retain natural taste, aroma, and nutrient
            value. Every step — from cleaning to extraction — follows strict
            hygiene standards to give you the best quality.
          </p>
        </div>

        <img
          src="image.jpg"
          alt="Healthy Process"
          data-aos="fade-left"
          className="rounded-xl shadow-lg"
        />
      </section>

      {/* ⭐ ABOUT SECTION 3 – IMAGE LEFT, TEXT RIGHT ⭐ */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <img
          src="image2.jpg"
          alt="Trusted Quality"
          data-aos="fade-right"
          className="rounded-xl shadow-lg"
        />

        <div data-aos="fade-left">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Trusted by Families Across India
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            With purity as our promise, we’ve become a trusted choice for
            thousands of households. Whether it's for daily cooking or a
            healthier lifestyle, our oils deliver consistent quality, taste, and
            goodness in every drop.
          </p>
        </div>
      </section>
      {/* ⭐ OUR PROMISE SECTION ⭐ */}
      <section className="w-full bg-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Title */}
          <h2
            data-aos="fade-up"
            className="text-4xl md:text-5xl font-extrabold text-black mb-12 tracking-wide"
          >
            OUR PROMISE — PURE. NATURAL. ORIGINAL.
          </h2>

          {/* 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Card 1 */}
            <div
              data-aos="fade-up"
              className="bg-white p-8 rounded-2xl shadow-lg border border-yellow-200"
            >
              <Leaf className="w-14 h-14 text-black mx-auto mb-5" />
              <h3 className="text-2xl font-bold text-black mb-3">Purity</h3>
              <p className="text-black text-lg leading-relaxed">
                We use only the best quality peanuts, sourced directly from
                farmers, to ensure the highest purity in every drop of our oil.
              </p>
            </div>

            {/* Card 2 */}
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="bg-white p-8 rounded-2xl shadow-lg border border-yellow-200"
            >
              <ShieldCheck className="w-14 h-14 text-black mx-auto mb-5" />
              <h3 className="text-2xl font-bold text-black mb-3">Naturality</h3>
              <p className="text-black text-lg leading-relaxed">
                We ensure our oil remains a natural and wholesome alternative to
                processed oils, focusing on the well-being of our
                fellow-customers.
              </p>
            </div>

            {/* Card 3 */}
            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className="bg-white p-8 rounded-2xl shadow-lg border border-yellow-200"
            >
              <Factory className="w-14 h-14 text-black mx-auto mb-5" />
              <h3 className="text-2xl font-bold text-black mb-3">
                Originality
              </h3>
              <p className="text-black text-lg leading-relaxed">
                Our oil is made using traditional methods, keeping the natural
                nutrients and flavours intact as it is.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ⭐ PREMIUM 7 STEP PROCESS SECTION ⭐ */}
      <ProcessSection />
    </main>
  );
}
