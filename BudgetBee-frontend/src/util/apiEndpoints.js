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
  ADD_CATEGORY: "/categories",
  UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
  GET_ALL_CATEGORIES_BY_TYPE: (type) => `/categories/${type}`,
  GET_ALL_INCOMES: "/incomes",
  ADD_INCOME: "/incomes",
  DELETE_INCOME: (incomeId) => `/incomes/${incomeId}`,
  UPDATE_INCOME: (incomeId) => `/incomes/${incomeId}`,
  INCOME_EXCEL_DOWNLOAD: "excel/download/income",
  GET_ALL_EXPENSES: "/expenses",
  ADD_EXPENSE: "/expenses",
  UPDATE_EXPENSE: (expenseId) => `/expenses/${expenseId}`,
  UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
};
