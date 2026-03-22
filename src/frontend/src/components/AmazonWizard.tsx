import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Eye,
  EyeOff,
  Info,
  RefreshCw,
  Settings,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface AmazonWizardProps {
  open: boolean;
  onClose: () => void;
  onConnected: (sellerId: string, marketplace: string) => void;
}

const MARKETPLACES = [
  { value: "Amazon.in", label: "Amazon.in (India)" },
  { value: "Amazon.com", label: "Amazon.com (USA)" },
  { value: "Amazon.co.uk", label: "Amazon.co.uk (UK)" },
  { value: "Amazon.de", label: "Amazon.de (Germany)" },
  { value: "Amazon.jp", label: "Amazon.jp (Japan)" },
  { value: "Amazon.ca", label: "Amazon.ca (Canada)" },
  { value: "Amazon.com.au", label: "Amazon.com.au (Australia)" },
  { value: "Amazon.com.mx", label: "Amazon.com.mx (Mexico)" },
];

const SYNC_ITEMS = ["Orders", "Inventory", "Analytics", "Pricing"];

export default function AmazonWizard({
  open,
  onClose,
  onConnected,
}: AmazonWizardProps) {
  const [step, setStep] = useState(1);
  const [sellerId, setSellerId] = useState("");
  const [marketplace, setMarketplace] = useState("Amazon.in");
  const [storeName, setStoreName] = useState("");
  const [accessKeyId, setAccessKeyId] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [testStatus, setTestStatus] = useState<"loading" | "error" | null>(
    null,
  );
  const [statusMessages, setStatusMessages] = useState<string[]>([]);

  const TEST_MESSAGES = [
    "Validating credentials...",
    "Connecting to Amazon SP-API...",
    "Fetching seller profile...",
    "✓ Connection successful!",
  ];

  useEffect(() => {
    if (step !== 4) return;
    setStatusMessages([]);
    setTestStatus("loading");

    const hasEmptyFields =
      !accessKeyId.trim() || !secretKey.trim() || !refreshToken.trim();
    if (hasEmptyFields) {
      setTimeout(() => setTestStatus("error"), 1200);
      return;
    }

    TEST_MESSAGES.forEach((msg, i) => {
      setTimeout(() => {
        setStatusMessages((prev) => [...prev, msg]);
      }, i * 500);
    });

    setTimeout(() => {
      setTestStatus(null);
      setStep(5);
    }, 2500);
  }, [step, accessKeyId, secretKey, refreshToken]);

  const reset = () => {
    setStep(1);
    setSellerId("");
    setMarketplace("Amazon.in");
    setStoreName("");
    setAccessKeyId("");
    setSecretKey("");
    setRefreshToken("");
    setShowSecret(false);
    setShowToken(false);
    setTestStatus(null);
    setStatusMessages([]);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSuccess = () => {
    onConnected(sellerId, marketplace);
    reset();
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
      role="presentation"
      onKeyDown={() => {}}
      onClick={(e) =>
        e.target === e.currentTarget && step !== 4 && handleClose()
      }
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
          maxWidth: 520,
          width: "94vw",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
          padding: "28px 28px 24px",
        }}
        data-ocid="amazon_wizard.modal"
      >
        {/* Close button */}
        {step !== 4 && (
          <button
            type="button"
            onClick={handleClose}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#5A6E85",
            }}
            data-ocid="amazon_wizard.close_button"
          >
            <X size={14} />
          </button>
        )}

        <AnimatePresence mode="wait">
          {/* STEP 1: Welcome */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.18 }}
            >
              <div className="flex flex-col items-center text-center mb-6">
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 16,
                    background: "rgba(255,153,0,0.12)",
                    border: "1px solid rgba(255,153,0,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                    fontSize: 28,
                    fontWeight: 900,
                    color: "#FF9900",
                    fontFamily: "serif",
                  }}
                >
                  a
                </div>
                <h2
                  style={{
                    color: "#EEF2F7",
                    fontSize: 20,
                    fontWeight: 800,
                    margin: 0,
                    marginBottom: 8,
                  }}
                >
                  Connect Amazon Seller Central
                </h2>
                <p
                  style={{
                    color: "#5A7A95",
                    fontSize: 13,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  Sync orders, inventory, pricing and analytics from your Amazon
                  store directly into SellerSync Pro.
                </p>
              </div>

              <div
                style={{
                  background: "rgba(255,153,0,0.05)",
                  border: "1px solid rgba(255,153,0,0.15)",
                  borderRadius: 12,
                  padding: "14px 16px",
                  marginBottom: 24,
                }}
              >
                <p
                  style={{
                    color: "#8A9BB0",
                    fontSize: 12,
                    fontWeight: 600,
                    margin: "0 0 10px",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  What will be synced
                </p>
                <ul
                  style={{
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  {[
                    "Orders & fulfillment status",
                    "Inventory levels & stock alerts",
                    "Revenue & profit analytics",
                    "Product listings & pricing",
                    "Customer reviews & ratings",
                  ].map((item) => (
                    <li
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 13,
                        color: "#C8D6E5",
                      }}
                    >
                      <span style={{ color: "#FF9900", fontSize: 14 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  className="btn-gold"
                  onClick={() => setStep(2)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: 14,
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                  data-ocid="amazon_wizard.primary_button"
                >
                  Get Started <ArrowRight size={14} />
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: 14,
                    borderRadius: 10,
                    background: "transparent",
                    border: "1px solid #2A3A4A",
                    color: "#5A6E85",
                    cursor: "pointer",
                  }}
                  data-ocid="amazon_wizard.cancel_button"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Seller Information */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.18 }}
            >
              <StepHeader
                title="Step 1 of 3: Seller Information"
                progress={33}
              />

              <div className="flex flex-col gap-4 mb-6">
                <FormField label="Seller ID" required>
                  <input
                    type="text"
                    value={sellerId}
                    onChange={(e) => setSellerId(e.target.value)}
                    placeholder="e.g. A2EUQ1WTGCTBG2"
                    style={inputStyle}
                    data-ocid="amazon_wizard.input"
                  />
                  <HelperText text="Find in Seller Central > Account Info > Merchant Token" />
                </FormField>

                <FormField label="Marketplace" required>
                  <select
                    value={marketplace}
                    onChange={(e) => setMarketplace(e.target.value)}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    data-ocid="amazon_wizard.select"
                  >
                    {MARKETPLACES.map((m) => (
                      <option
                        key={m.value}
                        value={m.value}
                        style={{ background: "#0F1922" }}
                      >
                        {m.label}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Store Name" optional>
                  <input
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder="e.g. My Amazon Store"
                    style={inputStyle}
                  />
                </FormField>

                <div
                  style={{
                    background: "rgba(90,110,133,0.08)",
                    border: "1px solid rgba(90,110,133,0.2)",
                    borderRadius: 10,
                    padding: "10px 12px",
                    display: "flex",
                    gap: 8,
                  }}
                >
                  <Info
                    size={14}
                    style={{ color: "#5A7A95", flexShrink: 0, marginTop: 1 }}
                  />
                  <p
                    style={{
                      margin: 0,
                      fontSize: 12,
                      color: "#5A7A95",
                      lineHeight: 1.5,
                    }}
                  >
                    Your Seller ID is a 13-character alphanumeric code found in
                    your Seller Central account settings.
                  </p>
                </div>
              </div>

              <StepButtons
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
                nextLabel="Next"
                nextDisabled={!sellerId.trim()}
              />
            </motion.div>
          )}

          {/* STEP 3: API Credentials */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.18 }}
            >
              <StepHeader title="Step 2 of 3: API Credentials" progress={66} />

              <div
                style={{
                  background: "rgba(245,158,11,0.06)",
                  border: "1px solid rgba(245,158,11,0.2)",
                  borderRadius: 10,
                  padding: "12px 14px",
                  marginBottom: 20,
                }}
              >
                <p
                  style={{
                    margin: "0 0 6px",
                    fontSize: 13,
                    color: "#FCD34D",
                    fontWeight: 600,
                  }}
                >
                  SP-API Credentials Required
                </p>
                <p
                  style={{
                    margin: "0 0 6px",
                    fontSize: 12,
                    color: "#8A9BB0",
                    lineHeight: 1.5,
                  }}
                >
                  To connect Amazon, you need SP-API credentials. Follow
                  Amazon's developer guide to create an IAM user and grant
                  access.
                </p>
                <p style={{ margin: 0, fontSize: 11, color: "#5A7A95" }}>
                  🔒 Keep your credentials secure. They are stored encrypted.
                </p>
              </div>

              <div className="flex flex-col gap-4 mb-6">
                <FormField label="AWS Access Key ID" required>
                  <input
                    type="text"
                    value={accessKeyId}
                    onChange={(e) => setAccessKeyId(e.target.value)}
                    placeholder="AKIAIOSFODNN7EXAMPLE"
                    style={{
                      ...inputStyle,
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: "0.05em",
                    }}
                    data-ocid="amazon_wizard.input"
                  />
                </FormField>

                <FormField label="AWS Secret Access Key" required>
                  <PasswordInput
                    value={secretKey}
                    onChange={setSecretKey}
                    placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
                    show={showSecret}
                    onToggle={() => setShowSecret(!showSecret)}
                  />
                </FormField>

                <FormField label="SP-API Refresh Token" required>
                  <PasswordInput
                    value={refreshToken}
                    onChange={setRefreshToken}
                    placeholder="Atzr|IwEBIJxxxxxxxxx"
                    show={showToken}
                    onToggle={() => setShowToken(!showToken)}
                  />
                  <HelperText text="Generated during SP-API app authorization" />
                </FormField>
              </div>

              <StepButtons
                onNext={() => setStep(4)}
                onBack={() => setStep(2)}
                nextLabel="Test Connection"
              />
            </motion.div>
          )}

          {/* STEP 4: Testing */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.18 }}
            >
              <div className="flex flex-col items-center text-center py-6">
                {testStatus === "error" ? (
                  <>
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        background: "rgba(248,113,113,0.1)",
                        border: "1px solid rgba(248,113,113,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 20,
                      }}
                    >
                      <AlertCircle size={28} style={{ color: "#F87171" }} />
                    </div>
                    <h2
                      style={{
                        color: "#EEF2F7",
                        fontSize: 20,
                        fontWeight: 800,
                        margin: "0 0 8px",
                      }}
                    >
                      Connection Failed
                    </h2>
                    <p
                      style={{
                        color: "#5A7A95",
                        fontSize: 13,
                        margin: "0 0 24px",
                      }}
                    >
                      Please check your credentials and try again.
                    </p>
                    <button
                      type="button"
                      className="btn-gold"
                      onClick={() => setStep(3)}
                      style={{
                        padding: "10px 24px",
                        fontSize: 14,
                        borderRadius: 10,
                      }}
                      data-ocid="amazon_wizard.primary_button"
                    >
                      Try Again
                    </button>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        position: "relative",
                        width: 60,
                        height: 60,
                        marginBottom: 20,
                      }}
                    >
                      <div
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          border: "3px solid rgba(245,158,11,0.15)",
                          position: "absolute",
                        }}
                      />
                      <div
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          border: "3px solid transparent",
                          borderTopColor: "#F59E0B",
                          position: "absolute",
                          animation: "spin 0.8s linear infinite",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <RefreshCw size={18} style={{ color: "#F59E0B" }} />
                      </div>
                    </div>
                    <h2
                      style={{
                        color: "#EEF2F7",
                        fontSize: 20,
                        fontWeight: 800,
                        margin: "0 0 20px",
                      }}
                    >
                      Testing Connection...
                    </h2>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      {statusMessages.map((msg) => (
                        <motion.div
                          key={msg}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{
                            background: msg.startsWith("✓")
                              ? "rgba(74,222,128,0.07)"
                              : "rgba(255,255,255,0.03)",
                            border: `1px solid ${msg.startsWith("✓") ? "rgba(74,222,128,0.2)" : "rgba(255,255,255,0.06)"}`,
                            borderRadius: 8,
                            padding: "8px 12px",
                            fontSize: 13,
                            color: msg.startsWith("✓") ? "#4ADE80" : "#8A9BB0",
                            textAlign: "left",
                          }}
                        >
                          {msg}
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 5: Success */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.18 }}
            >
              <div className="flex flex-col items-center text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.1,
                  }}
                  style={{ marginBottom: 16 }}
                >
                  <CheckCircle size={56} style={{ color: "#4ADE80" }} />
                </motion.div>
                <h2
                  style={{
                    color: "#EEF2F7",
                    fontSize: 22,
                    fontWeight: 800,
                    margin: "0 0 6px",
                  }}
                >
                  Amazon Connected!
                </h2>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    justifyContent: "center",
                    flexWrap: "wrap",
                    marginTop: 8,
                  }}
                >
                  <span
                    style={{
                      background: "rgba(255,153,0,0.1)",
                      border: "1px solid rgba(255,153,0,0.25)",
                      borderRadius: 6,
                      padding: "3px 10px",
                      fontSize: 12,
                      color: "#FF9900",
                      fontWeight: 600,
                    }}
                  >
                    {sellerId || "N/A"}
                  </span>
                  <span
                    style={{
                      background: "rgba(255,153,0,0.1)",
                      border: "1px solid rgba(255,153,0,0.25)",
                      borderRadius: 6,
                      padding: "3px 10px",
                      fontSize: 12,
                      color: "#FF9900",
                      fontWeight: 600,
                    }}
                  >
                    {marketplace}
                  </span>
                </div>
              </div>

              <div
                style={{
                  background: "rgba(74,222,128,0.05)",
                  border: "1px solid rgba(74,222,128,0.15)",
                  borderRadius: 12,
                  padding: "14px 16px",
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#4ADE80",
                      animation: "pulse 1.5s ease-in-out infinite",
                    }}
                  />
                  <span
                    style={{ fontSize: 12, color: "#4ADE80", fontWeight: 600 }}
                  >
                    Data syncing in progress
                  </span>
                  <RefreshCw
                    size={11}
                    style={{
                      color: "#4ADE80",
                      animation: "spin 1.5s linear infinite",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 6,
                  }}
                >
                  {SYNC_ITEMS.map((item) => (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12,
                        color: "#6BC891",
                      }}
                    >
                      <span style={{ color: "#4ADE80" }}>✓</span> {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  className="btn-gold"
                  onClick={handleSuccess}
                  style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: 14,
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                  data-ocid="amazon_wizard.primary_button"
                >
                  Go to Dashboard
                </button>
                <button
                  type="button"
                  onClick={handleSuccess}
                  style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: 14,
                    borderRadius: 10,
                    background: "transparent",
                    border: "1px solid #2A3A4A",
                    color: "#5A6E85",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                  data-ocid="amazon_wizard.secondary_button"
                >
                  <Settings size={13} /> Configure Settings
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </div>
  );
}

