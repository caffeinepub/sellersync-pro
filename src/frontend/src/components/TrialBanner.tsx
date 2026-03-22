interface TrialBannerProps {
  secondsLeft: number;
}

export default function TrialBanner({ secondsLeft }: TrialBannerProps) {
  const minutes = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeStr = `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  const isUrgent = secondsLeft < 120;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "3px 10px",
        borderRadius: 999,
        background: isUrgent ? "rgba(239,68,68,0.15)" : "rgba(245,158,11,0.12)",
        border: `1px solid ${isUrgent ? "rgba(239,68,68,0.4)" : "rgba(245,158,11,0.35)"}`,
        fontSize: 11.5,
        fontWeight: 600,
        color: isUrgent ? "#F87171" : "#FCD34D",
        letterSpacing: "0.01em",
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: isUrgent ? "#F87171" : "#F59E0B",
          animation: "pulse 1.5s infinite",
          flexShrink: 0,
          display: "inline-block",
        }}
      />
      Free Trial: {timeStr} remaining
      <span style={{ opacity: 0.7, fontWeight: 400, paddingLeft: 2 }}>
        — Upgrade for full access
      </span>
    </div>
  );
}
