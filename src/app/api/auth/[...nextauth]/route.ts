// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, account, user }) {
      // Runs on initial sign in
      if (account && user) {
        token.userId = user.id;
        token.email = user.email;

        // Custom JWT
        const customToken = jwt.sign(
          {
            userId: user.id,
            email: user.email,
          },
          JWT_SECRET,
          { expiresIn: "7d" }
        );

        token.customToken = customToken;
      }
      return token;
    },

    async session({ session, token }) {
      // Make custom token available in session
      session.user.token = token.customToken;
      return session;
    },
  },
});
export { handler as GET, handler as POST };
