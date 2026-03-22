import {
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { platforms } from "../data/mockData";

const statusConfig = {
  connected: {
    label: "Connected",
    color: "#2ECC71",
    bg: "rgba(46,204,113,0.12)",
    icon: <CheckCircle size={11} />,
  },
  error: {
    label: "Error",
    color: "#EB5757",
    bg: "rgba(235,87,87,0.12)",
    icon: <XCircle size={11} />,
  },
  pending: {
    label: "Pending",
    color: "#F2C94C",
    bg: "rgba(242,201,76,0.12)",
    icon: <Clock size={11} />,
  },
  disconnected: {
    label: "Disconnected",
    color: "#7B8FA0",
    bg: "rgba(123,143,160,0.12)",
    icon: <AlertCircle size={11} />,
  },
};

export default function IntegrationsCard() {
  const [syncing, setSyncing] = useState<string | null>(null);

  const doSync = (id: string) => {
    setSyncing(id);
    setTimeout(() => setSyncing(null), 2000);
  };

  return (
    <div
      className="rounded-xl"
      style={{
        background: "linear-gradient(135deg, #161F28, #1A2530)",
        border: "1px solid #243241",
        overflow: "hidden",
        height: "100%",
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid #1E2D3D" }}
      >
        <span style={{ fontWeight: 600, fontSize: 14, color: "#E8EEF5" }}>
          Platform Integrations
        </span>
        <button
          type="button"
          className="flex items-center gap-1 rounded-lg px-2 py-1"
          style={{
            background: "rgba(47,124,246,0.14)",
            border: "1px solid rgba(47,124,246,0.3)",
            color: "#5B9FFF",
            fontSize: 11,
          }}
        >
          <Plus size={11} /> Connect New
        </button>
      </div>
      <div className="p-3 flex flex-col gap-2">
        {platforms.map((p) => {
          const s = statusConfig[p.status];
          return (
            <div
              key={p.id}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5"
              style={{ background: "#0F1922", border: "1px solid #1E2D3D" }}
            >
              <div
                className="flex items-center justify-center rounded-lg font-bold flex-shrink-0"
                style={{
                  width: 34,
                  height: 34,
                  background: `${p.color}1A`,
                  color: p.color,
                  fontSize: 11,
                  border: `1px solid ${p.color}30`,
                }}
              >
                {p.logo}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    style={{ fontWeight: 600, fontSize: 13, color: "#E8EEF5" }}
                  >
                    {p.name}
                  </span>
                  <span
                    className="flex items-center gap-1"
                    style={{
                      fontSize: 10,
                      color: s.color,
                      background: s.bg,
                      padding: "2px 7px",
                      borderRadius: 999,
                      fontWeight: 600,
                    }}
                  >
                    {s.icon} {s.label}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: "#7B8FA0" }}>
                  {p.status === "connected"
                    ? `₹${p.revenue.toLocaleString("en-IN")} · ${p.orders} orders · ${p.growth > 0 ? "+" : ""}${p.growth}%`
                    : p.status === "error"
                      ? "API token expired — reconnect required"
                      : p.status === "pending"
                        ? "Setup in progress"
                        : "Not connected"}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {p.pendingActions > 0 && (
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: "#F2C94C",
                      background: "rgba(242,201,76,0.18)",
                      padding: "2px 6px",
                      borderRadius: 999,
                    }}
                  >
                    {p.pendingActions} pending
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => doSync(p.id)}
                  style={{ color: "#7B8FA0" }}
                >
                  <RefreshCw
                    size={13}
                    className={syncing === p.id ? "animate-spin" : ""}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
