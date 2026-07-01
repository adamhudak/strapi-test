import type { Metadata } from "next";
import { Archivo, Public_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getNastaveniaWebu } from "@/lib/strapi";

const archivo = Archivo({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-archivo" });
const archivoExpanded = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo-expanded",
});
const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-public-sans",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "MURAVO — Stavebné materiály",
  description:
    "MURAVO dodáva betón, murivo, výstuž a izolácie s certifikátom a technickým poradenstvom od projektu po kolaudáciu.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getNastaveniaWebu().catch(() => null);

  return (
    <html lang="sk" className={`${archivo.variable} ${archivoExpanded.variable} ${publicSans.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Header settings={settings} />
        {children}
        <Footer settings={settings} />
      </body>
    </html>
  );
}
