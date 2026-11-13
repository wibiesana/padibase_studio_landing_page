# 🗄️ Tables & Collections — Panduan Mendalam

Menu **Tables / Collections** adalah fondasi utama dalam **PadiBase Studio**. Dari menu ini, Anda merancang skema data relasional, mengonfigurasi aturan keamanan per-endpoint (RBAC), menghubungkan relasi antar-tabel bebas masalah N+1, serta mengelola data record dengan antarmuka spreadsheet interaktif yang aman dan ergonomis.

---

## 📋 Daftar Isi

1. [🏗️ Konsep Koleksi & Tabel di PadiBase](#1-konsep-koleksi--tabel-di-padibase)
2. [👥 Perbedaan Mendalam: Base Table vs Auth Table](#2-perbedaan-mendalam-base-table-vs-auth-table)
3. [📝 Skema Kolom & Jenis Tipe Data](#3-skema-kolom--jenis-tipe-data)
4. [📁 Arsitektur Decoupled File Storage (Penting)](#4-arsitektur-decoupled-file-storage-penting)
5. [🔗 Relasi Cerdas, Foreign Keys & Zero N+1 Engine](#5-relasi-cerdas-foreign-keys--zero-n1-engine)
6. [🛡️ Keamanan Endpoint: Access Rules & Granular RBAC](#6-keamanan-endpoint-access-rules--granular-rbac)
7. [👁️ Server-Side Field Projections (Privasi Kolom)](#7-server-side-field-projections-privasi-kolom)
8. [📊 Manajemen Record di Studio Dashboard](#8-manajemen-record-di-studio-dashboard)
9. [⚡ Operasi Batch: Batch Create & Batch Delete](#9-operasi-batch-batch-create--batch-delete)
10. [🔄 1-Click Database Schema Sync](#10-1-click-database-schema-sync)
11. [💻 Contoh Penggunaan via PadiBase JS SDK](#11-contoh-penggunaan-via-padibase-js-sdk)

---

## 1. 🏗️ Konsep Koleksi & Tabel di PadiBase

Di PadiBase Studio, istilah **Collection** dan **Table** digunakan secara sinonim:
- Setiap **Collection** yang Anda buat di antarmuka visual Studio dipetakan langsung menjadi tabel fisik di database pilihan Anda (**SQLite**, **PostgreSQL**, **MySQL**, atau **MariaDB**).
- Setiap Collection secara otomatis menghasilkan **REST API Gateway** lengkap dengan paginasi, sorting, filter fleksibel, auto-load relasi, dan event broadcasting Realtime SSE.
- Struktur tabel dan skemanya disimpan di metadata internal PadiBase (`_collections`) dan selalu disinkronkan secara atomik dengan struktur fisik database.

---

## 2. 👥 Perbedaan Mendalam: Base Table vs Auth Table

Saat membuat koleksi baru dengan mengklik **"+ New Collection"**, Anda wajib memilih salah satu dari dua tipe koleksi:

```text
                               ┌────────────────────────────────┐
                               │       TIPE KOLEKSI PADIBASE    │
                               └──────────────┬─────────────────┘
                                              │
                      ┌───────────────────────┴───────────────────────┐
                      ▼                                               ▼
         ┌─────────────────────────┐                     ┌─────────────────────────┐
         │     BASE COLLECTION     │                     │     AUTH COLLECTION     │
         ├─────────────────────────┤                     ├─────────────────────────┤
         │ • Untuk data umum       │                     │ • Untuk pengguna/member │
         │ • Bebas tambah kolom    │                     │ • Kolom kredensial bawaan│
         │ • CRUD REST API standar │                     │ • Endpoint Auth lengkap │
         │   (/api/:table)         │                     │   (login, register, dll)│
         └─────────────────────────┘                     └─────────────────────────┘
```

### A. Base Collection (Koleksi Data Standar)
Gunakan tipe ini untuk seluruh tabel data bisnis Anda, seperti: `posts`, `products`, `orders`, `categories`, `transactions`, `reviews`.
- **Kolom Standar Bawaan**:
  - `id`: Primary key unik (Integer auto-increment atau string ID).
  - `created_at`: Waktu pembuatan baris data.
  - `updated_at`: Waktu pembaruan data terakhir.
- **Rute REST yang Dihasilkan**:
  - `GET /api/:table`: Daftar terpaginasi (dengan relasi & proyeksi kolom).
  - `GET /api/:table/all`: Daftar lengkap tanpa batas paginasi.
  - `GET /api/:table/:id`: Mengambil 1 record spesifik berdasarkan ID.
  - `POST /api/:table`: Membuat record baru.
  - `PATCH /api/:table/:id`: Memperbarui record sebagian (partial update).
  - `DELETE /api/:table/:id`: Menghapus record secara aman.

### B. Auth Collection (Koleksi Pengguna & Otentikasi)
Gunakan tipe ini untuk tabel yang mewakili entitas pengguna yang memiliki akses login dan kredensial, seperti: `users`, `members`, `customers`, `staff`.
- **Kolom Kredensial & Identitas Otomatis**:
  - `id`: Primary Key.
  - `email`: Alamat surel unik pengguna (dilengkapi validasi format dan unique index).
  - `username`: Nama pengguna unik opsional.
  - `passwordHash`: Hash kata sandi terenkripsi menggunakan algoritma **Argon2id** (kebal serangan GPU/ASIC).
  - `tokenKey`: Kunci rotasi token acak 32 karakter untuk invalidasi sesi instan jika kata sandi diubah.
  - `role`: Peran otorisasi (default: `user`, atau disesuaikan menjadi `admin`, `moderator`).
  - `status`: Status akun (`active`, `pending`, `banned`).
  - `verified`: Boolean penanda apakah email sudah diverifikasi.
  - `email_verified_at`: Timestamp kapan email berhasil diverifikasi.
  - `created_at` & `updated_at`.
- **Endpoint Otentikasi Bawaan Khusus**:
  Setiap Auth Collection otomatis memiliki rute autentikasi lengkap tanpa perlu membuat custom code backend:
  - `POST /api/collections/:authTable/auth-with-password`: Login dengan verifikasi Argon2id dan menerbitkan JWT Bearer.
  - `POST /api/collections/:authTable/register`: Registrasi mandiri akun baru dengan validasi password min 8 karakter.
  - `POST /api/collections/:authTable/auth-refresh`: Memperpanjang token JWT sebelum kedaluwarsa.
  - `POST /api/collections/:authTable/request-password-reset`: Mengirim email tautan token reset password.
  - `POST /api/collections/:authTable/confirm-password-reset`: Menerapkan kata sandi baru menggunakan token reset.
  - `POST /api/collections/:authTable/request-verification`: Mengirim email konfirmasi verifikasi alamat surel.
  - `POST /api/collections/:authTable/confirm-verification`: Mengonfirmasi email pengguna.
  - `POST /api/collections/:authTable/change-password`: Mengubah kata sandi pengguna yang sedang login.
  - `GET /api/collections/:authTable/me`: Mengambil profil pengguna yang terotentikasi.

---

## 3. 📝 Skema Kolom & Jenis Tipe Data

PadiBase Studio mendukung tipe data kolom yang fleksibel dan terpetakan secara native ke database fisik:

| Tipe Data Kolom | Tipe SQL Fisik (SQLite / Postgres / MySQL) | Deskripsi & Contoh |
| :--- | :--- | :--- |
| **TEXT** | `TEXT` / `VARCHAR(255)` | String teks biasa, deskripsi panjang, maupun **URL penyimpanan file media** (`title`, `slug`, `avatar_url`). |
| **NUMBER** | `INTEGER` / `BIGINT` / `DECIMAL` / `REAL` | Nilai numerik integer maupun pecahan desimal (`price`, `stock`, `rating`, `quantity`). |
| **BOOLEAN** | `BOOLEAN` / `TINYINT(1)` | Nilai logika kebenaran (`is_published`, `featured`, `is_active`). |
| **DATE** | `TIMESTAMP` / `DATETIME` | Penanda waktu dan tanggal ISO-8601 (`published_at`, `due_date`, `expiry_date`). |
| **JSON** | `JSON` / `JSONB` / `TEXT` | Struktur data arbitrer, array nilai, atau konfigurasi dinamis (`settings`, `tags`, `metadata`). |
| **RELATION** | `INTEGER` / `BIGINT` (Foreign Key) | Kolom relasi yang merujuk ke tabel lain (`user_id -> users.id`, `category_id -> categories.id`). |
| **EMAIL** | `VARCHAR(255)` | String teks yang otomatis divalidasi dengan regex standar RFC email (`contact_email`, `billing_email`). |
| **SELECT** | `VARCHAR(100)` | Pilihan nilai tetap (enum dropdown) yang dibatasi pada daftar opsi tertentu (`status: ['draft', 'published', 'archived']`). |

---

## 4. 📁 Arsitektur Decoupled File Storage (Penting)

> [!IMPORTANT]
> **PadiBase TIDAK MENYEDIAKAN tipe kolom `FILE` pada skema tabel.**
> Sesuai arsitektur modern standar industri (seperti Supabase, Firebase Storage, dan AWS S3), file biner tidak disimpan langsung di baris tabel database, melainkan menggunakan pola **Decoupled File Storage**:

```text
┌─────────────────┐       1. Upload File (multipart)       ┌────────────────────────┐
│  Klien Frontend │ ─────────────────────────────────────> │  Storage API           │
│  atau UI Studio │ <───────────────────────────────────── │  /api/storage/:bucket  │
└────────┬────────┘       2. Kembalikan URL File           └───────────┬────────────┘
         │                   { "url": "/api/storage/..." }             │
         │                                                             │ Simpan Fisik
         │ 3. Simpan URL ke Kolom TEXT                                 ▼
         │    { "title": "Buku Baru", "cover_url": "..." }     ┌────────────────────────┐
         ▼                                                     │ padi_data/storage/     │
┌─────────────────────────────────┐                            │ (Zero Orphan Cleanup)  │
│  Tabel Database (Base/Auth)     │                            └────────────────────────┘
│  Kolom cover_url bertipe TEXT   │
└─────────────────────────────────┘
```

### Mengapa Decoupled Storage Lebih Unggul?
1. **Performa Database Stabil**: Database tidak terbebani oleh ukuran file biner (BLOB) yang membuat ukuran database membengkak dan memperlambat backup.
2. **CDN & Streaming Mandiri**: File media dapat di-stream dan di-cache secara independen via HTTP caching header.
3. **Zero Orphaned Files**: Ketika record dihapus atau URL file diganti, sistem garbage collection PadiBase otomatis menghapus file fisik lama dari disk sehingga media tidak menumpuk sia-sia.

### Kemudahan Ekstra di Dashboard Studio:
Meskipun arsitektur penyimpanannya decoupled, PadiBase Studio memberikan pengalaman pengguna yang sangat mulus:
- Di drawer formulir tambah/edit record, di samping kolom URL teks (misal `avatar_url`), terdapat tombol **"Upload to Storage"**.
- Anda cukup mengklik tombol tersebut atau memilih file gambar/dokumen dari komputer.
- Studio akan otomatis mengunggah file ke bucket yang dipilih, menerima URL hasil upload, dan **langsung mengisi URL tersebut ke input teks secara otomatis**.
- Tabel spreadsheet juga dilengkapi **Thumbnail Preview** dan **Lightbox Modal** untuk melihat gambar langsung dari tabel.

---

## 5. 🔗 Relasi Cerdas, Foreign Keys & Zero N+1 Engine

PadiBase memudahkan pembuatan relasi antar-tabel tanpa perlu menulis perintah SQL `ALTER TABLE ADD FOREIGN KEY` secara manual:

### Cara Mengonfigurasi Kolom RELATION:
1. Buka skema tabel dan klik **"+ Add Field"**.
2. Pilih tipe **RELATION**.
3. Tentukan nama kolom (disarankan menggunakan konvensi sufiks `_id`, misalnya: `user_id`, `author_id`, `category_id`).
4. Pilih **Target Collection** (misal: `users`).
5. Tentukan sifat kolom:
   - **Required (Wajib diisi)**: PadiBase otomatis menerapkan constraint database fisik **`ON DELETE CASCADE`** (jika user dihapus, data miliknya otomatis ikut terhapus).
   - **Nullable (Opsional)**: PadiBase otomatis menerapkan constraint database fisik **`ON DELETE SET NULL`** (jika user dihapus, kolom `user_id` diubah menjadi `NULL`).

### Zero N+1 Query Engine:
Masalah klasik pada REST API adalah masalah performa **N+1 Queries**: mengambil 50 artikel membutuhkan 1 query untuk mengambil artikel, ditambah 50 query susulan untuk mengambil nama user dari masing-masing artikel!

**Bagaimana PadiBase Mengatasinya?**
- Ketika endpoint `GET /api/posts` dipanggil, PadiBase mengumpulkan semua nilai `user_id` unik dari 50 artikel tersebut.
- PadiBase mengeksekusi **hanya 1 query batch tunggal**:
  ```sql
  SELECT * FROM users WHERE id IN (1, 5, 8, 12, ...);
  ```
- Objek user relasi kemudian secara otomatis dipasangkan ke properti `user` pada masing-masing record JSON.
- **Hasil**: Performa respons API tetap di bawah 5 milidetik meskipun menampilkan data relasional bertingkat!

---

## 6. 🛡️ Keamanan Endpoint: Access Rules & Granular RBAC

Keamanan data pada setiap tabel diatur melalui modal **API Endpoints & Access Rules** di header tabel Studio.

PadiBase memisahkan hak akses secara independen untuk setiap jenis aksi:

| Aksi | Endpoint REST | Fungsi |
| :--- | :--- | :--- |
| **`list_rule`** | `GET /api/:table` | Membaca daftar record **terpaginasi** (misal: halaman blog publik). |
| **`all_rule`** | `GET /api/:table/all` | Menarik **seluruh baris data tabel** sekaligus tanpa paginasi (misal: ekspor CSV). |
| **`view_rule`** | `GET /api/:table/:id` | Membaca detail satu baris data tertentu berdasarkan ID. |
| **`create_rule`**| `POST /api/:table` | Menambahkan baris data baru ke tabel. |
| **`update_rule`**| `PATCH /api/:table/:id` | Mengubah atau memperbarui data baris tertentu. |
| **`delete_rule`**| `DELETE /api/:table/:id` | Menghapus baris data dari database. |

### Mengapa Memisahkan `list_rule` vs `all_rule`?
Banyak BaaS konvensional menggabungkan aturan baca menjadi satu. Akibatnya, jika Anda mengizinkan publik membaca daftar artikel terpaginasi, bot atau pihak luar dapat langsung memanggil endpoint ekspor untuk mendownload seluruh isi database Anda!
Dengan PadiBase, Anda dapat mengatur:
- `list_rule = "public"`: Pengunjung umum bebas melihat artikel halaman demi halaman.
- `all_rule = "@request.auth.role = 'admin'"`: Hanya admin terotentikasi yang boleh menarik seluruh data tabel.

### Sintaks & Contoh Rule Populer:
```text
• Akses Publik (Siapa saja boleh):
  public
  true

• Wajib Login (Pengguna terotentikasi via Bearer Token):
  @request.auth.id != ""

• Hanya Peran Tertentu (Role-Based Access Control):
  @request.auth.role = 'admin'
  @request.auth.role in ['admin', 'moderator']

• Kepemilikan Data (Owner Check - Hanya pemilik data yang boleh akses):
  user_id = @request.auth.id
  author_id = @request.auth.id

• Terkunci Total (Hanya Superuser Admin):
  false
  null
```

---

## 7. 👁️ Server-Side Field Projections (Privasi Kolom)

Di samping Access Rules per-aksi, PadiBase menyediakan tab **Projected Fields** (Whitelisting Kolom):
- Anda dapat memilih kolom mana saja yang diizinkan untuk dikembalikan oleh server ke klien pada endpoint baca (`list`, `all`, `view`).
- Kolom sensitif yang tidak dicentang (misalnya: `passwordHash`, `tokenKey`, `internal_margin`, `admin_notes`) **akan dihapus di sisi server oleh Resource Transformer**.
- Klien tidak akan pernah bisa mengakses kolom yang tersembunyi tersebut, bahkan jika mereka memintanya secara eksplisit via query string `?fields=...`.

---

## 8. 📊 Manajemen Record di Studio Dashboard

PadiBase Studio menyediakan antarmuka tabel spreadsheet yang sangat nyaman:

1. **Spreadsheet Data Table**: Menampilkan seluruh data tabel secara bersih, lengkap dengan label penanda tipe data (PK, FK, TEXT, NUMBER, JSON).
2. **Pencarian Cepat & Filter**: Cari data secara real-time pada search input di toolbar atas.
3. **Sorting Dinamis**: Klik judul kolom untuk mengurutkan data secara Ascending (A-Z, 0-9) atau Descending (Z-A, 9-0).
4. **Ergonomic Safety**: Mengklik baris tabel tidak akan memicu form edit yang tidak disengaja. Drawer edit hanya terbuka jika Anda secara eksplisit menekan tombol **"Edit"**.
5. **Drawer Form & JSON Mode**: Input data melalui formulir visual yang rapi, atau beralih ke tab **JSON Mode** untuk menempelkan data mentah.
6. **Direct Storage Upload**: Tombol pintas unggah media di samping kolom URL teks.

---

## 9. ⚡ Operasi Batch: Batch Create & Batch Delete

Untuk kebutuhan migrasi data atau input massal, PadiBase mendukung operasi batch berkecepatan tinggi:

### A. Batch Create (`POST /api/:table/batch`)
Anda dapat mengirimkan array berisi puluhan hingga ratusan record dalam satu kali request:
```bash
curl -X POST http://127.0.0.1:8085/api/products/batch \
  -H "Authorization: Bearer <ADMIN_OR_USER_JWT>" \
  -H "Content-Type: application/json" \
  -d '[
    { "name": "Produk A", "price": 50000, "stock": 100 },
    { "name": "Produk B", "price": 75000, "stock": 50 },
    { "name": "Produk C", "price": 120000, "stock": 30 }
  ]'
```
Semua data di-insert dalam satu batch transaksi database SQLx yang atomic dan super cepat.

### B. Batch Delete (`DELETE /api/:table/batch`)
Di dashboard Studio:
1. Centang kotak seleksi di sebelah kiri baris record yang ingin Anda hapus.
2. Klik tombol **"Delete Selected"** pada bilah aksi batch.
3. Konfirmasi dialog penghapusan aman untuk menghapus baris-baris tersebut secara serentak.

Via API:
```bash
curl -X DELETE http://127.0.0.1:8085/api/products/batch \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{ "ids": [10, 11, 12, 15] }'
```

---

## 10. 🔄 1-Click Database Schema Sync

Ketika Anda menambahkan kolom baru, menghapus kolom, atau melakukan perubahan skema fisik langsung di server database (misal via DBeaver atau pgAdmin):
- Klik tombol **"Sync DB Schema"** di toolbar tabel Studio.
- PadiBase akan melakukan query introspeksi skema fisik (`sqlite_master` / `information_schema.columns`) dan memperbarui metadata PadiBase secara instan tanpa perlu mematikan atau me-restart server backend!

---

## 11. 💻 Contoh Penggunaan via PadiBase JS SDK

```javascript
import PadiBase from 'padibase';

const padi = new PadiBase('http://127.0.0.1:8085');

// 1. Ambil data terpaginasi dengan filter & relasi otomatis
const posts = await padi.table('posts').getList(1, 20, {
  sort: '-created_at',
  filter: 'is_published = true'
});
console.log('Total items:', posts.totalItems);
console.log('Posts:', posts.items);

// 2. Upload file ke storage, lalu buat record baru dengan URL file
const file = document.querySelector('#fileInput').files[0];
const uploadRes = await padi.storage.upload('avatars', file);

const newProfile = await padi.table('profiles').create({
  full_name: 'Budi Santoso',
  avatar_url: uploadRes.url,
  bio: 'Software Engineer di Indonesia'
});

// 3. Batch Create data
const batchResult = await padi.table('tags').createBatch([
  { name: 'Rust' },
  { name: 'Vue3' },
  { name: 'PadiBase' }
]);

// 4. Batch Delete data berdasarkan array ID
await padi.table('tags').deleteBatch([1, 2, 3]);
```

---

## 🎯 Dokumen Terkait
- **[Panduan Decoupled File Storage](FILE_UPLOAD.md)**
- **[Panduan Autentikasi & JWT](AUTHENTICATION.md)**
- **[Panduan Visual SQL Builder](QUERY_BUILDER.md)**
- **[Panduan Integrasi Frontend](../03-advanced/FRONTEND_INTEGRATION.md)**

