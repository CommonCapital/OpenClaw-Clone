import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
     const session = await auth.api.getSession({
                  headers: await headers(),
                });
              
                if (!session) {
                  redirect("/auth/sign-in");
                }
                const provider = request.nextUrl.searchParams.get("provider");
                if (!provider || !['gmail', 'google_calendar'].includes(provider)) {
                    return NextResponse.json
                }

    return new Response("Hello, Next.js!")
}