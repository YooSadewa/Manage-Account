import axios from "axios";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            `${process.env.SERVICE_URL}/login`,
            credentials,
            {
              validateStatus(status) {
                return (
                  (status >= 200 && status < 300) ||
                  status === 403 ||
                  status === 401
                );
              },
            }
          );

          if (res.status === 200) {
            return res.data.data;
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      console.log("user", user);
      if (account?.provider === "credentials") {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.name_user_group = user.name_user_group;
        token.desc_user_group = user.desc_user_group;
        token.user_group_isactive = user.user_group_isactive;
      }
      return token;
    },

    async session({ session, token }: any) {
      // console.log("session", session)
      if ("id" in token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.name_user_group = token.name_user_group;
        session.desc_user_group = token.desc_user_group;
        session.user_group_isactive = token.user_group_isactive;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
