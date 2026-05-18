"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getGaleris, getGaleriImageUrl } from "@/lib/api";
import type { Galeri } from "@/types";

const FALLBACK_GALERI: Galeri[] = [
  { id: 1, judul: "Deluxe Room",    foto: null, foto_url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800", created_at: "", updated_at: "" },
  { id: 2, judul: "Superior Room",  foto: null, foto_url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800", created_at: "", updated_at: "" },
  { id: 3, judul: "Suite Room",     foto: null, foto_url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800", created_at: "", updated_at: "" },
  { id: 4, judul: "Family Room",    foto: null, foto_url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800", created_at: "", updated_at: "" },
  { id: 5, judul: "Executive Room", foto: null, foto_url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800", created_at: "", updated_at: "" },
];

const GUEST_MAP: Record<number, number> = { 1: 2, 2: 2, 3: 3, 4: 4, 5: 2 };

function resolveImageUrl(item: Galeri): string {
  if (item.foto_url) return item.foto_url;
  if (item.foto) return getGaleriImageUrl(item.foto);
  return "";
}

export default function RoomSection() {
  const [galeri, setGaleri] = useState<Galeri[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    getGaleris()
      .then((data) => {
        const result = data.slice(0, 5);
        setGaleri(result.length > 0 ? result : FALLBACK_GALERI);
        setIsOffline(result.length === 0);
      })
      .catch(() => {
        setGaleri(FALLBACK_GALERI);
        setIsOffline(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="room" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#F8F8F8]">
      <div className="max-w-6xl mx-auto">

        {/* TITLE */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[#9A9A9A] text-sm mb-2">Our Room</p>
          <h2
            className="font-bold text-[#121212] leading-tight"
            style={{ fontSize: "clamp(34px,5vw,54px)" }}
          >
            A World Of <span className="text-[#FF6B00]">Choice</span>
          </h2>
          <p className="text-[#8A8A8A] text-sm leading-relaxed max-w-xl mx-auto mt-4">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do
            amet sint. Velit officia consequat.
          </p>
        </div>

        {/* DEV BADGE */}
        {process.env.NODE_ENV === "development" && !loading && (
          <div
            className={`text-center mb-6 text-[11px] font-mono px-3 py-1 inline-flex items-center gap-2 rounded-full border mx-auto w-fit
              ${isOffline
                ? "text-amber-600 border-amber-300 bg-amber-50"
                : "text-green-600 border-green-300 bg-green-50"
              }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isOffline ? "bg-amber-500" : "bg-green-500"}`} />
            {isOffline ? "offline — fallback data" : "live — data dari API"}
          </div>
        )}

        {/* SKELETON */}
        {loading && (
          <>
            {/* Desktop skeleton */}
            <div className="hidden lg:grid grid-cols-[1fr_1.3fr_1fr] gap-8 items-start animate-pulse">
              <div className="space-y-8">
                <div className="h-[240px] bg-[#E4E4E4]" />
                <div className="h-[240px] bg-[#E4E4E4]" />
              </div>
              <div className="h-[540px] bg-[#E4E4E4]" />
              <div className="space-y-8">
                <div className="h-[240px] bg-[#E4E4E4]" />
                <div className="h-[240px] bg-[#E4E4E4]" />
              </div>
            </div>
            {/* Mobile skeleton */}
            <div className="grid grid-cols-2 gap-3 lg:hidden animate-pulse">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-[180px] bg-[#E4E4E4]" />
              ))}
            </div>
          </>
        )}

        {/* LOADED */}
        {!loading && (
          <>
            {/* DESKTOP — asymmetric 3-col */}
            <div className="hidden lg:grid grid-cols-[1fr_1.3fr_1fr] gap-8 items-start">
              <div className="space-y-8">
                {galeri[0] && <Card item={galeri[0]} height="h-[240px]" />}
                {galeri[1] && <Card item={galeri[1]} height="h-[240px]" />}
              </div>
              <div>
                {galeri[2] && <Card item={galeri[2]} height="h-[540px]" big />}
              </div>
              <div className="space-y-8">
                {galeri[3] && <Card item={galeri[3]} height="h-[240px]" />}
                {galeri[4] && <Card item={galeri[4]} height="h-[240px]" />}
              </div>
            </div>

            {/* MOBILE — 2×2 grid (card ke-5 full-width di bawah) */}
            <div className="lg:hidden">
              <div className="grid grid-cols-2 gap-3">
                {galeri.slice(0, 4).map((item) => (
                  <Card key={item.id} item={item} height="h-[180px]" />
                ))}
              </div>
              {galeri[4] && (
                <div className="mt-3">
                  <Card item={galeri[4]} height="h-[180px]" />
                </div>
              )}
            </div>
          </>
        )}

        {/* CTA */}
        <div className="flex flex-col items-center mt-14 sm:mt-16 gap-4">
          <p className="text-[#9A9A9A] text-sm">
            Temukan kamar yang sempurna untuk Anda
          </p>
          <Link
            href="/kamar"
            className="group inline-flex items-center gap-3 border border-[#121212] text-[#121212] text-[13px] font-semibold px-8 sm:px-10 py-4 tracking-widest uppercase hover:bg-[#FF6B00] hover:border-[#FF6B00] hover:text-white transition-all duration-300"
          >
            Explore All Rooms
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}

// ─── CARD ───────────────────────────────────────────────────
function Card({ item, height, big = false }: { item: Galeri; height: string; big?: boolean }) {
  const imgSrc = resolveImageUrl(item);
  const guests = GUEST_MAP[item.id] ?? 2;

  return (
    <div className="group">
      <div className={`relative overflow-hidden bg-[#ECECEC] ${height}`}>
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={item.judul}
            fill
            className="object-cover group-hover:scale-105 transition duration-700"
            sizes="(max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#BDBDBD] text-sm">
            No Image
          </div>
        )}
      </div>
      <div className="pt-2 sm:pt-3">
        <p className="text-[10px] sm:text-[11px] uppercase font-semibold tracking-wide text-[#A8A8A8] mb-0.5 sm:mb-1">
          {guests} Guests
        </p>
        <h3
          className={`font-bold text-[#121212] leading-tight ${
            big ? "text-[38px]" : "text-[16px] sm:text-[22px]"
          }`}
        >
          {item.judul}
        </h3>
      </div>
    </div>
  );
}