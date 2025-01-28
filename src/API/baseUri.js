import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Base URL for your API
  timeout: 100000, // Request timeout (optional)
  headers: {
    "Content-Type": "application/json", // Default headers
  },
});

export default axiosInstance;
