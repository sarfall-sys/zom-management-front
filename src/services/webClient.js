const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";

export const webClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    Accept: "application/json",
  },
});