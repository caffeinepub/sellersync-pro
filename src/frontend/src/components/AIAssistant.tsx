import { Bot, CheckCircle, Lock, Send, Shield, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  type Permission,
  permissions as defaultPermissions,
} from "../data/mockData";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  actions?: Action[];
  timestamp: Date;
}

interface Action {
  id: string;
  label: string;
  permissionId: string;
  type: "primary" | "secondary" | "danger";
}

const getAIResponse = (
  input: string,
  perms: Permission[],
): { content: string; actions?: Action[] } => {
  const lower = input.toLowerCase();
  const hasPermission = (id: string) => perms.find((p) => p.id === id)?.granted;

  if (
    lower.includes("low stock") ||
    lower.includes("reorder") ||
    lower.includes("inventory")
  ) {
    const canReorder = hasPermission("reorder");
    return {
      content: `\u{1F4E6} I found 3 products critically low on stock:\n\n\u2022 Wireless Earbuds Pro \u2014 8 units left (threshold: 15) on Amazon & Flipkart\n\u2022 Steel Water Bottle \u2014 4 units left on Meesho\n\u2022 Organic Face Serum \u2014 3 units left on Flipkart\n\n${canReorder ? "I can place reorder requests for all 3 items immediately." : "To auto-reorder, please grant me the Auto Reorder permission in Settings."}`,
      actions: [
        {
          id: "reorder-all",
          label: "\u{1F504} Reorder All 3 Products",
          permissionId: "reorder",
          type: "primary",
        },
        {
          id: "view-inventory",
          label: "View Inventory Report",
          permissionId: "reports",
          type: "secondary",
        },
      ],
    };
  }
  if (
    lower.includes("amazon") ||
    lower.includes("flipkart") ||
    lower.includes("meesho") ||
    lower.includes("alibaba") ||
    lower.includes("indiamart") ||
    lower.includes("platform")
  ) {
    return {
      content:
        "\u{1F517} Here's your platform status:\n\n\u2022 Amazon \u2705 Connected \u2014 \u20B91,82,450 revenue, 1,243 orders, +18.2%\n\u2022 Flipkart \u2705 Connected \u2014 \u20B996,300 revenue, 874 orders, +12.5%\n\u2022 Meesho \u2705 Connected \u2014 \u20B943,200 revenue, 562 orders, +31.4% \u{1F525}\n\u2022 Alibaba \u23F3 Pending setup \u2014 not yet synced\n\u2022 IndiaMart \u274C Error \u2014 API token expired, needs reconnection\n\nMeesho is growing fastest! Want me to optimise your listings there?",
      actions: [
        {
          id: "fix-indiamart",
          label: "\u{1F527} Fix IndiaMart Connection",
          permissionId: "sync",
          type: "danger",
        },
        {
          id: "setup-alibaba",
          label: "Setup Alibaba Account",
          permissionId: "sync",
          type: "secondary",
        },
        {
          id: "optimize-meesho",
          label: "\u{1F680} Optimise Meesho Listings",
          permissionId: "listings",
          type: "primary",
        },
      ],
    };
  }
  if (
    lower.includes("order") ||
    lower.includes("return") ||
    lower.includes("fulfil")
  ) {
    return {
      content:
        "\u{1F6D2} Order summary for last 7 days:\n\n\u2022 Total Orders: 312 across all platforms\n\u2022 Fulfilled: 156 (50%)\n\u2022 Shipped: 89 (28.5%)\n\u2022 Processing: 41 (13.1%)\n\u2022 Returns/Cancellations: 26 (8.3%)\n\nThere are 2 pending return requests on Flipkart that need your approval. Shall I process them?",
      actions: [
        {
          id: "approve-returns",
          label: "\u2705 Approve Both Returns",
          permissionId: "returns",
          type: "primary",
        },
        {
          id: "view-orders",
          label: "View All Orders",
          permissionId: "reports",
          type: "secondary",
        },
      ],
    };
  }
  if (
    lower.includes("revenue") ||
    lower.includes("sales") ||
    lower.includes("earning") ||
    lower.includes("profit")
  ) {
    return {
      content:
        "\u{1F4B0} Revenue breakdown for March 2026:\n\n\u2022 Total Revenue: \u20B93,34,750\n\u2022 Amazon: \u20B91,82,450 (54.5%)\n\u2022 Flipkart: \u20B996,300 (28.8%)\n\u2022 Meesho: \u20B943,200 (12.9%)\n\u2022 IndiaMart: \u20B912,800 (3.8%)\n\n\u{1F4C8} Month-over-month growth: +16.4%\n\u26A0\uFE0F IndiaMart is down -4.1% due to API sync issues. Fix it to recover lost revenue.\n\nShall I generate a full profit & loss report?",
      actions: [
        {
          id: "gen-report",
          label: "\u{1F4CA} Generate Full P&L Report",
          permissionId: "reports",
          type: "primary",
        },
        {
          id: "fix-sync",
          label: "Fix IndiaMart Sync",
          permissionId: "sync",
          type: "secondary",
        },
      ],
    };
  }
  if (
    lower.includes("price") ||
    lower.includes("discount") ||
    lower.includes("promo") ||
    lower.includes("offer") ||
    lower.includes("fee")
  ) {
    return {
      content:
        "\u{1F3F7}\uFE0F Pricing & fees insight:\n\n\u2022 Competitors on Amazon dropped prices 8% on Electronics this week\n\u2022 Meesho flash sale starts in 2 days \u2014 great opportunity!\n\u2022 Flipkart Big Billion Days registration is open\n\u2022 Platform fees: Amazon 15%, Flipkart 12%, Meesho 8%, IndiaMart 5%\n\nYour effective margin after fees is approximately 28%. I can adjust prices to stay competitive.",
      actions: [
        {
          id: "adjust-prices",
          label: "\u{1F4B2} Auto-Adjust Prices",
          permissionId: "pricing",
          type: "primary",
        },
        {
          id: "run-promo",
          label: "\u{1F389} Activate Meesho Promo",
          permissionId: "promotions",
          type: "secondary",
        },
      ],
    };
  }
  if (
    lower.includes("listing") ||
    lower.includes("product") ||
    lower.includes("upload") ||
    lower.includes("duplicate")
  ) {
    return {
      content:
        "\u{1F4DD} Listing management:\n\n\u2022 8 products active across all platforms\n\u2022 USB-C Hub is only on Amazon & Flipkart \u2014 adding to Meesho could add ~20% more sales\n\u2022 Industrial Bolt Set on IndiaMart has outdated images\n\u2022 Cotton Kurta Set is not listed on Amazon at all\n\nI can create and push updated listings to all platforms simultaneously.",
      actions: [
        {
          id: "add-meesho",
          label: "\u2795 Add USB-C Hub to Meesho",
          permissionId: "listings",
          type: "primary",
        },
        {
          id: "sync-all-listings",
          label: "\u{1F504} Sync All Listings",
          permissionId: "listings",
          type: "secondary",
        },
      ],
    };
  }
  if (
    lower.includes("ship") ||
    lower.includes("courier") ||
    lower.includes("deliver")
  ) {
    return {
      content:
        "\u{1F69A} Shipping overview:\n\n\u2022 Amazon: 98% on-time delivery rate\n\u2022 Flipkart: 94% on-time delivery rate\n\u2022 Meesho: 91% on-time delivery rate\n\u2022 IndiaMart: Delayed (API sync issue)\n\nThere are 3 orders awaiting shipping confirmation. I can auto-confirm and generate labels.",
      actions: [
        {
          id: "confirm-shipping",
          label: "\u{1F4E6} Confirm 3 Shipments",
          permissionId: "returns",
          type: "primary",
        },
        {
          id: "view-shipping",
          label: "View Shipping Report",
          permissionId: "reports",
          type: "secondary",
        },
      ],
    };
  }
  if (
    lower.includes("customer") ||
    lower.includes("loyalty") ||
    lower.includes("review")
  ) {
    return {
      content:
        "\u{1F465} Customer insights:\n\n\u2022 Total unique customers: 2,340 across all platforms\n\u2022 Repeat purchase rate: 22%\n\u2022 Average order value: \u20B91,245\n\u2022 Top customers are on Amazon (avg \u20B94,800 per order)\n\u2022 14 new reviews this week \u2014 12 positive, 2 negative\n\nBuilding a unified customer database could help you run cross-platform loyalty offers.",
      actions: [
        {
          id: "build-crm",
          label: "\u{1F464} Build Customer Database",
          permissionId: "reports",
          type: "primary",
        },
        {
          id: "respond-reviews",
          label: "Respond to Reviews",
          permissionId: "listings",
          type: "secondary",
        },
      ],
    };
  }
  if (
    lower.includes("hello") ||
    lower.includes("hi") ||
    lower.includes("help") ||
    lower.includes("what can you")
  ) {
    return {
      content:
        "\u{1F44B} Hi! I'm your EcomAI Assistant. I manage your entire e-commerce business across Amazon, Flipkart, Meesho, Alibaba & IndiaMart.\n\nHere's what I can help with:\n\n\u2022 \u{1F4E6} Inventory \u2014 Monitor stock, alert on low levels, auto-reorder\n\u2022 \u{1F6D2} Orders \u2014 Track and process orders across all platforms\n\u2022 \u{1F4B0} Revenue & Profits \u2014 Analyse sales, fees, and true margins\n\u2022 \u{1F517} Integrations \u2014 Connect and sync all your platforms\n\u2022 \u{1F3F7}\uFE0F Pricing \u2014 Competitive pricing and promotions\n\u2022 \u{1F4DD} Listings \u2014 Create and sync product listings everywhere\n\u2022 \u{1F69A} Shipping \u2014 Manage deliveries and returns\n\u2022 \u{1F465} Customers \u2014 Unified customer data and loyalty\n\nJust ask me anything!",
      actions: [
        {
          id: "check-all",
          label: "\u{1F4CB} Full Business Summary",
          permissionId: "reports",
          type: "primary",
        },
      ],
    };
  }
  return {
    content:
      "I can help with that. Here are the most urgent items for your business right now:\n\n\u2022 Fix IndiaMart API connection (affecting \u20B912,800 in revenue)\n\u2022 Restock 3 low-inventory products before stockout\n\u2022 Process 2 pending returns on Flipkart\n\u2022 Optimise Meesho listings (fastest growing at +31.4%)\n\u2022 Confirm 3 shipments awaiting dispatch\n\nWhat would you like me to prioritise?",
    actions: [
      {
        id: "summary",
        label: "\u{1F4CA} Business Summary",
        permissionId: "reports",
        type: "primary",
      },
      {
        id: "urgent",
        label: "\u26A1 Fix Urgent Issues",
        permissionId: "sync",
        type: "secondary",
      },
    ],
  };
};

