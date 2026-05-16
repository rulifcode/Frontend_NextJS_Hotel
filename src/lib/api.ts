// ============================================================
// lib/api.ts — Fetch wrapper ke Laravel REST API
// Base URL dari NEXT_PUBLIC_API_URL (.env.local)
// ============================================================

import type {
  ApiResponse,
  Artikel,
  Banner,
  Galeri,
  Kamar,
  Pesanan,
  PesananResponse,
} from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// ── Generic fetcher ─────────────────────────────────────────
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options?.headers ?? {}),
    },
    // Gunakan no-store di server component agar selalu fresh
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${endpoint}`);
  }

  return res.json() as Promise<T>;
}

// ── Banner ───────────────────────────────────────────────────
export async function getBanners(): Promise<Banner[]> {
  const res = await apiFetch<ApiResponse<Banner[]>>("/api/banner");
  return res.data ?? [];
}

// ── Kamar ────────────────────────────────────────────────────
export async function getKamars(): Promise<Kamar[]> {
  const res = await apiFetch<ApiResponse<Kamar[]>>("/api/kamar");
  return res.data ?? [];
}

export async function getKamarById(id: number | string): Promise<Kamar | null> {
  try {
    const res = await apiFetch<ApiResponse<Kamar>>(`/api/kamar/${id}`);
    return res.data ?? null;
  } catch {
    return null;
  }
}

// ── Galeri ───────────────────────────────────────────────────
export async function getGaleris(): Promise<Galeri[]> {
  const res = await apiFetch<ApiResponse<Galeri[]>>("/api/galeri");
  return res.data ?? [];
}

// ── Artikel ──────────────────────────────────────────────────
export async function getArtikels(): Promise<Artikel[]> {
  const res = await apiFetch<ApiResponse<Artikel[]>>("/api/artikel");
  return res.data ?? [];
}

export async function getArtikelBySlug(slug: string): Promise<Artikel | null> {
  try {
    const res = await apiFetch<ApiResponse<Artikel>>(`/api/artikel/${slug}`);
    return res.data ?? null;
  } catch {
    return null;
  }
}

// ── Pesanan (POST — client side) ─────────────────────────────
export async function createPesanan(
  payload: Pesanan
): Promise<PesananResponse> {
  const res = await fetch(`${BASE_URL}/api/pesanan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = (await res.json()) as PesananResponse;

  if (!res.ok) {
    // Laravel validation error (422) atau error lain
    return json;
  }

  return json;
}

// ── Helpers ──────────────────────────────────────────────────

/** Format harga ke rupiah: 300000 → "Rp 300.000" */
export function formatRupiah(angka: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
}

/** Hitung total harga berdasarkan malam & jumlah kamar */
export function hitungTotal(
  harga: number,
  cekIn: string,
  cekOut: string,
  jmlKamar = 1
): number {
  const inDate = new Date(cekIn);
  const outDate = new Date(cekOut);
  const malam = Math.max(
    1,
    (outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  return harga * malam * jmlKamar;
}

/** Ambil URL gambar kamar */
export function getKamarImageUrl(foto: string | null | undefined): string {
  if (!foto) return "/placeholder-room.jpg";
  if (foto.startsWith("http")) return foto;
  return `${BASE_URL}/img/kamar/${foto}`;
}

/** Ambil URL thumbnail artikel */
export function getArtikelImageUrl(thumbnail: string | null | undefined): string {
  if (!thumbnail) return "/placeholder-article.jpg";
  if (thumbnail.startsWith("http")) return thumbnail;
  return `${BASE_URL}/img/artikel/${thumbnail}`;
}

/** Ambil URL foto galeri */
export function getGaleriImageUrl(foto: string | null | undefined): string {
  if (!foto) return "/placeholder-gallery.jpg";
  if (foto.startsWith("http")) return foto;
  return `${BASE_URL}/img/galeri/${foto}`;
}

/** Format tanggal ke bahasa Indonesia: "14 Mei 2026" */
export function formatTanggal(dateStr: string | null): string {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Kategori label */
export const kategoriLabel: Record<string, string> = {
  promo: "Promo",
  info: "Informasi",
  event: "Event",
};