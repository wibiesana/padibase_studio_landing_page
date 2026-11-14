# 📁 File Storage & Supabase-Style Storage Explorer

**PadiBase Studio** features an isolated, high-performance **Decoupled File Storage** engine paired with a visual **Supabase-Style Storage Explorer** at `/_padibase/storage`. The system includes active content sandboxing, directory traversal prevention, and **Zero Orphaned Files** automatic disk garbage collection.

---

## 📋 Table of Contents

1. [🏗️ Decoupled File Storage Architecture](#1-decoupled-file-storage-architecture)
2. [📁 Supabase-Style Storage Explorer in Studio](#2-supabase-style-storage-explorer-in-studio)
3. [⚡ Upload Workflow & Storing URLs in Tables](#3-upload-workflow--storing-urls-in-tables)
4. [🛡️ Security: XSS Sandbox & Path Traversal Guards](#4-security-xss-sandbox--path-traversal-guards)
5. [🧹 Zero Orphaned Files Lifecycle (Garbage Collection)](#5-zero-orphaned-files-lifecycle-garbage-collection)
6. [💻 Usage Examples via SDK & REST API](#6-usage-examples-via-sdk--rest-api)

---

## 1. 🏗️ Decoupled File Storage Architecture

> [!IMPORTANT]
> **There is no `FILE` column type in PadiBase table schemas.**
> Rather than mixing multipart binary payloads into table schemas, PadiBase separates media management into a dedicated **Storage Layer**:
> 1. Files are uploaded independently to storage endpoints (`POST /api/storage/:bucket`).
> 2. The endpoint returns a public or protected URL for the file.
> 3. Your client or Studio form stores this file URL into a standard **`TEXT`** column (e.g., `avatar_url`, `cover_image`, `document_path`).

### Isolated Storage Directory Layout:
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

## 2. 📁 Supabase-Style Storage Explorer in Studio

Navigate to the **Storage** menu in the Studio sidebar (`/_padibase/storage`):

- **Isolated Bucket Management**: View all media buckets (e.g., `avatars`, `covers`, `documents`) with live metrics on total file count and disk usage (`KB / MB / GB`).
- **Dual View Modes**:
  - **Table View**: Detailed tabular view displaying filenames, byte sizes, MIME types, and timestamps.
  - **Grid Cards View**: Visual thumbnail gallery with high-resolution image previews.
- **Lightbox Image Viewer**: Click image thumbnails to inspect full-size pictures in a modal without leaving the dashboard.
- **1-Click Copy URL**: Instant button to copy public links (`/api/storage/:bucket/:file`) directly to the clipboard.
- **Force Download (`?download=1`)**: Download files explicitly with `Content-Disposition: attachment`.

---

## 3. ⚡ Upload Workflow & Storing URLs in Tables

### In the PadiBase Studio Web UI:
When adding or editing records in the **Tables** menu:
1. Open the record slide-over drawer.
2. Next to any text field for media (e.g., `avatar_url`), click **"Upload to Storage"**.
3. Choose an image or document from your device.
4. PadiBase Studio automatically uploads the file, retrieves the URL, and **populates the text field automatically**.
5. An inline image preview appears instantly.

### Via REST API:
#### Step 1: Upload File to Storage
```bash
curl -X POST http://127.0.0.1:8085/api/storage/avatars \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -F "file=@/path/to/my_avatar.png"
```
**Response (200 OK):**
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

#### Step 2: Create or Update Table Record with the File URL
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

## 4. 🛡️ Security: XSS Sandbox & Path Traversal Guards

PadiBase Storage provides multiple layers of security:

1. **Path Traversal Guard**:
   - Bucket names and filenames are validated with `is_safe_segment()` and canonicalization.
   - `..`, directory separators (`/`, `\`), and NUL characters (`\0`) are immediately rejected with `400 Bad Request`.
2. **XSS & Active Content Sandbox**:
   - Files with potentially executable contents (`.html`, `.svg`, `.xml`, `.js`) are forced to download with strict headers:
     ```http
     Content-Disposition: attachment; filename="..."
     Content-Security-Policy: default-src 'none'; sandbox
     X-Content-Type-Options: nosniff
     ```
   - This prevents Stored Cross-Site Scripting (XSS) attacks when users upload malicious SVG files.

---

## 5. 🧹 Zero Orphaned Files Lifecycle (Garbage Collection)

Unused "orphaned" files waste disk storage. PadiBase prevents this automatically:
- **On Record Deletion**: When calling `DELETE /api/users/:id`, PadiBase identifies any file URLs stored in the record's text fields and removes the corresponding physical files from `./padi_data/storage/`.
- **On File URL Updates**: When a record is updated with a new file URL via `PATCH /api/users/:id`, the old physical file is automatically pruned from disk.

---

## 6. 💻 Usage Examples via SDK & REST API

### Using PadiBase JS SDK:
```javascript
import PadiBase from 'padibase';

const padi = new PadiBase('http://127.0.0.1:8085');

// 1. Upload media file to bucket 'avatars'
const fileInput = document.querySelector('#avatarInput');
const uploadResult = await padi.storage.upload('avatars', fileInput.files[0]);

console.log('File URL:', uploadResult.url);

// 2. Store URL into table record
const profile = await padi.table('profiles').create({
  full_name: 'Siti Aminah',
  avatar_url: uploadResult.url
});

// 3. Render image in frontend templates:
// <img :src="profile.avatar_url" alt="Avatar" />
```

### Direct HTTP File Serving:
```text
# Standard URL (Inline browser preview):
http://127.0.0.1:8085/api/storage/avatars/f1a2b3_my_avatar.png

# Force Download:
http://127.0.0.1:8085/api/storage/avatars/f1a2b3_my_avatar.png?download=1
```
