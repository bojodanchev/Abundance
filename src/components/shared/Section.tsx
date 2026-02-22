"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export default function Section({ children, className, id }: Props) {
  return (
    <section id={id} className={cn("py-24 px-6", className)}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}
