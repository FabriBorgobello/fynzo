import type { Message } from "ai";
import { AnimatePresence } from "motion/react";

import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ToolResult } from "@/services/ai/tools/types";

import { ComunidadesSelector, type ComunidadesSelectorMsg } from "./comunidades-selector";
import { DocumentLinkCard } from "./document-link-card";
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

      <AnimatePresence>
        <Card
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "prose dark:prose-invert w-full max-w-[700px] rounded-xl px-4 py-3",
            isUser ? "border-[#155dfc] bg-[#155dfc]/20" : "border-[#00a63e] bg-[#00a63e]/20",
          )}
        >
          {message.parts?.map((part) => {
            switch (part.type) {
              case "text":
                // DO NOT DISPLAY THE TEXT IF THE RESULT FROM getFormsLinks IS DISPLAYED
                if (
                  message.parts?.some(
                    (p) => p.type === "tool-invocation" && p.toolInvocation.toolName === "getFormsLinks",
                  )
                ) {
                  return null;
                }
                //
                return <MemoizedMarkdown key={part.text} content={part.text} id={message.id} />;
              case "tool-invocation":
                switch (part.toolInvocation.toolName) {
                  case "getComunidadAutonoma":
                    if (part.toolInvocation.state !== "call") return null;
                    return <ComunidadesSelector key={part.toolInvocation.toolCallId} part={part} onMsg={onMsg} />;

                  case "getFormsLinks":
                    if (part.toolInvocation.state !== "result") return null;
                    const result = part.toolInvocation.result as Extract<
                      ToolResult,
                      { toolName: "getFormsLinks" }
                    >["result"];
                    return (
                      <div key={part.toolInvocation.toolCallId} className="flex w-full flex-col gap-2">
                        <AnimatePresence>
                          {result.forms.map((form) => (
                            <DocumentLinkCard key={form.code} form={form} />
                          ))}
                        </AnimatePresence>
                      </div>
                    );

                  default:
                    return null;
                }

              case "source":
              case "reasoning":
              case "file":
              case "step-start":
                return null;

              default:
                part satisfies never;
            }
          })}
        </Card>
      </AnimatePresence>

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
