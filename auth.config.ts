import type { NextAuthConfig } from "next-auth";
import axios from "axios";
import { redirect } from "next/navigation";

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
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnProfile = nextUrl.pathname.startsWith("/profile"); // Check if the page is the profile page
      const isOnLogin = nextUrl.pathname.startsWith("/login");
      if (isOnDashboard) {
        // Allow access to dashboard for both logged-in and non-logged-in users
        return true;
      } else if (isOnProfile && !isLoggedIn) {
        // Redirect unauthenticated users trying to access the profile page
        return true;
      } else if (isOnLogin && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return true; // Allow access to other pages
    },
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

          session.user = { ...response.data, token: token }; // Assuming backend returns full user data
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
