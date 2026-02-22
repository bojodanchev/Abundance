"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  RefreshCw,
  Mail,
  ChevronDown,
  ChevronRight,
  Loader2,
  Phone,
  Globe,
  DollarSign,
  Target,
  Calendar,
  MapPin,
  Clock,
  CreditCard,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Lead = Record<string, any>;
type EmailLog = Record<string, any>;
type Payment = Record<string, any>;
/* eslint-enable @typescript-eslint/no-explicit-any */

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-400",
  processing: "bg-blue-500/10 text-blue-400",
  completed: "bg-green-500/10 text-green-400",
  error: "bg-red-500/10 text-red-400",
};

const STATUSES = ["pending", "processing", "completed", "error"] as const;

const SCORE_LABELS: Record<string, string> = {
  finances: "Finances",
  business: "Business",
  health: "Health",
  mental: "Mental",
  romantic: "Romantic",
  social: "Social",
  mission: "Mission",
};

const SCORE_COLORS: Record<string, string> = {
  finances: "bg-emerald-500",
  business: "bg-blue-500",
  health: "bg-red-500",
  mental: "bg-purple-500",
  romantic: "bg-pink-500",
  social: "bg-amber-500",
  mission: "bg-accent",
};

const EMAIL_TYPES = [
  "welcome",
  "nurture_1",
  "nurture_2",
  "nurture_3",
  "nurture_4",
  "nurture_5",
] as const;

