// ============================================================
// app/kamar/[id]/page.tsx — Detail kamar
// ============================================================

import Link from "next/link";
import { notFound } from "next/navigation";
import { getKamarById, getKamars, formatRupiah, getKamarImageUrl } from "@/lib/api";
import type { Kamar } from "@/types";

export async function generateStaticParams() {
  try {
    const kamars = await getKamars();
    return kamars.map((k) => ({ id: String(k.id) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const kamar = await getKamarById(params.id);
  if (!kamar) return { title: "Kamar Tidak Ditemukan — Aurevia Hotel" };
  return {
    title: `${kamar.nama_kamar} — Aurevia Hotel`,
    description: kamar.deskripsi ?? "Detail kamar di Aurevia Hotel",
  };
}

export default async function KamarDetailPage({
  params,
}: {
  params: { id: string };
}) {
  let kamar: Kamar | null = null;

  try {
    kamar = await getKamarById(params.id);
  } catch {
    notFound();
  }

  if (!kamar) notFound();

  const imgUrl = getKamarImageUrl(kamar.foto_url ?? kamar.foto);

  return (
    <main className="min-h-screen bg-[#F7F5F0]" style={{ fontFamily: "'Georgia', serif" }}>

      {/* ── HERO IMAGE ───────────────────────────────────── */}
      <section className="relative bg-[#0C0C0C] overflow-hidden" style={{ height: "520px" }}>
        {kamar.foto ? (
          <img
            src={imgUrl}
            alt={kamar.nama_kamar}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
        ) : (
          <div className="absolute inset-0 bg-[#1a1a1a]" />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/40 to-transparent" />

        {/* Gold lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent opacity-60" />

        {/* Breadcrumb */}
        <div className="absolute top-8 left-0 right-0 z-10">
          <div className="max-w-[1200px] mx-auto px-6">
            <div
              className="flex items-center gap-2 text-xs text-white/40"
              style={{ fontFamily: "sans-serif" }}
            >
              <Link href="/" className="hover:text-[#C9A96E] transition-colors">Beranda</Link>
              <span>/</span>
              <Link href="/kamar" className="hover:text-[#C9A96E] transition-colors">Kamar</Link>
              <span>/</span>
              <span className="text-white/70">{kamar.nama_kamar}</span>
            </div>
          </div>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-12">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="border border-[#C9A96E]/50 bg-[#0C0C0C]/40 backdrop-blur-sm inline-block px-3 py-1 mb-4">
              <p
                className="text-[#C9A96E] text-[9px] tracking-[0.3em] uppercase"
                style={{ fontFamily: "sans-serif" }}
              >
                {kamar.tipe_kamar}
              </p>
            </div>
            <h1
              className="text-white font-light mb-3"
              style={{ fontSize: "clamp(32px, 5vw, 52px)", letterSpacing: "-0.02em" }}
            >
              {kamar.nama_kamar}
            </h1>
            <p className="text-[#C9A96E] text-xl font-light" style={{ fontFamily: "sans-serif" }}>
              {formatRupiah(kamar.harga)}
              <span className="text-white/40 text-sm ml-1">/malam</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-6 py-14">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* ── LEFT: Detail ─────────────────────────────── */}
          <div className="lg:flex-1">

            {/* Deskripsi */}
            {kamar.deskripsi && (
              <div className="mb-10">
                <SectionLabel>Tentang Kamar</SectionLabel>
                <p
                  className="text-[#5A4E44] leading-relaxed text-base"
                  style={{ fontFamily: "sans-serif" }}
                >
                  {kamar.deskripsi}
                </p>
              </div>
            )}

            {/* Fasilitas */}
            {kamar.fasilitas && kamar.fasilitas.length > 0 && (
              <div className="mb-10">
                <SectionLabel>Fasilitas Kamar</SectionLabel>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {kamar.fasilitas.map((f) => (
                    <div
                      key={f.id}
                      className="border border-[#E0D8CE] bg-white px-4 py-3 flex items-center gap-3"
                    >
                      <div className="w-1 h-1 rounded-full bg-[#C9A96E] flex-shrink-0" />
                      <span
                        className="text-[#3A3228] text-sm"
                        style={{ fontFamily: "sans-serif" }}
                      >
                        {f.nama_fasilitas}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {kamar.reviews && kamar.reviews.length > 0 && (
              <div className="mb-10">
                <SectionLabel>Ulasan Tamu</SectionLabel>
                <div className="space-y-4">
                  {kamar.reviews.map((r) => (
                    <div key={r.id} className="border border-[#E0D8CE] bg-white p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {r.foto ? (
                            <img
                              src={r.foto}
                              alt={r.nama}
                              className="w-9 h-9 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-[#E8E2D9] flex items-center justify-center">
                              <span
                                className="text-[#9A8866] text-xs font-medium"
                                style={{ fontFamily: "sans-serif" }}
                              >
                                {r.nama.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div>
                            <p
                              className="text-[#1A1614] text-sm font-medium"
                              style={{ fontFamily: "sans-serif" }}
                            >
                              {r.nama}
                            </p>
                            {r.created_at && (
                              <p
                                className="text-[#9A8866] text-xs"
                                style={{ fontFamily: "sans-serif" }}
                              >
                                {new Date(r.created_at).toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </p>
                            )}
                          </div>
                        </div>
                        {/* Star rating */}
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${i < r.rating ? "text-[#C9A96E]" : "text-[#E0D8CE]"}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      {r.komentar && (
                        <p
                          className="text-[#5A4E44] text-sm leading-relaxed"
                          style={{ fontFamily: "sans-serif" }}
                        >
                          {r.komentar}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Info check-in */}
            <div>
              <SectionLabel>Informasi Menginap</SectionLabel>
              <div className="border border-[#E0D8CE] bg-white divide-y divide-[#E8E2D9]">
                {[
                  ["Check-in mulai", "14:00 WIB"],
                  ["Check-out hingga", "12:00 WIB"],
                  ["Usia minimum tamu", "17 tahun"],
                  ["Hewan peliharaan", "Tidak diizinkan"],
                  ["Pembayaran", "Di hotel saat check-in"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between items-center px-5 py-3.5">
                    <span
                      className="text-[#9A8866] text-sm"
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {label}
                    </span>
                    <span
                      className="text-[#3A3228] text-sm font-medium"
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT: Sticky booking card ───────────────── */}
          <aside className="lg:w-[340px]">
            <div className="sticky top-24 space-y-4">

              {/* Booking card */}
              <div className="bg-[#0C0C0C] text-white p-7">
                <p
                  className="text-[#C9A96E] text-[9px] tracking-[0.35em] uppercase mb-5"
                  style={{ fontFamily: "sans-serif" }}
                >
                  Reservasi Kamar Ini
                </p>

                <div className="mb-6">
                  <p className="text-white/40 text-xs mb-1" style={{ fontFamily: "sans-serif" }}>
                    Harga per malam
                  </p>
                  <p className="text-[#C9A96E] text-3xl font-light">
                    {formatRupiah(kamar.harga)}
                  </p>
                </div>

                <div className="space-y-3 mb-6 text-sm" style={{ fontFamily: "sans-serif" }}>
                  <div className="flex justify-between">
                    <span className="text-white/40">Tipe</span>
                    <span className="text-white/80">{kamar.tipe_kamar}</span>
                  </div>
                  {kamar.fasilitas && kamar.fasilitas.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-white/40">Fasilitas</span>
                      <span className="text-white/80">{kamar.fasilitas.length} item</span>
                    </div>
                  )}
                </div>

                <Link
                  href={`/pesan?kamar_id=${kamar.id}`}
                  className="block w-full bg-[#C9A96E] hover:bg-[#b8955a] text-[#0C0C0C] text-xs font-semibold text-center py-4 tracking-[0.25em] uppercase transition-colors duration-300"
                  style={{ fontFamily: "sans-serif" }}
                >
                  Pesan Sekarang
                </Link>

                <div className="mt-5 pt-5 border-t border-white/10 space-y-2" style={{ fontFamily: "sans-serif" }}>
                  {[
                    "Konfirmasi langsung via email",
                    "Pembayaran di hotel",
                    "Gratis pembatalan 24 jam sebelum",
                  ].map((g) => (
                    <div key={g} className="flex items-center gap-2.5 text-xs text-white/35">
                      <span className="text-[#C9A96E] text-[10px]">✦</span>
                      {g}
                    </div>
                  ))}
                </div>
              </div>

              {/* Back to list */}
              <Link
                href="/kamar"
                className="flex items-center justify-center gap-2 w-full border border-[#C9A96E]/40 text-[#9A8866] text-xs py-4 tracking-[0.2em] uppercase hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-300"
                style={{ fontFamily: "sans-serif" }}
              >
                <span>←</span>
                Semua Kamar
              </Link>

            </div>
          </aside>

        </div>
      </div>

      {/* ── BOTTOM STRIP ─────────────────────────────────── */}
      <div className="bg-[#0C0C0C] py-10 px-6 mt-8">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p
              className="text-[#C9A96E] text-[9px] tracking-[0.35em] uppercase mb-2"
              style={{ fontFamily: "sans-serif" }}
            >
              Butuh Bantuan?
            </p>
            <p className="text-white text-xl font-light">
              Hubungi tim reservasi kami
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4" style={{ fontFamily: "sans-serif" }}>
            <a
              href="tel:+6281382916024"
              className="border border-[#C9A96E]/50 text-[#C9A96E] px-8 py-3 tracking-widest uppercase text-xs hover:bg-[#C9A96E] hover:text-[#0C0C0C] transition-all duration-300"
            >
              +62 813-8291-6024
            </a>
            <a
              href="mailto:ruliffax@gmail.com"
              className="border border-white/20 text-white/60 px-8 py-3 tracking-widest uppercase text-xs hover:border-white/50 hover:text-white transition-all duration-300"
            >
              ruliffax@gmail.com
            </a>
          </div>
        </div>
      </div>

    </main>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-[#C9A96E] text-xs" style={{ fontFamily: "sans-serif" }}>✦</span>
      <h2
        className="text-[11px] tracking-[0.3em] uppercase text-[#9A8866]"
        style={{ fontFamily: "sans-serif" }}
      >
        {children}
      </h2>
      <div className="h-px flex-1 bg-[#E0D8CE]" />
    </div>
  );
}