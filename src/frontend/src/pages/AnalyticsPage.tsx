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
      <h2 className="section-title" style={{ margin: 0 }}>
        Analytics &amp; Reports
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
            className="card-premium"
            style={{ padding: "12px 14px", borderRadius: 10 }}
          >
            <div style={{ marginBottom: 8 }}>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: p.color,
                  background: `${p.color}18`,
                  padding: "2px 8px",
                  borderRadius: 999,
                  display: "inline-block",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.04em",
                }}
              >
                {p.name}
              </span>
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: "#EEF2F7",
                lineHeight: 1.1,
                fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
                letterSpacing: "-0.5px",
              }}
            >
              ₹{(p.revenue / 1000).toFixed(0)}K
            </div>
            <div
              style={{
                fontSize: 10.5,
                color: p.growth >= 0 ? "#4ADE80" : "#F87171",
                marginTop: 4,
                fontWeight: 600,
              }}
            >
              {p.growth >= 0 ? "+" : ""}
              {p.growth}% growth
            </div>
            <div style={{ fontSize: 10.5, color: "#3D4F63", marginTop: 1 }}>
              {p.orders} orders
            </div>
            <div
              style={{
                height: 3,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 999,
                marginTop: 10,
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
            <div style={{ fontSize: 10, color: "#3D4F63", marginTop: 4 }}>
              {((p.revenue / totalRevenue) * 100).toFixed(1)}% of total
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="card-surface" style={{ overflow: "hidden" }}>
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
        <div className="card-surface" style={{ padding: "16px 18px" }}>
          <h3
            style={{
              fontWeight: 600,
              fontSize: 13,
              color: "#D1D9E6",
              marginBottom: 14,
              marginTop: 0,
              letterSpacing: "-0.2px",
            }}
          >
            Top Performing Categories
          </h3>
          {(
            [
              "Electronics",
              "Clothing",
              "Home Decor",
              "Industrial",
              "Beauty",
            ] as const
          ).map((cat, i) => {
            const pct = [45, 22, 15, 12, 6][i];
            return (
              <div
                key={cat}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    color: "#5A6E85",
                    minWidth: 82,
                    flexShrink: 0,
                  }}
                >
                  {cat}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 4,
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: 999,
                    overflow: "hidden",
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      height: "100%",
                      background: "linear-gradient(90deg, #F59E0B, #FCD34D)",
                      borderRadius: 999,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 11,
                    color: "#EEF2F7",
                    fontWeight: 600,
                    minWidth: 32,
                    textAlign: "right",
                  }}
                >
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>

        {/* Platform Revenue Share */}
        <div className="card-surface" style={{ padding: "16px 18px" }}>
          <h3
            style={{
              fontWeight: 600,
              fontSize: 13,
              color: "#D1D9E6",
              marginBottom: 14,
              marginTop: 0,
              letterSpacing: "-0.2px",
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
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    color: "#5A6E85",
                    minWidth: 76,
                    flexShrink: 0,
                  }}
                >
                  {p.name}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 4,
                    background: "rgba(255,255,255,0.05)",
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
                    color: "#EEF2F7",
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

      {/* Summary Table */}
      <div className="card-surface" style={{ overflow: "hidden" }}>
        <div
          style={{
            padding: "12px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <h3
            style={{
              fontWeight: 600,
              fontSize: 13,
              color: "#D1D9E6",
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
              <tr style={{ background: "rgba(255,255,255,0.025)" }}>
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
                      padding: "9px 14px",
                      fontSize: 10.5,
                      fontWeight: 600,
                      color: "#3D4F63",
                      textAlign: "left",
                      whiteSpace: "nowrap",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {platforms.map((p) => (
                <tr
                  key={p.id}
                  className="data-table-row"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <td style={{ padding: "9px 14px" }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: p.color,
                        background: `${p.color}15`,
                        padding: "2px 8px",
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
                      padding: "9px 14px",
                      fontSize: 12,
                      color: "#EEF2F7",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    ₹{p.revenue.toLocaleString("en-IN")}
                  </td>
                  <td
                    style={{
                      padding: "9px 14px",
                      fontSize: 12,
                      color: "#5A6E85",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.orders}
                  </td>
                  <td
                    style={{
                      padding: "9px 14px",
                      fontSize: 12,
                      color: "#5A6E85",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.orders > 0
                      ? `₹${Math.round(p.revenue / p.orders).toLocaleString("en-IN")}`
                      : "—"}
                  </td>
                  <td style={{ padding: "9px 14px", whiteSpace: "nowrap" }}>
                    <span
                      style={{
                        fontSize: 11.5,
                        fontWeight: 600,
                        color: p.growth >= 0 ? "#4ADE80" : "#F87171",
                      }}
                    >
                      {p.growth >= 0 ? "+" : ""}
                      {p.growth}%
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "9px 14px",
                      fontSize: 12,
                      color: "#5A6E85",
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
