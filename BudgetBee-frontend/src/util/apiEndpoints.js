//export const BASE_URL = "https://budgetbee-3qeg.onrender.com";
export const BASE_URL = "http://localhost:8080";
const CLOUDINARY_CLOUD_NAME = "dayum7f4k";

export const API_ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  STATUS: "/status",
  ACTIVATE: "/activate",
  HEALTH: "/health",
  GET_USER_INFO: "/profile",
  GET_ALL_CATEGORIES: "/categories",
  ADD_CATEGORY: "/category",
  UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
};
