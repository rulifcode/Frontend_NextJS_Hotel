export interface Kamar {
  id: number;
  nama_kamar: string;
  tipe_kamar: string;
  harga: number;
  deskripsi: string;
  foto: string | null;
  fasilitas: string[];
}

export interface Galeri {
  id: number;
  judul: string;
  foto: string | null;
}

export interface Artikel {
  id: number;
  judul: string;
  slug: string;
  konten?: string;
  kategori: "promo" | "info" | "event";
  thumbnail: string | null;
  published_at: string;
}

export interface Banner {
  id: number;
  judul: string;
  gambar: string;
  link: string | null;
}

export interface PesananForm {
  kamar_id: number;
  nama_pemesan: string;
  email_pemesan: string;
  hp_pemesan: string;
  nama_tamu: string;
  cek_in: string;
  cek_out: string;
  jml_kamar: number;
}