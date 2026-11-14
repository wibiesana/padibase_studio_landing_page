export default {
  // Navigation / Layout
  nav: {
    home: 'Home',
    studio: 'Studio Workspace',
    features: 'Features',
    sdk: 'JS/TS SDK',
    quickStart: 'Dashboard Guide',
    documentation: 'Documentation',
    fullDocumentation: 'Full Documentation',
    github: 'GitHub',
    githubRepo: 'GitHub Repository',
    builtWith: 'Engineered in Rust (Axum + Tokio + SQLx) · Single Executable Binary',
    navigation: 'Navigation',
  },
  // Hero Section
  hero: {
    badge: 'SINGLE BINARY RUST BaaS · EMBEDDED STUDIO AT /_padibase/ · MULTI-DB',
    title: 'PadiBase Studio',
    subtitle:
      'PocketBase & Supabase simplicity powered by native Rust. Manage SQLite, MySQL, MariaDB & PostgreSQL tables, Visual SQL Builder, 2-Level Relations, Granular RBAC, File Storage, and Realtime SSE from one embedded binary.',
    getStarted: 'Dashboard Guide',
    exploreStudio: 'Explore Studio UI',
    documentation: 'Documentation Hub',
    sdkBadge: 'Includes Official Zero-Dependency JS/TS SDK with Auto Realtime SSE',
  },
  // Interactive Studio Workspace Preview Section
  studioPreview: {
    overline: 'EMBEDDED ADMIN DASHBOARD (/_padibase/)',
    title: 'Inside PadiBase Studio Workspace',
    subtitle:
      'Compiled directly into the Rust binary via rust-embed. Zero Node.js or external dashboard containers required.',
    tabs: {
      tables: 'Tables & Data',
      sqlBuilder: 'Visual SQL Builder',
      accessRules: 'API & Access Rules',
      storage: 'Supabase Storage',
      customApi: 'Custom API & Cron',
      realtime: 'Realtime Monitor',
    },
  },
  // Philosophy & Key Advantages Section
  philosophy: {
    title1: 'PocketBase',
    titleSpeed: 'Simplicity',
    title2: 'Powered by',
    titleIndustrial: 'Native Rust',
    desc: 'PadiBase Studio bridges the gap between lightweight single-file BaaS tools and enterprise multi-database backends. Start with zero-setup embedded SQLite (WAL) or connect directly to PostgreSQL, MySQL, or MariaDB with automatic schema & Foreign Key introspection.',
    readBtn: 'Explore Architecture & Docs →',
    items: {
      p: {
        t: 'Polyglot Multi-DB Engine',
        d: 'Embedded SQLite (WAL Mode) out of the box, or switch seamlessly to PostgreSQL, MySQL, and MariaDB via DATABASE_URL or .env.',
      },
      a: {
        t: 'Auto-Detected 2-Level Relations',
        d: 'Automatic Foreign Key detection (_id convention + physical FK constraints) with 1-batch WHERE IN eager loading and zero N+1 queries.',
      },
      d: {
        t: 'Dynamic Visual SQL Builder',
        d: 'Design JOINs, Nested JSON_OBJECT relations, Aggregates (SUM, COUNT, AVG, GROUP_CONCAT), and Atomic Transactions visually.',
      },
      i: {
        t: 'Industrial RBAC & Projections',
        d: 'Independent list_rule (paginated) vs all_rule (unpaginated), role guards (request.auth.role), and server-side column projections.',
      },
    },
  },
  // Key Advantages Comparison Section
  advantages: {
    overline: 'WHY PADIBASE STUDIO?',
    title: 'Key Advantages Over Traditional BaaS',
    subtitle: 'Built to solve real-world backend bottlenecks without sacrificing developer ergonomics',
    items: {
      multiDb: {
        badge: 'Multi-Engine',
        title: 'Not Locked to SQLite Only',
        desc: 'While traditional embedded BaaS solutions lock you into SQLite, PadiBase Studio natively supports SQLite (WAL), MySQL, MariaDB, and PostgreSQL with 1-click Live Schema Sync (/api/tables/sync).',
      },
      relations: {
        badge: 'Zero N+1 Query',
        title: '2-Level Eager Loading & Smart FK Constraints',
        desc: 'Control relations at the Table level (auto_load_relations) or per API Endpoint (list, all, view). Automatically sets ON DELETE CASCADE for required fields and ON DELETE SET NULL for optional fields.',
      },
      rules: {
        badge: 'Granular Security',
        title: 'Separated list_rule vs all_rule + Field Projections',
        desc: 'Allow public paginated browsing (/api/posts) while restricting bulk unpaginated pulls (/api/posts/all) to authenticated or admin roles—plus server-side column filtering that clients cannot bypass.',
      },
      visualSql: {
        badge: 'Visual to API',
        title: 'Visual SQL Builder & Custom Endpoints',
        desc: 'Auto-detect table relations into nested JSON_OBJECT responses, apply GROUP BY / HAVING aggregates, and publish your query directly as a custom REST endpoint (/api/custom/*).',
      },
    },
  },
  // Features Bento Grid (12 Core Features)
  features: {
    title: 'Complete PadiBase Studio Capabilities',
    subtitle: 'Everything You Need in a Single Binary',
    performanceTag: 'PadiBase Studio v0.2',
    items: {
      multiDb: {
        t: 'Multi-Database Engine',
        d: 'Run on embedded SQLite (WAL Mode) with zero config, or connect to MySQL, MariaDB, and PostgreSQL via --db-url or .env.',
        tag: 'SQLite · MySQL · MariaDB · Postgres',
      },
      studioUi: {
        t: 'Embedded Studio Dashboard',
        d: 'Spreadsheet-like data browser, schema drawers, custom confirmation/rename modals with live validation embedded at /_padibase/.',
        tag: 'rust-embed SPA',
      },
      sqlBuilder: {
        t: 'Visual SQL Query Builder',
        d: 'Interactive SELECT DISTINCT, JOINs, Auto-Detect Relations, Nested JSON_OBJECT output, Aggregates (SUM, AVG, COUNT, GROUP_CONCAT), and HAVING.',
        tag: 'Visual Designer',
      },
      relations: {
        t: '2-Level Auto-Load Relations',
        d: 'Introspects _id columns and physical FOREIGN KEY constraints. Batches eager loading in a single WHERE id IN (...) query with zero N+1 overhead.',
        tag: 'Zero N+1 Engine',
      },
      rbac: {
        t: 'Granular Access Rules & RBAC',
        d: 'Unified API Endpoints & Rules modal with Auth, Public, Owner, and Admin presets, plus separate list_rule (paginated) vs all_rule (unpaginated).',
        tag: 'list vs all RBAC',
      },
      projections: {
        t: 'Server-Side Field Projections',
        d: 'Resource Transformer per endpoint (list, all, view). Unchecked columns are stripped server-side and never leaked even via ?fields=.',
        tag: 'Data Privacy',
      },
      storage: {
        t: 'Supabase-Style Storage Explorer',
        d: 'Buckets explorer, Table & Grid cards view, image lightbox, 1-click Copy URL, XSS sandbox protection, and Zero Orphaned Files auto-cleanup.',
        tag: 'Media & Buckets',
      },
      realtime: {
        t: 'Realtime SSE Broadcaster',
        d: 'Sub-millisecond Server-Sent Events (/api/realtime) for create, update, and delete mutations with a live Realtime Monitor in Studio.',
        tag: 'Live Pub/Sub',
      },
      auth: {
        t: 'Argon2id + JWT Auth & Mailer',
        d: 'Complete register, login, profile, password reset, email verification, and built-in SMTP HTML Email Templates with live preview.',
        tag: 'Argon2id + JWT',
      },
      transactions: {
        t: 'Atomic Transactions & Backups',
        d: 'Execute multi-table mutations in a single BEGIN...COMMIT transaction (/api/transactions) and create online atomic SQLite backups (VACUUM INTO).',
        tag: 'ACID & Snapshots',
      },
      cron: {
        t: 'Background Cron Scheduler & Custom API',
        d: 'Schedule recurring background SQL tasks or HTTP webhooks (/api/cron/jobs) and expose custom SQL endpoints (/api/custom/*).',
        tag: 'Cron & Webhooks',
      },
      exporter: {
        t: '1-Click Postman v2.1 Exporter & JS SDK',
        d: 'Export full-system or per-table Postman v2.1.0 collections with auto-saved JWT tokens, or connect instantly via the official padibase JS/TS SDK.',
        tag: 'DX & Tooling',
      },
    },
  },
  // Official JS/TS SDK Section
  sdk: {
    overline: 'OFFICIAL CLIENT LIBRARY (padi_js_sdk)',
    title: 'Zero-Dependency JavaScript & TypeScript SDK',
    subtitle:
      'Engineered for Vue 3, React, Next.js, Svelte, and Node.js. Relations and field projections are resolved automatically by PadiBase Studio.',
    copyBtn: 'Copy Code',
  },
  // Stats Section
  stats: {
    title: 'RUST NATIVE ARCHITECTURE',
    subtitle: 'Single Binary. Massive Throughput.',
    desc: 'Compiled to native machine code with Axum 0.8, Tokio async runtime, and SQLx connection pooling. Zero garbage collector pauses and minimal RAM usage.',
    securityScore: 'Security Architecture',
    performance: 'Engine Throughput',
  },
  // Monitor Placeholder
  monitor: {
    title: 'Live Realtime SSE Stream (/api/realtime)',
    desc: 'Instant create · update · delete event broadcasting with Auto-Reconnect SDK',
  },
  // Dashboard Guide Section (How to Use Dashboard)
  quickStart: {
    badge: 'PADIBASE STUDIO WORKFLOW',
    title1: 'How to Run & Master',
    title2: 'PadiBase Studio',
    desc: 'Complete guide to launching the PadiBase server, bootstrapping your first superuser, and managing Tables, API Config, Storage, and SQL Builder via the embedded dashboard (http://127.0.0.1:8085/_padibase/).',
    tabs: {
      startAndLogin: '1. Start & Login',
      tables: '2. Tables & Schema',
      rules: '3. Access Rules & RBAC',
      apiconfig: '4. API Config & Endpoints',
      storage: '5. Storage Explorer',
      sqlbuilder: '6. Visual SQL Builder',
      realtime: '7. Realtime SSE',
    },
    workflows: {
      startAndLogin: {
        stepBadge: 'STEP 1 — SETUP & SUPERUSER AUTH',
        title: 'Launch PadiBase Server & Bootstrap First Admin',
        desc: 'Start the PadiBase standalone binary in seconds with embedded SQLite or PostgreSQL/MySQL, then bootstrap your superuser account.',
        instructions: [
          'Run the pre-built PadiBase binary: `./padibase serve --http 127.0.0.1:8085` (on Windows: `padibase.exe serve` or double-click `init_backend.bat`).',
          'Open your browser and navigate to Studio: `http://127.0.0.1:8085/_padibase/`.',
          'On first visit, the system presents the "Create First Superuser" wizard because no admins exist yet in the database (_admins).',
          'Enter admin Email and Password (min 8 characters), then click "Create & Login". You can also create an admin via CLI: `padibase admin create admin@example.com "password123"`.',
          'Once authenticated, you enter the PadiBase Studio Dashboard with complete access to all collections, query builder, and API settings.',
        ],
        tipTitle: 'Argon2id Superuser Gateway',
        tipDesc: 'Admin passwords use military-grade Argon2id hashing. Admin requests are verified statelessly with encrypted superuser JWTs.',
      },
      tables: {
        stepBadge: 'STEP 2 — TABLES & SCHEMA',
        title: 'Create Tables (Base vs Auth), Schema & Decoupled Storage',
        desc: 'Create Base or Auth collections, define field types, configure auto foreign keys (Zero N+1), and store media URLs in text fields.',
        instructions: [
          'Open the "Table" menu in the Studio sidebar and click "+ New Collection".',
          'Choose collection type: "Base Collection" (for general data like posts, products) or "Auth Collection" (for users/members with built-in email, username, Argon2id passwordHash, tokenKey, and full auth endpoints).',
          'Add fields as needed: TEXT, NUMBER, BOOLEAN, DATE, JSON, RELATION, EMAIL, or SELECT.',
          'Decoupled Storage (Important): Tables do NOT have a "FILE" column type. For media, use a TEXT field (e.g., `avatar_url`). Upload files to Storage, then store the returned URL. In the record drawer, an "Upload to Storage" button automatically uploads files and populates the URL.',
          'For RELATION fields, select the target collection (e.g., `user_id -> users.id`). PadiBase automatically configures FK constraints (CASCADE for Required, SET NULL for Nullable) and 2-level eager loading with zero N+1 queries.',
          'Manage records: create via Visual Drawer / JSON Mode, filter, sort, paginate, batch-create rows from JSON, batch-delete, and click "Sync DB Schema" for instant physical DB synchronization.',
        ],
        tipTitle: 'Decoupled Storage Benefits',
        tipDesc: 'Decoupled file storage keeps database tables lean and responsive while preventing orphaned physical files (Zero Orphaned Files).',
      },
      rules: {
        stepBadge: 'STEP 3 — SECURITY & RBAC',
        title: 'Configure Access Rules, Authorization & Field Projections',
        desc: 'Set granular permissions per endpoint (list, all, view, create, update, delete) and hide sensitive fields on the server side.',
        instructions: [
          'On any collection, open the "API & Access Rules" modal.',
          'Configure independent rules for each action: List (paginated), All (unpaginated/bulk), View, Create, Update, Delete.',
          'Choose Quick Presets: "Public", "Auth" (@request.auth.id != ""), "Owner" (user_id = @request.auth.id), or "Admin" (@request.auth.role = "admin").',
          'Toggle "Projected Fields" checkboxes to choose which columns clients can see. Unchecked fields will never leak.',
          'Click "Save Rules" to enforce REST endpoint security immediately without restarting the server.',
        ],
        tipTitle: 'Separate list_rule vs all_rule',
        tipDesc: 'Allow public users to browse paginated items (/api/posts) while strictly restricting full table dumps (/api/posts/all) to authenticated admins.',
      },
      apiconfig: {
        stepBadge: 'STEP 4 — API CONFIG & ENDPOINTS',
        title: 'Auto REST Routes, Custom Dynamic SQL & Postman Export',
        desc: 'Every table automatically provides live REST routes. You can also craft custom dynamic SQL endpoints with parameter bindings and export Postman v2.1 in 1 click.',
        instructions: [
          'Open "API Config / Endpoints" to inspect all active live REST routes for every table (/api/:table, /api/:table/all, /api/:table/:id, /api/collections/:table/records).',
          'For Auth Tables, automatic authentication routes are active: /auth-with-password, /register, /auth-refresh, /request-password-reset, /confirm-password-reset, /change-password, and /me.',
          'Create Custom Dynamic SQL Endpoints: click "+ New Custom API", provide a route name (e.g., `/api/custom/user-stats`), set HTTP method (GET/POST/PUT/DELETE), write parameterized SQL (`:since`, `:limit`), and assign access rules.',
          'Schedule automated Cron Tasks to execute custom SQL queries or maintenance webhooks on a recurring schedule.',
          'Export Postman v2.1: click "Export Postman Collection" to download a complete API specification ready to import into Postman, Insomnia, Thunder Client, Bruno, or VS Code REST Client.',
        ],
        tipTitle: 'Dynamic SQL Parameter Bindings',
        tipDesc: 'Custom SQL queries are executed using SQLx prepared statements that are immune to SQL injection and output clean, native JSON.',
      },
      storage: {
        stepBadge: 'STEP 5 — FILES & MEDIA STORAGE',
        title: 'Manage Buckets, Upload Files & Zero Orphan Cleanup',
        desc: 'Supabase-style media explorer with visual Lightbox previews, 1-click URL copying, and automated physical file garbage collection.',
        instructions: [
          'Open "Storage" in the Studio sidebar to view isolated media buckets (e.g., `avatars`, `attachments`, `documents`).',
          'Upload files via drag-and-drop in Storage Explorer or call the REST endpoint `POST /api/storage/:bucket` (multipart/form-data).',
          'Preview images directly using the built-in Lightbox modal without leaving the dashboard.',
          'Click "Copy URL" to obtain instant public media links (`/api/storage/:bucket/:file` or `/api/files/:bucket/:record_id/:file`).',
          'PadiBase automatically validates filenames, MIME types, applies Content-Security-Policy sandbox headers, and deletes old physical files when records are updated or deleted (Zero Orphaned Files).',
        ],
        tipTitle: 'Zero Orphaned Files',
        tipDesc: 'When records are deleted or files updated, old physical files on disk are automatically pruned to prevent storage bloat.',
      },
      sqlbuilder: {
        stepBadge: 'STEP 6 — QUERY & ATOMIC TRANSACTIONS',
        title: 'Visual SQL Builder, Aggregates & Atomic Transactions',
        desc: 'Design relational queries and execute multi-table atomic transactions directly from the UI without writing manual SQL strings.',
        instructions: [
          'Switch to the "Visual SQL Builder" tab in PadiBase Studio.',
          'Select the primary table and visually add JOIN relations with foreign key auto-detection.',
          'Choose output format: Flat Columns or structured Nested JSON_OBJECT.',
          'Add aggregate metrics like COUNT, SUM, AVG, and GROUP_CONCAT with HAVING clauses.',
          'Test multi-table atomic mutations via `/api/transactions` with full ACID guarantees (BEGIN ... COMMIT) and auto-rollback on failure.',
        ],
        tipTitle: 'Clean JSON Responses',
        tipDesc: 'The query engine produces clean, unescaped native JSON responses ready for direct consumption in Vue, React, or mobile clients.',
      },
      realtime: {
        stepBadge: 'STEP 7 — EVENT STREAMING & JS SDK',
        title: 'Monitor & Subscribe to Realtime SSE Broadcasts',
        desc: 'Stream database mutations (create, update, delete) via Server-Sent Events without setting up external WebSocket infrastructure.',
        instructions: [
          'Click "Realtime Monitor" in the Studio sidebar (/_padibase/realtime).',
          'The SSE status indicator turns green with an active pulse dot.',
          'Every time data is inserted, updated, or removed, live event logs appear instantaneously.',
          'Connect on the frontend: `padi.table("posts").subscribe("*", (e) => { ... })` for immediate reactive UI updates.',
          'The official SDK includes built-in auto-reconnection and exponential backoff.',
        ],
        tipTitle: 'High-Concurrency Rust Core',
        tipDesc: 'Backed by Tokio async broadcast channels, capable of streaming tens of thousands of updates per second with minimal CPU and memory footprints.',
      },
    },
    actionBtn: 'Test in Studio Preview',
  },
  // Learning Paths Section
  learning: {
    title: 'Master PadiBase Studio',
    subtitle: 'Step-by-step documentation paths from initial setup to production scaling',
    beginBtn: 'Open Documentation',
    paths: {
      basics: {
        t: 'Getting Started & Studio UI',
        d: 'Access Studio in your browser, create your first Superuser, and manage Base & Auth tables.',
        steps: [
          'Studio Dashboard Access & Multi-DB Configuration',
          'Superuser Setup & Protected Admin Gateway',
          'Dynamic Tables, Schema Sync & 2-Level Relations',
          '1-Click Postman Collection v2.1.0 Export',
        ],
      },
      advanced: {
        t: 'Visual SQL, RBAC & Storage',
        d: 'Build complex relational queries, configure granular security rules, and manage media buckets.',
        steps: [
          'Visual SQL Builder, JOINs & Nested JSON_OBJECT',
          'Granular Access Rules (list vs all) & Field Projections',
          'Supabase-Style File Storage & Zero Orphaned Files',
          'Dynamic Custom API Endpoints & Cron Jobs',
        ],
      },
      production: {
        t: 'JS/TS SDK & Production',
        d: 'Integrate frontend apps with Auto Realtime SSE and deploy PadiBase Studio in production.',
        steps: [
          'Official JS/TS SDK (Vue 3, React, Svelte)',
          'Realtime SSE Subscriptions & Reactive AuthStore',
          'Online Atomic Backups (VACUUM INTO) & Restore',
          'Production Security, CORS & Reverse Proxy',
        ],
      },
    },
  },
  // CTA Section
  cta: {
    title1: 'Ready to Build with',
    title2: 'PadiBase Studio?',
    desc: 'Experience the simplicity of PocketBase & Supabase combined with the raw speed and multi-database power of Rust.',
    installBtn: 'Explore Dashboard Guide',
  },
}
