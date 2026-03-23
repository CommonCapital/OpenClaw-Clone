import { db } from "@/app/db";
import { user } from "@/app/db/schema";
import { runAgent } from "@/lib/agent";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST() {
    const isCron = process.env.CROS_SECRET;
    if (!isCron) {
        const session = await auth.api.getSession({
                                  headers: await headers(),
                                });
                              
                                if (!session) {
                                  return NextResponse.json({error: "Unauthorized"}, {status: 401})
                                }
        const User = await db.select().from(user).where(eq(user.id, session.user.id))
        
        if (!User) {
            return NextResponse.json({error: "User not found"}, {status: 404})
        }      
        if (!User[0].agentEnabled) {
return NextResponse.json(
    {error: "Agent is not enabled"},
    {status: 403}
)
        }
       const result = await runAgent(User[0].id);
       return NextResponse.json(result)

       

    }
    return NextResponse.json({message: "Cron job Agent run successful"})
}