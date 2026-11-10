# 🛠️ Visual SQL Query Builder & Aggregate Engine

**PadiBase Studio** includes a powerful **Visual SQL Builder** inside `/_padibase/` for designing relational queries, aggregates, and multi-table atomic transactions with live parameter binding and execution.

---

## 1. Visual Query Designer Features

- **Core SQL Operations**: Supports `SELECT`, `SELECT DISTINCT`, `INSERT`, `UPDATE`, `DELETE`, and `COUNT`.
- **Interactive Table JOINs**: Connect related tables using `LEFT JOIN`, `INNER JOIN`, or `RIGHT JOIN`.
- **⚡ 1-Click Auto-Detect Relations**: Click *⚡ Auto-Detect Relations* in the Table JOINs card to automatically scan foreign key columns (`user_id`, `chapter_id`, etc.) and build nested JOIN clauses.
- **Multi-Table Atomic Transactions**: Combine multiple table mutations in a single atomic transaction (`BEGIN ... COMMIT / ROLLBACK`) with automatic `:last_insert_id` references.
- **WHERE Clause Builder**: Parameterized filters (`:param`) and auth token variables (`@request.auth.id`) with a 1-click *"👤 Own Create Only"* preset.

---

## 2. Nested JSON Object Relations (`JSON_OBJECT`)

Each JOIN row lets you toggle between two output formats:
1. **📦 Nested Object**: Uses native `JSON_OBJECT('id', u.id, 'username', u.username) AS user` compatible with SQLite, MySQL, and PostgreSQL. PadiBase automatically parses the JSON string into a native JSON object without escaped quotes:
   ```json
   {
     "id": 101,
     "title": "Bab 1",
     "user": { "id": 4, "username": "alina" }
   }
   ```
2. **📄 Flat Columns**: Outputs standard aliased columns such as `users_username`.

---

## 3. Complete Aggregate Functions & `GROUP BY` / `HAVING`

Add multiple calculations with custom aliases:
- `COUNT(*)` — Total rows
- `COUNT(col)` — Non-NULL column count
- `COUNT(DISTINCT col)` — Unique value count
- `SUM(col)` — Numeric sum
- `COALESCE(SUM(col), 0)` — Null-safe sum (returns `0` when empty)
- `AVG(col)` & `ROUND(AVG(col), 2)` — Average and 2-decimal rounded average
- `MIN(col)` & `MAX(col)` — Minimum and maximum values
- `GROUP_CONCAT(col)` — Concatenate row values into a comma-separated string

Click **Group By Chips** to group by columns, add `HAVING` conditions (e.g., `count > 1`), and sort dynamically by your aggregate aliases in `ORDER BY`.
