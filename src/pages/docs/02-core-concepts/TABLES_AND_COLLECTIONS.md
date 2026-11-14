# 🗄️ Tables & Collections — In-Depth Reference

The **Tables / Collections** workspace is the core engine of **PadiBase Studio**. From this interface, you design relational database schemas, configure per-endpoint security rules (RBAC), establish relations with zero N+1 overhead, and manage live record data with a spreadsheet-like drawer interface.

---

## 📋 Table of Contents

1. [🏗️ Collections & Tables Architecture](#1-collections--tables-architecture)
2. [👥 Deep Dive: Base Table vs. Auth Table](#2-deep-dive-base-table-vs-auth-table)
3. [📝 Schema Fields & Data Types](#3-schema-fields--data-types)
4. [📁 Decoupled File Storage Architecture (Crucial)](#4-decoupled-file-storage-architecture-crucial)
5. [🔗 Smart Relations, Foreign Keys & Zero N+1 Engine](#5-smart-relations-foreign-keys--zero-n1-engine)
6. [🛡️ Endpoint Security: Access Rules & Granular RBAC](#6-endpoint-security-access-rules--granular-rbac)
7. [👁️ Server-Side Field Projections (Column Privacy)](#7-server-side-field-projections-column-privacy)
8. [📊 Studio Record Management](#8-studio-record-management)
9. [⚡ Batch Operations: Batch Create & Batch Delete](#9-batch-operations-batch-create--batch-delete)
10. [🔄 1-Click Database Schema Sync](#10-1-click-database-schema-sync)
11. [💻 Usage via PadiBase JS SDK](#11-usage-via-padibase-js-sdk)

---

## 1. 🏗️ Collections & Tables Architecture

In PadiBase Studio, the terms **Collection** and **Table** are synonymous:
- Every **Collection** created via the Studio UI maps directly to a physical table in your chosen database (**SQLite**, **PostgreSQL**, **MySQL**, or **MariaDB**).
- Every Collection automatically exposes a comprehensive **REST API Gateway** with pagination, sorting, conditional filtering, auto-loaded relations, and live Realtime SSE broadcasting.
- Schema definitions are persisted in PadiBase's internal metadata (`_collections`) and kept in atomic synchronization with the underlying database.

---

## 2. 👥 Deep Dive: Base Table vs. Auth Table

When creating a collection via **"+ New Collection"**, you choose between two collection types:

```text
                               ┌────────────────────────────────┐
                               │     PADIBASE COLLECTION TYPE   │
                               └──────────────┬─────────────────┘
                                              │
                      ┌───────────────────────┴───────────────────────┐
                      ▼                                               ▼
         ┌─────────────────────────┐                     ┌─────────────────────────┐
         │     BASE COLLECTION     │                     │     AUTH COLLECTION     │
         ├─────────────────────────┤                     ├─────────────────────────┤
         │ • Domain / business data│                     │ • Users / members       │
         │ • Custom schema fields  │                     │ • Built-in credentials  │
         │ • Standard REST CRUD    │                     │ • Complete Auth routes  │
         │   (/api/:table)         │                     │   (login, register, etc)│
         └─────────────────────────┘                     └─────────────────────────┘
```

### A. Base Collection (General Application Data)
Use this for domain entities (e.g., `posts`, `products`, `orders`, `categories`, `reviews`).
- **Default System Columns**:
  - `id`: Unique primary key (Auto-increment integer or string identifier).
  - `created_at`: Row creation timestamp.
  - `updated_at`: Last modification timestamp.
- **Auto-Generated REST Endpoints**:
  - `GET /api/:table`: Paginated list (with relations & projections).
  - `GET /api/:table/all`: Unpaginated full dump.
  - `GET /api/:table/:id`: Single record detail.
  - `POST /api/:table`: Create new record.
  - `PATCH /api/:table/:id`: Partial record update.
  - `DELETE /api/:table/:id`: Delete record.

### B. Auth Collection (User Identity & Credentials)
Use this for accounts that authenticate with credentials (e.g., `users`, `members`, `customers`, `staff`).
- **Built-in Authentication Columns**:
  - `id`: Primary Key.
  - `email`: Unique, RFC-validated email address (Indexed).
  - `username`: Optional unique username.
  - `passwordHash`: Encrypted password hash using **Argon2id** (never returned via API).
  - `tokenKey`: 32-character random key embedded in JWT claims for instant session revocation upon password updates.
  - `role`: Authorization role (`user`, `admin`, `moderator`, etc.).
  - `status`: Account status (`active`, `pending`, `banned`).
  - `verified`: Boolean indicating email verification.
  - `email_verified_at`: Timestamp of email verification.
  - `created_at` & `updated_at`.
- **Built-in Authentication Endpoints**:
  Every Auth Collection automatically provides complete authentication endpoints without custom code:
  - `POST /api/collections/:authTable/auth-with-password`: Login verifying Argon2id password and issuing JWT Bearer.
  - `POST /api/collections/:authTable/register`: Self-registration with password validation.
  - `POST /api/collections/:authTable/auth-refresh`: Extend an active JWT token before expiry.
  - `POST /api/collections/:authTable/request-password-reset`: Send password reset email token.
  - `POST /api/collections/:authTable/confirm-password-reset`: Apply new password using the reset token.
  - `POST /api/collections/:authTable/request-verification`: Send email verification link.
  - `POST /api/collections/:authTable/confirm-verification`: Confirm email verification token.
  - `POST /api/collections/:authTable/change-password`: Update password (requires current password).
  - `GET /api/collections/:authTable/me`: Retrieve current authenticated profile.

---

## 3. 📝 Schema Fields & Data Types

PadiBase Studio supports 8 field types mapped natively to physical SQL types:

| Field Data Type | Physical SQL Type (SQLite / Postgres / MySQL) | Description & Examples |
| :--- | :--- | :--- |
| **TEXT** | `TEXT` / `VARCHAR(255)` | Strings, multiline text, or **media storage file URLs** (`title`, `slug`, `avatar_url`). |
| **NUMBER** | `INTEGER` / `BIGINT` / `DECIMAL` / `REAL` | Integer or floating-point / decimal numbers (`price`, `stock`, `rating`, `quantity`). |
| **BOOLEAN** | `BOOLEAN` / `TINYINT(1)` | Logical truth value (`is_published`, `featured`, `is_active`). |
| **DATE** | `TIMESTAMP` / `DATETIME` | ISO-8601 timestamps (`published_at`, `due_date`, `expiry_date`). |
| **JSON** | `JSON` / `JSONB` / `TEXT` | Structured JSON objects, arrays, or configurations (`settings`, `tags`, `metadata`). |
| **RELATION** | `INTEGER` / `BIGINT` (Foreign Key) | Foreign Key referencing another collection (`user_id -> users.id`, `category_id -> categories.id`). |
| **EMAIL** | `VARCHAR(255)` | RFC-validated email string (`contact_email`, `billing_email`). |
| **SELECT** | `VARCHAR(100)` | Fixed dropdown enumeration options (`status: ['draft', 'published', 'archived']`). |

---

## 4. 📁 Decoupled File Storage Architecture (Crucial)

> [!IMPORTANT]
> **PADIBASE DOES NOT PROVIDE A `FILE` COLUMN TYPE IN TABLE SCHEMAS.**
> Following modern cloud architecture standards (such as Supabase, Firebase Storage, and AWS S3), binary files are decoupled from database rows:

```text
┌─────────────────┐       1. Standalone Upload (multipart) ┌────────────────────────┐
│ Frontend Client │ ─────────────────────────────────────> │  Storage API           │
│ or Studio UI    │ <───────────────────────────────────── │  /api/storage/:bucket  │
└────────┬────────┘       2. Returns Media File URL        └───────────┬────────────┘
         │                   { "url": "/api/storage/..." }             │
         │                                                             │ Stores file
         │ 3. Save URL in TEXT Column                                  ▼
         │    { "title": "New Book", "cover_url": "..." }      ┌────────────────────────┐
         ▼                                                     │ padi_data/storage/     │
┌─────────────────────────────────┐                            │ (Zero Orphan Cleanup)  │
│ Database Table (Base or Auth)   │                            └────────────────────────┘
│ Column cover_url is type TEXT   │
└─────────────────────────────────┘
```

### Why Decoupled Storage is Superior:
1. **Lean Database Footprint**: Databases do not suffer from binary BLOB bloat, keeping backups fast and queries lightweight.
2. **Independent CDN & Streaming**: Media files can be streamed, cached, and served independently with HTTP cache headers.
3. **Zero Orphaned Files**: When a record is deleted or its file URL updated, PadiBase automatically deletes physical files from disk.

### Seamless Studio UI Drawer Integration:
In the PadiBase Studio record creation/edit drawer:
- Next to text fields intended for media (e.g., `avatar_url`), an **"Upload to Storage"** button is provided.
- Clicking it allows picking a file from your computer.
- Studio uploads the file to the chosen storage bucket, retrieves the URL, and **automatically populates the text field**.
- Live image thumbnails and a **Lightbox modal** allow inspecting images directly from the spreadsheet table.

---

## 5. 🔗 Smart Relations, Foreign Keys & Zero N+1 Engine

Connecting collections is straightforward without manual SQL `ALTER TABLE` statements:

### Configuring a RELATION Field:
1. In schema editing, click **"+ Add Field"**.
2. Select type **RELATION**.
3. Name the column (recommended: `user_id`, `author_id`, `category_id`).
4. Select the **Target Collection** (e.g., `users`).
5. Choose constraints:
   - **Required**: Applies physical database constraint **`ON DELETE CASCADE`** (deleting the parent deletes child rows).
   - **Nullable**: Applies physical database constraint **`ON DELETE SET NULL`** (deleting the parent sets the child's FK column to `NULL`).

### Zero N+1 Query Engine:
In traditional APIs, fetching 50 posts requires 1 query for the posts plus 50 queries for their authors (N+1 problem).
**PadiBase solves this automatically:**
- When `GET /api/posts` is called, PadiBase collects all unique `user_id` values.
- It executes **a single batch query**:
  ```sql
  SELECT * FROM users WHERE id IN (1, 5, 8, 12, ...);
  ```
- Related user objects are merged into the `user` property of each JSON post record with sub-5ms response times.

---

## 6. 🛡️ Endpoint Security: Access Rules & Granular RBAC

Table security is managed per-action in the **API Endpoints & Access Rules** modal:

| Action | REST Endpoint | Purpose |
| :--- | :--- | :--- |
| **`list_rule`** | `GET /api/:table` | Read **paginated** records (e.g., public blog feed). |
| **`all_rule`** | `GET /api/:table/all` | Fetch **entire table without pagination** (e.g., admin CSV export). |
| **`view_rule`** | `GET /api/:table/:id` | Read a single record by ID. |
| **`create_rule`**| `POST /api/:table` | Insert a new record. |
| **`update_rule`**| `PATCH /api/:table/:id` | Update an existing record. |
| **`delete_rule`**| `DELETE /api/:table/:id` | Delete a record. |

### Why Separate `list_rule` vs. `all_rule`?
You can safely keep `list_rule = "public"` so visitors can browse paginated posts (e.g., 20 per page), while strictly locking `all_rule = "@request.auth.role = 'admin'"`. This prevents automated bots from scraping your entire database in a single request.

### Common Rule Expressions:
```text
• Public Access (Anyone allowed):
  public
  true

• Authenticated User Required:
  @request.auth.id != ""

• Role-Based Access Control (RBAC):
  @request.auth.role = 'admin'
  @request.auth.role in ['admin', 'moderator']

• Owner Protection (User can only touch their own data):
  user_id = @request.auth.id
  author_id = @request.auth.id

• Completely Locked (Superuser only):
  false
  null
```

---

## 7. 👁️ Server-Side Field Projections (Column Privacy)

In the **Projected Fields** tab:
- Choose which columns clients are allowed to receive on read endpoints (`list`, `all`, `view`).
- Unchecked columns (e.g., `passwordHash`, `tokenKey`, `internal_margin`) **are stripped server-side by the Resource Transformer**.
- Clients cannot access hidden columns, even when specifying explicit `?fields=...` queries.

---

## 8. 📊 Studio Record Management

1. **Spreadsheet Table View**: Clean tabular presentation with data type tags (PK, FK, TEXT, NUMBER, JSON).
2. **Realtime Search & Sorting**: Instant search bar and clickable column headers for Ascending/Descending ordering.
3. **Ergonomic Safety**: Clicking rows will not accidentally trigger edits; the slide-over drawer only opens when clicking **"Edit"**.
4. **Form Drawer & JSON Mode**: Input data visually or paste raw JSON.
5. **Direct Storage Upload**: Instant file upload button next to any media text field.

---

## 9. ⚡ Batch Operations: Batch Create & Batch Delete

### A. Batch Create (`POST /api/:table/batch`)
Send an array of dozens or hundreds of records in a single request:
```bash
curl -X POST http://127.0.0.1:8085/api/products/batch \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '[
    { "name": "Product A", "price": 50000, "stock": 100 },
    { "name": "Product B", "price": 75000, "stock": 50 },
    { "name": "Product C", "price": 120000, "stock": 30 }
  ]'
```
All rows are inserted atomically in a single high-speed database transaction.

### B. Batch Delete (`DELETE /api/:table/batch`)
In the Studio UI:
1. Select checkboxes for rows you want to delete.
2. Click **"Delete Selected"** on the batch action bar.
3. Confirm the safety dialog to remove rows simultaneously.

Via API:
```bash
curl -X DELETE http://127.0.0.1:8085/api/products/batch \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{ "ids": [10, 11, 12, 15] }'
```

---

## 10. 🔄 1-Click Database Schema Sync

When making external database modifications (e.g., via pgAdmin, DBeaver, or command line):
- Click **"Sync DB Schema"** in the Studio table toolbar.
- PadiBase introspects physical schema tables (`sqlite_master` / `information_schema.columns`) and updates internal metadata immediately without server restarts.

---

## 11. 💻 Usage via PadiBase JS SDK

```javascript
import PadiBase from 'padibase';

const padi = new PadiBase('http://127.0.0.1:8085');

// 1. Fetch paginated data with automatic relations
const posts = await padi.table('posts').getList(1, 20, {
  sort: '-created_at',
  filter: 'is_published = true'
});
console.log('Total items:', posts.totalItems);
console.log('Posts:', posts.items);

// 2. Upload media to Storage, then store URL in table record
const file = document.querySelector('#fileInput').files[0];
const uploadRes = await padi.storage.upload('avatars', file);

const newProfile = await padi.table('profiles').create({
  full_name: 'Budi Santoso',
  avatar_url: uploadRes.url,
  bio: 'Software Engineer'
});

// 3. Batch Create
await padi.table('tags').createBatch([
  { name: 'Rust' },
  { name: 'Vue3' },
  { name: 'PadiBase' }
]);

// 4. Batch Delete
await padi.table('tags').deleteBatch([1, 2, 3]);
```

---

## 🎯 Related Documentation
- **[Decoupled File Storage Guide](FILE_UPLOAD.md)**
- **[Authentication & JWT Reference](AUTHENTICATION.md)**
- **[Visual SQL Builder Reference](QUERY_BUILDER.md)**
- **[Frontend Integration Guide](../03-advanced/FRONTEND_INTEGRATION.md)**
