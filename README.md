# 🏨 Backend Laravel Hotel — The Redison Blue

> REST API + CMS Dashboard untuk sistem manajemen hotel berbasis web, dibangun dengan Laravel 12 dan dikonsumsi oleh frontend Next.js serta aplikasi mobile Flutter.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?logo=laravel&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-8.2-777BB4?logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=next.js&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Storage-Cloudinary-3448C5?logo=cloudinary&logoColor=white)

---

## 📋 Daftar Isi

1. [Deskripsi Proyek](#-deskripsi-proyek)
2. [Arsitektur Sistem](#-arsitektur-sistem)
3. [Tech Stack](#-tech-stack)
4. [Fitur per Role](#-fitur-per-role)
5. [Struktur Database](#-struktur-database)
6. [Struktur Folder](#-struktur-folder)
7. [API Endpoint](#-api-endpoint)
8. [Cara Install & Jalankan](#-cara-install--jalankan)
9. [Deploy](#-deploy)
10. [Catatan Dev](#-catatan-dev)

---

## 📖 Deskripsi Proyek

**The Redison Blue Hotel Management System** adalah sistem manajemen hotel full-stack yang dibangun sebagai proyek Ujian Kompetensi Kejuruan (UKK). Sistem ini terdiri dari dua bagian utama:

- **CMS Dashboard** — Panel internal untuk staf hotel (admin & resepsionis) menggunakan Laravel Blade
- **REST API** — Endpoint publik yang dikonsumsi oleh frontend Next.js dan aplikasi mobile Flutter

### Highlights
- 🔐 Role-based access control (Admin & Resepsionis)
- 📸 Banner slider mendukung gambar (JPG/PNG/WEBP), GIF, dan video (MP4/WEBM/OGG)
- ☁️ File storage via Cloudinary (persistent, tidak hilang saat redeploy)
- 🌐 CORS-ready untuk integrasi frontend Next.js
- 📊 Laporan & statistik pemesanan untuk admin

### Repo Terkait
- 🔗 Frontend Next.js: [Frontend_NextJS_Hotel](https://github.com/rulifcode/Frontend_NextJS_Hotel)

---

## 🏗️ Arsitektur Sistem

```
┌──────────────────────────┐        ┌──────────────────────────┐
│   Next.js (Frontend)     │◄──────►│   Laravel (Backend)      │
│   Vercel                 │  REST  │   Render / InfinityFree  │
│                          │  API   │                          │
│  • Landing Page          │        │  • REST API Controllers  │
│  • Katalog Kamar         │        │  • CMS Dashboard Blade   │
│  • Form Reservasi        │        │  • Auth & Middleware      │
│  • Galeri & Artikel      │        │  • File Upload Handler   │
└──────────────────────────┘        └────────────┬─────────────┘
                                                  │
                          ┌───────────────────────┼───────────────────────┐
                          │                       │                       │
               ┌──────────▼──────────┐  ┌─────────▼─────────┐  ┌────────▼────────┐
               │  MySQL Database     │  │   Cloudinary      │  │  Session/Cache  │
               │  Clever Cloud       │  │   Media Storage   │  │  Cookie/File    │
               │                     │  │                   │  │                 │
               │  • users            │  │  • Foto kamar     │  │                 │
               │  • kamar            │  │  • Foto galeri    │  │                 │
               │  • fasilitas_kamar  │  │  • Banner image   │  │                 │
               │  • galeri           │  │  • Banner video   │  │                 │
               │  • pesanan          │  │  • Thumbnail      │  │                 │
               │  • artikel          │  │    artikel        │  │                 │
               │  • banner           │  └───────────────────┘  └─────────────────┘
               │  • absensi_karyawan │
               └─────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Teknologi | Versi |
|---|---|---|
| Backend Framework | Laravel | 12 |
| Language | PHP | 8.2 |
| Database | MySQL | 8.0 |
| Frontend CMS | Blade + Tailwind CSS | — |
| Frontend Publik | Next.js | 14 |
| Media Storage | Cloudinary | — |
| Database Host | Clever Cloud | — |
| App Deploy | Render / InfinityFree | — |
| Frontend Deploy | Vercel | — |
| Auth | Laravel Session Auth | — |
| API | REST (JSON) | — |

---

## 👥 Fitur per Role

| Fitur | Resepsionis | Admin |
|---|:---:|:---:|
| CRUD Kamar | ✅ | ✅ |
| CRUD Fasilitas Kamar | ✅ | ✅ |
| CRUD Galeri | ✅ | ✅ |
| CRUD Pesanan | ✅ | ✅ |
| Update Status Pesanan | ✅ | ✅ |
| Absensi (diri sendiri) | ✅ | ✅ |
| CRUD Artikel / Blog | ❌ | ✅ |
| CRUD Banner / Slider | ❌ | ✅ |
| Manajemen Users | ❌ | ✅ |
| Rekap Absensi Karyawan | ❌ | ✅ |
| Laporan & Statistik | ❌ | ✅ |

---

## 🗄️ Struktur Database

### `users`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | bigint PK | Auto increment |
| name | varchar(255) | Nama lengkap |
| email | varchar(255) | Unique |
| password | varchar(255) | Bcrypt hashed |
| role | enum | `admin` / `resepsionis` |
| created_at | timestamp | — |

### `kamar`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | bigint PK | — |
| nama_kamar | varchar(255) | Nama kamar |
| tipe_kamar | varchar(255) | Standar / Deluxe / Suite |
| harga | int | Per malam (IDR) |
| deskripsi | text | Nullable |
| foto | varchar(255) | Path file / Cloudinary URL |
| created_at | timestamp | — |

### `fasilitas_kamar`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | bigint PK | — |
| kamar_id | bigint FK | → kamar.id (CASCADE) |
| nama_fasilitas | varchar(255) | Unique per kamar |
| created_at | timestamp | — |

### `galeri`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | bigint PK | — |
| judul | varchar(255) | — |
| foto | varchar(255) | Path file / Cloudinary URL |
| deskripsi | text | Nullable |
| urutan | int | Default 0, untuk sorting |
| created_at | timestamp | — |

### `pesanan`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | bigint PK | — |
| kamar_id | bigint FK | → kamar.id (CASCADE) |
| nama_pemesan | varchar(255) | — |
| email_pemesan | varchar(255) | — |
| hp_pemesan | varchar(255) | — |
| nama_tamu | varchar(255) | — |
| cek_in | date | — |
| cek_out | date | — |
| jml_kamar | int | Default 1 |
| total_harga | bigint | Auto kalkulasi |
| status | enum | `pending` / `dikonfirmasi` / `ditolak` / `selesai` |
| created_at | timestamp | — |

### `artikel`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | bigint PK | — |
| user_id | bigint FK | → users.id (CASCADE) |
| judul | varchar(255) | — |
| slug | varchar(255) | Unique, auto-generate |
| konten | longtext | Rich text |
| thumbnail | varchar(255) | Nullable |
| kategori | enum | `promo` / `info` / `event` |
| status | enum | `draft` / `published` |
| published_at | timestamp | Nullable |
| created_at | timestamp | — |

### `banner`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | bigint PK | — |
| judul | varchar(255) | — |
| media | varchar(255) | Nama file (image/gif/video) |
| tipe | enum | `image` / `gif` / `video` |
| link | varchar(255) | Nullable, URL tujuan klik |
| aktif | boolean | Default true |
| urutan | int | Default 0, untuk sorting slider |
| created_at | timestamp | — |

### `absensi_karyawan`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | bigint PK | — |
| user_id | bigint FK | → users.id (CASCADE) |
| tanggal | date | — |
| jam_masuk | time | Nullable |
| jam_keluar | time | Nullable |
| status | enum | `hadir` / `izin` / `alfa` |
| keterangan | text | Nullable |
| created_at | timestamp | Unique constraint: (user_id, tanggal) |

---

## 📁 Struktur Folder

```
app_ujikom_2022/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/                    ← Controller khusus admin
│   │   │   │   ├── ArtikelController.php
│   │   │   │   ├── BannerController.php  ← Support image/gif/video
│   │   │   │   ├── UserController.php
│   │   │   │   ├── AbsensiController.php
│   │   │   │   └── LaporanController.php
│   │   │   ├── Api/                      ← REST API untuk Next.js & Flutter
│   │   │   │   ├── BannerController.php
│   │   │   │   ├── KamarController.php
│   │   │   │   ├── GaleriController.php
│   │   │   │   ├── ArtikelController.php
│   │   │   │   └── PesananController.php
│   │   │   ├── AuthController.php
│   │   │   ├── KamarController.php
│   │   │   ├── GaleriController.php
│   │   │   ├── PesananController.php
│   │   │   └── FasilitasKamarController.php
│   │   └── Middleware/
│   │       └── CheckRole.php             ← RBAC middleware
│   └── Models/
│       ├── User.php
│       ├── Kamar.php
│       ├── FasilitasKamar.php
│       ├── Galeri.php
│       ├── Pesanan.php
│       ├── Artikel.php
│       ├── Banner.php                    ← isVideo(), isGif(), isImage()
│       └── AbsensiKaryawan.php
├── config/
│   ├── cors.php                          ← Allow localhost:3000 & Vercel domain
│   └── cloudinary.php                   ← Cloudinary SDK config
├── database/
│   ├── migrations/
│   └── seeders/
│       ├── UserSeeder.php
│       ├── KamarSeeder.php
│       ├── FasilitasKamarSeeder.php
│       └── GaleriSeeder.php
├── routes/
│   ├── web.php                           ← 64 routes CMS (admin & resepsionis)
│   └── api.php                           ← 7 REST API endpoint publik
├── public/
│   └── img/
│       ├── banner/                       ← Local fallback upload media
│       ├── kamar/
│       └── galeri/
├── resources/views/
│   ├── layouts/app.blade.php             ← Sidebar kondisional by role
│   ├── auth/login.blade.php
│   ├── kamar/
│   ├── fasilitas-kamar/
│   ├── galeri/
│   ├── pesanan/
│   └── admin/
│       ├── artikel/
│       ├── banner/
│       ├── users/
│       ├── absensi/
│       └── laporan/
├── docker/
│   └── apache.conf                       ← Apache config untuk Docker deploy
├── Dockerfile                            ← Docker image untuk Render
└── Procfile                              ← Heroku-compatible process file
```

---

## 🌐 API Endpoint

**Base URL:** `https://your-domain.com/api`

### Publik (Tanpa Autentikasi)

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/banner` | Daftar banner aktif (image/gif/video) |
| `GET` | `/kamar` | Daftar semua kamar |
| `GET` | `/kamar/{id}` | Detail kamar + fasilitas |
| `GET` | `/galeri` | Daftar foto galeri |
| `GET` | `/artikel` | Daftar artikel published |
| `GET` | `/artikel/{slug}` | Detail artikel by slug |
| `POST` | `/pesanan` | Buat pesanan baru |

### Contoh Response `GET /api/banner`

```json
{
  "data": [
    {
      "id": 1,
      "judul": "Living Room",
      "media": "1778764468.jpg",
      "tipe": "image",
      "src": "https://your-domain.com/img/banner/1778764468.jpg",
      "link": ""
    },
    {
      "id": 2,
      "judul": "Hotel Activity",
      "media": "1778783519_bapwnk.mp4",
      "tipe": "video",
      "src": "https://your-domain.com/img/banner/1778783519_bapwnk.mp4",
      "link": ""
    }
  ]
}
```

### Contoh Request `POST /api/pesanan`

```json
{
  "kamar_id": 1,
  "nama_pemesan": "John Doe",
  "email_pemesan": "john@example.com",
  "hp_pemesan": "08123456789",
  "nama_tamu": "John Doe",
  "cek_in": "2026-06-01",
  "cek_out": "2026-06-03",
  "jml_kamar": 1
}
```

---

## 🚀 Cara Install & Jalankan

### Prasyarat

- PHP >= 8.2
- Composer
- Node.js >= 18
- MySQL / XAMPP
- Git

### 1. Clone & Install

```bash
cd C:/xampp/htdocs
git clone https://github.com/rulifcode/Backend_Laravel_Hotel.git app_ujikom_2022
cd app_ujikom_2022
composer install
cp .env.example .env
php artisan key:generate
```

### 2. Konfigurasi `.env`

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db_ukk_2022
DB_USERNAME=root
DB_PASSWORD=

CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME

SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
```

### 3. Migrasi & Seed Database

```bash
php artisan migrate
php artisan db:seed
php artisan storage:link
```

### 4. Jalankan Server

```bash
php artisan serve
# → http://localhost:8000
```

### Akun Default

| Role | Email | Password |
|---|---|---|
| Admin | admin@hotel.com | password |
| Resepsionis | resepsionis@hotel.com | password |

---

## ☁️ Deploy

Proyek ini di-deploy menggunakan kombinasi layanan gratis:

| Layanan | Platform | Keterangan |
|---|---|---|
| Laravel Backend | Render / InfinityFree | Web service via Docker |
| MySQL Database | Clever Cloud | Free DEV plan |
| Media Storage | Cloudinary | Free 25GB |
| Next.js Frontend | Vercel | Free hobby plan |

### Environment Variables untuk Production

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com

DB_HOST=xxxx-mysql.services.clever-cloud.com
DB_PORT=3306
DB_DATABASE=xxxx
DB_USERNAME=xxxx
DB_PASSWORD=xxxx

CLOUDINARY_URL=cloudinary://KEY:SECRET@CLOUD_NAME

SESSION_DRIVER=cookie
CACHE_STORE=file
QUEUE_CONNECTION=sync
FILESYSTEM_DISK=local
```

### Update CORS untuk Frontend Production

Di `config/cors.php`, tambahkan domain Vercel:

```php
'allowed_origins' => [
    'http://localhost:3000',
    'https://your-nextjs-app.vercel.app',
],
```

---

## 📝 Catatan Dev

### ⚠️ Menulis File PHP via PowerShell

Selalu gunakan cara ini untuk menghindari BOM (Byte Order Mark) yang merusak PHP:

```powershell
[System.IO.File]::WriteAllText(
    "path\ke\file.php",
    $content,
    [System.Text.UTF8Encoding]::new($false)
)
```

Jangan gunakan `Set-Content` — akan menyisipkan BOM.

### Konvensi Route

```
Resepsionis  : kamar.*, galeri.*, pesanan.*, fasilitas-kamar.*
Admin only   : admin.artikel.*, admin.banner.*, admin.users.*
               admin.absensi.index, admin.laporan.index
Semua role   : absensi.masuk, absensi.keluar, absensi.saya
API publik   : /api/banner, /api/kamar, /api/galeri, /api/artikel, /api/pesanan
```

### Design System (Blade Views)

```
Font         : DM Sans (Google Fonts)
Warna utama  : #FF6B00 (oranye brand)
Warna teks   : #121212 (heading), #464646 (body), #999/#aaa (muted)
Background   : #F5F4F2 (page), #FAFAF9 (input/row), white (card)
Border       : border-black/[0.06] (card), border-black/[0.08] (input)
Rounded      : rounded-[10px] (card), rounded-[7px] (input/button)
Error state  : border-[#E24B4A] bg-[#FEF0F0] text-[#E24B4A]
```

### Nama Kolom Penting

```
Tabel kamar   : nama_kamar, tipe_kamar, harga, deskripsi, foto
Tabel pesanan : nama_pemesan, email_pemesan, hp_pemesan, nama_tamu,
                cek_in, cek_out, jml_kamar, total_harga, status
Tabel banner  : judul, media, tipe, link, aktif, urutan
```

---

## 📌 Roadmap

### ✅ Selesai

- [x] Migration & seeder semua tabel
- [x] Model dengan relasi + helper method (`isVideo()`, `isGif()`, `isImage()`)
- [x] Middleware `CheckRole` dengan role-based routing
- [x] Auth — login dengan redirect berdasarkan role
- [x] 64 web routes CMS (admin & resepsionis)
- [x] 7 REST API endpoint publik
- [x] Semua controller CMS
- [x] Semua views Blade dengan design system seragam
- [x] Banner: upload image/gif/video, preview CMS, deteksi tipe otomatis
- [x] Cloudinary integration untuk persistent media storage
- [x] Dockerfile untuk deploy ke Render
- [x] Database di Clever Cloud (MySQL)

### 🔄 In Progress

- [ ] Halaman publik Next.js (Landing, Kamar, Galeri, Artikel, Reservasi)
- [ ] Fix `KamarController` — validasi `nama_kamar`
- [ ] Fix `PesananController` — auto kalkulasi `total_harga`
- [ ] Seeder: `ArtikelSeeder`, `BannerSeeder`
- [ ] Testing menyeluruh semua route & CRUD

---

<div align="center">

**Laravel 12 · PHP 8.2 · MySQL 8.0 · Clever Cloud · Cloudinary**

*Terakhir diperbarui: Mei 2026*

</div>