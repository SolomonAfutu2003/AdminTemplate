import axios from "axios";

const getBaseURL = () => {
  // Use proxy in production, direct connection in development
  if (import.meta.env.PROD) {
    console.log("Using proxy in production");
    return "/api/proxy";
  }
  console.log("Using direct API in development");
  return "http://195.201.122.224:1401/api";
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
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
