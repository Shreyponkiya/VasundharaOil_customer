"use client";
import { useEffect, useState } from "react";
import {
  Leaf,
  Factory,
  ShieldCheck,
  Users,
  Store,
  BadgeCheck,
} from "lucide-react";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { fetchProducts } from "../services/productService"; // Adjust the import path as needed
import OilDropLoader from "@/components/OilDropLoader";

export const metadata = {
  title: "Vasundhara Pure Cold-Pressed Oils | 100% Natural & Chemical-Free",
  description:
    "Buy premium cold-pressed groundnut oil, coconut oil, sesame oil, and more. 100% pure, fresh, and chemical-free oils trusted by 5,00,000+ families across India.",
  keywords: [
    "cold pressed oil",
    "groundnut oil",
    "pure oil",
    "vasundhara oil",
    "healthy cooking oil",
    "wood pressed oil",
    "chemical free oil",
    "natural groundnut oil",
    "best oil for cooking",
  ],
  openGraph: {
    title: "Vasundhara Oils – 100% Pure Cold-Pressed Oils",
    description:
      "Premium cold-pressed oils made from the finest G20 peanuts. Fresh, pure, and trusted by millions.",
    url: "https://shreevasundharaoil.com",
    siteName: "Vasundhara Oil",
    images: [
      {
        url: "/hero_image.png",
        width: 1200,
        height: 630,
        alt: "Vasundhara Cold-Pressed Groundnut Oil",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vasundhara Oils",
    description: "100% pure cold-pressed oils made from premium G20 peanuts.",
    images: ["/hero_image.png"],
  },
  alternates: {
    canonical: "https://shreevasundharaoil.com",
  },
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    // Initialize AOS
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

      // Refresh AOS after a delay
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    };

    initAOS();
  }, []);

  const handleBuyNow = () => {
    router.push("/products"); // Adjust route if your products page is at a different path
  };
  // Fetch products from API (replaces hardcoded products in grid)
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiResponse = await fetchProducts();

        // Log the fetched payload for debugging
        console.log("Fetched API Payload for Home:", apiResponse);

        // Ensure data is an array (axios wraps response in { data: [...] })
        const rawProducts = apiResponse || [];
        // Map API response to component's expected structure (updated for new schema)
        // Assumptions:
        // - _id -> id
        // - productName -> title
        // - sellingPrice -> rate (for pricing display)
        // - No expiry needed here
        // - unit/quantity: Not displayed in cards, but used for centered card
        // - mrp: Not used here
        // - image and description map directly
        // Limit to 4 products for grid (if more, slice; if less, grid adapts)
        const mappedProducts = rawProducts.slice(0, 4).map((item) => ({
          id: item._id,
          title: item.productName,
          image:
            `${process.env.NEXT_PUBLIC_BASE_URL}${item.image}` ||
            `${process.env.NEXT_PUBLIC_BASE_URL}/default-product.png`, // Ensures proper path with leading / and fallback
          description: item.description || "",
          unit: item.unit || "kg",
          quantity: item.quantity || "",
          rate: item.sellingPrice || 0, // Use sellingPrice as rate for display
        }));

        setProducts(mappedProducts);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again.");
        // Fallback to empty array (grid will be empty, but UI intact)
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <main className="w-full bg-yellow-100 overflow-hidden">
      {/* ✅ Hero Section */}
      <section className="relative w-full overflow-hidden">
        {/* ✅ Background Image */}
        <img
          src="hero_image.png"
          alt="Home Banner"
          className="
            w-full
            h-auto
            object-contain
            sm:object-cover
            sm:h-[120vh]
          "
        />
        {/* ✅ Overlay (visible on ALL screens now) */}
        <div className=""></div>
        {/* ✅ Centered Text */}
        <div
          className="
            absolute
            inset-0
            flex
            flex-col
            justify-center
            items-center
            text-center
            px-4
            sm:px-6
            md:px-12
          "
        ></div>
      </section>

      {/* 🚀 Scrolling Single Line (Right → Left) - FIXED */}
      <section className="w-full overflow-hidden bg-yellow-200 py-4">
        <div className="marquee">
          <div className="track">
            <p className="text-xl md:text-2xl font-semibold text-gray-900">
              ★ 100% Pure Cold-Pressed Oils • Freshness Guaranteed • Trusted by
              5,00,000+ Families • Premium Quality You Can Taste ★
            </p>
            <p className="text-xl md:text-2xl font-semibold text-gray-900">
              100% Pure Cold-Pressed Oils • Freshness Guaranteed • Trusted by
              5,00,000+ Families • Premium Quality You Can Taste ★
            </p>
          </div>
        </div>
      </section>

      {/* ✅ Content Below Hero */}
      <section
        className="max-w-7xl mx-auto py-10 px-6 md:px-16 text-center"
        data-aos="fade-up"
      >
        <h2
          className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          Our Premium Range Products
        </h2>
        <p
          className="text-gray-600 max-w-2xl mx-auto mb-10"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          We bring you the purest natural products, crafted with care and
          precision. Our mission is to deliver freshness, quality, and trust in
          every product.
        </p>

        {/* ✅ Product Cards Grid - Now Dynamic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {loading ? (
            <div className="col-span-full text-center text-gray-600">
              <OilDropLoader />
            </div>
          ) : error ? (
            <p className="col-span-full text-center text-red-500">{error}</p>
          ) : products.length === 0 ? (
            <p className="col-span-full text-center text-gray-600">
              No products available.
            </p>
          ) : (
            products.map((product, index) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4"
                data-aos={
                  index % 4 === 0
                    ? "fade-right"
                    : index % 4 === 1
                    ? "fade-up"
                    : index % 4 === 2
                    ? "fade-up"
                    : "fade-left"
                }
                data-aos-delay={(index + 1) * 100}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  {product.description}
                </p>
              </div>
            ))
          )}

          {/* 👉 Centered Vasundhara Oil Details - Dynamic based on first product */}
          {!loading && !error && products.length > 0 && (
            <div
              className="col-span-full flex justify-center mt-10"
              data-aos="zoom-in"
              data-aos-delay="500"
            >
              <div className="bg-white rounded-xl p-6 w-full max-w-md text-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  {products[0].title} – {products[0].quantity}{" "}
                  {products[0].unit.toUpperCase()}
                </h3>
                <p className="text-green-600 font-semibold text-2xl mt-2">
                  ₹{products[0].rate}
                </p>
                <span className="text-yellow-500 text-sm font-medium block mt-1">
                  ⭐⭐⭐⭐⭐{" "}
                  <span className="text-gray-500">(150 reviews)</span>
                </span>
              </div>
            </div>
          )}
          <div className="col-span-full flex justify-center mt-6">
            <button
              onClick={handleBuyNow}
              className="px-8 py-3 bg-amber-600 text-white rounded-lg text-lg shadow-md hover:bg-amber-700 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </section>

      {/* ✨ Trusted Across the Country Section */}
      <section className="max-w-7xl mx-auto py-20" data-aos="fade-up">
        <div className="container mx-auto px-6">
          {/* Heading */}
          <h2
            className="text-4xl font-heading font-bold text-black text-center mb-4"
            data-aos="fade-down"
          >
            Trusted Across the Country
          </h2>
          <p
            className="text-center text-black font-body max-w-3xl mx-auto mb-12"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            The quality and purity of our oil have made Vasundhara a trusted
            name in kitchens across India. We're proud to be the preferred
            choice for families who value health, taste, and authenticity.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div
              className="p-8 rounded-2xl text-black bg-amber-200 shadow-lg border border-primary/10 hover:shadow-2xl transition-all text-center"
              data-aos="fade-left"
              data-aos-delay="100"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-white text-gray-600 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-5xl font-extrabold text-gray-600 mb-2">
                50K+
              </h3>
              <p className="text-lg font-semibold text-gray-700 mb-2">
                Happy Customers
              </p>
              <p className="text-muted-foreground text-sm">
                Families who trust Vasundhara for daily cooking.
              </p>
            </div>

            {/* Card 2 */}
            <div
              className="p-8 rounded-2xl bg-amber-200 shadow-lg text-black border border-primary/10 hover:shadow-2xl transition-all text-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
                <Store className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-5xl font-extrabold text-gray-600 mb-2">
                150+
              </h3>
              <p className="text-lg font-semibold text-gray-700 mb-2">
                Retail Partners
              </p>
              <p className="text-muted-foreground text-sm">
                Stores across India proudly selling Vasundhara oil.
              </p>
            </div>

            {/* Card 3 */}
            <div
              className="p-8 rounded-2xl bg-amber-200 text-black shadow-lg border border-primary/10 hover:shadow-2xl transition-all text-center"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white flex items-center justify-center">
                <BadgeCheck className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-5xl font-extrabold text-gray-600 mb-2">
                3+ Years
              </h3>
              <p className="text-lg font-semibold text-gray-700 mb-2">
                Of Trust & Quality
              </p>
              <p className="text-muted-foreground text-sm">
                Delivering purity with decades of expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ✨ About Groundnut Oil Section (New Added Section) */}
      <section className="max-w-7xl mx-auto py-10" data-aos="fade-up">
        <div className="px-4 sm:px-6 md:px-0 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 items-center w-full">
          {/* 👉 Left Side Image */}
          <div
            className="w-full flex justify-center md:justify-start"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <img
              src="nuts.png"
              alt="Groundnut Oil"
              className="w-full max-w-sm md:max-w-none h-auto rounded-2xl object-contain"
            />
          </div>

          {/* 👉 Right Side Content */}
          <div
            className="w-full text-black px-0 md:px-4"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <h2 className="text-4xl text-black font-heading font-bold mb-6 leading-snug">
              The Rich Taste of Original Groundnut Oil
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              At <span className="font-semibold text-primary">Vasundhara</span>,
              we keep things simple. Our groundnut oil is made with only real
              G20 peanuts — nothing added and nothing hidden. Just the pure,
              natural essence of groundnuts that nourishes both your food and
              your body.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Skip the processed alternatives like palm oil and choose a
              healthier oil filled with heart-friendly monounsaturated fats.
              Experience the true taste and purity of nature.
            </p>
          </div>
        </div>
      </section>

      {/* excellence */}
      <section className="max-w-7xl mx-auto py-20 bg-card" data-aos="fade-up">
        <div className="container mx-auto px-6 text-black">
          <h2
            className="text-4xl font-heading font-bold text-primary text-center mb-4"
            data-aos="fade-down"
          >
            From Farm to Family
          </h2>
          <p
            className="text-center text-muted-foreground font-body mb-12 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Every drop of Vasundhara oil follows a journey of excellence
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div
              className="p-8 rounded-2xl bg-amber-200 border border-border text-center shadow-md hover:shadow-xl transition-all"
              data-aos="fade-left"
              data-aos-delay="100"
            >
              <div className="w-16 h-16 bg-primary/10 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-heading text-black font-semibold mb-3">
                Finest Sourced Peanuts
              </h3>
              <p className="text-muted-foreground font-body">
                We select only the highest quality peanuts from trusted farms
              </p>
            </div>

            {/* Card 2 */}
            <div
              className="p-8 rounded-2xl bg-amber-200 border border-border text-center shadow-md hover:shadow-xl transition-all"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="w-16 h-16 bg-primary/10 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Factory className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-heading text-black font-semibold mb-3">
                Advanced Cold-Press Facility
              </h3>
              <p className="text-muted-foreground font-body">
                State-of-the-art machinery preserves natural nutrients and
                flavor
              </p>
            </div>

            {/* Card 3 */}
            <div
              className="p-8 rounded-2xl bg-amber-200 border border-border text-center shadow-md hover:shadow-xl transition-all"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              <div className="w-16 h-16 bg-primary/10 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-heading text-black font-semibold mb-3">
                Untouched by Hand, Sealed for Purity
              </h3>
              <p className="text-muted-foreground font-body">
                Automated bottling ensures hygiene and maintains freshness
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* testimonum */}
      <section className="py-20" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <h2
            className="text-4xl font-heading font-bold text-black text-center mb-12"
            data-aos="fade-down"
          >
            What Our Customers Say
          </h2>
          <TestimonialsCarousel />
        </div>
      </section>
    </main>
  );
}
