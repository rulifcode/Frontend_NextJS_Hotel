"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────────────
type SlideType = "image" | "gif" | "video";

interface Slide {
  type: SlideType;
  src: string;
  alt: string;
}

// ── Fallback jika API offline ──────────────────────────────────────────────
const FALLBACK_SLIDES: Slide[] = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&q=80",
    alt: "Hotel Lobby",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1600&q=80",
    alt: "Luxury Room",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80",
    alt: "Pool Area",
  },
];

const SLIDE_DURATION = 6000; // ms untuk image/gif

// ── Helper: map response API Laravel → Slide[] ────────────────────────────
// Support field: media (baru), gambar/foto/image/url (lama/fallback)
function mapBannersToSlides(raw: unknown, baseUrl: string): Slide[] {
  const arr = Array.isArray(raw)
    ? raw
    : (raw as Record<string, unknown>)?.data;
  if (!Array.isArray(arr) || arr.length === 0) return [];

  return arr
    .map((b) => {
      const item = b as Record<string, string>;

      // Prioritaskan field 'media' (kolom baru), fallback ke yang lama
      const mediaField: string =
        item.media ||
        item.gambar ||
        item.foto ||
        item.image ||
        item.url ||
        "";

      if (!mediaField) return null;

      // Kalau sudah full URL (http/https), pakai langsung
      // Kalau path relatif, gabung dengan baseUrl Laravel
      const src = mediaField.startsWith("http")
        ? mediaField
        : `${baseUrl}/img/banner/${mediaField}`;

      const alt: string = item.judul || item.title || "Banner";

      // Deteksi tipe dari field 'tipe' (Laravel) atau ekstensi file
      let type: SlideType = "image";
      if (item.tipe === "video" || /\.(mp4|webm|ogg)$/i.test(mediaField)) {
        type = "video";
      } else if (item.tipe === "gif" || /\.gif$/i.test(mediaField)) {
        type = "gif";
      }

      return { type, src, alt } satisfies Slide;
    })
    .filter(Boolean) as Slide[];
}

