import axios from "axios";

import { tokenStorage } from "../utils/storage";

const API_BASE_URL = import.meta.env.VITE_LOCAL_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_LOCAL_API_BASE_URL is not configured.");
}

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use((config) => {
  const token = tokenStorage.get();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

client.interceptors.response.use(
  (response) => {
    const newToken = response.headers["x-new-token"];

    if (newToken) {
      tokenStorage.set(newToken);
    }

    return response;
  },
  (error) => {
    const status = error.response?.status;
    const isNetworkError = !error.response;

    if (status === 401 || isNetworkError) {
      tokenStorage.remove();

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default client;