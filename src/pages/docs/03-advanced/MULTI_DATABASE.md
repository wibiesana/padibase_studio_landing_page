# 🗄️ Multi-Database Engine & 2-Level Relations

Unlike single-driver BaaS tools locked to SQLite, **PadiBase Studio** natively supports **SQLite (WAL Mode)**, **MySQL**, **MariaDB**, and **PostgreSQL** via SQLx connection pools.

---

## 1. Connecting Your Database

```bash
# Default Embedded SQLite (WAL Mode)
./padibase serve --http 127.0.0.1:8085 --dir ./padi_data

# MySQL / MariaDB
./padibase serve --db-url "mysql://root:password@127.0.0.1:3306/PadiBase"

# PostgreSQL
./padibase serve --db-url "postgres://postgres:password@127.0.0.1:5432/PadiBase"
```

---

## 2. Automatic Foreign Key & Relation Introspection

PadiBase detects table relations automatically via two mechanisms:
1. **Naming Convention (`_id` / `Id`)**: Columns like `user_id` or `category_id` are matched against singular/plural table names (`user` / `users`, `category` / `categories`).
2. **Physical Database `FOREIGN KEY` Constraints**:
   - **SQLite**: `PRAGMA foreign_key_list('table_name')`
   - **MySQL / MariaDB**: `INFORMATION_SCHEMA.KEY_COLUMN_USAGE`
   - **PostgreSQL**: `information_schema.table_constraints`

### Smart `ON DELETE` Integrity
- **Required (`Req` checked)**: Creates `ON DELETE CASCADE`.
- **Optional (`Req` unchecked)**: Creates `ON DELETE SET NULL`.

---

## 3. 2-Level Eager Loading (Zero N+1 Problem)

Relations are loaded in a single batch query (`WHERE id IN (...)`) per relation:
- **Level 1 (Table Master Switch)**: Toggle `auto_load_relations` (`ON` / `OFF`) in Table Settings.
- **Level 2 (Endpoint Override)**: Configure per endpoint (`list`, `all`, `view`) to inherit table default, load specific relations (`user, chapter`), or disable relations.
- **Client Query Parameter**: Override dynamically via `?with=user,category` or `?with=none`.

---

## 4. Primary Key Architecture & Multi-DB Portability

PadiBase balances modern distributed BaaS convenience with native legacy database compatibility:

### 1. What Type is Used for Primary Keys?
- **Newly Created Tables in PadiBase**:
  - **Physical SQL Type**: `VARCHAR(255) PRIMARY KEY NOT NULL`
  - **Value Format**: 15-character collision-resistant random string (UUID v4-derived, e.g. `a1b2c3d4e5f6g7h`), following PocketBase and modern BaaS standards.
- **Existing Synced Tables (MariaDB / MySQL / PostgreSQL / SQLite)**:
  - If an existing table already uses `INT AUTO_INCREMENT` or `BIGINT AUTO_INCREMENT` (e.g., `#5`, `#511`), PadiBase's introspector automatically respects and preserves your existing auto-increment integer primary keys without forced data migrations.

### 2. Why VARCHAR(255) for New Tables?

| Advantage | Why It Matters |
| :--- | :--- |
| **Universal Multi-DB Portability** | Auto-increment syntax differs across database engines (`AUTO_INCREMENT` in MariaDB/MySQL, `AUTOINCREMENT` in SQLite, `SERIAL` / `IDENTITY` in PostgreSQL). `VARCHAR(255) PRIMARY KEY` is 100% portable across all 4 supported databases without dialect friction. |
| **Security & Anti-Enumeration** | Sequential integers (`1, 2, 3...`) expose business metrics and permit IDOR enumeration attacks. Random string IDs prevent enumeration. |
| **Distributed & Offline Generation** | Identifiers can be safely generated on client apps, background workers, or microservices before saving to the database without requiring database sequence locking. |
| **Zero Migration Conflicts** | Staging, development, and production data merges and restores avoid ID collisions and sequence resetting headaches. |

> [!NOTE]
> If you strictly require integer `AUTO_INCREMENT` primary keys for specific tables, you can create the table directly in your SQL database (e.g. MariaDB with `id INT AUTO_INCREMENT PRIMARY KEY`) and click **"Sync from Database"** in PadiBase Studio—the engine will automatically adapt to it.
