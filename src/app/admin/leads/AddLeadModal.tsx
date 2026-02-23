"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, UserPlus } from "lucide-react";

const LIFE_AREAS = [
  "finances",
  "business",
  "health",
  "mental",
  "romantic",
  "social",
  "mission",
] as const;

const INCOME_LEVELS = [
  { value: "under_1000", label: "Under €1K" },
  { value: "1000_3000", label: "€1K-3K" },
  { value: "3000_6000", label: "€3K-6K" },
  { value: "6000_10000", label: "€6K-10K" },
  { value: "over_10000", label: "Over €10K" },
];

const COMMITMENT_LEVELS = [
  { value: "curious", label: "Curious" },
  { value: "ready", label: "Ready" },
  { value: "committed", label: "Committed" },
  { value: "all_in", label: "All In" },
];

const TIERS = [
  { value: "free", label: "Free" },
  { value: "low", label: "Low" },
  { value: "mid", label: "Mid" },
  { value: "high", label: "High" },
];

const LOCALES = [
  { value: "bg", label: "BG" },
  { value: "en", label: "EN" },
];

interface AddLeadModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: (id: string) => void;
}

export default function AddLeadModal({
  open,
  onClose,
  onCreated,
}: AddLeadModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Basic info
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [locale, setLocale] = useState("bg");
  const [tier, setTier] = useState("free");

  // Segmentation
  const [incomeLevel, setIncomeLevel] = useState("");
  const [commitmentLevel, setCommitmentLevel] = useState("");

  // Birth data
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthTimeUnknown, setBirthTimeUnknown] = useState(false);
  const [birthCity, setBirthCity] = useState("");
  const [birthCountry, setBirthCountry] = useState("");

  // Scores
  const [scores, setScores] = useState<Record<string, number>>(
    Object.fromEntries(LIFE_AREAS.map((a) => [a, 5]))
  );

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/leads/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: userName,
          user_email: userEmail,
          user_phone: userPhone || undefined,
          locale,
          tier,
          income_level: incomeLevel || undefined,
          commitment_level: commitmentLevel || undefined,
          birth_date: birthDate || undefined,
          birth_time: birthTimeUnknown ? undefined : birthTime || undefined,
          birth_time_unknown: birthTimeUnknown,
          birth_city: birthCity || undefined,
          birth_country: birthCountry || undefined,
          scores,
          status: "pending",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create lead");
        return;
      }

      onCreated(data.id);
      resetForm();
      onClose();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setUserName("");
    setUserEmail("");
    setUserPhone("");
    setLocale("bg");
    setTier("free");
    setIncomeLevel("");
    setCommitmentLevel("");
    setBirthDate("");
    setBirthTime("");
    setBirthTimeUnknown(false);
    setBirthCity("");
    setBirthCountry("");
    setScores(Object.fromEntries(LIFE_AREAS.map((a) => [a, 5])));
    setShowAdvanced(false);
    setError("");
  };

  const inputClass =
    "w-full bg-surface-dark border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent transition-all";
  const selectClass =
    "w-full bg-surface-dark border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all";
  const labelClass = "block text-xs font-medium text-text-secondary mb-1.5";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="bg-surface-muted border border-border rounded-xl w-full max-w-lg mx-4 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <UserPlus className="w-4 h-4 text-accent" />
                </div>
                <h2 className="font-display font-bold text-lg text-text-primary">
                  Add Lead
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Required fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="john@example.com"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Phone</label>
                  <input
                    type="tel"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="+359..."
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Locale</label>
                  <select
                    value={locale}
                    onChange={(e) => setLocale(e.target.value)}
                    className={selectClass}
                  >
                    {LOCALES.map((l) => (
                      <option key={l.value} value={l.value}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Tier</label>
                  <select
                    value={tier}
                    onChange={(e) => setTier(e.target.value)}
                    className={selectClass}
                  >
                    {TIERS.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Segmentation */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Income Level</label>
                  <select
                    value={incomeLevel}
                    onChange={(e) => setIncomeLevel(e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Not set</option>
                    {INCOME_LEVELS.map((i) => (
                      <option key={i.value} value={i.value}>
                        {i.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Commitment</label>
                  <select
                    value={commitmentLevel}
                    onChange={(e) => setCommitmentLevel(e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Not set</option>
                    {COMMITMENT_LEVELS.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Advanced toggle */}
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs text-accent hover:text-accent-dark transition-colors font-medium"
              >
                {showAdvanced ? "Hide" : "Show"} advanced fields (birth data &
                scores)
              </button>

              {showAdvanced && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-5 overflow-hidden"
                >
                  {/* Birth data */}
                  <div className="border-t border-border pt-5">
                    <p className="text-xs font-medium text-text-secondary mb-3 uppercase tracking-wider">
                      Birth Data
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Birth Date</label>
                        <input
                          type="date"
                          value={birthDate}
                          onChange={(e) => setBirthDate(e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Birth Time</label>
                        <input
                          type="time"
                          value={birthTime}
                          onChange={(e) => setBirthTime(e.target.value)}
                          disabled={birthTimeUnknown}
                          className={`${inputClass} ${birthTimeUnknown ? "opacity-40" : ""}`}
                        />
                        <label className="flex items-center gap-2 mt-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={birthTimeUnknown}
                            onChange={(e) =>
                              setBirthTimeUnknown(e.target.checked)
                            }
                            className="rounded border-border accent-accent"
                          />
                          <span className="text-xs text-text-secondary">
                            Unknown
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <label className={labelClass}>Birth City</label>
                        <input
                          type="text"
                          value={birthCity}
                          onChange={(e) => setBirthCity(e.target.value)}
                          placeholder="Sofia"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Birth Country</label>
                        <input
                          type="text"
                          value={birthCountry}
                          onChange={(e) => setBirthCountry(e.target.value)}
                          placeholder="Bulgaria"
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Life area scores */}
                  <div className="border-t border-border pt-5">
                    <p className="text-xs font-medium text-text-secondary mb-3 uppercase tracking-wider">
                      Life Area Scores (1-10)
                    </p>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                      {LIFE_AREAS.map((area) => (
                        <div key={area} className="flex items-center gap-3">
                          <label className="text-sm text-text-secondary capitalize w-20 flex-shrink-0">
                            {area}
                          </label>
                          <input
                            type="range"
                            min={1}
                            max={10}
                            value={scores[area]}
                            onChange={(e) =>
                              setScores((prev) => ({
                                ...prev,
                                [area]: parseInt(e.target.value, 10),
                              }))
                            }
                            className="flex-1 accent-accent h-1.5"
                          />
                          <span className="text-sm font-medium text-accent w-5 text-right">
                            {scores[area]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Error */}
              {error && (
                <p className="text-sm text-red-400 bg-red-500/10 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !userName || !userEmail}
                  className="flex items-center gap-2 px-5 py-2.5 bg-accent text-primary text-sm font-display font-semibold rounded-lg hover:bg-accent-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Create Lead
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
