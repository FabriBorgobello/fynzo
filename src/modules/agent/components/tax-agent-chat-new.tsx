"use client";

import { useRef, useState } from "react";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, lastAssistantMessageIsCompleteWithToolCalls } from "ai";
import { File, FileText, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dictionary } from "@/dictionaries";
import { brightBlue, brightRed } from "@/lib/logger";
import { CustomUIMessage } from "@/modules/agent/types";

import { ChatMessageNew } from "./chat-message-new";
import { QuickActionButton } from "./quick-action-button";

export function TaxAgentChat({ dict }: { dict: Dictionary }) {
  const {
    addToolResult,
    messages,
    sendMessage,
    status,
    //  error,
    //  id,
    //  regenerate,
    //  resumeStream,
    //  setMessages,
    //  stop
  } = useChat<CustomUIMessage>({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls, // https://v5.ai-sdk.dev/cookbook/next/human-in-the-loop#intercept-tool-call
    onData: (data) => {
      console.log(`${brightBlue("[CHAT]")} - onData`, data);
    },
    onError: (error) => {
      console.log(`${brightRed("[CHAT]")} - onError`, error);
    },
    onToolCall: async ({ toolCall }) => {
      console.log(`${brightBlue("[CHAT]")} - onToolCall`, toolCall);
    },
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const [isDragging, setIsDragging] = useState(false);
  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
  }
  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
    setIsDragging(false);
  }

  function handleQuickAction(description: string) {
    sendMessage({ text: description });
  }

  const QUICK_ACTIONS = [
    {
      title: dict.agent.quickActions.taxDeductions.title,
      description: dict.agent.quickActions.taxDeductions.description,
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: dict.agent.quickActions.paymentDates.title,
      description: dict.agent.quickActions.paymentDates.description,
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: dict.agent.quickActions.vatPayment.title,
      description: dict.agent.quickActions.vatPayment.description,
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: dict.agent.quickActions.selfEmployedTaxes.title,
      description: dict.agent.quickActions.selfEmployedTaxes.description,
      icon: <FileText className="h-4 w-4" />,
    },
  ];

  return (
    <Card className="w-full rounded-lg border p-0">
      <div className="relative flex h-[600px] flex-col" onDragOver={handleDragOver} onDrop={handleDrop}>
        {/* Dragging overlay */}
        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute flex h-full w-full items-center justify-center bg-black/80"
            >
              <p className="text-white">Drop files here...</p>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Messages */}
        {messages.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center space-y-6 p-6">
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-medium">{dict.agent.welcome}</h3>
              <p className="text-muted-foreground">{dict.agent.welcomeDescription}</p>
            </div>

            <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
              {QUICK_ACTIONS.map((action, index) => (
                <QuickActionButton
                  key={index}
                  title={action.title}
                  description={action.description}
                  icon={action.icon}
                  onClick={() => handleQuickAction(action.description)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-4">
            {messages.map((message) => (
              <ChatMessageNew
                key={message.id}
                message={message}
                onMsg={(m) => {
                  switch (m.type) {
                    case "onComunidadAutonomaChange":
                      console.log(`${brightBlue("[CHAT]")} - onComunidadAutonomaChange`, m);
                      addToolResult({
                        toolCallId: m.toolCallId,
                        tool: "getComunidadAutonoma",
                        output: { comunidadAutonoma: m.value },
                      });
                      break;

                    default:
                      m.type satisfies never;
                      return;
                  }
                }}
              />
            ))}
          </div>
        )}
        <div className="flex-shrink-0 border-t p-4">
          {/* Files */}
          {files && (
            <div className="mb-2 flex items-center space-x-2">
              {Array.from(files).map((file) => (
                <div
                  key={file.name}
                  className="text-muted-foreground flex items-center space-x-2 rounded-md border p-2"
                >
                  <File className="h-4 w-4" />
                  <span className="text-xs">{file.name}</span>
                  <X
                    className="h-4 w-4 cursor-pointer"
                    onClick={() => {
                      const fileArray = Array.from(files);
                      const filteredFiles = fileArray.filter((f) => f.name !== file.name);
                      const dataTransfer = new DataTransfer();
                      filteredFiles.forEach((file) => dataTransfer.items.add(file));
                      setFiles(dataTransfer.files);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
          {/* Input */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const input = inputRef.current?.value ?? "";
              if (input.trim()) {
                sendMessage({ text: input, files });
                inputRef.current!.value = "";
                setFiles(undefined);
              }
            }}
            className="flex items-center space-x-2"
          >
            <Input name="message" placeholder={dict.agent.inputPlaceholder} ref={inputRef} className="flex-1" />
            <Button type="submit" size="icon" disabled={status === "streaming"}>
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </Card>
  );
}
