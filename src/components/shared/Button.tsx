"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-display font-semibold rounded-lg transition-all duration-300 cursor-pointer",
        {
          "bg-accent text-primary hover:bg-accent-light": variant === "primary",
          "border border-accent text-accent hover:bg-accent/10": variant === "secondary",
          "text-text-secondary hover:text-text-primary": variant === "ghost",
        },
        {
          "px-4 py-2 text-sm": size === "sm",
          "px-6 py-3 text-base": size === "md",
          "px-8 py-4 text-lg": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
