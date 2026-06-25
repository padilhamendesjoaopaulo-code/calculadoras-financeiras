import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_NOME, BASE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${SITE_NOME} — Calculadoras financeiras e trabalhistas grátis`,
    template: `%s | ${SITE_NOME}`,
  },
  description:
    "Calculadoras gratuitas de rescisão CLT, férias, 13º salário, juros compostos e financiamento. Rápidas, simples e em português.",
  keywords: [
    "calculadora financeira",
    "calculadora trabalhista",
    "rescisão CLT",
    "férias",
    "13º salário",
    "juros compostos",
    "financiamento",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE_NOME,
    url: BASE_URL,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#059669",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-slate-50">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
