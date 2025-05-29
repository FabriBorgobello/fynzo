import { ToolCallUnion, ToolResultUnion } from "ai";

import { tools } from ".";

export type ToolCall = ToolCallUnion<typeof tools>;
export type ToolResult = ToolResultUnion<typeof tools>;

export type ToolNames = ToolCall["toolName"] | ToolResult["toolName"];
