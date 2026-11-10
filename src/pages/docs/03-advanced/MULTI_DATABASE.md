# 🗄️ Multi-Database Engine & 2-Level Relations

Unlike single-driver BaaS tools locked to SQLite, **PadiBase Studio** natively supports **SQLite (WAL Mode)**, **MySQL**, **MariaDB**, and **PostgreSQL** via SQLx connection pools.

---

## 1. Connecting Your Database

```bash
# Default Embedded SQLite (WAL Mode)
cargo run -- serve --http 127.0.0.1:8085 --dir ./padi_data

# MySQL / MariaDB
cargo run -- serve --db-url "mysql://root:password@127.0.0.1:3306/PadiBase"

# PostgreSQL
cargo run -- serve --db-url "postgres://postgres:password@127.0.0.1:5432/PadiBase"
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
