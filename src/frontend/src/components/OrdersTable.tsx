import { ChevronDown, Filter } from "lucide-react";
import { useState } from "react";
import { type Order, orders } from "../data/mockData";

const statusConfig: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  fulfilled: {
    label: "Fulfilled",
    color: "#2ECC71",
    bg: "rgba(46,204,113,0.12)",
  },
  shipped: { label: "Shipped", color: "#4CC9F0", bg: "rgba(76,201,240,0.12)" },
  processing: {
    label: "Processing",
    color: "#F2C94C",
    bg: "rgba(242,201,76,0.12)",
  },
  pending: { label: "Pending", color: "#F2C94C", bg: "rgba(242,201,76,0.12)" },
  cancelled: {
    label: "Cancelled",
    color: "#EB5757",
    bg: "rgba(235,87,87,0.12)",
  },
  returned: { label: "Returned", color: "#EB5757", bg: "rgba(235,87,87,0.12)" },
};

const platformColor: Record<string, string> = {
  Amazon: "#FF9900",
  Flipkart: "#2874F0",
  Meesho: "#F43397",
  IndiaMart: "#00A651",
  Alibaba: "#FF6A00",
};

export default function OrdersTable({ limit }: { limit?: number }) {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Order | null>(null);

  const filterOptions = ["All", "Amazon", "Flipkart", "Meesho", "IndiaMart"];
  const filtered =
    filter === "All" ? orders : orders.filter((o) => o.platform === filter);
  const display = limit ? filtered.slice(0, limit) : filtered;

  return (
    <>
      <div
        className="rounded-xl"
        style={{
          background: "linear-gradient(135deg, #161F28, #1A2530)",
          border: "1px solid #243241",
          overflow: "hidden",
        }}
      >
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderBottom: "1px solid #1E2D3D" }}
        >
          <span style={{ fontWeight: 600, fontSize: 14, color: "#E8EEF5" }}>
            Recent Orders
          </span>
          <div className="flex items-center gap-2">
            <Filter size={12} color="#7B8FA0" />
            <div className="flex gap-1">
              {filterOptions.map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setFilter(p)}
                  style={{
                    fontSize: 11,
                    padding: "3px 9px",
                    borderRadius: 999,
                    background:
                      filter === p
                        ? `${platformColor[p] ?? "#2F7CF6"}20`
                        : "transparent",
                    color:
                      filter === p
                        ? (platformColor[p] ?? "#5B9FFF")
                        : "#7B8FA0",
                    border:
                      filter === p
                        ? `1px solid ${platformColor[p] ?? "#2F7CF6"}40`
                        : "1px solid transparent",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #1E2D3D" }}>
                {[
                  "Order ID",
                  "Customer",
                  "Platform",
                  "Category",
                  "Date",
                  "Status",
                  "Total",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 16px",
                      textAlign: "left",
                      fontSize: 11,
                      color: "#7B8FA0",
                      fontWeight: 600,
                      letterSpacing: "0.5px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {display.map((o, i) => {
                const s = statusConfig[o.status];
                return (
                  <tr
                    key={o.id}
                    onClick={() => setSelected(o)}
                    onKeyDown={(e) => e.key === "Enter" && setSelected(o)}
                    tabIndex={0}
                    style={{
                      borderBottom: "1px solid #1A2530",
                      cursor: "pointer",
                      background:
                        i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)",
                    }}
                  >
                    <td
                      style={{
                        padding: "10px 16px",
                        fontSize: 12.5,
                        color: "#5B9FFF",
                        fontWeight: 600,
                      }}
                    >
                      {o.id}
                    </td>
                    <td
                      style={{
                        padding: "10px 16px",
                        fontSize: 12.5,
                        color: "#E8EEF5",
                      }}
                    >
                      {o.customer}
                    </td>
                    <td style={{ padding: "10px 16px" }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: platformColor[o.platform] ?? "#9AA9B8",
                          background: `${platformColor[o.platform] ?? "#9AA9B8"}18`,
                          padding: "2px 8px",
                          borderRadius: 999,
                        }}
                      >
                        {o.platform}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "10px 16px",
                        fontSize: 12,
                        color: "#9AA9B8",
                      }}
                    >
                      {o.category}
                    </td>
                    <td
                      style={{
                        padding: "10px 16px",
                        fontSize: 12,
                        color: "#7B8FA0",
                      }}
                    >
                      {o.date}
                    </td>
                    <td style={{ padding: "10px 16px" }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: s.color,
                          background: s.bg,
                          padding: "3px 9px",
                          borderRadius: 999,
                        }}
                      >
                        {s.label}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "10px 16px",
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#E8EEF5",
                      }}
                    >
                      ₹{o.total.toLocaleString("en-IN")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {limit && filtered.length > limit && (
          <div
            className="flex justify-center py-3"
            style={{ borderTop: "1px solid #1E2D3D" }}
          >
            <button
              type="button"
              className="flex items-center gap-1"
              style={{ fontSize: 12, color: "#5B9FFF" }}
            >
              Show more <ChevronDown size={12} />
            </button>
          </div>
        )}
      </div>

      {selected && (
        // biome-ignore lint/a11y/useKeyWithClickEvents: modal backdrop
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={() => setSelected(null)}
        >
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: modal content stops propagation */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: "#161F28",
              border: "1px solid #2A3A4A",
              width: 380,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              style={{
                fontWeight: 700,
                fontSize: 16,
                color: "#E8EEF5",
                marginBottom: 16,
              }}
            >
              Order {selected.id}
            </h3>
            {[
              ["Customer", selected.customer],
              ["Platform", selected.platform],
              ["Category", selected.category],
              ["Date", selected.date],
              ["Items", String(selected.items)],
              ["Total", `₹${selected.total.toLocaleString("en-IN")}`],
              ["Status", selected.status],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between py-2"
                style={{ borderBottom: "1px solid #1E2D3D" }}
              >
                <span style={{ fontSize: 12.5, color: "#7B8FA0" }}>{k}</span>
                <span
                  style={{ fontSize: 12.5, fontWeight: 600, color: "#E8EEF5" }}
                >
                  {v}
                </span>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="w-full mt-4 py-2 rounded-lg"
              style={{
                background: "#2F7CF6",
                color: "white",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