export default function LeadDetail({
  lead: initialLead,
  emailLogs,
  payments,
}: {
  lead: Lead;
  emailLogs: EmailLog[];
  payments: Payment[];
}) {
  const router = useRouter();
  const [lead, setLead] = useState(initialLead);
  const [statusLoading, setStatusLoading] = useState(false);
  const [reanalyzeLoading, setReanalyzeLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState<string | null>(null);
  const [expandedAnalysis, setExpandedAnalysis] = useState<string[]>([]);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showEmailMenu, setShowEmailMenu] = useState(false);

  const updateStatus = async (newStatus: string) => {
    setStatusLoading(true);
    setShowStatusMenu(false);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        setLead(updated);
      }
    } finally {
      setStatusLoading(false);
    }
  };

  const handleReanalyze = async () => {
    setReanalyzeLoading(true);
    try {
      await fetch(`/api/admin/leads/${lead.id}/re-analyze`, {
        method: "POST",
      });
      router.refresh();
    } finally {
      setReanalyzeLoading(false);
    }
  };

  const handleResendEmail = async (emailType: string) => {
    setEmailLoading(emailType);
    setShowEmailMenu(false);
    try {
      await fetch(`/api/admin/leads/${lead.id}/resend-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email_type: emailType }),
      });
    } finally {
      setEmailLoading(null);
    }
  };

  const toggleAnalysisSection = (key: string) => {
    setExpandedAnalysis((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const scores: Record<string, number> = lead.scores || {};
  const analysisResult: Record<string, unknown> = lead.analysis_result || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Back button */}
      <button
        onClick={() => router.push("/admin/leads")}
        className="flex items-center gap-2 text-text-secondary hover:text-accent text-sm mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Leads
      </button>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary">
            {lead.user_name || "Unknown"}
          </h1>
          <p className="text-text-secondary text-sm mt-1">
            {lead.user_email || "No email"}
          </p>
          <div className="flex items-center gap-3 mt-3">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[lead.status] || "bg-gray-500/10 text-gray-400"}`}
            >
              {lead.status}
            </span>
            {lead.tier && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                {lead.tier}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Re-analyze */}
          <button
            onClick={handleReanalyze}
            disabled={reanalyzeLoading}
            className="flex items-center gap-2 px-4 py-2 bg-surface-muted border border-border rounded-lg text-sm text-text-secondary hover:text-accent hover:border-accent/30 transition-colors disabled:opacity-50"
          >
            {reanalyzeLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            Re-analyze
          </button>

          {/* Resend Email dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowEmailMenu(!showEmailMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-surface-muted border border-border rounded-lg text-sm text-text-secondary hover:text-accent hover:border-accent/30 transition-colors"
            >
              {emailLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Mail className="w-4 h-4" />
              )}
              Send Email
              <ChevronDown className="w-3 h-3" />
            </button>
            {showEmailMenu && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-surface-muted border border-border rounded-lg shadow-xl z-10 py-1">
                {EMAIL_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleResendEmail(type)}
                    className="block w-full text-left px-4 py-2 text-sm text-text-secondary hover:text-accent hover:bg-white/5 transition-colors"
                  >
                    {type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Change Status dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              disabled={statusLoading}
              className="flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-lg text-sm text-accent hover:bg-accent/20 transition-colors disabled:opacity-50"
            >
              {statusLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Change Status"
              )}
              <ChevronDown className="w-3 h-3" />
            </button>
            {showStatusMenu && (
              <div className="absolute right-0 top-full mt-1 w-40 bg-surface-muted border border-border rounded-lg shadow-xl z-10 py-1">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(s)}
                    className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                      lead.status === s
                        ? "text-accent bg-accent/5"
                        : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                    }`}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact & Segmentation */}
        <div className="bg-surface-muted border border-border rounded-xl p-6">
          <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-4">
            Contact & Segmentation
          </h3>
          <div className="space-y-3">
            <InfoRow icon={Phone} label="Phone" value={lead.user_phone} />
            <InfoRow icon={Globe} label="Locale" value={lead.locale?.toUpperCase()} />
            <InfoRow
              icon={DollarSign}
              label="Income"
              value={lead.income_level?.replace(/_/g, " ")}
            />
            <InfoRow
              icon={Target}
              label="Commitment"
              value={lead.commitment_level}
            />
            {lead.utm_source && (
              <InfoRow icon={Globe} label="UTM Source" value={lead.utm_source} />
            )}
            {lead.utm_medium && (
              <InfoRow icon={Globe} label="UTM Medium" value={lead.utm_medium} />
            )}
            {lead.utm_campaign && (
              <InfoRow
                icon={Globe}
                label="UTM Campaign"
                value={lead.utm_campaign}
              />
            )}
            {lead.referral_code && (
              <InfoRow
                icon={Globe}
                label="Referral Code"
                value={lead.referral_code}
              />
            )}
          </div>
        </div>

        {/* Life Audit Scores */}
        <div className="bg-surface-muted border border-border rounded-xl p-6">
          <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-4">
            Life Audit Scores
          </h3>
          {Object.keys(scores).length > 0 ? (
            <div className="space-y-3">
              {Object.entries(SCORE_LABELS).map(([key, label]) => {
                const value = scores[key] ?? 0;
                return (
                  <div key={key}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-text-secondary">{label}</span>
                      <span className="text-text-primary font-medium">
                        {value}/10
                      </span>
                    </div>
                    <div className="w-full h-2 bg-surface-dark rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${value * 10}%` }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className={`h-full rounded-full ${SCORE_COLORS[key] || "bg-accent"}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-text-secondary text-sm">No scores available</p>
          )}
          {lead.priority_top3 && lead.priority_top3.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-text-secondary uppercase tracking-wider mb-2">
                Top 3 Priorities
              </p>
              <div className="flex flex-wrap gap-2">
                {lead.priority_top3.map((p: string) => (
                  <span
                    key={p}
                    className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Birth Data */}
        <div className="bg-surface-muted border border-border rounded-xl p-6">
          <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-4">
            Birth Data
          </h3>
          <div className="space-y-3">
            <InfoRow icon={Calendar} label="Date" value={lead.birth_date} />
            <InfoRow
              icon={Clock}
              label="Time"
              value={
                lead.birth_time_unknown
                  ? "Unknown"
                  : lead.birth_time || "Not provided"
              }
            />
            <InfoRow icon={MapPin} label="City" value={lead.birth_city} />
            <InfoRow icon={Globe} label="Country" value={lead.birth_country} />
          </div>
        </div>

        {/* Analysis Result */}
        <div className="bg-surface-muted border border-border rounded-xl p-6">
          <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-4">
            Analysis Result
          </h3>
          {Object.keys(analysisResult).length > 0 ? (
            <div className="space-y-1">
              {Object.entries(analysisResult).map(([key, value]) => (
                <div key={key} className="border-b border-border/50 last:border-0">
                  <button
                    onClick={() => toggleAnalysisSection(key)}
                    className="flex items-center justify-between w-full py-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <span className="font-medium">
                      {key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${expandedAnalysis.includes(key) ? "rotate-90" : ""}`}
                    />
                  </button>
                  {expandedAnalysis.includes(key) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="pb-3 overflow-hidden"
                    >
                      <pre className="text-xs text-text-secondary bg-surface-dark rounded-lg p-3 overflow-x-auto whitespace-pre-wrap">
                        {typeof value === "string"
                          ? value
                          : JSON.stringify(value, null, 2)}
                      </pre>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-text-secondary text-sm">No analysis data</p>
          )}
        </div>

        {/* Email Timeline */}
        <div className="bg-surface-muted border border-border rounded-xl p-6">
          <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-4">
            Email Timeline
          </h3>
          {emailLogs.length > 0 ? (
            <div className="relative pl-6">
              <div className="absolute left-2 top-1 bottom-1 w-px bg-border" />
              <div className="space-y-4">
                {emailLogs.map((log) => (
                  <div key={log.id} className="relative">
                    <div className="absolute -left-[18px] top-1 w-3 h-3 rounded-full border-2 border-accent bg-surface-muted" />
                    <div>
                      <p className="text-sm text-text-primary font-medium">
                        {(log.email_type || "")
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (c: string) => c.toUpperCase())}
                      </p>
                      <p className="text-xs text-text-secondary mt-0.5">
                        {log.sent_at
                          ? new Date(log.sent_at).toLocaleString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "—"}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        {log.opened && (
                          <span className="flex items-center gap-1 text-xs text-green-400">
                            <CheckCircle2 className="w-3 h-3" /> Opened
                          </span>
                        )}
                        {log.clicked && (
                          <span className="flex items-center gap-1 text-xs text-blue-400">
                            <CheckCircle2 className="w-3 h-3" /> Clicked
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-text-secondary text-sm">No emails sent yet</p>
          )}
        </div>

        {/* Payment History */}
        <div className="bg-surface-muted border border-border rounded-xl p-6">
          <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-4">
            Payment History
          </h3>
          {payments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-text-secondary">
                    <th className="text-left pb-2 font-medium">Date</th>
                    <th className="text-left pb-2 font-medium">Tier</th>
                    <th className="text-left pb-2 font-medium">Amount</th>
                    <th className="text-left pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-border/50 last:border-0"
                    >
                      <td className="py-2 text-text-secondary">
                        {new Date(p.created_at).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-2">
                        <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full">
                          {p.tier}
                        </span>
                      </td>
                      <td className="py-2 text-text-primary font-medium">
                        {(p.amount_cents / 100).toFixed(2)} {p.currency}
                      </td>
                      <td className="py-2">
                        {p.status === "paid" ? (
                          <span className="flex items-center gap-1 text-green-400 text-xs">
                            <CheckCircle2 className="w-3 h-3" /> Paid
                          </span>
                        ) : p.status === "failed" ? (
                          <span className="flex items-center gap-1 text-red-400 text-xs">
                            <XCircle className="w-3 h-3" /> Failed
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-amber-400 text-xs">
                            <AlertCircle className="w-3 h-3" /> {p.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-text-secondary text-sm">No payments recorded</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value?: string | null;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-text-secondary shrink-0" />
      <span className="text-text-secondary text-sm w-28 shrink-0">
        {label}
      </span>
      <span className="text-text-primary text-sm">{value || "—"}</span>
    </div>
  );
}
