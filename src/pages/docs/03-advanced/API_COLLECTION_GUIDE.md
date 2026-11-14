# ⚡ API Config, Custom Dynamic SQL & Postman Export

The **API Config / Endpoints** workspace (`/_padibase/endpoints`) in PadiBase Studio serves as the command center for inspecting active REST API routes, creating **Custom Dynamic SQL Endpoints**, scheduling background **Cron Tasks**, and exporting your API specification to **Postman Collection v2.1.0** format in a single click.

---

## 📋 Table of Contents

1. [🧭 Workspace Overview](#1-workspace-overview)
2. [📡 Live Auto-Generated REST Endpoints](#2-live-auto-generated-rest-endpoints)
3. [🛠️ Custom Dynamic SQL Endpoints (/api/custom/*)](#3-custom-dynamic-sql-endpoints-apicustom)
4. [⏰ Background Cron Tasks & Scheduled SQL](#4-background-cron-tasks--scheduled-sql)
5. [📑 1-Click Postman Collection v2.1.0 Exporter](#5-1-click-postman-collection-v210-exporter)
6. [🚀 Importing into Postman, Insomnia & Bruno](#6-importing-into-postman-insomnia--bruno)

---

## 1. 🧭 Workspace Overview

Opening the **API Config** menu presents:
- **Active Routes Catalog**: Live catalog of all REST endpoints generated for every Base and Auth collection.
- **Access Rule Status**: Color-coded badges indicating if a route is `Public`, `Auth Required`, `Admin Only`, or `Owner Only`.
- **Quick Export**: 1-click download of the entire system API specification in standard Postman v2.1.0 format.
- **Custom Dynamic SQL Manager**: Visual interface to design and manage parameterized custom SQL endpoints.

---

## 2. 📡 Live Auto-Generated REST Endpoints

Every collection automatically exposes standard high-performance REST routes:

```text
┌────────┬───────────────────────────────────┬────────────────────────────────────────┐
│ Method │ Endpoint Route                    │ Description                            │
├────────┼───────────────────────────────────┼────────────────────────────────────────┤
│ GET    │ /api/:table                       │ Paginated list (?page=1&perPage=20)    │
│ GET    │ /api/:table/all                   │ Complete table dump without pagination │
│ GET    │ /api/:table/:id                   │ Single record detail by ID             │
│ POST   │ /api/:table                       │ Insert a new record                    │
│ PATCH  │ /api/:table/:id                   │ Partial record update                  │
│ DELETE │ /api/:table/:id                   │ Delete record                          │
│ POST   │ /api/:table/batch                 │ Batch Create multiple rows from JSON   │
│ DELETE │ /api/:table/batch                 │ Batch Delete selected row IDs          │
│ POST   │ /api/collections/:auth/login      │ Auth Table login (Argon2id + JWT)      │
│ POST   │ /api/collections/:auth/register   │ Auth Table user self-registration      │
└────────┴───────────────────────────────────┴────────────────────────────────────────┘
```

### Supported Query Parameters:
- **`?page=1&perPage=30`**: Pagination controls.
- **`?sort=-created_at,name`**: Sorting (`-` indicates Descending).
- **`?filter=(status='active' && price > 1000)`**: Conditional filter expressions.
- **`?fields=id,title,cover_url`**: Field projection requesting specific columns.

---

## 3. 🛠️ Custom Dynamic SQL Endpoints (`/api/custom/*`)

When your application needs complex joins, reporting metrics, or business logic beyond CRUD, **you do not need to write Rust backend code**. Create dynamic endpoints directly from Studio:

### Creating a Custom SQL Endpoint:
1. Click **"+ New Custom API"**.
2. **Route Name**: Enter an identifier (e.g., `monthly-revenue`). The route will be live at `/api/custom/monthly-revenue`.
3. **HTTP Method**: Choose `GET`, `POST`, `PUT`, or `DELETE`.
4. **Access Rule**: Specify who can call it (e.g., `@request.auth.role = 'admin'`).
5. **Parameterized SQL Query**:
   Use `:param_name` placeholders to prevent SQL injection:
   ```sql
   SELECT 
     DATE_TRUNC('month', created_at) AS order_month,
     COUNT(id) AS total_transactions,
     SUM(total_amount) AS gross_revenue,
     AVG(total_amount) AS average_ticket
   FROM orders
   WHERE status = 'completed' AND created_at >= :start_date
   GROUP BY order_month
   ORDER BY order_month DESC
   LIMIT :limit;
   ```
6. Click **"Save Endpoint"**.

### Invoking the Custom Endpoint:
Pass query parameters for `GET` or JSON body for `POST`:
```bash
curl -X GET "http://127.0.0.1:8085/api/custom/monthly-revenue?start_date=2026-01-01&limit=12" \
  -H "Authorization: Bearer <ADMIN_JWT_TOKEN>"
```

PadiBase executes the query via an **SQLx Prepared Statement** and outputs clean native JSON:
```json
{
  "status": 200,
  "success": true,
  "items": [
    {
      "order_month": "2026-04-01T00:00:00Z",
      "total_transactions": 1420,
      "gross_revenue": 345000000,
      "average_ticket": 242957.74
    }
  ]
}
```

---

## 4. ⏰ Background Cron Tasks & Scheduled SQL

PadiBase includes a built-in **Cron Scheduler** inside the binary:
- Schedule specific SQL queries to run automatically in the background (e.g., purging expired tokens, archiving old records, calculating daily totals).
- Uses standard 5-part cron syntax (`* * * * *` for minute, hour, day of month, month, day of week).
- Example: `0 2 * * *` runs daily at 2:00 AM.

---

## 5. 📑 1-Click Postman Collection v2.1.0 Exporter

Export your entire backend API into standard **Postman Collection v2.1.0 JSON** files.

### A. Export from Studio UI
- Click **"Export Postman Collection"** in the API Config workspace or any table header.
- The JSON file downloads directly in your browser.

### B. Export via Binary CLI
```bash
# Export full system and all collections to ./api_collection:
./padibase api-collection --force

# Export a single collection only:
./padibase api-collection --collection posts --force

# Customize output directory and base URL:
./padibase api-collection --output ./my_postman --base-url "http://127.0.0.1:8085"
```

Generated files:
1. `padi_base_api_collection.json`: Complete master collection covering Admin Gateway, Auth, Collections, Batch Operations, and Realtime SSE.
2. `<table_name>_collection.json`: Modular per-table collection.

---

## 6. 🚀 Importing into Postman, Insomnia & Bruno

1. Open your API client (**Postman**, **Insomnia**, **Bruno**, or **Thunder Client**).
2. Select **Import** -> Choose the exported JSON file.
3. All folders, endpoints, query parameters, and payload schemas load automatically!
4. **Auto-Saved JWT Tokens**:
   Executing the login request (`auth-with-password`) automatically stores the returned JWT token into the collection variable `{{token}}`, authenticating all subsequent requests without copy-pasting.
