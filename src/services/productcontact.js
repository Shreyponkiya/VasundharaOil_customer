// services/contact.js (New file - similar structure to your products service)
import { CONTACT_POST } from "../constants/apiendpoint";
  import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

export const submitContact = async (payload) => {
  try {
    console.log("Submitting contact form to:", CONTACT_POST);
    const response = await axios.post(CONTACT_POST, payload);
    toast.success('Contact form submitted successfully!');
    console.log("Contact submitted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting contact:", error);
    toast.error('Failed to submit contact form. Please try again.');
    throw error;
  }
};