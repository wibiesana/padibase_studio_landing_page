# ⚙️ Configuration Guide — PadiBase Studio

**PadiBase Studio** loads its environment configurations from the `.env` file at application startup.

---

## 📋 Environment Variables Overview

| Key | Default | Description |
| :--- | :--- | :--- |
| `APP_ENV` | `development` | Application environment mode (`development`, `production`, `test`) |
| `APP_DEBUG` | `true` | Enable detailed debug logs and error details (`true` or `false`) |
| `APP_HOST` | `127.0.0.1` | Host address for the HTTP server |
| `APP_PORT` | `8085` | Port for the PadiBase HTTP server and Studio dashboard |
| `DB_DRIVER` | `sqlite` | Database engine (`sqlite`, `mysql`, `mariadb`, `pgsql`, `postgres`) |
| `DB_DATABASE` | `padi_data/padi.db`| SQLite database file path, or database name for MySQL/PostgreSQL |
| `DATABASE_URL` | - | Direct database connection string (e.g. `postgres://user:pass@127.0.0.1:5432/padibase`) |
| `DB_HOST` | `127.0.0.1` | Database server host (when not using `DATABASE_URL`) |
| `DB_PORT` | `3306` (or `5432`) | Database server port |
| `DB_USERNAME` | `root` | Database username |
| `DB_PASSWORD` | - | Database user password |
| `JWT_SECRET` | - | Cryptographic secret for signing JWT tokens (minimum 32 characters) |
| `JWT_ALGORITHM` | `HS256` | JWT signing algorithm |
| `JWT_EXPIRATION` | `24` | Token expiration lifetime in hours |
| `CORS_ALLOWED_ORIGINS` | `*` | Comma-separated list of allowed CORS origins, or `*` for all |
| `RESPONSE_FORMAT` | `full` | Standardized API response structure format (`full` / `compact`) |
| `STORAGE_DIR` | `./padi_data/storage` | Local directory for decoupled file storage buckets |

---

## 🔒 Production Security Recommendations

1. **Environment Mode:** Set `APP_ENV=production` and `APP_DEBUG=false` in live environments.
2. **Cryptographic Secrets:** Ensure `JWT_SECRET` is at least 32 characters long with high entropy.
3. **CORS Whitelist:** Restrict `CORS_ALLOWED_ORIGINS` to your production frontend domain (e.g. `https://my-app.com`).
4. **Decoupled Storage:** Storage files reside in `./padi_data/storage`. Ensure regular backups of `./padi_data`.
