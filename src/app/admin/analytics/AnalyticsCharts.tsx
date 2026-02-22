"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface FunnelData {
  total: number;
  completed: number;
  paid: number;
}

interface RevenuePoint {
  date: string;
  revenue: number;
}

interface IncomePoint {
  level: string;
  count: number;
}

interface EmailPoint {
  type: string;
  sent: number;
}

interface AnalyticsData {
  funnel: FunnelData;
  revenueOverTime: RevenuePoint[];
  incomeDistribution: IncomePoint[];
  emailPerformance: EmailPoint[];
}

type Period = "7d" | "30d" | "90d" | "all";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const GOLD = "#C9A84C";
const GOLD_DARK = "#8B7235";
const GRID_COLOR = "#1F1F1F";
const AXIS_COLOR = "#9CA3AF";
const TOOLTIP_BG = "#141414";
const TOOLTIP_BORDER = "#1F1F1F";

const incomeLabels: Record<string, string> = {
  under_1000: "Under \u20AC1K",
  "1000_3000": "\u20AC1K-3K",
  "3000_6000": "\u20AC3K-6K",
  "6000_10000": "\u20AC6K-10K",
  over_10000: "Over \u20AC10K",
  unknown: "Unknown",
};

const emailLabels: Record<string, string> = {
  welcome: "Welcome",
  nurture_1: "Nurture 1",
  nurture_2: "Nurture 2",
  nurture_3: "Nurture 3",
  nurture_4: "Nurture 4",
  nurture_5: "Nurture 5",
};

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={item}
      className="bg-surface-muted border border-border rounded-xl p-6"
    >
      <h3 className="font-display font-bold text-lg text-white mb-4">
        {title}
      </h3>
      {children}
    </motion.div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center h-48 text-text-secondary text-sm">
      {message}
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function DefaultTooltipContent({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-lg px-3 py-2 text-sm shadow-lg"
      style={{
        backgroundColor: TOOLTIP_BG,
        border: `1px solid ${TOOLTIP_BORDER}`,
      }}
    >
      <p className="text-text-secondary text-xs mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-white font-medium">
          {typeof entry.value === "number"
            ? entry.value.toLocaleString()
            : entry.value}
        </p>
      ))}
    </div>
  );
}

function RevenueTooltipContent({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-lg px-3 py-2 text-sm shadow-lg"
      style={{
        backgroundColor: TOOLTIP_BG,
        border: `1px solid ${TOOLTIP_BORDER}`,
      }}
    >
      <p className="text-text-secondary text-xs mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-white font-medium">
          {"\u20AC"}
          {typeof entry.value === "number"
            ? entry.value.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })
            : entry.value}
        </p>
      ))}
    </div>
  );
}

