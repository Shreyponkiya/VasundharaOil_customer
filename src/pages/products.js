"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { X, ShoppingCart, Plus, Minus } from "lucide-react";
import { fetchProducts } from "../services/productService";
import { postOrder } from "../services/orderService"; // Import the order service
import { ToastContainer, toast } from "react-toastify";
import OilDropLoader from "@/components/OilDropLoader";

// Extracted OrderModal as a separate stable component to prevent re-mounting on parent re-renders
const OrderModal = ({
  showModal,
  setShowModal,
  cart,
  totalPrice,
  orderForm,
  handleInputChange,
  handleConfirmOrder,
  fullNameRef,
  mobileRef,
  emailRef,
  pincodeRef,
  cityRef,
  addressRef,
  isSubmitting,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting order form...");
    handleConfirmOrder(e); // Pass event if needed for form handling
  };

  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 bg-opacity-60 flex items-center justify-center p-4 overflow-y-auto"
      style={{ zIndex: 999999 }}
    >
      <div className="bg-white rounded-xl w-full max-w-2xl text-black border-2 border-yellow-600 shadow-2xl my-8 relative">
        <div className="bg-white border-b border-yellow-600 p-6 flex justify-between items-center rounded-t-xl">
          <h3 className="text-2xl md:text-3xl font-bold text-yellow-700">
            Order Details
          </h3>
          <button
            onClick={() => setShowModal(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto"
        >
          {/* Order Form */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                ref={fullNameRef}
                type="text"
                name="fullName"
                value={orderForm.fullName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
                placeholder="Enter your full name"
                required
                autoComplete="name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                ref={mobileRef}
                type="tel"
                name="mobile"
                value={orderForm.mobile}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
                placeholder="Enter your mobile number"
                required
                autoComplete="tel"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                ref={emailRef}
                type="email"
                name="email"
                value={orderForm.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Pincode <span className="text-red-500">*</span>
                </label>
                <input
                  ref={pincodeRef}
                  type="number"
                  name="pincode"
                  value={orderForm.pincode}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
                  placeholder="Pincode"
                  required
                  min="100000"
                  max="999999"
                  autoComplete="postal-code"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  ref={cityRef}
                  type="text"
                  name="city"
                  value={orderForm.city}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
                  placeholder="City"
                  required
                  autoComplete="address-level2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Address <span className="text-red-500">*</span>
              </label>
              <textarea
                ref={addressRef}
                name="address"
                value={orderForm.address}
                onChange={handleInputChange}
                rows="3"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none resize-none"
                placeholder="Enter your complete address"
                required
                autoComplete="street-address"
              ></textarea>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-6">
            <h4 className="font-bold text-lg mb-3">Order Summary</h4>
            <div className="space-y-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.title} × {item.qty}
                  </span>
                  <span className="font-semibold">
                    ₹{item.qty * item.discountPrice}
                  </span>
                </div>
              ))}
              <div className="border-t border-yellow-400 pt-2 mt-2 flex justify-between font-bold text-lg text-yellow-700">
                <span>Total Payable:</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 sticky bottom-0 bg-white pt-4 pb-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="flex-1 px-6 py-3 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processing..." : "Confirm Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function ProductSection() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [orderForm, setOrderForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    pincode: "",
    city: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission loading

  // Refs for form inputs, defined in parent for access in validation
  const fullNameRef = useRef(null);
  const mobileRef = useRef(null);
  const emailRef = useRef(null);
  const pincodeRef = useRef(null);
  const cityRef = useRef(null);
  const addressRef = useRef(null);

  // Calculate expiry date (1 year from now)
  const getExpiryDate = () => {
    const now = new Date();
    const expiryDate = new Date(now);
    expiryDate.setFullYear(now.getFullYear() + 1);
    return expiryDate.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch products from API (replaces hardcoded sample)
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiResponse = await fetchProducts();

        // Log the fetched payload for debugging (as requested)
        console.log("Fetched API Payload:", apiResponse);

        // Ensure data is an array (axios wraps response in { data: [...] })
        const rawProducts = apiResponse || [];
        console.log("Raw Products Data:", rawProducts);

        // Map API response to component's expected structure
        // Updated for new schema:
        // - _id -> id
        // - productName -> title
        // - sellingPrice -> discountPrice
        // - mrp -> mrp
        // - unit and quantity for display
        // - discountPercentage (enriched from backend)
        // - Expiry set to 1 year from now dynamically
        // - image and description map directly; ensure image path is relative to backend base URL
        const mappedProducts = rawProducts.map((item) => ({
          id: item._id,
          title: item.productName,
          image:
            `${process.env.NEXT_PUBLIC_BASE_URL}${item.image}` ||
            `${process.env.NEXT_PUBLIC_BASE_URL}/default-product.png`, // Adjusted for backend static serve; fallback to default
          expiry: getExpiryDate(),
          mrp: item.mrp || 0,
          discountPrice: item.sellingPrice || 0,
          unit: item.unit || "kg",
          quantity: item.quantity || "",
          description: item.description || "",
          discountPercentage: item.discountPercentage || 0,
        }));

        setProducts(mappedProducts);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again.");
        // Fallback to empty array or hardcoded if needed
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Cart Functions
  const addToCart = (product) => {
    setCart([...cart, { ...product, qty: 1 }]);
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.qty * item.discountPrice,
    0
  );

  const getQty = (id) => {
    const item = cart.find((c) => c.id === id);
    return item?.qty || 0;
  };

  const handleInputChange = (e) => {
    setOrderForm({
      ...orderForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirmOrder = async (e) => {
    if (e) e.preventDefault(); // Prevent default if event is passed from form submit

    // Basic validation for required fields
    const requiredFields = [
      "fullName",
      "mobile",
      "email",
      "pincode",
      "city",
      "address",
    ];
    const fieldLabels = {
      fullName: "Full Name",
      mobile: "Mobile Number",
      email: "Email",
      pincode: "Pincode",
      city: "City",
      address: "Full Address",
    };

    const firstEmptyField = requiredFields.find(
      (field) => !orderForm[field].trim()
    );

    if (firstEmptyField) {
      // Focus on the first empty field using refs
      const refMap = {
        fullName: fullNameRef,
        mobile: mobileRef,
        email: emailRef,
        pincode: pincodeRef,
        city: cityRef,
        address: addressRef,
      };
      const inputRef = refMap[firstEmptyField];
      if (inputRef?.current) {
        inputRef.current.focus();
      } else {
        // Fallback to querySelector
        const input = document.querySelector(
          `input[name="${firstEmptyField}"], textarea[name="${firstEmptyField}"]`
        );
        if (input) {
          input.focus();
        }
      }
      return;
    }

    // Validate mobile number (10 digits)
    const mobileRegex = /^(?:\+91|91)?[6-9]\d{9}$/;
    if (!mobileRegex.test(orderForm.mobile.trim())) {
      toast.error("Please enter a valid mobile number (10 digits or +91)");
      mobileRef.current?.focus();
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(orderForm.email)) {
      toast.error("Please enter a valid email address");
      emailRef.current?.focus();
      return;
    }

    // Validate pincode (6 digits)
    const pincodeRegex = /^[0-9]{6}$/;
    if (!pincodeRegex.test(orderForm.pincode)) {
      toast.error("Please enter a valid 6-digit pincode");
      pincodeRef.current?.focus();
      return;
    }

    // Construct the order payload matching the specified structure
    const orderPayload = {
      customer: {
        fullName: orderForm.fullName,
        mobile: orderForm.mobile,
        email: orderForm.email,
        pincode: orderForm.pincode,
        city: orderForm.city,
        address: orderForm.address,
      },
      items: cart.map((item) => ({
        productId: item.id,
        productName: item.title,
        quantity: item.qty,
        price: item.discountPrice,
      })),
      totalPrice: totalPrice,
      status: "pending",
    };

    try {
      setIsSubmitting(true);
      console.log("Submitting order payload:", orderPayload);
      const response = await postOrder(orderPayload);
      console.log("Order placed successfully:", response);
    } catch (error) {
      console.error("Failed to place order:", error);
    } finally {
      setIsSubmitting(false);
      setShowModal(false);
      setShowCart(false);
      setCart([]);
      setOrderForm({
        fullName: "",
        mobile: "",
        email: "",
        pincode: "",
        city: "",
        address: "",
      });
    }
  };

  // Cart Button Component
  const CartButton = () => (
    <button
      onClick={() => setShowCart(true)}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-yellow-500 text-black font-bold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-400 transition flex items-center gap-2"
      style={{ zIndex: 99997 }}
    >
      <ShoppingCart className="w-5 h-5" />
      Cart ({cart.length})
    </button>
  );

  // Cart Drawer Component
  const CartDrawer = () => (
    <>
      {/* Cart Drawer Overlay */}
      <div
        className="fixed inset-0 bg-black/80 bg-opacity-50"
        style={{ zIndex: 99998 }}
        onClick={() => setShowCart(false)}
      />

      {/* Cart Drawer */}
      <div
        className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white text-black shadow-2xl p-6 border-l border-yellow-600 overflow-y-auto"
        style={{ zIndex: 99999 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-yellow-700">
            Your Cart
          </h3>
          <button
            onClick={() => setShowCart(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">Cart is empty</p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-gray-300 pb-4 flex justify-between items-start gap-3"
                >
                  <div className="flex-1">
                    <p className="font-bold">{item.title}</p>
                    <p className="text-gray-500 text-sm">
                      Expiry: {item.expiry}
                    </p>
                    <p className="text-yellow-700 font-bold mt-1">
                      ₹{item.discountPrice} × {item.qty} = ₹
                      {item.qty * item.discountPrice}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="p-1 bg-red-500 text-white rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-lg font-bold w-8 text-center">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="p-1 bg-green-500 text-white rounded"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t-2 border-yellow-700">
              <div className="flex justify-between items-center text-2xl font-bold text-yellow-700 mb-6">
                <span>Total:</span>
                <span>₹{totalPrice}</span>
              </div>

              <button
                onClick={() => {
                  setShowCart(false);
                  setShowModal(true);
                }}
                className="w-full bg-yellow-500 text-black py-3 rounded-lg text-lg font-bold hover:bg-yellow-400 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );

  return (
    <>
      <div className="p-4 md:p-10 bg-gray-100 min-h-screen text-black pb-24 relative">
        {/* Cart Button - Rendered via Portal */}

        <h2 className="text-3xl md:text-4xl font-bold text-center text-yellow-700 mb-10">
          Our Products
        </h2>

        {/* Product Grid */}
        {error ? (
          <p className="text-center text-red-500 text-lg">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {loading && (
              <div className="text-center col-span-3 text-gray-600 text-lg">
                <OilDropLoader />
              </div>
            )}
            {error && (
              <p className="text-center col-span-3 text-red-500 text-lg">
                {error}
              </p>
            )}

            {products.map((product) => {
              const qty = getQty(product.id);

              return (
                <div
                  key={product.id}
                  className="bg-white p-5 rounded-xl shadow-lg border border-yellow-500 flex flex-col justify-between hover:shadow-xl transition-shadow relative"
                >
                  <div>
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-52 object-contain rounded-lg bg-white p-2"
                      />
                      {product.discountPercentage > 0 && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                          {product.discountPercentage}% OFF
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl font-bold mt-4 text-black">
                      {product.title}
                    </h3>

                    <p className="text-gray-600">
                      {`${product.quantity} ${product.unit.toUpperCase()}`}
                    </p>

                    <p className="text-gray-600">Expiry: {product.expiry}</p>

                    <p className="mt-2">
                      <span className="line-through text-red-500">
                        ₹{product.mrp}
                      </span>
                      <span className="text-green-600 font-bold text-lg ml-2">
                        ₹{product.discountPrice}
                      </span>
                    </p>
                  </div>

                  {/* Cart Section */}
                  <div className="mt-5 bg-yellow-50 p-3 rounded-lg border border-yellow-300">
                    {qty === 0 ? (
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-yellow-500 text-black font-bold py-2 rounded-lg hover:bg-yellow-400 transition"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => decreaseQty(product.id)}
                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-xl font-bold w-8 text-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => increaseQty(product.id)}
                            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="font-bold text-yellow-800">
                          ₹{product.discountPrice * qty}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Render Cart Button, Cart Drawer and Modal using Portal */}
      {mounted &&
        cart.length > 0 &&
        createPortal(<CartButton />, document.body)}
      {mounted && showCart && createPortal(<CartDrawer />, document.body)}
      {mounted &&
        showModal &&
        createPortal(
          <OrderModal
            showModal={showModal}
            setShowModal={setShowModal}
            cart={cart}
            totalPrice={totalPrice}
            orderForm={orderForm}
            handleInputChange={handleInputChange}
            handleConfirmOrder={handleConfirmOrder}
            fullNameRef={fullNameRef}
            mobileRef={mobileRef}
            emailRef={emailRef}
            pincodeRef={pincodeRef}
            cityRef={cityRef}
            addressRef={addressRef}
            isSubmitting={isSubmitting}
          />,
          document.body
        )}
    </>
  );
}
