// ============================================================
// types/index.ts — TypeScript interfaces untuk Laravel API
// Hotel "The Redison Blue"
// ============================================================

export interface Kamar {
  id: number;
  nama_kamar: string;
  tipe_kamar: string;
  harga: number;
  deskripsi: string | null;
  foto: string | null;
  foto_url?: string | null;
  created_at: string;
  updated_at: string;
  fasilitas?: FasilitasKamar[];
  reviews?: Review[];
}

export interface FasilitasKamar {
  id: number;
  kamar_id: number;
  nama_fasilitas: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: number;
  kamar_id: number | null;
  nama: string;
  foto: string | null;
  rating: number;
  komentar: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface Banner {
  id: number;
  judul: string;
  media: string | null;
  tipe: "image" | "gif" | "video";
  src: string;
  link: string | null;
  aktif: boolean;
  urutan: number;
  created_at: string;
  updated_at: string;
}

export interface Galeri {
  id: number;
  judul: string;
  foto: string | null;
  foto_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Artikel {
  id: number;
  user_id: number;
  judul: string;
  slug: string;
  konten: string;
  thumbnail: string | null;
  thumbnail_url?: string | null;
  kategori: "promo" | "info" | "event";
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Pesanan {
  kamar_id: number;
  nama_pemesan: string;
  email_pemesan: string;
  hp_pemesan: string;
  nama_tamu: string;
  cek_in: string;   // format: YYYY-MM-DD
  cek_out: string;  // format: YYYY-MM-DD
  jml_kamar: number;
}

export interface PesananResponse {
  message: string;
  data?: {
    id: number;
    status: "pending" | "confirmed" | "cancelled";
  };
  errors?: Record<string, string[]>;
}

// Generic API response wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
}