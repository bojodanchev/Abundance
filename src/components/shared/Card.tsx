"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: Props) {
  return (
    <div
      className={cn(
        "p-6 rounded-2xl border border-border bg-surface-muted",
        className
      )}
    >
      {children}
    </div>
  );
}
