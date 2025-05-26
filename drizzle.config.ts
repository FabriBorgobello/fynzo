import { defineConfig } from "drizzle-kit";

import { env } from "@/env/server";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema",
  dialect: "postgresql",
  dbCredentials: { url: env.DATABASE_URL, ssl: "require" },
  tablesFilter: [],
  casing: "snake_case",
});
