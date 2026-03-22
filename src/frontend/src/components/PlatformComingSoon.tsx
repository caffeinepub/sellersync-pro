import { Bell, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface Platform {
  name: string;
  color: string;
  logo: string;
  launch: string;
}

const PLATFORM_INFO: Record<string, Platform> = {
  Flipkart: {
    name: "Flipkart",
    color: "#2874F0",
    logo: "F",
    launch: "Q2 2026",
  },
  Meesho: { name: "Meesho", color: "#9B1B7D", logo: "M", launch: "Q3 2026" },
  Alibaba: { name: "Alibaba", color: "#FF6A00", logo: "阿", launch: "Q2 2026" },
  IndiaMart: {
    name: "IndiaMart",
    color: "#0082CB",
    logo: "IM",
    launch: "Q3 2026",
  },
};

interface Props {
  platform: string | null;
  onClose: () => void;
}

export default function PlatformComingSoon({ platform, onClose }: Props) {
  const [email, setEmail] = useState("");
  const info = platform ? PLATFORM_INFO[platform] : null;

  if (!platform || !info) return null;

  const handleNotify = () => {
    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }
    toast.success(`We'll notify you when ${info.name} integration launches!`);
    setEmail("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
      role="presentation"
      onKeyDown={() => {}}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        style={{
          background: "#111820",
          border: "1px solid #2A3A4A",
          borderRadius: 16,
          maxWidth: 420,
          width: "94vw",
          padding: "28px",
          position: "relative",
        }}
        data-ocid="coming_soon.modal"
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 8,
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#5A6E85",
          }}
          data-ocid="coming_soon.close_button"
        >
          <X size={13} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: `${info.color}15`,
              border: `1px solid ${info.color}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 900,
              color: info.color,
              marginBottom: 16,
              fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
            }}
          >
            {info.logo}
          </div>

          <h2
            style={{
              color: "#EEF2F7",
              fontSize: 20,
              fontWeight: 800,
              margin: "0 0 4px",
            }}
          >
            {info.name} Integration
          </h2>

          <div
            style={{
              background: `${info.color}12`,
              border: `1px solid ${info.color}25`,
              borderRadius: 20,
              padding: "4px 14px",
              fontSize: 13,
              fontWeight: 700,
              color: info.color,
              marginBottom: 12,
              letterSpacing: "0.04em",
            }}
          >
            Coming Soon
          </div>

          <p
            style={{
              color: "#5A7A95",
              fontSize: 13,
              lineHeight: 1.6,
              margin: "0 0 6px",
            }}
          >
            Full {info.name} integration is in development. Expected launch:
          </p>
          <p
            style={{
              color: "#F59E0B",
              fontSize: 16,
              fontWeight: 700,
              margin: "0 0 20px",
            }}
          >
            {info.launch}
          </p>

          <p style={{ color: "#5A7A95", fontSize: 12, margin: "0 0 10px" }}>
            Get notified when it's available:
          </p>

          <div
            style={{ display: "flex", gap: 8, width: "100%", marginBottom: 16 }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNotify()}
              placeholder="your@email.com"
              style={{
                flex: 1,
                background: "#0F1922",
                border: "1px solid #243241",
                borderRadius: 8,
                padding: "8px 12px",
                fontSize: 13,
                color: "#EEF2F7",
                outline: "none",
              }}
              data-ocid="coming_soon.input"
            />
            <button
              type="button"
              onClick={handleNotify}
              style={{
                background: "rgba(245,158,11,0.12)",
                border: "1px solid rgba(245,158,11,0.3)",
                borderRadius: 8,
                padding: "8px 12px",
                color: "#F59E0B",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 12,
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
              data-ocid="coming_soon.primary_button"
            >
              <Bell size={12} /> Notify Me
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              width: "100%",
              padding: "9px",
              fontSize: 13,
              borderRadius: 10,
              background: "transparent",
              border: "1px solid #2A3A4A",
              color: "#5A6E85",
              cursor: "pointer",
            }}
            data-ocid="coming_soon.cancel_button"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
