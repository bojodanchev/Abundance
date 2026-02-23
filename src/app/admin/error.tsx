"use client";

import { Diamond, RefreshCw } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md">
        <Diamond className="w-10 h-10 text-accent mx-auto mb-4" />
        <h2 className="text-xl font-display font-bold text-text-primary mb-2">
          Something went wrong
        </h2>
        <p className="text-text-secondary text-sm mb-6">
          {error.message || "An unexpected error occurred."}
          {error.digest && (
            <span className="block mt-1 text-text-secondary/50 text-xs">
              Digest: {error.digest}
            </span>
          )}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-primary text-sm font-display font-semibold rounded-lg hover:bg-accent-dark transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}
