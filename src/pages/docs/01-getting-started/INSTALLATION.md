# 📦 Installation & Binary Execution — PadiBase Studio

**PadiBase Studio** is distributed as a **single, self-contained executable binary** with the embedded Studio web dashboard (`/_padibase/`). **No compilation, SDKs, or external runtimes are required.**

---

## 📋 System Requirements

- **Operating System:**
  - Windows (x64)
  - Linux (x64 / ARM64)
  - macOS (x64 / Apple Silicon ARM)
- **Database (One of the following):**
  - **SQLite** (Default — embedded high-performance WAL mode in `./padi_data`, zero configuration needed)
  - **PostgreSQL 12+**
  - **MySQL / MariaDB 5.7+ / 8.0+**

---

## 🛠️ Running the Pre-built Binary

### 1. Windows
Open PowerShell or Command Prompt in the directory containing `padibase.exe`:
```cmd
padibase.exe serve --http 127.0.0.1:8085 --dir ./padi_data
```
Or simply double-click:
```cmd
init_backend.bat
```

### 2. Linux / macOS
Make the binary executable if necessary and launch it:
```bash
chmod +x ./padibase
./padibase serve --http 127.0.0.1:8085 --dir ./padi_data
```

---

## ⚙️ Connecting to External Databases

You can connect directly to PostgreSQL, MySQL, or MariaDB using the `--db-url` flag or via `.env`:

```bash
# PostgreSQL
./padibase serve --db-url "postgres://postgres:password@127.0.0.1:5432/padibase"

# MySQL / MariaDB
./padibase serve --db-url "mysql://root:secret@127.0.0.1:3306/padibase"
```

Sample `.env` file placed next to the binary:
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

You can also create an admin via the binary CLI:
```bash
./padibase admin create admin@example.com "my_secure_password_123"
```

---

## 📑 Export Postman v2.1 Collection

Generate ready-to-import API collections for Postman, Insomnia, Thunder Client, Bruno, or VS Code REST Client:
```bash
./padibase api-collection --force
```
