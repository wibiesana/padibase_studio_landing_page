# 📱 Frontend Integration & PadiBase JS/TS SDK

The official **PadiBase JavaScript / TypeScript SDK** (`padibase`) provides a fast, zero-dependency client that is fully compatible with **Vue 3, Nuxt, React, Next.js, Svelte, Angular, and Node.js**.

---

## 📋 Table of Contents

1. [📦 Installation & Singleton Setup](#1-installation--singleton-setup)
2. [🔐 User Authentication & AuthStore](#2-user-authentication--authstore)
3. [📊 Table & Record CRUD Operations](#3-table--record-crud-operations)
4. [📁 Decoupled Media Uploads](#4-decoupled-media-uploads)
5. [⚡ Batch Operations: Mass Create & Delete](#5-batch-operations-mass-create--delete)
6. [📡 Realtime SSE Stream Subscriptions](#6-realtime-sse-stream-subscriptions)
7. [🛠️ Custom Dynamic SQL & Atomic Transactions](#7-custom-dynamic-sql--atomic-transactions)
8. [💚 Vue 3 & React Component Examples](#8-vue-3--react-component-examples)

---

## 1. 📦 Installation & Singleton Setup

### Package Installation
```bash
# Using npm:
npm install padibase

# Using pnpm or yarn:
pnpm add padibase
yarn add padibase
```

### Initializing the Client Singleton (`src/lib/padi.js` or `padi.ts`)
Create a single centralized instance to share across your application:

```javascript
// src/lib/padi.js
import PadiBase from 'padibase';

export const padi = new PadiBase(
  import.meta.env?.VITE_PADIBASE_URL || 'http://127.0.0.1:8085'
);

export default padi;
```

---

## 2. 🔐 User Authentication & AuthStore

The SDK reactively manages JWT tokens and user profile state via `padi.authStore`:

```javascript
import { padi } from '@/lib/padi';

// 1. Login with Email or Username + Password on an Auth Table (e.g. 'users')
const authData = await padi.collection('users').authWithPassword('budi@example.com', 'SecurePassword123!');
console.log('Login successful:', authData.record);
console.log('JWT Token:', authData.token);

// 2. Register a new user account
await padi.collection('users').register({
  email: 'siti@example.com',
  username: 'sitiaminah',
  password: 'SecurePassword123!',
  passwordConfirm: 'SecurePassword123!'
});

// 3. Check if user is currently authenticated:
if (padi.authStore.isValid) {
  console.log('Active user:', padi.authStore.model);
}

// 4. Listen reactively to authentication state changes:
padi.authStore.onChange((token, model) => {
  console.log('Auth state changed. User:', model);
});

// 5. Change password:
await padi.collection('users').changePassword('OldPassword123!', 'NewPassword456!');

// 6. Password reset flow:
await padi.collection('users').requestPasswordReset('budi@example.com');
await padi.collection('users').confirmPasswordReset('token_from_email', 'BrandNewPassword123!');

// 7. Logout:
padi.authStore.clear();
```

---

## 3. 📊 Table & Record CRUD Operations

```javascript
// 1. Fetch paginated records (2-level foreign keys auto-loaded with zero N+1)
const result = await padi.table('posts').getList(1, 20, {
  sort: '-created_at',
  filter: 'status = "published"'
});
console.log('Items:', result.items);
console.log('Total items:', result.totalItems);
console.log('Total pages:', result.totalPages);

// 2. Fetch first matching record:
const firstPost = await padi.table('posts').getFirstListItem('slug = "hello-world"');

// 3. Count matching records:
const count = await padi.table('posts').getCount('status = "published"');

// 4. Fetch single record by ID:
const post = await padi.table('posts').getOne(42);

// 5. Create new record:
const created = await padi.table('posts').create({
  title: 'Complete PadiBase Tutorial',
  slug: 'complete-padibase-tutorial',
  content: 'Building modern web apps with PadiBase BaaS.'
});

// 6. Partial update:
await padi.table('posts').update(created.id, {
  title: 'Complete PadiBase Tutorial (Updated)'
});

// 7. Delete record:
await padi.table('posts').delete(created.id);
```

---

## 4. 📁 Decoupled Media Uploads

> [!NOTE]
> PadiBase tables do not have `FILE` columns. Upload files to Storage, then save the returned URL into a standard `TEXT` column:

```javascript
// Step 1: Upload media file to Storage Explorer (bucket 'avatars')
const fileInput = document.getElementById('userAvatarInput');
const uploadResult = await padi.storage.upload('avatars', fileInput.files[0]);

console.log('Upload successful! File URL:', uploadResult.url);

// Step 2: Save the URL into the avatar_url text field in the user profile table
await padi.table('profiles').create({
  user_id: padi.authStore.model.id,
  full_name: 'Budi Santoso',
  avatar_url: uploadResult.url // File URL stored in TEXT column
});
```

---

## 5. ⚡ Batch Operations: Mass Create & Delete

```javascript
// Batch Create multiple records in a single atomic transaction:
const batchItems = [
  { name: 'Tech Category', slug: 'tech' },
  { name: 'Design Category', slug: 'design' },
  { name: 'Business Category', slug: 'business' }
];

const batchCreateResult = await padi.table('categories').createBatch(batchItems);
console.log('Batch created:', batchCreateResult);

// Batch Delete multiple IDs in a single request:
await padi.table('categories').deleteBatch([1, 2, 3]);
```

---

## 6. 📡 Realtime SSE Stream Subscriptions

The SDK automatically maintains an SSE connection to `/api/realtime` with auto-reconnection:

```javascript
// Subscribe to all mutation events (* = create, update, delete) on table 'posts'
const unsubscribe = padi.table('posts').subscribe('*', (e) => {
  console.log('Realtime action:', e.action); // 'create' | 'update' | 'delete'
  console.log('Record data:', e.record);

  if (e.action === 'create') {
    postsList.value.unshift(e.record);
  } else if (e.action === 'update') {
    const idx = postsList.value.findIndex(p => p.id === e.record.id);
    if (idx !== -1) postsList.value[idx] = e.record;
  } else if (e.action === 'delete') {
    postsList.value = postsList.value.filter(p => p.id !== e.record.id);
  }
});

// To unsubscribe:
// unsubscribe();
```

---

## 7. 🛠️ Custom Dynamic SQL & Atomic Transactions

### Calling a Custom Dynamic SQL Endpoint:
```javascript
// Invoking custom endpoints created via API Config:
const stats = await padi.custom.get('monthly-revenue', {
  start_date: '2026-01-01',
  limit: 10
});
console.log('Report analytics:', stats);
```

### Multi-Table Atomic ACID Transactions:
```javascript
// Execute multi-table operations with ACID guarantees (BEGIN ... COMMIT)
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
console.log('Transaction executed successfully!');
```

---

## 8. 💚 Vue 3 & React Component Examples

### Vue 3 (`<script setup>`)
```vue
<template>
  <div class="posts-container">
    <h2>Live Posts Stream</h2>
    <div v-for="post in posts" :key="post.id" class="post-card">
      <img v-if="post.cover_url" :src="post.cover_url" class="post-cover" />
      <h3>{{ post.title }}</h3>
      <p>Author: {{ post.user?.name || 'Anonymous' }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { padi } from '@/lib/padi';

const posts = ref([]);
let unsubscribe = null;

onMounted(async () => {
  // 1. Initial fetch
  const res = await padi.table('posts').getList(1, 10, { sort: '-created_at' });
  posts.value = res.items;

  // 2. Realtime SSE subscription
  unsubscribe = padi.table('posts').subscribe('*', (e) => {
    if (e.action === 'create') posts.value.unshift(e.record);
  });
});

onUnmounted(() => {
  if (unsubscribe) unsubscribe();
});
</script>
```
