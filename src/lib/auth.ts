import "server-only";

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const uri =
  process.env.MONGODB_URI || process.env.MONGODB_URL;

if (!uri) {
  throw new Error("Set MONGODB_URI or MONGODB_URL.");
}

const globalForMongo = globalThis as typeof globalThis & {
  bazarMongoClient?: MongoClient;
};

const client =
  globalForMongo.bazarMongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.bazarMongoClient = client;
}

const db = client.db(process.env.MONGODB_DB || "bazar_dor");

const baseURL =
  process.env.BETTER_AUTH_URL || "http://localhost:3000";

const socialProviders = {
  ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
      }
    : {}),
  ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
    ? {
        github: {
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
          scope: ["read:user", "user:email"],
        },
      }
    : {}),
};

export const auth = betterAuth({
  appName: "Bazar Dor",
  baseURL,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [
    baseURL,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ],

  // transaction: false -> works on a normal (standalone) MongoDB.
  // Transactions need a replica set (Atlas has one, local mongod does not).
  database: mongodbAdapter(db, {
    client,
    transaction: false,
  }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },

  socialProviders,
});
