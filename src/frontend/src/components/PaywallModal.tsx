import { Check, Copy, Crown, Loader2, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

const PLANS = [
  {
    id: "weekly",
    label: "Starter",
    period: "Weekly",
    price: "$9.99",
    per: "/ week",
    note: "~$43/mo · Cancel anytime",
    badge: null,
    tagline: "Perfect for getting started",
    highlight: false,
    features: 4,
  },
  {
    id: "monthly",
    label: "Professional",
    period: "Monthly",
    price: "$29.99",
    per: "/ month",
    note: "Most popular among growing sellers",
    badge: "Most Popular",
    tagline: "Everything you need to scale",
    highlight: true,
    features: 8,
  },
  {
    id: "yearly",
    label: "Enterprise",
    period: "Yearly",
    price: "$249.99",
    per: "/ year",
    note: "~$20.83/mo · Save 31%",
    badge: "Best ROI",
    tagline: "For serious multi-platform sellers",
    highlight: false,
    features: 8,
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
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi://pay?pa=${encodeURIComponent(UPI_ID)}%26pn=SellerSync%20Pro%26am=29.99%26cu=INR%26tn=SellerSync%20Pro%20Subscription`;

interface PaywallModalProps {
  onSubscribe: (plan: string) => void;
  defaultTab?: "plans" | "upi";
}

export default function PaywallModal({
  onSubscribe,
  defaultTab = "plans",
}: PaywallModalProps) {
  const { actor } = useActor();
  const [activeTab, setActiveTab] = useState<"plans" | "upi">(defaultTab);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handlePlanClick = async (planId: string) => {
    setCheckoutError(null);
    setLoadingPlan(planId);
    try {
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
      onSubscribe(planId);
    } catch (err) {
      console.error("Checkout error:", err);
      setCheckoutError("Payment service unavailable. Please try again.");
      onSubscribe(planId);
    } finally {
      setLoadingPlan(null);
    }
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(UPI_ID).then(() => {
      toast.success("UPI ID copied!");
    });
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
          maxWidth: 940,
          background: "linear-gradient(160deg, #0D0F17 0%, #090B11 100%)",
          border: "1px solid rgba(245,158,11,0.18)",
          borderRadius: 20,
          padding: "44px 40px 40px",
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
              fontSize: 28,
              fontWeight: 800,
              color: "#F1F5F9",
              letterSpacing: "-0.6px",
              marginBottom: 10,
              fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
            }}
          >
            Your Free Trial Has Ended
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "#5A6E85",
              maxWidth: 460,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Join{" "}
            <span style={{ color: "#F59E0B", fontWeight: 600 }}>
              10,000+ sellers
            </span>{" "}
            who scaled their business with SellerSync Pro
          </p>
        </div>

        {/* Tab switcher */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            marginBottom: 28,
          }}
        >
          {(
            [
              { id: "plans", label: "💳 Card / Subscription" },
              { id: "upi", label: "📱 Pay via UPI" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              data-ocid={`paywall.${tab.id}_tab`}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "8px 20px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                border:
                  activeTab === tab.id
                    ? "1px solid rgba(245,158,11,0.6)"
                    : "1px solid rgba(255,255,255,0.08)",
                background:
                  activeTab === tab.id
                    ? "rgba(245,158,11,0.1)"
                    : "rgba(255,255,255,0.03)",
                color: activeTab === tab.id ? "#F59E0B" : "#4A5B6E",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {checkoutError && (
          <div
            data-ocid="paywall.error_state"
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: 10,
              padding: "10px 16px",
              marginBottom: 24,
              textAlign: "center",
              fontSize: 13,
              color: "#FCA5A5",
            }}
          >
            {checkoutError}
          </div>
        )}

        {/* Plans Tab */}
        {activeTab === "plans" && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 14,
                marginBottom: 32,
              }}
            >
              {PLANS.map((plan, idx) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.06, duration: 0.35 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  style={{
                    position: "relative",
                    borderRadius: 16,
                    padding: plan.highlight
                      ? "28px 24px 24px"
                      : "24px 22px 22px",
                    background: plan.highlight
                      ? "linear-gradient(160deg, #17120A 0%, #0F0B05 100%)"
                      : "rgba(255,255,255,0.025)",
                    border: plan.highlight
                      ? "1px solid rgba(245,158,11,0.45)"
                      : "1px solid rgba(255,255,255,0.06)",
                    boxShadow: plan.highlight
                      ? "0 0 50px rgba(245,158,11,0.1), inset 0 1px 0 rgba(245,158,11,0.12)"
                      : "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 18,
                  }}
                >
                  {plan.badge && (
                    <div
                      style={{
                        position: "absolute",
                        top: -12,
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: plan.highlight
                          ? "linear-gradient(90deg, #F59E0B, #D97706)"
                          : "rgba(255,255,255,0.1)",
                        color: plan.highlight ? "#0A0800" : "#CBD5E1",
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "3px 12px",
                        borderRadius: 999,
                        letterSpacing: "0.07em",
                        whiteSpace: "nowrap",
                        textTransform: "uppercase",
                      }}
                    >
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: plan.highlight ? "#F59E0B" : "#3D4F63",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: 8,
                      }}
                    >
                      {plan.label}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 3,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 34,
                          fontWeight: 800,
                          color: plan.highlight ? "#F59E0B" : "#D1D9E6",
                          letterSpacing: "-1.5px",
                          fontFamily:
                            "'Bricolage Grotesque', system-ui, sans-serif",
                        }}
                      >
                        {plan.price}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          color: "#3D4F63",
                          marginBottom: 4,
                        }}
                      >
                        {plan.per}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: plan.highlight ? "#86EFAC" : "#3D4F63",
                        marginTop: 3,
                      }}
                    >
                      {plan.note}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#5A6E85",
                        marginTop: 6,
                      }}
                    >
                      {plan.tagline}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      flex: 1,
                    }}
                  >
                    {FEATURES.slice(0, plan.features).map((feat) => (
                      <div
                        key={feat}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <div
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: "50%",
                            background: plan.highlight
                              ? "rgba(245,158,11,0.15)"
                              : "rgba(255,255,255,0.05)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Check
                            size={9}
                            style={{
                              color: plan.highlight ? "#F59E0B" : "#4ADE80",
                            }}
                          />
                        </div>
                        <span
                          style={{
                            fontSize: 12,
                            color: plan.highlight ? "#B0BCC8" : "#4A5B6E",
                            lineHeight: 1.3,
                          }}
                        >
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
                    className={plan.highlight ? "btn-gold" : ""}
                    style={{
                      width: "100%",
                      padding: "12px 0",
                      borderRadius: 10,
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: loadingPlan !== null ? "not-allowed" : "pointer",
                      letterSpacing: "0.01em",
                      transition: "all 0.2s",
                      border: plan.highlight
                        ? "none"
                        : "1px solid rgba(255,255,255,0.1)",
                      background: plan.highlight
                        ? undefined
                        : "rgba(255,255,255,0.04)",
                      color: plan.highlight ? undefined : "#7B8FA0",
                      opacity:
                        loadingPlan !== null && loadingPlan !== plan.id
                          ? 0.45
                          : 1,
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
                        Get {plan.period} Access
                      </>
                    )}
                  </button>
                </motion.div>
              ))}
            </div>

            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 11.5, color: "#2A3547" }}>
                🔒 Secure payment · Cancel anytime · Instant access after
                payment
              </p>
            </div>
          </>
        )}

        {/* UPI Tab */}
        {activeTab === "upi" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              paddingBottom: 8,
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
              }}
            >
              <img
                src={QR_URL}
                alt="UPI QR Code"
                width={200}
                height={200}
                style={{ display: "block", borderRadius: 6 }}
              />
            </div>

            {/* UPI ID copyable pill */}
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
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#F59E0B",
                  fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
                  letterSpacing: "0.02em",
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
                }}
              >
                <Copy size={13} />
              </button>
            </div>

            {/* Amount note */}
            <p
              style={{
                fontSize: 13,
                color: "#5A6E85",
                textAlign: "center",
                lineHeight: 1.5,
              }}
            >
              Pay{" "}
              <span style={{ color: "#D1D9E6", fontWeight: 600 }}>₹2,499</span>{" "}
              / month or{" "}
              <span style={{ color: "#D1D9E6", fontWeight: 600 }}>₹830</span> /
              week
            </p>

            {/* Steps */}
            <div
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
                padding: "14px 18px",
                maxWidth: 420,
                width: "100%",
              }}
            >
              <p
                style={{
                  fontSize: 12,
                  color: "#5A6E85",
                  lineHeight: 1.7,
                  margin: 0,
                  textAlign: "center",
                }}
              >
                <span style={{ color: "#7B8FA0" }}>1.</span> Open any UPI app
                (GPay, PhonePe, Paytm){" "}
                <span
                  style={{
                    color: "rgba(245,158,11,0.5)",
                    margin: "0 4px",
                  }}
                >
                  →
                </span>{" "}
                <span style={{ color: "#7B8FA0" }}>2.</span> Scan QR or enter
                UPI ID{" "}
                <span
                  style={{
                    color: "rgba(245,158,11,0.5)",
                    margin: "0 4px",
                  }}
                >
                  →
                </span>{" "}
                <span style={{ color: "#7B8FA0" }}>3.</span> Enter amount & pay{" "}
                <span
                  style={{
                    color: "rgba(245,158,11,0.5)",
                    margin: "0 4px",
                  }}
                >
                  →
                </span>{" "}
                <span style={{ color: "#7B8FA0" }}>4.</span> Send screenshot to
                support to activate
              </p>
            </div>

            {/* Gold note */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(245,158,11,0.06)",
                border: "1px solid rgba(245,158,11,0.2)",
                borderRadius: 10,
                padding: "10px 16px",
                maxWidth: 420,
                width: "100%",
              }}
            >
              <span style={{ fontSize: 16 }}>✦</span>
              <p
                style={{
                  fontSize: 12,
                  color: "#F59E0B",
                  margin: 0,
                  fontWeight: 600,
                  lineHeight: 1.4,
                }}
              >
                After payment, contact us to activate your account
              </p>
            </div>

            <p style={{ fontSize: 11, color: "#2A3547", margin: 0 }}>
              🔒 Manual verification · Instant activation on confirmation
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
