# ⚡ Realtime SSE Broadcaster & Studio Monitor

**PadiBase Studio** includes a built-in Server-Sent Events (SSE) broadcaster at `/api/realtime` powered by Tokio broadcast channels, plus a live **Realtime Monitor** tab inside `/_padibase/monitor`.

---

## 1. Subscribing with the Official JS/TS SDK

```javascript
import { padi } from '@/lib/padi';

// Subscribe to all record mutations (create, update, delete) in 'posts'
const unsubscribe = padi.table('posts').subscribe('*', (e) => {
  console.log('Action:', e.action); // "create" | "update" | "delete"
  console.log('Table:', e.table);   // "posts"
  console.log('Record:', e.record); // Full record payload
});

// Unsubscribe when done
unsubscribe();
```

---

## 2. Studio Realtime Monitor (`/_padibase/monitor`)

Open the **Realtime Monitor** tab in the PadiBase Studio left rail to:
- Inspect live `create`, `update`, and `delete` events across all tables in real time.
- View full JSON payloads and timestamps for debugging frontend subscriptions.
