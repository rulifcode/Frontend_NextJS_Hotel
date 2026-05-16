// ============================================================
// app/artikel/page.tsx — Daftar Artikel & Promo
// ============================================================

import Image from "next/image";
import Link from "next/link";
import { getArtikels, getArtikelImageUrl, formatTanggal, kategoriLabel } from "@/lib/api";
import type { Artikel } from "@/types";

export const metadata = {
  title: "Artikel & Promo — The Redison Blue",
  description: "Berita terbaru, promo, dan event dari The Redison Blue.",
};

const kategoriColor: Record<string, string> = {
  promo: "bg-[#FF6B00] text-white",
  info: "bg-blue-500 text-white",
  event: "bg-purple-500 text-white",
};

export default async function ArtikelPage() {
  let artikels: Artikel[] = [];
  let error = false;

  try {
    artikels = await getArtikels();
  } catch {
    error = true;
  }

  return (
    <main className="min-h-screen bg-[#F5F4F2]">
      {/* ── Hero kecil ───────────────────────────────────── */}
      <section className="bg-[#121212] text-white py-20 px-6 text-center">
        <p className="text-[#FF6B00] text-sm font-semibold uppercase tracking-widest mb-3">
          Berita &amp; Promo
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Artikel</h1>
        <p className="text-gray-400 max-w-xl mx-auto text-sm">
          Temukan penawaran spesial, event, dan informasi terbaru dari kami.
        </p>
      </section>

      {/* ── Grid artikel ─────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        {error && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🔌</p>
            <p className="text-lg">Gagal memuat artikel. Periksa koneksi ke API.</p>
          </div>
        )}

        {!error && artikels.length === 0 && (
          <p className="text-center text-gray-400 py-20">Belum ada artikel tersedia.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artikels.map((artikel) => (
            <ArtikelCard key={artikel.id} artikel={artikel} />
          ))}
        </div>
      </section>
    </main>
  );
}

function ArtikelCard({ artikel }: { artikel: Artikel }) {
  const imgUrl = getArtikelImageUrl(artikel.thumbnail);

  return (
    <Link href={`/artikel/${artikel.slug}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
        {/* Thumbnail */}
        <div className="relative h-48 bg-gray-100 overflow-hidden">
          <Image
            src={imgUrl}
            alt={artikel.judul}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized={imgUrl.includes("localhost")}
          />
          {/* Badge kategori */}
          <span
            className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide ${
              kategoriColor[artikel.kategori] ?? "bg-gray-500 text-white"
            }`}
          >
            {kategoriLabel[artikel.kategori] ?? artikel.kategori}
          </span>
        </div>

        {/* Konten */}
        <div className="p-5">
          <p className="text-xs text-gray-400 mb-2">{formatTanggal(artikel.published_at)}</p>
          <h2 className="font-bold text-[#121212] text-base leading-snug mb-2 group-hover:text-[#FF6B00] transition-colors line-clamp-2">
            {artikel.judul}
          </h2>
          {/* Preview konten (stripping HTML sederhana) */}
          <p className="text-[#464646] text-sm line-clamp-3">
            {stripHtml(artikel.konten)}
          </p>
          <p className="text-[#FF6B00] text-sm font-semibold mt-4 group-hover:underline">
            Baca Selengkapnya →
          </p>
        </div>
      </div>
    </Link>
  );
}

/** Strip HTML tags untuk preview */
function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}