# ⚡ Quick Start Guide — PadiBase Studio

Get **PadiBase Studio** running in under 60 seconds with embedded SQLite (WAL Mode) or connect directly to MySQL, MariaDB, or PostgreSQL.

---

## 1. Start the PadiBase Server

### Option A: Zero-Config Embedded SQLite (Default)
```bash
cargo run -- serve --http 127.0.0.1:8085 --dir ./padi_data
```

### Option B: Connect to PostgreSQL, MySQL, or MariaDB
```bash
# PostgreSQL
cargo run -- serve --db-url "postgres://postgres:password@127.0.0.1:5432/PadiBase"

# MySQL / MariaDB
cargo run -- serve --db-url "mysql://root:password@127.0.0.1:3306/PadiBase"
cargo run -- serve --db-url "mariadb://root:password@127.0.0.1:3306/PadiBase"
```

Or configure via `.env`:
```env
DB_DRIVER=mysql        # sqlite | mysql | mariadb | pgsql | postgres
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=PadiBase
DB_USERNAME=root
DB_PASSWORD=secret
```

---

## 2. Open PadiBase Studio Dashboard

Open your browser and navigate to:
- **PadiBase Studio Dashboard**: `http://127.0.0.1:8085/_padibase/`
- **REST API Base URL**: `http://127.0.0.1:8085/api/`

On your first visit, PadiBase Studio automatically detects if a Superuser exists (`/api/admins/has-admins`) and displays the **"Create First Superuser"** wizard. You can also create an admin via CLI:
```bash
cargo run -- admin create admin@example.com "password_rahasia_123"
```

---

## 3. Export Postman v2.1.0 API Collection

Generate ready-to-import collections for **Postman, Insomnia, Thunder Client, Bruno, or VS Code REST Client**:
```bash
# Export full system + all individual table collections to ./api_collection
cargo run -- api-collection --force

# Export a specific table only
cargo run -- api-collection --collection users --force
```

---

## 4. Connect Frontend with Official JS/TS SDK

```javascript
// src/lib/padi.js
import PadiBase from 'padibase';

export const padi = new PadiBase('http://127.0.0.1:8085');

// Query paginated records (2-level relations & field projections auto-resolved!)
const posts = await padi.table('posts').getList(1, 20, { sort: '-created' });

// Subscribe to Realtime SSE events
padi.table('posts').subscribe('*', (e) => {
  console.log(e.action, e.record);
});
```
