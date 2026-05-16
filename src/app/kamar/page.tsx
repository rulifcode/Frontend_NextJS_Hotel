// ============================================================
// app/kamar/page.tsx — Katalog semua kamar
// ============================================================

import Link from "next/link";
import { getKamars, formatRupiah, getKamarImageUrl } from "@/lib/api";
import type { Kamar } from "@/types";

export const metadata = {
  title: "Kamar & Suite — Aurevia Hotel",
  description: "Temukan kamar terbaik sesuai kebutuhan Anda di Aurevia Hotel.",
};

export default async function KamarPage() {
  let kamars: Kamar[] = [];
  let error = false;

  try {
    kamars = await getKamars();
  } catch {
    error = true;
  }

  return (
    <main className="min-h-screen bg-[#F7F5F0]" style={{ fontFamily: "'Georgia', serif" }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative bg-[#0C0C0C] overflow-hidden" style={{ height: "320px" }}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent opacity-40" />

        {/* Decorative lines */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-px bg-white"
              style={{ left: `${(i + 1) * 12.5}%` }}
            />
          ))}
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase mb-5">
            ✦ &nbsp; Aurevia Hotel &nbsp; ✦
          </p>
          <h1
            className="text-white font-light mb-4"
            style={{ fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "-0.02em" }}
          >
            Kamar & Suite
          </h1>
          <p
            className="text-white/45 text-sm max-w-md leading-relaxed"
            style={{ fontFamily: "sans-serif" }}
          >
            Setiap kamar dirancang untuk memberikan pengalaman menginap yang tak terlupakan
          </p>
        </div>
      </section>

      {/* ── BREADCRUMB ───────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-6 py-5">
        <div className="flex items-center gap-2 text-xs text-[#9A8866]" style={{ fontFamily: "sans-serif" }}>
          <Link href="/" className="hover:text-[#C9A96E] transition-colors">Beranda</Link>
          <span>/</span>
          <span className="text-[#3A3228]">Kamar & Suite</span>
        </div>
      </div>

      {/* ── CONTENT ──────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-20">

        {/* Error state */}
        {error && (
          <div className="text-center py-24 border border-[#E0D8CE] bg-white">
            <div className="w-12 h-px bg-[#C9A96E] mx-auto mb-6" />
            <p className="text-[#9A8866] text-sm tracking-widest uppercase mb-2" style={{ fontFamily: "sans-serif" }}>
              Koneksi Gagal
            </p>
            <p className="text-[#3A3228] text-base" style={{ fontFamily: "sans-serif" }}>
              Gagal memuat data kamar. Periksa koneksi ke API.
            </p>
          </div>
        )}

        {/* Empty state */}
        {!error && kamars.length === 0 && (
          <div className="text-center py-24 border border-[#E0D8CE] bg-white">
            <div className="w-12 h-px bg-[#C9A96E] mx-auto mb-6" />
            <p className="text-[#9A8866] text-sm" style={{ fontFamily: "sans-serif" }}>
              Belum ada kamar tersedia saat ini.
            </p>
          </div>
        )}

        {/* Grid kamar */}
        {kamars.length > 0 && (
          <>
            <p
              className="text-[#9A8866] text-[11px] tracking-[0.3em] uppercase mb-8"
              style={{ fontFamily: "sans-serif" }}
            >
              {kamars.length} kamar tersedia
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kamars.map((kamar, idx) => (
                <KamarCard key={kamar.id} kamar={kamar} index={idx} />
              ))}
            </div>
          </>
        )}

      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────── */}
      <div className="bg-[#0C0C0C] py-14 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p
              className="text-[#C9A96E] text-[9px] tracking-[0.35em] uppercase mb-2"
              style={{ fontFamily: "sans-serif" }}
            >
              Siap untuk menginap?
            </p>
            <p className="text-white text-2xl font-light">
              Reservasi sekarang, bayar di hotel
            </p>
          </div>
          <Link
            href="/pesan"
            className="border border-[#C9A96E]/60 text-[#C9A96E] text-xs font-medium px-10 py-4 tracking-[0.25em] uppercase hover:bg-[#C9A96E] hover:text-[#0C0C0C] transition-all duration-300"
            style={{ fontFamily: "sans-serif" }}
          >
            Book Now
          </Link>
        </div>
      </div>

    </main>
  );
}

