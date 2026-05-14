import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;

// Kamar
export const getKamar = async () => {
  const res = await api.get("/api/kamar");
  return res.data.data;
};

export const getKamarById = async (id: number) => {
  const res = await api.get(`/api/kamar/${id}`);
  return res.data.data;
};

// Galeri
export const getGaleri = async () => {
  const res = await api.get("/api/galeri");
  return res.data.data;
};

// Artikel
export const getArtikel = async () => {
  const res = await api.get("/api/artikel");
  return res.data.data;
};

export const getArtikelBySlug = async (slug: string) => {
  const res = await api.get(`/api/artikel/${slug}`);
  return res.data.data;
};

// Banner
export const getBanner = async () => {
  const res = await api.get("/api/banner");
  return res.data.data;
};

// Pesanan
export const createPesanan = async (data: {
  kamar_id: number;
  nama_pemesan: string;
  email_pemesan: string;
  hp_pemesan: string;
  nama_tamu: string;
  cek_in: string;
  cek_out: string;
  jml_kamar: number;
}) => {
  const res = await api.post("/api/pesanan", data);
  return res.data;
};