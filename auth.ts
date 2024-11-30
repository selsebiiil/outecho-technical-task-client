import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { authConfig } from "./auth.config";

const API_BASE_URL = `${process.env.API_URL}`;
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Step 1: Call the backend API for login to get the access_token
          const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            email: credentials.email,
            password: credentials.password,
          });

          const { access_token } = response.data;

          if (access_token) {
            // Step 2: If access_token is returned, use it to fetch user data

            const userResponse = await axios.get(`${API_BASE_URL}/user/me`, {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            });
            if (!userResponse) {
              return null;
            }
            // Step 3: Return the full user object (including access_token and other user details)
            return {
              access_token,
              ...userResponse.data, // Assuming userResponse.data contains the user details
            };
          }

          return null; // If no access_token is returned, return null
        } catch (error) {
          return null;
        }
      },
    }),
  ],
});
