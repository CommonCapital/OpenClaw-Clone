import { GoogleProvider } from "@/lib/google";
import { integrations } from "./schema";
import {db} from "@/app/db"
import { and, eq } from "drizzle-orm";
export async function getIntegration(userId: string, provider: GoogleProvider) {
    const [integration] = await db.select().from(integrations).where(and(eq(integrations.userId, userId), eq(integrations.provider, provider)))
    .limit(1);
    return integration ?? null
}
export async function upsertIntegration(data: {
    userId: string;
    provider: GoogleProvider;
    accessToken: string;
    refreshToken: string;
    expiresAt: Date;
    scope: string[];
}) {
const existing = await getIntegration(data.userId, data.provider);
if (existing) {
    await db.update(integrations)
    .set({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresAt: data.expiresAt,
        scope: data.scope,
    }).
    where(eq(integrations.id, existing.id));
    return existing
}


const [result] = await db.insert(integrations).values(data).returning({id: integrations.id});
return result.id;
}

