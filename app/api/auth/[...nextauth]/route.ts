import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb-client";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectDB();
          console.log("Authorize input:", credentials);
          
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            console.log("User not found:", credentials.email);
            return null;
          }
          
          console.log("User found:", user);
          const isValid = await bcrypt.compare(credentials.password, user.password);
          console.log("Password valid:", isValid);
          
          if (!isValid) return null;
          
          // Check if user has profile
          await connectDB();
          const Profile = (await import("@/lib/models/Profile")).default;
          const profile = await Profile.findOne({ user: user._id });
          const hasProfile = !!profile;
          
          console.log("Has Profile:", hasProfile);
          
          return { 
            id: user._id.toString(), 
            name: user.name, 
            email: user.email,
            hasProfile: hasProfile
          };
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.hasProfile = user.hasProfile; // Pastikan ini ada!
      }
      // Update token saat session di-update
      if (trigger === "update" && session?.hasProfile !== undefined) {
        token.hasProfile = session.hasProfile;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.hasProfile = token.hasProfile as boolean; // Pastikan ini ada!
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
