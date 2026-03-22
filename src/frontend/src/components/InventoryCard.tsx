import {
  AlertTriangle,
  RefreshCw,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { inventory } from "../data/mockData";

export default function InventoryCard() {
  const lowStock = inventory.filter((i) => i.stock <= i.threshold);
  const normal = inventory.filter((i) => i.stock > i.threshold);

  return (
    <div
      className="rounded-xl"
      style={{
        background: "linear-gradient(135deg, #161F28, #1A2530)",
        border: "1px solid #243241",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid #1E2D3D" }}
      >
        <div>
          <span style={{ fontWeight: 600, fontSize: 14, color: "#E8EEF5" }}>
            Inventory
          </span>
          <p style={{ fontSize: 11, color: "#7B8FA0", margin: "2px 0 0" }}>
            {lowStock.length} items need attention
          </p>
        </div>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "#EB5757",
            background: "rgba(235,87,87,0.14)",
            padding: "3px 8px",
            borderRadius: 999,
          }}
        >
          ⚠ {lowStock.length} LOW
        </span>
      </div>
      <div
        className="p-3 flex flex-col gap-2"
        style={{ maxHeight: 320, overflowY: "auto" }}
      >
        {lowStock.length > 0 && (
          <>
            <p
              style={{
                fontSize: 10,
                color: "#EB5757",
                fontWeight: 700,
                letterSpacing: "0.5px",
                marginBottom: 2,
              }}
            >
              LOW STOCK ALERTS
            </p>
            {lowStock.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-lg px-3 py-2"
                style={{
                  background: "rgba(235,87,87,0.07)",
                  border: "1px solid rgba(235,87,87,0.2)",
                }}
              >
                <AlertTriangle size={14} color="#EB5757" />
                <div className="flex-1 min-w-0">
                  <p
                    style={{
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: "#E8EEF5",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.name}
                  </p>
                  <p style={{ fontSize: 11, color: "#EB5757" }}>
                    {item.stock} left · threshold {item.threshold}
                  </p>
                </div>
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-lg px-2 py-1"
                  style={{
                    background: "rgba(47,124,246,0.18)",
                    border: "1px solid rgba(47,124,246,0.3)",
                    color: "#5B9FFF",
                    fontSize: 10,
                    flexShrink: 0,
                  }}
                >
                  <RefreshCw size={9} /> Reorder
                </button>
              </div>
            ))}
            <div
              style={{ height: 1, background: "#1E2D3D", margin: "4px 0" }}
            />
          </>
        )}
        <p
          style={{
            fontSize: 10,
            color: "#7B8FA0",
            fontWeight: 700,
            letterSpacing: "0.5px",
            marginBottom: 2,
          }}
        >
          ALL PRODUCTS
        </p>
        {[...lowStock, ...normal].map((item) => (
          <div
            key={`${item.id}-all`}
            className="flex items-center gap-3 rounded-lg px-3 py-2"
            style={{ background: "#0F1922", border: "1px solid #1E2D3D" }}
          >
            <div>
              {item.lastMovement.direction === "out" ? (
                <TrendingDown size={14} color="#EB5757" />
              ) : (
                <TrendingUp size={14} color="#2ECC71" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#E8EEF5",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.name}
              </p>
              <p style={{ fontSize: 10.5, color: "#7B8FA0" }}>
                {item.sku} · {item.platforms.join(", ")}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: item.stock <= item.threshold ? "#EB5757" : "#E8EEF5",
                }}
              >
                {item.stock}
              </p>
              <p style={{ fontSize: 10, color: "#7B8FA0" }}>units</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
