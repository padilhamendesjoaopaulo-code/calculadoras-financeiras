import { ImageResponse } from "next/og";
import { SITE_NOME } from "@/lib/site";

export const alt = `${SITE_NOME} — Calculadoras financeiras e trabalhistas`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Imagem usada quando o site é compartilhado em redes sociais e mensageiros.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#064e3b",
          color: "#ffffff",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 24 }}>🧮</div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>
          {SITE_NOME}
        </div>
        <div style={{ fontSize: 36, color: "#a7f3d0", marginTop: 24 }}>
          Rescisão · Férias · 13º · Juros Compostos · Financiamento
        </div>
        <div style={{ fontSize: 28, color: "#d1fae5", marginTop: 40 }}>
          Calculadoras gratuitas, rápidas e em português
        </div>
      </div>
    ),
    { ...size },
  );
}
