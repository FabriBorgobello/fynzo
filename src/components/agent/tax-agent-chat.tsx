"use client";

import { useRef } from "react";

import { useChat } from "@ai-sdk/react";
import { FileText, Send } from "lucide-react";

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
  const { messages, input, handleInputChange, handleSubmit, status, append } = useChat({
    api: "/api/chat",
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Console log tool calls
  console.log(
    messages
      .filter((m) => m.role === "assistant")
      .map((m) => m.parts.map((p) => p.type === "tool-invocation" && p.toolInvocation)),
  );

  const handleQuickAction = (message: string) => {
    append({
      role: "user",
      content: message,
    });
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
    <Card className="w-full rounded-lg border">
      <div className="flex h-[600px] flex-col">
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
              <ChatMessage key={index} message={message} />
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
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
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
