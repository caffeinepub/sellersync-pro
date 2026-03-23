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
import AlibabaWizard from "../components/AlibabaWizard";
import AmazonWizard from "../components/AmazonWizard";
import EbayWizard from "../components/EbayWizard";
import FlipkartWizard from "../components/FlipkartWizard";
import IndiaMartWizard from "../components/IndiaMartWizard";
import MeeshoWizard from "../components/MeeshoWizard";
import ShopifyWizard from "../components/ShopifyWizard";
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
    /* ignore */
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
  const [meeshoWizardOpen, setMeeshoWizardOpen] = useState(false);
  const [alibabaWizardOpen, setAlibabaWizardOpen] = useState(false);
  const [indiamartWizardOpen, setIndiamartWizardOpen] = useState(false);
  const [shopifyWizardOpen, setShopifyWizardOpen] = useState(false);
  const [ebayWizardOpen, setEbayWizardOpen] = useState(false);
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
  const [meeshoInfo, setMeeshoInfo] = useState<{
    sellerId: string;
    marketplace: string;
  } | null>(() => loadPlatformInfo("sellersync_meesho_info"));
  const [alibabaInfo, setAlibabaInfo] = useState<{
    sellerId: string;
    marketplace: string;
  } | null>(() => loadPlatformInfo("sellersync_alibaba_info"));
  const [indiamartInfo, setIndiamartInfo] = useState<{
    sellerId: string;
    marketplace: string;
  } | null>(() => loadPlatformInfo("sellersync_indiamart_info"));
  const [shopifyInfo, setShopifyInfo] = useState<{
    sellerId: string;
    marketplace: string;
  } | null>(() => loadPlatformInfo("sellersync_shopify_info"));
  const [ebayInfo, setEbayInfo] = useState<{
    sellerId: string;
    marketplace: string;
  } | null>(() => loadPlatformInfo("sellersync_ebay_info"));

  const doSync = (id: string) => {
    setSyncing(id);
    setTimeout(() => {
      setSyncing(null);
      toast.success(`${id} sync complete!`);
    }, 2000);
  };

  const makeConnectHandler =
    (
      key: string,
      infoKey: string,
      setInfo: (v: { sellerId: string; marketplace: string }) => void,
      successMsg: string,
    ) =>
    (sellerId: string, marketplace: string) => {
      const updated = { ...connections, [key]: true };
      setConnections(updated);
      saveConnections(updated);
      const info = { sellerId, marketplace };
      setInfo(info);
      try {
        localStorage.setItem(infoKey, JSON.stringify(info));
      } catch {
        /* ignore */
      }
      toast.success(successMsg);
    };

  const makeReconfigureHandler =
    (
      key: string,
      infoKey: string,
      setInfo: (v: null) => void,
      openWizard: () => void,
    ) =>
    () => {
      const { [key]: _rm, ...updated } = connections;
      setConnections(updated);
      saveConnections(updated);
      setInfo(null);
      try {
        localStorage.removeItem(infoKey);
      } catch {
        /* ignore */
      }
      openWizard();
    };

  const handleAmazonConnected = makeConnectHandler(
    "amazon",
    "sellersync_amazon_info",
    setAmazonInfo,
    "Amazon Seller Central connected successfully!",
  );
  const handleFlipkartConnected = makeConnectHandler(
    "flipkart",
    "sellersync_flipkart_info",
    setFlipkartInfo,
    "Flipkart Seller Hub connected successfully!",
  );
  const handleMeeshoConnected = makeConnectHandler(
    "meesho",
    "sellersync_meesho_info",
    setMeeshoInfo,
    "Meesho Supplier Panel connected successfully!",
  );
  const handleAlibabaConnected = makeConnectHandler(
    "alibaba",
    "sellersync_alibaba_info",
    setAlibabaInfo,
    "Alibaba OPEN Platform connected successfully!",
  );
  const handleIndiaMartConnected = makeConnectHandler(
    "indiamart",
    "sellersync_indiamart_info",
    setIndiamartInfo,
    "IndiaMart Lead Manager connected successfully!",
  );
  const handleShopifyConnected = makeConnectHandler(
    "shopify",
    "sellersync_shopify_info",
    setShopifyInfo,
    "Shopify Store connected successfully!",
  );
  const handleEbayConnected = makeConnectHandler(
    "ebay",
    "sellersync_ebay_info",
    setEbayInfo,
    "eBay Seller Hub connected successfully!",
  );

  const handleAmazonReconfigure = makeReconfigureHandler(
    "amazon",
    "sellersync_amazon_info",
    setAmazonInfo as (v: null) => void,
    () => setWizardOpen(true),
  );
  const handleFlipkartReconfigure = makeReconfigureHandler(
    "flipkart",
    "sellersync_flipkart_info",
    setFlipkartInfo as (v: null) => void,
    () => setFlipkartWizardOpen(true),
  );
  const handleMeeshoReconfigure = makeReconfigureHandler(
    "meesho",
    "sellersync_meesho_info",
    setMeeshoInfo as (v: null) => void,
    () => setMeeshoWizardOpen(true),
  );
  const handleAlibabaReconfigure = makeReconfigureHandler(
    "alibaba",
    "sellersync_alibaba_info",
    setAlibabaInfo as (v: null) => void,
    () => setAlibabaWizardOpen(true),
  );
  const handleIndiaMartReconfigure = makeReconfigureHandler(
    "indiamart",
    "sellersync_indiamart_info",
    setIndiamartInfo as (v: null) => void,
    () => setIndiamartWizardOpen(true),
  );
  const handleShopifyReconfigure = makeReconfigureHandler(
    "shopify",
    "sellersync_shopify_info",
    setShopifyInfo as (v: null) => void,
    () => setShopifyWizardOpen(true),
  );
  const handleEbayReconfigure = makeReconfigureHandler(
    "ebay",
    "sellersync_ebay_info",
    setEbayInfo as (v: null) => void,
    () => setEbayWizardOpen(true),
  );

  // Platform cards config
  const platformCards = [
    {
      key: "amazon",
      name: "Amazon",
      logo: "a",
      logoColor: "#FF9900",
      logoBg: "rgba(255,153,0,0.12)",
      logoBorder: "rgba(255,153,0,0.25)",
      logoFontSize: 20,
      logoFontFamily: "serif",
      isConnected: connections.amazon === true,
      info: amazonInfo,
      disconnectedSubtitle: "Connect your Amazon Seller Central account",
      onConnect: () => setWizardOpen(true),
      onReconfigure: handleAmazonReconfigure,
      ocid: "integrations.item.1",
    },
    {
      key: "flipkart",
      name: "Flipkart",
      logo: "F",
      logoColor: "#2B6CB0",
      logoBg: "rgba(43,108,176,0.15)",
      logoBorder: "rgba(43,108,176,0.35)",
      logoFontSize: 16,
      logoFontFamily: undefined,
      isConnected: connections.flipkart === true,
      info: flipkartInfo,
      disconnectedSubtitle: "Connect your Flipkart Seller Hub account",
      onConnect: () => setFlipkartWizardOpen(true),
      onReconfigure: handleFlipkartReconfigure,
      ocid: "integrations.item.2",
    },
    {
      key: "meesho",
      name: "Meesho",
      logo: "M",
      logoColor: "#E84B61",
      logoBg: "rgba(232,75,97,0.15)",
      logoBorder: "rgba(232,75,97,0.35)",
      logoFontSize: 16,
      logoFontFamily: undefined,
      isConnected: connections.meesho === true,
      info: meeshoInfo,
      disconnectedSubtitle: "Connect your Meesho Supplier Panel account",
      onConnect: () => setMeeshoWizardOpen(true),
      onReconfigure: handleMeeshoReconfigure,
      ocid: "integrations.item.3",
    },
    {
      key: "alibaba",
      name: "Alibaba",
      logo: "A",
      logoColor: "#FF6A00",
      logoBg: "rgba(255,106,0,0.15)",
      logoBorder: "rgba(255,106,0,0.35)",
      logoFontSize: 16,
      logoFontFamily: undefined,
      isConnected: connections.alibaba === true,
      info: alibabaInfo,
      disconnectedSubtitle: "Connect your Alibaba OPEN Platform account",
      onConnect: () => setAlibabaWizardOpen(true),
      onReconfigure: handleAlibabaReconfigure,
      ocid: "integrations.item.4",
    },
    {
      key: "indiamart",
      name: "IndiaMart",
      logo: "I",
      logoColor: "#00823C",
      logoBg: "rgba(0,130,60,0.15)",
      logoBorder: "rgba(0,130,60,0.35)",
      logoFontSize: 16,
      logoFontFamily: undefined,
      isConnected: connections.indiamart === true,
      info: indiamartInfo,
      disconnectedSubtitle: "Connect your IndiaMart Lead Manager account",
      onConnect: () => setIndiamartWizardOpen(true),
      onReconfigure: handleIndiaMartReconfigure,
      ocid: "integrations.item.5",
    },
    {
      key: "shopify",
      name: "Shopify",
      logo: "S",
      logoColor: "#96BF6F",
      logoBg: "rgba(150,191,111,0.15)",
      logoBorder: "rgba(150,191,111,0.35)",
      logoFontSize: 16,
      logoFontFamily: undefined,
      isConnected: connections.shopify === true,
      info: shopifyInfo,
      disconnectedSubtitle: "Connect your Shopify Store account",
      onConnect: () => setShopifyWizardOpen(true),
      onReconfigure: handleShopifyReconfigure,
      ocid: "integrations.item.6",
    },
    {
      key: "ebay",
      name: "eBay",
      logo: "e",
      logoColor: "#56AC56",
      logoBg: "rgba(86,172,86,0.15)",
      logoBorder: "rgba(86,172,86,0.35)",
      logoFontSize: 16,
      logoFontFamily: undefined,
      isConnected: connections.ebay === true,
      info: ebayInfo,
      disconnectedSubtitle: "Connect your eBay Seller Hub account",
      onConnect: () => setEbayWizardOpen(true),
      onReconfigure: handleEbayReconfigure,
      ocid: "integrations.item.7",
    },
  ];

  // Additional platforms not yet supported (future)
  const futurePlatforms = platforms.filter(
    (p) =>
      ![
        "Amazon",
        "Flipkart",
        "Meesho",
        "Alibaba",
        "IndiaMart",
        "Shopify",
        "eBay",
      ].includes(p.name),
  );

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

      {platformCards.map((pc) => (
        <PlatformCard
          key={pc.key}
          name={pc.name}
          logo={pc.logo}
          logoColor={pc.logoColor}
          logoBg={pc.logoBg}
          logoBorder={pc.logoBorder}
          logoFontSize={pc.logoFontSize}
          logoFontFamily={pc.logoFontFamily}
          isConnected={pc.isConnected}
          connectedSubtitle={
            pc.info
              ? `ID: ${pc.info.sellerId} · ${pc.info.marketplace}`
              : undefined
          }
          disconnectedSubtitle={pc.disconnectedSubtitle}
          syncing={syncing === pc.name}
          onSync={() => doSync(pc.name)}
          onConnect={pc.onConnect}
          onReconfigure={pc.onReconfigure}
          dataOcid={pc.ocid}
        />
      ))}

      {futurePlatforms.length > 0 && (
        <div className="grid grid-cols-1 gap-3">
          {futurePlatforms.map((p, index) => {
            const sc = statusConfig[p.status] ?? statusConfig.disconnected;
            return (
              <div
                key={p.id}
                className="card-premium"
                style={{ padding: "16px 18px", borderRadius: 12 }}
                data-ocid={`integrations.item.${index + 8}`}
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
                    </div>
                    <div style={{ fontSize: 11, color: "#3D4F63" }}>
                      Integration launching soon
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      padding: "6px 12px",
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#5A6E85",
                      fontWeight: 500,
                    }}
                  >
                    {sc.icon}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

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
        {meeshoWizardOpen && (
          <MeeshoWizard
            open={meeshoWizardOpen}
            onClose={() => setMeeshoWizardOpen(false)}
            onConnected={handleMeeshoConnected}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {alibabaWizardOpen && (
          <AlibabaWizard
            open={alibabaWizardOpen}
            onClose={() => setAlibabaWizardOpen(false)}
            onConnected={handleAlibabaConnected}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {indiamartWizardOpen && (
          <IndiaMartWizard
            open={indiamartWizardOpen}
            onClose={() => setIndiamartWizardOpen(false)}
            onConnected={handleIndiaMartConnected}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {shopifyWizardOpen && (
          <ShopifyWizard
            open={shopifyWizardOpen}
            onClose={() => setShopifyWizardOpen(false)}
            onConnected={handleShopifyConnected}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {ebayWizardOpen && (
          <EbayWizard
            open={ebayWizardOpen}
            onClose={() => setEbayWizardOpen(false)}
            onConnected={handleEbayConnected}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

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
                />{" "}
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
            Syncing orders, inventory, analytics, and pricing in real-time.
          </span>
        </div>
      )}
    </div>
  );
}
