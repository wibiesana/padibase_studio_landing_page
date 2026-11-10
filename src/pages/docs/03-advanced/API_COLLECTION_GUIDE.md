# 📑 Postman v2.1.0 API Collection Exporter

**PadiBase Studio** can export your entire backend API specification or individual table collections into standard **Postman Collection v2.1.0** JSON files—ready to import into **Postman, Insomnia, Thunder Client, Bruno, or VS Code REST Client**.

---

## 1. Export via CLI

```bash
# Export full system collection + individual table collections to ./api_collection
cargo run -- api-collection --force

# Export a specific table only (e.g. users)
cargo run -- api-collection --collection users --force

# Custom output directory & base URL
cargo run -- api-collection --output ./my_collections --base-url "http://127.0.0.1:8085"
```

Generated files:
- `padi_base_api_collection.json`: Master collection containing Admin Gateway, Schema Management, Auth, Backups, Realtime, and folders for every table.
- `<collection>_collection.json`: Modular collection per table (`list`, `all`, `create`, `view`, `update`, `delete`, batch operations, and auto-saved JWT tokens).

---

## 2. 1-Click Download in PadiBase Studio UI (`/_padibase/`)

Download collections directly from your browser:
- `GET /api/api-collection?download=true` (Full System Collection)
- `GET /api/collections/:collection/api-collection?download=true` (Single Table Collection)
- Or click the **Export API Collection** button inside the Studio table header or **API Endpoints & Rules** modal.