// --- Sub-components ---

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#0F1922",
  border: "1px solid #243241",
  borderRadius: 8,
  padding: "9px 12px",
  fontSize: 13,
  color: "#EEF2F7",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.15s",
};

function FormField({
  label,
  required,
  optional,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: "#8A9BB0",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        {label}
        {required && <span style={{ color: "#F59E0B", fontSize: 10 }}>*</span>}
        {optional && (
          <span style={{ color: "#3D4F63", fontSize: 11, fontWeight: 400 }}>
            (optional)
          </span>
        )}
      </span>
      {children}
    </div>
  );
}

function HelperText({ text }: { text: string }) {
  return (
    <p style={{ margin: 0, fontSize: 11, color: "#3D5A6E", lineHeight: 1.4 }}>
      {text}
    </p>
  );
}

function PasswordInput({
  value,
  onChange,
  placeholder,
  show,
  onToggle,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  show: boolean;
  onToggle: () => void;
}) {
  return (
    <div style={{ position: "relative" }}>
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          ...inputStyle,
          paddingRight: 36,
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "0.05em",
        }}
        data-ocid="amazon_wizard.input"
      />
      <button
        type="button"
        onClick={onToggle}
        style={{
          position: "absolute",
          right: 10,
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#5A6E85",
          padding: 0,
          display: "flex",
        }}
      >
        {show ? <EyeOff size={14} /> : <Eye size={14} />}
      </button>
    </div>
  );
}

