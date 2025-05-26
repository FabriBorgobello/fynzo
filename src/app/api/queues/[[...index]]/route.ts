import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { HonoAdapter } from "@bull-board/hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { handle } from "hono/vercel";

import { ingestionQueue } from "@/services/queue/queue";

const app = new Hono();
const basePath = "/api/queues";

// Create the Express adapter
const serverAdapter = new HonoAdapter(serveStatic);

// Create Bull Board with your queues
createBullBoard({
  queues: [new BullMQAdapter(ingestionQueue)],
  serverAdapter,
});

// Configure the server adapter
serverAdapter.setBasePath(basePath);
app.route(basePath, serverAdapter.registerPlugin());

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
