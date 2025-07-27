import { File } from "lucide-react";
import { AnimatePresence } from "motion/react";

import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { brightGreen } from "@/lib/logger";
import { cn } from "@/lib/utils";
import { ComunidadesSelector, ComunidadesSelectorMsg } from "@/modules/agent/components/comunidades-selector";
import { CustomUIMessage } from "@/modules/agent/types";

import { DocumentLinkCard } from "./document-link-card";
import { MemoizedMarkdown } from "./memoized-markdown";

export type ChatMessage = ComunidadesSelectorMsg;

export function ChatMessageNew({ message, onMsg }: { message: CustomUIMessage; onMsg: (msg: ChatMessage) => void }) {
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
            "prose dark:prose-invert flex w-full max-w-[700px] flex-col gap-2 rounded-xl px-4 py-3",
            isUser ? "items-end border-[#155dfc] bg-[#155dfc]/20" : "border-[#00a63e] bg-[#00a63e]/20",
          )}
        >
          {/* MESSAGE PARTS */}
          {message.parts.map((part) => {
            switch (part.type) {
              case "reasoning":
              case "source-url":
              case "source-document":
              case "data-getRelevantContext":
              case "data-getComunidadAutonoma":
              case "data-getFormsLinks":
                return <div key={part.type}>{part.type}</div>;

              case "file":
                return (
                  <div key={part.url} className="flex items-center gap-2">
                    <File className="h-3 w-3" />
                    <span className="text-xs">{part.filename}</span>
                  </div>
                );

              case "step-start":
                return null;

              case "tool-getComunidadAutonoma": {
                console.log(`${brightGreen("[TOOL]")} - tool-getComunidadAutonoma: ${part.state}`);
                switch (part.state) {
                  case "output-error":
                  case "input-streaming":
                    return null;
                  case "output-available":
                  case "input-available":
                    return (
                      <ComunidadesSelector
                        key={part.toolCallId}
                        part={part}
                        onMsg={onMsg}
                        disabled={part.state === "output-available"}
                        defaultValue={part.output?.comunidadAutonoma}
                      />
                    );
                  default:
                    part satisfies never;
                    return null;
                }
              }
              case "tool-getRelevantContext": {
                switch (part.state) {
                  case "input-streaming":
                  case "input-available":
                  case "output-available":
                  case "output-error":
                    return null;
                  default:
                    part satisfies never;
                    return null;
                }
              }
              case "tool-getFormsLinks": {
                switch (part.state) {
                  case "input-streaming":
                  case "input-available":
                  case "output-error":
                    return null;
                  case "output-available":
                    return (
                      <div key={part.toolCallId} className="flex w-full flex-col gap-2">
                        <AnimatePresence>
                          {part.output.forms.map((f) => (
                            <DocumentLinkCard key={f.code} form={f} />
                          ))}
                        </AnimatePresence>
                      </div>
                    );
                  default:
                    part satisfies never;
                    return null;
                }
              }
              case "text":
                return <MemoizedMarkdown key={part.text} content={part.text} id={message.id} />;

              default:
                part satisfies never;
                return null;
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
