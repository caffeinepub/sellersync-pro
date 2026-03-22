import { Gift, Megaphone, Star, TrendingUp } from "lucide-react";

const campaigns = [
  {
    name: "Meesho Summer Sale",
    platform: "Meesho",
    status: "active",
    reach: "12K",
    conversion: "4.2%",
    color: "#F43397",
  },
  {
    name: "Amazon Lightning Deal",
    platform: "Amazon",
    status: "scheduled",
    reach: "45K",
    conversion: "—",
    color: "#FF9900",
  },
  {
    name: "Flipkart Big Billion",
    platform: "Flipkart",
    status: "draft",
    reach: "—",
    conversion: "—",
    color: "#2874F0",
  },
];

const tools = [
  {
    icon: <Megaphone size={18} />,
    title: "Create Campaign",
    desc: "Launch promotional campaigns across platforms",
    accent: "#F59E0B",
  },
  {
    icon: <Gift size={18} />,
    title: "Discount Manager",
    desc: "Set bulk discounts and coupon codes",
    accent: "#4ADE80",
  },
  {
    icon: <Star size={18} />,
    title: "Review Manager",
    desc: "Monitor and respond to product reviews",
    accent: "#60A5FA",
  },
  {
    icon: <TrendingUp size={18} />,
    title: "SEO Optimizer",
    desc: "Improve product listing search rankings",
    accent: "#A78BFA",
  },
];

const statusStyle: Record<
  string,
  { color: string; bg: string; border: string }
> = {
  active: {
    color: "#4ADE80",
    bg: "rgba(74,222,128,0.1)",
    border: "rgba(74,222,128,0.2)",
  },
  scheduled: {
    color: "#FCD34D",
    bg: "rgba(252,211,77,0.1)",
    border: "rgba(252,211,77,0.2)",
  },
  draft: {
    color: "#5A6E85",
    bg: "rgba(90,110,133,0.1)",
    border: "rgba(90,110,133,0.15)",
  },
};

export default function MarketingPage() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="section-title" style={{ margin: 0 }}>
        Marketing Tools
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {tools.map((t) => (
          <button
            type="button"
            key={t.title}
            className="card-premium rounded-xl p-4 text-left min-w-0 overflow-hidden"
            style={{ cursor: "pointer" }}
          >
            <div
              className="flex items-center justify-center rounded-lg mb-3"
              style={{
                width: 38,
                height: 38,
                background: `${t.accent}14`,
                color: t.accent,
                flexShrink: 0,
              }}
            >
              {t.icon}
            </div>
            <div
              style={{
                fontWeight: 600,
                fontSize: 13,
                color: "#D1D9E6",
                marginBottom: 4,
              }}
            >
              {t.title}
            </div>
            <div style={{ fontSize: 11.5, color: "#3D4F63", lineHeight: 1.4 }}>
              {t.desc}
            </div>
          </button>
        ))}
      </div>

      <div className="card-surface" style={{ overflow: "hidden" }}>
        <div
          style={{
            padding: "12px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <span style={{ fontWeight: 600, fontSize: 13, color: "#D1D9E6" }}>
            Active Campaigns
          </span>
        </div>
        <div className="p-3 flex flex-col gap-2">
          {campaigns.map((c) => {
            const st = statusStyle[c.status];
            return (
              <div
                key={c.name}
                className="data-table-row flex items-center gap-3 rounded-lg px-3 py-2.5"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  minWidth: 0,
                }}
              >
                <div
                  className="flex items-center justify-center rounded-lg flex-shrink-0"
                  style={{
                    width: 32,
                    height: 32,
                    background: `${c.color}15`,
                    color: c.color,
                  }}
                >
                  <Megaphone size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className="truncate"
                    style={{ fontWeight: 600, fontSize: 13, color: "#D1D9E6" }}
                  >
                    {c.name}
                  </div>
                  <div
                    style={{ fontSize: 10.5, color: "#3D4F63", marginTop: 1 }}
                  >
                    Reach: {c.reach} · Conv: {c.conversion}
                  </div>
                </div>
                <div
                  className="flex items-center gap-2"
                  style={{ flexShrink: 0 }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 9px",
                      borderRadius: 999,
                      whiteSpace: "nowrap",
                      color: st.color,
                      background: st.bg,
                      border: `1px solid ${st.border}`,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {c.status.toUpperCase()}
                  </span>
                  <button
                    type="button"
                    style={{
                      fontSize: 11.5,
                      color: "#F59E0B",
                      background: "rgba(245,158,11,0.08)",
                      border: "1px solid rgba(245,158,11,0.2)",
                      padding: "4px 12px",
                      borderRadius: 7,
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
