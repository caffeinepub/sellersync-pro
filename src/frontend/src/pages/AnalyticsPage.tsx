import AnalyticsCard from "../components/AnalyticsCard";
import { platforms } from "../data/mockData";

export default function AnalyticsPage() {
  const totalRevenue = platforms.reduce((a, p) => a + p.revenue, 0);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        paddingBottom: 16,
      }}
    >
      <h2
        style={{ fontSize: 18, fontWeight: 700, color: "#E8EEF5", margin: 0 }}
      >
        Analytics & Reports
      </h2>

      {/* Platform KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: 10,
        }}
      >
        {platforms.map((p) => (
          <div
            key={p.id}
            style={{
              background: "#161F28",
              border: "1px solid #243241",
              borderRadius: 10,
              padding: "10px 12px",
            }}
          >
            <div style={{ marginBottom: 6 }}>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: p.color,
                  background: `${p.color}22`,
                  padding: "2px 7px",
                  borderRadius: 999,
                  display: "inline-block",
                  whiteSpace: "nowrap",
                }}
              >
                {p.name}
              </span>
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#E8EEF5",
                lineHeight: 1.2,
              }}
            >
              ₹{(p.revenue / 1000).toFixed(0)}K
            </div>
            <div
              style={{
                fontSize: 10,
                color: p.growth >= 0 ? "#2ECC71" : "#EB5757",
                marginTop: 3,
              }}
            >
              {p.growth >= 0 ? "+" : ""}
              {p.growth}% growth
            </div>
            <div style={{ fontSize: 10, color: "#7B8FA0", marginTop: 1 }}>
              {p.orders} orders
            </div>
            <div
              style={{
                height: 3,
                background: "#1E2D3D",
                borderRadius: 999,
                marginTop: 8,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${(p.revenue / totalRevenue) * 100}%`,
                  height: "100%",
                  background: p.color,
                  borderRadius: 999,
                }}
              />
            </div>
            <div style={{ fontSize: 10, color: "#7B8FA0", marginTop: 3 }}>
              {((p.revenue / totalRevenue) * 100).toFixed(1)}% of total
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div
        style={{
          background: "#161F28",
          border: "1px solid #243241",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <AnalyticsCard expanded />
      </div>

      {/* Category & Platform Breakdowns */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 12,
        }}
      >
        {/* Top Performing Categories */}
        <div
          style={{
            background: "#161F28",
            border: "1px solid #243241",
            borderRadius: 10,
            padding: "14px 16px",
          }}
        >
          <h3
            style={{
              fontWeight: 600,
              fontSize: 13,
              color: "#E8EEF5",
              marginBottom: 12,
              marginTop: 0,
            }}
          >
            Top Performing Categories
          </h3>
          {(
            [
              ["Electronics", 45],
              ["Clothing", 22],
              ["Home Decor", 15],
              ["Industrial", 12],
              ["Beauty", 6],
            ] as [string, number][]
          ).map(([cat, pct]) => (
            <div
              key={cat}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 9,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  color: "#9AA9B8",
                  minWidth: 82,
                  flexShrink: 0,
                }}
              >
                {cat}
              </span>
              <div
                style={{
                  flex: 1,
                  height: 5,
                  background: "#1E2D3D",
                  borderRadius: 999,
                  overflow: "hidden",
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    width: `${pct}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, #2F7CF6, #4CC9F0)",
                    borderRadius: 999,
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 11,
                  color: "#E8EEF5",
                  fontWeight: 600,
                  minWidth: 32,
                  textAlign: "right",
                }}
              >
                {pct}%
              </span>
            </div>
          ))}
        </div>

        {/* Platform Revenue Share */}
        <div
          style={{
            background: "#161F28",
            border: "1px solid #243241",
            borderRadius: 10,
            padding: "14px 16px",
          }}
        >
          <h3
            style={{
              fontWeight: 600,
              fontSize: 13,
              color: "#E8EEF5",
              marginBottom: 12,
              marginTop: 0,
            }}
          >
            Platform Revenue Share
          </h3>
          {platforms
            .filter((p) => p.revenue > 0)
            .map((p) => (
              <div
                key={p.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 9,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    color: "#9AA9B8",
                    minWidth: 76,
                    flexShrink: 0,
                  }}
                >
                  {p.name}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 5,
                    background: "#1E2D3D",
                    borderRadius: 999,
                    overflow: "hidden",
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      width: `${(p.revenue / totalRevenue) * 100}%`,
                      height: "100%",
                      background: p.color,
                      borderRadius: 999,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 11,
                    color: "#E8EEF5",
                    fontWeight: 600,
                    minWidth: 48,
                    textAlign: "right",
                  }}
                >
                  ₹{(p.revenue / 1000).toFixed(0)}K
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Summary Report Table */}
      <div
        style={{
          background: "#161F28",
          border: "1px solid #243241",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <div
          style={{ padding: "10px 14px", borderBottom: "1px solid #1E2D3D" }}
        >
          <h3
            style={{
              fontWeight: 600,
              fontSize: 13,
              color: "#E8EEF5",
              margin: 0,
            }}
          >
            Platform Summary Report
          </h3>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", minWidth: 520 }}
          >
            <thead>
              <tr style={{ background: "#1A2530" }}>
                {[
                  "Platform",
                  "Revenue",
                  "Orders",
                  "Avg Order",
                  "Growth",
                  "Share",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "8px 12px",
                      fontSize: 10,
                      fontWeight: 600,
                      color: "#7B8FA0",
                      textAlign: "left",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {platforms.map((p, i) => (
                <tr
                  key={p.id}
                  style={{
                    borderTop: "1px solid #1E2D3D",
                    background: i % 2 === 0 ? "transparent" : "#12191F",
                  }}
                >
                  <td style={{ padding: "8px 12px" }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: p.color,
                        background: `${p.color}18`,
                        padding: "2px 7px",
                        borderRadius: 999,
                        whiteSpace: "nowrap",
                        display: "inline-block",
                      }}
                    >
                      {p.name}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "8px 12px",
                      fontSize: 12,
                      color: "#E8EEF5",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    ₹{p.revenue.toLocaleString("en-IN")}
                  </td>
                  <td
                    style={{
                      padding: "8px 12px",
                      fontSize: 12,
                      color: "#9AA9B8",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.orders}
                  </td>
                  <td
                    style={{
                      padding: "8px 12px",
                      fontSize: 12,
                      color: "#9AA9B8",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.orders > 0
                      ? `₹${Math.round(p.revenue / p.orders).toLocaleString("en-IN")}`
                      : "—"}
                  </td>
                  <td style={{ padding: "8px 12px", whiteSpace: "nowrap" }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: p.growth >= 0 ? "#2ECC71" : "#EB5757",
                      }}
                    >
                      {p.growth >= 0 ? "+" : ""}
                      {p.growth}%
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "8px 12px",
                      fontSize: 12,
                      color: "#9AA9B8",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {((p.revenue / totalRevenue) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
