# ⚡ API Config, Custom Dynamic SQL & Postman Export

Menu **API Config / Endpoints** (`/_padibase/endpoints`) di PadiBase Studio adalah pusat kendali untuk meninjau seluruh rute REST API yang aktif, merancang **Custom Dynamic SQL Endpoints**, menjadwalkan tugas **Cron**, serta mengekspor seluruh spesifikasi API ke format **Postman Collection v2.1.0** dalam 1 klik.

---

## 📋 Daftar Isi

1. [🧭 Tinjauan Menu API Config & Endpoints](#1-tinjauan-menu-api-config--endpoints)
2. [📡 Live Auto-Generated REST Endpoints](#2-live-auto-generated-rest-endpoints)
3. [🛠️ Custom Dynamic SQL Endpoints (/api/custom/*)](#3-custom-dynamic-sql-endpoints-apicustom)
4. [⏰ Background Cron Tasks & Scheduled SQL](#4-background-cron-tasks--scheduled-sql)
5. [📑 1-Click Postman Collection v2.1.0 Exporter](#5-1-klik-postman-collection-v210-exporter)
6. [🚀 Panduan Impor ke Postman, Insomnia & Bruno](#6-panduan-impor-ke-postman-insomnia--bruno)

---

## 1. 🧭 Tinjauan Menu API Config & Endpoints

Saat Anda membuka menu **API Config** di sidebar Studio, Anda disajikan:
- **Katalog Rute Aktif**: Daftar seluruh endpoint REST yang dihasilkan secara dinamis untuk setiap tabel (Base & Auth).
- **Status Aturan Akses**: Indikator warna apakah rute tersebut bersifat `Public`, `Auth Required`, `Admin Only`, atau `Owner Only`.
- **Ekspor Cepat**: Tombol untuk mengunduh koleksi API sistem penuh atau per-tabel ke format Postman v2.1.
- **Custom API Manager**: Antarmuka untuk membuat dan mengelola query SQL parameterized kustom.

---

## 2. 📡 Live Auto-Generated REST Endpoints

Setiap tabel di PadiBase secara otomatis memiliki rute REST standar berkinerja tinggi:

```text
┌────────┬───────────────────────────────────┬────────────────────────────────────────┐
│ Method │ Rute Endpoint                     │ Deskripsi                              │
├────────┼───────────────────────────────────┼────────────────────────────────────────┤
│ GET    │ /api/:table                       │ Daftar terpaginasi (?page=1&perPage=20)│
│ GET    │ /api/:table/all                   │ Seluruh data tabel tanpa paginasi      │
│ GET    │ /api/:table/:id                   │ Detail record tunggal berdasarkan ID   │
│ POST   │ /api/:table                       │ Tambah record baru                     │
│ PATCH  │ /api/:table/:id                   │ Perbarui data record                   │
│ DELETE │ /api/:table/:id                   │ Hapus data record                      │
│ POST   │ /api/:table/batch                 │ Batch Create banyak baris dari JSON    │
│ DELETE │ /api/:table/batch                 │ Batch Delete baris terpilih            │
│ POST   │ /api/collections/:auth/login      │ Login Auth Table (Argon2id + JWT)      │
│ POST   │ /api/collections/:auth/register   │ Registrasi Auth Table                  │
└────────┴───────────────────────────────────┴────────────────────────────────────────┘
```

### Parameter Query yang Didukung:
- **`?page=1&perPage=30`**: Kontrol paginasi data.
- **`?sort=-created_at,name`**: Urutkan data (`-` untuk Descending).
- **`?filter=(status='active' && price > 1000)`**: Filter kondisional ekspresi.
- **`?fields=id,title,cover_url`**: Meminta kolom tertentu (tetap tunduk pada server-side projection).

---

## 3. 🛠️ Custom Dynamic SQL Endpoints (`/api/custom/*`)

Ketika aplikasi Anda membutuhkan query analitik kompleks, laporan agregasi multi-tabel, atau logika kustom yang tidak tercover oleh CRUD standar, Anda **tidak perlu memodifikasi kode backend Rust**. Anda dapat membuatnya langsung di menu ini!

### Langkah Membuat Custom SQL Endpoint:
1. Klik tombol **"+ New Custom API"**.
2. **Nama Rute**: Tentukan nama identifier unik (misal: `monthly-revenue`). Endpoint akan aktif di `/api/custom/monthly-revenue`.
3. **HTTP Method**: Pilih `GET`, `POST`, `PUT`, atau `DELETE`.
4. **Access Rule**: Tentukan siapa yang boleh memanggil endpoint ini (misal: `@request.auth.role = 'admin'`).
5. **Query SQL dengan Parameter Bindings**:
   Gunakan placeholder `:nama_parameter` untuk parameter dinamis yang aman dari SQL Injection:
   ```sql
   SELECT 
     DATE_TRUNC('month', created_at) AS order_month,
     COUNT(id) AS total_transactions,
     SUM(total_amount) AS gross_revenue,
     AVG(total_amount) AS average_ticket
   FROM orders
   WHERE status = 'completed' AND created_at >= :start_date
   GROUP BY order_month
   ORDER BY order_month DESC
   LIMIT :limit;
   ```
6. Klik **"Save Endpoint"**.

### Cara Pemanggilan dari Klien:
Kirimkan parameter query string untuk method `GET` atau JSON body untuk method `POST`:
```bash
curl -X GET "http://127.0.0.1:8085/api/custom/monthly-revenue?start_date=2026-01-01&limit=12" \
  -H "Authorization: Bearer <ADMIN_JWT_TOKEN>"
```

PadiBase mengeksekusi query melalui **SQLx Prepared Statement** dan mengembalikan hasilnya dalam bentuk JSON native murni:
```json
{
  "status": 200,
  "success": true,
  "items": [
    {
      "order_month": "2026-04-01T00:00:00Z",
      "total_transactions": 1420,
      "gross_revenue": 345000000,
      "average_ticket": 242957.74
    }
  ]
}
```

---

## 4. ⏰ Background Cron Tasks & Scheduled SQL

PadiBase menyediakan **Cron Task Scheduler** bawaan di dalam binary Rust:
- Anda dapat menjadwalkan query SQL tertentu untuk dieksekusi secara otomatis di latar belakang (misalnya: membersihkan token kedaluwarsa setiap tengah malam, mengarsipkan order lama, atau menghitung ulang statistik berkala).
- Mendukung sintaks cron 5-segmen standar (`* * * * *` untuk menit, jam, hari dalam bulan, bulan, hari dalam minggu).
- Contoh: `0 2 * * *` (Jalankan setiap pukul 02:00 pagi).

---

## 5. 📑 1-Klik Postman Collection v2.1.0 Exporter

PadiBase Studio dapat mengompilasi seluruh spesifikasi API menjadi file standar **Postman Collection v2.1.0 JSON**.

### A. Ekspor Langsung dari Dashboard Studio UI
- Klik tombol **"Export Postman Collection"** pada menu API Config atau di header tabel.
- File JSON siap pakai akan langsung diunduh ke browser Anda.

### B. Ekspor via Terminal / CLI
```bash
# Ekspor seluruh sistem dan seluruh koleksi tabel ke direktori ./api_collection
cargo run -- api-collection --force

# Ekspor koleksi tabel tertentu saja (misal: posts)
cargo run -- api-collection --collection posts --force

# Kustomisasi base URL dan output folder:
cargo run -- api-collection --output ./my_postman --base-url "http://127.0.0.1:8085"
```

File yang dihasilkan mencakup:
1. `padi_base_api_collection.json`: Master koleksi lengkap mencakup Gateway Admin, Autentikasi Pengguna, Operasi Koleksi, Batch Actions, dan Realtime SSE.
2. `<table_name>_collection.json`: Koleksi modular per-tabel yang ringkas.

---

## 6. 🚀 Panduan Impor ke Postman, Insomnia & Bruno

1. **Buka Aplikasi API Client** pilihan Anda (Postman / Insomnia / Bruno / Thunder Client).
2. Pilih opsi **Import** -> Pilih file JSON hasil ekspor PadiBase.
3. Seluruh folder, endpoint, query parameters, dan contoh payload request akan langsung terisi rapi!
4. **Auto-Save JWT Token**:
   Ketika Anda menjalankan request login (`auth-with-password`), Postman test script bawaan yang disertakan oleh PadiBase akan otomatis menyimpan token JWT ke variabel koleksi `{{token}}` sehingga seluruh request terproteksi lainnya dapat langsung dijalankan tanpa perlu copy-paste token manual!
