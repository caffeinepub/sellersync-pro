import {
  CheckSquare,
  Download,
  Edit2,
  RefreshCw,
  RotateCcw,
  Search,
  ShoppingCart,
  Square,
} from "lucide-react";
import { useState } from "react";
import { inventory } from "../data/mockData";

type SyncStatus = "synced" | "pending" | "error";
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

const MOCK_SYNC: Record<string, SyncStatus> = {
  "SKU-001": "synced",
  "SKU-002": "synced",
  "SKU-003": "error",
  "SKU-004": "synced",
  "SKU-005": "pending",
  "SKU-006": "synced",
  "SKU-007": "pending",
  "SKU-008": "synced",
};

const PLATFORM_FILTERS: PlatformFilter[] = [
  "All",
  "Amazon",
  "Flipkart",
  "Meesho",
  "Alibaba",
  "IndiaMart",
];

export default function InventoryPage() {
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>("All");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [syncing, setSyncing] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = inventory.filter((item) => {
    const matchesPlatform =
      platformFilter === "All" || item.platforms.includes(platformFilter);
    const matchesSearch =
      search === "" ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase());
    return matchesPlatform && matchesSearch;
  });

  const totalUnits = inventory.reduce((s, i) => s + i.stock, 0);
  const lowStockCount = inventory.filter((i) => i.stock <= i.threshold).length;
  const syncedCount = Object.values(MOCK_SYNC).filter(
    (s) => s === "synced",
  ).length;

  const allSelected =
    filtered.length > 0 && filtered.every((i) => selectedIds.has(i.id));

  const toggleAll = () => {
    if (allSelected) {
      const next = new Set(selectedIds);
      for (const i of filtered) next.delete(i.id);
      setSelectedIds(next);
    } else {
      const next = new Set(selectedIds);
      for (const i of filtered) next.add(i.id);
      setSelectedIds(next);
    }
  };

  const toggleRow = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleSyncAll = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2000);
  };

  const getStockColor = (stock: number, threshold: number) => {
    if (stock <= threshold) return "#EF4444";
    if (stock <= threshold * 2) return "#F59E0B";
    return "#22C55E";
  };

  const getSyncBadge = (status: SyncStatus) => {
    if (status === "synced")
      return {
        icon: "✓",
        label: "Synced",
        color: "#22C55E",
        bg: "rgba(34,197,94,0.1)",
      };
    if (status === "pending")
      return {
        icon: "⚠",
        label: "Pending",
        color: "#F59E0B",
        bg: "rgba(245,158,11,0.1)",
      };
    return {
      icon: "✗",
      label: "Error",
      color: "#EF4444",
      bg: "rgba(239,68,68,0.1)",
    };
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header row */}
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
            Inventory Management
          </h2>
          <p style={{ fontSize: 12, color: "#7B8FA0", margin: "3px 0 0" }}>
            Unified stock across all platforms — real-time sync
          </p>
        </div>
        <button
          type="button"
          data-ocid="inventory.sync_button"
          onClick={handleSyncAll}
          disabled={syncing}
          className="flex items-center gap-2"
          style={{
            padding: "7px 14px",
            borderRadius: 8,
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            color: "#0A0800",
            fontWeight: 700,
            fontSize: 12,
            border: "none",
            cursor: syncing ? "not-allowed" : "pointer",
            opacity: syncing ? 0.8 : 1,
            boxShadow: "0 2px 10px rgba(245,158,11,0.3)",
          }}
        >
          <RefreshCw size={13} className={syncing ? "animate-spin" : ""} />
          {syncing ? "Syncing..." : "Sync All Platforms"}
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Total SKUs",
            value: inventory.length,
            sub: "Active products",
            color: "#F59E0B",
          },
          {
            label: "Total Units",
            value: totalUnits.toLocaleString("en-IN"),
            sub: "Across all warehouses",
            color: "#2874F0",
          },
          {
            label: "Low Stock",
            value: lowStockCount,
            sub: "Need restocking",
            color: "#EF4444",
          },
          {
            label: "Sync Status",
            value: `${syncedCount}/${inventory.length}`,
            sub: "Platforms synced",
            color: "#22C55E",
          },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-xl p-3"
            style={{ background: "#0F1117", border: "1px solid #1E2D3D" }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: kpi.color,
                lineHeight: 1,
              }}
            >
              {kpi.value}
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#E8EEF5",
                marginTop: 4,
              }}
            >
              {kpi.label}
            </div>
            <div style={{ fontSize: 10, color: "#7B8FA0", marginTop: 1 }}>
              {kpi.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Platform filter + search */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {PLATFORM_FILTERS.map((p) => (
            <button
              type="button"
              key={p}
              data-ocid="inventory.filter.tab"
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
        <div
          className="flex items-center gap-2 rounded-lg px-3"
          style={{
            background: "#0F1117",
            border: "1px solid #1E2D3D",
            height: 32,
            minWidth: 200,
          }}
        >
          <Search size={12} color="#4A5568" />
          <input
            data-ocid="inventory.search_input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products or SKU..."
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: 12,
              color: "#E2E8F0",
              flex: 1,
            }}
          />
        </div>
      </div>

      {/* Bulk actions toolbar */}
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
          <div className="flex gap-2">
            {[
              {
                label: "Sync Selected",
                icon: <RefreshCw size={11} />,
                ocid: "inventory.sync_button",
              },
              {
                label: "Reorder Selected",
                icon: <ShoppingCart size={11} />,
                ocid: "inventory.secondary_button",
              },
              {
                label: "Export",
                icon: <Download size={11} />,
                ocid: "inventory.secondary_button",
              },
            ].map((btn) => (
              <button
                type="button"
                key={btn.label}
                data-ocid={btn.ocid}
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
          </div>
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

      {/* Table */}
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
                  "Product",
                  "Platforms",
                  "Stock",
                  "Threshold",
                  "Price",
                  "Last Updated",
                  "Sync",
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
              {filtered.map((item, i) => {
                const syncStatus = MOCK_SYNC[item.id] ?? "synced";
                const syncBadge = getSyncBadge(syncStatus);
                const stockPct = Math.min(
                  100,
                  Math.round((item.stock / (item.threshold * 3)) * 100),
                );
                const stockColor = getStockColor(item.stock, item.threshold);
                return (
                  <tr
                    key={item.id}
                    data-ocid={`inventory.item.${i + 1}`}
                    style={{
                      borderBottom: "1px solid #131C24",
                      background: selectedIds.has(item.id)
                        ? "rgba(245,158,11,0.04)"
                        : i % 2 === 1
                          ? "rgba(255,255,255,0.015)"
                          : "transparent",
                      transition: "background 0.1s",
                    }}
                  >
                    <td style={{ padding: "7px 12px" }}>
                      <button
                        type="button"
                        onClick={() => toggleRow(item.id)}
                        data-ocid={`inventory.checkbox.${i + 1}`}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#7B8FA0",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {selectedIds.has(item.id) ? (
                          <CheckSquare size={14} color="#F59E0B" />
                        ) : (
                          <Square size={14} />
                        )}
                      </button>
                    </td>
                    <td style={{ padding: "7px 12px", minWidth: 160 }}>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: 12,
                          color: "#E8EEF5",
                        }}
                      >
                        {item.name}
                      </div>
                      <div
                        className="flex items-center gap-2"
                        style={{ marginTop: 2 }}
                      >
                        <span style={{ fontSize: 10, color: "#7B8FA0" }}>
                          {item.sku}
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            color: "#9AA9B8",
                            background: "#161F28",
                            border: "1px solid #1E2D3D",
                            padding: "1px 5px",
                            borderRadius: 999,
                          }}
                        >
                          {item.category}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "7px 12px" }}>
                      <div className="flex flex-wrap gap-1">
                        {item.platforms.map((p) => {
                          const pc = PLATFORM_COLORS[p] ?? {
                            bg: "#243241",
                            text: "#9AA9B8",
                          };
                          return (
                            <span
                              key={p}
                              style={{
                                fontSize: 10,
                                fontWeight: 600,
                                color: pc.text,
                                background: pc.bg,
                                padding: "1px 6px",
                                borderRadius: 999,
                                whiteSpace: "nowrap",
                              }}
                            >
                              {p}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td style={{ padding: "7px 12px", minWidth: 72 }}>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 800,
                          color: stockColor,
                          lineHeight: 1,
                        }}
                      >
                        {item.stock}
                      </div>
                      {item.stock <= item.threshold && (
                        <div
                          style={{
                            fontSize: 10,
                            color: "#EF4444",
                            marginTop: 1,
                            fontWeight: 600,
                          }}
                        >
                          ⚠ Low
                        </div>
                      )}
                    </td>
                    <td style={{ padding: "7px 12px", minWidth: 100 }}>
                      <div
                        style={{
                          fontSize: 10,
                          color: "#7B8FA0",
                          marginBottom: 3,
                        }}
                      >
                        Min: {item.threshold}
                      </div>
                      <div
                        style={{
                          height: 3,
                          borderRadius: 999,
                          background: "#1E2D3D",
                          overflow: "hidden",
                          width: 70,
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${stockPct}%`,
                            background: stockColor,
                            borderRadius: 999,
                            transition: "width 0.4s",
                          }}
                        />
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "7px 12px",
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#E8EEF5",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ₹{item.price.toLocaleString("en-IN")}
                    </td>
                    <td
                      style={{
                        padding: "7px 12px",
                        fontSize: 10,
                        color: "#7B8FA0",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.lastMovement.date}
                    </td>
                    <td style={{ padding: "7px 12px" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 3,
                          fontSize: 10,
                          fontWeight: 600,
                          color: syncBadge.color,
                          background: syncBadge.bg,
                          padding: "2px 8px",
                          borderRadius: 999,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {syncBadge.icon} {syncBadge.label}
                      </span>
                    </td>
                    <td style={{ padding: "7px 12px" }}>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          data-ocid={`inventory.secondary_button.${i + 1}`}
                          className="flex items-center gap-1"
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            color: "#F59E0B",
                            background: "rgba(245,158,11,0.1)",
                            border: "1px solid rgba(245,158,11,0.2)",
                            padding: "3px 8px",
                            borderRadius: 6,
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <RotateCcw size={9} /> Reorder
                        </button>
                        <button
                          type="button"
                          data-ocid={`inventory.edit_button.${i + 1}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 24,
                            height: 24,
                            borderRadius: 6,
                            background: "#161F28",
                            border: "1px solid #1E2D3D",
                            color: "#7B8FA0",
                            cursor: "pointer",
                          }}
                        >
                          <Edit2 size={10} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    data-ocid="inventory.empty_state"
                    style={{
                      padding: "32px",
                      textAlign: "center",
                      color: "#7B8FA0",
                      fontSize: 13,
                    }}
                  >
                    No products found for the selected filter.
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