// ══════════════════════════════════════════════════════════════════════════
export default function HeroSection() {
  const [slides, setSlides] = useState<Slide[]>(FALLBACK_SLIDES);
  const [current, setCurrent] = useState(0);
  const [apiStatus, setApiStatus] = useState<"loading" | "ok" | "fallback">(
    "loading"
  );

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // ── Fetch banners dari Laravel API ──────────────────────────────────────
  useEffect(() => {
    const controller = new AbortController();

    async function loadBanners() {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
        const res = await fetch(`${baseUrl}/api/banner`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        const mapped = mapBannersToSlides(json, baseUrl);

        if (mapped.length > 0) {
          setSlides(mapped);
          setApiStatus("ok");
        } else {
          setApiStatus("fallback");
        }
      } catch {
        if (!controller.signal.aborted) setApiStatus("fallback");
      }
    }

    loadBanners();
    return () => controller.abort();
  }, []);

  // ── Auto-advance ─────────────────────────────────────────────────────────
  const goTo = useCallback((i: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCurrent(i);
  }, []);

  useEffect(() => {
    const slide = slides[current];
    // Video: tunggu sampai ended lewat event, bukan timer — tapi fallback 15s
    // GIF & image: pakai SLIDE_DURATION
    const duration = slide?.type === "video" ? 15000 : SLIDE_DURATION;

    timerRef.current = setTimeout(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, slides]);

  // ── Autoplay video + advance saat video ended ─────────────────────────
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.currentTime = 0;
    vid.play().catch(() => {});

    // Kalau video selesai sebelum timeout → langsung next slide
    const onEnded = () => {
      if (slides.length > 1) {
        goTo((current + 1) % slides.length);
      }
    };
    vid.addEventListener("ended", onEnded);
    return () => vid.removeEventListener("ended", onEnded);
  }, [current, slides, goTo]);

  const currentSlide = slides[current];
  const progressDuration =
    currentSlide?.type === "video" ? 15000 : SLIDE_DURATION;

  return (
    <>
      <style>{`
        @keyframes heroProgress {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>

      <section className="relative w-full min-h-screen overflow-hidden bg-[#0a0a0a]">

        {/* ── Slides ── */}
        {slides.map((slide, i) => (
          <div
            key={`${slide.src}-${i}`}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === current ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {slide.type === "video" ? (
              <video
                ref={i === current ? videoRef : undefined}
                src={slide.src}
                autoPlay
                muted
                playsInline
                // Tidak pakai loop — biar onEnded bisa trigger next slide
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              // image & gif keduanya pakai <img> biasa via unoptimized
              // GIF: Next/Image dengan unoptimized agar animasi gif tetap jalan
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                unoptimized
                priority={i === 0}
              />
            )}
          </div>
        ))}

        {/* ── Overlays ── */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/92 via-[#121212]/55 to-[#121212]/05 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/55 via-transparent to-transparent z-10" />

        {/* ── Hero content ── */}
        <div className="relative z-20 max-w-[1200px] mx-auto px-12 flex items-center justify-between min-h-screen pt-[72px]">

          {/* Kiri: judul + deskripsi */}
          <div className="max-w-[500px]">
            <span className="inline-flex items-center gap-2.5 text-[#FF6B00] text-[11px] tracking-[0.25em] uppercase font-medium mb-6">
              <span className="block w-8 h-px bg-[#FF6B00]" />
              Luxury Hotel Experience
            </span>

            <h1
              className="font-extrabold leading-[1.1] mb-5 text-[#F5F4F2] tracking-tight"
              style={{ fontSize: "clamp(38px, 4.5vw, 60px)" }}
            >
              Open The Door For A<br />
              Spacious{" "}
              <em className="not-italic text-[#FF6B00]">Living-</em>
            </h1>

            <p className="text-white/50 text-[13.5px] leading-relaxed max-w-[400px] mb-10">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim.
            </p>
          </div>

          {/* Kanan: Service cards */}
          <div className="hidden md:flex flex-col w-[280px]">
            {[
              "Book A Hotel Service",
              "Book A Car Service",
              "Book Spa Service",
            ].map((label, idx) => (
              <Link
                key={label}
                href="/pesan"
                className={`flex items-center justify-between px-5 py-[18px] border border-white/13 ${
                  idx !== 2 ? "border-b-0" : ""
                } hover:border-[#FF6B00]/50 hover:bg-[#FF6B00]/06 backdrop-blur-sm transition-all group`}
              >
                <span className="text-[13px] text-white/85">{label}</span>
                <span className="w-7 h-7 bg-[#FF6B00] flex items-center justify-center text-white text-[13px] flex-shrink-0 transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Dots ── */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 h-2 bg-[#FF6B00]"
                  : "w-2 h-2 bg-white/35 hover:bg-white/65"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* ── Arrows ── */}
        <button
          onClick={() =>
            goTo((current - 1 + slides.length) % slides.length)
          }
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 border border-white/20 text-white/60 hover:border-[#FF6B00] hover:text-[#FF6B00] flex items-center justify-center transition-all"
          aria-label="Slide sebelumnya"
        >
          ←
        </button>
        <button
          onClick={() => goTo((current + 1) % slides.length)}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 border border-white/20 text-white/60 hover:border-[#FF6B00] hover:text-[#FF6B00] flex items-center justify-center transition-all"
          aria-label="Slide berikutnya"
        >
          →
        </button>

        {/* ── Progress bar ── */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/08 z-20">
          <div
            key={`progress-${current}`}
            className="h-full bg-[#FF6B00] origin-left"
            style={{
              animation: `heroProgress ${progressDuration}ms linear forwards`,
            }}
          />
        </div>

        {/* ── Dev: API status badge ── */}
        {process.env.NODE_ENV === "development" && (
          <div
            className={`absolute top-[88px] right-12 z-30 text-[11px] px-3 py-1.5 font-medium tracking-wide transition-all ${
              apiStatus === "ok"
                ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
                : apiStatus === "fallback"
                ? "bg-orange-500/10 border border-orange-500/20 text-orange-400/70"
                : "bg-white/5 border border-white/10 text-white/40"
            }`}
          >
            {apiStatus === "ok"
              ? `✓ ${slides.length} banner dari API`
              : apiStatus === "fallback"
              ? "↻ Fallback (API offline)"
              : "⟳ Loading banners…"}
          </div>
        )}
      </section>
    </>
  );
}