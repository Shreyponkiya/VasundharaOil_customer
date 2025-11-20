// services/contact.js (New file - similar structure to your products service)
import { CONTACT_POST } from "../constants/apiendpoint";
import axios from "axios";

export const submitContact = async (payload) => {
  try {
    console.log("Submitting contact form to:", CONTACT_POST);
    const response = await axios.post(CONTACT_POST, payload);
    console.log("Contact submitted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting contact:", error);
    throw error;
  }
};