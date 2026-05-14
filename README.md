buatkan summary readme.md di next js nya

18:11
Claude responded: nextjs-pemesanan-hotel ← repo ini (port 3000)
powershell
$content = @'
# nextjs-pemesanan-hotel

> Halaman publik hotel berbasis Next.js 14 — mengonsumsi Laravel REST API

![Next.js](https://img.shields.io/badge/frontend-Next.js%2014-black)
![TypeScript](https://img.shields.io/badge/language-TypeScript-blue)
![Tailwind](https://img.shields.io/badge/styling-Tailwind%20CSS-38bdf8)

---

## Deskripsi

Frontend publik untuk sistem manajemen hotel **The Redison Blue**. Dibangun dengan Next.js 14 App Router, mengonsumsi REST API dari backend Laravel. Halaman ini khusus untuk tamu hotel (guest) — bukan dashboard internal.

Dashboard CMS (admin & resepsionis) tetap di Laravel Blade: `http://localhost:8000`

---

## Arsitektur Sistem
nextjs-pemesanan-hotel    ← repo ini (port 3000)
↕ REST API
hotel-backend (Laravel)   ← port 8000
↕
hotel-mobile (Flutter)    ← nanti


---

## Halaman Publik

| Route | Halaman | Status |
|---|---|---|
| `/` | Landing page + hero + daftar kamar | ⏳ |
| `/kamar` | Katalog semua kamar | ⏳ |
| `/kamar/[id]` | Detail kamar + fasilitas | ⏳ |
| `/galeri` | Galeri foto hotel | ⏳ |
| `/artikel` | Daftar artikel & promo | ⏳ |
| `/artikel/[slug]` | Detail artikel | ⏳ |
| `/pesan` | Form reservasi publik | ⏳ |

---

## Struktur Folder
src/
├── app/
│   ├── layout.tsx          ← global layout (Navbar + Footer)
│   ├── page.tsx            ← landing page
│   ├── kamar/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── galeri/page.tsx
│   ├── artikel/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── pesan/page.tsx
├── components/
│   ├── Navbar.tsx
│   └── Footer.tsx
├── lib/
│   └── api.ts              ← axios wrapper ke Laravel API
└── types/
└── index.ts            ← TypeScript interfaces


---

## API Endpoints yang Dikonsumsi

Base URL: `http://localhost:8000`

| Method | Endpoint | Dipakai di |
|---|---|---|
| GET | `/api/kamar` | `/`, `/kamar` |
| GET | `/api/kamar/{id}` | `/kamar/[id]` |
| GET | `/api/galeri` | `/galeri` |
| GET | `/api/banner` | `/` (slider) |
| GET | `/api/artikel` | `/artikel` |
| GET | `/api/artikel/{slug}` | `/artikel/[slug]` |
| POST | `/api/pesanan` | `/pesan` |

---

## Cara Install & Jalankan

### Prasyarat
- Node.js >= 18
- Backend Laravel sudah jalan di `http://localhost:8000`

### Install

```bash
git clone <repo-url>
cd nextjs-pemesanan-hotel
npm install
```

### Konfigurasi

```bash
cp .env.local.example .env.local
```

Isi `.env.local`:
NEXT_PUBLIC_API_URL=http://localhost:8000


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
| Background | `#F5F4F2` |
| Heading | `#121212` |
| Body text | `#464646` |
| Font | System default (Tailwind) |
| Radius card | `rounded-xl` |
| Radius button | `rounded-lg` |

---

## Repo Terkait

| Repo | Teknologi | Keterangan |
|---|---|---|
| `hotel-backend` | Laravel 12 + MySQL | REST API + CMS Dashboard |
| `nextjs-pemesanan-hotel` | Next.js 14 | Halaman publik (repo ini) |
| `hotel-mobile` | Flutter | Mobile app (belum) |

---

## Progress

- [x] Setup project Next.js 14 + TypeScript + Tailwind
- [x] `.env.local` konfigurasi API URL
- [x] `src/lib/api.ts` — axios wrapper semua endpoint
- [x] `src/types/index.ts` — TypeScript interfaces
- [x] `Navbar.tsx` + `Footer.tsx`
- [x] `layout.tsx` global
- [ ] Landing page (`/`)
- [ ] Katalog kamar (`/kamar`)
- [ ] Detail kamar (`/kamar/[id]`)
- [ ] Galeri (`/galeri`)
- [ ] Artikel (`/artikel`, `/artikel/[slug]`)
- [ ] Form reservasi (`/pesan`)

---

*Terakhir diperbarui: 14 Mei 2026*
*Next.js 14 | TypeScript | Tailwind CSS | Laravel API*
'@
[System.IO.File]::WriteAllText("C:\Users\Hype AMD\nextjs-pemesanan-hotel\README.md", $content, [System.Text.UTF8Encoding]::new($false))