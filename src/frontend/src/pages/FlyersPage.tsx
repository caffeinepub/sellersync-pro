import { Download, Image } from "lucide-react";
import { motion } from "motion/react";

const flyers = [
  {
    id: "v1",
    title: "Portrait Flyer",
    description: "800 × 1100 · Print & Social Posts",
    filename: "flyer-sellersync-v1.dim_800x1100.jpg",
    path: "/assets/generated/flyer-sellersync-v1.dim_800x1100.jpg",
    badge: "Portrait",
    badgeColor: "#7C3AED",
  },
  {
    id: "v2",
    title: "Landscape Banner",
    description: "1200 × 700 · Website & LinkedIn Ads",
    filename: "flyer-sellersync-v2.dim_1200x700.jpg",
    path: "/assets/generated/flyer-sellersync-v2.dim_1200x700.jpg",
    badge: "Landscape",
    badgeColor: "#0891B2",
  },
  {
    id: "v3",
    title: "Square Flyer",
    description: "1000 × 1000 · Instagram & WhatsApp",
    filename: "flyer-sellersync-v3.dim_1000x1000.jpg",
    path: "/assets/generated/flyer-sellersync-v3.dim_1000x1000.jpg",
    badge: "Square",
    badgeColor: "#059669",
  },
];

export default function FlyersPage() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-1">
          <div
            className="flex items-center justify-center rounded-lg"
            style={{
              width: 36,
              height: 36,
              background: "linear-gradient(135deg, #F59E0B22, #D9770622)",
              border: "1px solid rgba(245,158,11,0.25)",
            }}
          >
            <Image size={17} color="#F59E0B" />
          </div>
          <div>
            <h1
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#F1F5F9",
                fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
                letterSpacing: "-0.4px",
              }}
            >
              Marketing Flyers
            </h1>
            <p style={{ fontSize: 12, color: "#3D4F63", marginTop: 1 }}>
              Download high-quality flyers for print, digital, and social media
            </p>
          </div>
        </div>
      </motion.div>

      {/* Flyer Grid */}
      <div
        className="grid gap-5"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
      >
        {flyers.map((flyer, idx) => (
          <motion.div
            key={flyer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            data-ocid={`flyers.item.${idx + 1}`}
            style={{
              background: "#0F1117",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14,
              overflow: "hidden",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            className="flyer-card"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(245,158,11,0.35)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 28px rgba(245,158,11,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,255,255,0.07)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            {/* Image Preview */}
            <div
              style={{
                position: "relative",
                background: "#070809",
                height: 200,
                overflow: "hidden",
              }}
            >
              <img
                src={flyer.path}
                alt={flyer.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top",
                  display: "block",
                }}
              />
              {/* Format badge */}
              <span
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.07em",
                  color: "#fff",
                  background: flyer.badgeColor,
                  padding: "3px 9px",
                  borderRadius: 999,
                }}
              >
                {flyer.badge}
              </span>
            </div>

            {/* Info + Download */}
            <div style={{ padding: "14px 16px 16px" }}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#E2E8F0",
                      marginBottom: 3,
                    }}
                  >
                    {flyer.title}
                  </h3>
                  <p style={{ fontSize: 11.5, color: "#3D4F63" }}>
                    {flyer.description}
                  </p>
                </div>

                <a
                  href={flyer.path}
                  download={flyer.filename}
                  data-ocid={`flyers.download_button.${idx + 1}`}
                  className="flex items-center gap-1.5 btn-gold"
                  style={{
                    padding: "7px 14px",
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 700,
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  <Download size={13} />
                  Download
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Download All */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mt-6 flex justify-center"
      >
        <div
          style={{
            background: "#0F1117",
            border: "1px solid rgba(245,158,11,0.2)",
            borderRadius: 12,
            padding: "16px 24px",
            textAlign: "center",
            maxWidth: 500,
          }}
        >
          <p style={{ fontSize: 12, color: "#3D4F63", marginBottom: 12 }}>
            Download all 3 flyers to use across print, web, and social media
            platforms
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            {flyers.map((flyer, idx) => (
              <a
                key={flyer.id}
                href={flyer.path}
                download={flyer.filename}
                data-ocid={`flyers.all_download_button.${idx + 1}`}
                className="flex items-center gap-1.5"
                style={{
                  padding: "6px 13px",
                  borderRadius: 7,
                  fontSize: 11.5,
                  fontWeight: 600,
                  textDecoration: "none",
                  color: "#F59E0B",
                  border: "1px solid rgba(245,158,11,0.3)",
                  background: "rgba(245,158,11,0.07)",
                  whiteSpace: "nowrap",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(245,158,11,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(245,158,11,0.07)";
                }}
              >
                <Download size={11} />
                {flyer.badge}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
