import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Omorewa Yomi Godwin — Founder, Pacesetter Tutorial";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#0A1F44",
          color: "white",
          padding: "64px",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", color: "#D4AF37", fontSize: 22, letterSpacing: 3 }}>
          PACESETTER TUTORIAL · EKPAN, WARRI
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", fontSize: 64, lineHeight: 1.05, maxWidth: 980 }}>
            Demystifying Science & Mathematics.
          </div>
          <div style={{ display: "flex", width: 120, height: 6, background: "#0F9D58" }} />
        </div>
        <div style={{ display: "flex", fontSize: 28 }}>
          Omorewa Yomi Godwin · Founder, Pacesetter Tutorial
        </div>
      </div>
    ),
    { ...size },
  );
}