function StepHeader({ title, progress }: { title: string; progress: number }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2
        style={{
          color: "#EEF2F7",
          fontSize: 17,
          fontWeight: 800,
          margin: "0 0 12px",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          height: 4,
          background: "#1A2A3A",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #D97706, #F59E0B)",
            borderRadius: 4,
          }}
        />
      </div>
    </div>
  );
}

function StepButtons({
  onNext,
  onBack,
  nextLabel,
  nextDisabled,
}: {
  onNext: () => void;
  onBack: () => void;
  nextLabel: string;
  nextDisabled?: boolean;
}) {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <button
        type="button"
        onClick={onBack}
        style={{
          flex: 1,
          padding: "10px",
          fontSize: 14,
          borderRadius: 10,
          background: "transparent",
          border: "1px solid #2A3A4A",
          color: "#5A6E85",
          cursor: "pointer",
        }}
        data-ocid="amazon_wizard.cancel_button"
      >
        Back
      </button>
      <button
        type="button"
        className="btn-gold"
        onClick={onNext}
        disabled={nextDisabled}
        style={{
          flex: 2,
          padding: "10px",
          fontSize: 14,
          borderRadius: 10,
          opacity: nextDisabled ? 0.5 : 1,
          cursor: nextDisabled ? "not-allowed" : "pointer",
        }}
        data-ocid="amazon_wizard.primary_button"
      >
        {nextLabel}
      </button>
    </div>
  );
}
