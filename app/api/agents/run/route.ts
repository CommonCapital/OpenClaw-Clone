import { db } from "@/app/db";
import { getAgentEligibleUsers } from "@/app/db/queries";
import { user } from "@/app/db/schema";
import { runAgent } from "@/lib/agent";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const cronSecret = request.headers.get("authorization")
    const isCron = process.env.CRON_SECRET && cronSecret === `Bearer ${process.env.CRON_SECRET}`;

   

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
const results = []
    const eligibleUsers = await getAgentEligibleUsers();
    for (const user of eligibleUsers ) {
        const result = await runAgent(user.id);
        results.push({userId: user.id, status: "success", summary: result.summary});
    }

    return NextResponse.json({results, processedCount: results.length})
}


