# 📁 File Storage & Supabase-Style Storage Explorer

**PadiBase Studio** includes a high-performance file storage engine and a **Supabase-Style Storage Explorer** (`railStorageBtn`) with strict security and **Zero Orphaned Files** automatic cleanup.

---

## 1. Storage Architecture & Security

- **Isolated Directory Layout**:
  ```text
  padi_data/storage/{collection_name}/{record_id}/{unique_prefix}_{original_filename}
  ```
- **Directory Traversal Guard**: Validates segments with `is_safe_segment` and `canonicalize()`, blocking `..`, slashes, and NUL bytes.
- **XSS & Active Content Sandbox**: Potentially executable files (`.html`, `.svg`, `.xml`, `.js`) force download (`Content-Disposition: attachment`) with `Content-Security-Policy: default-src 'none'; sandbox` and `X-Content-Type-Options: nosniff`.
- **Zero Orphaned Files**: Replacing a file via `PATCH` or deleting a record (`DELETE /records/:id`) automatically deletes old physical files from disk.

---

## 2. Supabase-Style Storage Explorer in Studio

- **Buckets Sidebar**: Displays every collection/bucket with file count and total disk usage (`KB / MB / GB`).
- **Dual View Modes**: Switch between **Table View** and **Grid Cards View** with live image thumbnails.
- **1-Click Actions**: 👁️ Lightbox Preview, 🔗 Copy URL, ⬇️ Force Download (`?download=1`), and 🗑️ Safe Delete.

---

## 3. Uploading & Serving Files

```javascript
// Upload file + record fields together via multipart/form-data
const formData = new FormData();
formData.append('name', 'Budi Santoso');
formData.append('avatar', fileInput.files[0]);

await padi.table('teachers').create(formData);
```

Display or download files via:
```text
http://127.0.0.1:8085/api/files/{collection}/{record_id}/{filename}
```
Append `?token=YOUR_JWT_TOKEN` for protected collections or `?download=1` to force download.
