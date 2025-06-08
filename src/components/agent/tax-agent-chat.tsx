"use client";

import { useRef, useState } from "react";

import { useChat } from "@ai-sdk/react";
import { File, FileText, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dictionary } from "@/dictionaries";

import { ChatMessage } from "./chat-message";
import { QuickActionButton } from "./quick-action-button";

interface TaxAgentChatProps {
  dict: Dictionary;
}

export function TaxAgentChat({ dict }: TaxAgentChatProps) {
  const { messages, input, handleInputChange, handleSubmit, status, append, addToolResult } = useChat({
    api: "/api/chat",
    onToolCall: async ({ toolCall }) => {
      console.log("[TOOL CALL]", toolCall);
    },
  });
  const [isDragActive, setIsDragActive] = useState(false);
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleQuickAction = (message: string) => {
    append({
      role: "user",
      content: message,
    });
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(true);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);
    const files = event.dataTransfer.files;
    setFiles(files);
  };

  // Quick action templates
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
        <AnimatePresence>
          {isDragActive && (
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
          <div className="flex-1 overflow-auto p-4">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message}
                onMsg={(msg) => {
                  switch (msg.type) {
                    case "onComunidadAutonomaChange":
                      addToolResult({
                        toolCallId: msg.toolCallId,
                        result: msg.value,
                      });
                      break;
                  }
                }}
              />
            ))}
            <div
              ref={(el) => {
                messagesEndRef.current = el;
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div>
        )}

        <div className="flex-shrink-0 border-t p-4">
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
          <form
            onSubmit={(e) => {
              handleSubmit(e, { experimental_attachments: files });
              setFiles(undefined);
            }}
            className="flex items-center space-x-2"
          >
            <Input
              name="message"
              placeholder={dict.agent.inputPlaceholder}
              value={input}
              onChange={handleInputChange}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={status === "streaming" || !input.trim()}>
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </Card>
  );
}
