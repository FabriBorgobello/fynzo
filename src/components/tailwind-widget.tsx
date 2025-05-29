"use client";

import * as React from "react";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type Breakpoint = "XS" | "SM" | "MD" | "LG" | "XL" | "2XL";

function getBreakpoint(width: number): Breakpoint {
  if (width < 640) return "XS";
  if (width >= 640 && width < 768) return "SM";
  if (width >= 768 && width < 1024) return "MD";
  if (width >= 1024 && width < 1280) return "LG";
  if (width >= 1280 && width < 1536) return "XL";
  return "2XL";
}

export function TailwindWidget({ position }: Readonly<{ position: "left" | "right" }>) {
  const [breakpoint, setBreakpoint] = React.useState<Breakpoint>("XS");

  React.useEffect(() => {
    setBreakpoint(getBreakpoint(window.innerWidth));
    const handleResize = () => setBreakpoint(getBreakpoint(window.innerWidth));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={cn(
        "bg-background fixed bottom-4 overflow-hidden rounded-lg border border-gray-500 p-2 text-xs font-bold shadow-lg",
        position === "left" ? "left-4" : "right-4",
      )}
    >
      <motion.p key={breakpoint} initial={{ y: 20 }} animate={{ y: 0 }} transition={{ duration: 0.1 }}>
        {breakpoint}
      </motion.p>
    </div>
  );
}
