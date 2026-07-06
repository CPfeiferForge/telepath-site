import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SiteNav, SiteFooter, CookieBanner } from "../components/site";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Telepath Technology Solutions | IT Consulting & AI Development",
  description:
    "Full-spectrum IT consulting: AI development, cloud infrastructure, security, data, and fractional CTO leadership for companies that need senior technology depth without adding headcount.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} ${instrumentSerif.className}`}>
        <SiteNav />
        {children}
        <SiteFooter />
        <CookieBanner />
      </body>
    </html>
  );
}
