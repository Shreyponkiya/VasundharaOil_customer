"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchProducts } from "../services/productService"; // Adjust the import path as needed
import OilDropLoader from "@/components/OilDropLoader";
export default function HealthBenefitsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiResponse = await fetchProducts();
        
        // Log the fetched payload for debugging
        console.log("Fetched API Payload for HealthBenefitsPage:", apiResponse);
        
        // Ensure data is an array (axios wraps response in { data: [...] })
        const rawProducts = apiResponse || [];
        
        // Map API response to component's expected structure (updated for new schema)
        const mappedProducts = rawProducts.map((item) => ({
          id: item._id,
          title: item.productName,
          image: `${process.env.NEXT_PUBLIC_BASE_URL}${item.image}` || `${process.env.NEXT_PUBLIC_BASE_URL}/default-product.png`,
          description: item.description || "",
          unit: item.unit || "kg",
          quantity: item.quantity || "",
          mrp: item.mrp || 0,
          sellingPrice: item.sellingPrice || 0,
          discountPercentage: item.discountPercentage || 0,
        }));
        
        setProducts(mappedProducts);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Find the product with the maximum sellingPrice
  const maxProduct = products.length > 0 
    ? products.reduce((max, current) => (current.sellingPrice > max.sellingPrice ? current : max), products[0])
    : null;

  const handleBuyNow = () => {
    router.push("/products"); // Adjust route if your products page is at a different path
  };

  if (loading) {
    return (
      <main className="bg-[#FFF8EA] text-[#4A3B2A]">
        <section className="py-16 px-6 text-center">
          <p className="text-lg text-[#5A4633]"><OilDropLoader/></p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-[#FFF8EA] text-[#4A3B2A]">
        <section className="py-16 px-6 text-center">
          <p className="text-red-500 text-lg">{error}</p>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-[#FFF8EA] text-[#4A3B2A]">
      {/* HERO */}
      <section className="py-16 px-6 text-center bg-gradient-to-r from-amber-100 to-yellow-200">
        <h1 className="text-5xl font-bold text-[#8B4513] mb-4">
          Health Benefits of Pure Ghani Peanut Oil
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-[#5A4633]">
          Experience the natural goodness of Ghani peanut oil — rich in
          nutrients, antioxidants, and heart-friendly fats that support a
          healthier lifestyle.
        </p>
      </section>

      {/* BENEFITS */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#8B4513] mb-12">
          Key Health Benefits
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {[
            {
              title: "Supports Heart Health",
              desc: "Rich in monounsaturated fats (MUFA) that help regulate cholesterol and promote better heart function.",
            },
            {
              title: "High in Vitamin E",
              desc: "Powerful antioxidant that protects cells, improves skin, and boosts immunity.",
            },
            {
              title: "Boosts Immunity",
              desc: "Contains natural antioxidants that reduce inflammation and strengthen the body’s defense system.",
            },
            {
              title: "Improves Digestion",
              desc: "Light on the stomach and helps improve digestion, making it ideal for everyday cooking.",
            },
            {
              title: "Perfect for Deep Frying",
              desc: "High smoke point makes it excellent for Indian dishes like poori, bhajiya, pakodi & farsan.",
            },
            {
              title: "Good for Skin & Hair",
              desc: "Vitamin E moisturizes skin and strengthens hair, giving natural nourishment.",
            },
            {
              title: "Rich in Healthy Fats",
              desc: "Provides sustained energy and supports a healthy metabolism.",
            },
            {
              title: "100% Natural & Chemical-Free",
              desc: "No preservatives, no refining — just pure Ghani goodness.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-white shadow-md border border-amber-200"
            >
              <h3 className="text-xl font-semibold text-[#8B4513] mb-2">
                {item.title}
              </h3>
              <p className="text-[#4A3B2A]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NUTRITION FACTS */}
      <section className="py-16 px-6 bg-[#FFE9A8]">
        <h2 className="text-3xl font-bold text-center text-[#8B4513] mb-10">
          Nutrition Facts (Per 100ml)
        </h2>

        <div className="max-w-md mx-auto bg-amber-100 p-6 rounded-xl shadow-md border border-amber-700">
          <ul className="text-lg space-y-2">
            <li>Energy: 884 kcal</li>
            <li>Total Fat: 100g</li>
            <li>Monounsaturated Fat: 49g</li>
            <li>Polyunsaturated Fat: 33g</li>
            <li>Saturated Fat: 18g</li>
            <li>Cholesterol: 0g</li>
            <li>Vitamin E: High</li>
            <li>Omega-6 Fatty Acids: Present</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 bg-gradient-to-r from-yellow-200 to-amber-100">
        <h2 className="text-4xl font-bold text-[#8B4513] mb-6">
          Choose Health. Choose Pure Peanut Oil.
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Make every meal nutritious, aromatic, and healthy with natural Ghani
          peanut oil.
        </p>
        <div className="flex flex-col items-center justify-center gap-6">
          {maxProduct ? (
            <>
              <img
                src={maxProduct.image}
                alt={maxProduct.title}
                className="mx-auto w-48 h-85 object-cover rounded-lg"
              />
              <h1 className="text-xl md:text-2xl">
                {maxProduct.title} – {maxProduct.quantity} {maxProduct.unit.toUpperCase()}
              </h1>
              <p className="text-green-600 font-semibold text-2xl mt-2">₹{maxProduct.sellingPrice}</p>
              <p className="text-sm text-[#5A4633] mt-2 max-w-md mx-auto">{maxProduct.description}</p>
            </>
          ) : (
            <p className="text-[#5A4633]">No products available at the moment.</p>
          )}
          <button 
            onClick={handleBuyNow}
            className="px-8 py-3 bg-amber-600 text-white rounded-lg text-lg shadow-md hover:bg-amber-700 transition"
          >
            Buy Now
          </button>
        </div>
      </section>
    </main>
  );
}