# 📱 Frontend Integration & PadiBase JS/TS SDK

Pustaka resmi **PadiBase JavaScript / TypeScript SDK** (`padi_js_sdk`) menyediakan antarmuka klien zero-dependency yang cepat, terstruktur, dan sepenuhnya kompatibel dengan **Vue 3, Nuxt, React, Next.js, Svelte, Angular, dan Node.js**.

---

## 📋 Daftar Isi

1. [📦 Instalasi & Setup Singleton](#1-instalasi--setup-singleton)
2. [🔐 Autentikasi Pengguna & AuthStore](#2-autentikasi-pengguna--authstore)
3. [📊 Operasi CRUD Tabel & Record](#3-operasi-crud-tabel--record)
4. [📁 Upload Media Terpisah (Decoupled Storage)](#4-upload-media-terpisah-decoupled-storage)
5. [⚡ Operasi Batch: Create & Delete Massal](#5-operasi-batch-create--delete-massal)
6. [📡 Langganan Realtime SSE Stream](#6-langganan-realtime-sse-stream)
7. [🛠️ Custom Dynamic SQL & Transaksi Atomik](#7-custom-dynamic-sql--transaksi-atomik)
8. [💚 Contoh Komponen Vue 3 & React](#8-contoh-komponen-vue-3--react)

---

## 1. 📦 Instalasi & Setup Singleton

### Instalasi Paket
```bash
# Menggunakan npm:
npm install padibase

# Atau menggunakan pnpm / yarn:
pnpm add padibase
yarn add padibase
```

### Inisialisasi Singleton Client (`src/lib/padi.js` atau `padi.ts`)
Buat satu instance singleton terpusat untuk dipakai di seluruh komponen:

```javascript
// src/lib/padi.js
import PadiBase from 'padibase';

export const padi = new PadiBase(
  import.meta.env?.VITE_PADIBASE_URL || 'http://127.0.0.1:8085'
);

export default padi;
```

---

## 2. 🔐 Autentikasi Pengguna & AuthStore

PadiBase SDK mengelola status token JWT dan profil pengguna secara reaktif via `padi.authStore`:

```javascript
import { padi } from '@/lib/padi';

// 1. Login dengan Email/Username + Password pada Auth Table (misal: 'users')
const authData = await padi.collection('users').authWithPassword('budi@example.com', 'PasswordAman123!');
console.log('Login berhasil:', authData.record);
console.log('Token JWT:', authData.token);

// 2. Registrasi akun pengguna baru
await padi.collection('users').register({
  email: 'siti@example.com',
  username: 'sitiaminah',
  password: 'PasswordRahasia123!',
  passwordConfirm: 'PasswordRahasia123!'
});

// 3. Cek apakah pengguna saat ini sedang login:
if (padi.authStore.isValid) {
  console.log('User aktif:', padi.authStore.model);
}

// 4. Dengarkan perubahan status otentikasi secara reaktif:
padi.authStore.onChange((token, model) => {
  console.log('Status auth berubah. User:', model);
});

// 5. Ganti kata sandi:
await padi.collection('users').changePassword('PasswordLama123!', 'PasswordBaru456!');

// 6. Alur Lupa & Reset Password:
await padi.collection('users').requestPasswordReset('budi@example.com');
await padi.collection('users').confirmPasswordReset('token_dari_email', 'PasswordBaruBaru!');

// 7. Logout:
padi.authStore.clear();
```

---

## 3. 📊 Operasi CRUD Tabel & Record

```javascript
// 1. Ambil data terpaginasi (Relasi foreign key 2-tingkat auto-load tanpa N+1)
const result = await padi.table('posts').getList(1, 20, {
  sort: '-created_at',
  filter: 'status = "published"'
});
console.log('Daftar data:', result.items);
console.log('Total baris:', result.totalItems);
console.log('Total halaman:', result.totalPages);

// 2. Ambil 1 record pertama yang cocok:
const firstPost = await padi.table('posts').getFirstListItem('slug = "halo-dunia"');

// 3. Hitung jumlah total record yang cocok dengan filter:
const totalPublished = await padi.table('posts').getCount('status = "published"');

// 4. Ambil 1 data berdasarkan ID:
const post = await padi.table('posts').getOne(42);

// 5. Tambah record baru:
const created = await padi.table('posts').create({
  title: 'Tutorial PadiBase Lengkap',
  slug: 'tutorial-padibase-lengkap',
  content: 'Belajar BaaS modern dengan Rust.'
});

// 6. Perbarui data (Partial update):
await padi.table('posts').update(created.id, {
  title: 'Tutorial PadiBase Lengkap (Revisi)'
});

// 7. Hapus data:
await padi.table('posts').delete(created.id);
```

---

## 4. 📁 Upload Media Terpisah (Decoupled Storage)

> [!NOTE]
> Ingat bahwa tabel PadiBase tidak memiliki kolom bertipe `FILE`. Unggah file ke Storage, lalu simpan URL yang dikembalikan ke kolom bertipe `TEXT`:

```javascript
// Langkah 1: Unggah file ke Storage Explorer (bucket 'avatars')
const fileInput = document.getElementById('userAvatarInput');
const uploadResult = await padi.storage.upload('avatars', fileInput.files[0]);

console.log('File berhasil diunggah! URL:', uploadResult.url);

// Langkah 2: Simpan URL tersebut ke kolom avatar_url di tabel pengguna
await padi.table('profiles').create({
  user_id: padi.authStore.model.id,
  full_name: 'Budi Santoso',
  avatar_url: uploadResult.url // URL file disimpan di kolom teks
});
```

---

## 5. ⚡ Operasi Batch: Create & Delete Massal

```javascript
// Batch Create banyak record sekaligus dalam satu transaksi atomik:
const batchItems = [
  { name: 'Kategori Tech', slug: 'tech' },
  { name: 'Kategori Desain', slug: 'design' },
  { name: 'Kategori Bisnis', slug: 'business' }
];

const batchCreateResult = await padi.table('categories').createBatch(batchItems);
console.log('Record berhasil dibuat:', batchCreateResult);

// Batch Delete banyak ID sekaligus:
await padi.table('categories').deleteBatch([1, 2, 3]);
```

---

## 6. 📡 Langganan Realtime SSE Stream

PadiBase SDK secara otomatis menghubungkan koneksi Server-Sent Events (`/api/realtime`) dengan penanganan rekoneksi cerdas:

```javascript
// Berlangganan seluruh aksi pada tabel 'posts' (* = create, update, delete)
const unsubscribe = padi.table('posts').subscribe('*', (e) => {
  console.log('Event Realtime:', e.action); // 'create' | 'update' | 'delete'
  console.log('Data Record:', e.record);

  if (e.action === 'create') {
    postsList.value.unshift(e.record);
  } else if (e.action === 'update') {
    const idx = postsList.value.findIndex(p => p.id === e.record.id);
    if (idx !== -1) postsList.value[idx] = e.record;
  } else if (e.action === 'delete') {
    postsList.value = postsList.value.filter(p => p.id !== e.record.id);
  }
});

// Untuk berhenti berlangganan saat komponen di-unmount:
// unsubscribe();
```

---

## 7. 🛠️ Custom Dynamic SQL & Transaksi Atomik

### Memanggil Custom Dynamic SQL Endpoint:
```javascript
// Memanggil endpoint custom yang dibuat di menu API Config:
const stats = await padi.custom.get('monthly-revenue', {
  start_date: '2026-01-01',
  limit: 10
});
console.log('Laporan statistik:', stats);
```

### Menjalankan Transaksi Atomik Multi-Tabel:
```javascript
// Eksekusi mutasi multi-tabel dengan jaminan ACID (BEGIN ... COMMIT)
const result = await padi.transaction([
  {
    table: 'orders',
    action: 'create',
    data: { user_id: 5, total_amount: 150000, status: 'paid' }
  },
  {
    table: 'wallets',
    action: 'update',
    id: 12,
    data: { balance: 350000 }
  }
]);
console.log('Transaksi berhasil!');
```

---

## 8. 💚 Contoh Komponen Vue 3 & React

### Komponen Vue 3 (Composition API `<script setup>`)
```vue
<template>
  <div class="posts-container">
    <h2>Daftar Artikel Live</h2>
    <div v-for="post in posts" :key="post.id" class="post-card">
      <img v-if="post.cover_url" :src="post.cover_url" class="post-cover" />
      <h3>{{ post.title }}</h3>
      <p>Penulis: {{ post.user?.name || 'Anonim' }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { padi } from '@/lib/padi';

const posts = ref([]);
let unsubscribe = null;

onMounted(async () => {
  // 1. Ambil data awal
  const res = await padi.table('posts').getList(1, 10, { sort: '-created_at' });
  posts.value = res.items;

  // 2. Langganan realtime SSE untuk update live
  unsubscribe = padi.table('posts').subscribe('*', (e) => {
    if (e.action === 'create') posts.value.unshift(e.record);
  });
});

onUnmounted(() => {
  if (unsubscribe) unsubscribe();
});
</script>
```
