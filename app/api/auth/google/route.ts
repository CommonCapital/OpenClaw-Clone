import { auth } from "@/lib/auth";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
export async function GET(request: NextRequest) {
     const session = await auth.api.getSession({
                  headers: await headers(),
                });
              
                if (!session) {
                  redirect("/auth/sign-in");
                }
                const provider = request.nextUrl.searchParams.get("provider");
                if (!provider || !['gmail', 'google_calendar'].includes(provider)) {
                    return NextResponse.json({error: "Invalid provider"}, {status: 400});
                }
                const state = Buffer.from(JSON.stringify({nonce: crypto.randomUUID(), provider})).toString("base64");
                const cookieStore = await cookies();
                cookieStore.set("google_oauth_state", state, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 60*10,
                    path: "/",
                    sameSite: "lax",
                });
                const authUrl = getAuthUrl(provider, state);
                

    return new Response("Hello, Next.js!")
}