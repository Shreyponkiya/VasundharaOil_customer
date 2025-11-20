import {PRODUCT_GET} from "../constants/apiendpoint";
import axios from "axios";

export const fetchProducts = async () => {
    try {
        console.log("Fetching products from:", PRODUCT_GET);
        const response = await axios.get(PRODUCT_GET);
        console.log("Fetched products:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

