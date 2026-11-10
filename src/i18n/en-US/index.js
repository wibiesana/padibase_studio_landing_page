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
    title1: 'How to Use the',
    title2: 'PadiBase Dashboard',
    desc: 'Manage your entire backend visually from the embedded web interface (http://127.0.0.1:8085/_padibase/) without writing complicated backend code.',
    tabs: {
      tables: '1. Tables & Columns',
      rules: '2. Access Rules',
      storage: '3. Media Storage',
      realtime: '4. Realtime Stream',
      sqlbuilder: '5. Visual SQL & Custom API',
    },
    workflows: {
      tables: {
        stepBadge: 'STEP 1 — DATABASE & SCHEMA',
        title: 'Create Tables, Define Columns & Smart Relations',
        desc: 'Create new Base or Auth collections, add flexible fields, and connect foreign keys with zero N+1 query overhead.',
        instructions: [
          'Navigate to the left sidebar and click "+ New Collection".',
          'Select collection type: Base Collection (general data) or Auth Collection (users & accounts).',
          'Add required fields: TEXT, NUMBER, BOOLEAN, JSON, FILE, or RELATION.',
          'For RELATION fields, choose the target table—PadiBase automatically sets Foreign Key constraints (CASCADE / SET NULL).',
          'Click "Save Changes" & "Sync DB Schema" to instantly update physical tables in SQLite, PostgreSQL, or MySQL.',
        ],
        tipTitle: 'PadiBase Relation Engine',
        tipDesc: '2-level eager loading executes a single batch WHERE IN query, eliminating N+1 performance bottlenecks.',
      },
      rules: {
        stepBadge: 'STEP 2 — SECURITY & RBAC',
        title: 'Configure Access Rules, Authorization & Field Projections',
        desc: 'Set granular permissions per endpoint (list, all, view, create, update, delete) and hide sensitive fields on the server side.',
        instructions: [
          'On any collection, open the "API & Access Rules" modal.',
          'Configure independent rules for each action: List (paginated), All (unpaginated), View, Create, Update, Delete.',
          'Choose Quick Presets: "Public", "Auth" (@request.auth.id != ""), "Owner" (user_id = @request.auth.id), or "Admin".',
          'Toggle "Projected Fields" checkboxes to choose which columns clients can see. Unchecked fields will never leak.',
          'Click "Save Rules" to enforce REST endpoint security immediately.',
        ],
        tipTitle: 'Separate list_rule vs all_rule',
        tipDesc: 'Allow public users to browse paginated items (/api/posts) while strictly restricting full table dumps (/api/posts/all) to authenticated admins.',
      },
      storage: {
        stepBadge: 'STEP 3 — FILES & MEDIA',
        title: 'Manage Buckets, Upload Files & Zero Orphan Cleanup',
        desc: 'Supabase-style media explorer with visual Lightbox previews, 1-click URL copying, and automated physical file garbage collection.',
        instructions: [
          'Open "Storage" in the Studio sidebar or use FILE fields directly on table records.',
          'Drag and drop files into the upload drawer or storage gallery.',
          'Preview images directly using the built-in Lightbox modal.',
          'Click "Copy URL" to get instant public media links (/api/storage/:bucket/:file).',
          'Files are automatically protected with filename sanitization and Content-Security-Policy sandbox headers.',
        ],
        tipTitle: 'Zero Orphaned Files',
        tipDesc: 'When records are deleted or files updated via PATCH, old physical files are automatically pruned from disk to prevent storage bloat.',
      },
      realtime: {
        stepBadge: 'STEP 4 — EVENT STREAMING',
        title: 'Monitor & Subscribe to Realtime SSE Broadcasts',
        desc: 'Stream database mutations (create, update, delete) via Server-Sent Events without setting up external WebSocket infrastructure.',
        instructions: [
          'Click "Realtime Monitor" in the Studio sidebar (/_padibase/monitor).',
          'The SSE status indicator turns green with an active pulse dot.',
          'Every time data is inserted, updated, or removed, live event logs appear instantaneously.',
          'Connect on the frontend: padibase.collection("posts").subscribe((e) => { ... }) for immediate reactive UI updates.',
          'The official SDK includes built-in auto-reconnection and exponential backoff.',
        ],
        tipTitle: 'High-Concurrency Rust Core',
        tipDesc: 'Backed by Tokio async broadcast channels, capable of streaming tens of thousands of updates per second with minimal CPU and memory footprints.',
      },
      sqlbuilder: {
        stepBadge: 'STEP 5 — QUERY DESIGN & CUSTOM API',
        title: 'Visual SQL Builder, Aggregates & Custom Endpoints',
        desc: 'Design relational queries and schedule background cron jobs from the UI without writing manual SQL strings.',
        instructions: [
          'Switch to the "SQL Builder" tab in PadiBase Studio.',
          'Select the primary table and visually add JOIN relations with foreign key auto-detection.',
          'Choose output format: flat columns or structured Nested JSON_OBJECT.',
          'Add aggregate metrics like COUNT, SUM, AVG, and GROUP_CONCAT with HAVING clauses.',
          'Save the query as a dynamic custom REST endpoint (/api/custom/*) or configure scheduled background Cron jobs.',
        ],
        tipTitle: 'Clean JSON Responses',
        tipDesc: 'The query engine produces clean, unescaped native JSON responses ready for direct consumption in Vue, React, or mobile clients.',
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
