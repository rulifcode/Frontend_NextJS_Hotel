import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

// Set NEXT_PUBLIC_SITE_URL di Vercel dashboard setelah deploy
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  // ── Title ──────────────────────────────────────────────
  title: {
    default: "Aurevia – Hotel Premium",
    template: "%s – Aurevia",
  },

  // ── Basic ───────────────────────────────────────────────
  description:
    "Nikmati pengalaman menginap terbaik di Aurevia. Kamar mewah, fasilitas lengkap, dan pelayanan prima di jantung kota.",
  keywords: [
    "aurevia",
    "aurevia hotel",
    "hotel premium",
    "hotel bandung",
    "kamar hotel",
    "reservasi hotel",
    "menginap",
    "hotel mewah",
    "suite room",
    "deluxe room",
  ],
  authors: [{ name: "Aurevia" }],
  publisher: "Aurevia",
  creator: "Aurevia",

  // ── Canonical & Robots ─────────────────────────────────
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Open Graph ─────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: "Aurevia",
    title: "Aurevia – Hotel Premium",
    description:
      "Nikmati pengalaman menginap terbaik di Aurevia. Kamar mewah, fasilitas lengkap, dan pelayanan prima.",
    images: [
      {
        url: "/og-image.jpg", // taruh di /public/og-image.jpg (1200x630px)
        width: 1200,
        height: 630,
        alt: "Aurevia Hotel",
      },
    ],
  },

  // ── Twitter Card ───────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Aurevia – Hotel Premium",
    description: "Nikmati pengalaman menginap terbaik di Aurevia.",
    images: ["/og-image.jpg"],
  },

  // ── Favicon / Icons ────────────────────────────────────
  icons: {
    icon: [{ url: "/Aurevia_logo.png", type: "image/png" }],
    apple: [{ url: "/Aurevia_logo.png", type: "image/png" }],
    shortcut: "/Aurevia_logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-[#F5F4F2] text-[#121212] antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}