function FunnelLabel(props: any) {
  const { x, y, width, height, value, index } = props;
  if (
    typeof x !== "number" ||
    typeof y !== "number" ||
    typeof width !== "number" ||
    typeof height !== "number"
  )
    return null;
  return (
    <text
      x={x + width + 6}
      y={y + height / 2}
      fill="white"
      fontSize={12}
      dominantBaseline="middle"
    >
      {(value as number).toLocaleString()} ({props.pct ?? index}%)
    </text>
  );
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export default function AnalyticsCharts({
  initialData,
}: {
  initialData: AnalyticsData;
}) {
  const [data, setData] = useState<AnalyticsData>(initialData);
  const [period, setPeriod] = useState<Period>("30d");
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (p: Period) => {
    setPeriod(p);
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/analytics?period=${p}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Prepare funnel data
  const funnelData = [
    {
      stage: "Total Leads",
      value: data.funnel.total,
      pct: 100,
    },
    {
      stage: "Completed",
      value: data.funnel.completed,
      pct:
        data.funnel.total > 0
          ? Math.round((data.funnel.completed / data.funnel.total) * 100)
          : 0,
    },
    {
      stage: "Paid",
      value: data.funnel.paid,
      pct:
        data.funnel.total > 0
          ? Math.round((data.funnel.paid / data.funnel.total) * 100)
          : 0,
    },
  ];

  // Prepare income data with readable labels
  const incomeData = data.incomeDistribution.map((d) => ({
    ...d,
    label: incomeLabels[d.level] ?? d.level,
  }));

  // Prepare email data with readable labels
  const emailData = data.emailPerformance.map((d) => ({
    ...d,
    label: emailLabels[d.type] ?? d.type,
  }));

  const periods: { key: Period; label: string }[] = [
    { key: "7d", label: "7D" },
    { key: "30d", label: "30D" },
    { key: "90d", label: "90D" },
    { key: "all", label: "All" },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div
        variants={item}
        className="flex items-center justify-between mb-8"
      >
        <h1 className="font-display text-2xl font-bold text-accent">
          Analytics
        </h1>
        <div className="flex items-center gap-1 bg-surface-muted border border-border rounded-lg p-1">
          {periods.map((p) => (
            <button
              key={p.key}
              onClick={() => fetchData(p.key)}
              disabled={loading}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                period === p.key
                  ? "bg-accent text-surface-dark"
                  : "text-text-secondary hover:text-white"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={container}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Funnel Chart */}
        <ChartCard title="Conversion Funnel">
          {data.funnel.total === 0 ? (
            <EmptyState message="No submissions yet" />
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                layout="vertical"
                data={funnelData}
                margin={{ left: 10, right: 80, top: 5, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={GRID_COLOR}
                  horizontal={false}
                />
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="stage"
                  tick={{ fill: AXIS_COLOR, fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  width={90}
                />
                <Tooltip
                  content={<DefaultTooltipContent />}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <defs>
                  <linearGradient
                    id="funnelGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor={GOLD_DARK} />
                    <stop offset="100%" stopColor={GOLD} />
                  </linearGradient>
                </defs>
                <Bar
                  dataKey="value"
                  fill="url(#funnelGradient)"
                  radius={[0, 4, 4, 0]}
                  barSize={28}
                  label={<FunnelLabel />}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        {/* Revenue Over Time */}
        <ChartCard title="Revenue Over Time">
          {data.revenueOverTime.length === 0 ? (
            <EmptyState message="No revenue data for this period" />
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart
                data={data.revenueOverTime}
                margin={{ left: 10, right: 10, top: 5, bottom: 5 }}
              >
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={GOLD} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={GOLD} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={GRID_COLOR}
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fill: AXIS_COLOR, fontSize: 11 }}
                  axisLine={{ stroke: GRID_COLOR }}
                  tickLine={false}
                  tickFormatter={(v: string) => {
                    const d = new Date(v);
                    return `${d.getMonth() + 1}/${d.getDate()}`;
                  }}
                />
                <YAxis
                  tick={{ fill: AXIS_COLOR, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `\u20AC${v}`}
                />
                <Tooltip
                  content={<RevenueTooltipContent />}
                  cursor={{ stroke: GOLD, strokeOpacity: 0.3 }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={GOLD}
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        {/* Income Distribution */}
        <ChartCard title="Income Distribution">
          {incomeData.length === 0 ? (
            <EmptyState message="No income data available" />
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={incomeData}
                margin={{ left: 10, right: 10, top: 5, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={GRID_COLOR}
                  vertical={false}
                />
                <XAxis
                  dataKey="label"
                  tick={{ fill: AXIS_COLOR, fontSize: 11 }}
                  axisLine={{ stroke: GRID_COLOR }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: AXIS_COLOR, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  content={<DefaultTooltipContent />}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={36}>
                  {incomeData.map((_, i) => (
                    <Cell key={i} fill={GOLD} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        {/* Email Performance */}
        <ChartCard title="Email Performance">
          {emailData.length === 0 ? (
            <EmptyState message="No emails sent yet" />
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={emailData}
                margin={{ left: 10, right: 10, top: 5, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={GRID_COLOR}
                  vertical={false}
                />
                <XAxis
                  dataKey="label"
                  tick={{ fill: AXIS_COLOR, fontSize: 11 }}
                  axisLine={{ stroke: GRID_COLOR }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: AXIS_COLOR, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  content={<DefaultTooltipContent />}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <Bar dataKey="sent" radius={[4, 4, 0, 0]} barSize={36}>
                  {emailData.map((_, i) => (
                    <Cell key={i} fill={GOLD} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </motion.div>
    </motion.div>
  );
}
