import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "The Redison Blue - Hotel Premium",
  description: "Nikmati pengalaman menginap terbaik di The Redison Blue",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-[#F5F4F2] text-[#121212] antialiased">
        <Navbar/>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}