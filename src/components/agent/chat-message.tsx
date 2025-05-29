import type { Message } from "ai";

import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { MemoizedMarkdown } from "./memoized-markdown";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("mb-4 flex items-start", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <Avatar className="mr-2 h-8 w-8">
          <div className="bg-primary text-primary-foreground flex h-full w-full items-center justify-center rounded-full text-xs font-bold">
            AI
          </div>
        </Avatar>
      )}

      <Card
        className={cn(
          "prose dark:prose-invert max-w-[700px] rounded-xl px-4 py-3",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted",
        )}
      >
        <MemoizedMarkdown content={message.content} id={message.id} />
      </Card>

      {isUser && (
        <Avatar className="ml-2 h-8 w-8">
          <div className="bg-secondary text-secondary-foreground flex h-full w-full items-center justify-center rounded-full text-xs font-bold">
            You
          </div>
        </Avatar>
      )}
    </div>
  );
}
