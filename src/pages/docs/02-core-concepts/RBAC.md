# 🛡️ Granular API Access Rules, RBAC & Field Projections

**PadiBase Studio** features a unified **API Endpoints & Access Rules** modal in `/_padibase/` that combines security rules, role-based access control (RBAC), server-side field projections, and 2-level relation controls in one place.

---

## 1. Default Logged-In Protection

By default, mutation operations (`create`, `update`, `delete`) require an authenticated user (`@request.auth.id != ""`). Unauthenticated requests without `Authorization: Bearer <token>` receive `401 Unauthorized`.

---

## 2. Independent `list_rule` vs `all_rule`

PadiBase separates paginated reading from unpaginated bulk exports:
- **`list_rule`**: Controls paginated queries (`GET /api/:collection?page=1&perPage=30`).
- **`all_rule`**: Controls unpaginated full-table queries (`GET /api/:collection/all` and data exports).

This allows you to keep paginated lists `public` for visitors while restricting `/all` bulk pulls to authenticated users or `admin`.

---

## 3. Role-Based Access Control (`users.role`)

PadiBase embeds the user's `role` column into JWT claims upon login and supports flexible rule expressions:
- `@request.auth.role = 'admin'` or `@request.auth.role = 'user'`
- `@request.auth.role in ['admin', 'manager']`
- `admin, user` or `role: admin, user`
- Quick UI Presets: **Auth**, **Public**, **Owner** (`user_id = @request.auth.id`), and **Admin**.

---

## 4. Server-Side Field Projections (Resource Transformer)

Select which columns are exposed on each read endpoint (`GET /api/:collection`, `GET /api/:collection/all`, `GET /api/:collection/:id`). Columns unchecked by the admin are stripped server-side and can never be accessed by clients—even via `?fields=...`.
