"use client";

type Props = {
  title: string;
  description: string;
  score?: number;
};

export default function InsightCard({ title, description, score }: Props) {
  return (
    <div className="p-6 rounded-xl border border-border bg-surface-muted">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-display font-semibold text-text-primary">
          {title}
        </h3>
        {score !== undefined && (
          <span className="text-accent font-mono text-sm">{score}/10</span>
        )}
      </div>
      <p className="text-text-secondary text-sm">{description}</p>
    </div>
  );
}
