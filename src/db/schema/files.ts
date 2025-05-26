import { pgTable, text, uuid } from "drizzle-orm/pg-core";

import { timestamps } from "./utils";

export const files = pgTable("files", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(), // filename
  etag: text("etag").notNull(), // hash or identifier from MinIO
  ...timestamps,
});
