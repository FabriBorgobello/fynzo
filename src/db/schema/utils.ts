import { sql } from "drizzle-orm";
import { timestamp } from "drizzle-orm/pg-core";

export const timestamps = {
  updatedAt: timestamp({ mode: "string" }).$onUpdate(() => sql`CURRENT_TIMESTAMP`),
  createdAt: timestamp({ mode: "string" }).defaultNow().notNull(),
  deletedAt: timestamp({ mode: "string" }),
};