interface TextPart {
  text: string;
  bold: boolean;
  key: string;
}

function FormatLine({ text }: { text: string }) {
  const rawParts = text.split(/(\*\*[^*]+\*\*)/g);
  const parts: TextPart[] = rawParts.map((p, i) => ({
    text: p.startsWith("**") && p.endsWith("**") ? p.slice(2, -2) : p,
    bold: p.startsWith("**") && p.endsWith("**"),
    key: `${i}-${p.length}`,
  }));
  return (
    <p
      style={{
        margin: "2px 0",
        fontSize: 13,
        lineHeight: 1.6,
        color: "#B8C8D8",
      }}
    >
      {parts.map((part) =>
        part.bold ? (
          <strong key={part.key} style={{ color: "#E8EEF5" }}>
            {part.text}
          </strong>
        ) : (
          <span key={part.key}>{part.text || "\u00A0"}</span>
        ),
      )}
    </p>
  );
}

function FormatContent({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: stable line order
        <FormatLine key={i} text={line} />
      ))}
    </>
  );
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "assistant",
      content:
        "\u{1F44B} Hello! I'm your EcomAI Assistant. Currently monitoring 5 platforms:\n\n\u2705 Amazon, Flipkart, Meesho \u2014 Active\n\u23F3 Alibaba \u2014 Pending setup\n\u274C IndiaMart \u2014 Needs attention\n\n\u26A0\uFE0F 3 urgent alerts: Low stock on 3 products, IndiaMart sync error, 2 pending returns. How can I help?",
      actions: [
        {
          id: "fix-indiamart-0",
          label: "\u{1F527} Fix IndiaMart Error",
          permissionId: "sync",
          type: "danger",
        },
        {
          id: "restock-0",
          label: "\u{1F4E6} Restock Low Items",
          permissionId: "reorder",
          type: "primary",
        },
      ],
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [perms, setPerms] = useState<Permission[]>(defaultPermissions);
  const [doneActions, setDoneActions] = useState<Set<string>>(new Set());
  const [showPerms, setShowPerms] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    const aiRes = getAIResponse(input, perms);
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      ...aiRes,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
  };

  const executeAction = (action: Action, msgId: string) => {
    const perm = perms.find((p) => p.id === action.permissionId);
    if (perm && !perm.granted) {
      const notice: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: `\u{1F512} I need the ${perm.label} permission to do this. Please enable it in the permissions panel (shield icon above).`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, notice]);
      setShowPerms(true);
      return;
    }
    setDoneActions((prev) => new Set([...prev, `${msgId}-${action.id}`]));
    const confirmMsg: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content:
        "\u2705 Done! The action has been executed successfully. I'll update you once it completes on all relevant platforms.",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, confirmMsg]);
  };

  const togglePerm = (id: string) => {
    setPerms((prev) =>
      prev.map((p) => (p.id === id ? { ...p, granted: !p.granted } : p)),
    );
  };

  const actionStyle = (type: string) => {
    if (type === "primary")
      return {
        background: "rgba(47,124,246,0.18)",
        border: "1px solid rgba(47,124,246,0.4)",
        color: "#5B9FFF",
      };
    if (type === "danger")
      return {
        background: "rgba(235,87,87,0.14)",
        border: "1px solid rgba(235,87,87,0.35)",
        color: "#FF7B7B",
      };
    return {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid #2A3A4A",
      color: "#9AA9B8",
    };
  };

  const riskColor = (risk: string) =>
    risk === "high" ? "#EB5757" : risk === "medium" ? "#F2C94C" : "#2ECC71";

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid #1E2D3D" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="flex items-center justify-center rounded-lg"
            style={{
              width: 28,
              height: 28,
              background: "linear-gradient(135deg,#2F7CF6,#1a56d6)",
            }}
          >
            <Bot size={14} color="white" />
          </div>
          <span style={{ fontWeight: 600, fontSize: 13.5, color: "#E8EEF5" }}>
            AI Assistant
          </span>
          <span
            style={{
              fontSize: 10,
              color: "#2ECC71",
              background: "rgba(46,204,113,0.12)",
              padding: "2px 7px",
              borderRadius: 999,
              fontWeight: 600,
            }}
          >
            LIVE
          </span>
        </div>
        <button
          type="button"
          onClick={() => setShowPerms(!showPerms)}
          className="flex items-center gap-1 rounded-lg px-2 py-1"
          style={{
            background: showPerms
              ? "rgba(47,124,246,0.18)"
              : "rgba(255,255,255,0.05)",
            border: "1px solid #243241",
            color: "#9AA9B8",
            fontSize: 11,
          }}
        >
          <Shield size={12} />
          <span>Permissions</span>
        </button>
      </div>

      {showPerms && (
        <div
          className="px-4 py-3"
          style={{
            background: "rgba(47,124,246,0.07)",
            borderBottom: "1px solid #1E2D3D",
          }}
        >
          <p style={{ fontSize: 11, color: "#7B8FA0", marginBottom: 8 }}>
            Control what the AI can do. High-risk actions need your approval
            each time.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {perms.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between rounded-lg px-3 py-2"
                style={{ background: "#0F1922", border: "1px solid #1E2D3D" }}
              >
                <div className="flex-1 min-w-0 mr-2">
                  <div className="flex items-center gap-1">
                    <span
                      style={{
                        fontSize: 11.5,
                        fontWeight: 600,
                        color: "#E8EEF5",
                      }}
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
                  <span style={{ fontSize: 10, color: "#7B8FA0" }}>
                    {p.description}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => togglePerm(p.id)}
                  className="rounded-full flex-shrink-0"
                  style={{
                    width: 32,
                    height: 18,
                    background: p.granted ? "#2F7CF6" : "#243241",
                    position: "relative",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      width: 12,
                      height: 12,
                      background: "white",
                      borderRadius: "50%",
                      top: 3,
                      transition: "left 0.2s",
                      left: p.granted ? 17 : 3,
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        className="flex-1 overflow-y-auto px-4 py-3"
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div style={{ maxWidth: "90%" }}>
              {msg.role === "assistant" && (
                <div className="flex items-start gap-2">
                  <div
                    className="flex items-center justify-center rounded-lg flex-shrink-0 mt-1"
                    style={{
                      width: 22,
                      height: 22,
                      background: "linear-gradient(135deg,#2F7CF6,#1a56d6)",
                    }}
                  >
                    <Bot size={11} color="white" />
                  </div>
                  <div>
                    <div
                      className="rounded-2xl rounded-tl-sm p-3"
                      style={{
                        background: "#1A2B3C",
                        border: "1px solid #243241",
                      }}
                    >
                      <FormatContent text={msg.content} />
                    </div>
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {msg.actions.map((action) => {
                          const isDone = doneActions.has(
                            `${msg.id}-${action.id}`,
                          );
                          const perm = perms.find(
                            (p) => p.id === action.permissionId,
                          );
                          return (
                            <button
                              type="button"
                              key={action.id}
                              onClick={() =>
                                !isDone && executeAction(action, msg.id)
                              }
                              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all"
                              style={
                                isDone
                                  ? {
                                      background: "rgba(46,204,113,0.14)",
                                      border: "1px solid rgba(46,204,113,0.35)",
                                      color: "#2ECC71",
                                      fontSize: 12,
                                    }
                                  : {
                                      ...actionStyle(action.type),
                                      fontSize: 12,
                                      cursor: "pointer",
                                    }
                              }
                            >
                              {isDone ? (
                                <CheckCircle size={11} />
                              ) : !perm?.granted ? (
                                <Lock size={10} />
                              ) : (
                                <Zap size={10} />
                              )}
                              {isDone ? "Done!" : action.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {msg.role === "user" && (
                <div
                  className="rounded-2xl rounded-tr-sm px-4 py-2.5"
                  style={{
                    background: "rgba(47,124,246,0.2)",
                    border: "1px solid rgba(47,124,246,0.3)",
                  }}
                >
                  <p style={{ fontSize: 13, color: "#D0E0F0", margin: 0 }}>
                    {msg.content}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div
        className="px-4 pb-2 flex gap-2 overflow-x-auto"
        style={{ flexShrink: 0 }}
      >
        {[
          "Check inventory",
          "Platform status",
          "Today's orders",
          "Revenue & profit",
          "Shipping updates",
        ].map((q) => (
          <button
            type="button"
            key={q}
            onClick={() => setInput(q)}
            style={{
              whiteSpace: "nowrap",
              fontSize: 11,
              color: "#7B8FA0",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid #243241",
              borderRadius: 999,
              padding: "4px 10px",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            {q}
          </button>
        ))}
      </div>

      <div className="px-4 pb-4" style={{ flexShrink: 0 }}>
        <div
          className="flex items-center gap-2 rounded-xl px-4"
          style={{
            background: "#1A2530",
            border: "1px solid #2A3A4A",
            height: 44,
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask me anything about your business..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: 13,
              color: "#E8EEF5",
            }}
          />
          <button
            type="button"
            onClick={send}
            className="flex items-center justify-center rounded-lg"
            style={{
              width: 30,
              height: 30,
              background: input.trim() ? "#2F7CF6" : "#243241",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            <Send size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
