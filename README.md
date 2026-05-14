# Frontend_NextJS_Hotel

> Halaman publik hotel berbasis Next.js 14 — mengonsumsi Laravel REST API

![Next.js](https://img.shields.io/badge/frontend-Next.js%2014-black)
![TypeScript](https://img.shields.io/badge/language-TypeScript-blue)
![Tailwind](https://img.shields.io/badge/styling-Tailwind%20CSS-38bdf8)
![Status](https://img.shields.io/badge/status-in%20progress-yellow)

---

## Deskripsi

Frontend publik untuk sistem manajemen hotel **The Redison Blue**. Dibangun dengan Next.js 14 App Router, mengonsumsi REST API dari backend Laravel. Halaman ini khusus untuk tamu hotel (guest) — bukan dashboard internal.

> Dashboard CMS (admin & resepsionis) ada di repo terpisah: [Laravel_PemesananHotel](https://github.com/rulifcode/Laravel_PemesananHotel)

---

## Arsitektur Sistem

```
Frontend_NextJS_Hotel      ← repo ini (port 3000)
        ↕ REST API
Laravel_PemesananHotel     ← port 8000 (CMS + API)
        ↕
MySQL Database             ← XAMPP
```

---

## Halaman Publik

| Route | Halaman | Status |
|---|---|---|
| `/` | Landing page + hero slider + daftar kamar | ✅ |
| `/kamar` | Katalog semua kamar | ⏳ |
| `/kamar/[id]` | Detail kamar + fasilitas | ⏳ |
| `/galeri` | Galeri foto hotel | ⏳ |
| `/artikel` | Daftar artikel & promo | ⏳ |
| `/artikel/[slug]` | Detail artikel | ⏳ |
| `/pesan` | Form reservasi publik | ⏳ |

---

## Fitur yang Sudah Jalan

- **Hero Slider** — mendukung gambar, GIF, dan video dari CMS
- **Auto-advance** — gambar 6 detik, video maju setelah selesai diputar
- **Fallback** — tampilkan slide Unsplash kalau API Laravel offline
- **Progress bar** + dot navigator + arrow navigation
- **Responsive** — mobile & desktop
- **API Badge** (dev only) — indikator status koneksi ke Laravel

---

## Struktur Folder

```
src/
├── app/
│   ├── layout.tsx              ← global layout (Navbar + Footer)
│   ├── page.tsx                ← landing page
│   ├── kamar/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── galeri/page.tsx
│   ├── artikel/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── pesan/page.tsx
├── components/
│   ├── HeroSection.tsx         ← slider image/gif/video
│   ├── Navbar.tsx
│   └── Footer.tsx
├── lib/
│   └── api.ts                  ← fetch wrapper ke Laravel API
└── types/
    └── index.ts                ← TypeScript interfaces
```

---

## API Endpoints yang Dikonsumsi

Base URL: `http://localhost:8000`

| Method | Endpoint | Dipakai di |
|---|---|---|
| GET | `/api/banner` | `/` (hero slider) |
| GET | `/api/kamar` | `/`, `/kamar` |
| GET | `/api/kamar/{id}` | `/kamar/[id]` |
| GET | `/api/galeri` | `/galeri` |
| GET | `/api/artikel` | `/artikel` |
| GET | `/api/artikel/{slug}` | `/artikel/[slug]` |
| POST | `/api/pesanan` | `/pesan` |

Response `/api/banner`:
```json
{
  "data": [
    {
      "id": 1,
      "judul": "Living Room",
      "media": "1778764468.jpg",
      "tipe": "image",
      "src": "http://localhost:8000/img/banner/1778764468.jpg",
      "link": ""
    }
  ]
}
```

---

## Cara Install & Jalankan

### Prasyarat

- Node.js >= 18
- Backend Laravel sudah jalan di `http://localhost:8000`
- Repo backend: [Laravel_PemesananHotel](https://github.com/rulifcode/Laravel_PemesananHotel)

### Install

```bash
git clone https://github.com/rulifcode/Frontend_NextJS_Hotel.git
cd Frontend_NextJS_Hotel
npm install
```

### Konfigurasi

Buat file `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Jalankan

```bash
npm run dev
# → http://localhost:3000
```

---

## Design System

| Token | Nilai |
|---|---|
| Warna brand | `#FF6B00` (oranye) |
| Background gelap | `#0a0a0a` (hero) |
| Background terang | `#F5F4F2` |
| Heading | `#121212` |
| Body text | `#464646` |
| Font | DM Sans (Google Fonts) |

---

## Repo Terkait

| Repo | Teknologi | Keterangan |
|---|---|---|
| [Laravel_PemesananHotel](https://github.com/rulifcode/Laravel_PemesananHotel) | Laravel 12 + MySQL | REST API + CMS Dashboard |
| [Frontend_NextJS_Hotel](https://github.com/rulifcode/Frontend_NextJS_Hotel) | Next.js 14 | Halaman publik (repo ini) |

---

## Progress

### ✅ Selesai
- [x] Setup Next.js 14 + TypeScript + Tailwind CSS
- [x] Konfigurasi `next.config.mjs` — remote image dari Laravel
- [x] `.env.local` — `NEXT_PUBLIC_API_URL`
- [x] `HeroSection.tsx` — slider image / GIF / video dari API
- [x] Auto-advance + progress bar + dots + arrows
- [x] Fallback slides saat API offline
- [x] Integrasi CORS Laravel ↔ Next.js

### ⏳ Belum Selesai
- [ ] Landing page lengkap (`/`)
- [ ] Katalog kamar (`/kamar`)
- [ ] Detail kamar (`/kamar/[id]`)
- [ ] Galeri foto (`/galeri`)
- [ ] Artikel & promo (`/artikel`, `/artikel/[slug]`)
- [ ] Form reservasi publik (`/pesan`)

---

*Terakhir diperbarui: 15 Mei 2026*
*Next.js 14 | TypeScript | Tailwind CSS | Laravel API*