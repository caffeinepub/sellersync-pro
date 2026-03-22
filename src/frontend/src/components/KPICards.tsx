import {
  IndianRupee,
  Package,
  Percent,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

const kpis = [
  {
    label: "Total Revenue",
    value: "₹3,34,750",
    change: "+16.4%",
    up: true,
    icon: <IndianRupee size={15} />,
    accent: "#F59E0B",
  },
  {
    label: "Total Orders",
    value: "2,768",
    change: "+8.2%",
    up: true,
    icon: <ShoppingCart size={15} />,
    accent: "#4ADE80",
  },
  {
    label: "Active Products",
    value: "847",
    change: "+12",
    up: true,
    icon: <Package size={15} />,
    accent: "#60A5FA",
  },
  {
    label: "Conversion Rate",
    value: "3.2%",
    change: "-0.3%",
    up: false,
    icon: <Percent size={15} />,
    accent: "#A78BFA",
  },
];

export default function KPICards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {kpis.map((k) => (
        <div
          key={k.label}
          className="card-premium rounded-xl p-4"
          style={{ position: "relative", overflow: "hidden" }}
        >
          {/* subtle top accent line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: `linear-gradient(90deg, ${k.accent}60, transparent)`,
              borderRadius: "12px 12px 0 0",
            }}
          />
          <div className="flex items-start justify-between mb-3">
            <span
              style={{
                fontSize: 11.5,
                color: "#5A6E85",
                fontWeight: 500,
                letterSpacing: "0.01em",
              }}
            >
              {k.label}
            </span>
            <div
              className="flex items-center justify-center rounded-lg flex-shrink-0"
              style={{
                width: 28,
                height: 28,
                background: `${k.accent}14`,
                color: k.accent,
              }}
            >
              {k.icon}
            </div>
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: "#EEF2F7",
              letterSpacing: "-0.8px",
              lineHeight: 1,
              marginBottom: 8,
              fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
            }}
          >
            {k.value}
          </div>
          <div className="flex items-center gap-1.5">
            {k.up ? (
              <TrendingUp size={11} color="#4ADE80" />
            ) : (
              <TrendingDown size={11} color="#F87171" />
            )}
            <span
              style={{
                fontSize: 11.5,
                color: k.up ? "#4ADE80" : "#F87171",
                fontWeight: 600,
              }}
            >
              {k.change}
            </span>
            <span style={{ fontSize: 10.5, color: "#3D4F63" }}>
              vs last month
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
