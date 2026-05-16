"use client";

// ============================================================
// app/pesan/page.tsx — Form Reservasi Publik (Elegant Redesign)
// ============================================================

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getKamars, getBanners, createPesanan, formatRupiah, hitungTotal } from "@/lib/api";
import type { Kamar, Pesanan, Banner } from "@/types";

interface FormState {
  kamar_id: string;
  nama_pemesan: string;
  email_pemesan: string;
  hp_pemesan: string;
  nama_tamu: string;
  cek_in: string;
  cek_out: string;
  jml_kamar: string;
}

const initialForm: FormState = {
  kamar_id: "",
  nama_pemesan: "",
  email_pemesan: "",
  hp_pemesan: "",
  nama_tamu: "",
  cek_in: "",
  cek_out: "",
  jml_kamar: "1",
};

function today(): string {
  return new Date().toISOString().split("T")[0];
}
function tomorrow(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

// Fallback jika API banner belum ada
const FALLBACK_BANNERS: Banner[] = [
  { id: 1, judul: "Lobby", tipe: "image", src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80", media: null, link: null, aktif: true, urutan: 1, created_at: "", updated_at: "" },
  { id: 2, judul: "Room",  tipe: "image", src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80", media: null, link: null, aktif: true, urutan: 2, created_at: "", updated_at: "" },
  { id: 3, judul: "Pool",  tipe: "image", src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80", media: null, link: null, aktif: true, urutan: 3, created_at: "", updated_at: "" },
  { id: 4, judul: "Suite", tipe: "image", src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80", media: null, link: null, aktif: true, urutan: 4, created_at: "", updated_at: "" },
];

export default function PesanPage() {
  const searchParams = useSearchParams();

  const [kamars, setKamars]   = useState<Kamar[]>([]);
  const [banners, setBanners] = useState<Banner[]>(FALLBACK_BANNERS);
  const [activeIdx, setActiveIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [form, setForm] = useState<FormState>({
    ...initialForm,
    kamar_id: searchParams.get("kamar_id") ?? "",
    cek_in: today(),
    cek_out: tomorrow(),
  });
  const [errors, setErrors]   = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  // Load kamar
  useEffect(() => {
    getKamars().then(setKamars).catch(() => {});
  }, []);

  // Consume Banner API (sorted by urutan, only aktif)
  useEffect(() => {
    getBanners()
      .then((data) => {
        const aktif = data
          .filter((b) => b.aktif)
          .sort((a, b) => a.urutan - b.urutan);
        if (aktif.length > 0) setBanners(aktif);
      })
      .catch(() => {});
  }, []);

  // Auto-advance — video banners wait for ended event, images rotate every 5s
  useEffect(() => {
    const current = banners[activeIdx % banners.length];
    if (!current) return;

    if (current.tipe === "video") {
      // Let the video's onEnded handler advance
      return;
    }

    const t = setInterval(
      () => setActiveIdx((p) => (p + 1) % banners.length),
      5000
    );
    return () => clearInterval(t);
  }, [banners, activeIdx]);

  // When activeIdx changes to a video, play it
  useEffect(() => {
    const current = banners[activeIdx % banners.length];
    if (current?.tipe === "video" && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [activeIdx, banners]);



  const selectedKamar = kamars.find((k) => String(k.id) === form.kamar_id);
  const malamCount =
    form.cek_in && form.cek_out && form.cek_out > form.cek_in
      ? Math.round(
          (new Date(form.cek_out).getTime() - new Date(form.cek_in).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;
  const totalHarga =
    selectedKamar && malamCount > 0
      ? hitungTotal(
          selectedKamar.harga,
          form.cek_in,
          form.cek_out,
          parseInt(form.jml_kamar) || 1
        )
      : null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.kamar_id) e.kamar_id = "Pilih kamar terlebih dahulu.";
    if (!form.nama_pemesan.trim()) e.nama_pemesan = "Nama pemesan wajib diisi.";
    if (!form.email_pemesan.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      e.email_pemesan = "Format email tidak valid.";
    if (!form.hp_pemesan.match(/^[0-9]{9,15}$/))
      e.hp_pemesan = "Nomor HP tidak valid (9–15 digit).";
    if (!form.nama_tamu.trim()) e.nama_tamu = "Nama tamu wajib diisi.";
    if (!form.cek_in) e.cek_in = "Tanggal check-in wajib diisi.";
    if (!form.cek_out) e.cek_out = "Tanggal check-out wajib diisi.";
    if (form.cek_in && form.cek_out && form.cek_out <= form.cek_in)
      e.cek_out = "Check-out harus setelah check-in.";
    if (parseInt(form.jml_kamar) < 1) e.jml_kamar = "Minimal 1 kamar.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setApiError("");
    if (!validate()) return;
    setLoading(true);
    const payload: Pesanan = {
      kamar_id: parseInt(form.kamar_id),
      nama_pemesan: form.nama_pemesan.trim(),
      email_pemesan: form.email_pemesan.trim(),
      hp_pemesan: form.hp_pemesan.trim(),
      nama_tamu: form.nama_tamu.trim(),
      cek_in: form.cek_in,
      cek_out: form.cek_out,
      jml_kamar: parseInt(form.jml_kamar),
    };
    try {
      const res = await createPesanan(payload);
      if (res.errors) {
        const mapped: Record<string, string> = {};
        for (const [key, msgs] of Object.entries(res.errors as Record<string, string[]>)) {
          mapped[key] = msgs[0];
        }
        setErrors(mapped);
      } else {
        setSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      setApiError("Terjadi kesalahan. Pastikan server API aktif dan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  // ── Success ──────────────────────────────────────────────
  if (success) {
    return (
      <main className="min-h-screen bg-[#0C0C0C] flex items-center justify-center px-6 py-20">
        <div className="relative max-w-md w-full text-center">
          {/* Gold ring */}
          <div className="w-24 h-24 mx-auto mb-8 relative">
            <div className="absolute inset-0 rounded-full border-2 border-[#C9A96E] opacity-30 animate-ping" />
            <div className="w-24 h-24 rounded-full border border-[#C9A96E]/60 flex items-center justify-center">
              <svg className="w-10 h-10 text-[#C9A96E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <p className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase mb-3">Reservasi Diterima</p>
          <h2 className="text-white text-3xl font-light mb-4" style={{ fontFamily: "'Georgia', serif" }}>
            Terima kasih, {form.nama_pemesan}
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mb-10">
            Konfirmasi reservasi akan segera dikirimkan ke{" "}
            <span className="text-white/80">{form.email_pemesan}</span>
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/kamar"
              className="block w-full bg-[#C9A96E] text-[#0C0C0C] text-sm font-semibold py-4 tracking-widest uppercase hover:bg-[#b8955a] transition-colors"
            >
              Lihat Kamar Lain
            </Link>
            <Link
              href="/"
              className="block w-full border border-white/15 text-white/60 text-sm py-4 tracking-widest uppercase hover:border-white/40 hover:text-white transition-colors"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ── Main ─────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-[#F7F5F0]" style={{ fontFamily: "'Georgia', serif" }}>

      {/* ── HERO BANNER ─────────────────────────────────── */}
      <section className="relative bg-[#0C0C0C] overflow-hidden" style={{ height: "340px" }}>
        {/* BG media — image/gif/video */}
        {banners.map((b, i) => {
          const isActive = i === activeIdx % banners.length;
          if (b.tipe === "video") {
            return (
              <video
                key={b.id}
                ref={isActive ? videoRef : undefined}
                muted
                playsInline
                onEnded={() => setActiveIdx((p) => (p + 1) % banners.length)}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                style={{ opacity: isActive ? 0.35 : 0 }}
              >
                <source src={b.src} />
              </video>
            );
          }
          return (
            <div
              key={b.id}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
              style={{
                backgroundImage: `url('${b.src}')`,
                opacity: isActive ? 0.35 : 0,
              }}
            />
          );
        })}
        {/* Gold line top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent opacity-60" />
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase mb-5">
            ✦ &nbsp; Aurevia Hotel &nbsp; ✦
          </p>
          <h1
            className="text-white text-5xl font-light mb-4 leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Buat Reservasi
          </h1>
          <p className="text-white/45 text-sm max-w-sm leading-relaxed tracking-wide" style={{ fontFamily: "sans-serif" }}>
            Isi formulir di bawah ini dan tim kami akan mempersiapkan segalanya untuk kedatangan Anda
          </p>
        </div>
        {/* Gold line bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent opacity-40" />
        {/* Dot indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.slice(0, 5).map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`w-1 h-1 rounded-full transition-all duration-300 ${
                i === activeIdx % banners.length ? "bg-[#C9A96E] w-4" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ── MAIN CONTENT ────────────────────────────────── */}
      <div className="max-w-[1240px] mx-auto px-6 py-14">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── LEFT: FORM 60% ──────────────────────────── */}
          <div className="lg:w-[60%]">
            <form onSubmit={handleSubmit} className="space-y-6">
              {apiError && (
                <div className="border border-red-300/50 bg-red-50 text-red-700 text-sm p-4 rounded">
                  {apiError}
                </div>
              )}

              {/* Section: Pilih Kamar */}
              <ElegantSection label="01" title="Pilih Kamar">
                <ElegantField label="Tipe Kamar" error={errors.kamar_id} required>
                  <select
                    name="kamar_id"
                    value={form.kamar_id}
                    onChange={handleChange}
                    className={elegantInput(!!errors.kamar_id)}
                  >
                    <option value="">— Pilih kamar —</option>
                    {kamars.map((k) => (
                      <option key={k.id} value={String(k.id)}>
                        {k.nama_kamar} · {formatRupiah(k.harga)} / malam
                      </option>
                    ))}
                  </select>
                </ElegantField>
              </ElegantSection>

              {/* Section: Data Pemesan */}
              <ElegantSection label="02" title="Data Pemesan">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <ElegantField label="Nama Lengkap Pemesan" error={errors.nama_pemesan} required>
                    <input
                      type="text" name="nama_pemesan" value={form.nama_pemesan}
                      onChange={handleChange} placeholder="John Doe"
                      className={elegantInput(!!errors.nama_pemesan)}
                    />
                  </ElegantField>
                  <ElegantField label="Nama Tamu yang Menginap" error={errors.nama_tamu} required>
                    <input
                      type="text" name="nama_tamu" value={form.nama_tamu}
                      onChange={handleChange} placeholder="Boleh sama dengan pemesan"
                      className={elegantInput(!!errors.nama_tamu)}
                    />
                  </ElegantField>
                  <ElegantField label="Alamat Email" error={errors.email_pemesan} required>
                    <input
                      type="email" name="email_pemesan" value={form.email_pemesan}
                      onChange={handleChange} placeholder="email@contoh.com"
                      className={elegantInput(!!errors.email_pemesan)}
                    />
                  </ElegantField>
                  <ElegantField label="Nomor HP / WhatsApp" error={errors.hp_pemesan} required>
                    <input
                      type="tel" name="hp_pemesan" value={form.hp_pemesan}
                      onChange={handleChange} placeholder="08123456789"
                      className={elegantInput(!!errors.hp_pemesan)}
                    />
                  </ElegantField>
                </div>
              </ElegantSection>

              {/* Section: Jadwal */}
              <ElegantSection label="03" title="Jadwal Menginap">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <ElegantField label="Check-in" error={errors.cek_in} required>
                    <input
                      type="date" name="cek_in" value={form.cek_in} min={today()}
                      onChange={(e) => {
                        handleChange(e);
                        if (form.cek_out <= e.target.value) {
                          const d = new Date(e.target.value);
                          d.setDate(d.getDate() + 1);
                          setForm((p) => ({ ...p, cek_out: d.toISOString().split("T")[0] }));
                        }
                      }}
                      className={elegantInput(!!errors.cek_in)}
                    />
                  </ElegantField>
                  <ElegantField label="Check-out" error={errors.cek_out} required>
                    <input
                      type="date" name="cek_out" value={form.cek_out}
                      min={form.cek_in || tomorrow()}
                      onChange={handleChange}
                      className={elegantInput(!!errors.cek_out)}
                    />
                  </ElegantField>
                  <ElegantField label="Jumlah Kamar" error={errors.jml_kamar} required>
                    <input
                      type="number" name="jml_kamar" value={form.jml_kamar}
                      min={1} max={10} onChange={handleChange}
                      className={elegantInput(!!errors.jml_kamar)}
                    />
                  </ElegantField>
                </div>
              </ElegantSection>

              {/* Summary inline (mobile only) */}
              {selectedKamar && (
                <div className="lg:hidden bg-[#0C0C0C] text-white p-5 rounded">
                  <p className="text-[#C9A96E] text-[10px] tracking-[0.3em] uppercase mb-3">Ringkasan</p>
                  <div className="space-y-2 text-sm" style={{ fontFamily: "sans-serif" }}>
                    <Row label="Kamar" value={selectedKamar.nama_kamar} />
                    <Row label="Harga/malam" value={formatRupiah(selectedKamar.harga)} />
                    {malamCount > 0 && <Row label="Lama inap" value={`${malamCount} malam`} />}
                    {totalHarga && (
                      <div className="pt-2 mt-2 border-t border-white/10 flex justify-between font-semibold">
                        <span>Total</span>
                        <span className="text-[#C9A96E]">{formatRupiah(totalHarga)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0C0C0C] hover:bg-[#1a1a1a] disabled:bg-[#555] text-white text-sm font-medium py-5 tracking-[0.25em] uppercase transition-colors duration-300 flex items-center justify-center gap-3"
                style={{ fontFamily: "sans-serif" }}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin" />
                    Memproses Reservasi...
                  </>
                ) : (
                  <>
                    <span className="text-[#C9A96E]">✦</span>
                    Kirim Reservasi
                    <span className="text-[#C9A96E]">✦</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* ── RIGHT: IMAGE + INFO 40% ──────────────────── */}
          <aside className="lg:w-[40%] flex flex-col gap-6">

            {/* Banner media card */}
            <div className="relative overflow-hidden bg-[#0C0C0C]" style={{ height: "320px" }}>
              {banners.map((b, i) => {
                const isActive = i === activeIdx % banners.length;
                if (b.tipe === "video") {
                  return (
                    <video
                      key={b.id}
                      muted
                      playsInline
                      loop
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                      style={{ opacity: isActive ? 1 : 0 }}
                    >
                      <source src={b.src} />
                    </video>
                  );
                }
                return (
                  <div
                    key={b.id}
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                    style={{
                      backgroundImage: `url('${b.src}')`,
                      opacity: isActive ? 1 : 0,
                    }}
                  />
                );
              })}
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-transparent" />
              {/* Badge + tipe indicator */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="border border-[#C9A96E]/60 px-3 py-1">
                  <p className="text-[#C9A96E] text-[9px] tracking-[0.3em] uppercase" style={{ fontFamily: "sans-serif" }}>
                    Aurevia Hotel
                  </p>
                </div>
                {banners[activeIdx % banners.length]?.tipe === "video" && (
                  <div className="bg-[#C9A96E]/20 border border-[#C9A96E]/40 px-2 py-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
                    <p className="text-[#C9A96E] text-[9px] tracking-widest uppercase" style={{ fontFamily: "sans-serif" }}>Video</p>
                  </div>
                )}
              </div>
              {/* Thumbnail strip */}
              <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                {banners.slice(0, 4).map((b, i) => (
                  <button
                    key={b.id}
                    onClick={() => setActiveIdx(i)}
                    className={`flex-1 h-12 relative overflow-hidden transition-all duration-300 ${
                      i === activeIdx % banners.length
                        ? "ring-1 ring-[#C9A96E] opacity-100"
                        : "opacity-50 hover:opacity-75"
                    }`}
                    style={{
                      backgroundImage: b.tipe !== "video" ? `url('${b.src}')` : undefined,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundColor: b.tipe === "video" ? "#1a1a1a" : undefined,
                    }}
                  >
                    {b.tipe === "video" && (
                      <span className="absolute inset-0 flex items-center justify-center text-[#C9A96E] text-xs">▶</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Ringkasan Pesanan */}
            <div className="bg-[#0C0C0C] text-white p-7">
              <p className="text-[#C9A96E] text-[9px] tracking-[0.35em] uppercase mb-5" style={{ fontFamily: "sans-serif" }}>
                Ringkasan Pesanan
              </p>
              {selectedKamar ? (
                <div className="space-y-3 text-sm" style={{ fontFamily: "sans-serif" }}>
                  <Row label="Kamar" value={selectedKamar.nama_kamar} />
                  <Row label="Tipe" value={selectedKamar.tipe_kamar} />
                  <Row label="Harga / malam" value={formatRupiah(selectedKamar.harga)} />
                  {malamCount > 0 && <Row label="Lama menginap" value={`${malamCount} malam`} />}
                  <Row label="Jumlah kamar" value={`${form.jml_kamar} kamar`} />
                  {totalHarga !== null && (
                    <>
                      <div className="h-px bg-white/10 my-3" />
                      <div className="flex justify-between">
                        <span className="text-white/50">Total Estimasi</span>
                        <span className="text-[#C9A96E] font-semibold text-base">{formatRupiah(totalHarga)}</span>
                      </div>
                      <p className="text-white/25 text-[11px] mt-1">* Belum termasuk pajak & biaya tambahan</p>
                    </>
                  )}
                </div>
              ) : (
                <p className="text-white/30 text-sm" style={{ fontFamily: "sans-serif" }}>
                  Pilih kamar untuk melihat ringkasan harga.
                </p>
              )}

              {/* Guarantees */}
              <div className="mt-6 pt-5 border-t border-white/10 space-y-2.5" style={{ fontFamily: "sans-serif" }}>
                {[
                  "Konfirmasi langsung via email",
                  "Pembayaran fleksibel di hotel",
                  "Gratis pembatalan 24 jam sebelum",
                  "Layanan concierge 24/7",
                ].map((g) => (
                  <div key={g} className="flex items-center gap-3 text-xs text-white/45">
                    <span className="text-[#C9A96E] text-[10px]">✦</span>
                    {g}
                  </div>
                ))}
              </div>
            </div>

            {/* Static info block */}
            <div className="border border-[#D4C5A9]/40 bg-[#FAF8F4] p-6">
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#9A8866] mb-4" style={{ fontFamily: "sans-serif" }}>
                Informasi Check-in
              </p>
              <div className="space-y-3 text-sm text-[#3A3228]" style={{ fontFamily: "sans-serif" }}>
                <div className="flex justify-between">
                  <span className="text-[#9A8866]">Check-in mulai</span>
                  <span className="font-medium">14:00 WIB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9A8866]">Check-out hingga</span>
                  <span className="font-medium">12:00 WIB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9A8866]">Usia minimum tamu</span>
                  <span className="font-medium">17 tahun</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9A8866]">Hewan peliharaan</span>
                  <span className="font-medium">Tidak diizinkan</span>
                </div>
                <div className="h-px bg-[#D4C5A9]/50 my-2" />
                <p className="text-[#9A8866] text-xs leading-relaxed">
                  ID resmi wajib dibawa saat check-in. Deposit kamar berlaku untuk seluruh masa menginap.
                </p>
              </div>
            </div>

          </aside>
        </div>
      </div>

      {/* ── BOTTOM STRIP ────────────────────────────────── */}
      <div className="bg-[#0C0C0C] py-10 px-6 mt-8">
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[#C9A96E] text-[9px] tracking-[0.35em] uppercase mb-2" style={{ fontFamily: "sans-serif" }}>
              Butuh Bantuan?
            </p>
            <p className="text-white text-xl font-light" style={{ fontFamily: "'Georgia', serif" }}>
              Hubungi tim reservasi kami
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 text-sm" style={{ fontFamily: "sans-serif" }}>
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

// ── Sub-komponen ─────────────────────────────────────────────

function ElegantSection({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-[#E8E2D9] p-7">
      <div className="flex items-center gap-3 mb-6">
        <span
          className="text-[#C9A96E] text-xs font-medium"
          style={{ fontFamily: "sans-serif", letterSpacing: "0.15em" }}
        >
          {label}
        </span>
        <div className="h-px flex-1 bg-[#E8E2D9]" />
        <h2
          className="text-[#1A1614] text-sm font-medium tracking-wider uppercase"
          style={{ fontFamily: "sans-serif" }}
        >
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function ElegantField({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="block text-[10px] text-[#9A8866] mb-2 tracking-widest uppercase"
        style={{ fontFamily: "sans-serif" }}
      >
        {label}
        {required && <span className="text-[#C9A96E] ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-[11px] mt-1.5" style={{ fontFamily: "sans-serif" }}>
          {error}
        </p>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline">
      <span className="text-white/45">{label}</span>
      <span className="text-white/85 font-medium text-right max-w-[55%]">{value}</span>
    </div>
  );
}

function elegantInput(hasError: boolean) {
  return [
    "w-full px-4 py-3 text-sm text-[#1A1614] bg-[#FAF8F4] border outline-none transition-all duration-200",
    "placeholder:text-[#C4B99A]",
    "focus:border-[#C9A96E] focus:bg-white focus:ring-0",
    hasError
      ? "border-red-400 bg-red-50"
      : "border-[#E0D8CE] hover:border-[#C9A96E]/50",
  ].join(" ");
}