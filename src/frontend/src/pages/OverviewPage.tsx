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
              fontSize: 21,
              fontWeight: 800,
              color: "#EEF2F7",
              letterSpacing: "-0.5px",
              margin: 0,
              lineHeight: 1.2,
              fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
            }}
          >
            {greeting}, Admin 👋
          </h1>
          <p
            style={{
              fontSize: 12.5,
              color: "#3D4F63",
              margin: "4px 0 0",
              letterSpacing: "0.01em",
            }}
          >
            Your 5-platform business is running. Here&apos;s what matters today.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap" style={{ flexShrink: 0 }}>
          <button
            type="button"
            onClick={() => setTab("integrations")}
            data-ocid="overview.secondary_button"
            style={{
              fontSize: 12,
              padding: "6px 14px",
              borderRadius: 8,
              background: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.2)",
              color: "#F59E0B",
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.15s",
            }}
          >
            + Connect Platform
          </button>
          <button
            type="button"
            onClick={() => setTab("analytics")}
            data-ocid="overview.secondary_button"
            style={{
              fontSize: 12,
              padding: "6px 14px",
              borderRadius: 8,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#5A6E85",
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.15s",
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
          className="card-premium rounded-xl flex flex-col"
          style={{ minHeight: 340, maxHeight: 440, overflow: "hidden" }}
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
