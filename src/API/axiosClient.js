// src/api/axiosClient.js
import axios from "axios";

const getBaseURL = () => {
  // Multiple ways to detect production

  return  "http://195.201.122.224:1401/api";
};

const axiosClient = axios.create({
  baseURL: getBaseURL(),
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("🚀 API Request to:", config.baseURL + config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;
