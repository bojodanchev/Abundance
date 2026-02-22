"use client";

import { QuizProvider } from "@/components/quiz/QuizContext";
import QuizShell from "@/components/quiz/QuizShell";

export default function DiagnosePage() {
  return (
    <QuizProvider>
      <QuizShell />
    </QuizProvider>
  );
}
