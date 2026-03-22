import { Check, Crown, Loader2, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useActor } from "../hooks/useActor";

const PLANS = [
  {
    id: "weekly",
    label: "Weekly",
    price: "$9.99",
    per: "/ week",
    monthlyEq: "~$43/mo",
    badge: null,
    tagline: "Best for trying out",
    highlight: false,
  },
  {
    id: "monthly",
    label: "Monthly",
    price: "$29.99",
    per: "/ month",
    monthlyEq: null,
    badge: "Most Popular",
    tagline: "Best value for growing sellers",
    highlight: true,
  },
  {
    id: "yearly",
    label: "Yearly",
    price: "$249.99",
    per: "/ year",
    monthlyEq: "~$20.83/mo · Save 31%",
    badge: "Best ROI",
    tagline: "For serious sellers",
    highlight: false,
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

interface PaywallModalProps {
  onSubscribe: (plan: string) => void;
}

export default function PaywallModal({ onSubscribe }: PaywallModalProps) {
  const { actor } = useActor();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handlePlanClick = async (planId: string) => {
    setCheckoutError(null);
    setLoadingPlan(planId);

    try {
      // Try Stripe checkout via backend
      if (
        actor &&
        typeof (actor as any).createSubscriptionCheckout === "function"
      ) {
        const successUrl = `${window.location.origin}?payment=success&plan=${planId}`;
        const cancelUrl = `${window.location.origin}?payment=cancelled`;
        const url = await (actor as any).createSubscriptionCheckout(
          planId,
          successUrl,
          cancelUrl,
        );
        if (url && typeof url === "string") {
          window.location.href = url;
          return;
        }
      }
      // Fallback: direct subscribe (trial / demo mode)
      onSubscribe(planId);
    } catch (err) {
      console.error("Checkout error:", err);
      setCheckoutError("Payment service unavailable. Please try again.");
      // Fallback to direct subscribe so users aren't blocked
      onSubscribe(planId);
    } finally {
      setLoadingPlan(null);
    }
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
        background: "rgba(8,9,12,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        padding: "20px",
        overflowY: "auto",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: "100%",
          maxWidth: 900,
          background: "linear-gradient(160deg, #0F1117 0%, #0A0C12 100%)",
          border: "1px solid rgba(245,158,11,0.2)",
          borderRadius: 20,
          padding: "40px 36px 36px",
          boxShadow:
            "0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(245,158,11,0.08)",
          marginTop: "auto",
          marginBottom: "auto",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, rgba(245,158,11,0.25), rgba(217,119,6,0.15))",
              border: "1px solid rgba(245,158,11,0.3)",
              marginBottom: 16,
            }}
          >
            <Crown size={26} style={{ color: "#F59E0B" }} />
          </div>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#F1F5F9",
              letterSpacing: "-0.5px",
              marginBottom: 8,
              fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
            }}
          >
            Your Free Trial Has Ended
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "#94A3B8",
              maxWidth: 440,
              margin: "0 auto",
            }}
          >
            Join{" "}
            <span style={{ color: "#F59E0B", fontWeight: 600 }}>
              10,000+ sellers
            </span>{" "}
            who scaled their business with SellerSync Pro
          </p>
        </div>

        {/* Error message */}
        {checkoutError && (
          <div
            data-ocid="paywall.error_state"
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: 10,
              padding: "10px 16px",
              marginBottom: 20,
              textAlign: "center",
              fontSize: 13,
              color: "#FCA5A5",
            }}
          >
            {checkoutError}
          </div>
        )}

        {/* Plans */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginBottom: 28,
          }}
        >
          {PLANS.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ scale: 1.02, y: -3 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "relative",
                borderRadius: 14,
                padding: "24px 22px",
                background: plan.highlight
                  ? "linear-gradient(160deg, #1A1400 0%, #120E00 100%)"
                  : "rgba(255,255,255,0.03)",
                border: plan.highlight
                  ? "1px solid rgba(245,158,11,0.5)"
                  : "1px solid rgba(255,255,255,0.06)",
                boxShadow: plan.highlight
                  ? "0 0 30px rgba(245,158,11,0.08), inset 0 1px 0 rgba(245,158,11,0.15)"
                  : "none",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {plan.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: -11,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: plan.highlight
                      ? "linear-gradient(90deg, #F59E0B, #D97706)"
                      : "rgba(59,130,246,0.9)",
                    color: plan.highlight ? "#0A0800" : "white",
                    fontSize: 10.5,
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: 999,
                    letterSpacing: "0.05em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {plan.badge}
                </div>
              )}
              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: plan.highlight ? "#FCD34D" : "#94A3B8",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  {plan.label}
                </div>
                <div
                  style={{ display: "flex", alignItems: "baseline", gap: 4 }}
                >
                  <span
                    style={{
                      fontSize: 32,
                      fontWeight: 800,
                      color: plan.highlight ? "#F59E0B" : "#E2E8F0",
                      letterSpacing: "-1px",
                    }}
                  >
                    {plan.price}
                  </span>
                  <span style={{ fontSize: 13, color: "#64748B" }}>
                    {plan.per}
                  </span>
                </div>
                {plan.monthlyEq && (
                  <div
                    style={{
                      fontSize: 11,
                      color: plan.highlight ? "#86EFAC" : "#64748B",
                      marginTop: 2,
                    }}
                  >
                    {plan.monthlyEq}
                  </div>
                )}
                <div style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>
                  {plan.tagline}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 7,
                  flex: 1,
                }}
              >
                {FEATURES.slice(0, 5).map((feat) => (
                  <div
                    key={feat}
                    style={{ display: "flex", alignItems: "center", gap: 7 }}
                  >
                    <Check
                      size={13}
                      style={{
                        color: plan.highlight ? "#F59E0B" : "#3B82F6",
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: 12, color: "#94A3B8" }}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                data-ocid={`paywall.${plan.id}_button`}
                onClick={() => handlePlanClick(plan.id)}
                disabled={loadingPlan !== null}
                style={{
                  width: "100%",
                  padding: "11px 0",
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: 13.5,
                  cursor: loadingPlan !== null ? "not-allowed" : "pointer",
                  letterSpacing: "0.01em",
                  transition: "all 0.2s",
                  border: "none",
                  background: plan.highlight
                    ? "linear-gradient(135deg, #F59E0B, #D97706)"
                    : "rgba(59,130,246,0.15)",
                  color: plan.highlight ? "#0A0800" : "#93C5FD",
                  boxShadow: plan.highlight
                    ? "0 4px 16px rgba(245,158,11,0.3)"
                    : "none",
                  opacity:
                    loadingPlan !== null && loadingPlan !== plan.id ? 0.5 : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                {loadingPlan === plan.id ? (
                  <>
                    <Loader2
                      size={14}
                      style={{ animation: "spin 1s linear infinite" }}
                    />
                    Processing...
                  </>
                ) : (
                  <>
                    <Zap size={13} />
                    Start {plan.label} Plan
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 11.5, color: "#475569" }}>
            🔒 Secure payment via Stripe · Cancel anytime · Instant access
          </p>
        </div>
      </motion.div>
    </div>
  );
}
