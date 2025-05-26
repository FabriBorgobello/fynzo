import { integer, pgTable, text, uuid, vector } from "drizzle-orm/pg-core";

import { files } from "./files";
import { timestamps } from "./utils";

export const chunks = pgTable("chunks", {
  id: uuid("id").primaryKey().defaultRandom(),
  fileId: uuid("file_id")
    .notNull()
    .references(() => files.id, { onDelete: "cascade" }),
  index: integer("index").notNull(),
  content: text("content").notNull(),
  embedding: vector("embedding", { dimensions: 1536 }),
  ...timestamps,
});
