import { Zap } from "lucide-react";

interface UpgradeBannerProps {
  onUpgradeClick: () => void;
}

export default function UpgradeBanner({ onUpgradeClick }: UpgradeBannerProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: "8px 20px",
        background:
          "linear-gradient(90deg, rgba(245,158,11,0.12) 0%, rgba(217,119,6,0.08) 100%)",
        borderBottom: "1px solid rgba(245,158,11,0.2)",
        flexShrink: 0,
      }}
    >
      <Zap size={13} style={{ color: "#F59E0B" }} />
      <span style={{ fontSize: 12.5, color: "#CBD5E1", fontWeight: 500 }}>
        You&apos;re on a free trial.{" "}
        <span style={{ color: "#F59E0B", fontWeight: 600 }}>
          Upgrade to SellerSync Pro
        </span>{" "}
        and unlock everything.
      </span>
      <button
        type="button"
        data-ocid="upgrade_banner.primary_button"
        onClick={onUpgradeClick}
        style={{
          padding: "4px 14px",
          borderRadius: 999,
          background: "linear-gradient(135deg, #F59E0B, #D97706)",
          color: "#0A0800",
          fontSize: 11.5,
          fontWeight: 700,
          border: "none",
          cursor: "pointer",
          letterSpacing: "0.02em",
          whiteSpace: "nowrap",
          boxShadow: "0 2px 8px rgba(245,158,11,0.3)",
        }}
      >
        Upgrade Now
      </button>
    </div>
  );
}
