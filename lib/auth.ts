import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { cache } from "react";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/app/db";
import { headers } from "next/headers";
import * as schema from "@/app/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),

  plugins: [          // 👈 top level, not inside emailAndPassword
    nextCookies(),
  ],

  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      // use Resend/Nodemailer here to send the reset URL
      // e.g: await resend.emails.send({ to: user.email, ... })
      console.log("Reset password URL:", url);
    },
  },

  socialProviders: {  // 👈 top level, not inside emailAndPassword
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    linkedin: {
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    },
  },
});

export const getSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});