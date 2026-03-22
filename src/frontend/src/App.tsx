import {
  BarChart3,
  Bell,
  Bot,
  ChevronDown,
  Crown,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Package,
  Plug,
  Search,
  Settings,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import PaywallModal from "./components/PaywallModal";
import TrialBanner from "./components/TrialBanner";
import UpgradeBanner from "./components/UpgradeBanner";
import { useTrialTimer } from "./hooks/useTrialTimer";
import AnalyticsPage from "./pages/AnalyticsPage";
import IntegrationsPage from "./pages/IntegrationsPage";
import InventoryPage from "./pages/InventoryPage";
import MarketingPage from "./pages/MarketingPage";
import OrdersPage from "./pages/OrdersPage";
import OverviewPage from "./pages/OverviewPage";
import SettingsPage from "./pages/SettingsPage";

export type NavTab =
  | "overview"
  | "orders"
  | "inventory"
  | "analytics"
  | "marketing"
  | "integrations"
  | "settings";

const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
  { id: "orders", label: "Orders", icon: <ShoppingCart size={18} /> },
  { id: "inventory", label: "Inventory", icon: <Package size={18} /> },
  { id: "analytics", label: "Analytics", icon: <BarChart3 size={18} /> },
  { id: "marketing", label: "Marketing", icon: <Megaphone size={18} /> },
  { id: "integrations", label: "Integrations", icon: <Plug size={18} /> },
];

