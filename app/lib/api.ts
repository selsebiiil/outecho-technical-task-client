// lib/api.js
import axios from "axios";
import { getSession } from "next-auth/react"; // Import NextAuth to get session
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
// Create an Axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to inject the token into every request
apiClient.interceptors.request.use(
  async (config) => {
    const session = await getSession(); // Get the session to access the token

    // If there's a session and a token, add it to the Authorization header
    if (session?.user?.token?.access_token) {
      config.headers[
        "Authorization"
      ] = `Bearer ${session?.user?.token?.access_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
