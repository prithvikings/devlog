// src/api.js
import axios from "axios";

const api = axios.create({
  // NO BASE URL. It defaults to the current domain (localhost:5173)
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
