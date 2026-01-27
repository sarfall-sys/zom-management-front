const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";

export const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    'Content-Type': 'application/json',
    Accept: "application/json",
  },
});
