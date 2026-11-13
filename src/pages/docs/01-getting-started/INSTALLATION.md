# 📦 Installation Guide — PadiBase Studio

**PadiBase Studio** is distributed as a single high-performance executable binary with an embedded web management dashboard (`/_padibase/`).

---

## 📋 System Requirements

- **Rust 1.75+ (2021 Edition)** with `cargo` (for building from source)
- **Database Engine (One of the following):**
  - **SQLite** (Default — embedded WAL mode via SQLx in `./padi_data`, zero configuration needed)
  - **PostgreSQL 12+**
  - **MySQL / MariaDB 5.7+ / 8.0+**

---

## 🛠️ Step-by-Step Installation

### 1. Run via Prebuilt Binary
```bash
# Windows
./padibase.exe serve --http 127.0.0.1:8085 --dir ./padi_data

# Linux / macOS
./padibase serve --http 127.0.0.1:8085 --dir ./padi_data
```

### 2. Build from Source via Cargo
```bash
cd padiBase

# Release build & run:
cargo run --release -- serve --http 127.0.0.1:8085 --dir ./padi_data
```

Or run the convenient batch script on Windows:
```cmd
init_backend.bat
```

---

## ⚙️ Connecting to External Databases

You can connect directly to PostgreSQL, MySQL, or MariaDB using the `--db-url` flag or via `.env`:

```bash
# PostgreSQL
cargo run --release -- serve --db-url "postgres://postgres:password@127.0.0.1:5432/padibase"

# MySQL / MariaDB
cargo run --release -- serve --db-url "mysql://root:secret@127.0.0.1:3306/padibase"
```

Sample `.env` file:
```env
APP_ENV=development
APP_HOST=127.0.0.1
APP_PORT=8085

# Database Driver: sqlite | mysql | mariadb | pgsql | postgres
DB_DRIVER=sqlite
DB_DATABASE=padi_data/padi.db

# JWT Configuration (Minimum 32 characters)
JWT_SECRET=your-secure-random-secret-key-at-least-32-chars
JWT_ALGORITHM=HS256
JWT_EXPIRATION=24

CORS_ALLOWED_ORIGINS=*
```

---

## 🔐 First-Run Superuser Setup

Once the server is running:
1. Open your browser and visit: **`http://127.0.0.1:8085/_padibase/`**
2. The system detects if any admin exists. If not, the **"Create First Superuser"** wizard is displayed.
3. Enter your Email and Password (min 8 characters) to log in.

You can also create an admin via CLI:
```bash
cargo run -- admin create admin@example.com "my_secure_password_123"
```

---

## 📑 Export Postman v2.1 Collection

Generate ready-to-import API collections for Postman, Insomnia, Thunder Client, Bruno, or VS Code REST Client:
```bash
cargo run -- api-collection --force
```
