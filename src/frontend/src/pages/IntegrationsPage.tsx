import {
  CheckCircle,
  Clock,
  Plus,
  RefreshCw,
  Settings,
  XCircle,
  Zap,
} from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import AmazonWizard from "../components/AmazonWizard";
import FlipkartWizard from "../components/FlipkartWizard";
import PlatformComingSoon from "../components/PlatformComingSoon";
import { platforms } from "../data/mockData";

const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  connected: {
    color: "#4ADE80",
    icon: <CheckCircle size={12} color="#4ADE80" />,
  },
  error: { color: "#F87171", icon: <XCircle size={12} color="#F87171" /> },
  pending: { color: "#FCD34D", icon: <Clock size={12} color="#FCD34D" /> },
  disconnected: {
    color: "#3D4F63",
    icon: <XCircle size={12} color="#3D4F63" />,
  },
};

function loadConnections(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem("sellersync_connections");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveConnections(data: Record<string, boolean>) {
  try {
    localStorage.setItem("sellersync_connections", JSON.stringify(data));
  } catch {
    // ignore
  }
}

function loadPlatformInfo(
  key: string,
): { sellerId: string; marketplace: string } | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function IntegrationsPage() {
  const [syncing, setSyncing] = useState<string | null>(null);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [flipkartWizardOpen, setFlipkartWizardOpen] = useState(false);
  const [comingSoonPlatform, setComingSoonPlatform] = useState<string | null>(
    null,
  );
  const [connections, setConnections] =
    useState<Record<string, boolean>>(loadConnections);
  const [amazonInfo, setAmazonInfo] = useState<{
    sellerId: string;
    marketplace: string;
  } | null>(() => loadPlatformInfo("sellersync_amazon_info"));
  const [flipkartInfo, setFlipkartInfo] = useState<{
    sellerId: string;
    marketplace: string;
  } | null>(() => loadPlatformInfo("sellersync_flipkart_info"));

  const isAmazonConnected = connections.amazon === true;
  const isFlipkartConnected = connections.flipkart === true;

  const doSync = (id: string) => {
    setSyncing(id);
    setTimeout(() => {
      setSyncing(null);
      toast.success(`${id} sync complete!`);
    }, 2000);
  };

  const handleAmazonConnected = (sellerId: string, marketplace: string) => {
    const updated = { ...connections, amazon: true };
    setConnections(updated);
    saveConnections(updated);
    const info = { sellerId, marketplace };
    setAmazonInfo(info);
    try {
      localStorage.setItem("sellersync_amazon_info", JSON.stringify(info));
    } catch {
      // ignore
    }
    toast.success("Amazon Seller Central connected successfully!");
  };

  const handleFlipkartConnected = (sellerId: string, marketplace: string) => {
    const updated = { ...connections, flipkart: true };
    setConnections(updated);
    saveConnections(updated);
    const info = { sellerId, marketplace };
    setFlipkartInfo(info);
    try {
      localStorage.setItem("sellersync_flipkart_info", JSON.stringify(info));
    } catch {
      // ignore
    }
    toast.success("Flipkart Seller Hub connected successfully!");
  };

  const handleAmazonReconfigure = () => {
    const { amazon: _rm, ...updated } = connections;
    setConnections(updated);
    saveConnections(updated);
    setAmazonInfo(null);
    try {
      localStorage.removeItem("sellersync_amazon_info");
    } catch {
      /* ignore */
    }
    setWizardOpen(true);
  };

  const handleFlipkartReconfigure = () => {
    const { flipkart: _rm, ...updated } = connections;
    setConnections(updated);
    saveConnections(updated);
    setFlipkartInfo(null);
    try {
      localStorage.removeItem("sellersync_flipkart_info");
    } catch {
      /* ignore */
    }
    setFlipkartWizardOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="section-title" style={{ margin: 0 }}>
          Platform Integrations
        </h2>
        <button
          type="button"
          className="btn-gold"
          onClick={() => setWizardOpen(true)}
          style={{
            fontSize: 12,
            padding: "7px 14px",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
          data-ocid="integrations.primary_button"
        >
          <Plus size={12} /> Connect New
        </button>
      </div>

      {/* Amazon Card */}
      <PlatformCard
        name="Amazon"
        logo="a"
        logoColor="#FF9900"
        logoBg="rgba(255,153,0,0.12)"
        logoBorder="rgba(255,153,0,0.25)"
        logoFontSize={20}
        logoFontFamily="serif"
        isConnected={isAmazonConnected}
        connectedSubtitle={
          amazonInfo
            ? `Seller ID: ${amazonInfo.sellerId} · ${amazonInfo.marketplace}`
            : undefined
        }
        disconnectedSubtitle="Connect your Amazon Seller Central account"
        syncing={syncing === "Amazon"}
        onSync={() => doSync("Amazon")}
        onConnect={() => setWizardOpen(true)}
        onReconfigure={handleAmazonReconfigure}
        dataOcid="integrations.item.1"
      />

      {/* Flipkart Card */}
      <PlatformCard
        name="Flipkart"
        logo="F"
        logoColor="#2B6CB0"
        logoBg="rgba(43,108,176,0.15)"
        logoBorder="rgba(43,108,176,0.35)"
        logoFontSize={16}
        isConnected={isFlipkartConnected}
        connectedSubtitle={
          flipkartInfo
            ? `Seller ID: ${flipkartInfo.sellerId} · ${flipkartInfo.marketplace}`
            : undefined
        }
        disconnectedSubtitle="Connect your Flipkart Seller Hub account"
        syncing={syncing === "Flipkart"}
        onSync={() => doSync("Flipkart")}
        onConnect={() => setFlipkartWizardOpen(true)}
        onReconfigure={handleFlipkartReconfigure}
        dataOcid="integrations.item.2"
      />

      {/* Other platforms (still coming soon) */}
      <div className="grid grid-cols-1 gap-3">
        {platforms
          .filter((p) => p.name !== "Amazon" && p.name !== "Flipkart")
          .map((p, index) => {
            const comingSoonNames = ["Meesho", "Alibaba", "IndiaMart"];
            const isComingSoon = comingSoonNames.includes(p.name);
            const sc = statusConfig[p.status] ?? statusConfig.disconnected;
            return (
              <div
                key={p.id}
                className="card-premium"
                style={{ padding: "16px 18px", borderRadius: 12 }}
                data-ocid={`integrations.item.${index + 3}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center rounded-xl font-black flex-shrink-0"
                    style={{
                      width: 44,
                      height: 44,
                      background: `${p.color}15`,
                      color: p.color,
                      fontSize: 12,
                      border: `1px solid ${p.color}25`,
                    }}
                  >
                    {p.logo}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: 14,
                          color: "#EEF2F7",
                        }}
                      >
                        {p.name}
                      </span>
                      {isComingSoon ? (
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: "#F59E0B",
                            letterSpacing: "0.06em",
                            background: "rgba(245,158,11,0.1)",
                            border: "1px solid rgba(245,158,11,0.2)",
                            borderRadius: 4,
                            padding: "1px 6px",
                          }}
                        >
                          COMING SOON
                        </span>
                      ) : (
                        <>
                          {sc.icon}
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 700,
                              color: sc.color,
                              letterSpacing: "0.06em",
                            }}
                          >
                            {p.status.toUpperCase()}
                          </span>
                        </>
                      )}
                    </div>
                    <div style={{ fontSize: 11, color: "#3D4F63" }}>
                      {isComingSoon
                        ? "Integration launching soon"
                        : `Region: ${p.region} · Last sync: ${p.lastSync}`}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {isComingSoon ? (
                      <button
                        type="button"
                        onClick={() => setComingSoonPlatform(p.name)}
                        style={{
                          fontSize: 11,
                          padding: "6px 12px",
                          borderRadius: 8,
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#5A6E85",
                          cursor: "pointer",
                          fontWeight: 500,
                        }}
                        data-ocid="integrations.secondary_button"
                      >
                        Learn More
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => doSync(p.id)}
                          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            color: "#5A6E85",
                            fontSize: 11,
                            fontWeight: 500,
                            cursor: "pointer",
                          }}
                        >
                          <RefreshCw
                            size={11}
                            className={syncing === p.id ? "animate-spin" : ""}
                          />
                          Sync
                        </button>
                        <button
                          type="button"
                          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            color: "#5A6E85",
                            fontSize: 11,
                            fontWeight: 500,
                            cursor: "pointer",
                          }}
                        >
                          <Settings size={11} /> Config
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <AnimatePresence>
        {wizardOpen && (
          <AmazonWizard
            open={wizardOpen}
            onClose={() => setWizardOpen(false)}
            onConnected={handleAmazonConnected}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {flipkartWizardOpen && (
          <FlipkartWizard
            open={flipkartWizardOpen}
            onClose={() => setFlipkartWizardOpen(false)}
            onConnected={handleFlipkartConnected}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {comingSoonPlatform && (
          <PlatformComingSoon
            platform={comingSoonPlatform}
            onClose={() => setComingSoonPlatform(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Reusable platform card for connected platforms
function PlatformCard({
  name,
  logo,
  logoColor,
  logoBg,
  logoBorder,
  logoFontSize,
  logoFontFamily,
  isConnected,
  connectedSubtitle,
  disconnectedSubtitle,
  syncing,
  onSync,
  onConnect,
  onReconfigure,
  dataOcid,
}: {
  name: string;
  logo: string;
  logoColor: string;
  logoBg: string;
  logoBorder: string;
  logoFontSize?: number;
  logoFontFamily?: string;
  isConnected: boolean;
  connectedSubtitle?: string;
  disconnectedSubtitle: string;
  syncing: boolean;
  onSync: () => void;
  onConnect: () => void;
  onReconfigure: () => void;
  dataOcid: string;
}) {
  return (
    <div
      className="card-premium"
      style={{
        padding: "16px 18px",
        borderRadius: 12,
        borderColor: isConnected ? "rgba(74,222,128,0.2)" : undefined,
      }}
      data-ocid={dataOcid}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex items-center justify-center rounded-xl font-black flex-shrink-0"
          style={{
            width: 44,
            height: 44,
            background: logoBg,
            color: logoColor,
            fontSize: logoFontSize ?? 14,
            fontWeight: 900,
            border: `1px solid ${logoBorder}`,
            fontFamily: logoFontFamily,
          }}
        >
          {logo}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span style={{ fontWeight: 700, fontSize: 14, color: "#EEF2F7" }}>
              {name}
            </span>
            {isConnected ? (
              <>
                <CheckCircle size={12} color="#4ADE80" />
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#4ADE80",
                    letterSpacing: "0.06em",
                  }}
                >
                  CONNECTED
                </span>
              </>
            ) : (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#3D4F63",
                  letterSpacing: "0.06em",
                }}
              >
                DISCONNECTED
              </span>
            )}
          </div>
          <div style={{ fontSize: 11, color: "#3D4F63" }}>
            {isConnected && connectedSubtitle
              ? connectedSubtitle
              : disconnectedSubtitle}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {isConnected ? (
            <>
              <button
                type="button"
                onClick={onSync}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
                style={{
                  background: "rgba(74,222,128,0.08)",
                  border: "1px solid rgba(74,222,128,0.2)",
                  color: "#4ADE80",
                  fontSize: 11,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
                data-ocid="integrations.secondary_button"
              >
                <RefreshCw
                  size={11}
                  className={syncing ? "animate-spin" : ""}
                />
                Sync Now
              </button>
              <button
                type="button"
                onClick={onReconfigure}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "#5A6E85",
                  fontSize: 11,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
                data-ocid="integrations.edit_button"
              >
                <Settings size={11} /> Reconfigure
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn-gold"
              onClick={onConnect}
              style={{
                fontSize: 12,
                padding: "6px 14px",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
              data-ocid="integrations.primary_button"
            >
              <Zap size={11} /> Connect
            </button>
          )}
        </div>
      </div>

      {isConnected && (
        <div
          className="mt-3 rounded-lg px-3 py-2 flex items-center gap-2"
          style={{
            background: "rgba(74,222,128,0.05)",
            border: "1px solid rgba(74,222,128,0.15)",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#4ADE80",
            }}
          />
          <span style={{ fontSize: 11, color: "#6BC891" }}>
            Syncing Orders, Inventory, Analytics, and Pricing in real-time.
          </span>
        </div>
      )}
    </div>
  );
}
