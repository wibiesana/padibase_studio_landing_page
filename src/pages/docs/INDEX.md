# 🌾 PadiBase Studio — Documentation Hub

> **Version {{APP_VERSION}}** | High-Performance Multi-Database BaaS in Rust (Axum 0.8 + Tokio + SQLx)

Welcome to the official documentation for **PadiBase Studio** — a modern Backend-as-a-Service (BaaS) written from scratch in **Rust**, inspired by PocketBase and Supabase. Packed in a **single executable binary**, PadiBase Studio provides an embedded web dashboard (`/_padibase/`), Multi-Database support (**SQLite, MySQL, MariaDB, PostgreSQL**), a **Visual SQL Query Builder**, **2-Level Auto-Load Relations**, **Granular RBAC & Field Projections**, **Supabase-Style File Storage**, **Realtime SSE**, and an official **Zero-Dependency JS/TS SDK**.

---

## ⚡ Core Capabilities & Advantages

- **🚀 Polyglot Multi-Database Engine**: Run out-of-the-box with embedded **SQLite (WAL Mode)** or connect directly to **MySQL**, **MariaDB**, and **PostgreSQL** via `--db-url` or `.env`, complete with 1-click Live Schema Sync (`/api/tables/sync`).
- **💻 Embedded PadiBase Studio (`/_padibase/`)**: Full-featured SPA workspace compiled directly into the Rust binary via `rust-embed`—manage tables, records, storage buckets, visual SQL queries, access rules, cron jobs, and backups without external dependencies.
- **🛠️ Visual SQL Query Builder & Aggregate Engine**: Design complex `SELECT DISTINCT`, interactive `JOIN`s, **⚡ Auto-Detect Relations**, toggle **📦 Nested `JSON_OBJECT` vs 📄 Flat Columns**, aggregate functions (`COUNT`, `SUM`, `COALESCE`, `AVG`, `ROUND`, `MIN`, `MAX`, `GROUP_CONCAT`), `GROUP BY` / `HAVING`, and **Multi-Table Atomic Transactions** (`BEGIN ... COMMIT`).
- **🔗 2-Level Auto-Load Relations (Zero N+1)**: Automatic Foreign Key detection (`_id` naming convention + physical `FOREIGN KEY` introspection) with single-batch `WHERE id IN (...)` eager loading, smart `ON DELETE CASCADE` (Required) vs `ON DELETE SET NULL` (Nullable), and per-endpoint relation overrides.
- **🛡️ Granular API Access Rules, RBAC & Field Projections**: Independent **`list_rule`** (paginated `/api/:table`) vs **`all_rule`** (unpaginated `/api/:table/all`), role-based access (`@request.auth.role = 'admin'`), and **Server-Side Field Projections** that prevent unauthorized column leaks.
- **📁 Supabase-Style Storage Explorer**: Buckets overview, Table & Grid Cards view, Lightbox image preview, 1-click Copy URL, directory traversal & XSS sandbox protection, and **Zero Orphaned Files** automatic disk cleanup.
- **⚡ Realtime SSE & Official JS/TS SDK (`padibase`)**: Live Server-Sent Events (`/api/realtime`) for `create`, `update`, and `delete` mutations, paired with a zero-dependency JavaScript/TypeScript SDK for Vue 3, React, Next.js, and Svelte.

---

## 📋 Table of Contents

- [🚀 Getting Started](#getting-started)
- [📚 Core Studio Systems](#core-studio-systems)
- [🎯 Advanced Capabilities & SDK](#advanced-capabilities--sdk)
- [🚀 Deployment & Production](#deployment--production)

---

## 🚀 Getting Started

- **[Quick Start](01-getting-started/QUICK_START.md)**: Launch PadiBase Studio in seconds with SQLite, MySQL, MariaDB, or PostgreSQL.
- **[Installation Guide](01-getting-started/INSTALLATION.md)**: Binary setup, Cargo build options, and CLI commands (`serve`, `admin create`, `api-collection`).
- **[Configuration Guide](01-getting-started/CONFIGURATION.md)**: Environment variables (`.env`), multi-DB drivers, JWT secrets, and upload limits.

---

## 📚 Core Studio Systems

- **[Visual SQL Query Builder](02-core-concepts/QUERY_BUILDER.md)**: Interactive SQL designer, `JSON_OBJECT` nested relations, aggregates, and atomic transactions.
- **[Granular RBAC & Access Rules](02-core-concepts/RBAC.md)**: Independent `list_rule` vs `all_rule`, role expressions, and Server-Side Field Projections.
- **[File Upload & Supabase-Style Storage](02-core-concepts/FILE_UPLOAD.md)**: Buckets explorer, multipart uploads, XSS sandboxing, and Zero Orphaned Files lifecycle.
- **[Authentication & JWT](02-core-concepts/AUTHENTICATION.md)**: Argon2id password hashing, register/login/reset flows, and email verification.

---

## 🎯 Advanced Capabilities & SDK

- **[Frontend Integration & JS/TS SDK](03-advanced/FRONTEND_INTEGRATION.md)**: Official `padibase` SDK guide for Vue 3, React, Svelte, and Direct HTTP methods.
- **[Multi-Database Engine](03-advanced/MULTI_DATABASE.md)**: Configuring SQLite (WAL), MySQL, MariaDB, and PostgreSQL + 2-Level Foreign Key introspection.
- **[Realtime SSE Stream](03-advanced/REALTIME.md)**: Live event broadcasting (`/api/realtime`) and Studio Realtime Monitor.
- **[Postman v2.1 API Collection Exporter](03-advanced/API_COLLECTION_GUIDE.md)**: 1-click export for Postman, Insomnia, Thunder Client, Bruno, and VS Code REST Client.
- **[Security Architecture](03-advanced/SECURITY.md)**: Default logged-in mutation guards, Argon2id, CORS, and path canonicalization.
