import axios from "axios";

const apiRequest = axios.create({
  //baseURL: "https://real-estate-website-backend-2ub3.onrender.com/api",
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

export default apiRequest;