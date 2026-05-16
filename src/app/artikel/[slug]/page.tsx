// ============================================================
// app/artikel/[slug]/page.tsx — Detail Artikel
// ============================================================

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getArtikelBySlug,
  getArtikels,
  getArtikelImageUrl,
  formatTanggal,
  kategoriLabel,
} from "@/lib/api";
import type { Artikel } from "@/types";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  try {
    const artikels = await getArtikels();
    return artikels.map((a) => ({ slug: a.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props) {
  const artikel = await getArtikelBySlug(params.slug);
  return {
    title: artikel ? `${artikel.judul} — The Redison Blue` : "Artikel Tidak Ditemukan",
  };
}

const kategoriColor: Record<string, string> = {
  promo: "bg-[#FF6B00] text-white",
  info: "bg-blue-500 text-white",
  event: "bg-purple-500 text-white",
};

export default async function ArtikelDetailPage({ params }: Props) {
  const artikel: Artikel | null = await getArtikelBySlug(params.slug);

  if (!artikel) return notFound();

  const imgUrl = getArtikelImageUrl(artikel.thumbnail);

  return (
    <main className="min-h-screen bg-[#F5F4F2]">
      {/* ── Thumbnail hero ──────────────────────────────── */}
      <div className="relative w-full h-72 md:h-96 bg-gray-200">
        <Image
          src={imgUrl}
          alt={artikel.judul}
          fill
          className="object-cover"
          priority
          unoptimized={imgUrl.includes("localhost")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 px-6 max-w-3xl mx-auto">
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide ${
              kategoriColor[artikel.kategori] ?? "bg-gray-500 text-white"
            }`}
          >
            {kategoriLabel[artikel.kategori] ?? artikel.kategori}
          </span>
          <h1 className="text-2xl md:text-4xl font-bold text-white mt-3 leading-tight">
            {artikel.judul}
          </h1>
          <p className="text-gray-300 text-sm mt-2">
            Diterbitkan: {formatTanggal(artikel.published_at)}
          </p>
        </div>
      </div>

      {/* ── Konten artikel ──────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Konten HTML dari Laravel */}
        <div
          className="prose prose-neutral max-w-none prose-headings:text-[#121212] prose-a:text-[#FF6B00] prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: artikel.konten }}
        />

        {/* Navigasi bawah */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
          <Link
            href="/artikel"
            className="inline-flex items-center gap-2 text-[#464646] hover:text-[#FF6B00] text-sm font-medium transition-colors"
          >
            ← Kembali ke Daftar Artikel
          </Link>
          <Link
            href="/pesan"
            className="sm:ml-auto inline-flex items-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors"
          >
            Pesan Kamar Sekarang →
          </Link>
        </div>
      </div>
    </main>
  );
}