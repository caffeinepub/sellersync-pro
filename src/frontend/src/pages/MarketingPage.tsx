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
    color: "#2F7CF6",
  },
  {
    icon: <Gift size={18} />,
    title: "Discount Manager",
    desc: "Set bulk discounts and coupon codes",
    color: "#F2C94C",
  },
  {
    icon: <Star size={18} />,
    title: "Review Manager",
    desc: "Monitor and respond to product reviews",
    color: "#2ECC71",
  },
  {
    icon: <TrendingUp size={18} />,
    title: "SEO Optimizer",
    desc: "Improve product listing search rankings",
    color: "#4CC9F0",
  },
];

export default function MarketingPage() {
  return (
    <div className="flex flex-col gap-4">
      <h2
        style={{ fontSize: 18, fontWeight: 700, color: "#E8EEF5", margin: 0 }}
      >
        Marketing Tools
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {tools.map((t) => (
          <button
            type="button"
            key={t.title}
            className="rounded-xl p-4 text-left transition-all min-w-0 overflow-hidden"
            style={{
              background: "#161F28",
              border: "1px solid #243241",
              cursor: "pointer",
            }}
          >
            <div
              className="flex items-center justify-center rounded-lg mb-2"
              style={{
                width: 38,
                height: 38,
                background: `${t.color}18`,
                color: t.color,
                flexShrink: 0,
              }}
            >
              {t.icon}
            </div>
            <div
              style={{
                fontWeight: 600,
                fontSize: 13,
                color: "#E8EEF5",
                marginBottom: 3,
              }}
            >
              {t.title}
            </div>
            <div style={{ fontSize: 11, color: "#7B8FA0" }}>{t.desc}</div>
          </button>
        ))}
      </div>

      <div
        className="rounded-xl"
        style={{
          background: "#161F28",
          border: "1px solid #243241",
          overflow: "hidden",
        }}
      >
        <div
          className="px-4 py-2"
          style={{ borderBottom: "1px solid #1E2D3D" }}
        >
          <span style={{ fontWeight: 600, fontSize: 13, color: "#E8EEF5" }}>
            Active Campaigns
          </span>
        </div>
        <div className="p-3 flex flex-col gap-2" style={{ overflowX: "auto" }}>
          {campaigns.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-3 rounded-lg px-3 py-2"
              style={{
                background: "#0F1922",
                border: "1px solid #1E2D3D",
                minWidth: 0,
              }}
            >
              <div
                className="flex items-center justify-center rounded-lg flex-shrink-0"
                style={{
                  width: 30,
                  height: 30,
                  background: `${c.color}18`,
                  color: c.color,
                }}
              >
                <Megaphone size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="truncate"
                  style={{ fontWeight: 600, fontSize: 13, color: "#E8EEF5" }}
                >
                  {c.name}
                </div>
                <div style={{ fontSize: 10, color: "#7B8FA0" }}>
                  Reach: {c.reach} · Conversion: {c.conversion}
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
                    padding: "2px 8px",
                    borderRadius: 999,
                    whiteSpace: "nowrap",
                    color:
                      c.status === "active"
                        ? "#2ECC71"
                        : c.status === "scheduled"
                          ? "#F2C94C"
                          : "#7B8FA0",
                    background:
                      c.status === "active"
                        ? "rgba(46,204,113,0.12)"
                        : c.status === "scheduled"
                          ? "rgba(242,201,76,0.12)"
                          : "#1E2D3D",
                  }}
                >
                  {c.status.toUpperCase()}
                </span>
                <button
                  type="button"
                  style={{
                    fontSize: 11,
                    color: "#5B9FFF",
                    background: "rgba(47,124,246,0.14)",
                    border: "1px solid rgba(47,124,246,0.3)",
                    padding: "4px 10px",
                    borderRadius: 7,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
