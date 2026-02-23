"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  Users,
  Plus,
} from "lucide-react";
import AddLeadModal from "./AddLeadModal";

type Lead = {
  id: string;
  user_name: string | null;
  user_email: string | null;
  user_phone: string | null;
  status: string;
  tier: string | null;
  income_level: string | null;
  commitment_level: string | null;
  locale: string | null;
  created_at: string;
};

type LeadsResponse = {
  leads: Lead[];
  total: number;
  page: number;
  totalPages: number;
};

const STATUS_OPTIONS = ["", "pending", "processing", "completed", "error"];
const TIER_OPTIONS = ["", "free", "low", "mid", "high"];
const LOCALE_OPTIONS = ["", "bg", "en"];

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-400",
  processing: "bg-blue-500/10 text-blue-400",
  completed: "bg-green-500/10 text-green-400",
  error: "bg-red-500/10 text-red-400",
};

const SORTABLE_COLUMNS = [
  { key: "user_name", label: "Name" },
  { key: "user_email", label: "Email" },
  { key: "status", label: "Status" },
  { key: "tier", label: "Tier" },
  { key: "income_level", label: "Income" },
  { key: "commitment_level", label: "Commitment" },
  { key: "locale", label: "Locale" },
  { key: "created_at", label: "Created At" },
] as const;

export default function LeadsTable() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [data, setData] = useState<LeadsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Read state from URL
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const tier = searchParams.get("tier") || "";
  const locale = searchParams.get("locale") || "";
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const sort = searchParams.get("sort") || "created_at";
  const order = searchParams.get("order") || "desc";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }
      // Reset to page 1 when filters change (unless page itself is being set)
      if (!("page" in updates)) {
        params.delete("page");
      }
      router.push(`/admin/leads?${params.toString()}`);
    },
    [searchParams, router]
  );

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (status) params.set("status", status);
      if (tier) params.set("tier", tier);
      if (locale) params.set("locale", locale);
      if (from) params.set("from", from);
      if (to) params.set("to", to);
      params.set("sort", sort);
      params.set("order", order);
      params.set("page", String(page));
      params.set("limit", "25");

      const res = await fetch(`/api/admin/leads?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const json: LeadsResponse = await res.json();
      setData(json);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [search, status, tier, locale, from, to, sort, order, page]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleSort = (column: string) => {
    if (sort === column) {
      updateParams({ sort: column, order: order === "asc" ? "desc" : "asc" });
    } else {
      updateParams({ sort: column, order: "desc" });
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (status) params.set("status", status);
      if (tier) params.set("tier", tier);
      if (locale) params.set("locale", locale);
      if (from) params.set("from", from);
      if (to) params.set("to", to);

      const res = await fetch(`/api/admin/leads/export?${params.toString()}`);
      if (!res.ok) throw new Error("Export failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Silently fail — could add toast later
    } finally {
      setExporting(false);
    }
  };

  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== search) {
        updateParams({ search: searchInput });
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput, search, updateParams]);

  const rangeStart = data ? (data.page - 1) * 25 + 1 : 0;
  const rangeEnd = data ? Math.min(data.page * 25, data.total) : 0;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary">
            Leads
          </h1>
          <p className="text-text-secondary text-sm mt-1">
            Manage and track all submissions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            disabled={exporting}
            className="flex items-center gap-2 px-4 py-2 bg-surface-muted border border-border rounded-lg text-sm text-text-secondary hover:text-accent hover:border-accent/30 transition-colors disabled:opacity-50"
          >
            {exporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            Export CSV
          </button>
          <button
            onClick={() => setAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-primary rounded-lg text-sm font-display font-semibold hover:bg-accent-dark transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Lead
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-surface-muted border border-border rounded-xl p-4 mb-6">
        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full bg-surface-dark border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent transition-all"
            />
          </div>

          {/* Status filter */}
          <select
            value={status}
            onChange={(e) => updateParams({ status: e.target.value })}
            className="bg-surface-dark border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent/50"
          >
            <option value="">All Statuses</option>
            {STATUS_OPTIONS.filter(Boolean).map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>

          {/* Tier filter */}
          <select
            value={tier}
            onChange={(e) => updateParams({ tier: e.target.value })}
            className="bg-surface-dark border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent/50"
          >
            <option value="">All Tiers</option>
            {TIER_OPTIONS.filter(Boolean).map((t) => (
              <option key={t} value={t}>
                {t.toUpperCase()}
              </option>
            ))}
          </select>

          {/* Locale filter */}
          <select
            value={locale}
            onChange={(e) => updateParams({ locale: e.target.value })}
            className="bg-surface-dark border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent/50"
          >
            <option value="">All Locales</option>
            {LOCALE_OPTIONS.filter(Boolean).map((l) => (
              <option key={l} value={l}>
                {l.toUpperCase()}
              </option>
            ))}
          </select>

          {/* Date range */}
          <input
            type="date"
            value={from}
            onChange={(e) => updateParams({ from: e.target.value })}
            className="bg-surface-dark border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent/50"
          />
          <input
            type="date"
            value={to}
            onChange={(e) => updateParams({ to: e.target.value })}
            className="bg-surface-dark border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent/50"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-muted border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {SORTABLE_COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="text-left px-4 py-3 text-text-secondary font-medium cursor-pointer hover:text-accent transition-colors select-none"
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.label}
                      {sort === col.key &&
                        (order === "asc" ? (
                          <ChevronUp className="w-3 h-3 text-accent" />
                        ) : (
                          <ChevronDown className="w-3 h-3 text-accent" />
                        ))}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-16">
                    <Loader2 className="w-6 h-6 animate-spin text-accent mx-auto" />
                  </td>
                </tr>
              ) : !data || data.leads.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-16 text-text-secondary"
                  >
                    <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p>No leads found</p>
                  </td>
                </tr>
              ) : (
                data.leads.map((lead) => (
                  <motion.tr
                    key={lead.id}
                    onClick={() => router.push(`/admin/leads/${lead.id}`)}
                    className="border-b border-border/50 cursor-pointer transition-colors hover:bg-white/[0.02]"
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                  >
                    <td className="px-4 py-3 text-text-primary font-medium">
                      {lead.user_name || "-"}
                    </td>
                    <td className="px-4 py-3 text-text-secondary">
                      {lead.user_email || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[lead.status] || "bg-gray-500/10 text-gray-400"}`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {lead.tier ? (
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
                          {lead.tier}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-4 py-3 text-text-secondary">
                      {lead.income_level?.replace(/_/g, " ") || "-"}
                    </td>
                    <td className="px-4 py-3 text-text-secondary capitalize">
                      {lead.commitment_level || "-"}
                    </td>
                    <td className="px-4 py-3 text-text-secondary uppercase">
                      {lead.locale || "-"}
                    </td>
                    <td className="px-4 py-3 text-text-secondary whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data && data.totalPages > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <span className="text-sm text-text-secondary">
              Showing {rangeStart}-{rangeEnd} of {data.total}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateParams({ page: String(page - 1) })}
                disabled={page <= 1}
                className="p-1.5 rounded-lg border border-border text-text-secondary hover:text-accent hover:border-accent/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm text-text-secondary px-2">
                Page {data.page} of {data.totalPages}
              </span>
              <button
                onClick={() => updateParams({ page: String(page + 1) })}
                disabled={page >= data.totalPages}
                className="p-1.5 rounded-lg border border-border text-text-secondary hover:text-accent hover:border-accent/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Lead Modal */}
      <AddLeadModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onCreated={() => {
          fetchLeads();
        }}
      />
    </div>
  );
}
