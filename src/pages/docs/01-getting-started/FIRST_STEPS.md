# 👣 Complete Guide to Using PadiBase Studio (First Steps)

Welcome to **PadiBase Studio**! This guide is designed to walk you through **running and using the pre-built, ready-to-run PadiBase binary** without needing to compile or build any source code.

You will learn how to launch the binary, perform initial admin login at the Studio web dashboard (`/_padibase/`), and master **every feature and menu** available in PadiBase Studio—from creating collections (Base vs. Auth), configuring schema fields, decoupled media storage, and custom dynamic SQL endpoints, to connecting your frontend application.

---

## 📋 Table of Contents

1. [🚀 Running the PadiBase Pre-built Binary](#1-running-the-padibase-pre-built-binary)
2. [🔐 First-Time Superuser Setup & Studio Login](#2-first-time-superuser-setup--studio-login)
3. [🧭 Overview of All PadiBase Studio Menus & Features](#3-overview-of-all-padibase-studio-menus--features)
4. [📊 Table / Collections Menu (Complete Guide)](#4-table--collections-menu-complete-guide)
   - [Base Table vs. Auth Table Differences](#a-base-table-vs-auth-table-differences)
   - [Schema Fields & Supported Data Types](#b-schema-fields--supported-data-types)
   - [Decoupled File Storage Architecture (Crucial)](#c-decoupled-file-storage-architecture-crucial)
   - [Smart Relations & Foreign Keys (Zero N+1 Engine)](#d-smart-relations--foreign-keys-zero-n1-engine)
   - [Access Rules & RBAC (list_rule vs. all_rule)](#e-access-rules--rbac-list_rule-vs-all_rule)
   - [Server-Side Field Projections (Column Privacy)](#f-server-side-field-projections-column-privacy)
   - [Record Management & Batch Operations](#g-record-management--batch-operations)
5. [⚡ API Config & Custom Dynamic SQL Endpoints](#5-api-config--custom-dynamic-sql-endpoints)
   - [Live Auto-Generated REST Endpoints](#a-live-auto-generated-rest-endpoints)
   - [Custom Dynamic SQL Endpoints (/api/custom/*)](#b-custom-dynamic-sql-endpoints-apicustom)
   - [1-Click Postman Collection v2.1.0 Export](#c-1-click-postman-collection-v210-export)
6. [📁 Storage Explorer Menu (Decoupled Media)](#6-storage-explorer-menu-decoupled-media)
7. [🛠️ Visual SQL Query Builder & Atomic Transactions](#7-visual-sql-query-builder--atomic-transactions)
8. [📡 Realtime Monitor Menu (Live SSE Stream)](#8-realtime-monitor-menu-live-sse-stream)
9. [💾 Backups, DB Sync & Cron Tasks](#9-backups-db-sync--cron-tasks)
10. [⚙️ Settings & Admins Menu](#10-settings--admins-menu)
11. [💻 Connecting Frontend via PadiBase JS SDK](#11-connecting-frontend-via-padibase-js-sdk)

---

## 1. 🚀 Running the PadiBase Pre-built Binary

PadiBase is distributed as a **self-contained standalone executable binary** (similar to PocketBase). **You do not need to install Rust, Cargo, Node.js, or any compiler.** Simply launch the pre-compiled executable:

### A. On Windows
Run the executable directly from PowerShell or Command Prompt:
```cmd
padibase.exe serve --http 127.0.0.1:8085 --dir ./padi_data
```
Or simply double-click the included helper script:
```cmd
init_backend.bat
```

### B. On Linux / macOS
```bash
./padibase serve --http 127.0.0.1:8085 --dir ./padi_data
```

### C. Connecting to an External Database (PostgreSQL, MySQL, or MariaDB)
By default, PadiBase runs with **embedded SQLite (WAL Mode)** stored in `./padi_data/padi.db`. To connect to an existing database server, pass the `--db-url` flag or configure a `.env` file next to the binary:
```bash
# PostgreSQL:
./padibase serve --db-url "postgres://postgres:password@127.0.0.1:5432/padibase"

# MySQL / MariaDB:
./padibase serve --db-url "mysql://root:secret@127.0.0.1:3306/padibase"
```
Or define in `.env`:
```env
DB_DRIVER=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=padibase
DB_USERNAME=root
DB_PASSWORD=secret
```

When the server starts, terminal logs confirm readiness:
```text
[INFO] Server listening on http://127.0.0.1:8085
[INFO] Embedded Studio UI available at http://127.0.0.1:8085/_padibase/
[INFO] REST API Gateway ready at http://127.0.0.1:8085/api/
```

---

## 2. 🔐 First-Time Superuser Setup & Studio Login

PadiBase Studio is guarded by a secure **Superuser Gateway** with **Argon2id** password hashing:

### Step 1: Open the Dashboard in Your Browser
Navigate to:
👉 **`http://127.0.0.1:8085/_padibase/`**

### Step 2: Bootstrap the First Superuser
- Because a clean database contains no admin accounts, PadiBase automatically detects this via `/api/admins/has-admins` and displays the **"Create First Superuser / Setup Admin"** wizard.
- Enter your desired **Admin Email** (e.g., `admin@example.com`).
- Enter a **Password** (minimum 8 characters).
- Click **"Create & Login"**.

> 💡 **Tip (Setup via CLI):** You can also create an admin directly from your terminal:
> ```bash
> ./padibase admin create admin@example.com "my_secure_password_123"
> ```

### Step 3: Enter the Studio Workspace
Once authenticated, the encrypted Superuser JWT is saved in your browser session, giving you full access to all collections, query tools, and API configuration.

---

## 3. 🧭 Overview of All PadiBase Studio Menus & Features

In the left navigation sidebar of PadiBase Studio (`/_padibase/`), you have 8 primary workspaces:

```text
┌───────────────────────────┬────────────────────────────────────────────────────────┐
│ Studio Menu               │ Primary Purpose                                        │
├───────────────────────────┼────────────────────────────────────────────────────────┤
│ 🗄️ Tables / Collections    │ Database schema, Base vs. Auth tables, FKs, & records  │
│ ⚡ API Config / Endpoints  │ Live REST routes, Custom Dynamic SQL, & Postman export │
│ 📁 Storage Explorer       │ Media buckets, decoupled upload, Lightbox, zero orphans│
│ 🛠️ Visual SQL Builder     │ Visual query designer, JSON_OBJECT, aggregates, ACID tx│
│ 📡 Realtime Monitor       │ Live Server-Sent Events (SSE) data mutation feed       │
│ 💾 Backups & DB Sync      │ Online database snapshots & physical schema sync       │
│ ⏰ Cron Tasks             │ Automated background job scheduler (cron expressions)  │
│ ⚙️ Settings & Admins      │ Superuser management, SMTP email templates, CORS, auth │
└───────────────────────────┴────────────────────────────────────────────────────────┘
```

---

## 4. 📊 Table / Collections Menu (Complete Guide)

The **Tables** menu (`/_padibase/tables`) is where you structure your database and manage record data.

---

### a. Base Table vs. Auth Table Differences

When creating a new collection by clicking **"+ New Collection"**, you choose between two distinct types:

#### 1. Base Collection (General Data)
Used for your application's domain entities (e.g., `posts`, `products`, `orders`, `categories`, `comments`).
- **Default System Columns**: `id` (PK), `created_at`, `updated_at`.
- **Automatic REST Routes**:
  - `GET /api/:table`: Paginated list
  - `GET /api/:table/all`: Full unpaginated dump
  - `GET /api/:table/:id`: Single record detail
  - `POST /api/:table`: Create record
  - `PATCH /api/:table/:id`: Partial record update
  - `DELETE /api/:table/:id`: Delete record
  - `POST /api/:table/batch`: Batch create multiple rows from JSON
  - `DELETE /api/:table/batch`: Batch delete selected IDs

#### 2. Auth Collection (User Identity & Authentication)
Used for users, members, or customers who log in with credentials (e.g., `users`, `members`, `customers`, `staff`).
- **Built-in Authentication Columns**:
  - `id`: Primary Key
  - `email`: Unique, RFC-validated email address (Indexed)
  - `username`: Optional unique username
  - `passwordHash`: Encrypted password hash using **Argon2id** (never exposed via API)
  - `tokenKey`: 32-character random key embedded in JWT claims for instant session revocation
  - `role`: Authorization role (`user`, `admin`, `manager`, etc.)
  - `status`: Account status (`active`, `pending`, `banned`)
  - `verified`: Boolean email verification status
  - `email_verified_at`: Timestamp of successful email verification
  - `created_at` & `updated_at`
- **Automatic Auth Endpoints Generated**:
  - `POST /api/collections/:authTable/auth-with-password`: Login with password & issue JWT
  - `POST /api/collections/:authTable/register`: Self-registration with validation
  - `POST /api/collections/:authTable/auth-refresh`: Refresh active JWT token
  - `POST /api/collections/:authTable/request-password-reset`: Send password reset email
  - `POST /api/collections/:authTable/confirm-password-reset`: Apply new password using reset token
  - `POST /api/collections/:authTable/request-verification`: Send email verification link
  - `POST /api/collections/:authTable/confirm-verification`: Confirm email verification token
  - `POST /api/collections/:authTable/change-password`: Change password (requires current password)
  - `GET /api/collections/:authTable/me`: Retrieve current authenticated profile

---

### b. Schema Fields & Supported Data Types

PadiBase provides 8 rich field types mapped natively to database types:

| Data Type | Description | Common Use Cases |
| :--- | :--- | :--- |
| **TEXT** | Short strings, multiline text, or **media storage file URLs** | `title`, `content`, `slug`, `avatar_url` |
| **NUMBER** | Integer or decimal / float values | `price`, `stock`, `rating`, `view_count` |
| **BOOLEAN** | Truth value (`true` / `false`) | `is_active`, `is_published`, `featured` |
| **DATE** | ISO-8601 timestamp | `published_at`, `event_date`, `expiry_date` |
| **JSON** | Flexible JSON objects, arrays, or arbitrary configuration | `settings`, `tags`, `attributes`, `metadata` |
| **RELATION** | Foreign Key referencing another table | `user_id -> users.id`, `category_id -> categories.id` |
| **EMAIL** | RFC-validated email string | `contact_email`, `billing_email` |
| **SELECT** | Fixed enumeration dropdown options | `status ('draft', 'published', 'archived')` |

---

### c. Decoupled File Storage Architecture (Crucial)

> [!IMPORTANT]
> **THERE IS NO `FILE` COLUMN TYPE IN PADIBASE TABLES.**
> PadiBase adheres strictly to the modern **Decoupled File Storage** standard (similar to Supabase and AWS S3):
> 1. Media files are uploaded independently to the Storage API (`POST /api/storage/:bucket`).
> 2. The Storage API returns a public or protected file URL (e.g., `/api/storage/avatars/budi_photo.png`).
> 3. That file URL is stored in a standard **`TEXT`** column in your table (e.g., `avatar_url`, `cover_image`, `document_path`).

#### Seamless UI Integration in Studio:
In the PadiBase Studio record creation/edit drawer:
- Next to any text field intended for media (e.g., `avatar_url`), click the **"Upload to Storage"** button.
- Pick a file from your computer.
- Studio automatically uploads the file to the chosen storage bucket, retrieves the file URL, and **immediately populates the text input field**.
- An inline image thumbnail and **Lightbox modal** appear automatically.

---

### d. Smart Relations & Foreign Keys (Zero N+1 Engine)

When adding a **RELATION** field:
1. Specify the field name (recommended convention: `user_id`, `author_id`, `category_id`).
2. Select the **Target Table** (e.g., `users`).
3. Set requirement constraints:
   - **Required**: PadiBase applies physical database constraint **`ON DELETE CASCADE`** (deleting the parent cascades to delete child rows).
   - **Nullable**: PadiBase applies physical database constraint **`ON DELETE SET NULL`** (deleting the parent sets the child's FK column to `NULL`).
4. **Zero N+1 Query Engine**:
   - When fetching records (`GET /api/posts`), PadiBase collects all unique `user_id` values and executes **a single batch query**:
     ```sql
     SELECT * FROM users WHERE id IN (1, 5, 8, ...);
     ```
   - Relations are populated into the `user` property of each JSON record with sub-5ms response times.

---

### e. Access Rules & RBAC (list_rule vs. all_rule)

Security rules are configured per-action in the **API Endpoints & Access Rules** modal:

```text
┌─────────────────┬──────────────────────────────────┬─────────────────────────────┐
│ API Action      │ REST Endpoint                    │ Rule Expression Example     │
├─────────────────┼──────────────────────────────────┼─────────────────────────────┤
│ list_rule       │ GET /api/:table (Paginated)      │ public (true)               │
│ all_rule        │ GET /api/:table/all (Full Dump)  │ @request.auth.role = 'admin'│
│ view_rule       │ GET /api/:table/:id              │ public (true)               │
│ create_rule     │ POST /api/:table                 │ @request.auth.id != ""      │
│ update_rule     │ PATCH /api/:table/:id            │ user_id = @request.auth.id  │
│ delete_rule     │ DELETE /api/:table/:id           │ user_id = @request.auth.id  │
└─────────────────┴──────────────────────────────────┴─────────────────────────────┘
```

#### Why Separate `list_rule` vs. `all_rule`?
You can keep paginated list browsing open for the public (`list_rule = "public"`), while strictly restricting full table dumps (`all_rule = "@request.auth.role = 'admin'"`). This completely protects your database against unauthorized bulk scraping.

#### Common Rule Expressions:
- **`public` or `true`**: Accessible by anyone without authentication.
- **`@request.auth.id != ""`**: Requires a valid Bearer JWT from any authenticated user.
- **`@request.auth.role = 'admin'`**: Restricted to users with the `admin` role.
- **`user_id = @request.auth.id`**: Owner protection—users can only edit/delete their own data.
- **`false` or `null`**: Completely locked (accessible only to Superusers via admin headers).

---

### f. Server-Side Field Projections (Column Privacy)

In the **Projected Fields** tab, select which columns are allowed in API responses:
- Unchecked columns (e.g., `passwordHash`, `tokenKey`, `internal_notes`) **are stripped server-side by the Resource Transformer**.
- Clients can never view unprojected columns, even when attempting `?fields=...` queries.

---

### g. Record Management & Batch Operations

1. **Spreadsheet Table View**: Clean tabular presentation with data type tags (PK, FK, TEXT, NUMBER, JSON).
2. **Realtime Search & Dynamic Sort**: Filter instantaneously and click column headers to toggle Ascending / Descending.
3. **Ergonomic Safety**: Clicking rows will not accidentally trigger edits; the slide-over drawer only opens when clicking **"Edit"**.
4. **Batch Create (`POST /api/:table/batch`)**: Insert dozens of rows at once using a JSON array `[{ ... }, { ... }]`.
5. **Batch Delete (`DELETE /api/:table/batch`)**: Check multiple rows and delete them simultaneously with confirmation protection.
6. **Sync DB Schema**: Synchronize any external physical database alterations into PadiBase metadata with one click.

---

## 5. ⚡ API Config & Custom Dynamic SQL Endpoints

The **API Config / Endpoints** workspace (`/_padibase/endpoints`) provides real-time route inspection and custom SQL API authoring:

---

### a. Live Auto-Generated REST Endpoints
Inspect live endpoints, supported query parameters (`?page=`, `?sort=`, `?filter=`, `?fields=`), and access rule status for every collection.

---

### b. Custom Dynamic SQL Endpoints (`/api/custom/*`)
When your application requires complex joins, aggregations, or specialized business queries beyond standard CRUD, **you can create dynamic endpoints without modifying backend code**:

1. Click **"+ New Custom API"**.
2. Enter the route name (e.g., `user-summary`). The endpoint will be live at `/api/custom/user-summary`.
3. Choose the HTTP method (`GET`, `POST`, `PUT`, or `DELETE`).
4. Write SQL using parameterized placeholders (`:param`) to guarantee SQL injection safety:
   ```sql
   SELECT 
     u.id, 
     u.name, 
     u.email, 
     COUNT(o.id) AS total_orders, 
     COALESCE(SUM(o.total_amount), 0) AS lifetime_spent
   FROM users u
   LEFT JOIN orders o ON o.user_id = u.id
   WHERE u.created_at >= :since
   GROUP BY u.id
   ORDER BY lifetime_spent DESC
   LIMIT :limit;
   ```
5. Set the access rule (e.g., `@request.auth.role = 'admin'`).
6. Click **"Save Endpoint"**.

Invoke it immediately from your frontend or curl:
`GET http://127.0.0.1:8085/api/custom/user-summary?since=2026-01-01&limit=10`

---

### c. 1-Click Postman Collection v2.1.0 Export

- Click **"Export Postman Collection"** in Studio or run via the binary CLI:
  ```bash
  ./padibase api-collection --force
  ```
- Import the resulting JSON directly into **Postman**, **Insomnia**, **Bruno**, **Thunder Client**, or **VS Code REST Client**.
- Includes automatic environment variables and token auto-saving on login requests.

---

## 6. 📁 Storage Explorer Menu (Decoupled Media)

In the **Storage** menu (`/_padibase/storage`):
- **Bucket Management**: Create distinct storage buckets (e.g., `avatars`, `invoices`, `products`).
- **Dual View Modes**: Switch between detailed **Table View** and thumbnail **Grid Cards View**.
- **Lightbox Image Viewer**: View full-resolution images directly in the browser modal.
- **1-Click Copy URL**: Copy public file URLs to clipboard instantly.
- **Zero Orphaned Files Garbage Collection**: When a record is deleted or updated with a new file URL, old physical files in `./padi_data/storage/` are automatically deleted from disk.
- **XSS Sandbox**: Potentially dangerous files (`.svg`, `.html`, `.xml`) are sandboxed with restrictive Content-Security-Policy headers.

---

## 7. 🛠️ Visual SQL Query Builder & Atomic Transactions

In **Visual SQL Builder** (`/_padibase/sqlbuilder`):
- Visually design `SELECT` queries across multiple tables.
- **Auto-Detect Relations**: Transform multi-table JOINs into structured nested `JSON_OBJECT` representations.
- Apply aggregates: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, `GROUP_CONCAT` with `GROUP BY` and `HAVING`.
- **Multi-Table Atomic Transactions (`/api/transactions`)**: Run multi-table mutations inside a single ACID transaction (`BEGIN ... COMMIT`) with automatic rollback on error.

---

## 8. 📡 Realtime Monitor Menu (Live SSE Stream)

In **Realtime Monitor** (`/_padibase/realtime`):
- Powered by high-throughput **Server-Sent Events (SSE)** at `/api/realtime`.
- Monitor live database mutations (`create`, `update`, `delete`) in real time with near-zero latency.
- Connect effortlessly via the official PadiBase JS SDK.

---

## 9. 💾 Backups, DB Sync & Cron Tasks

- **Online Snapshot Backups**: Create live SQLite database backups without downtime (`VACUUM INTO`).
- **Database Schema Sync**: Introspect external schema changes into PadiBase metadata in real time.
- **Cron Tasks Scheduler**: Schedule recurring queries or maintenance jobs using standard 5-part cron syntax (`* * * * *`).

---

## 10. ⚙️ Settings & Admins Menu

- **Manage Superusers**: Add, edit, and revoke administrator accounts.
- **SMTP Email Configuration**: Set up SMTP server details (Host, Port, User, Password, TLS) and edit HTML email templates for account verification and password resets.
- **Security & CORS**: Configure JWT expiration hours and allowed **CORS** origin domains.

---

## 11. 💻 Connecting Frontend via PadiBase JS SDK

Use the zero-dependency **PadiBase JavaScript / TypeScript SDK** (`padibase`) in Vue 3, Nuxt, React, Next.js, Svelte, or Node.js:

### Initialize the Singleton Client
```javascript
// src/lib/padi.js
import PadiBase from 'padibase';

export const padi = new PadiBase('http://127.0.0.1:8085');
export default padi;
```

### User Authentication (Auth Table)
```javascript
import { padi } from '@/lib/padi';

// 1. User login
const authData = await padi.collection('users').authWithPassword('budi@example.com', 'password123');
console.log('JWT Token:', authData.token);
console.log('User Profile:', authData.record);

// 2. User registration
await padi.collection('users').register({
  email: 'jane@example.com',
  username: 'jane_dev',
  password: 'PasswordRahasia123!',
  passwordConfirm: 'PasswordRahasia123!'
});

// 3. Logout
padi.authStore.clear();
```

### Table CRUD & Decoupled File Upload
```javascript
// 1. Fetch paginated records (2-level foreign keys loaded without N+1)
const result = await padi.table('posts').getList(1, 20, {
  sort: '-created_at',
  filter: 'status = "published"'
});
console.log('Posts:', result.items);

// 2. Upload media file to Storage first
const file = document.getElementById('myFileInput').files[0];
const uploadRes = await padi.storage.upload('covers', file);

// 3. Save returned file URL into table record (cover_url is TEXT)
const newPost = await padi.table('posts').create({
  title: 'Getting Started with PadiBase Studio',
  user_id: padi.authStore.model.id,
  cover_url: uploadRes.url,
  content: 'PadiBase is a high-performance modern BaaS.'
});

// 4. Update and Delete
await padi.table('posts').update(newPost.id, { title: 'Updated Title' });
await padi.table('posts').delete(newPost.id);
```

### Realtime SSE Stream Subscription
```javascript
// Subscribe to live create, update, and delete events
const unsubscribe = padi.table('posts').subscribe('*', (e) => {
  console.log('Action:', e.action); // 'create' | 'update' | 'delete'
  console.log('Record:', e.record);
});

// To unsubscribe:
// unsubscribe();
```

---

## 🎯 Related Documentation
- **[Tables & Collections Deep Dive](../02-core-concepts/TABLES_AND_COLLECTIONS.md)**
- **[Decoupled File Storage Guide](../02-core-concepts/FILE_UPLOAD.md)**
- **[API Config & Custom Dynamic SQL](../03-advanced/API_COLLECTION_GUIDE.md)**
- **[Frontend Integration Guide](../03-advanced/FRONTEND_INTEGRATION.md)**
