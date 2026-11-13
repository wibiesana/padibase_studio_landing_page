# 👣 Panduan Langkah Awal PadiBase Studio (First Steps Guide)

Selamat datang di **PadiBase Studio**! Panduan ini akan memandu Anda mulai dari cara menjalankan server, membuat akun Superuser pertama, login ke web dashboard (`/_padibase/`), menguasai seluruh menu—terutama **Menu Table** (Base Table vs Auth Table, skema kolom, decoupled file storage, relasi, batch operations) dan **API Config**—hingga menghubungkan aplikasi frontend dengan PadiBase JS SDK.

---

## 📋 Daftar Isi

1. [🚀 Cara Menjalankan Server PadiBase](#1-cara-menjalankan-server-padibase)
2. [🔐 Setup Admin Pertama & Login Studio Dashboard](#2-setup-admin-pertama--login-studio-dashboard)
3. [🧭 Mengenal Navigasi Menu PadiBase Studio](#3-mengenal-navigasi-menu-padibase-studio)
4. [📊 Menu Table / Collections (Panduan Lengkap)](#4-menu-table--collections-panduan-lengkap)
   - [Perbedaan Base Table vs Auth Table](#a-perbedaan-base-table-vs-auth-table)
   - [Skema Kolom & Jenis Tipe Data](#b-skema-kolom--jenis-tipe-data)
   - [Arsitektur Decoupled File Storage (Penting)](#c-arsitektur-decoupled-file-storage-penting)
   - [Relasi Cerdas & Foreign Key (Zero N+1)](#d-relasi-cerdas--foreign-key-zero-n1)
   - [Access Rules & RBAC (list_rule vs all_rule)](#e-access-rules--rbac-list_rule-vs-all_rule)
   - [Manajemen Record & Operasi Batch](#f-manajemen-record--operasi-batch)
5. [⚡ Menu API Config & Custom Dynamic SQL](#5-menu-api-config--custom-dynamic-sql)
   - [Live Auto-Generated REST Endpoints](#a-live-auto-generated-rest-endpoints)
   - [Custom Dynamic SQL Endpoints (/api/custom/*)](#b-custom-dynamic-sql-endpoints-apicustom)
   - [Ekspor 1-Klik Postman Collection v2.1.0](#c-ekspor-1-klik-postman-collection-v210)
6. [🗄️ Menu Lainnya di Dashboard Studio](#6-menu-lainnya-di-dashboard-studio)
7. [💻 Menghubungkan Frontend via PadiBase JS SDK](#7-menghubungkan-frontend-via-padibase-js-sdk)

---

## 1. 🚀 Cara Menjalankan Server PadiBase

PadiBase didistribusikan dalam bentuk **single executable binary** yang sangat ringan dan berperforma tinggi (Axum 0.8 + Tokio + SQLx).

### Opsi A: Menggunakan Binary Siap Pakai
```bash
# Jalankan binary PadiBase (default port 8085 dengan embedded SQLite WAL mode):
./padibase.exe serve --http 127.0.0.1:8085 --dir ./padi_data
```

### Opsi B: Menjalankan via Cargo (Development / Source)
```bash
# Masuk ke direktori padiBase:
cd padiBase

# Jalankan server mode release:
cargo run --release -- serve --http 127.0.0.1:8085 --dir ./padi_data
```
Atau cukup jalankan script batch pembantu yang tersedia di direktori proyek:
```cmd
init_backend.bat
```

### Opsi C: Menghubungkan ke PostgreSQL atau MySQL/MariaDB
PadiBase mendukung multi-database secara polyglot. Anda dapat menentukan koneksi database melalui parameter `--db-url` atau via file `.env`:
```bash
# PostgreSQL
cargo run --release -- serve --db-url "postgres://postgres:password@127.0.0.1:5432/padibase"

# MySQL / MariaDB
cargo run --release -- serve --db-url "mysql://root:secret@127.0.0.1:3306/padibase"
```

Saat server berhasil berjalan, Anda akan melihat output log seperti berikut:
```text
[INFO] Server listening on http://127.0.0.1:8085
[INFO] Embedded Studio UI available at http://127.0.0.1:8085/_padibase/
[INFO] REST API Gateway ready at http://127.0.0.1:8085/api/
```

---

## 2. 🔐 Setup Admin Pertama & Login Studio Dashboard

PadiBase Studio menerapkan **Superuser Gateway** yang sangat aman dengan hashing password militer **Argon2id** dan enkripsi token **JWT**.

### Langkah 1: Buka Dashboard di Browser
Buka browser Anda dan navigasikan ke:
👉 **`http://127.0.0.1:8085/_padibase/`**

### Langkah 2: Bootstrap Superuser Pertama
Pada saat PadiBase pertama kali dijalankan, sistem secara otomatis mengecek apakah sudah ada akun Superuser yang terdaftar melalui endpoint `/api/admins/has-admins`.
- Jika database masih bersih (belum ada admin), Anda akan langsung disambut oleh wizard **"Create First Superuser / Setup Admin"**.
- Masukkan **Email Admin** (misal: `admin@example.com`).
- Masukkan **Password** (minimal 8 karakter dengan kombinasi aman).
- Klik tombol **"Create & Login"**.

> 💡 **Tip (Setup via CLI):** Anda juga bisa membuat admin langsung dari terminal:
> ```bash
> cargo run -- admin create admin@example.com "password_rahasia_123"
> ```

### Langkah 3: Login ke Dashboard
Setelah akun admin pertama dibuat, formulir login Superuser akan muncul. Masukkan Email dan Password Anda. Setelah berhasil masuk, token Superuser disimpan di session browser dan seluruh menu PadiBase Studio akan terbuka secara penuh.

---

## 3. 🧭 Mengenal Navigasi Menu PadiBase Studio

Pada sidebar sebelah kiri PadiBase Studio (`/_padibase/`), Anda akan menemukan menu-menu utama:

| Menu | Ikon | Fungsi Utama |
| :--- | :---: | :--- |
| **Tables / Collections** | 🗄️ | Manajemen tabel data (Base & Auth), pembuatan kolom skema, relasi FK, access rules RBAC, dan spreadsheet record manager. |
| **API Config / Endpoints** | ⚡ | Katalog rute REST live, pembuat Custom Dynamic SQL API (`/api/custom/*`), penjadwal Cron, dan ekspor 1-klik Postman v2.1. |
| **Storage Explorer** | 📁 | Manajemen bucket media, upload file mandiri, visual thumbnail, preview Lightbox gambar, dan pembersihan file otomatis (Zero Orphaned Files). |
| **Visual SQL Builder** | 🛠️ | Perancang query SQL interaktif, multi-table JOIN, Auto-Detect Relations, output `JSON_OBJECT`, agregasi (COUNT, SUM, AVG), dan Transaksi Atomik. |
| **Realtime Monitor** | 📡 | Pemantau siaran langsung Server-Sent Events (`/api/realtime`) untuk event mutasi data (`create`, `update`, `delete`). |
| **Backups & DB Sync** | 💾 | Snapshot backup online database (SQLite `VACUUM INTO`), migrasi skema, dan database synchronization. |
| **Cron Tasks** | ⏰ | Penjadwal tugas otomatis berbasis ekspresi cron standar untuk eksekusi SQL rutin atau pembersihan data. |
| **Settings & Admins** | ⚙️ | Manajemen akun Superuser tambahan, konfigurasi SMTP Email & template verifikasi/reset password, CORS, dan rate limiting. |

---

## 4. 📊 Menu Table / Collections (Panduan Lengkap)

Menu **Table** (`/_padibase/tables`) adalah jantung operasional dari PadiBase Studio. Di sini Anda mendesain skema database, mengatur relasi, menentukan hak akses keamanan, dan mengelola seluruh data aplikasi.

---

### a. Perbedaan Base Table vs Auth Table

Saat mengklik tombol **"+ New Collection"**, PadiBase Studio menawarkan dua jenis tabel:

#### 1. Base Collection (Tabel Data Standar)
Digunakan untuk data entitas bisnis aplikasi Anda (contoh: `posts`, `products`, `orders`, `categories`, `articles`).
- **Kolom Standar Bawaan**:
  - `id`: Primary key unik (Integer Auto Increment / UUID).
  - `created_at`: Waktu pencatatan record dibuat.
  - `updated_at`: Waktu record terakhir diperbarui.
- **Rute REST Bawaan**:
  - `GET /api/:table` (Daftar terpaginasi).
  - `GET /api/:table/all` (Daftar penuh tanpa paginasi).
  - `GET /api/:table/:id` (Detail satu record).
  - `POST /api/:table` (Tambah record baru).
  - `PATCH /api/:table/:id` (Update record).
  - `DELETE /api/:table/:id` (Hapus record).

#### 2. Auth Collection (Tabel Pengguna & Otentikasi)
Digunakan untuk entitas pengguna yang memiliki hak login dan kata sandi (contoh: `users`, `members`, `customers`, `staff`).
- **Kolom Otentikasi Otomatis**:
  - `id`: Primary Key.
  - `email`: Alamat email unik (Indexed).
  - `username`: Nama pengguna unik opsional.
  - `passwordHash`: Hash kata sandi menggunakan algoritma aman **Argon2id**.
  - `tokenKey`: Kunci rotasi token untuk invalidasi sesi instan saat ganti password.
  - `role`: Peran otorisasi (default: `user`, `admin`, `manager`, dll).
  - `status`: Status keaktifan akun (`active`, `pending`, `banned`).
  - `verified`: Status verifikasi email (`true` / `false`).
  - `email_verified_at`: Timestamp verifikasi email.
  - `created_at` & `updated_at`.
- **Rute Otentikasi Khusus yang Otomatis Aktif**:
  - `POST /api/collections/:authTable/auth-with-password`: Login dengan email/username & password.
  - `POST /api/collections/:authTable/register`: Registrasi akun pengguna baru.
  - `POST /api/collections/:authTable/auth-refresh`: Refresh token JWT yang masih valid.
  - `POST /api/collections/:authTable/request-password-reset`: Kirim email tautan lupa password.
  - `POST /api/collections/:authTable/confirm-password-reset`: Konfirmasi token reset password baru.
  - `POST /api/collections/:authTable/request-verification`: Kirim email verifikasi akun.
  - `POST /api/collections/:authTable/confirm-verification`: Konfirmasi token verifikasi akun.
  - `POST /api/collections/:authTable/change-password`: Ganti password (memerlukan password lama).
  - `GET /api/collections/:authTable/me`: Profil pengguna yang sedang login.

---

### b. Skema Kolom & Jenis Tipe Data

PadiBase menyediakan tipe data yang fleksibel dan terpetakan secara native ke database fisik:

| Tipe Data | Deskripsi | Contoh Penggunaan |
| :--- | :--- | :--- |
| **TEXT** | Teks panjang, string, atau tautan URL | `title`, `description`, `slug`, `avatar_url` |
| **NUMBER** | Angka integer atau pecahan (float/decimal) | `price`, `stock`, `rating`, `view_count` |
| **BOOLEAN** | Nilai benar atau salah (`true` / `false`) | `is_active`, `is_published`, `featured` |
| **DATE** | Timestamp tanggal & waktu (ISO-8601) | `published_at`, `event_date`, `expiry_date` |
| **JSON** | Struktur data JSON fleksibel / metadata | `settings`, `tags`, `attributes`, `metadata` |
| **RELATION** | Foreign Key yang terhubung ke tabel lain | `user_id -> users.id`, `category_id -> categories.id` |
| **EMAIL** | Teks tervalidasi format email RFC | `contact_email`, `billing_email` |
| **SELECT** | Pilihan nilai enumerasi (enum dropdown) | `status ('draft', 'published', 'archived')` |

---

### c. Arsitektur Decoupled File Storage (Penting)

> [!IMPORTANT]
> **TIDAK ADA kolom bertipe `FILE` pada skema tabel PadiBase.**
> PadiBase menerapkan arsitektur **Decoupled File Storage** (seperti standar Supabase dan Amazon S3):
> 1. File media diunggah secara terpisah melalui Storage API (`POST /api/storage/:bucket`).
> 2. API Storage mengembalikan metadata beserta URL file (misal: `/api/storage/avatars/budi_avatar.png`).
> 3. URL file tersebut disimpan ke dalam kolom bertipe **`TEXT`** pada tabel (misal: `avatar_url`, `cover_image`, `document_path`).

#### Kemudahan di Drawer Form PadiBase Studio:
Saat Anda menambahkan atau mengedit record data di dashboard PadiBase Studio:
- Di samping input teks kolom gambar/file, terdapat tombol pintas **"Upload to Storage"**.
- Anda cukup mengklik tombol tersebut atau memilih file dari komputer Anda.
- PadiBase Studio akan otomatis mengunggah file tersebut ke bucket Storage yang sesuai, mendapatkan URL-nya, dan langsung menempelkannya ke kolom teks secara otomatis!
- Dilengkapi dengan **Live Image Preview** dan **Lightbox Modal** untuk memeriksa gambar langsung dari tabel.

---

### d. Relasi Cerdas & Foreign Key (Zero N+1)

Saat Anda menambahkan kolom bertipe **RELATION**:
1. Pilih **Target Table** yang dituju (misal: `users`).
2. Tentukan sifat kolom:
   - **Required (Wajib diisi)**: PadiBase otomatis menerapkan constraint database fisik `ON DELETE CASCADE`.
   - **Nullable (Opsional)**: PadiBase otomatis menerapkan constraint database fisik `ON DELETE SET NULL`.
3. **Pemberantasan Masalah N+1 (Zero N+1 Engine)**:
   - Ketika data ditarik melalui API (`GET /api/posts`), PadiBase secara cerdas mendeteksi kolom `user_id`.
   - Data user relasi di-fetch dalam **1 batch query tunggal** (`WHERE id IN (1, 2, 5...)`) dan langsung di-embed ke field `user` pada response JSON.
   - Hasilnya: Performa super kilat tanpa ratusan query susulan ke database.

---

### e. Access Rules & RBAC (list_rule vs all_rule)

Untuk mengatur keamanan data setiap tabel, klik tombol **"API & Access Rules"** di header tabel Studio. PadiBase memisahkan hak akses secara independen per-aksi:

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                        API ENDPOINTS & ACCESS RULES                     │
├─────────────────┬──────────────────────────────────┬────────────────────┤
│ Aksi API        │ Endpoint REST                    │ Contoh Rule        │
├─────────────────┼──────────────────────────────────┼────────────────────┤
│ list_rule       │ GET /api/:table (Terpaginasi)    │ public (true)      │
│ all_rule        │ GET /api/:table/all (Semua Data) │ @request.auth.role │
│                 │                                  │   = 'admin'        │
│ view_rule       │ GET /api/:table/:id              │ public (true)      │
│ create_rule     │ POST /api/:table                 │ @request.auth.id   │
│                 │                                  │   != "" (Auth)     │
│ update_rule     │ PATCH /api/:table/:id            │ user_id =          │
│                 │                                  │  @request.auth.id  │
│ delete_rule     │ DELETE /api/:table/:id           │ user_id =          │
│                 │                                  │  @request.auth.id  │
└─────────────────┴──────────────────────────────────┴────────────────────┘
```

#### Preset & Sintaks Rule Populer:
- **`public` atau `true`**: Siapapun (termasuk publik tanpa login) dapat mengakses.
- **`@request.auth.id != ""`**: Wajib menyertakan Bearer Token JWT pengguna yang terotentikasi.
- **`@request.auth.role = 'admin'`**: Hanya pengguna dengan role `admin` yang diizinkan.
- **`user_id = @request.auth.id`**: Hanya pemilik record yang diizinkan mengedit atau menghapus data miliknya.
- **`false` atau `null`**: Akses terkunci total (hanya dapat diakses oleh Superuser Admin).

#### Keuntungan Pemisahan `list_rule` vs `all_rule`:
Anda dapat membuka rute `GET /api/posts` untuk publik agar pengunjung website dapat membaca artikel terpaginasi (misal 20 data per halaman), sekaligus **mengunci rute `GET /api/posts/all`** khusus untuk Admin. Hal ini mencegah bot atau pihak luar mengekstrak/scraping seluruh database Anda dalam satu tarikan!

#### Server-Side Field Projections (Penyembunyian Kolom):
Pada tab "Projected Fields", Anda dapat mencentang kolom-kolom yang boleh terlihat oleh klien. Kolom yang tidak dicentang (misal: `passwordHash`, `tokenKey`, `internal_notes`) **tidak akan pernah dikirimkan ke klien**, bahkan jika klien memintanya secara eksplisit via `?fields=`.

---

### f. Manajemen Record & Operasi Batch

PadiBase Studio menyediakan antarmuka tabel spreadsheet modern yang aman dan ergonomis:

1. **Tambah Record Baru**:
   - Klik tombol **"+ New Record"**.
   - Isi formulir di slide-over drawer visual, atau beralih ke **JSON Mode** untuk menempelkan data objek JSON secara langsung.
2. **Edit Record Aman (Ergonomic Safety)**:
   - Baris tabel tidak akan membuka form jika diklik sembarangan. Drawer edit hanya terbuka jika Anda secara sengaja mengklik tombol **"Edit"**.
3. **Pencarian, Filter & Sort**:
   - Masukkan kata kunci pencarian real-time pada kolom search.
   - Urutkan kolom cukup dengan mengklik header tabel (Ascending / Descending).
4. **Operasi Batch (Batch Create & Batch Delete)**:
   - **Batch Create (`POST /api/:table/batch`)**: Menambahkan puluhan hingga ratusan record sekaligus dengan menempelkan format JSON array `[{ ... }, { ... }]`.
   - **Batch Delete (`DELETE /api/:table/batch`)**: Centang kotak di samping baris record yang ingin dihapus, lalu klik tombol **"Delete Selected"** dengan konfirmasi dialog aman.
5. **Sync DB Schema**:
   - Jika Anda mengubah skema fisik database secara eksternal (atau setelah menambah kolom), klik **"Sync DB Schema"** untuk memperbarui metadata PadiBase secara instan tanpa perlu mematikan server.

---

## 5. ⚡ Menu API Config & Custom Dynamic SQL

Menu **API Config / Endpoints** (`/_padibase/endpoints`) menyediakan ringkasan interaktif seluruh REST API yang dihasilkan oleh sistem serta fasilitas untuk membuat API kustom.

---

### a. Live Auto-Generated REST Endpoints
Setiap tabel yang Anda buat di menu Table otomatis memiliki katalog dokumentasi endpoint interaktif:
- URL Endpoint lengkap dengan parameter query yang didukung (`?page=`, `?perPage=`, `?sort=`, `?filter=`, `?fields=`).
- Contoh payload JSON request dan struktur response JSON standar.
- Status Access Rule yang sedang aktif untuk endpoint tersebut.

---

### b. Custom Dynamic SQL Endpoints (`/api/custom/*`)
Jika kebutuhan aplikasi Anda melampaui CRUD tabel standar (misalnya: query laporan agregat bulanan, rekap statistik user, atau join multi-tabel khusus), Anda tidak perlu menulis kode backend Rust baru!

1. Klik tombol **"+ New Custom API"**.
2. Masukkan nama endpoint, misal: `user-summary`.
3. Pilih HTTP Method (`GET`, `POST`, `PUT`, atau `DELETE`).
4. Tulis query SQL dengan parameter binding yang aman:
   ```sql
   SELECT 
     u.id, 
     u.name, 
     u.email, 
     COUNT(o.id) AS total_orders, 
     COALESCE(SUM(o.total_amount), 0) AS lifetime_spent
   FROM users u
   LEFT JOIN orders o ON o.user_id = u.id
   WHERE u.created_at >= :since
   GROUP BY u.id
   ORDER BY lifetime_spent DESC
   LIMIT :limit;
   ```
5. Tentukan access rule (misal: `@request.auth.role = 'admin'`).
6. Klik **"Save Endpoint"**.

Endpoint Anda sekarang **langsung aktif dan siap dipanggil** di:
`GET http://127.0.0.1:8085/api/custom/user-summary?since=2026-01-01&limit=10`

Query dijalankan secara aman dengan **SQLx Prepared Statements** (kebal SQL Injection) dan mengembalikan hasil dalam format JSON murni.

---

### c. Ekspor 1-Klik Postman Collection v2.1.0

PadiBase Studio dapat mengekspor seluruh dokumentasi API ke dalam format standar industri **Postman Collection v2.1.0**:
- **Dari Dashboard Studio**: Klik tombol **"Export Postman Collection"** di toolbar atau menu API Config.
- **Dari Terminal / CLI**:
  ```bash
  cargo run -- api-collection --force
  ```
- File JSON yang diunduh dapat langsung diimpor ke aplikasi API Client favorit Anda:
  - **Postman**
  - **Insomnia**
  - **Bruno**
  - **Thunder Client (VS Code)**
  - **VS Code REST Client**

Koleksi yang diekspor sudah dilengkapi dengan environment variables otomatis, token auto-saving pada request login, skema payload, dan contoh respons.

---

## 6. 🗄️ Menu Lainnya di Dashboard Studio

### 📁 Storage Explorer (`/_padibase/storage`)
- **Manajemen Bucket**: Buat bucket baru (misal: `avatars`, `invoices`, `products`).
- **Tampilan Dual Mode**: Beralih antara mode **Tabel Rinci** dan mode **Grid Kartu Thumbnail**.
- **Lightbox Image Viewer**: Klik thumbnail untuk melihat gambar resolusi penuh tanpa meninggalkan halaman.
- **1-Click Copy URL**: Salin URL file media langsung ke clipboard.
- **Zero Orphaned Files**: Ketika record dihapus atau diganti, file fisik lama di folder `padi_data/storage` otomatis dibersihkan dari disk.

### 🛠️ Visual SQL Query Builder (`/_padibase/sqlbuilder`)
- Desain query `SELECT` secara visual dengan memilih tabel dan field yang diinginkan.
- **Auto-Detect Relations**: Mengubah multi-table JOIN menjadi struktur relasi bersarang native `JSON_OBJECT`.
- Tambahkan fungsi agregasi: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, `GROUP_CONCAT` dengan filter `GROUP BY` dan `HAVING`.
- Jalankan **Transaksi Atomik** (`/api/transactions`) dengan jaminan ACID (`BEGIN ... COMMIT`) yang membatalkan seluruh operasi bila salah satu step gagal.

### 📡 Realtime Monitor (`/_padibase/realtime`)
- Streaming perubahan data berbasis **Server-Sent Events (SSE)**.
- Pantau mutasi data (`create`, `update`, `delete`) dari seluruh klien secara langsung dengan latency mendekati nol milidetik.

### ⚙️ Settings & Admins (`/_padibase/settings`)
- Tambah dan kelola akun Superuser lainnya.
- Konfigurasi server **SMTP Email** untuk pengiriman email verifikasi pendaftaran dan email tautan reset kata sandi.
- Sesuaikan durasi kedaluwarsa token JWT dan daftar domain whitelist **CORS**.

---

## 7. 💻 Menghubungkan Frontend via PadiBase JS SDK

Gunakan pustaka resmi **PadiBase JavaScript / TypeScript SDK** (`padi_js_sdk`) untuk menghubungkan aplikasi Vue 3, Nuxt, React, Next.js, Svelte, atau Node.js Anda.

### Inisialisasi Singleton Client
```javascript
// src/lib/padi.js
import PadiBase from 'padibase';

export const padi = new PadiBase('http://127.0.0.1:8085');
export default padi;
```

### Operasi Autentikasi Pengguna (Auth Table)
```javascript
import { padi } from '@/lib/padi';

// 1. Login pengguna
const authData = await padi.collection('users').authWithPassword('john@example.com', 'password123');
console.log('Token JWT:', authData.token);
console.log('User Profile:', authData.record);

// 2. Registrasi akun baru
await padi.collection('users').register({
  email: 'jane@example.com',
  username: 'jane_dev',
  password: 'PasswordRahasia123!',
  passwordConfirm: 'PasswordRahasia123!'
});

// 3. Logout
padi.authStore.clear();
```

### CRUD Record & Decoupled File Upload
```javascript
// 1. Ambil daftar terpaginasi (relasi foreign key otomatis ter-load tanpa N+1)
const result = await padi.table('posts').getList(1, 20, {
  sort: '-created_at',
  filter: 'status = "published"'
});
console.log('Total data:', result.totalItems);
console.log('Daftar artikel:', result.items);

// 2. Upload gambar ke Storage terlebih dahulu, lalu simpan URL-nya ke tabel
const fileInput = document.getElementById('myFileInput');
const uploadRes = await padi.storage.upload('covers', fileInput.files[0]);
// uploadRes -> { url: '/api/storage/covers/f1a2b3_banner.jpg', ... }

// 3. Buat record baru dengan URL gambar yang sudah diunggah
const newPost = await padi.table('posts').create({
  title: 'Mengenal PadiBase Studio',
  user_id: padi.authStore.model.id,
  cover_url: uploadRes.url,
  content: 'PadiBase adalah BaaS berkecepatan tinggi yang ditulis dengan Rust.'
});

// 4. Update data record
await padi.table('posts').update(newPost.id, {
  title: 'Mengenal PadiBase Studio (Updated)'
});

// 5. Hapus record
await padi.table('posts').delete(newPost.id);
```

### Langganan Realtime SSE Stream
```javascript
// Berlangganan event create, update, dan delete secara real-time
const unsubscribe = padi.table('posts').subscribe('*', (e) => {
  console.log('Aksi:', e.action); // 'create' | 'update' | 'delete'
  console.log('Record data:', e.record);
});

// Untuk berhenti berlangganan:
// unsubscribe();
```

---

## 🎯 Ringkasan Langkah Selanjutnya

Sekarang Anda telah memahami cara menjalankan PadiBase, setup admin, menguasai Menu Table, API Config, Storage, dan mengintegrasikannya dengan SDK. 

Lanjutkan eksplorasi Anda pada dokumen-dokumen mendalam berikut:
- **[Panduan Detail Tables & Collections](../02-core-concepts/TABLES_AND_COLLECTIONS.md)**: Arsitektur skema, relasi CASCADE/SET NULL, dan manajemen data.
- **[Panduan Decoupled File Storage](../02-core-concepts/FILE_UPLOAD.md)**: Praktik terbaik pengelolaan file dan media.
- **[Panduan Access Rules & Granular RBAC](../02-core-concepts/RBAC.md)**: Filter keamanan mendalam dan proyeksi kolom.
- **[Panduan Integrasi Frontend](../03-advanced/FRONTEND_INTEGRATION.md)**: Pola arsitektur frontend dengan Vue 3 / React.
