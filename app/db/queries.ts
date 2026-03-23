import { GoogleProvider } from "@/lib/google";
import { ActionLogEntry, agentRuns, integrations, tasks } from "./schema";
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



export async function getUserIntegrations(userId: string) {
    const results = await db.select().from(integrations).where(eq(integrations.userId, userId));
    return results ?? [];
}

export async function createAgentRun( userId: string ) {
const [result] = await db.insert(agentRuns).values({userId, status: "running"}).returning();
return result ?? null
}



export async function completeAgentRun(agentRunId: string, data: {
                    status: "success" | "failed";
                    summary: string;
                    actionsLog:  ActionLogEntry[];
                    emailProcessed: number;
                    tasksCreated: number;
                    draftsCreated: number;
                    errorMessage?: string,
                    
                    
                    durationMs: number;


}) {
   const [run] = await db.update(agentRuns).set({...data, completedAt: new Date()}).where(eq(agentRuns.id, agentRunId)).returning();
   return run ;
}


export async function createTask(data: {
    userId: string;
    title: string;
    description: string;
    priority?: "low" | "medium" | "high";
    dueDate: Date | null;
    createdByAgent: boolean;
}) {
const [task] = await db.insert(tasks).values({
    userId: data.userId,
    title: data.title,
    description: data.description ?? null,
    priority: data.priority ?? "medium",
    dueDate: data.dueDate ?? null,
    createdByAgent: data.createdByAgent ?? false
}).returning();
return task;
}