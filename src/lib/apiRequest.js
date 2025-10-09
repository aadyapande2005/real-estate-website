import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://real-estate-website-backend-2ub3.onrender.com/api",
  withCredentials: true,
});

export default apiRequest;