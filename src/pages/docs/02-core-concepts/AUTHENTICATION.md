# 🔐 Authentication & Identity Management

**PadiBase Studio** mengusung arsitektur keamanan tingkat militer dengan algoritma hashing kata sandi **Argon2id**, token stateless **JSON Web Tokens (JWT)**, perlindungan brute-force rate-limiting, dan sistem **Auth Collections** mandiri yang menghasilkan rute autentikasi otomatis.

---

## 📋 Daftar Isi

1. [🛡️ Arsitektur Keamanan PadiBase](#1-arsitektur-keamanan-padibase)
2. [👑 Superuser Gateway (/api/admins)](#2-superuser-gateway-apiadmins)
3. [👥 Auth Collections (/api/collections/:authTable)](#3-auth-collections-apicollectionsauthtable)
4. [🔑 Spesifikasi Endpoint Autentikasi](#4-spesifikasi-endpoint-autentikasi)
5. [🔄 Rotasi Token & TokenKey Session Invalidation](#5-rotasi-token--tokenkey-session-invalidation)
6. [🛡️ Perlindungan Brute-Force Rate Limiting](#6-perlindungan-brute-force-rate-limiting)
7. [💻 Contoh Penggunaan via PadiBase JS SDK](#7-contoh-penggunaan-via-padibase-js-sdk)

---

## 1. 🛡️ Arsitektur Keamanan PadiBase

PadiBase membedakan otentikasi menjadi dua tingkat yang terisolasi:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        TINGKAT OTENTIKASI PADIBASE                     │
├───────────────────────────────────┬────────────────────────────────────┤
│ 👑 Superuser Admin Gateway        │ 👥 User Auth Collections           │
├───────────────────────────────────┼────────────────────────────────────┤
│ • Pengelola dashboard Studio      │ • Pengguna akhir / Member aplikasi │
│ • Tersimpan di tabel `_admins`    │ • Dikelola per-tabel bertipe Auth  │
│ • Akses penuh ke seluruh skema,   │ • Dibatasi oleh Access Rules &     │
│   query builder, dan konfigurasi  │   proyeksi kolom per endpoint      │
│ • Endpoint: `/api/admins/*`       │ • Endpoint: `/api/collections/*`   │
└───────────────────────────────────┴────────────────────────────────────┘
```

- **Argon2id Password Hashing**: Standar tertinggi pemenang Password Hashing Competition (PHC). Sangat kebal terhadap serangan GPU, FPGA, dan ASIC side-channel.
- **Stateless Bearer JWT**: Token ditandatangani secara kriptografis menggunakan kunci rahasia HS256 (`JWT_SECRET`) minimal 32 karakter.

---

## 2. 👑 Superuser Gateway (`/api/admins`)

Digunakan untuk mengotentikasi pengelola PadiBase Studio di `http://127.0.0.1:8085/_padibase/`.

### Alur Bootstrap Admin Pertama:
1. `GET /api/admins/has-admins`: Memeriksa apakah tabel `_admins` sudah memiliki data.
2. `POST /api/admins/setup`: Hanya dapat dipanggil **satu kali** saat database masih bersih untuk mendaftarkan Superuser perdana.
3. `POST /api/admins/auth-with-password`: Login Superuser dengan email dan password.

```bash
# Login Superuser via curl:
curl -X POST http://127.0.0.1:8085/api/admins/auth-with-password \
  -H "Content-Type: application/json" \
  -d '{
    "identity": "admin@padibase.dev",
    "password": "password_rahasia_123"
  }'
```

**Respons (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "adm_001",
    "email": "admin@padibase.dev",
    "avatar": 1
  }
}
```

---

## 3. 👥 Auth Collections (`/api/collections/:authTable`)

Ketika Anda membuat tabel bertipe **Auth Collection** di Studio (misalnya tabel `users`, `members`, atau `customers`), PadiBase secara otomatis menyematkan kolom-kolom kredensial dan memvalidasi keamanannya:

- `email`: Alamat email unik tervalidasi.
- `username`: Nama pengguna unik opsional.
- `passwordHash`: Hash Argon2id dari kata sandi pengguna (tidak pernah bocor ke respons API).
- `tokenKey`: Kunci 32 karakter acak yang disematkan ke payload token JWT.
- `role`: Peran otorisasi pengguna (`user`, `admin`, `manager`, dll).
- `status`: Status keaktifan akun (`active`, `pending`, `banned`).
- `verified`: Boolean penanda status verifikasi email.
- `email_verified_at`: Waktu verifikasi email berhasil.

---

## 4. 🔑 Spesifikasi Endpoint Autentikasi

Setiap tabel Auth Collection otomatis mengekspos endpoint-endpoint berikut:

### 1. Registrasi Akun Baru
`POST /api/collections/:authTable/register`
```json
{
  "email": "budi@example.com",
  "username": "budisantoso",
  "password": "PasswordAman123!",
  "passwordConfirm": "PasswordAman123!"
}
```

### 2. Login dengan Password
`POST /api/collections/:authTable/auth-with-password`
```json
{
  "identity": "budi@example.com",
  "password": "PasswordAman123!"
}
```
Field `identity` dapat menerima alamat `email` maupun `username`.

### 3. Refresh Token JWT
`POST /api/collections/:authTable/auth-refresh`
Kirimkan header `Authorization: Bearer <TOKEN_LAMA>` untuk mendapatkan token baru yang segar.

### 4. Permintaan Reset Password
`POST /api/collections/:authTable/request-password-reset`
```json
{
  "email": "budi@example.com"
}
```
PadiBase akan mengirimkan email berisi token reset password aman melalui server SMTP yang dikonfigurasi di Settings.

### 5. Konfirmasi Reset Password
`POST /api/collections/:authTable/confirm-password-reset`
```json
{
  "token": "reset_token_dari_email",
  "password": "PasswordBaru456!",
  "passwordConfirm": "PasswordBaru456!"
}
```

### 6. Ganti Password Pengguna yang Sedang Login
`POST /api/collections/:authTable/change-password`
```json
{
  "oldPassword": "PasswordAman123!",
  "newPassword": "PasswordBaruBaru789!",
  "newPasswordConfirm": "PasswordBaruBaru789!"
}
```

### 7. Permintaan & Konfirmasi Verifikasi Email
- `POST /api/collections/:authTable/request-verification`: Mengirim email verifikasi akun.
- `POST /api/collections/:authTable/confirm-verification`: Mengonfirmasi token verifikasi email.

### 8. Ambil Profil Pengguna Aktif
`GET /api/collections/:authTable/me`
Header: `Authorization: Bearer <TOKEN>`

---

## 5. 🔄 Rotasi Token & TokenKey Session Invalidation

PadiBase menyematkan field `tokenKey` ke dalam klaim JWT pengguna. 
Ketika pengguna:
1. Mengubah kata sandinya (`change-password`), atau
2. Melakukan reset password (`confirm-password-reset`),

PadiBase secara otomatis **meregenerasi nilai `tokenKey`** di database. Akibatnya, seluruh token JWT lama yang beredar di perangkat lain **langsung tidak valid dan tertolak seketika**, mencegah sesi curian disalahgunakan.

---

## 6. 🛡️ Perlindungan Brute-Force Rate Limiting

PadiBase secara otomatis mengaktifkan filter **Rate Limiting sensitif otentikasi**:
- Rute-rute login, verifikasi, registrasi, dan perubahan password secara ketat dibatasi jumlah percobaannya per alamat IP klien.
- Upaya tebakan kata sandi berulang akan diblokir dengan respons `429 Too Many Requests`.

---

## 7. 💻 Contoh Penggunaan via PadiBase JS SDK

```javascript
import PadiBase from 'padibase';

const padi = new PadiBase('http://127.0.0.1:8085');

// 1. Login pengguna
const authData = await padi.collection('users').authWithPassword('budi@example.com', 'PasswordAman123!');
console.log('Login berhasil! Token:', authData.token);
console.log('User Profile:', authData.record);

// Token otomatis tersimpan di padi.authStore dan disematkan ke setiap request berikutnya!

// 2. Ambil profil user saat ini:
const me = await padi.collection('users').getProfile();
console.log('Profil saya:', me);

// 3. Ganti kata sandi:
await padi.collection('users').changePassword('PasswordAman123!', 'PasswordBaruBaru789!');

// 4. Logout:
padi.authStore.clear();
```
