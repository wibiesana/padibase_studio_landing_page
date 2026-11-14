# ⚡ Quick Start Guide — PadiBase Studio

Get **PadiBase Studio** running in under 30 seconds using the pre-built executable binary with zero installation or build steps.

---

## 1. Start the PadiBase Server

### Option A: Windows (Pre-built Executable)
```cmd
padibase.exe serve --http 127.0.0.1:8085 --dir ./padi_data
```
Or simply double-click the included shortcut:
```cmd
init_backend.bat
```

### Option B: Linux / macOS
```bash
./padibase serve --http 127.0.0.1:8085 --dir ./padi_data
```

### Option C: Connect Directly to PostgreSQL, MySQL, or MariaDB
```bash
# PostgreSQL
./padibase serve --db-url "postgres://postgres:password@127.0.0.1:5432/PadiBase"

# MySQL / MariaDB
./padibase serve --db-url "mysql://root:password@127.0.0.1:3306/PadiBase"
```

Or configure via a `.env` file placed next to the binary:
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

On your first visit, PadiBase Studio automatically detects that no admin exists yet and displays the **"Create First Superuser"** wizard. You can also create an admin via the CLI:
```bash
./padibase admin create admin@example.com "password_rahasia_123"
```

---

## 3. Export Postman v2.1.0 API Collection

Generate ready-to-import collections for **Postman, Insomnia, Thunder Client, Bruno, or VS Code REST Client**:
```bash
# Export full system + all individual table collections to ./api_collection
./padibase api-collection --force

# Export a specific table only
./padibase api-collection --collection users --force
```
You can also click the **"Export Postman Collection"** button directly inside the Studio web UI.

---

## 4. Connect Frontend with Official JS/TS SDK

```javascript
// src/lib/padi.js
import PadiBase from 'padibase';

export const padi = new PadiBase('http://127.0.0.1:8085');

// Query paginated records (2-level relations & field projections auto-resolved!)
const posts = await padi.table('posts').getList(1, 20, { sort: '-created_at' });

// Subscribe to Realtime SSE events
padi.table('posts').subscribe('*', (e) => {
  console.log(e.action, e.record);
});
```
