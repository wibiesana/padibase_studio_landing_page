# 📱 Frontend Integration & Official JS/TS SDK (`padibase`)

The official **PadiBase JavaScript / TypeScript SDK** (`padi_js_sdk`) provides a zero-dependency client with Direct HTTP methods, Table CRUD, reactive `AuthStore`, and Auto Realtime (SSE) streaming.

---

## 1. Shared Singleton Setup (DRY Principle)

Create `src/lib/padi.js` (or `src/lib/padi.ts`) once and import it across your components:

```javascript
// src/lib/padi.js
import PadiBase from 'padibase';

export const padi = new PadiBase(
  import.meta.env?.VITE_PADIBASE_URL || 'http://127.0.0.1:8085'
);

export default padi;
```

---

## 2. Table & Records CRUD

```javascript
import { padi } from '@/lib/padi';

// 1. Paginated records list (Backend 2-level relations & projections applied automatically)
const result = await padi.table('posts').getList(1, 20, {
  filter: 'status = "published"',
  sort: '-created'
});

// 2. Unpaginated full list (/api/posts/all)
const allPosts = await padi.table('posts').getFullList({ sort: '-created' });

// 3. Single record by ID
const post = await padi.table('posts').getOne('rec_123');

// 4. Create, Update & Delete (supports JSON object or FormData for file uploads)
const created = await padi.table('posts').create({ title: 'New Post' });
await padi.table('posts').update(created.id, { title: 'Updated Title' });
await padi.table('posts').delete(created.id);
```

---

## 3. Authentication & Reactive AuthStore

```javascript
// Sign in with Email or Username + Password
await padi.table('users').authWithPassword('john@example.com', 'secret_password_123');

// Register new user
await padi.table('users').register({
  email: 'john@example.com',
  username: 'johndoe',
  password: 'Password123!',
  passwordConfirm: 'Password123!'
});

// Listen to auth state changes reactively
padi.authStore.onChange((token, record) => {
  console.log('Active user:', record);
});
```

---

## 4. Auto Realtime Subscriptions (SSE)

```javascript
// Automatically connects to /api/realtime and reconnects with exponential backoff
const unsubscribe = padi.table('posts').subscribe('*', (e) => {
  console.log(e.action, e.table, e.record);
});
```
