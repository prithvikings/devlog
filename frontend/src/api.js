// src/api.js
import axios from "axios";
const baseURL = import.meta.env.PROD ? import.meta.env.VITE_BACKEND_BASE : "";
const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
