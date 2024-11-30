import type { NextAuthConfig } from "next-auth";
import axios from "axios";
import { signOut } from "@/auth";

const API_BASE_URL = `${process.env.API_URL}`;
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname.startsWith("/login");
      const isOnSettings = nextUrl.pathname.startsWith("/settings");
      const isOnSignup = nextUrl.pathname.startsWith("/signup");
      const isOnProtectedRoutes =
        nextUrl.pathname.startsWith("/settings") ||
        nextUrl.pathname.startsWith("/my-topics");

      if (isOnProtectedRoutes && !isLoggedIn) {
        // Redirect unauthenticated users trying to access the profile page
        return false;
      } else if ((isOnLogin && isLoggedIn) || (isOnSignup && isLoggedIn)) {
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

          session.user = { ...response.data, token: token };
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
