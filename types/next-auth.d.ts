// types/next-auth.d.ts

import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    access_token: string;
    id: string;
    email: string;
  }

  interface Session {
    user: User;
  }
}
