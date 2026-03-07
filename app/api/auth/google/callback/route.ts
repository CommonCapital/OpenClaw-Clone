import { upsertIntegration } from "@/app/db/queries";
import { auth } from "@/lib/auth";
import { encrypt } from "@/lib/encryption";
import { createOAuth2Client, GoogleProvider } from "@/lib/google";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    const cookieStore = await cookies();
    try {
        const session = await auth.api.getSession({
                          headers: await headers(),
                        });
                      
                        if (!session) {
                          redirect("/auth/sign-in");
                        }
                        const code = request.nextUrl.searchParams.get("code");
                        const state = request.nextUrl.searchParams.get("state");
                        const error = request.nextUrl.searchParams.get("error");

                        if (error) {
                            return NextResponse.redirect(
                                new URL("/dashboard/settings?error=consent_denied", request.url)
                            );
                        }
                        if (!code || !state) {
                            return NextResponse.redirect(
                                new URL("/dashboard/settings?error=missing_params", request.url),
                            );
                        }

                        const storedState = cookieStore.get('google_oauth_state')?.value;
                        if (!storedState || storedState !== state) {
                            return NextResponse.redirect(
                                new URL('/dashboard/settings?error=invalid_state', request.url)
                            );
                        }
                        const {provider} = JSON.parse(Buffer.from(storedState, "base64").toString("utf-8"),
                    ) as {nonce: string; provider: GoogleProvider};
const oauth2Client = createOAuth2Client();
const {tokens} = await oauth2Client.getToken(code)
if (!tokens.access_token || !tokens.refresh_token) {
    return NextResponse.redirect(
        new URL("/dashboard/settings?error=no_tokens", request.url)
    );
}

              
const user = session.user;
if (!user) {
    return NextResponse.redirect(
        new URL('/dashboard/settings?error=user_not_found', request.url)
    );
}

await upsertIntegration({
    userId: user.id,
    provider,
    accessToken: encrypt(tokens.access_token),
    refreshToken: encrypt(tokens.refresh_token),
    expiresAt: new Date(tokens.expiry_date ?? Date.now() + 3600 * 1000 ),
    scope: tokens.scope?.split(" ") ?? [],
})


cookieStore.delete("google_oauth_state")
return NextResponse.redirect(
    new URL(`/dashboard/settings?connected=${provider}`, request.url),
);

    } catch (error) {
       console.error("Google OAuth callback error:", error);
       cookieStore.delete("google_oauth_state");
       return NextResponse.redirect(
        new URL("/dashboard/settings?error=callback_failed", request.url)
       )
    }
    
}