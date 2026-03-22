import {
  ArrowRight,
  CheckSquare,
  Download,
  Eye,
  MapPin,
  Square,
  Truck,
  X,
} from "lucide-react";
import { useState } from "react";
import { orders } from "../data/mockData";

type PlatformFilter =
  | "All"
  | "Amazon"
  | "Flipkart"
  | "Meesho"
  | "Alibaba"
  | "IndiaMart";

const PLATFORM_COLORS: Record<string, { bg: string; text: string }> = {
  Amazon: { bg: "rgba(255,153,0,0.15)", text: "#FF9900" },
  Flipkart: { bg: "rgba(40,116,240,0.15)", text: "#2874F0" },
  Meesho: { bg: "rgba(244,51,151,0.15)", text: "#F43397" },
  Alibaba: { bg: "rgba(255,106,0,0.15)", text: "#FF6A00" },
  IndiaMart: { bg: "rgba(0,133,77,0.15)", text: "#00854D" },
};

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bg: string; icon: string }
> = {
  pending: {
    label: "Pending",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.12)",
    icon: "⏳",
  },
  processing: {
    label: "Processing",
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.12)",
    icon: "⚙",
  },
  shipped: {
    label: "Shipped",
    color: "#A78BFA",
    bg: "rgba(167,139,250,0.12)",
    icon: "🚚",
  },
  fulfilled: {
    label: "Delivered",
    color: "#22C55E",
    bg: "rgba(34,197,94,0.12)",
    icon: "✓",
  },
  returned: {
    label: "Returned",
    color: "#EF4444",
    bg: "rgba(239,68,68,0.12)",
    icon: "↩",
  },
  cancelled: {
    label: "Cancelled",
    color: "#EF4444",
    bg: "rgba(239,68,68,0.12)",
    icon: "✗",
  },
};

const PIPELINE_STEPS = [
  { key: "pending", label: "Pending" },
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "fulfilled", label: "Delivered" },
];

const PLATFORM_FILTERS: PlatformFilter[] = [
  "All",
  "Amazon",
  "Flipkart",
  "Meesho",
  "Alibaba",
  "IndiaMart",
];

const PLATFORM_DOT_COLORS: Record<string, string> = {
  Amazon: "#FF9900",
  Flipkart: "#2874F0",
  Meesho: "#F43397",
  IndiaMart: "#00854D",
};

