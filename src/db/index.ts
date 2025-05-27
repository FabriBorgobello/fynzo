import { drizzle } from "drizzle-orm/node-postgres";

import { env } from "@/env/server";

import { chunks } from "./schema/chunks";
import { files } from "./schema/files";

export const db = drizzle(env.DATABASE_URL, {
  casing: "snake_case", // https://orm.drizzle.team/docs/sql-schema-declaration#camel-and-snake-casing
  // logger: true,
  schema: { files, chunks },
});
