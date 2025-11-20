"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { submitContact } from "../services/productcontact"; // Import the new service

export default function Contact() {
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    address: "",
    feedback: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // New: Loading state
  const [submitMessage, setSubmitMessage] = useState(""); // New: Success/error message

  // Validate Form
  const validate = () => {
    let newErrors = {};

    if (!formData.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setSubmitMessage(""); // Clear previous messages

    if (validate()) {
      setIsSubmitting(true);
      try {
        const payload = { ...formData, rating }; // Include rating in payload
        const response = await submitContact(payload);
        if (response.message) {
          setSubmitMessage(response.message); // Show success message
          // Reset form on success
          setFormData({ fullname: "", phone: "", address: "", feedback: "" });
          setRating(0);
          setErrors({});
        }
      } catch (error) {
        // Handle API errors (e.g., from backend validation)
        const errorMsg = error.response?.data?.error || "Submission failed. Please try again.";
        setSubmitMessage(errorMsg);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8EA] py-16 px-6">
      <h2 className="text-4xl font-bold text-center text-[#8B4513] mb-16">
        Contact Us
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* ---------------------- FORM BOX ---------------------- */}
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-yellow-600">
          <h3 className="text-2xl font-bold text-[#6A3900] mb-6">
            Send Us a Message
          </h3>

          <form onSubmit={submitHandler} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-lg font-semibold text-[#6A3900] mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full p-3 rounded-xl border border-gray-300
                placeholder-gray-500 text-black focus:outline-none 
                focus:ring-2 focus:ring-yellow-600"
                value={formData.fullname}
                onChange={(e) =>
                  setFormData({ ...formData, fullname: e.target.value })
                }
              />
              {errors.fullname && (
                <p className="text-red-600 text-sm mt-1">{errors.fullname}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-lg font-semibold text-[#6A3900] mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full p-3 rounded-xl border border-gray-300 
                placeholder-gray-500 text-black focus:outline-none 
                focus:ring-2 focus:ring-yellow-600"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-lg font-semibold text-[#6A3900] mb-2">
                Address
              </label>
              <textarea
                rows="2"
                placeholder="Enter your full address"
                className="w-full p-3 rounded-xl border border-gray-300 
                placeholder-gray-500 text-black focus:outline-none 
                focus:ring-2 focus:ring-yellow-600"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              ></textarea>
              {errors.address && (
                <p className="text-red-600 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            {/* Feedback */}
            <div>
              <label className="block text-lg font-semibold text-[#6A3900] mb-2">
                Feedback
              </label>
              <textarea
                rows="3"
                placeholder="Write your feedback..."
                className="w-full p-3 rounded-xl border border-gray-300 
                placeholder-gray-500 text-black focus:outline-none 
                focus:ring-2 focus:ring-yellow-600"
                value={formData.feedback}
                onChange={(e) =>
                  setFormData({ ...formData, feedback: e.target.value })
                }
              ></textarea>
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-lg font-semibold text-[#6A3900] mb-3">
                Rate Your Experience
              </label>
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    onClick={() => setRating(star)}
                    className={`w-8 h-8 cursor-pointer transition ${
                      star <= rating
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Submit Message (Success/Error) */}
            {submitMessage && (
              <div className={`p-3 rounded-xl text-sm ${
                submitMessage.includes("successfully") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}>
                {submitMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-yellow-600 text-white font-semibold text-lg 
              rounded-xl hover:bg-yellow-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>

        {/* ---------------------- MAP BOX ---------------------- */}
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-yellow-600">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-[#6A3900] mb-4">
              Detail Us :
            </h3>

            <p className="text-lg font-semibold text-gray-800">
              Vasundhara Oil Pvt. Ltd.
            </p>

            <p className="text-lg text-gray-700 mt-1">
              Dholidhar Road, Mota Bhadra, Ta:JamKandorna, Gujarat, India - 360405
            </p>

            <p className="text-lg text-gray-700 mt-1">
              📞 Phone: <span className="font-semibold">+91 9898189510  |  +91 9662903961</span>
            </p>
          </div>
          <h3 className="text-2xl font-bold text-[#6A3900] mb-4">
            Our Location
          </h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d519.7090530601577!2d70.561689907942!3d21.871471648533003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395823b2b9c732c9%3A0xd8dceb8afdec2319!2sMota%20Bhadra%2C%20Gujarat%20360405!5e1!3m2!1sen!2sin!4v1763272176053!5m2!1sen!2sin"
            width="100%"
            height="430"
            className="rounded-xl border border-yellow-600 shadow-lg"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}