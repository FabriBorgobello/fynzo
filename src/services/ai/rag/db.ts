import { eq } from "drizzle-orm";

import { db } from "@/db";
import { files } from "@/db/schema/files";

export async function findFileByEtag(etag: string) {
  return db.query.files.findFirst({
    where: eq(files.etag, etag),
    columns: { id: true, name: true, processedAt: true },
  });
}

export async function getAllFiles() {
  return db.query.files.findMany({
    columns: { id: true, name: true, etag: true, processedAt: true },
  });
}

export async function deleteFile(fileId: string) {
  await db.delete(files).where(eq(files.id, fileId));
  // Note: Chunks will be automatically deleted due to the onDelete: "cascade" constraint
}
