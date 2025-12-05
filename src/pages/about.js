"use client";

import { useEffect, useState } from "react";
import {
  Leaf,
  Factory,
  ShieldCheck,
} from "lucide-react";
import ProcessSection from "@/components/ProcessSection";
import OilDropLoader from "@/components/OilDropLoader";
import Image from "next/image";
import Head from "next/head";

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true);

  // ⭐ PRELOAD ALL IMAGES FOR INSTANT DISPLAY ⭐
  const preloadImages = [
    "/about_section.jpg",
    "/image1.jpg",
    "/image.jpg",
    "/image2.jpg",
  ];

  useEffect(() => {
    let loadedCount = 0;

    preloadImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === preloadImages.length) {
          setIsLoading(false);
        }
      };
    });
  }, []);

  // ⭐ AOS INITIALIZATION ONLY AFTER LOAD ⭐
  useEffect(() => {
    if (!isLoading) {
      const loadAOS = async () => {
        const AOS = await import("aos");
        await import("aos/dist/aos.css");

        AOS.init({
          duration: 800,
          once: true,
          offset: 80,
        });
      };

      loadAOS();
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <OilDropLoader />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>
          About Our GasiGhani Oil | Vasundhara Pure G20 Peanuts Oils
        </title>

        <meta
          name="description"
          content="Learn about Vasundhara Pure G20 peanuts Oils, our commitment to quality, and the natural goodness in every bottle."
        />

        <meta
          name="keywords"
          content="cold pressed oil, groundnut oil, pure oil, vasundhara oil, healthy cooking oil, wood pressed oil, natural peanuts oil"
        />

        <link rel="canonical" href="https://shreevasundharaoil.com" />

        <meta
          property="og:title"
          content="Vasundhara Oils – 100% Pure Cold-Pressed Oils"
        />
        <meta
          property="og:description"
          content="Premium cold-pressed oils made from the finest G20 peanuts."
        />
        <meta property="og:image" content="/hero_image.png" />
        <meta property="og:type" content="website" />
      </Head>

      <main className="w-full bg-yellow-100 overflow-hidden">

        {/* ⭐ HERO BANNER ⭐ */}
        <section className="relative w-full overflow-hidden">
          <Image
            src="/about_section.jpg"
            alt="About Us Banner"
            width={1920}
            height={1080}
            priority
            className="w-full h-auto object-cover sm:h-[90vh]"
          />
        </section>

        {/* ⭐ MARQUEE ⭐ */}
        <section className="w-full overflow-hidden bg-yellow-200 py-4">
          <div className="marquee">
            <div className="track">
              <p className="text-xl md:text-2xl font-semibold text-gray-900">
                ★ 100% Pure Cold-Pressed Oils • Freshness Guaranteed • Trusted
                by 5,00,000+ Families ★
              </p>
              <p className="text-xl md:text-2xl font-semibold text-gray-900">
                100% Pure Cold-Pressed Oils • Freshness Guaranteed • Premium
                Quality You Can Taste ★
              </p>
            </div>
          </div>
        </section>

        {/* ⭐ ABOUT SECTION 1 ⭐ */}
        <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Image
            src="/image1.jpg"
            alt="About Us"
            width={900}
            height={700}
            className="rounded-xl shadow-lg"
            data-aos="fade-right"
          />

          <div data-aos="fade-left">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Pure Goodness in Every Drop
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our oils are made with 100% premium peanuts using traditional
              wood-pressed methods. No chemicals and no heat — only natural
              goodness and rich nutrients.
            </p>
          </div>
        </section>

        {/* ⭐ ABOUT SECTION 2 ⭐ */}
        <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              From Farm to Bottle, With Care
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              We partner with trusted farmers, ensuring clean, premium-quality
              peanuts, processed using hygienic and chemical-free techniques.
            </p>
          </div>

          <Image
            src="/image.jpg"
            alt="Healthy Process"
            width={900}
            height={700}
            data-aos="fade-left"
            className="rounded-xl shadow-lg"
          />
        </section>

        {/* ⭐ ABOUT SECTION 3 ⭐ */}
        <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Image
            src="/image2.jpg"
            alt="Trusted Quality"
            width={900}
            height={700}
            data-aos="fade-right"
            className="rounded-xl shadow-lg"
          />

          <div data-aos="fade-left">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Trusted by Families Across India
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our oils are trusted by thousands for purity, taste and consistent
              natural freshness in everyday cooking.
            </p>
          </div>
        </section>

        {/* ⭐ OUR PROMISE ⭐ */}
        <section className="w-full bg-yellow-50 py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 data-aos="fade-up"
              className="text-4xl md:text-5xl font-extrabold mb-12">
              OUR PROMISE — PURE. NATURAL. ORIGINAL.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

              <div
                data-aos="fade-up"
                className="bg-white p-8 rounded-2xl shadow-lg border border-yellow-200"
              >
                <Leaf className="w-14 h-14 text-black mx-auto mb-5" />
                <h3 className="text-2xl font-bold text-black mb-3">Purity</h3>
                <p className="text-black text-lg">
                  100% premium peanuts for the purest oil quality.
                </p>
              </div>

              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="bg-white p-8 rounded-2xl shadow-lg border border-yellow-200"
              >
                <ShieldCheck className="w-14 h-14 text-black mx-auto mb-5" />
                <h3 className="text-2xl font-bold text-black mb-3">
                  Naturality
                </h3>
                <p className="text-black text-lg">
                  Wood-pressed and chemical-free — naturally healthy.
                </p>
              </div>

              <div
                data-aos="fade-up"
                data-aos-delay="400"
                className="bg-white p-8 rounded-2xl shadow-lg border border-yellow-200"
              >
                <Factory className="w-14 h-14 text-black mx-auto mb-5" />
                <h3 className="text-2xl font-bold text-black mb-3">
                  Originality
                </h3>
                <p className="text-black text-lg">
                  Traditional processing that keeps nutrients intact.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ⭐ 7 STEP PROCESS SECTION ⭐ */}
        <ProcessSection />
      </main>
    </>
  );
}
