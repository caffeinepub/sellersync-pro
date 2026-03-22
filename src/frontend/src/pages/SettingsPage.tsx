import {
  AlertTriangle,
  Bell,
  CheckCircle,
  CreditCard,
  Eye,
  EyeOff,
  Link,
  Lock,
  Shield,
  User,
  XCircle,
  Zap,
} from "lucide-react";
import { useState } from "react";
import {
  permissions as defaultPerms,
  platforms as defaultPlatforms,
} from "../data/mockData";
import { useActor } from "../hooks/useActor";

type TabId =
  | "account"
  | "stripe"
  | "ai"
  | "notifications"
  | "platforms"
  | "security";

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "account", label: "Account", icon: <User size={14} /> },
  { id: "stripe", label: "Payments", icon: <CreditCard size={14} /> },
  { id: "ai", label: "AI Perms", icon: <Zap size={14} /> },
  { id: "notifications", label: "Alerts", icon: <Bell size={14} /> },
  { id: "platforms", label: "Platforms", icon: <Link size={14} /> },
  { id: "security", label: "Security", icon: <Lock size={14} /> },
];

const PLATFORM_COLORS: Record<string, string> = {
  Amazon: "#FF9900",
  Flipkart: "#2874F0",
  Meesho: "#F43397",
  Alibaba: "#FF6A00",
  IndiaMart: "#00A651",
};

const inp: React.CSSProperties = {
  background: "#0F1922",
  border: "1px solid #243241",
  color: "#E8EEF5",
  borderRadius: 6,
  padding: "6px 10px",
  fontSize: 13,
  width: "100%",
  outline: "none",
  boxSizing: "border-box",
};
const lbl: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: "#7B8FA0",
  marginBottom: 3,
  display: "block",
};
const card: React.CSSProperties = {
  background: "#161F28",
  border: "1px solid #243241",
  borderRadius: 10,
  padding: "14px 16px",
  marginBottom: 12,
};
const sh: React.CSSProperties = {
  fontSize: 13.5,
  fontWeight: 700,
  color: "#E8EEF5",
  marginBottom: 10,
};

function Btn({
  children,
  onClick,
  outline,
  style,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  outline?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        background: outline
          ? "transparent"
          : "linear-gradient(135deg,#F59E0B,#D97706)",
        color: outline ? "#F59E0B" : "#0A0C12",
        fontWeight: 700,
        fontSize: 12,
        padding: "6px 14px",
        borderRadius: 6,
        border: outline ? "1px solid #F59E0B" : "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.55 : 1,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function Toggle({
  checked,
  onChange,
}: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      style={{
        width: 38,
        height: 20,
        background: checked ? "#F59E0B" : "#243241",
        borderRadius: 999,
        border: "none",
        cursor: "pointer",
        position: "relative",
        transition: "background 0.2s",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          width: 14,
          height: 14,
          background: "white",
          borderRadius: "50%",
          top: 3,
          left: checked ? 21 : 3,
          transition: "left 0.2s",
        }}
      />
    </button>
  );
}

