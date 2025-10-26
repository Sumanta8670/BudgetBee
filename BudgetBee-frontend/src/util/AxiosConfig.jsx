import axios from "axios";
import { BASE_URL } from "./apiEndpoints.js";

const AxiosConfig = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//list of endpoints that do not require authorization header
const excludeEndpoints = [
  "/login",
  "/register",
  "/status",
  "/activate",
  "/health",
];

//request interceptor
AxiosConfig.interceptors.request.use(
  (config) => {
    const shouldSkipToken = excludeEndpoints.some(
      (endpoint) => config.url?.includes(endpoint) // Added return statement
    );

    if (!shouldSkipToken) {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//response interceptor (if needed for token refresh, etc.)
AxiosConfig.interceptors.response.use(
  (response) => response, // Simply return successful responses
  (error) => {
    // Handle specific error cases here if needed
    // For example, redirect to login on 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default AxiosConfig;