export default function OrdersPage() {
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>("All");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filteredOrders =
    platformFilter === "All"
      ? orders
      : orders.filter((o) => o.platform === platformFilter);
  const allSelected =
    filteredOrders.length > 0 &&
    filteredOrders.every((o) => selectedIds.has(o.id));

  const toggleAll = () => {
    if (allSelected) {
      const next = new Set(selectedIds);
      for (const o of filteredOrders) next.delete(o.id);
      setSelectedIds(next);
    } else {
      const next = new Set(selectedIds);
      for (const o of filteredOrders) next.add(o.id);
      setSelectedIds(next);
    }
  };

  const toggleRow = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const todayRevenue = orders
    .filter((o) => o.date === "22 Mar 2026")
    .reduce((s, o) => s + o.total, 0);
  const avgOrderValue = Math.round(
    orders.reduce((s, o) => s + o.total, 0) / orders.length,
  );
  const returnCount = orders.filter(
    (o) => o.status === "returned" || o.status === "cancelled",
  ).length;
  const returnRate = Math.round((returnCount / orders.length) * 100);
  const fulfilledCount = orders.filter((o) => o.status === "fulfilled").length;
  const fulfillmentRate = Math.round((fulfilledCount / orders.length) * 100);

  const getPipelineCount = (statusKey: string) =>
    orders.filter((o) => o.status === statusKey).length;

  const getPlatformBreakdown = (statusKey: string) => {
    const matching = orders.filter((o) => o.status === statusKey);
    const byPlatform: Record<string, number> = {};
    for (const o of matching)
      byPlatform[o.platform] = (byPlatform[o.platform] ?? 0) + 1;
    return Object.entries(byPlatform);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#E8EEF5",
              margin: 0,
            }}
          >
            Order Management
          </h2>
          <p style={{ fontSize: 12, color: "#7B8FA0", margin: "3px 0 0" }}>
            Unified orders from all connected platforms
          </p>
        </div>
        <button
          type="button"
          data-ocid="orders.primary_button"
          className="flex items-center gap-2"
          style={{
            padding: "7px 14px",
            borderRadius: 8,
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            color: "#0A0800",
            fontWeight: 700,
            fontSize: 12,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 2px 10px rgba(245,158,11,0.3)",
          }}
        >
          <Download size={13} /> Export Orders
        </button>
      </div>

      {/* Status Pipeline */}
      <div
        className="rounded-xl p-3"
        style={{ background: "#0F1117", border: "1px solid #1E2D3D" }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "#7B8FA0",
            marginBottom: 10,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Order Pipeline
        </div>
        <div className="flex items-center gap-0">
          {PIPELINE_STEPS.map((step, idx) => {
            const count = getPipelineCount(step.key);
            const breakdown = getPlatformBreakdown(step.key);
            const cfg = STATUS_CONFIG[step.key];
            return (
              <div
                key={step.key}
                className="flex items-center"
                style={{ flex: 1 }}
              >
                <div
                  className="rounded-lg p-3 flex flex-col gap-1"
                  style={{
                    background: `${cfg.bg}`,
                    border: `1px solid ${cfg.color}30`,
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: cfg.color,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {cfg.icon} {step.label}
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: cfg.color,
                      lineHeight: 1,
                    }}
                  >
                    {count}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {breakdown.map(([platform, cnt]) => (
                      <div
                        key={platform}
                        className="flex items-center gap-1"
                        title={`${platform}: ${cnt}`}
                      >
                        <div
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            background:
                              PLATFORM_DOT_COLORS[platform] ?? "#7B8FA0",
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ fontSize: 10, color: "#7B8FA0" }}>
                          {cnt}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {idx < PIPELINE_STEPS.length - 1 && (
                  <ArrowRight
                    size={14}
                    color="#1E2D3D"
                    style={{ flexShrink: 0, margin: "0 4px" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Today's Revenue",
            value: `₹${todayRevenue.toLocaleString("en-IN")}`,
            color: "#22C55E",
          },
          {
            label: "Avg Order Value",
            value: `₹${avgOrderValue.toLocaleString("en-IN")}`,
            color: "#3B82F6",
          },
          {
            label: "Return Rate",
            value: `${returnRate}%`,
            color: returnRate > 10 ? "#EF4444" : "#F59E0B",
          },
          {
            label: "Fulfillment Rate",
            value: `${fulfillmentRate}%`,
            color: fulfillmentRate > 70 ? "#22C55E" : "#F59E0B",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-3"
            style={{ background: "#0F1117", border: "1px solid #1E2D3D" }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: stat.color,
                lineHeight: 1,
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#7B8FA0",
                marginTop: 4,
                fontWeight: 500,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Platform filter */}
      <div className="flex flex-wrap items-center gap-2">
        {PLATFORM_FILTERS.map((p) => (
          <button
            type="button"
            key={p}
            data-ocid="orders.filter.tab"
            onClick={() => setPlatformFilter(p)}
            style={{
              padding: "5px 12px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s",
              background:
                platformFilter === p
                  ? "linear-gradient(135deg, #F59E0B, #D97706)"
                  : "#0F1117",
              color: platformFilter === p ? "#0A0800" : "#7B8FA0",
              border:
                platformFilter === p
                  ? "1px solid transparent"
                  : "1px solid #1E2D3D",
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Bulk actions */}
      {selectedIds.size > 0 && (
        <div
          className="flex flex-wrap items-center gap-2 rounded-xl px-3 py-2"
          style={{
            background: "rgba(245,158,11,0.07)",
            border: "1px solid rgba(245,158,11,0.2)",
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 600, color: "#F59E0B" }}>
            {selectedIds.size} selected
          </span>
          {[
            { label: "Mark as Shipped", icon: <Truck size={12} /> },
            { label: "Export", icon: <Download size={12} /> },
            { label: "Cancel Selected", icon: <X size={12} /> },
          ].map((btn) => (
            <button
              type="button"
              key={btn.label}
              data-ocid="orders.secondary_button"
              className="flex items-center gap-1"
              style={{
                padding: "4px 10px",
                borderRadius: 7,
                background: "#161F28",
                border: "1px solid #1E2D3D",
                color: "#E8EEF5",
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {btn.icon} {btn.label}
            </button>
          ))}
          <div className="flex-1" />
          <button
            type="button"
            onClick={() => setSelectedIds(new Set())}
            style={{
              fontSize: 11,
              color: "#7B8FA0",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
        </div>
      )}

      {/* Orders Table */}
      <div
        className="rounded-xl"
        style={{
          background: "#0F1117",
          border: "1px solid #1E2D3D",
          overflow: "hidden",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #1E2D3D" }}>
                <th style={{ padding: "8px 12px", width: 36 }}>
                  <button
                    type="button"
                    onClick={toggleAll}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#7B8FA0",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {allSelected ? (
                      <CheckSquare size={14} color="#F59E0B" />
                    ) : (
                      <Square size={14} />
                    )}
                  </button>
                </th>
                {[
                  "Order ID",
                  "Customer",
                  "Platform",
                  "Items",
                  "Amount",
                  "Status",
                  "Date",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "8px 12px",
                      textAlign: "left",
                      fontSize: 10,
                      color: "#7B8FA0",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, i) => {
                const pc = PLATFORM_COLORS[order.platform] ?? {
                  bg: "#243241",
                  text: "#9AA9B8",
                };
                const sc = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;
                return (
                  <tr
                    key={order.id}
                    data-ocid={`orders.item.${i + 1}`}
                    style={{
                      borderBottom: "1px solid #131C24",
                      background: selectedIds.has(order.id)
                        ? "rgba(245,158,11,0.04)"
                        : i % 2 === 1
                          ? "rgba(255,255,255,0.015)"
                          : "transparent",
                    }}
                  >
                    <td style={{ padding: "7px 12px" }}>
                      <button
                        type="button"
                        onClick={() => toggleRow(order.id)}
                        data-ocid={`orders.checkbox.${i + 1}`}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#7B8FA0",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {selectedIds.has(order.id) ? (
                          <CheckSquare size={14} color="#F59E0B" />
                        ) : (
                          <Square size={14} />
                        )}
                      </button>
                    </td>
                    <td style={{ padding: "7px 12px" }}>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: "#F59E0B",
                          fontFamily: "monospace",
                        }}
                      >
                        {order.id}
                      </span>
                    </td>
                    <td style={{ padding: "7px 12px" }}>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#E8EEF5",
                        }}
                      >
                        {order.customer}
                      </div>
                      <div
                        style={{ fontSize: 10, color: "#7B8FA0", marginTop: 1 }}
                      >
                        {order.category}
                      </div>
                    </td>
                    <td style={{ padding: "7px 12px" }}>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: pc.text,
                          background: pc.bg,
                          padding: "2px 8px",
                          borderRadius: 999,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {order.platform}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "7px 12px",
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#E8EEF5",
                        textAlign: "center",
                      }}
                    >
                      {order.items}
                    </td>
                    <td
                      style={{
                        padding: "7px 12px",
                        fontSize: 13,
                        fontWeight: 800,
                        color: "#E8EEF5",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ₹{order.total.toLocaleString("en-IN")}
                    </td>
                    <td style={{ padding: "7px 12px" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 3,
                          fontSize: 10,
                          fontWeight: 700,
                          color: sc.color,
                          background: sc.bg,
                          padding: "3px 8px",
                          borderRadius: 999,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {sc.icon} {sc.label}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "7px 12px",
                        fontSize: 10,
                        color: "#7B8FA0",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {order.date}
                    </td>
                    <td style={{ padding: "7px 12px" }}>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          data-ocid={`orders.secondary_button.${i + 1}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 26,
                            height: 26,
                            borderRadius: 6,
                            background: "#161F28",
                            border: "1px solid #1E2D3D",
                            color: "#7B8FA0",
                            cursor: "pointer",
                          }}
                          title="View"
                        >
                          <Eye size={11} />
                        </button>
                        <button
                          type="button"
                          data-ocid={`orders.secondary_button.${i + 1}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 26,
                            height: 26,
                            borderRadius: 6,
                            background: "#161F28",
                            border: "1px solid #1E2D3D",
                            color: "#7B8FA0",
                            cursor: "pointer",
                          }}
                          title="Track"
                        >
                          <MapPin size={11} />
                        </button>
                        <button
                          type="button"
                          data-ocid={`orders.delete_button.${i + 1}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 26,
                            height: 26,
                            borderRadius: 6,
                            background: "rgba(239,68,68,0.08)",
                            border: "1px solid rgba(239,68,68,0.2)",
                            color: "#EF4444",
                            cursor: "pointer",
                          }}
                          title="Cancel"
                        >
                          <X size={11} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    data-ocid="orders.empty_state"
                    style={{
                      padding: "32px",
                      textAlign: "center",
                      color: "#7B8FA0",
                      fontSize: 13,
                    }}
                  >
                    No orders found for the selected platform.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
