// types/next-auth.d.ts

import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    access_token: string;
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    token: { access_token: string };
  }

  interface Session {
    user: User;
  }
}
