// types/next-auth.d.ts

import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Define the id type here, adjust if it's different
      email: string;
      name: string;
      // Add other properties from the session if needed
    } & DefaultSession;
  }
}
