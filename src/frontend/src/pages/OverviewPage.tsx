import type { NavTab } from "../App";
import AIAssistant from "../components/AIAssistant";
import AnalyticsCard from "../components/AnalyticsCard";
import IntegrationsCard from "../components/IntegrationsCard";
import InventoryCard from "../components/InventoryCard";
import KPICards from "../components/KPICards";
import OrdersTable from "../components/OrdersTable";

export default function OverviewPage({
  setTab,
}: { setTab: (t: NavTab) => void }) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="flex flex-col gap-4">
      {/* Hero */}
      <div className="flex items-end justify-between flex-wrap gap-2">
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#E8EEF5",
              letterSpacing: "-0.5px",
              margin: 0,
              lineHeight: 1.2,
              wordBreak: "break-word",
            }}
          >
            {greeting}, Admin 👋
          </h1>
          <p style={{ fontSize: 12, color: "#7B8FA0", margin: "3px 0 0" }}>
            Your 5-platform business is running. Here&apos;s what matters today.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap" style={{ flexShrink: 0 }}>
          <button
            type="button"
            onClick={() => setTab("integrations")}
            data-ocid="overview.secondary_button"
            style={{
              fontSize: 11,
              padding: "6px 14px",
              borderRadius: 8,
              background: "rgba(47,124,246,0.14)",
              border: "1px solid rgba(47,124,246,0.3)",
              color: "#5B9FFF",
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            + Connect Platform
          </button>
          <button
            type="button"
            onClick={() => setTab("analytics")}
            data-ocid="overview.secondary_button"
            style={{
              fontSize: 11,
              padding: "6px 14px",
              borderRadius: 8,
              background: "#1A2530",
              border: "1px solid #243241",
              color: "#9AA9B8",
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Full Analytics
          </button>
        </div>
      </div>

      {/* KPIs */}
      <KPICards />

      {/* Row 1: AI Chat + Analytics + Inventory */}
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          alignItems: "stretch",
        }}
      >
        <div
          className="rounded-xl flex flex-col"
          style={{
            background: "linear-gradient(135deg, #0F1117, #161F28)",
            border: "1px solid #1E2D3D",
            minHeight: 340,
            maxHeight: 440,
            overflow: "hidden",
          }}
        >
          <AIAssistant />
        </div>
        <div
          style={{
            minHeight: 340,
            maxHeight: 440,
            overflow: "hidden",
            borderRadius: 12,
          }}
        >
          <AnalyticsCard />
        </div>
        <div
          style={{
            minHeight: 340,
            maxHeight: 440,
            overflow: "hidden",
            borderRadius: 12,
          }}
        >
          <InventoryCard />
        </div>
      </div>

      {/* Row 2: Integrations + Orders */}
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: "minmax(240px, 300px) 1fr",
          alignItems: "start",
        }}
      >
        <div style={{ minHeight: 240, overflow: "hidden", borderRadius: 12 }}>
          <IntegrationsCard />
        </div>
        <div style={{ overflow: "auto", borderRadius: 12 }}>
          <OrdersTable limit={6} />
        </div>
      </div>
    </div>
  );
}
