// services/orderService.js
// Service for order-related operations (e.g., posting orders for customer panel)
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; // Adjust as needed

export async function postOrder(orderData) {
  try {
    console.log('Posting order to:', `${API_BASE_URL}/api/orders`);
    const response = await axios.post(`${API_BASE_URL}/api/orders`, orderData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    toast.success('Order placed successfully!');
    console.log('Order posted successfully:', response.data);
    if (response.data.message !== "Order created successfully") {
      throw new Error('Failed to place order');
    }
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    toast.error('Failed to place order. Please try again.');
    throw error;
  }
}