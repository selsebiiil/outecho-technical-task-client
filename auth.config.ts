import type { NextAuthConfig } from "next-auth";
import axios from "axios";

const API_BASE_URL = `${process.env.API_URL}`;
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.access_token) {
        token.access_token = user.access_token;
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (token.access_token) {
        try {
          const response = await axios.get(`${API_BASE_URL}/user/me`, {
            headers: {
              Authorization: `Bearer ${token.access_token}`,
            },
          });

          session.user = response.data; // Assuming backend returns full user data
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
