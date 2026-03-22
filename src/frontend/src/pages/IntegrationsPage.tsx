import {
  CheckCircle,
  Clock,
  Plus,
  RefreshCw,
  Settings,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { platforms } from "../data/mockData";

const statusIcon = {
  connected: <CheckCircle size={13} color="#2ECC71" />,
  error: <XCircle size={13} color="#EB5757" />,
  pending: <Clock size={13} color="#F2C94C" />,
  disconnected: <XCircle size={13} color="#7B8FA0" />,
};

export default function IntegrationsPage() {
  const [syncing, setSyncing] = useState<string | null>(null);
  const doSync = (id: string) => {
    setSyncing(id);
    setTimeout(() => setSyncing(null), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2
          style={{ fontSize: 18, fontWeight: 700, color: "#E8EEF5", margin: 0 }}
        >
          Platform Integrations
        </h2>
        <button
          type="button"
          style={{
            fontSize: 12,
            padding: "7px 14px",
            borderRadius: 8,
            background: "#2F7CF6",
            color: "white",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Plus size={12} /> Connect New Platform
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {platforms.map((p) => (
          <div
            key={p.id}
            className="rounded-xl p-4"
            style={{ background: "#161F28", border: "1px solid #243241" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center rounded-xl font-black flex-shrink-0"
                style={{
                  width: 44,
                  height: 44,
                  background: `${p.color}1A`,
                  color: p.color,
                  fontSize: 12,
                  border: `1px solid ${p.color}30`,
                }}
              >
                {p.logo}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    style={{ fontWeight: 700, fontSize: 14, color: "#E8EEF5" }}
                  >
                    {p.name}
                  </span>
                  {statusIcon[p.status]}
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color:
                        p.status === "connected"
                          ? "#2ECC71"
                          : p.status === "error"
                            ? "#EB5757"
                            : "#F2C94C",
                    }}
                  >
                    {p.status.toUpperCase()}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: "#7B8FA0" }}>
                  Region: {p.region} · Last sync: {p.lastSync}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="text-right">
                  <div
                    style={{ fontSize: 15, fontWeight: 800, color: "#E8EEF5" }}
                  >
                    ₹{p.revenue.toLocaleString("en-IN")}
                  </div>
                  <div style={{ fontSize: 10, color: "#7B8FA0" }}>
                    {p.orders} orders · {p.growth >= 0 ? "+" : ""}
                    {p.growth}%
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => doSync(p.id)}
                  className="flex items-center gap-1 rounded-lg px-2 py-1"
                  style={{
                    background: "#1A2530",
                    border: "1px solid #2A3A4A",
                    color: "#9AA9B8",
                    fontSize: 11,
                  }}
                >
                  <RefreshCw
                    size={11}
                    className={syncing === p.id ? "animate-spin" : ""}
                  />{" "}
                  Sync
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-lg px-2 py-1"
                  style={{
                    background: "#1A2530",
                    border: "1px solid #2A3A4A",
                    color: "#9AA9B8",
                    fontSize: 11,
                  }}
                >
                  <Settings size={11} /> Settings
                </button>
              </div>
            </div>

            {p.status === "error" && (
              <div
                className="mt-2 rounded-lg px-3 py-2 flex items-center justify-between"
                style={{
                  background: "rgba(235,87,87,0.08)",
                  border: "1px solid rgba(235,87,87,0.25)",
                }}
              >
                <span style={{ fontSize: 11, color: "#EB5757" }}>
                  ⚠ API token expired. Reconnect to resume syncing and restore
                  revenue tracking.
                </span>
                <button
                  type="button"
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#EB5757",
                    background: "rgba(235,87,87,0.18)",
                    border: "1px solid rgba(235,87,87,0.35)",
                    padding: "3px 10px",
                    borderRadius: 7,
                    marginLeft: 10,
                    flexShrink: 0,
                  }}
                >
                  Reconnect
                </button>
              </div>
            )}
            {p.status === "pending" && (
              <div
                className="mt-2 rounded-lg px-3 py-2 flex items-center justify-between"
                style={{
                  background: "rgba(242,201,76,0.08)",
                  border: "1px solid rgba(242,201,76,0.25)",
                }}
              >
                <span style={{ fontSize: 11, color: "#F2C94C" }}>
                  Complete API setup to start syncing orders and inventory from{" "}
                  {p.name}.
                </span>
                <button
                  type="button"
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#F2C94C",
                    background: "rgba(242,201,76,0.18)",
                    border: "1px solid rgba(242,201,76,0.35)",
                    padding: "3px 10px",
                    borderRadius: 7,
                    marginLeft: 10,
                    flexShrink: 0,
                  }}
                >
                  Complete Setup
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
