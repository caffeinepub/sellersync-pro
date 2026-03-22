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

const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  connected: {
    color: "#4ADE80",
    icon: <CheckCircle size={12} color="#4ADE80" />,
  },
  error: { color: "#F87171", icon: <XCircle size={12} color="#F87171" /> },
  pending: { color: "#FCD34D", icon: <Clock size={12} color="#FCD34D" /> },
  disconnected: {
    color: "#3D4F63",
    icon: <XCircle size={12} color="#3D4F63" />,
  },
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
        <h2 className="section-title" style={{ margin: 0 }}>
          Platform Integrations
        </h2>
        <button
          type="button"
          className="btn-gold"
          style={{
            fontSize: 12,
            padding: "7px 14px",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Plus size={12} /> Connect New
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {platforms.map((p) => {
          const sc = statusConfig[p.status] ?? statusConfig.disconnected;
          return (
            <div
              key={p.id}
              className="card-premium"
              style={{ padding: "16px 18px", borderRadius: 12 }}
            >
              <div className="flex items-center gap-3">
                {/* Logo */}
                <div
                  className="flex items-center justify-center rounded-xl font-black flex-shrink-0"
                  style={{
                    width: 44,
                    height: 44,
                    background: `${p.color}15`,
                    color: p.color,
                    fontSize: 12,
                    border: `1px solid ${p.color}25`,
                  }}
                >
                  {p.logo}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: 14,
                        color: "#EEF2F7",
                      }}
                    >
                      {p.name}
                    </span>
                    {sc.icon}
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: sc.color,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {p.status.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: "#3D4F63" }}>
                    Region: {p.region} · Last sync: {p.lastSync}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right hidden sm:block">
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 800,
                        color: "#EEF2F7",
                        fontFamily:
                          "'Bricolage Grotesque', system-ui, sans-serif",
                        letterSpacing: "-0.5px",
                      }}
                    >
                      ₹{p.revenue.toLocaleString("en-IN")}
                    </div>
                    <div style={{ fontSize: 10, color: "#3D4F63" }}>
                      {p.orders} orders ·{" "}
                      <span
                        style={{
                          color: p.growth >= 0 ? "#4ADE80" : "#F87171",
                          fontWeight: 600,
                        }}
                      >
                        {p.growth >= 0 ? "+" : ""}
                        {p.growth}%
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <button
                    type="button"
                    onClick={() => doSync(p.id)}
                    className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      color: "#5A6E85",
                      fontSize: 11,
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    <RefreshCw
                      size={11}
                      className={syncing === p.id ? "animate-spin" : ""}
                    />
                    Sync
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      color: "#5A6E85",
                      fontSize: 11,
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    <Settings size={11} /> Config
                  </button>
                </div>
              </div>

              {/* Status alerts */}
              {p.status === "error" && (
                <div
                  className="mt-3 rounded-lg px-3 py-2 flex items-center justify-between"
                  style={{
                    background: "rgba(248,113,113,0.06)",
                    border: "1px solid rgba(248,113,113,0.2)",
                  }}
                >
                  <span style={{ fontSize: 11, color: "#FCA5A5" }}>
                    ⚠ API token expired. Reconnect to resume syncing.
                  </span>
                  <button
                    type="button"
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#F87171",
                      background: "rgba(248,113,113,0.12)",
                      border: "1px solid rgba(248,113,113,0.3)",
                      padding: "3px 10px",
                      borderRadius: 7,
                      marginLeft: 10,
                      flexShrink: 0,
                      cursor: "pointer",
                    }}
                  >
                    Reconnect
                  </button>
                </div>
              )}
              {p.status === "pending" && (
                <div
                  className="mt-3 rounded-lg px-3 py-2 flex items-center justify-between"
                  style={{
                    background: "rgba(252,211,77,0.06)",
                    border: "1px solid rgba(252,211,77,0.18)",
                  }}
                >
                  <span style={{ fontSize: 11, color: "#FDE68A" }}>
                    Complete API setup to start syncing {p.name}.
                  </span>
                  <button
                    type="button"
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#FCD34D",
                      background: "rgba(252,211,77,0.1)",
                      border: "1px solid rgba(252,211,77,0.25)",
                      padding: "3px 10px",
                      borderRadius: 7,
                      marginLeft: 10,
                      flexShrink: 0,
                      cursor: "pointer",
                    }}
                  >
                    Complete Setup
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
