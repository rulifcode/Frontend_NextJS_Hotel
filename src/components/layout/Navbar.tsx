"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
        scrolled
          ? "bg-[#121212]/95 backdrop-blur-sm shadow-[0_2px_20px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] w-full mx-auto px-12 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-2 h-2 rounded-full bg-[#FF6B00] transition-transform duration-200 group-hover:scale-125" />
          <div className="leading-[1.15]">
            <p className="text-[10px] text-white/55 font-light tracking-[0.25em] uppercase">The</p>
            <p className="text-white text-[13px] font-bold tracking-[0.12em]">Redison Blue</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {[
            { label: "Home",     href: "/" },
            { label: "Services", href: "/pesan" },
            { label: "About us", href: "#" },
            { label: "Room",     href: "/kamar" },
            { label: "Contact",  href: "#" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative text-white/80 hover:text-white text-[13px] font-medium transition-colors duration-200 group"
            >
              {item.label}
              {/* Underline oranye on hover */}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#FF6B00] transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* ── CTA (desktop) ── */}
        {/* Sesuai Figma: border putih, teks putih — bukan border hitam */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/pesan"
            className="border border-white/65 text-white text-[13px] font-semibold px-7 py-2.5 tracking-wide hover:bg-[#FF6B00] hover:border-[#FF6B00] transition-all duration-200"
          >
            Book Now
          </Link>
        </div>

        {/* ── Hamburger (mobile) ── */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 p-1"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-white transition-all duration-200 ${open ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`block w-5 h-px bg-white transition-all duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-white transition-all duration-200 ${open ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </div>

      {/* ── Mobile dropdown ── */}
      {open && (
        <div className="absolute top-[72px] left-0 right-0 md:hidden bg-[#121212] border-t border-white/10 px-6 pb-6">
          {[
            { label: "Home",     href: "/" },
            { label: "Services", href: "/pesan" },
            { label: "About us", href: "#" },
            { label: "Room",     href: "/kamar" },
            { label: "Contact",  href: "#" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block py-3.5 text-[13px] text-white/75 hover:text-white border-b border-white/5 last:border-0 transition-colors"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/pesan"
            className="mt-4 block text-center border border-white/40 text-white text-[13px] font-semibold px-6 py-3 hover:bg-[#FF6B00] hover:border-[#FF6B00] transition-all"
            onClick={() => setOpen(false)}
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}