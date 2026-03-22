import { Bot, QrCode, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface UpiPaymentBotProps {
  trialExpired: boolean;
  isSubscribed: boolean;
  onOpenUpi: () => void;
}

export default function UpiPaymentBot({
  trialExpired,
  isSubscribed,
  onOpenUpi,
}: UpiPaymentBotProps) {
  const [open, setOpen] = useState(false);

  if (!trialExpired || isSubscribed) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9998,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 10,
      }}
    >
      {/* Chat bubble */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.93 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            data-ocid="upi_bot.panel"
            style={{
              width: 240,
              background: "linear-gradient(160deg, #0D0F17 0%, #090B11 100%)",
              border: "1px solid rgba(245,158,11,0.22)",
              borderRadius: 16,
              padding: "18px 16px 16px",
              boxShadow:
                "0 24px 80px rgba(0,0,0,0.8), 0 0 40px rgba(245,158,11,0.06)",
            }}
          >
            {/* Close button */}
            <button
              type="button"
              data-ocid="upi_bot.close_button"
              onClick={() => setOpen(false)}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                background: "rgba(255,255,255,0.05)",
                border: "none",
                borderRadius: "50%",
                width: 22,
                height: 22,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#5A6E85",
                transition: "background 0.15s",
              }}
            >
              <X size={12} />
            </button>

            {/* Title */}
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#F59E0B",
                marginBottom: 8,
                fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
                letterSpacing: "-0.2px",
              }}
            >
              💳 Payment Assistant
            </div>

            {/* Message */}
            <p
              style={{
                fontSize: 12,
                color: "#7B8FA0",
                lineHeight: 1.55,
                marginBottom: 14,
              }}
            >
              Hi! Your trial has ended. Pay instantly via UPI — just scan the QR
              code below to subscribe!
            </p>

            {/* Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <button
                type="button"
                data-ocid="upi_bot.scan_qr_button"
                onClick={() => {
                  setOpen(false);
                  onOpenUpi();
                }}
                style={{
                  width: "100%",
                  padding: "9px 0",
                  borderRadius: 9,
                  background: "linear-gradient(90deg, #F59E0B, #D97706)",
                  border: "none",
                  color: "#0A0800",
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  letterSpacing: "0.01em",
                }}
              >
                <QrCode size={13} />
                Scan QR Code
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bot avatar button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "relative" }}
      >
        {/* Pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.55, 1], opacity: [0.4, 0, 0.4] }}
          transition={{
            duration: 2.2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            inset: -6,
            borderRadius: "50%",
            border: "1.5px solid rgba(245,158,11,0.5)",
            pointerEvents: "none",
          }}
        />
        <button
          type="button"
          data-ocid="upi_bot.toggle"
          onClick={() => setOpen((v) => !v)}
          style={{
            width: 46,
            height: 46,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow:
              "0 8px 32px rgba(245,158,11,0.45), 0 2px 8px rgba(0,0,0,0.6)",
          }}
        >
          <Bot size={20} color="#0A0800" />
        </button>
      </motion.div>
    </div>
  );
}
