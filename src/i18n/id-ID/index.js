export default {
  // Navigation / Layout
  nav: {
    home: 'Beranda',
    studio: 'Studio Workspace',
    features: 'Fitur & Kelebihan',
    sdk: 'JS/TS SDK',
    quickStart: 'Panduan Dashboard',
    documentation: 'Dokumentasi',
    fullDocumentation: 'Dokumentasi Lengkap',
    github: 'GitHub',
    githubRepo: 'Repositori GitHub',
    builtWith: 'Dibangun dengan Rust (Axum + Tokio + SQLx) · Single Executable Binary',
    navigation: 'Navigasi',
  },
  // Hero Section
  hero: {
    badge: 'SINGLE BINARY RUST BaaS · EMBEDDED STUDIO DI /_padibase/ · MULTI-DB',
    title: 'PadiBase Studio',
    subtitle:
      'Kesederhanaan PocketBase & Supabase dengan performa murni Rust. Kelola tabel SQLite, MySQL, MariaDB & PostgreSQL, Visual SQL Builder, Relasi 2-Tingkat, RBAC Granular, File Storage, dan Realtime SSE dalam satu binary mandiri.',
    getStarted: 'Panduan Dashboard',
    exploreStudio: 'Lihat Studio UI',
    documentation: 'Pusat Dokumentasi',
    sdkBadge: 'Dilengkapi Official JS/TS SDK Tanpa Dependensi & Auto Realtime SSE',
  },
  // Interactive Studio Workspace Preview Section
  studioPreview: {
    overline: 'EMBEDDED ADMIN DASHBOARD (/_padibase/)',
    title: 'Eksplorasi Ruang Kerja PadiBase Studio',
    subtitle:
      'Ter-embed langsung di dalam binary Rust via rust-embed. Tanpa perlu setup Node.js atau container dashboard terpisah.',
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
    title1: 'Kemudahan',
    titleSpeed: 'PocketBase',
    title2: 'Ditenagai Kecepatan',
    titleIndustrial: 'Native Rust',
    desc: 'PadiBase Studio menjembatani kemudahan BaaS satu-file dengan kekuatan backend multi-database kelas enterprise. Mulai instan dengan SQLite (WAL) bawaan atau hubungkan langsung ke PostgreSQL, MySQL, dan MariaDB lengkap dengan introspeksi skema & Foreign Key otomatis.',
    readBtn: 'Pelajari Arsitektur & Dokumentasi →',
    items: {
      p: {
        t: 'Multi-Database Engine (Polyglot)',
        d: 'Mendukung embedded SQLite (WAL Mode) tanpa setup, maupun koneksi langsung ke PostgreSQL, MySQL, dan MariaDB via DATABASE_URL atau .env.',
      },
      a: {
        t: 'Relasi 2-Tingkat & Bebas N+1',
        d: 'Deteksi Foreign Key otomatis (konvensi _id & constraint FK fisik) dengan 1-batch WHERE IN eager loading yang hemat memori.',
      },
      d: {
        t: 'Visual SQL Builder Interaktif',
        d: 'Rancang JOIN antar-tabel, relasi Nested JSON_OBJECT, fungsi Agregasi (SUM, COUNT, AVG, GROUP_CONCAT), dan Transaksi Atomik secara visual.',
      },
      i: {
        t: 'RBAC Granular & Proyeksi Kolom',
        d: 'Pemisahan independen list_rule (paginasi) vs all_rule (unpaginated), otorisasi role (request.auth.role), dan filter proyeksi kolom di sisi server.',
      },
    },
  },
  // Key Advantages Comparison Section
  advantages: {
    overline: 'MENGAPA PADIBASE STUDIO?',
    title: 'Kelebihan Utama Dibandingkan BaaS Konvensional',
    subtitle: 'Dirancang khusus untuk mengatasi keterbatasan BaaS tradisional dengan ergonomi tinggi',
    items: {
      multiDb: {
        badge: 'Multi-Database',
        title: 'Tidak Terkunci Hanya pada SQLite',
        desc: 'Berbeda dengan BaaS satu-file lain yang hanya mendukung SQLite, PadiBase Studio mendukung penuh SQLite (WAL), MySQL, MariaDB, dan PostgreSQL dengan fitur 1-Click Live Schema Sync (/api/tables/sync).',
      },
      relations: {
        badge: 'Bebas Masalah N+1',
        title: 'Sistem Relasi 2-Tingkat & Constraint FK Cerdas',
        desc: 'Atur eager-loading di tingkat Tabel (auto_load_relations) atau per-Endpoint API (list, all, view). Otomatis menerapkan ON DELETE CASCADE (jika Required) dan ON DELETE SET NULL (jika Opsional).',
      },
      rules: {
        badge: 'Keamanan Berlapis',
        title: 'Pemisahan list_rule vs all_rule + Proyeksi Field',
        desc: 'Buka akses baca terpaginasi (/api/posts) untuk publik sekaligus batasi penarikan seluruh data (/api/posts/all) khusus Admin/Auth—ditambah whitelist kolom server-side yang aman.',
      },
      visualSql: {
        badge: 'Visual ke REST API',
        title: 'Visual SQL Builder & Custom Endpoint Dinamis',
        desc: 'Deteksi relasi otomatis menjadi objek bersarang JSON_OBJECT, tambahkan agregasi GROUP BY / HAVING, lalu simpan langsung menjadi endpoint REST kustom (/api/custom/*).',
      },
    },
  },
  // Features Bento Grid (12 Core Features)
  features: {
    title: 'Fitur & Kelebihan PadiBase Studio',
    subtitle: 'Seluruh Kebutuhan Backend Modern dalam Satu Binary',
    performanceTag: 'PadiBase Studio v0.2',
    items: {
      multiDb: {
        t: 'Multi-Database Engine',
        d: 'Berjalan instan dengan embedded SQLite (WAL Mode), atau koneksi ke MySQL, MariaDB, dan PostgreSQL melalui --db-url maupun file .env.',
        tag: 'SQLite · MySQL · MariaDB · Postgres',
      },
      studioUi: {
        t: 'Embedded Studio Dashboard',
        d: 'Editor tabel bergaya spreadsheet, drawer skema, serta modal konfirmasi & rename modern dengan validasi real-time di /_padibase/.',
        tag: 'rust-embed SPA',
      },
      sqlBuilder: {
        t: 'Visual SQL Query Builder',
        d: 'Perancang query visual dengan SELECT DISTINCT, JOIN interaktif, Auto-Detect Relations, output Nested JSON_OBJECT, dan fungsi Agregat lengkap.',
        tag: 'Visual Designer',
      },
      relations: {
        t: 'Relasi 2-Tingkat & Eager Loading',
        d: 'Introspeksi kolom _id & FOREIGN KEY fisik secara otomatis. Memuat data relasi dalam 1 batch query (WHERE id IN) tanpa masalah N+1.',
        tag: 'Zero N+1 Engine',
      },
      rbac: {
        t: 'Access Rules Granular & RBAC',
        d: 'Modal API Endpoints & Rules terpadu dengan preset Auth, Public, Owner, Admin, serta pemisahan izin list_rule vs all_rule.',
        tag: 'list vs all RBAC',
      },
      projections: {
        t: 'Proyeksi Kolom Server-Side',
        d: 'Resource Transformer per endpoint (list, all, view). Kolom yang disembunyikan admin tidak akan pernah bocor ke klien meskipun diminta via ?fields=.',
        tag: 'Privasi Data',
      },
      storage: {
        t: 'Storage Explorer Gaya Supabase',
        d: 'Manajemen bucket/koleksi, mode Tabel & Grid, preview Lightbox, 1-Click Copy URL, proteksi XSS sandbox, dan pembersihan otomatis (Zero Orphan Files).',
        tag: 'Media & Buckets',
      },
      realtime: {
        t: 'Realtime SSE Broadcaster',
        d: 'Streaming perubahan data (create, update, delete) secara real-time via Server-Sent Events (/api/realtime) lengkap dengan Realtime Monitor.',
        tag: 'Live Pub/Sub',
      },
      auth: {
        t: 'Autentikasi Argon2id, JWT & SMTP',
        d: 'Alur lengkap register, login, profil, lupa/reset password, verifikasi email, serta editor HTML Email Template dengan live preview.',
        tag: 'Argon2id + JWT',
      },
      transactions: {
        t: 'Transaksi Atomik & System Backup',
        d: 'Jalankan mutasi multi-tabel dalam satu transaksi atomik BEGIN...COMMIT (/api/transactions) serta snapshot backup database online (VACUUM INTO).',
        tag: 'ACID & Snapshots',
      },
      cron: {
        t: 'Cron Scheduler & Custom API',
        d: 'Jadwalkan tugas SQL berulang atau webhook di latar belakang (/api/cron/jobs) serta buat endpoint SQL kustom dinamis (/api/custom/*).',
        tag: 'Cron & Webhooks',
      },
      exporter: {
        t: 'Ekspor Postman v2.1 & Official SDK',
        d: 'Ekspor Postman Collection v2.1.0 lengkap dengan auto-save token JWT dalam 1 klik, atau integrasikan frontend dengan padibase JS/TS SDK.',
        tag: 'DX & Tooling',
      },
    },
  },
  // Official JS/TS SDK Section
  sdk: {
    overline: 'OFFICIAL CLIENT LIBRARY (padi_js_sdk)',
    title: 'JavaScript & TypeScript SDK Tanpa Dependensi',
    subtitle:
      'Dirancang untuk Vue 3, React, Next.js, Svelte, dan Node.js. Relasi tabel dan proyeksi kolom otomatis diselesaikan di sisi backend PadiBase Studio.',
    copyBtn: 'Salin Kode',
  },
  // Stats Section
  stats: {
    title: 'ARSITEKTUR NATIVE RUST',
    subtitle: 'Satu Binary. Performa Masif.',
    desc: 'Dikompilasi langsung ke machine code dengan Axum 0.8, runtime async Tokio, dan SQLx connection pool. Bebas jeda garbage collector dan sangat hemat memori.',
    securityScore: 'Arsitektur Keamanan',
    performance: 'Performa & Konkurensi',
  },
  // Monitor Placeholder
  monitor: {
    title: 'Live Realtime SSE Stream (/api/realtime)',
    desc: 'Broadcast event create · update · delete instan dengan Auto-Reconnect SDK',
  },
  // Dashboard Guide Section (Cara Menggunakan Dashboard)
  quickStart: {
    badge: 'WORKFLOW PADIBASE STUDIO',
    title1: 'Cara Menggunakan',
    title2: 'Dashboard PadiBase',
    desc: 'Kelola seluruh kebutuhan backend langsung dari antarmuka visual (http://127.0.0.1:8085/_padibase/) secara cepat tanpa perlu coding backend manual.',
    tabs: {
      tables: '1. Buat Tabel & Kolom',
      rules: '2. Atur Access Rules',
      storage: '3. Kelola Storage',
      realtime: '4. Pantau Realtime',
      sqlbuilder: '5. Visual SQL & Custom API',
    },
    workflows: {
      tables: {
        stepBadge: 'LANGKAH 1 — DATABASE & SKEMA',
        title: 'Membuat Tabel, Menentukan Kolom & Relasi Cerdas',
        desc: 'Buat tabel baru dengan tipe Base atau Auth, tambahkan berbagai field data, dan hubungkan foreign key antar-tabel secara otomatis bebas query N+1.',
        instructions: [
          'Buka sidebar kiri dan klik tombol "+ New Collection".',
          'Pilih tipe koleksi: Base Collection (data umum) atau Auth Collection (pengguna/akun).',
          'Tambahkan field sesuai kebutuhan: TEXT, NUMBER, BOOLEAN, JSON, FILE, atau RELATION.',
          'Untuk field RELATION, pilih target tabel relasi—PadiBase otomatis mengatur Foreign Key constraint (CASCADE / SET NULL).',
          'Klik "Save Changes" & "Sync DB Schema" untuk menerapkan struktur ke database fisik (SQLite, Postgres, atau MySQL).',
        ],
        tipTitle: 'Keunggulan Relasi PadiBase',
        tipDesc: 'Sistem eager loading 2-tingkat PadiBase menggunakan 1 query WHERE IN sehingga tidak menimbulkan masalah N+1 yang memperlambat database.',
      },
      rules: {
        stepBadge: 'LANGKAH 2 — KEAMANAN & RBAC',
        title: 'Mengatur Access Rules, Otorisasi & Proyeksi Kolom',
        desc: 'Tentukan izin akses per-endpoint (list, all, view, create, update, delete) dengan filter granular dan sembunyikan data sensitif di sisi server.',
        instructions: [
          'Pada tabel yang diinginkan, klik tombol "API & Access Rules".',
          'Pilih aturan untuk masing-masing aksi: List (paginasi), All (ekspor), View, Create, Update, Delete.',
          'Gunakan Preset Cepat: "Public" (buka untuk semua), "Auth" (@request.auth.id != ""), "Owner" (user_id = @request.auth.id), atau "Admin".',
          'Centang "Projected Fields" untuk memilih kolom yang boleh diakses klien. Kolom yang tidak dicentang tidak akan pernah bocor ke publik.',
          'Klik "Save Rules" untuk mengaktifkan proteksi endpoint REST secara instan.',
        ],
        tipTitle: 'Pemisahan list_rule vs all_rule',
        tipDesc: 'Anda bisa mengizinkan pengguna membaca daftar publik terpaginasi (/api/posts) sembari membatasi penarikan seluruh data (/api/posts/all) hanya untuk Admin.',
      },
      storage: {
        stepBadge: 'LANGKAH 3 — FILE & MEDIA',
        title: 'Mengelola Bucket, Upload File & Zero Orphan Cleanup',
        desc: 'Kelola file gambar, dokumen, dan video dengan explorer visual bergaya Supabase lengkap dengan preview Lightbox dan pembersihan file otomatis.',
        instructions: [
          'Pilih menu "Storage" di sidebar Studio atau gunakan field bertipe FILE pada tabel.',
          'Drag-and-drop file langsung ke area upload drawer atau Storage Explorer.',
          'Lihat preview file gambar langsung dengan Lightbox bawaan tanpa perlu keluar dari dashboard.',
          'Klik "Copy URL" untuk mendapatkan tautan publik langsung ke file media (/api/storage/:bucket/:file).',
          'PadiBase otomatis memverifikasi nama file, MIME type, dan menerapkan Content-Security-Policy sandbox.',
        ],
        tipTitle: 'Zero Orphaned Files',
        tipDesc: 'Ketika record dihapus atau file diperbarui lewat PATCH, file lama di disk fisik otomatis dihapus bersih oleh PadiBase sehingga penyimpanan tidak membengkak.',
      },
      realtime: {
        stepBadge: 'LANGKAH 4 — EVENT STREAMING',
        title: 'Memantau & Menghubungkan Realtime SSE Stream',
        desc: 'Streaming perubahan data (create, update, delete) secara real-time via Server-Sent Events tanpa perlu mengonfigurasi broker WebSocket tambahan.',
        instructions: [
          'Klik menu "Realtime Monitor" pada sidebar Studio (/_padibase/monitor).',
          'Status koneksi SSE akan langsung hijau "Connected" dengan indikator live pulse.',
          'Setiap kali ada data baru dibuat, diubah, atau dihapus, log event akan muncul detik itu juga di monitor.',
          'Gunakan PadiBase JS SDK pada frontend: padibase.collection("posts").subscribe((e) => { ... }) untuk auto-update UI.',
          'SDK memiliki fitur auto-reconnect cerdas saat koneksi internet klien terputus.',
        ],
        tipTitle: 'Performa Tinggi Async Rust',
        tipDesc: 'Realtime ditenagai oleh broadcast channel Tokio Axum yang mampu mendistribusikan puluhan ribu event per detik dengan konsumsi RAM yang sangat minim.',
      },
      sqlbuilder: {
        stepBadge: 'LANGKAH 5 — QUERY & API KUSTOM',
        title: 'Visual SQL Builder, Fungsi Agregasi & Custom API',
        desc: 'Rancang query relasional kompleks dan jadwalkan cron background jobs langsung dari dashboard tanpa harus menulis raw SQL manual.',
        instructions: [
          'Buka tab "SQL Builder" di dashboard PadiBase Studio.',
          'Pilih tabel utama, tambahkan tabel relasi (LEFT/INNER JOIN) dengan auto-detect foreign key.',
          'Pilih format keluaran: kolom datar atau objek bersarang (Nested JSON_OBJECT).',
          'Tambahkan fungsi agregat seperti COUNT, SUM, AVG, MIN, MAX, atau GROUP_CONCAT dengan filter HAVING.',
          'Simpan query menjadi endpoint REST kustom (/api/custom/*) atau buat tugas Cron berulang (/api/cron/jobs).',
        ],
        tipTitle: 'Output JSON Bersih',
        tipDesc: 'Query builder menghasilkan output JSON objek murni tanpa string ter-escape, siap dikonsumsi langsung oleh frontend Vue, React, atau mobile app.',
      },
    },
    actionBtn: 'Coba di Studio Preview',
  },
  // Learning Paths Section
  learning: {
    title: 'Panduan Penguasaan PadiBase Studio',
    subtitle: 'Jalur dokumentasi terstruktur mulai dari inisialisasi hingga deployment produksi',
    beginBtn: 'Buka Dokumentasi',
    paths: {
      basics: {
        t: 'Dasar & Ruang Kerja Studio',
        d: 'Buka Studio di browser, buat akun Superuser pertama, dan kelola tabel Base & Auth.',
        steps: [
          'Akses Dashboard Studio & Konfigurasi Multi-Database',
          'Wizard Superuser & Proteksi Admin Gateway',
          'Tabel Dinamis, Sinkronisasi Skema & Relasi 2-Tingkat',
          'Ekspor 1-Klik Postman Collection v2.1.0',
        ],
      },
      advanced: {
        t: 'Visual SQL, RBAC & Storage',
        d: 'Bangun query relasional kompleks, atur hak akses granular, dan kelola file media.',
        steps: [
          'Visual SQL Builder, JOIN & Nested JSON_OBJECT',
          'Access Rules (list vs all), RBAC & Proyeksi Kolom',
          'Supabase-Style File Storage & Pembersihan Otomatis',
          'Dynamic Custom API Endpoints & Cron Scheduler',
        ],
      },
      production: {
        t: 'Integrasi JS SDK & Produksi',
        d: 'Hubungkan aplikasi frontend dengan Auto Realtime SSE dan rilis ke server produksi.',
        steps: [
          'Official JS/TS SDK (Vue 3, React, Svelte)',
          'Langganan Realtime SSE & Reactive AuthStore',
          'Backup Database Atomik Online (VACUUM INTO) & Restore',
          'Keamanan Produksi, CORS & Reverse Proxy',
        ],
      },
    },
  },
  // CTA Section
  cta: {
    title1: 'Siap Menggunakan',
    title2: 'PadiBase Studio?',
    desc: 'Rasakan kemudahan visual ala PocketBase & Supabase yang dipadukan dengan performa andal multi-database.',
    installBtn: 'Pelajari Panduan Dashboard',
  },
}
