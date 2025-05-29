import type { Message } from "ai";

import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { ComunidadesSelector, type ComunidadesSelectorMsg } from "./comunidades-selector";
import { MemoizedMarkdown } from "./memoized-markdown";

interface ChatMessageProps {
  message: Message;
  onMsg: (msg: ComunidadesSelectorMsg) => void;
}

export function ChatMessage({ message, onMsg }: ChatMessageProps) {
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
        {message.parts?.map((part) => {
          switch (part.type) {
            case "text":
              return <MemoizedMarkdown key={message.id} content={message.content} id={message.id} />;

            case "tool-invocation":
              switch (part.toolInvocation.toolName) {
                case "getComunidadAutonoma":
                  if (part.toolInvocation.state !== "call") return null;
                  return <ComunidadesSelector key={message.id} part={part} onMsg={onMsg} />;
                default:
                  return null;
              }

            case "source":
            case "reasoning":
            case "file":
            case "step-start":
              console.log(part);
              return null;

            default:
              part satisfies never;
          }
        })}
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