function KamarCard({ kamar, index }: { kamar: Kamar; index: number }) {
  const imgUrl = getKamarImageUrl(kamar.foto_url ?? kamar.foto);

  return (
    <div className="group bg-white border border-[#E8E2D9] hover:border-[#C9A96E]/50 transition-all duration-300 overflow-hidden">

      {/* Image */}
      <div className="relative overflow-hidden bg-[#1a1a1a]" style={{ height: "240px" }}>
        {kamar.foto ? (
          <img
            src={imgUrl}
            alt={kamar.nama_kamar}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-white/20 text-xs tracking-widest uppercase" style={{ fontFamily: "sans-serif" }}>
              No Image
            </p>
          </div>
        )}

        {/* Tipe badge */}
        <div className="absolute top-4 left-4 border border-[#C9A96E]/70 bg-[#0C0C0C]/60 backdrop-blur-sm px-3 py-1">
          <p className="text-[#C9A96E] text-[9px] tracking-[0.25em] uppercase" style={{ fontFamily: "sans-serif" }}>
            {kamar.tipe_kamar}
          </p>
        </div>

        {/* Index number */}
        <div className="absolute bottom-4 right-4 text-white/20 font-light" style={{ fontFamily: "'Georgia', serif", fontSize: "48px", lineHeight: 1 }}>
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h2
          className="text-[#1A1614] text-xl font-light mb-2 group-hover:text-[#C9A96E] transition-colors duration-300"
          style={{ letterSpacing: "-0.01em" }}
        >
          {kamar.nama_kamar}
        </h2>

        {kamar.deskripsi && (
          <p
            className="text-[#9A8866] text-sm leading-relaxed mb-4 line-clamp-2"
            style={{ fontFamily: "sans-serif" }}
          >
            {kamar.deskripsi}
          </p>
        )}

        {/* Fasilitas */}
        {kamar.fasilitas && kamar.fasilitas.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {kamar.fasilitas.slice(0, 4).map((f) => (
              <span
                key={f.id}
                className="text-[10px] border border-[#E0D8CE] text-[#9A8866] px-2.5 py-1 tracking-wider uppercase"
                style={{ fontFamily: "sans-serif" }}
              >
                {f.nama_fasilitas}
              </span>
            ))}
            {kamar.fasilitas.length > 4 && (
              <span
                className="text-[10px] border border-[#E0D8CE] text-[#C9A96E] px-2.5 py-1 tracking-wider uppercase"
                style={{ fontFamily: "sans-serif" }}
              >
                +{kamar.fasilitas.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Harga + CTA */}
        <div className="flex items-end justify-between pt-5 border-t border-[#E8E2D9]">
          <div>
            <p
              className="text-[9px] text-[#9A8866] tracking-[0.2em] uppercase mb-1"
              style={{ fontFamily: "sans-serif" }}
            >
              Mulai dari
            </p>
            <p className="text-[#C9A96E] font-semibold text-lg" style={{ fontFamily: "'Georgia', serif" }}>
              {formatRupiah(kamar.harga)}
              <span className="text-[#9A8866] font-normal text-xs ml-1" style={{ fontFamily: "sans-serif" }}>
                /malam
              </span>
            </p>
          </div>
          <Link
            href={`/kamar/${kamar.id}`}
            className="text-[10px] tracking-[0.2em] uppercase border border-[#0C0C0C] text-[#0C0C0C] px-5 py-2.5 hover:bg-[#0C0C0C] hover:text-white transition-all duration-300"
            style={{ fontFamily: "sans-serif" }}
          >
            Lihat Detail
          </Link>
        </div>
      </div>
    </div>
  );
}