const PLAN_LABELS: Record<string, string> = {
  weekly: "PRO Weekly",
  monthly: "PRO Monthly",
  yearly: "PRO Yearly",
};

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>("overview");
  const [search, setSearch] = useState("");
  const [showPaywall, setShowPaywall] = useState(false);
  const {
    secondsLeft,
    trialExpired,
    isSubscribed,
    subscribe,
    subscribeFromStripe,
    currentPlan,
  } = useTrialTimer();

  // Handle Stripe redirect params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get("payment");
    const plan = params.get("plan") ?? "monthly";

    if (payment === "success") {
      subscribeFromStripe(plan);
      toast.success("🎉 Payment successful! Welcome to SellerSync Pro.", {
        duration: 6000,
      });
      // Clean URL
      const clean = window.location.pathname;
      window.history.replaceState({}, document.title, clean);
    } else if (payment === "cancelled") {
      toast.error("Payment was cancelled. You can try again anytime.", {
        duration: 5000,
      });
      const clean = window.location.pathname;
      window.history.replaceState({}, document.title, clean);
    }
  }, [subscribeFromStripe]);

  const handleSubscribe = (plan: string) => {
    subscribe(plan);
    setShowPaywall(false);
  };

  const renderPage = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewPage setTab={setActiveTab} />;
      case "orders":
        return <OrdersPage />;
      case "inventory":
        return <InventoryPage />;
      case "analytics":
        return <AnalyticsPage />;
      case "marketing":
        return <MarketingPage />;
      case "integrations":
        return <IntegrationsPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <OverviewPage setTab={setActiveTab} />;
    }
  };

  return (
    <div
      className="flex h-screen w-full overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #08090C 0%, #0C0E14 100%)",
        fontFamily:
          "'Plus Jakarta Sans', 'Bricolage Grotesque', system-ui, sans-serif",
      }}
    >
      {/* Paywall */}
      {(trialExpired || showPaywall) && !isSubscribed && (
        <PaywallModal onSubscribe={handleSubscribe} />
      )}

      {/* Left Sidebar */}
      <aside
        className="flex flex-col items-center py-6 gap-2"
        style={{
          width: 60,
          minWidth: 60,
          background: "#0A0C12",
          borderRight: "1px solid rgba(245,158,11,0.1)",
          flexShrink: 0,
          zIndex: 40,
          position: "relative",
        }}
      >
        {/* Logo */}
        <div
          className="mb-4 flex items-center justify-center rounded-xl"
          style={{
            width: 38,
            height: 38,
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            boxShadow: "0 4px 16px rgba(245,158,11,0.35)",
          }}
        >
          <Bot size={20} color="#0A0800" />
        </div>
        {navItems.map((item) => (
          <button
            type="button"
            key={item.id}
            data-ocid={`nav.${item.id}_link`}
            onClick={() => setActiveTab(item.id)}
            title={item.label}
            className="flex items-center justify-center rounded-xl transition-all duration-200"
            style={{
              width: 40,
              height: 40,
              background:
                activeTab === item.id ? "rgba(245,158,11,0.15)" : "transparent",
              color: activeTab === item.id ? "#F59E0B" : "#4A5568",
              border:
                activeTab === item.id
                  ? "1px solid rgba(245,158,11,0.3)"
                  : "1px solid transparent",
            }}
          >
            {item.icon}
          </button>
        ))}
        <div className="flex-1" />
        <button
          type="button"
          data-ocid="nav.settings_link"
          onClick={() => setActiveTab("settings")}
          title="Settings"
          className="flex items-center justify-center rounded-xl"
          style={{
            width: 40,
            height: 40,
            color: activeTab === "settings" ? "#F59E0B" : "#4A5568",
          }}
        >
          <Settings size={18} />
        </button>
        <button
          type="button"
          title="Help"
          className="flex items-center justify-center rounded-xl"
          style={{ width: 40, height: 40, color: "#4A5568" }}
        >
          <HelpCircle size={18} />
        </button>
        <button
          type="button"
          title="Logout"
          className="flex items-center justify-center rounded-xl"
          style={{ width: 40, height: 40, color: "#4A5568" }}
        >
          <LogOut size={18} />
        </button>
      </aside>

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top Header */}
        <header
          className="flex items-center px-4 gap-2 flex-wrap"
          style={{
            minHeight: 58,
            paddingTop: 8,
            paddingBottom: 8,
            background: "#0A0C12",
            borderBottom: "1px solid rgba(245,158,11,0.1)",
            flexShrink: 0,
            zIndex: 30,
            position: "relative",
          }}
        >
          {/* Brand */}
          <div className="flex items-center gap-2" style={{ flexShrink: 0 }}>
            <span
              style={{
                fontWeight: 800,
                fontSize: 16,
                color: "#F1F5F9",
                letterSpacing: "-0.5px",
                fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              SellerSync
            </span>
            <span
              style={{
                fontSize: 11,
                color: "#0A0800",
                fontWeight: 700,
                background: "linear-gradient(135deg, #F59E0B, #D97706)",
                padding: "2px 7px",
                borderRadius: 999,
                letterSpacing: "0.05em",
                whiteSpace: "nowrap",
              }}
            >
              PRO
            </span>
          </div>

          {/* Trial Banner (in header) — hidden on small screens */}
          {!isSubscribed && secondsLeft > 0 && (
            <div
              className="hidden md:flex"
              style={{ flexShrink: 0, overflow: "hidden" }}
            >
              <TrialBanner secondsLeft={secondsLeft} />
            </div>
          )}

          <div className="flex-1" />

          {/* Search — hidden on very small screens */}
          <div
            className="hidden sm:flex items-center gap-2 rounded-lg px-3"
            style={{
              background: "#0F1117",
              border: "1px solid rgba(245,158,11,0.12)",
              height: 34,
              flexShrink: 0,
            }}
          >
            <Search size={13} color="#4A5568" />
            <input
              data-ocid="header.search_input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders, products..."
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: 12.5,
                color: "#E2E8F0",
                width: 140,
              }}
            />
          </div>

          {/* Bell */}
          <button
            type="button"
            className="relative flex items-center justify-center rounded-lg"
            style={{
              width: 34,
              height: 34,
              background: "#0F1117",
              border: "1px solid rgba(245,158,11,0.12)",
              color: "#4A5568",
              flexShrink: 0,
            }}
          >
            <Bell size={15} />
            <span
              className="absolute -top-1 -right-1 flex items-center justify-center rounded-full text-white"
              style={{
                width: 15,
                height: 15,
                fontSize: 9,
                background: "#EF4444",
                fontWeight: 700,
              }}
            >
              5
            </span>
          </button>

          {/* User chip */}
          <div
            className="flex items-center gap-2 rounded-lg px-3"
            style={{
              background: "#0F1117",
              border: "1px solid rgba(245,158,11,0.12)",
              height: 34,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: 22,
                height: 22,
                background: "linear-gradient(135deg, #F59E0B, #D97706)",
                fontSize: 10,
                fontWeight: 700,
                color: "#0A0800",
              }}
            >
              {isSubscribed ? <Crown size={11} /> : "A"}
            </div>
            <div
              className="hidden sm:flex flex-col"
              style={{ lineHeight: 1.2 }}
            >
              <span style={{ fontSize: 12, fontWeight: 600, color: "#F1F5F9" }}>
                Admin
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: isSubscribed ? "#F59E0B" : "#4A5568",
                  fontWeight: isSubscribed ? 600 : 400,
                  whiteSpace: "nowrap",
                }}
              >
                {isSubscribed && currentPlan
                  ? (PLAN_LABELS[currentPlan] ?? "PRO")
                  : "Owner"}
              </span>
            </div>
            <ChevronDown size={12} color="#4A5568" style={{ flexShrink: 0 }} />
          </div>

          {/* Upgrade CTA */}
          {!isSubscribed && (
            <button
              type="button"
              data-ocid="header.upgrade_button"
              onClick={() => setShowPaywall(true)}
              style={{
                padding: "6px 14px",
                borderRadius: 8,
                background: "linear-gradient(135deg, #F59E0B, #D97706)",
                color: "#0A0800",
                fontSize: 12,
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
                boxShadow: "0 2px 10px rgba(245,158,11,0.35)",
                flexShrink: 0,
              }}
            >
              ✦ Upgrade
            </button>
          )}
        </header>

        {/* Upgrade Banner — thin strip */}
        {!isSubscribed && !trialExpired && (
          <UpgradeBanner onUpgradeClick={() => setShowPaywall(true)} />
        )}

        {/* Page content */}
        <main
          className="flex-1 overflow-y-auto"
          style={{ padding: "24px 28px" }}
        >
          {renderPage()}
        </main>

        {/* Footer */}
        <footer
          style={{
            padding: "10px 28px",
            borderTop: "1px solid rgba(245,158,11,0.08)",
            fontSize: 11,
            color: "#334155",
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          © {new Date().getFullYear()} SellerSync Pro. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#F59E0B", textDecoration: "none" }}
          >
            caffeine.ai
          </a>
        </footer>
      </div>
    </div>
  );
}
