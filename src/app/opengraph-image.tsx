import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Printing Zone Oman — commercial printing, packaging & large format in Muscat";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 32, opacity: 0.8, letterSpacing: 2 }}>PRINTING ZONE OMAN</div>
        <div style={{ fontSize: 64, fontWeight: 700, marginTop: 24, lineHeight: 1.1 }}>
          Commercial printing, packaging &amp; large format
        </div>
        <div style={{ fontSize: 28, marginTop: 24, opacity: 0.9 }}>Seeb, Muscat — Sultanate of Oman</div>
      </div>
    ),
    size,
  );
}
