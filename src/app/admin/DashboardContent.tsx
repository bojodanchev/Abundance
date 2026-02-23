"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Users,
  UserPlus,
  CalendarDays,
  TrendingUp,
  DollarSign,
  Mail,
} from "lucide-react";

type StatusKey = "pending" | "processing" | "completed" | "error";

interface RecentLead {
  id: string;
  user_name: string;
  user_email: string;
  status: StatusKey;
  tier: string;
  created_at: string;
}

interface DashboardStats {
  totalLeads: number;
  leadsToday: number;
  leadsThisMonth: number;
  conversionRate: number;
  totalRevenue: number;
  emailsSent: number;
  statusBreakdown: Record<StatusKey, number>;
  recentLeads: RecentLead[];
}

const statusStyles: Record<StatusKey, string> = {
  pending: "bg-amber-500/10 text-amber-400",
  processing: "bg-blue-500/10 text-blue-400",
  completed: "bg-green-500/10 text-green-400",
  error: "bg-red-500/10 text-red-400",
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function DashboardContent({ stats }: { stats: DashboardStats }) {
  const router = useRouter();
  const kpis = [
    { label: "Total Leads", value: stats.totalLeads.toLocaleString(), icon: Users },
    { label: "Leads Today", value: stats.leadsToday.toLocaleString(), icon: UserPlus },
    { label: "This Month", value: stats.leadsThisMonth.toLocaleString(), icon: CalendarDays },
    { label: "Conversion Rate", value: `${stats.conversionRate}%`, icon: TrendingUp },
    { label: "Total Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign },
    { label: "Emails Sent", value: stats.emailsSent.toLocaleString(), icon: Mail },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      {/* Page header */}
      <motion.h1
        variants={item}
        className="font-display text-2xl font-bold text-accent mb-8"
      >
        Dashboard
      </motion.h1>

      {/* KPI cards */}
      <motion.div
        variants={container}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10"
      >
        {kpis.map((kpi) => (
          <motion.div
            key={kpi.label}
            variants={item}
            className="bg-surface-muted border border-border rounded-xl p-6 flex items-start gap-4"
          >
            <div className="rounded-lg bg-accent/10 p-2.5 text-accent">
              <kpi.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-text-secondary text-xs font-medium uppercase tracking-wider">
                {kpi.label}
              </p>
              <p className="text-2xl font-display font-bold mt-1">{kpi.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Status breakdown */}
      <motion.div variants={item} className="mb-10">
        <h2 className="font-display text-lg font-semibold mb-4">Status Breakdown</h2>
        <div className="flex flex-wrap gap-3">
          {(Object.entries(stats.statusBreakdown) as [StatusKey, number][]).map(
            ([status, count]) => (
              <div
                key={status}
                className={`${statusStyles[status]} rounded-full px-4 py-1.5 text-sm font-medium`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}: {count}
              </div>
            )
          )}
        </div>
      </motion.div>

      {/* Recent leads table */}
      <motion.div variants={item}>
        <h2 className="font-display text-lg font-semibold mb-4">Recent Leads</h2>
        <div className="bg-surface-muted border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-text-secondary text-xs uppercase tracking-wider">
                <th className="text-left py-3 px-5 font-medium">Name</th>
                <th className="text-left py-3 px-5 font-medium">Email</th>
                <th className="text-left py-3 px-5 font-medium">Status</th>
                <th className="text-left py-3 px-5 font-medium">Tier</th>
                <th className="text-left py-3 px-5 font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-text-secondary">
                    No leads yet
                  </td>
                </tr>
              ) : (
                stats.recentLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => router.push(`/admin/leads/${lead.id}`)}
                    className="border-b border-border last:border-b-0 hover:bg-white/[0.03] transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-5 font-medium">{lead.user_name}</td>
                    <td className="py-3 px-5 text-text-secondary">{lead.user_email}</td>
                    <td className="py-3 px-5">
                      <span
                        className={`${statusStyles[lead.status]} rounded-full px-2.5 py-0.5 text-xs font-medium`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-text-secondary capitalize">{lead.tier}</td>
                    <td className="py-3 px-5 text-text-secondary">
                      {new Date(lead.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
