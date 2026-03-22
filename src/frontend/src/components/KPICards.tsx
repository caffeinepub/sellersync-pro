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
    icon: <IndianRupee size={16} />,
    color: "#2F7CF6",
  },
  {
    label: "Total Orders",
    value: "2,768",
    change: "+8.2%",
    up: true,
    icon: <ShoppingCart size={16} />,
    color: "#2ECC71",
  },
  {
    label: "Active Products",
    value: "8",
    change: "+2",
    up: true,
    icon: <Package size={16} />,
    color: "#4CC9F0",
  },
  {
    label: "Conversion Rate",
    value: "3.2%",
    change: "-0.3%",
    up: false,
    icon: <Percent size={16} />,
    color: "#F2C94C",
  },
];

export default function KPICards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((k) => (
        <div
          key={k.label}
          className="rounded-xl p-4"
          style={{
            background: "linear-gradient(135deg, #161F28, #1A2530)",
            border: "1px solid #243241",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontSize: 12, color: "#7B8FA0", fontWeight: 500 }}>
              {k.label}
            </span>
            <div
              className="flex items-center justify-center rounded-lg"
              style={{
                width: 30,
                height: 30,
                background: `${k.color}18`,
                color: k.color,
                flexShrink: 0,
              }}
            >
              {k.icon}
            </div>
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#E8EEF5",
              letterSpacing: "-0.5px",
              wordBreak: "break-word",
            }}
          >
            {k.value}
          </div>
          <div className="flex items-center gap-1 mt-1">
            {k.up ? (
              <TrendingUp size={12} color="#2ECC71" />
            ) : (
              <TrendingDown size={12} color="#EB5757" />
            )}
            <span
              style={{
                fontSize: 12,
                color: k.up ? "#2ECC71" : "#EB5757",
                fontWeight: 600,
              }}
            >
              {k.change}
            </span>
            <span style={{ fontSize: 11, color: "#7B8FA0" }}>
              vs last month
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
