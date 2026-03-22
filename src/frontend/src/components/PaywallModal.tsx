import { Check, Copy, Crown } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const PLANS = [
  {
    id: "weekly",
    label: "Weekly",
    price: "₹830",
    amountNum: 830,
    per: "/ week",
    note: "~₹3,600/mo · Cancel anytime",
  },
  {
    id: "monthly",
    label: "Monthly",
    price: "₹2,499",
    amountNum: 2499,
    per: "/ month",
    note: "Most popular · Best value",
    popular: true,
  },
  {
    id: "yearly",
    label: "Yearly",
    price: "₹20,833",
    amountNum: 20833,
    per: "/ year",
    note: "~₹1,736/mo · Save 31%",
  },
];

const FEATURES = [
  "AI Assistant (Unlimited queries)",
  "All Platform Integrations",
  "Real-time Inventory Sync",
  "Advanced Analytics & Reports",
  "Unified Order Management",
  "Pricing Intelligence Engine",
  "Priority Support (24/7)",
  "Multi-platform Listings Manager",
];

const UPI_ID = "prashant.ps116-4@oksbi";

interface PaywallModalProps {
  onSubscribe: (plan: string) => void;
}

export default function PaywallModal({ onSubscribe }: PaywallModalProps) {
  const [selectedPlan, setSelectedPlan] = useState(PLANS[1]);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi://pay?pa=${encodeURIComponent(UPI_ID)}%26pn=SellerSync%20Pro%26am=${selectedPlan.amountNum}%26cu=INR%26tn=SellerSync%20Pro%20Subscription`;

  const copyUpiId = () => {
    navigator.clipboard.writeText(UPI_ID).then(() => {
      toast.success("UPI ID copied!");
    });
  };

  const handleSubscribe = (planId: string) => {
    toast.success(
      "After payment, send the screenshot to support to activate your subscription.",
    );
    onSubscribe(planId);
  };

  return (
    <div
      data-ocid="paywall.modal"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(5,6,10,0.94)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        padding: "20px",
        overflowY: "auto",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: "100%",
          maxWidth: 760,
          background: "linear-gradient(160deg, #0D0F17 0%, #090B11 100%)",
          border: "1px solid rgba(245,158,11,0.18)",
          borderRadius: 20,
          padding: "40px 36px 36px",
          boxShadow:
            "0 40px 120px rgba(0,0,0,0.85), 0 0 80px rgba(245,158,11,0.04)",
          marginTop: "auto",
          marginBottom: "auto",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 60,
              height: 60,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(217,119,6,0.1))",
              border: "1px solid rgba(245,158,11,0.25)",
              marginBottom: 18,
              boxShadow: "0 0 40px rgba(245,158,11,0.1)",
            }}
          >
            <Crown size={28} style={{ color: "#F59E0B" }} />
          </motion.div>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#F1F5F9",
              letterSpacing: "-0.6px",
              marginBottom: 8,
              fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
            }}
          >
            Unlock SellerSync Pro
          </h2>
          <p style={{ fontSize: 14, color: "#4A5B6E", margin: 0 }}>
            Your free trial has ended. Subscribe via UPI to continue.
          </p>
        </div>

        {/* Plan Selector Pills */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            marginBottom: 28,
            flexWrap: "wrap",
          }}
        >
          {PLANS.map((plan) => (
            <button
              key={plan.id}
              type="button"
              data-ocid={`paywall.${plan.id}_tab`}
              onClick={() => setSelectedPlan(plan)}
              style={{
                padding: "9px 22px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s",
                border:
                  selectedPlan.id === plan.id
                    ? "1px solid rgba(245,158,11,0.6)"
                    : "1px solid rgba(255,255,255,0.08)",
                background:
                  selectedPlan.id === plan.id
                    ? "rgba(245,158,11,0.12)"
                    : "rgba(255,255,255,0.03)",
                color: selectedPlan.id === plan.id ? "#F59E0B" : "#4A5B6E",
                display: "flex",
                alignItems: "center",
                gap: 7,
              }}
            >
              {plan.label}
              {plan.popular && (
                <span
                  style={{
                    fontSize: 9,
                    background: "linear-gradient(90deg,#F59E0B,#D97706)",
                    color: "#0A0800",
                    padding: "1px 6px",
                    borderRadius: 999,
                    fontWeight: 800,
                    letterSpacing: "0.06em",
                  }}
                >
                  POPULAR
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Main content: QR + info */}
        <motion.div
          key={selectedPlan.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{
            display: "flex",
            gap: 32,
            alignItems: "flex-start",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* QR Code */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 16,
              padding: 14,
              boxShadow:
                "0 0 0 1px rgba(245,158,11,0.2), 0 12px 40px rgba(0,0,0,0.5)",
              flexShrink: 0,
            }}
          >
            <img
              src={qrUrl}
              alt="UPI QR Code"
              width={200}
              height={200}
              style={{ display: "block", borderRadius: 6 }}
            />
          </div>

          {/* Right side */}
          <div
            style={{
              flex: 1,
              minWidth: 220,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {/* Amount */}
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: "#5A6E85",
                  fontWeight: 600,
                  marginBottom: 4,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Amount to Pay
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span
                  style={{
                    fontSize: 38,
                    fontWeight: 800,
                    color: "#F59E0B",
                    letterSpacing: "-1.5px",
                    fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
                  }}
                >
                  {selectedPlan.price}
                </span>
                <span style={{ fontSize: 13, color: "#4A5B6E" }}>
                  {selectedPlan.per}
                </span>
              </div>
              <div style={{ fontSize: 12, color: "#3D4F63", marginTop: 3 }}>
                {selectedPlan.note}
              </div>
            </div>

            {/* UPI ID */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "rgba(245,158,11,0.07)",
                border: "1px solid rgba(245,158,11,0.25)",
                borderRadius: 999,
                padding: "8px 16px 8px 20px",
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#F59E0B",
                  fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
                  letterSpacing: "0.02em",
                  flex: 1,
                }}
              >
                {UPI_ID}
              </span>
              <button
                type="button"
                data-ocid="paywall.copy_upi_button"
                onClick={copyUpiId}
                style={{
                  background: "rgba(245,158,11,0.15)",
                  border: "none",
                  borderRadius: "50%",
                  width: 28,
                  height: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#F59E0B",
                  transition: "background 0.15s",
                  flexShrink: 0,
                }}
              >
                <Copy size={13} />
              </button>
            </div>

            {/* Steps */}
            <div
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
                padding: "12px 16px",
              }}
            >
              <p
                style={{
                  fontSize: 12,
                  color: "#5A6E85",
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                <span style={{ color: "#7B8FA0", fontWeight: 600 }}>1.</span>{" "}
                Open GPay, PhonePe, or Paytm{" "}
                <span
                  style={{ color: "rgba(245,158,11,0.5)", margin: "0 3px" }}
                >
                  →
                </span>{" "}
                <span style={{ color: "#7B8FA0", fontWeight: 600 }}>2.</span>{" "}
                Scan QR or enter UPI ID{" "}
                <span
                  style={{ color: "rgba(245,158,11,0.5)", margin: "0 3px" }}
                >
                  →
                </span>{" "}
                <span style={{ color: "#7B8FA0", fontWeight: 600 }}>3.</span>{" "}
                Pay{" "}
                <span style={{ color: "#D1D9E6", fontWeight: 600 }}>
                  {selectedPlan.price}
                </span>{" "}
                <span
                  style={{ color: "rgba(245,158,11,0.5)", margin: "0 3px" }}
                >
                  →
                </span>{" "}
                <span style={{ color: "#7B8FA0", fontWeight: 600 }}>4.</span>{" "}
                Send screenshot to support
              </p>
            </div>

            {/* Features */}
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {FEATURES.slice(0, 5).map((feat) => (
                <div
                  key={feat}
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <div
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: "50%",
                      background: "rgba(245,158,11,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Check size={8} style={{ color: "#F59E0B" }} />
                  </div>
                  <span
                    style={{ fontSize: 12, color: "#4A5B6E", lineHeight: 1.3 }}
                  >
                    {feat}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              type="button"
              data-ocid="paywall.subscribe_button"
              onClick={() => handleSubscribe(selectedPlan.id)}
              className="btn-gold"
              style={{
                width: "100%",
                padding: "13px 0",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                letterSpacing: "0.02em",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              ✦ Subscribe {selectedPlan.label}
            </button>
          </div>
        </motion.div>

        <p
          style={{
            fontSize: 11,
            color: "#2A3547",
            marginTop: 20,
            textAlign: "center",
          }}
        >
          🔒 Manual verification · Instant activation on payment confirmation
        </p>
      </motion.div>
    </div>
  );
}
