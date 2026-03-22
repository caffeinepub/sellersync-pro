import {
  BarChart3,
  Bot,
  Check,
  ChevronRight,
  CreditCard,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

interface LandingPageProps {
  onEnter: () => void;
}

const features = [
  {
    icon: <LayoutDashboard size={22} />,
    title: "Unified Dashboard",
    description:
      "One command center for all your e-commerce platforms. Monitor KPIs, sales, and performance at a glance.",
    color: "#F59E0B",
  },
  {
    icon: <Bot size={22} />,
    title: "AI Automation",
    description:
      "Context-aware AI handles inventory checks, pricing adjustments, and shipping updates with your approval.",
    color: "#60A5FA",
  },
  {
    icon: <Package size={22} />,
    title: "Smart Inventory",
    description:
      "Real-time stock tracking across all channels with low-stock alerts and automated reorder suggestions.",
    color: "#4ADE80",
  },
  {
    icon: <ShoppingCart size={22} />,
    title: "Order Management",
    description:
      "Process, track, and fulfill orders from Amazon, Flipkart, Meesho, and more from a single queue.",
    color: "#A78BFA",
  },
  {
    icon: <BarChart3 size={22} />,
    title: "Analytics & Insights",
    description:
      "Deep revenue analytics, profit margins, and growth trends visualized in stunning real-time charts.",
    color: "#FB923C",
  },
  {
    icon: <CreditCard size={22} />,
    title: "UPI Payments",
    description:
      "Seamless subscription management with UPI/QR payment support built directly into the platform.",
    color: "#34D399",
  },
];

const platforms = [
  { name: "Amazon", emoji: "🛒" },
  { name: "Flipkart", emoji: "📦" },
  { name: "Meesho", emoji: "🛍️" },
  { name: "Alibaba", emoji: "🌏" },
  { name: "IndiaMart", emoji: "🏭" },
];

const plans = [
  {
    id: "weekly",
    name: "Starter",
    price: "$9.99",
    priceNote: "per week",
    popular: false,
    savings: null as string | null,
    features: [
      "All 5 platforms",
      "AI Chat assistant",
      "Basic analytics",
      "Order management",
      "Email support",
    ],
  },
  {
    id: "monthly",
    name: "Professional",
    price: "$29.99",
    priceNote: "per month",
    popular: true,
    savings: "Save 25%" as string | null,
    features: [
      "Everything in Starter",
      "Advanced AI automation",
      "Full analytics suite",
      "Smart inventory alerts",
      "Priority support",
      "Marketing tools",
    ],
  },
  {
    id: "yearly",
    name: "Enterprise",
    price: "$249.99",
    priceNote: "per year",
    popular: false,
    savings: "Save 58%" as string | null,
    features: [
      "Everything in Professional",
      "Unlimited AI actions",
      "Custom integrations",
      "White-label option",
      "Dedicated account manager",
      "SLA guarantee",
    ],
  },
];

const barHeights = [
  { id: "b-jan", h: 40 },
  { id: "b-feb", h: 65 },
  { id: "b-mar", h: 48 },
  { id: "b-apr", h: 72 },
  { id: "b-may", h: 58 },
  { id: "b-jun", h: 84 },
  { id: "b-jul", h: 70 },
  { id: "b-aug", h: 90 },
  { id: "b-sep", h: 75 },
  { id: "b-oct", h: 95 },
  { id: "b-nov", h: 82 },
  { id: "b-dec", h: 100 },
];
const sidebarItems = [
  { id: "s-home", color: "#F59E0B" },
  { id: "s-orders", color: "#2A3547" },
  { id: "s-inventory", color: "#2A3547" },
  { id: "s-analytics", color: "#2A3547" },
  { id: "s-settings", color: "#2A3547" },
];
const macDots = ["#FF5F57", "#FEBC2E", "#28C840"];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.1,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export default function LandingPage({ onEnter }: LandingPageProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        background: "#08090E",
        minHeight: "100vh",
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        color: "#E2E8F0",
        overflowX: "hidden",
      }}
    >
      {/* ── NAVBAR ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(8,9,14,0.85)",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(245,158,11,0.08)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 24px",
            height: 64,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flex: "0 0 auto",
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: "linear-gradient(135deg, #F59E0B, #D97706)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 16px rgba(245,158,11,0.35)",
              }}
            >
              <Bot size={17} color="#0A0800" />
            </div>
            <span
              style={{
                fontWeight: 800,
                fontSize: 17,
                color: "#F1F5F9",
                letterSpacing: "-0.5px",
                fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
              }}
            >
              SellerSync
            </span>
            <span
              style={{
                fontSize: 10,
                color: "#0A0800",
                fontWeight: 700,
                background: "linear-gradient(135deg, #F59E0B, #D97706)",
                padding: "2px 8px",
                borderRadius: 999,
                letterSpacing: "0.06em",
              }}
            >
              PRO
            </span>
          </div>

          <div style={{ flex: 1 }} />

          {/* Nav links */}
          <nav style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button
              type="button"
              data-ocid="landing.features_link"
              onClick={() => scrollTo("features")}
              style={{
                background: "none",
                border: "none",
                color: "#94A3B8",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                padding: "8px 14px",
                borderRadius: 8,
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#F1F5F9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#94A3B8";
              }}
            >
              Features
            </button>
            <button
              type="button"
              data-ocid="landing.pricing_link"
              onClick={() => scrollTo("pricing")}
              style={{
                background: "none",
                border: "none",
                color: "#94A3B8",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                padding: "8px 14px",
                borderRadius: 8,
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#F1F5F9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#94A3B8";
              }}
            >
              Pricing
            </button>
            <button
              type="button"
              data-ocid="landing.nav_trial_button"
              onClick={onEnter}
              className="btn-gold"
              style={{
                padding: "8px 20px",
                borderRadius: 10,
                fontSize: 13.5,
                fontWeight: 700,
                letterSpacing: "0.01em",
                marginLeft: 8,
              }}
            >
              Start Free Trial
            </button>
          </nav>
        </div>
      </header>

      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          paddingTop: 100,
          paddingBottom: 80,
        }}
      >
        {/* Background glow orbs */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: "50%",
            transform: "translateX(-50%)",
            width: 800,
            height: 500,
            background:
              "radial-gradient(ellipse at center, rgba(245,158,11,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 200,
            right: -200,
            width: 500,
            height: 500,
            background:
              "radial-gradient(ellipse at center, rgba(96,165,250,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 24px",
            textAlign: "center",
            position: "relative",
          }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(245,158,11,0.08)",
              border: "1px solid rgba(245,158,11,0.2)",
              borderRadius: 999,
              padding: "6px 16px",
              fontSize: 12.5,
              color: "#F59E0B",
              fontWeight: 600,
              letterSpacing: "0.03em",
              marginBottom: 32,
            }}
          >
            <Sparkles size={13} />
            AI-POWERED E-COMMERCE COMMAND CENTER
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-2px",
              color: "#F1F5F9",
              maxWidth: 860,
              margin: "0 auto 24px",
            }}
          >
            Sell More.{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #F59E0B, #FCD34D, #D97706)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Manage Less.
            </span>
            <br />
            One Platform to Rule Them All.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "#64748B",
              lineHeight: 1.7,
              maxWidth: 600,
              margin: "0 auto 40px",
            }}
          >
            Unify Amazon, Flipkart, Meesho, Alibaba &amp; IndiaMart into one
            AI-powered dashboard. Automate operations, track analytics, and grow
            revenue — all in one place.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              data-ocid="landing.hero_trial_button"
              onClick={onEnter}
              className="btn-gold"
              style={{
                padding: "14px 32px",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 8,
                letterSpacing: "0.01em",
              }}
            >
              Start Free Trial <ChevronRight size={16} />
            </button>
            <button
              type="button"
              data-ocid="landing.hero_demo_button"
              onClick={onEnter}
              style={{
                padding: "14px 32px",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 600,
                background: "transparent",
                border: "1px solid rgba(245,158,11,0.25)",
                color: "#94A3B8",
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(245,158,11,0.5)";
                e.currentTarget.style.color = "#E2E8F0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(245,158,11,0.25)";
                e.currentTarget.style.color = "#94A3B8";
              }}
            >
              <Zap size={15} /> View Demo
            </button>
          </motion.div>

          {/* Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              marginTop: 64,
              position: "relative",
              maxWidth: 900,
              margin: "64px auto 0",
            }}
          >
            {/* Glow under mockup */}
            <div
              style={{
                position: "absolute",
                bottom: -40,
                left: "50%",
                transform: "translateX(-50%)",
                width: "80%",
                height: 80,
                background: "rgba(245,158,11,0.12)",
                filter: "blur(40px)",
                borderRadius: "50%",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                background: "#0F1117",
                border: "1px solid rgba(245,158,11,0.15)",
                borderRadius: 18,
                overflow: "hidden",
                boxShadow:
                  "0 0 0 1px rgba(245,158,11,0.08), 0 40px 80px rgba(0,0,0,0.7), 0 0 60px rgba(245,158,11,0.06)",
              }}
            >
              {/* Mock header bar */}
              <div
                style={{
                  background: "#08090E",
                  borderBottom: "1px solid rgba(245,158,11,0.08)",
                  padding: "10px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div style={{ display: "flex", gap: 6 }}>
                  {macDots.map((c) => (
                    <div
                      key={c}
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: c,
                      }}
                    />
                  ))}
                </div>
                <div
                  style={{
                    flex: 1,
                    height: 22,
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: 6,
                    maxWidth: 240,
                    margin: "0 auto",
                  }}
                />
              </div>

              {/* Mock content */}
              <div style={{ display: "flex", height: 340 }}>
                {/* Sidebar mock */}
                <div
                  style={{
                    width: 52,
                    background: "#08090E",
                    borderRight: "1px solid rgba(245,158,11,0.06)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: 12,
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "linear-gradient(135deg, #F59E0B, #D97706)",
                      marginBottom: 8,
                    }}
                  />
                  {sidebarItems.map((item, i) => (
                    <div
                      key={item.id}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 9,
                        background:
                          i === 0
                            ? "rgba(245,158,11,0.15)"
                            : "rgba(255,255,255,0.03)",
                        border:
                          i === 0
                            ? "1px solid rgba(245,158,11,0.3)"
                            : "1px solid transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 16,
                          height: 3,
                          borderRadius: 2,
                          background: i === 0 ? item.color : "#2A3547",
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Main content mock */}
                <div style={{ flex: 1, padding: 16, overflow: "hidden" }}>
                  {/* KPI row */}
                  <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                    {[
                      {
                        label: "Revenue",
                        value: "₹2.4L",
                        color: "#F59E0B",
                        trend: "+18%",
                      },
                      {
                        label: "Orders",
                        value: "1,284",
                        color: "#60A5FA",
                        trend: "+12%",
                      },
                      {
                        label: "Inventory",
                        value: "8,421",
                        color: "#4ADE80",
                        trend: "+5%",
                      },
                      {
                        label: "Profit",
                        value: "₹68K",
                        color: "#A78BFA",
                        trend: "+22%",
                      },
                    ].map((kpi) => (
                      <div
                        key={kpi.label}
                        style={{
                          flex: 1,
                          background: "#111420",
                          border: "1px solid rgba(255,255,255,0.06)",
                          borderRadius: 10,
                          padding: "10px 12px",
                          borderTop: `3px solid ${kpi.color}`,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 10,
                            color: "#3D4F63",
                            marginBottom: 4,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {kpi.label}
                        </div>
                        <div
                          style={{
                            fontSize: 16,
                            fontWeight: 700,
                            color: "#E2E8F0",
                            fontFamily: "'Bricolage Grotesque', sans-serif",
                          }}
                        >
                          {kpi.value}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            color: kpi.color,
                            marginTop: 2,
                          }}
                        >
                          {kpi.trend}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chart row */}
                  <div style={{ display: "flex", gap: 10 }}>
                    {/* Bar chart mock */}
                    <div
                      style={{
                        flex: 2,
                        background: "#111420",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: 10,
                        padding: 12,
                        height: 170,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 11,
                          color: "#94A3B8",
                          fontWeight: 600,
                          marginBottom: 12,
                        }}
                      >
                        Revenue Trend
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: 5,
                          flex: 1,
                          paddingBottom: 4,
                        }}
                      >
                        {barHeights.map((bar, i) => (
                          <div
                            key={bar.id}
                            style={{
                              flex: 1,
                              height: `${bar.h}%`,
                              background:
                                i === 11
                                  ? "linear-gradient(180deg, #F59E0B, #D97706)"
                                  : "rgba(245,158,11,0.15)",
                              borderRadius: "3px 3px 0 0",
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Platform list mock */}
                    <div
                      style={{
                        flex: 1,
                        background: "#111420",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: 10,
                        padding: 12,
                        height: 170,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 11,
                          color: "#94A3B8",
                          fontWeight: 600,
                          marginBottom: 10,
                        }}
                      >
                        Platforms
                      </div>
                      {[
                        { name: "Amazon", pct: 42, color: "#FB923C" },
                        { name: "Flipkart", pct: 28, color: "#60A5FA" },
                        { name: "Meesho", pct: 18, color: "#F472B6" },
                        { name: "Others", pct: 12, color: "#4ADE80" },
                      ].map((p) => (
                        <div key={p.name} style={{ marginBottom: 7 }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              fontSize: 10,
                              color: "#64748B",
                              marginBottom: 3,
                            }}
                          >
                            <span>{p.name}</span>
                            <span>{p.pct}%</span>
                          </div>
                          <div
                            style={{
                              height: 4,
                              background: "rgba(255,255,255,0.06)",
                              borderRadius: 2,
                            }}
                          >
                            <div
                              style={{
                                width: `${p.pct}%`,
                                height: "100%",
                                background: p.color,
                                borderRadius: 2,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PLATFORMS ROW ── */}
      <section style={{ padding: "60px 24px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              fontSize: 12,
              color: "#3D4F63",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: 20,
            }}
          >
            Works seamlessly with
          </motion.p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {platforms.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#0F1117",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 999,
                  padding: "8px 18px",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#CBD5E1",
                }}
              >
                <span style={{ fontSize: 16 }}>{p.emoji}</span>
                {p.name}
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: platforms.length * 0.07 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(245,158,11,0.06)",
                border: "1px solid rgba(245,158,11,0.15)",
                borderRadius: 999,
                padding: "8px 18px",
                fontSize: 13,
                fontWeight: 600,
                color: "#F59E0B",
              }}
            >
              <TrendingUp size={13} /> +more coming soon
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: 56 }}
          >
            <p
              style={{
                fontSize: 11.5,
                color: "#F59E0B",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              Everything you need
            </p>
            <h2
              style={{
                fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 800,
                color: "#F1F5F9",
                letterSpacing: "-1px",
                lineHeight: 1.15,
                marginBottom: 16,
              }}
            >
              Built for serious sellers
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "#64748B",
                maxWidth: 520,
                margin: "0 auto",
                lineHeight: 1.65,
              }}
            >
              Every feature designed to save you time, increase revenue, and
              give you full visibility into your business.
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 18,
            }}
          >
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                data-ocid={`landing.feature.${i + 1}`}
                style={{
                  background: "#0F1117",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 16,
                  padding: "26px 24px",
                  transition:
                    "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
                  cursor: "default",
                }}
                whileHover={{
                  y: -4,
                  boxShadow:
                    "0 0 30px rgba(0,0,0,0.4), 0 0 0 1px rgba(245,158,11,0.12)",
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 12,
                    background: `rgba(${feat.color
                      .slice(1)
                      .match(/.{2}/g)
                      ?.map((x) => Number.parseInt(x, 16))
                      .join(",")},0.1)`,
                    border: `1px solid rgba(${feat.color
                      .slice(1)
                      .match(/.{2}/g)
                      ?.map((x) => Number.parseInt(x, 16))
                      .join(",")},0.2)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: feat.color,
                    marginBottom: 16,
                  }}
                >
                  {feat.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
                    fontSize: 17,
                    fontWeight: 700,
                    color: "#F1F5F9",
                    marginBottom: 8,
                    letterSpacing: "-0.3px",
                  }}
                >
                  {feat.title}
                </h3>
                <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.65 }}>
                  {feat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ padding: "80px 24px 100px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: 56 }}
          >
            <p
              style={{
                fontSize: 11.5,
                color: "#F59E0B",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              Simple pricing
            </p>
            <h2
              style={{
                fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 800,
                color: "#F1F5F9",
                letterSpacing: "-1px",
                marginBottom: 16,
              }}
            >
              Start free. Scale with confidence.
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "#64748B",
                maxWidth: 480,
                margin: "0 auto",
              }}
            >
              10-minute free trial included on all plans. No credit card
              required to start.
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 18,
              alignItems: "start",
            }}
          >
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                data-ocid={`landing.pricing.${plan.id}_card`}
                style={{
                  position: "relative",
                  background: plan.popular ? "#0F1117" : "#0B0D14",
                  border: plan.popular
                    ? "1px solid rgba(245,158,11,0.35)"
                    : "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 18,
                  padding: "30px 26px",
                  boxShadow: plan.popular
                    ? "0 0 40px rgba(245,158,11,0.08)"
                    : "none",
                }}
              >
                {plan.popular && (
                  <div
                    style={{
                      position: "absolute",
                      top: -14,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "linear-gradient(135deg, #F59E0B, #D97706)",
                      color: "#0A0800",
                      fontSize: 11,
                      fontWeight: 800,
                      padding: "4px 16px",
                      borderRadius: 999,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}
                  >
                    ✦ Most Popular
                  </div>
                )}

                <div style={{ marginBottom: 24 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 6,
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "'Bricolage Grotesque', system-ui, sans-serif",
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#F1F5F9",
                      }}
                    >
                      {plan.name}
                    </span>
                    {plan.savings && (
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#4ADE80",
                          background: "rgba(74,222,128,0.1)",
                          border: "1px solid rgba(74,222,128,0.2)",
                          padding: "3px 10px",
                          borderRadius: 999,
                        }}
                      >
                        {plan.savings}
                      </span>
                    )}
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "baseline", gap: 4 }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "'Bricolage Grotesque', system-ui, sans-serif",
                        fontSize: 40,
                        fontWeight: 800,
                        color: plan.popular ? "#F59E0B" : "#E2E8F0",
                        letterSpacing: "-2px",
                      }}
                    >
                      {plan.price}
                    </span>
                    <span style={{ fontSize: 13, color: "#3D4F63" }}>
                      {plan.priceNote}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    paddingTop: 20,
                    marginBottom: 24,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {plan.features.map((feat) => (
                    <div
                      key={feat}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontSize: 14,
                        color: "#94A3B8",
                      }}
                    >
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: plan.popular
                            ? "rgba(245,158,11,0.15)"
                            : "rgba(74,222,128,0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Check
                          size={11}
                          color={plan.popular ? "#F59E0B" : "#4ADE80"}
                          strokeWidth={3}
                        />
                      </div>
                      {feat}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  data-ocid={`landing.pricing.${plan.id}_button`}
                  onClick={onEnter}
                  className={plan.popular ? "btn-gold" : undefined}
                  style={{
                    width: "100%",
                    padding: "13px",
                    borderRadius: 12,
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    ...(!plan.popular && {
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#94A3B8",
                      transition: "border-color 0.2s, color 0.2s",
                    }),
                  }}
                  onMouseEnter={
                    !plan.popular
                      ? (e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(245,158,11,0.3)";
                          e.currentTarget.style.color = "#E2E8F0";
                        }
                      : undefined
                  }
                  onMouseLeave={
                    !plan.popular
                      ? (e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.1)";
                          e.currentTarget.style.color = "#94A3B8";
                        }
                      : undefined
                  }
                >
                  Get Started →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "40px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "linear-gradient(135deg, #F59E0B, #D97706)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Bot size={14} color="#0A0800" />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#F1F5F9",
                }}
              >
                SellerSync Pro
              </div>
              <div style={{ fontSize: 11, color: "#2A3547" }}>
                AI-Powered E-Commerce Command Center
              </div>
            </div>
          </div>

          <div style={{ fontSize: 12, color: "#2A3547", textAlign: "center" }}>
            © {new Date().getFullYear()} SellerSync Pro · Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#D97706", textDecoration: "none" }}
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
