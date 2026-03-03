import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { cache } from "react"
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/app/db";
import { headers } from "next/headers";
import { sendVerificationEmail } from "better-auth/api";
import * as schema from "@/app/db/schema";
export const auth = betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg", // or "pg" or "mysql"
      schema,
    }),
   emailAndPassword: {
     enabled: true,
     plugins: [
        nextCookies(),
    ],
    sendResetPassword: async ({ user, url }) => {
      // use your email provider here, e.g. Resend, Nodemailer, etc.
     await auth.api.sendVerificationEmail({
  body: {
    email: user.email,
    callbackURL: "/dashboard",
  },
});

    },
    socialProviders: {
      google: {
           clientId: process.env.GOOGLE_CLIENT_ID!,
           clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      },
      linkedin: {
            clientId: process.env.LINKEDIN_CLIENT_ID!,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      },
    }
}});
export const getSession = cache(async () => {
      return await auth.api.getSession({
         headers: await headers()
     })
 })
