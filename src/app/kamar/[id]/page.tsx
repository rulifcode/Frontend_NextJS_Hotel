// ============================================================
// app/kamar/[id]/page.tsx — Detail kamar
// 2 kondisi:
//   - Laravel online  → data dari API (dinamis)
//   - Laravel offline → FALLBACK_KAMARS dicari by id (statis)
// ============================================================

import Link from "next/link";
import { notFound } from "next/navigation";
import { getKamarById, getKamars, formatRupiah, getKamarImageUrl } from "@/lib/api";
import type { Kamar } from "@/types";

// ─────────────────────────────────────────────────────────────
// FALLBACK — satu sumber kebenaran, sama dengan kamar/page.tsx
// ─────────────────────────────────────────────────────────────
const FALLBACK_KAMARS: Kamar[] = [
  {
    id: 1,
    nama_kamar: "Deluxe Room",
    tipe_kamar: "Deluxe",
    harga: 450000,
    deskripsi: "Kamar nyaman dengan pemandangan kota yang memukau, dilengkapi fasilitas modern untuk kenyamanan maksimal.",
    foto: null,
    foto_url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200",
    created_at: "",
    updated_at: "",
    fasilitas: [
      { id: 1, kamar_id: 1, nama_fasilitas: "AC", created_at: "", updated_at: "" },
      { id: 2, kamar_id: 1, nama_fasilitas: "WiFi", created_at: "", updated_at: "" },
      { id: 3, kamar_id: 1, nama_fasilitas: "TV", created_at: "", updated_at: "" },
      { id: 4, kamar_id: 1, nama_fasilitas: "Minibar", created_at: "", updated_at: "" },
    ],
    reviews: [
      { id: 1, kamar_id: 1, nama: "Budi Santoso", foto: null, rating: 5, komentar: "Kamar sangat nyaman dan bersih. Pelayanan staff ramah.", created_at: "2026-03-10", updated_at: "2026-03-10" },
      { id: 2, kamar_id: 1, nama: "Siti Rahayu", foto: null, rating: 4, komentar: "Pemandangan kota dari kamar sangat indah, worth it!", created_at: "2026-02-22", updated_at: "2026-02-22" },
    ],
  },
  {
    id: 2,
    nama_kamar: "Superior Room",
    tipe_kamar: "Superior",
    harga: 350000,
    deskripsi: "Kamar standar yang luas dan bersih, cocok untuk perjalanan bisnis maupun keluarga.",
    foto: null,
    foto_url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200",
    created_at: "",
    updated_at: "",
    fasilitas: [
      { id: 5, kamar_id: 2, nama_fasilitas: "AC", created_at: "", updated_at: "" },
      { id: 6, kamar_id: 2, nama_fasilitas: "WiFi", created_at: "", updated_at: "" },
      { id: 7, kamar_id: 2, nama_fasilitas: "TV", created_at: "", updated_at: "" },
    ],
    reviews: [
      { id: 3, kamar_id: 2, nama: "Ahmad Fauzi", foto: null, rating: 4, komentar: "Kamar bersih dan nyaman, lokasi strategis.", created_at: "2026-04-01", updated_at: "2026-04-01" },
    ],
  },
  {
    id: 3,
    nama_kamar: "Suite Room",
    tipe_kamar: "Suite",
    harga: 850000,
    deskripsi: "Suite mewah dengan ruang tamu terpisah dan pemandangan panorama kota dari lantai tinggi.",
    foto: null,
    foto_url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200",
    created_at: "",
    updated_at: "",
    fasilitas: [
      { id: 8,  kamar_id: 3, nama_fasilitas: "AC", created_at: "", updated_at: "" },
      { id: 9,  kamar_id: 3, nama_fasilitas: "WiFi", created_at: "", updated_at: "" },
      { id: 10, kamar_id: 3, nama_fasilitas: "TV", created_at: "", updated_at: "" },
      { id: 11, kamar_id: 3, nama_fasilitas: "Bathtub", created_at: "", updated_at: "" },
      { id: 12, kamar_id: 3, nama_fasilitas: "Minibar", created_at: "", updated_at: "" },
      { id: 13, kamar_id: 3, nama_fasilitas: "Sofa", created_at: "", updated_at: "" },
    ],
    reviews: [
      { id: 4, kamar_id: 3, nama: "Dewi Kusuma", foto: null, rating: 5, komentar: "Luar biasa! Suite-nya sangat mewah dan nyaman.", created_at: "2026-04-15", updated_at: "2026-04-15" },
      { id: 5, kamar_id: 3, nama: "Reza Firmansyah", foto: null, rating: 5, komentar: "Pengalaman menginap terbaik. Bathtub-nya keren!", created_at: "2026-03-28", updated_at: "2026-03-28" },
    ],
  },
  {
    id: 4,
    nama_kamar: "Family Room",
    tipe_kamar: "Family",
    harga: 650000,
    deskripsi: "Kamar luas dengan dua tempat tidur, ideal untuk keluarga dengan anak-anak.",
    foto: null,
    foto_url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200",
    created_at: "",
    updated_at: "",
    fasilitas: [
      { id: 14, kamar_id: 4, nama_fasilitas: "AC", created_at: "", updated_at: "" },
      { id: 15, kamar_id: 4, nama_fasilitas: "WiFi", created_at: "", updated_at: "" },
      { id: 16, kamar_id: 4, nama_fasilitas: "TV", created_at: "", updated_at: "" },
      { id: 17, kamar_id: 4, nama_fasilitas: "Extra Bed", created_at: "", updated_at: "" },
    ],
    reviews: [],
  },
  {
    id: 5,
    nama_kamar: "Executive Room",
    tipe_kamar: "Executive",
    harga: 600000,
    deskripsi: "Kamar eksekutif dengan sentuhan elegan, dilengkapi meja kerja dan akses lounge eksklusif.",
    foto: null,
    foto_url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200",
    created_at: "",
    updated_at: "",
    fasilitas: [
      { id: 18, kamar_id: 5, nama_fasilitas: "AC", created_at: "", updated_at: "" },
      { id: 19, kamar_id: 5, nama_fasilitas: "WiFi", created_at: "", updated_at: "" },
      { id: 20, kamar_id: 5, nama_fasilitas: "TV", created_at: "", updated_at: "" },
      { id: 21, kamar_id: 5, nama_fasilitas: "Lounge Access", created_at: "", updated_at: "" },
      { id: 22, kamar_id: 5, nama_fasilitas: "Desk", created_at: "", updated_at: "" },
    ],
    reviews: [
      { id: 6, kamar_id: 5, nama: "Hendra Wijaya", foto: null, rating: 4, komentar: "Akses lounge-nya sangat worth it untuk perjalanan bisnis.", created_at: "2026-05-01", updated_at: "2026-05-01" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// generateStaticParams — pakai fallback kalau API offline
// ─────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  try {
    const kamars = await getKamars();
    const ids = kamars.length > 0 ? kamars : FALLBACK_KAMARS;
    return ids.map((k) => ({ id: String(k.id) }));
  } catch {
    return FALLBACK_KAMARS.map((k) => ({ id: String(k.id) }));
  }
}

// ─────────────────────────────────────────────────────────────
// generateMetadata
// ─────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: { id: string } }) {
  // Coba API dulu, fallback ke data statis
  let kamar: Kamar | null = null;
  try {
    kamar = await getKamarById(params.id);
  } catch {}

  if (!kamar) {
    kamar = FALLBACK_KAMARS.find((k) => String(k.id) === params.id) ?? null;
  }

  if (!kamar) return { title: "Kamar Tidak Ditemukan — The Redison Blue" };
  return {
    title: `${kamar.nama_kamar} — The Redison Blue`,
    description: kamar.deskripsi ?? "Detail kamar di The Redison Blue",
  };
}

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────
export default async function KamarDetailPage({
  params,
}: {
  params: { id: string };
}) {
  let kamar: Kamar | null = null;
  let isOffline = false;

  // Kondisi 1: coba API Laravel
  try {
    kamar = await getKamarById(params.id);
  } catch {
    isOffline = true;
  }

  // Kondisi 2: API gagal atau return null → cari di fallback
  if (!kamar) {
    kamar = FALLBACK_KAMARS.find((k) => String(k.id) === params.id) ?? null;
    isOffline = true;
  }

  // ID tidak ada di API maupun fallback → 404
  if (!kamar) notFound();

  const imgUrl = getKamarImageUrl(kamar.foto_url ?? kamar.foto);
  const hasImage = !!(kamar.foto_url ?? kamar.foto);

  return (
    <main className="min-h-screen bg-[#F7F5F0]" style={{ fontFamily: "'Georgia', serif" }}>

      {/* ── HERO IMAGE ───────────────────────────────────── */}
      <section className="relative bg-[#0C0C0C] overflow-hidden" style={{ height: "520px" }}>
        {hasImage ? (
          <img
            src={imgUrl}
            alt={kamar.nama_kamar}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
        ) : (
          <div className="absolute inset-0 bg-[#1a1a1a]" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/40 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent opacity-60" />

        {/* Breadcrumb */}
        <div className="absolute top-8 left-0 right-0 z-10">
          <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-white/40" style={{ fontFamily: "sans-serif" }}>
              <Link href="/" className="hover:text-[#C9A96E] transition-colors">Beranda</Link>
              <span>/</span>
              <Link href="/kamar" className="hover:text-[#C9A96E] transition-colors">Kamar</Link>
              <span>/</span>
              <span className="text-white/70">{kamar.nama_kamar}</span>
            </div>

            {/* Dev badge */}
            {process.env.NODE_ENV === "development" && (
              <div
                className={`inline-flex items-center gap-2 text-[11px] font-mono px-3 py-1 rounded-full border
                  ${isOffline
                    ? "text-amber-400 border-amber-500/40 bg-amber-500/10"
                    : "text-green-400 border-green-500/40 bg-green-500/10"
                  }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isOffline ? "bg-amber-400" : "bg-green-400"}`} />
                {isOffline ? "offline — fallback" : "live — API"}
              </div>
            )}
          </div>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-12">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="border border-[#C9A96E]/50 bg-[#0C0C0C]/40 backdrop-blur-sm inline-block px-3 py-1 mb-4">
              <p className="text-[#C9A96E] text-[9px] tracking-[0.3em] uppercase" style={{ fontFamily: "sans-serif" }}>
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

            {kamar.deskripsi && (
              <div className="mb-10">
                <SectionLabel>Tentang Kamar</SectionLabel>
                <p className="text-[#5A4E44] leading-relaxed text-base" style={{ fontFamily: "sans-serif" }}>
                  {kamar.deskripsi}
                </p>
              </div>
            )}

            {kamar.fasilitas && kamar.fasilitas.length > 0 && (
              <div className="mb-10">
                <SectionLabel>Fasilitas Kamar</SectionLabel>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {kamar.fasilitas.map((f) => (
                    <div key={f.id} className="border border-[#E0D8CE] bg-white px-4 py-3 flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-[#C9A96E] flex-shrink-0" />
                      <span className="text-[#3A3228] text-sm" style={{ fontFamily: "sans-serif" }}>
                        {f.nama_fasilitas}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {kamar.reviews && kamar.reviews.length > 0 && (
              <div className="mb-10">
                <SectionLabel>Ulasan Tamu</SectionLabel>
                <div className="space-y-4">
                  {kamar.reviews.map((r) => (
                    <div key={r.id} className="border border-[#E0D8CE] bg-white p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {r.foto ? (
                            <img src={r.foto} alt={r.nama} className="w-9 h-9 rounded-full object-cover" />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-[#E8E2D9] flex items-center justify-center">
                              <span className="text-[#9A8866] text-xs font-medium" style={{ fontFamily: "sans-serif" }}>
                                {r.nama.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div>
                            <p className="text-[#1A1614] text-sm font-medium" style={{ fontFamily: "sans-serif" }}>
                              {r.nama}
                            </p>
                            {r.created_at && (
                              <p className="text-[#9A8866] text-xs" style={{ fontFamily: "sans-serif" }}>
                                {new Date(r.created_at).toLocaleDateString("id-ID", {
                                  day: "numeric", month: "long", year: "numeric",
                                })}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-sm ${i < r.rating ? "text-[#C9A96E]" : "text-[#E0D8CE]"}`}>★</span>
                          ))}
                        </div>
                      </div>
                      {r.komentar && (
                        <p className="text-[#5A4E44] text-sm leading-relaxed" style={{ fontFamily: "sans-serif" }}>
                          {r.komentar}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                    <span className="text-[#9A8866] text-sm" style={{ fontFamily: "sans-serif" }}>{label}</span>
                    <span className="text-[#3A3228] text-sm font-medium" style={{ fontFamily: "sans-serif" }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT: Sticky booking card ───────────────── */}
          <aside className="lg:w-[340px]">
            <div className="sticky top-24 space-y-4">
              <div className="bg-[#0C0C0C] text-white p-7">
                <p className="text-[#C9A96E] text-[9px] tracking-[0.35em] uppercase mb-5" style={{ fontFamily: "sans-serif" }}>
                  Reservasi Kamar Ini
                </p>
                <div className="mb-6">
                  <p className="text-white/40 text-xs mb-1" style={{ fontFamily: "sans-serif" }}>Harga per malam</p>
                  <p className="text-[#C9A96E] text-3xl font-light">{formatRupiah(kamar.harga)}</p>
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
                  {["Konfirmasi langsung via email", "Pembayaran di hotel", "Gratis pembatalan 24 jam sebelum"].map((g) => (
                    <div key={g} className="flex items-center gap-2.5 text-xs text-white/35">
                      <span className="text-[#C9A96E] text-[10px]">✦</span>
                      {g}
                    </div>
                  ))}
                </div>
              </div>

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
            <p className="text-[#C9A96E] text-[9px] tracking-[0.35em] uppercase mb-2" style={{ fontFamily: "sans-serif" }}>
              Butuh Bantuan?
            </p>
            <p className="text-white text-xl font-light">Hubungi tim reservasi kami</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4" style={{ fontFamily: "sans-serif" }}>
            <a href="tel:+6281382916024" className="border border-[#C9A96E]/50 text-[#C9A96E] px-8 py-3 tracking-widest uppercase text-xs hover:bg-[#C9A96E] hover:text-[#0C0C0C] transition-all duration-300">
              +62 813-8291-6024
            </a>
            <a href="mailto:ruliffax@gmail.com" className="border border-white/20 text-white/60 px-8 py-3 tracking-widest uppercase text-xs hover:border-white/50 hover:text-white transition-all duration-300">
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
      <h2 className="text-[11px] tracking-[0.3em] uppercase text-[#9A8866]" style={{ fontFamily: "sans-serif" }}>
        {children}
      </h2>
      <div className="h-px flex-1 bg-[#E0D8CE]" />
    </div>
  );
}