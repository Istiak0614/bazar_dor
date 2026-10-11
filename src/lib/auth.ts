import "server-only";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";


const baseURL =
  process.env.BETTER_AUTH_URL ?? "http://localhost:3000";

export const auth = betterAuth({
  appName: "Bazar Dor",
  baseURL,
  secret: process.env.BETTER_AUTH_SECRET,

 
  trustedOrigins: [baseURL],

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
      scope: ["read:user", "user:email"],
    },
  },
});