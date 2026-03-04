import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, index, pgEnum, jsonb, uuid, integer } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  agentEnabled: boolean("agent_enabled").default(true).notNull(),
  onboardingCompleted: boolean("onboarding_completed").default(false).notNull(),
  preferences: jsonb("preferences").default({}).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));
export const integrationProviderEum = pgEnum("integration_provider", ["gmail", "google_calendar"]);
export const taskStatusEnum= pgEnum("task_status", [
    "pending",
    "completed",
    "cancelled",
]);
export const taskPriorityEnum = pgEnum("task_priority", [
    "low",
    "medium",
    "high",
]);
export const agentRunStatusEnum = pgEnum("agent_run_status", [
    "running",
    "success",
    "failed",
]);


export const integrations = pgTable("integrations", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").references(() => user.id, {onDelete: "cascade"}).notNull(),
    provider: integrationProviderEum("provider").notNull(),
    accessToken: text("access_token").notNull(),
    refreshToken: text("refresh_token").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    scope: text("scope").array().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const tasks = pgTable("tasks", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").references(() => user.id, {onDelete: "cascade"}).notNull(),
    title: text("title").notNull(),
    description: text("description"),
    status: taskStatusEnum("status").default("pending").notNull(),
    priority: taskPriorityEnum("priority").default("medium").notNull(),
    dueDate: timestamp("due_date"),
    createdByAgent: boolean("created_by_agent").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    completedAt: timestamp("completed_at").defaultNow().notNull(),
});

export interface ActionLogEntry {
    emailId: string;
    subject: string;
    from: string;
    date: string;
    status: "success" | "error";
    summary?: string;
    priority?: string;
    category?: string;
    needsReply?: boolean;
    draftReply?: string | null;
    actionItems?: {
        title: string;
        description: string;
        dueDate?: string | null;
    }[];
    taskCreated?: number;
    draftCreated?: boolean;
    eventsCreated?: number;

}

export const agentRuns = pgTable("agent_runs", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").references(() => user.id, {onDelete: "cascade"}).notNull(),
    status: agentRunStatusEnum("status").default("running").notNull(),
    summary: text("summary"),
    actionLog: jsonb("action_log").$type<ActionLogEntry[]>().default([]).notNull(),
    emailsProcessed: integer("emails_processed").default(0).notNull(),
    tasksCreated: integer("tasks_created").default(0).notNull(),
    draftsCreated: integer("drafts_created").default(0).notNull(),
    errorMessage: text("error_message"),
    startedAt: timestamp("started_at").defaultNow().notNull(),
    completedAt: timestamp("completed_at"),
    durationMs: integer("duration_ms"),
});

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;

export type Integration = typeof integrations.$inferSelect;
export type NewIntegration = typeof integrations.$inferInsert;

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;

export type AgentRun = typeof agentRuns.$inferSelect;
export type NewAgentRun = typeof agentRuns.$inferInsert;

export type ProcessedEmail = ActionLogEntry & { processedAt: Date };