"use client";

import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

interface QuickActionButtonProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
}

export function QuickActionButton({ title, description, icon, onClick }: QuickActionButtonProps) {
  return (
    <Button
      variant="outline"
      className="hover:bg-muted flex h-auto flex-col items-start gap-2 p-4 whitespace-normal transition-colors"
      onClick={onClick}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium">{title}</span>
        </div>
        <ArrowRight className="h-4 w-4 opacity-70" />
      </div>
      <p className="text-muted-foreground text-left text-sm">{description}</p>
    </Button>
  );
}
