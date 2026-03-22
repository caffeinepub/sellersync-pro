import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { analyticsData } from "../data/mockData";

const ranges = ["7 Days", "14 Days", "Month"];

const platformColors: Record<string, string> = {
  amazon: "#FF9900",
  flipkart: "#2874F0",
  meesho: "#F43397",
  indiamart: "#00A651",
};

export default function AnalyticsCard({
  expanded = false,
}: { expanded?: boolean }) {
  const [range, setRange] = useState("7 Days");
  const data =
    range === "7 Days"
      ? analyticsData
      : range === "14 Days"
        ? [
            ...analyticsData,
            ...analyticsData
              .slice(0, 4)
              .map((d) => ({ ...d, date: `Mar+${d.date}` })),
          ]
        : analyticsData;

  return (
    <div
      className="rounded-xl"
      style={{
        background: "linear-gradient(135deg, #161F28, #1A2530)",
        border: "1px solid #243241",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-3 flex-wrap gap-2"
        style={{ borderBottom: "1px solid #1E2D3D", flexShrink: 0 }}
      >
        <div>
          <span style={{ fontWeight: 600, fontSize: 14, color: "#E8EEF5" }}>
            Revenue by Platform
          </span>
          <p style={{ fontSize: 11, color: "#7B8FA0", margin: "2px 0 0" }}>
            Across all connected stores
          </p>
        </div>
        <div className="flex gap-1">
          {ranges.map((r) => (
            <button
              type="button"
              key={r}
              onClick={() => setRange(r)}
              style={{
                fontSize: 11,
                padding: "4px 10px",
                borderRadius: 8,
                background:
                  range === r ? "rgba(47,124,246,0.18)" : "transparent",
                color: range === r ? "#5B9FFF" : "#7B8FA0",
                border:
                  range === r
                    ? "1px solid rgba(47,124,246,0.35)"
                    : "1px solid transparent",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4" style={{ flex: 1, minHeight: expanded ? 340 : 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 16, bottom: 0, left: 8 }}
          >
            <defs>
              {Object.entries(platformColors).map(([k, c]) => (
                <linearGradient
                  key={k}
                  id={`grad-${k}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={c} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={c} stopOpacity={0.02} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E2D3D" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#7B8FA0" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#7B8FA0" }}
              axisLine={false}
              tickLine={false}
              width={56}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                background: "#1A2530",
                border: "1px solid #2A3A4A",
                borderRadius: 10,
                fontSize: 12,
              }}
              labelStyle={{ color: "#E8EEF5", fontWeight: 600 }}
              formatter={(v: number, name: string) => [
                `₹${v.toLocaleString("en-IN")}`,
                name.charAt(0).toUpperCase() + name.slice(1),
              ]}
            />
            <Legend
              wrapperStyle={{ fontSize: 11, color: "#9AA9B8", paddingTop: 8 }}
            />
            {Object.entries(platformColors).map(([k, c]) => (
              <Area
                key={k}
                type="monotone"
                dataKey={k}
                stroke={c}
                strokeWidth={2}
                fill={`url(#grad-${k})`}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
