# ⚡ Realtime SSE Broadcaster & Studio Monitor

**PadiBase Studio** includes a built-in Server-Sent Events (SSE) broadcaster at `/api/realtime` powered by Tokio broadcast channels, plus a live **Realtime Monitor** tab inside `/_padibase/monitor`.

---

## 1. Subscribing with the Official JS/TS SDK

```javascript
import { padi } from '@/lib/padi';

// 1. Subscribe to all live changes in 'posts'
const unsubscribe = padi.table('posts').subscribe('*', (e) => {
  console.log('Action:', e.action); // "create" | "update" | "delete"
  console.log('Table :', e.table);  // "posts"
  console.log('Record:', e.record); // Full record payload
});
unsubscribe(); // Cleanup when done

// 2. Subscribe to a single specific record by ID
const unsubSingle = padi.table('posts').subscribe('rec_01h8xyz', (e) => {
  console.log('Specific record changed:', e.action, e.record);
});
unsubSingle(); // Cleanup single record listener

// 3. Subscribe by action ('create' | 'update' | 'delete')
const unsubNew = padi.table('posts').subscribe('create', (e) => {
  console.log('New post added:', e.record);
});
unsubNew();
```

---

## 2. Studio Realtime Monitor (`/_padibase/monitor`)

Open the **Realtime Monitor** tab in the PadiBase Studio left rail to:
- Inspect live `create`, `update`, and `delete` events across all tables in real time.
- View full JSON payloads and timestamps for debugging frontend subscriptions.