function AccountTab() {
  const [form, setForm] = useState({
    businessName: "SellerSync Enterprises",
    ownerName: "Arjun Mehta",
    email: "admin@sellersync.in",
    phone: "+91 98765 43210",
    gst: "27AABCU9603R1ZM",
    businessType: "retailer",
  });
  const [saved, setSaved] = useState(false);
  const upd =
    (k: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={card}>
      <p style={sh}>Business Information</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {(
          [
            ["Business Name", "businessName", "text"],
            ["Owner Name", "ownerName", "text"],
            ["Email", "email", "email"],
            ["Phone", "phone", "text"],
            ["GST Number", "gst", "text"],
          ] as [string, keyof typeof form, string][]
        ).map(([label, key, type]) => (
          <div key={key}>
            <span style={lbl}>{label}</span>
            <input
              style={inp}
              type={type}
              value={form[key]}
              onChange={upd(key)}
            />
          </div>
        ))}
        <div>
          <span style={lbl}>Business Type</span>
          <select
            style={{ ...inp, cursor: "pointer" }}
            value={form.businessType}
            onChange={upd("businessType")}
          >
            {[
              "retailer",
              "wholesaler",
              "manufacturer",
              "distributor",
              "dropshipper",
            ].map((v) => (
              <option key={v} value={v}>
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div
        style={{
          marginTop: 12,
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Btn onClick={handleSave}>Save Changes</Btn>
        {saved && (
          <span
            style={{
              fontSize: 12,
              color: "#2ECC71",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <CheckCircle size={12} /> Saved
          </span>
        )}
      </div>
    </div>
  );
}

function StripeTab() {
  const { actor: _actor } = useActor();
  const actor = _actor as any;
  const [keys, setKeys] = useState({
    secret: "",
    publishable: "",
    webhook: "",
  });
  const [showSecret, setShowSecret] = useState(false);
  const [showWebhook, setShowWebhook] = useState(false);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [testStatus, setTestStatus] = useState<
    "idle" | "testing" | "ok" | "fail"
  >("idle");

  const busy = saveStatus === "saving" || testStatus === "testing";

  const handleSave = async () => {
    if (!actor || !keys.secret) return;
    setSaveStatus("saving");
    try {
      await actor.setStripeKey(keys.secret);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
    } catch {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 2500);
    }
  };

  const handleTest = async () => {
    if (!actor || !keys.secret) return;
    setTestStatus("testing");
    try {
      await actor.setStripeKey(keys.secret);
      const result = await actor.createSubscriptionCheckout(
        "monthly",
        `${window.location.origin}?payment=success`,
        `${window.location.origin}?payment=cancelled`,
      );
      setTestStatus(result.startsWith("https://") ? "ok" : "fail");
    } catch {
      setTestStatus("fail");
    }
    setTimeout(() => setTestStatus("idle"), 4000);
  };

  return (
    <div>
      <div style={card}>
        <p style={sh}>Stripe Configuration</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {(["secret", "webhook"] as const).map((k) => (
            <div key={k}>
              <span style={lbl}>
                {k === "secret" ? "Secret Key" : "Webhook Secret"}
              </span>
              <div style={{ position: "relative" }}>
                <input
                  data-ocid={
                    k === "secret"
                      ? "stripe.secret.input"
                      : "stripe.webhook.input"
                  }
                  style={{ ...inp, paddingRight: 36 }}
                  type={
                    k === "secret"
                      ? showSecret
                        ? "text"
                        : "password"
                      : showWebhook
                        ? "text"
                        : "password"
                  }
                  placeholder={
                    k === "secret" ? "sk_live_... or sk_test_..." : "whsec_..."
                  }
                  value={keys[k]}
                  onChange={(e) =>
                    setKeys((prev) => ({ ...prev, [k]: e.target.value }))
                  }
                />
                <button
                  type="button"
                  onClick={() =>
                    k === "secret"
                      ? setShowSecret((v) => !v)
                      : setShowWebhook((v) => !v)
                  }
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#7B8FA0",
                  }}
                >
                  {(k === "secret" ? showSecret : showWebhook) ? (
                    <EyeOff size={13} />
                  ) : (
                    <Eye size={13} />
                  )}
                </button>
              </div>
            </div>
          ))}
          <div>
            <span style={lbl}>Publishable Key</span>
            <input
              data-ocid="stripe.publishable.input"
              style={inp}
              placeholder="pk_live_... or pk_test_..."
              value={keys.publishable}
              onChange={(e) =>
                setKeys((k) => ({ ...k, publishable: e.target.value }))
              }
            />
          </div>
        </div>
        <div
          style={{
            marginTop: 10,
            display: "flex",
            gap: 8,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Btn onClick={handleTest} disabled={busy || !keys.secret}>
            {testStatus === "testing" ? "Testing..." : "Test Connection"}
          </Btn>
          <Btn outline onClick={handleSave} disabled={busy || !keys.secret}>
            {saveStatus === "saving" ? "Saving..." : "Save Keys"}
          </Btn>
          {saveStatus === "saved" && (
            <span
              style={{
                fontSize: 12,
                color: "#2ECC71",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <CheckCircle size={12} /> Saved
            </span>
          )}
          {saveStatus === "error" && (
            <span
              style={{
                fontSize: 12,
                color: "#EB5757",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <XCircle size={12} /> Error saving key
            </span>
          )}
          {testStatus === "ok" && (
            <span
              style={{
                fontSize: 12,
                color: "#2ECC71",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <CheckCircle size={12} /> Connected
            </span>
          )}
          {testStatus === "fail" && (
            <span
              style={{
                fontSize: 12,
                color: "#EB5757",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <XCircle size={12} /> Invalid key
            </span>
          )}
        </div>
      </div>
      <div style={card}>
        <p style={sh}>Current Subscription</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              background: "#F59E0B18",
              border: "1px solid #F59E0B44",
              borderRadius: 8,
              padding: "10px 16px",
              minWidth: 150,
            }}
          >
            <div style={{ fontSize: 10, color: "#F59E0B", fontWeight: 700 }}>
              ACTIVE PLAN
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#E8EEF5" }}>
              Monthly
            </div>
            <div style={{ fontSize: 12, color: "#9AA9B8" }}>$29.99 / month</div>
          </div>
          <div
            style={{ flex: 1, fontSize: 12, color: "#7B8FA0", lineHeight: 1.7 }}
          >
            Next billing:{" "}
            <span style={{ color: "#E8EEF5", fontWeight: 600 }}>
              April 22, 2026
            </span>
            <br />
            Status:{" "}
            <span style={{ color: "#2ECC71", fontWeight: 600 }}>Active</span>
          </div>
          <Btn outline>Manage Billing</Btn>
        </div>
      </div>
      <div
        style={{
          background: "#F59E0B0D",
          border: "1px solid #F59E0B33",
          borderRadius: 8,
          padding: "10px 14px",
          display: "flex",
          gap: 10,
          alignItems: "flex-start",
        }}
      >
        <AlertTriangle
          size={14}
          style={{ color: "#F59E0B", flexShrink: 0, marginTop: 1 }}
        />
        <p style={{ fontSize: 12, color: "#D4A017", margin: 0 }}>
          Use <strong>sk_test_</strong> keys for testing and{" "}
          <strong>sk_live_</strong> for production.
        </p>
      </div>
    </div>
  );
}

function AITab() {
  const [perms, setPerms] = useState(defaultPerms);
  const toggle = (id: string) =>
    setPerms((prev) =>
      prev.map((p) => (p.id === id ? { ...p, granted: !p.granted } : p)),
    );
  const riskColor = (r: string) =>
    r === "high" ? "#EB5757" : r === "medium" ? "#F2C94C" : "#2ECC71";

  return (
    <div style={card}>
      <p style={sh}>AI Assistant Permissions</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
          gap: 8,
        }}
      >
        {perms.map((p) => (
          <div
            key={p.id}
            style={{
              background: "#0F1922",
              border: "1px solid #1E2D3D",
              borderRadius: 8,
              padding: "10px 12px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  flexWrap: "wrap",
                  marginBottom: 2,
                }}
              >
                <span
                  style={{ fontWeight: 600, fontSize: 12.5, color: "#E8EEF5" }}
                >
                  {p.label}
                </span>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: riskColor(p.risk),
                    background: `${riskColor(p.risk)}18`,
                    padding: "1px 5px",
                    borderRadius: 999,
                  }}
                >
                  {p.risk.toUpperCase()}
                </span>
              </div>
              <span style={{ fontSize: 11.5, color: "#7B8FA0" }}>
                {p.description}
              </span>
            </div>
            <Toggle checked={p.granted} onChange={() => toggle(p.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationsTab() {
  const notifs = [
    {
      id: "email",
      label: "Email Alerts",
      desc: "Updates and summaries via email",
    },
    { id: "lowstock", label: "Low Stock", desc: "Inventory below threshold" },
    {
      id: "orders",
      label: "Order Notifications",
      desc: "Real-time order alerts",
    },
    {
      id: "revenue",
      label: "Revenue Milestones",
      desc: "₹1L, ₹5L, ₹10L day alerts",
    },
    { id: "sync", label: "Sync Errors", desc: "Platform sync failure alerts" },
  ];
  const [states, setStates] = useState<Record<string, boolean>>({
    email: true,
    lowstock: true,
    orders: true,
    revenue: false,
    sync: true,
  });

  return (
    <div style={card}>
      <p style={sh}>Notification Preferences</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {notifs.map((n, i) => (
          <div
            key={n.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "9px 0",
              borderBottom:
                i < notifs.length - 1 ? "1px solid #1E2D3D" : "none",
              gap: 12,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#E8EEF5",
                  marginBottom: 1,
                }}
              >
                {n.label}
              </div>
              <div style={{ fontSize: 11.5, color: "#7B8FA0" }}>{n.desc}</div>
            </div>
            <Toggle
              checked={!!states[n.id]}
              onChange={() => setStates((s) => ({ ...s, [n.id]: !s[n.id] }))}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function PlatformsTab() {
  const [platformStates, setPlatformStates] = useState(
    defaultPlatforms.map((p) => ({ ...p })),
  );
  const badge = (status: string) => {
    const m: Record<string, [string, string]> = {
      connected: ["#2ECC7122", "#2ECC71"],
      error: ["#EB575722", "#EB5757"],
      pending: ["#F59E0B22", "#F59E0B"],
      disconnected: ["#243241", "#7B8FA0"],
    };
    const [bg, color] = m[status] || m.disconnected;
    const labels: Record<string, string> = {
      connected: "Connected",
      error: "Error",
      pending: "Pending",
      disconnected: "Not Connected",
    };
    return (
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          color,
          background: bg,
          padding: "2px 8px",
          borderRadius: 999,
          whiteSpace: "nowrap",
        }}
      >
        {labels[status] || "Unknown"}
      </span>
    );
  };

  return (
    <div style={card}>
      <p style={sh}>Platform Connections</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {platformStates.map((p) => (
          <div
            key={p.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#0F1922",
              border: "1px solid #1E2D3D",
              borderRadius: 8,
              padding: "10px 12px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: `${PLATFORM_COLORS[p.name] ?? "#243241"}22`,
                border: `1.5px solid ${PLATFORM_COLORS[p.name] ?? "#243241"}55`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 800,
                color: PLATFORM_COLORS[p.name] ?? "#9AA9B8",
                flexShrink: 0,
              }}
            >
              {p.logo}
            </div>
            <div style={{ flex: 1, minWidth: 100 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#E8EEF5" }}>
                {p.name}
              </div>
              <div style={{ fontSize: 11, color: "#7B8FA0" }}>
                Sync: {p.lastSync} · {p.region}
              </div>
            </div>
            {badge(p.status)}
            <Btn
              outline
              style={{ fontSize: 11, padding: "4px 10px" }}
              onClick={() =>
                setPlatformStates((prev) =>
                  prev.map((pl) =>
                    pl.id === p.id
                      ? {
                          ...pl,
                          status:
                            pl.status === "connected"
                              ? "disconnected"
                              : "connected",
                        }
                      : pl,
                  ),
                )
              }
            >
              Configure
            </Btn>
          </div>
        ))}
      </div>
    </div>
  );
}

function SecurityTab() {
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const [twofa, setTwofa] = useState(false);
  const [pwdSaved, setPwdSaved] = useState(false);
  const sessions = [
    {
      device: "MacBook Pro",
      location: "Mumbai, IN",
      lastActive: "Now",
      current: true,
    },
    {
      device: "iPhone 15 Pro",
      location: "Mumbai, IN",
      lastActive: "2 hrs ago",
      current: false,
    },
    {
      device: "Chrome / Windows",
      location: "Delhi, IN",
      lastActive: "Yesterday",
      current: false,
    },
  ];
  const handlePwdSave = () => {
    if (pwd.next && pwd.next === pwd.confirm) {
      setPwdSaved(true);
      setPwd({ current: "", next: "", confirm: "" });
      setTimeout(() => setPwdSaved(false), 2500);
    }
  };

  return (
    <div>
      <div style={card}>
        <p style={sh}>Change Password</p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 10,
            maxWidth: 600,
          }}
        >
          {(["current", "next", "confirm"] as const).map((k) => (
            <div key={k}>
              <span style={lbl}>
                {k === "current"
                  ? "Current"
                  : k === "next"
                    ? "New Password"
                    : "Confirm New"}
              </span>
              <input
                type="password"
                style={inp}
                value={pwd[k]}
                onChange={(e) => setPwd((p) => ({ ...p, [k]: e.target.value }))}
              />
            </div>
          ))}
        </div>
        {pwd.confirm && pwd.next !== pwd.confirm && (
          <span
            style={{
              fontSize: 11,
              color: "#EB5757",
              display: "block",
              marginTop: 5,
            }}
          >
            Passwords don't match
          </span>
        )}
        <div
          style={{
            marginTop: 10,
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Btn onClick={handlePwdSave}>Update Password</Btn>
          {pwdSaved && (
            <span
              style={{
                fontSize: 12,
                color: "#2ECC71",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <CheckCircle size={12} /> Updated
            </span>
          )}
        </div>
      </div>
      <div style={card}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div>
            <p style={{ ...sh, marginBottom: 2 }}>Two-Factor Authentication</p>
            <p style={{ fontSize: 12, color: "#7B8FA0", margin: 0 }}>
              Extra security via authenticator app or SMS.
            </p>
          </div>
          <Toggle checked={twofa} onChange={() => setTwofa((v) => !v)} />
        </div>
        {twofa && (
          <div
            style={{
              marginTop: 10,
              background: "#0F1922",
              borderRadius: 6,
              padding: "8px 12px",
              fontSize: 12,
              color: "#7B8FA0",
              borderLeft: "3px solid #F59E0B",
            }}
          >
            2FA enabled.{" "}
            <span
              style={{ color: "#F59E0B", fontWeight: 600, cursor: "pointer" }}
            >
              Set up authenticator →
            </span>
          </div>
        )}
      </div>
      <div style={card}>
        <p style={sh}>Active Sessions</p>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", minWidth: 420 }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid #1E2D3D" }}>
                {["Device", "Location", "Last Active", ""].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "6px 10px",
                      fontSize: 11,
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
              {sessions.map((s, idx) => (
                <tr
                  key={s.device}
                  style={{
                    borderBottom:
                      idx < sessions.length - 1 ? "1px solid #1A2530" : "none",
                  }}
                >
                  <td style={{ padding: "8px 10px" }}>
                    <span
                      style={{
                        fontSize: 12.5,
                        color: "#E8EEF5",
                        fontWeight: 600,
                      }}
                    >
                      {s.device}
                    </span>
                    {s.current && (
                      <span
                        style={{
                          marginLeft: 6,
                          fontSize: 10,
                          fontWeight: 700,
                          color: "#2ECC71",
                          background: "#2ECC7122",
                          padding: "1px 6px",
                          borderRadius: 999,
                        }}
                      >
                        Current
                      </span>
                    )}
                  </td>
                  <td
                    style={{
                      padding: "8px 10px",
                      fontSize: 12,
                      color: "#9AA9B8",
                    }}
                  >
                    {s.location}
                  </td>
                  <td
                    style={{
                      padding: "8px 10px",
                      fontSize: 12,
                      color: "#9AA9B8",
                    }}
                  >
                    {s.lastActive}
                  </td>
                  <td style={{ padding: "8px 10px" }}>
                    {!s.current && (
                      <button
                        type="button"
                        style={{
                          fontSize: 11,
                          color: "#EB5757",
                          background: "#EB575718",
                          border: "1px solid #EB575740",
                          borderRadius: 5,
                          padding: "3px 10px",
                          cursor: "pointer",
                          fontWeight: 600,
                        }}
                      >
                        Revoke
                      </button>
                    )}
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

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("account");
  const tabContent: Record<TabId, React.ReactNode> = {
    account: <AccountTab />,
    stripe: <StripeTab />,
    ai: <AITab />,
    notifications: <NotificationsTab />,
    platforms: <PlatformsTab />,
    security: <SecurityTab />,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          marginBottom: 14,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            background: "linear-gradient(135deg,#F59E0B,#D97706)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Shield size={14} color="#0A0C12" />
        </div>
        <div>
          <h2
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: "#E8EEF5",
              margin: 0,
            }}
          >
            Admin Settings
          </h2>
          <p style={{ fontSize: 11.5, color: "#7B8FA0", margin: 0 }}>
            Manage account, integrations & preferences
          </p>
        </div>
      </div>

      {/* Compact horizontal tab bar */}
      <div
        style={{
          display: "flex",
          gap: 4,
          overflowX: "auto",
          paddingBottom: 2,
          marginBottom: 14,
          scrollbarWidth: "none",
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            data-ocid={`settings.${tab.id}.tab`}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 14px",
              borderRadius: 6,
              border:
                activeTab === tab.id
                  ? "1px solid #F59E0B55"
                  : "1px solid #243241",
              cursor: "pointer",
              fontSize: 12.5,
              fontWeight: activeTab === tab.id ? 700 : 500,
              color: activeTab === tab.id ? "#F59E0B" : "#7B8FA0",
              background: activeTab === tab.id ? "#F59E0B18" : "#0F1922",
              whiteSpace: "nowrap",
              transition: "all 0.15s",
              flexShrink: 0,
            }}
          >
            <span
              style={{ color: activeTab === tab.id ? "#F59E0B" : "#4A5A6B" }}
            >
              {tab.icon}
            </span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", minWidth: 0 }}>
        {tabContent[activeTab]}
      </div>
    </div>
  );
}
