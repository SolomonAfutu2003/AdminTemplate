// src/api/axiosClient.js
import axios from 'axios';

const getBaseURL = () => {
  // Multiple ways to detect production
  const isProduction = 
    import.meta.env.PROD || 
    window.location.hostname.includes('vercel.app') ||
    window.location.hostname.includes('.now.sh') ||
    window.location.protocol === 'https:'; // If HTTPS, we're in production

  console.log('🔍 Environment check:', {
    hostname: window.location.hostname,
    protocol: window.location.protocol,
    envPROD: import.meta.env.PROD,
    isVercel: window.location.hostname.includes('vercel.app'),
    isHTTPS: window.location.protocol === 'https:',
    finalDecision: isProduction ? 'PRODUCTION' : 'DEVELOPMENT'
  });

  // FORCE PROXY if we're on HTTPS (production)
  if (window.location.protocol === 'https:') {
    console.log('🔒 HTTPS detected - forcing proxy usage');
    return '/api/proxy';
  }

  return isProduction ? '/api/proxy' : 'http://195.201.122.224:1401/api';
};

const axiosClient = axios.create({
  baseURL: getBaseURL(),
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('🚀 API Request to:', config.baseURL + config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;