# 📁 File Storage & Supabase-Style Storage Explorer

**PadiBase Studio** mengusung arsitektur **Decoupled File Storage** terisolasi berkecepatan tinggi yang dipadukan dengan **Supabase-Style Storage Explorer** visual di `/_padibase/storage`. Sistem ini dilengkapi sandbox keamanan konten aktif, pencegahan directory traversal, dan **Zero Orphaned Files** pembersihan fisik otomatis.

---

## 📋 Daftar Isi

1. [🏗️ Arsitektur Decoupled File Storage](#1-arsitektur-decoupled-file-storage)
2. [📁 Supabase-Style Storage Explorer di Studio](#2-supabase-style-storage-explorer-di-studio)
3. [⚡ Alur Unggah & Penyimpanan URL ke Tabel](#3-alur-unggah--penyimpanan-url-ke-tabel)
4. [🛡️ Keamanan: Sandbox XSS & Path Traversal Guard](#4-keamanan-sandbox-xss--path-traversal-guard)
5. [🧹 Siklus Hidup Zero Orphaned Files (Garbage Collection)](#5-siklus-hidup-zero-orphaned-files-garbage-collection)
6. [💻 Contoh Penggunaan via SDK & REST API](#6-contoh-penggunaan-via-sdk--rest-api)

---

## 1. 🏗️ Arsitektur Decoupled File Storage

> [!IMPORTANT]
> **Tidak ada kolom bertipe `FILE` pada skema tabel PadiBase.**
> Berbeda dari pendekatan lama yang mencampuradukkan payload multipart record dengan skema tabel, PadiBase Studio memisahkan penanganan file media ke layer **Storage Dedicated**:
> 1. File diunggah secara independen ke endpoint storage (`/api/storage/:bucket`).
> 2. Endpoint mengembalikan URL publik/terproteksi ke file tersebut.
> 3. Klien atau form Studio menyimpan URL file tersebut ke kolom bertipe **`TEXT`** (misal: `avatar_url`, `cover_image`, `document_path`).

### Tata Letak Direktori Penyimpanan Terisolasi:
```text
padi_data/storage/
├── avatars/
│   ├── rec_001_171400_budi_avatar.png
│   └── rec_002_171401_siti_photo.jpg
├── covers/
│   └── rec_042_171402_rust_guide_cover.webp
└── documents/
    └── rec_099_171403_invoice_2026.pdf
```

---

## 2. 📁 Supabase-Style Storage Explorer di Studio

Navigasikan ke menu **Storage** di sidebar Studio (`/_padibase/storage`) untuk menikmati fitur media explorer:

- **Daftar Bucket Terisolasi**: Tinjau semua bucket media (misal: `avatars`, `covers`, `documents`) lengkap dengan metrik total file dan total konsumsi penyimpanan (`KB / MB / GB`).
- **Tampilan Dual Mode**:
  - **Table View**: Tampilan tabel rinci dengan nama file, ukuran, tipe MIME, dan tanggal upload.
  - **Grid Cards View**: Tampilan galeri kartu dengan thumbnail gambar resolusi tinggi.
- **Lightbox Image Viewer**: Klik thumbnail gambar untuk membuka modal Lightbox layar penuh tanpa perlu meninggalkan dashboard.
- **1-Click Copy URL**: Tombol salin URL instan untuk mendapatkan tautan `/api/storage/:bucket/:file` ke clipboard.
- **Force Download (`?download=1`)**: Unduh file secara paksa dengan header `Content-Disposition: attachment`.

---

## 3. ⚡ Alur Unggah & Penyimpanan URL ke Tabel

### Di Antarmuka Visual PadiBase Studio:
Saat Anda mengedit atau membuat baris record di menu **Table**:
1. Buka drawer record.
2. Di samping input teks kolom gambar (misal `avatar_url`), klik tombol **"Upload to Storage"**.
3. Pilih file gambar atau dokumen dari komputer Anda.
4. PadiBase Studio langsung mengunggah file tersebut ke bucket Storage, menerima URL-nya, dan **menempelkannya ke input teks secara otomatis**.
5. Gambar pratinjau langsung muncul di samping input teks.

### Melalui REST API:
#### Langkah 1: Unggah File ke Storage
```bash
curl -X POST http://127.0.0.1:8085/api/storage/avatars \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -F "file=@/path/to/my_avatar.png"
```
**Respons (200 OK):**
```json
{
  "success": true,
  "file": {
    "bucket": "avatars",
    "name": "f1a2b3_my_avatar.png",
    "size": 184320,
    "mime": "image/png",
    "url": "/api/storage/avatars/f1a2b3_my_avatar.png"
  }
}
```

#### Langkah 2: Buat atau Perbarui Record dengan URL Tersebut
```bash
curl -X POST http://127.0.0.1:8085/api/users \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Budi Santoso",
    "avatar_url": "/api/storage/avatars/f1a2b3_my_avatar.png"
  }'
```

---

## 4. 🛡️ Keamanan: Sandbox XSS & Path Traversal Guard

PadiBase Storage dirancang dengan pertahanan berlapis:

1. **Path Traversal Guard**:
   - Setiap segmen nama bucket dan nama file divalidasi dengan `is_safe_segment()` dan path kanonikalisasi sistem operasi.
   - Upaya injeksi `..`, pemisah path silang (`/`, `\`), dan karakter NUL (`\0`) ditolak secara instan dengan error `400 Bad Request`.
2. **XSS & Active Content Sandbox**:
   - File dengan konten aktif yang berpotensi mengeksekusi skrip di browser (seperti `.html`, `.svg`, `.xml`, `.js`) dipaksa diunduh dengan header:
     ```http
     Content-Disposition: attachment; filename="..."
     Content-Security-Policy: default-src 'none'; sandbox
     X-Content-Type-Options: nosniff
     ```
   - Ini mencegah serangan Stored XSS ketika pengguna mengunggah file SVG berbahaya.

---

## 5. 🧹 Siklus Hidup Zero Orphaned Files (Garbage Collection)

Salah satu masalah terbesar penyimpanan media adalah menumpuknya file "yatim" (file yang sudah tidak dipakai tetapi tetap memakan memori disk).

PadiBase menerapkan **Zero Orphaned Files Lifecycle**:
- **Saat Record Dihapus**: Ketika Anda memanggil `DELETE /api/users/:id`, PadiBase secara otomatis mendeteksi URL file yang tersimpan pada kolom teks record tersebut dan menghapus file fisiknya dari folder `padi_data/storage/`.
- **Saat URL File Diperbarui**: Jika record diperbarui dengan URL gambar baru melalui `PATCH /api/users/:id`, file gambar fisik lama yang sebelumnya terhubung akan otomatis dihapus dari disk.

---

## 6. 💻 Contoh Penggunaan via SDK & REST API

### Menggunakan PadiBase JS SDK:
```javascript
import PadiBase from 'padibase';

const padi = new PadiBase('http://127.0.0.1:8085');

// 1. Upload file media ke bucket 'avatars'
const fileInput = document.querySelector('#avatarInput');
const uploadResult = await padi.storage.upload('avatars', fileInput.files[0]);

console.log('URL File:', uploadResult.url);

// 2. Simpan URL file ke record tabel
const profile = await padi.table('profiles').create({
  full_name: 'Siti Aminah',
  avatar_url: uploadResult.url
});

// 3. Tampilkan gambar di template frontend:
// <img :src="profile.avatar_url" alt="Avatar" />
```

### Mengambil atau Mengunduh File Langsung:
```text
# URL Standar (Inline preview di browser):
http://127.0.0.1:8085/api/storage/avatars/f1a2b3_my_avatar.png

# Paksa Browser Mengunduh (Force Download):
http://127.0.0.1:8085/api/storage/avatars/f1a2b3_my_avatar.png?download=1
```
