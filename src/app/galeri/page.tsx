// ============================================================
// app/galeri/page.tsx — Galeri Foto Hotel
// ============================================================

import Image from "next/image";
import { getGaleris, getGaleriImageUrl } from "@/lib/api";
import type { Galeri } from "@/types";

export const metadata = {
  title: "Galeri — The Redison Blue",
  description: "Lihat koleksi foto hotel The Redison Blue.",
};

export default async function GaleriPage() {
  let galeris: Galeri[] = [];
  let error = false;

  try {
    galeris = await getGaleris();
  } catch {
    error = true;
  }

  return (
    <main className="min-h-screen bg-[#F5F4F2]">
      {/* ── Hero kecil ────────────────────────────────────── */}
      <section className="bg-[#121212] text-white py-20 px-6 text-center">
        <p className="text-[#FF6B00] text-sm font-semibold uppercase tracking-widest mb-3">
          Foto &amp; Video
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Galeri Hotel</h1>
        <p className="text-gray-400 max-w-xl mx-auto text-sm">
          Sekilas pandang suasana dan fasilitas The Redison Blue.
        </p>
      </section>

      {/* ── Grid galeri ─────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        {error && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🔌</p>
            <p className="text-lg">Gagal memuat galeri. Periksa koneksi ke API.</p>
          </div>
        )}

        {!error && galeris.length === 0 && (
          <p className="text-center text-gray-400 py-20">Belum ada foto tersedia.</p>
        )}

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {galeris.map((item, idx) => (
            <GaleriItem key={item.id} item={item} index={idx} />
          ))}
        </div>
      </section>
    </main>
  );
}

function GaleriItem({ item, index }: { item: Galeri; index: number }) {
  const imgUrl = getGaleriImageUrl(item.foto);
  const hasPhoto = !!item.foto;

  // Variasi tinggi agar tampak masonry
  const heights = ["h-52", "h-64", "h-72", "h-56", "h-80", "h-60"];
  const h = heights[index % heights.length];

  return (
    <div className={`break-inside-avoid rounded-2xl overflow-hidden shadow-sm group relative ${h} bg-gray-200`}>
      {hasPhoto ? (
        <Image
          src={imgUrl}
          alt={item.judul}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized={imgUrl.includes("localhost")}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <span className="text-4xl">🏨</span>
        </div>
      )}

      {/* Overlay label */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white font-semibold text-sm">{item.judul}</p>
        </div>
      </div>
    </div>
  );
}