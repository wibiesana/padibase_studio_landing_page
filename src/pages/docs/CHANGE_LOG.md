# 📜 PadiBase Studio Changelog

All notable changes to **PadiBase Studio** and the **PadiBase JS/TS SDK** are documented in this file.

---

## [0.2.0] - 2026-11-07

### 🌟 Added in PadiBase Studio (`/_padibase/`)

- **🛠️ Visual SQL Query Builder & Advanced Aggregate Engine**:
  - Interactive visual SQL designer supporting `SELECT`, `SELECT DISTINCT`, `INSERT`, `UPDATE`, `DELETE`, and `COUNT`.
  - **⚡ 1-Click Auto-Detect Relations**: Automatically scans foreign key columns (`user_id`, `chapter_id`, etc.) and builds relational `JOIN` clauses.
  - **Nested JSON Object Relations (`JSON_OBJECT`)**: Toggle each JOIN between **📦 Nested Object** and **📄 Flat Columns**, with native backend JSON unescaping.
  - **Complete Aggregate Suite**: Added `COUNT(*)`, `COUNT(col)`, `COUNT(DISTINCT col)`, `SUM(col)`, `COALESCE(SUM(col), 0)`, `AVG(col)`, `ROUND(AVG(col), 2)`, `MIN(col)`, `MAX(col)`, `GROUP_CONCAT(col)`, interactive `GROUP BY` chips, `HAVING` filters, and dynamic alias `ORDER BY`.
  - **Multi-Table Atomic Transactions**: Execute multiple table mutations inside `BEGIN ... COMMIT / ROLLBACK` with `:last_insert_id` binding.
- **📁 Supabase-Style Storage Explorer (`railStorageBtn`)**:
  - Dedicated Storage workspace with Buckets/Collections sidebar, file counters, and disk usage metrics (`KB / MB / GB`).
  - Dual View Modes (**Table View** & **Grid Cards View** with live thumbnails), MIME type filters (*All, Images, Documents/PDF, Video/Audio*), Lightbox preview, 1-Click Copy URL, and Upload Slide-Over Drawer.
  - **Zero Orphaned Files Lifecycle**: Updating a record's file or deleting a record automatically removes old physical files from `padi_data/storage/`.
- **🛡️ Unified API Endpoints & Access Rules Modal**:
  - Independent **`list_rule`** (paginated `/api/:collection`) vs **`all_rule`** (unpaginated `/api/:collection/all`).
  - Quick role presets (`Auth`, `Public`, `Owner`, `Admin`) and RBAC expressions (`@request.auth.role = 'admin'`).
  - **Server-Side Field Projections (Resource Transformer)**: Select exposed columns per read endpoint (`list`, `all`, `view`) with strict server-side enforcement.
  - **2-Level Relations System**: Master table switch (`auto_load_relations`) + per-endpoint relation overrides (`Inherit Table Default`, custom relations, or disabled) + client `?with=` parameter.
- **💎 Ergonomic Studio UI & Custom Modals**:
  - Replaced native browser `confirm()` and `prompt()` dialogs with `#padiConfirmModal` (Danger, Warning, Info) and `#padiPromptModal` featuring real-time table name validation and keyboard shortcuts (`Enter` / `Esc`).
  - Safe table row interaction: record edit drawers only open when clicking the explicit **Edit** action button.
- **⏱️ Dynamic Custom SQL Endpoints, Cron Scheduler & SMTP Mailer**:
  - Publish custom parameterized SQL queries as live REST endpoints (`/api/custom/*` or `/api/e/*`).
  - Built-in background Cron Scheduler (`/api/cron/jobs`) with schedule preview and execution logs.
  - Customizable HTML Email Templates with live iframe preview modal and SMTP test sender.
- **🌾 Official PadiBase JavaScript / TypeScript SDK (`padi_js_sdk`)**:
  - Zero external dependencies, Shared Singleton pattern, Direct HTTP methods (`padi.get`, `padi.post`, `padi.patch`, `padi.delete`), `padi.table()` CRUD, reactive `authStore`, and Auto Realtime SSE subscriptions (`subscribe`).

---

## [0.1.0] - 2026-10-28

### 🚀 Initial Release — PadiBase BaaS Engine in Rust

- Single executable binary powered by **Axum 0.8**, **Tokio**, **SQLx 0.8**, and **`rust-embed`**.
- **Multi-Database Driver Support**: Embedded **SQLite (WAL Mode)**, **MySQL**, **MariaDB**, and **PostgreSQL**.
- **Argon2id + JWT Authentication**: Protected Admin Gateway, Superuser creation wizard, and complete user auth flows.
- **Realtime SSE Broadcaster**: Live `/api/realtime` streaming on record creations, updates, and deletions.
- **1-Click Postman v2.1.0 Exporter**: CLI (`padiBase api-collection --force`) and Dashboard JSON exporter.
- **Online Atomic SQLite Backups**: Snapshot creation (`VACUUM INTO`), download, upload, and 1-click restore.
