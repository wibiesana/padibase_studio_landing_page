<template>
  <q-page class="index-page overflow-hidden">
    <!-- Hero Section -->
    <section class="hero-section text-center flex flex-center reveal">
      <div class="container relative-position">
        <div class="column items-center">
          <!-- Top Badge -->
          <div class="hero-top-badge q-mb-lg flex items-center justify-center">
            <span class="pulse-dot q-mr-sm"></span>
            <span>{{ $t('hero.badge') }}</span>
          </div>

          <!-- Logo -->
          <div class="q-mb-md hero-logo-wrap">
            <q-img
              :src="studioLogo"
              width="118px"
              height="118px"
              fit="contain"
              alt="PadiBase Studio Logo"
            />
          </div>

          <!-- Title -->
          <h1
            class="text-h2 text-weight-bolder q-ma-none text-gradient text-uppercase tracking-tighter"
          >
            {{ $t('hero.title') }}
          </h1>

          <!-- Subtitle -->
          <div class="hero-subtitle-container q-mt-lg">
            <p
              class="text-h6 text-grey-3 text-weight-regular max-width-900 border-left-primary q-pl-lg text-left"
            >
              {{ $t('hero.subtitle') }}
            </p>
          </div>

          <!-- CTA Buttons -->
          <div class="q-mt-xl q-gutter-md flex justify-center">
            <q-btn
              color="primary"
              text-color="dark"
              size="lg"
              unelevated
              :label="$t('hero.getStarted')"
              icon="space_dashboard"
              @click="scrollTo('quickstart')"
              class="premium-btn shadow-24"
            />
            <q-btn
              outline
              color="primary"
              size="lg"
              :label="$t('hero.exploreStudio')"
              @click="scrollTo('studio-preview')"
              class="premium-btn-secondary"
              icon="dashboard_customize"
            />
            <q-btn
              outline
              color="white"
              size="lg"
              :label="$t('hero.documentation')"
              to="/docs"
              class="premium-btn-outline"
              icon="menu_book"
            />
          </div>

          <!-- Tech Stack Pills -->
          <div class="row justify-center q-gutter-sm q-mt-xl max-width-900">
            <div v-for="pill in techPills" :key="pill.label" class="tech-pill-badge">
              <q-icon :name="pill.icon" size="16px" :color="pill.color" class="q-mr-xs" />
              <span>{{ pill.label }}</span>
            </div>
          </div>

          <!-- SDK Quick Link -->
          <div
            class="q-mt-lg text-body2 text-grey-4 flex items-center justify-center cursor-pointer"
            @click="scrollTo('sdk')"
          >
            <q-icon name="bolt" color="warning" size="20px" class="q-mr-xs" />
            <span>{{ $t('hero.sdkBadge') }}</span>
            <span class="text-primary text-weight-bold q-ml-xs hover-underline">
              Explore SDK &rarr;
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= INTERACTIVE PADIBASE STUDIO WORKSPACE PREVIEW ================= -->
    <section id="studio-preview" class="q-py-xl container reveal">
      <div class="text-center q-mb-xl">
        <div class="text-overline text-primary letter-spacing-2 text-weight-bold">
          {{ $t('studioPreview.overline') }}
        </div>
        <h2 class="text-h3 text-weight-bolder text-white q-mt-xs q-mb-sm">
          {{ $t('studioPreview.title') }}
        </h2>
        <p class="text-body1 text-grey-4 max-width-800 q-mx-auto">
          {{ $t('studioPreview.subtitle') }}
        </p>
      </div>

      <!-- Studio Mockup Window -->
      <div class="studio-window shadow-24">
        <!-- Browser Top Bar -->
        <div class="studio-topbar flex items-center justify-between q-px-md q-py-sm">
          <div class="flex items-center q-gutter-x-xs">
            <div class="t-dot dot-red"></div>
            <div class="t-dot dot-yellow"></div>
            <div class="t-dot dot-green"></div>
            <div class="studio-url-bar q-ml-md font-mono text-caption">
              <q-icon name="lock" size="13px" color="primary" class="q-mr-xs" />
              <span class="text-grey-5">http://127.0.0.1:8085</span>
              <span class="text-primary text-weight-bold">/_padibase/{{ activeStudioTab }}</span>
            </div>
          </div>
          <div class="flex items-center q-gutter-x-sm">
            <span class="studio-engine-chip font-mono">
              <q-icon name="storage" size="13px" color="warning" class="q-mr-xs" />
              SQLITE · MYSQL · MARIADB · POSTGRES
            </span>
          </div>
        </div>

        <!-- Studio Body: Left Rail + Active Workspace -->
        <div class="row no-wrap studio-body">
          <!-- Left Navigation Rail -->
          <div class="col-12 col-md-3 studio-rail q-pa-md flex column justify-between">
            <div>
              <div class="flex items-center q-mb-md q-px-xs">
                <q-img :src="studioLogo" width="28px" height="28px" class="q-mr-sm" />
                <span class="text-weight-bolder text-white text-subtitle2">PadiBase</span>
                <span class="studio-pill-mini q-ml-xs">Studio</span>
              </div>

              <div class="q-gutter-y-xs">
                <button
                  v-for="tab in studioTabs"
                  :key="tab.id"
                  type="button"
                  class="studio-rail-btn full-width flex items-center justify-between"
                  :class="{ 'studio-rail-btn-active': activeStudioTab === tab.id }"
                  @click="activeStudioTab = tab.id"
                >
                  <div class="flex items-center">
                    <q-icon :name="tab.icon" size="18px" :color="tab.color" class="q-mr-sm" />
                    <span>{{ tab.label }}</span>
                  </div>
                  <span v-if="tab.badge" class="rail-mini-badge">{{ tab.badge }}</span>
                </button>
              </div>
            </div>

            <div class="studio-rail-footer q-pt-md q-mt-md">
              <div class="flex items-center justify-between text-caption font-mono q-mb-xs">
                <span class="text-grey-5">Binary Footprint:</span>
                <span class="text-primary text-weight-bold">Single Executable</span>
              </div>
              <div class="flex items-center justify-between text-caption font-mono">
                <span class="text-grey-5">Auth Hashing:</span>
                <span class="text-warning text-weight-bold">Argon2id + JWT</span>
              </div>
            </div>
          </div>

          <!-- Right Workspace Content -->
          <div class="col-12 col-md-9 studio-workspace q-pa-lg">
            <!-- TAB 1: TABLES & DATA -->
            <div v-if="activeStudioTab === 'tables'" class="anim-fade">
              <div class="row items-center justify-between q-mb-md">
                <div>
                  <div class="flex items-center q-gutter-x-sm">
                    <span class="text-h6 text-weight-bolder text-white font-mono">teachers</span>
                    <q-badge color="primary" text-color="dark" label="Base Collection" />
                    <q-badge outline color="warning" label="Auto-Load Relations: ON (Zero N+1)" />
                  </div>
                  <div class="text-caption text-grey-4 q-mt-xs">
                    Spreadsheet-like record management, live schema sync, and 2-level automatic
                    Foreign Key resolution.
                  </div>
                </div>
                <div class="flex q-gutter-xs">
                  <span class="studio-action-chip">
                    <q-icon name="sync" size="14px" class="q-mr-xs" />Sync DB Schema
                  </span>
                  <span class="studio-action-chip">
                    <q-icon name="download" size="14px" class="q-mr-xs" />Export Postman v2.1
                  </span>
                  <span class="studio-action-chip-primary">
                    <q-icon name="shield" size="14px" class="q-mr-xs" />API &amp; Access Rules
                  </span>
                </div>
              </div>

              <!-- Mock Data Table -->
              <div class="studio-table-wrap q-mb-md">
                <table class="studio-table full-width">
                  <thead>
                    <tr>
                      <th>id <span class="pk-tag">PK</span></th>
                      <th>name <span class="type-tag">TEXT</span></th>
                      <th>user_id <span class="fk-tag">FK &rarr; users.id</span></th>
                      <th>user (Auto-Loaded Relation)</th>
                      <th>avatar <span class="file-tag">FILE</span></th>
                      <th class="text-right">Safe Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="font-mono text-grey-4">1</td>
                      <td class="text-weight-bold text-white">Budi Santoso</td>
                      <td class="font-mono text-amber">5</td>
                      <td>
                        <span class="json-relation-pill font-mono">
                          { "id": 5, "name": "Budi S.", "role": "admin" }
                        </span>
                      </td>
                      <td>
                        <span class="file-preview-pill font-mono">
                          <q-icon name="image" size="13px" class="q-mr-xs" />f1a2b3_avatar.png
                        </span>
                      </td>
                      <td class="text-right">
                        <span class="safe-edit-btn">Edit Drawer</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="font-mono text-grey-4">2</td>
                      <td class="text-weight-bold text-white">Siti Aminah</td>
                      <td class="font-mono text-amber">8</td>
                      <td>
                        <span class="json-relation-pill font-mono">
                          { "id": 8, "name": "Siti A.", "role": "user" }
                        </span>
                      </td>
                      <td>
                        <span class="file-preview-pill font-mono">
                          <q-icon name="image" size="13px" class="q-mr-xs" />9c8d7e_photo.jpg
                        </span>
                      </td>
                      <td class="text-right">
                        <span class="safe-edit-btn">Edit Drawer</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-4">
                  <div class="studio-highlight-box">
                    <div class="text-weight-bold text-primary text-caption">
                      🔗 Smart Foreign Key Sync
                    </div>
                    <div class="text-caption text-grey-4 q-mt-xs">
                      Required relation fields automatically use <code>ON DELETE CASCADE</code>;
                      nullable fields use <code>ON DELETE SET NULL</code>.
                    </div>
                  </div>
                </div>
                <div class="col-12 col-sm-4">
                  <div class="studio-highlight-box">
                    <div class="text-weight-bold text-warning text-caption">
                      🛡️ Ergonomic Row Safety
                    </div>
                    <div class="text-caption text-grey-4 q-mt-xs">
                      Clicking table rows won't accidentally trigger edits—drawers open only via
                      explicit Edit buttons &amp; custom modals.
                    </div>
                  </div>
                </div>
                <div class="col-12 col-sm-4">
                  <div class="studio-highlight-box">
                    <div class="text-weight-bold text-info text-caption">
                      ⚡ Dual Route Standard
                    </div>
                    <div class="text-caption text-grey-4 q-mt-xs">
                      Supports clean <code>/api/:table</code>, <code>/api/:table/all</code>,
                      <code>/api/tables/:table</code>, and <code>/api/collections/:table</code>.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- TAB 2: VISUAL SQL BUILDER -->
            <div v-else-if="activeStudioTab === 'sqlbuilder'" class="anim-fade">
              <div class="row items-center justify-between q-mb-md">
                <div>
                  <div class="flex items-center q-gutter-x-sm">
                    <span class="text-h6 text-weight-bolder text-white">
                      Visual SQL Query Builder &amp; Aggregate Engine
                    </span>
                    <q-badge color="info" text-color="dark" label="Nested JSON_OBJECT" />
                  </div>
                  <div class="text-caption text-grey-4 q-mt-xs">
                    Design complex JOINs, aggregates, GROUP BY / HAVING, and multi-table atomic
                    transactions visually.
                  </div>
                </div>
                <span class="studio-action-chip-primary">
                  <q-icon name="auto_fix_high" size="14px" class="q-mr-xs" />⚡ Auto-Detect
                  Relations
                </span>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <div class="code-container q-pa-md full-height">
                    <div class="text-caption text-primary text-weight-bold q-mb-xs font-mono">
                      GENERATED NATIVE SQL (SQLite / MySQL / PostgreSQL)
                    </div>
                    <pre class="code-content q-ma-none"><code>SELECT DISTINCT
  p.id, p.title, p.status,
  JSON_OBJECT('id', u.id, 'username', u.username) AS user,
  COUNT(c.id) AS total_comments,
  COALESCE(SUM(p.views), 0) AS safe_views
FROM posts p
LEFT JOIN users u ON p.user_id = u.id
LEFT JOIN comments c ON c.post_id = p.id
WHERE p.status = :status
  AND p.user_id = @request.auth.id
GROUP BY p.id
HAVING total_comments >= 1
ORDER BY safe_views DESC</code></pre>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="code-container q-pa-md full-height">
                    <div class="text-caption text-warning text-weight-bold q-mb-xs font-mono">
                      AUTO-PARSED NATIVE JSON RESPONSE (NO ESCAPED STRINGS)
                    </div>
                    <pre class="code-content q-ma-none"><code>{
  "code": 200,
  "items": [
    {
      "id": 101,
      "title": "Scaling Rust with PadiBase",
      "status": "published",
      "user": {
        "id": 4,
        "username": "alina"
      },
      "total_comments": 18,
      "safe_views": 4250
    }
  ]
}</code></pre>
                  </div>
                </div>
              </div>

              <div class="row q-col-gutter-sm q-mt-sm">
                <div class="col-12 col-sm-4">
                  <div class="studio-highlight-box">
                    <div class="text-weight-bold text-primary text-caption">
                      📦 Nested Object vs Flat Columns
                    </div>
                    <div class="text-caption text-grey-4 q-mt-xs">
                      Toggle each JOIN between nested <code>JSON_OBJECT</code> or flat aliased
                      columns with custom key names.
                    </div>
                  </div>
                </div>
                <div class="col-12 col-sm-4">
                  <div class="studio-highlight-box">
                    <div class="text-weight-bold text-warning text-caption">
                      🧮 Complete Aggregate Suite
                    </div>
                    <div class="text-caption text-grey-4 q-mt-xs">
                      Built-in <code>COUNT(*)</code>, <code>COUNT(DISTINCT)</code>,
                      <code>SUM</code>, <code>COALESCE(SUM,0)</code>, <code>ROUND(AVG,2)</code>,
                      <code>MIN</code>, <code>MAX</code>, <code>GROUP_CONCAT</code>.
                    </div>
                  </div>
                </div>
                <div class="col-12 col-sm-4">
                  <div class="studio-highlight-box">
                    <div class="text-weight-bold text-info text-caption">
                      🔄 Atomic Multi-Table Transactions
                    </div>
                    <div class="text-caption text-grey-4 q-mt-xs">
                      Chain multiple table mutations inside <code>BEGIN ... COMMIT</code> with
                      automatic <code>:last_insert_id</code> binding.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- TAB 3: API & ACCESS RULES -->
            <div v-else-if="activeStudioTab === 'rules'" class="anim-fade">
              <div class="row items-center justify-between q-mb-md">
                <div>
                  <div class="text-h6 text-weight-bolder text-white">
                    Unified API Endpoints, Granular RBAC &amp; Field Projections
                  </div>
                  <div class="text-caption text-grey-4 q-mt-xs">
                    Configure independent access rules for paginated <code>list</code> vs
                    unpaginated <code>all</code>, role guards, and server-side column filtering.
                  </div>
                </div>
                <div class="flex q-gutter-xs">
                  <q-badge color="primary" text-color="dark" label="Preset: Auth" />
                  <q-badge outline color="positive" label="Preset: Public" />
                  <q-badge outline color="warning" label="Preset: Owner" />
                  <q-badge outline color="negative" label="Preset: Admin" />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-7">
                  <div class="studio-table-wrap">
                    <table class="studio-table full-width">
                      <thead>
                        <tr>
                          <th>Action / Endpoint</th>
                          <th>Access Rule Expression</th>
                          <th>Projected Fields</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="font-mono text-primary">GET /api/posts (list)</td>
                          <td><span class="rule-pill-public">public</span></td>
                          <td class="font-mono text-caption">id, title, slug, user</td>
                        </tr>
                        <tr>
                          <td class="font-mono text-warning">GET /api/posts/all (all)</td>
                          <td>
                            <span class="rule-pill-admin">@request.auth.role = 'admin'</span>
                          </td>
                          <td class="font-mono text-caption">All Authorized Columns</td>
                        </tr>
                        <tr>
                          <td class="font-mono text-info">POST /api/posts (create)</td>
                          <td><span class="rule-pill-auth">@request.auth.id != ""</span></td>
                          <td class="font-mono text-caption">Default Logged-In Guard</td>
                        </tr>
                        <tr>
                          <td class="font-mono text-negative">PATCH / DELETE /:id</td>
                          <td>
                            <span class="rule-pill-owner">user_id = @request.auth.id</span>
                          </td>
                          <td class="font-mono text-caption">Owner or Superadmin</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-12 col-md-5 column justify-between q-gutter-y-sm">
                  <div class="studio-highlight-box">
                    <div class="text-weight-bold text-primary text-caption">
                      🛡️ Server-Side Field Projections
                    </div>
                    <div class="text-caption text-grey-4 q-mt-xs">
                      Select exact columns per endpoint (<code>list</code>, <code>all</code>,
                      <code>view</code>). Unselected columns are never sent—even if requested via
                      <code>?fields=</code>.
                    </div>
                  </div>
                  <div class="studio-highlight-box">
                    <div class="text-weight-bold text-warning text-caption">
                      🎚️ 2-Level Endpoint Relations
                    </div>
                    <div class="text-caption text-grey-4 q-mt-xs">
                      Each endpoint can inherit table defaults, specify custom relations
                      (<code>user, chapter</code>), or disable eager loading for ultra-fast lists.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- TAB 4: SUPABASE-STYLE STORAGE EXPLORER -->
            <div v-else-if="activeStudioTab === 'storage'" class="anim-fade">
              <div class="row items-center justify-between q-mb-md">
                <div>
                  <div class="text-h6 text-weight-bolder text-white">
                    Supabase-Style Storage Explorer &amp; Zero Orphaned Files
                  </div>
                  <div class="text-caption text-grey-4 q-mt-xs">
                    Browse buckets, switch between Table &amp; Grid Cards, preview in Lightbox, and
                    rely on automatic disk cleanup.
                  </div>
                </div>
                <div class="flex q-gutter-xs">
                  <span class="studio-action-chip">Table View</span>
                  <span class="studio-action-chip-primary">Grid Cards View</span>
                </div>
              </div>

              <div class="row q-col-gutter-md q-mb-md">
                <div v-for="file in sampleFiles" :key="file.name" class="col-12 col-sm-4">
                  <div class="storage-card q-pa-md">
                    <div class="flex items-center justify-between q-mb-sm">
                      <q-icon :name="file.icon" size="28px" :color="file.color" />
                      <span class="text-caption font-mono text-grey-5">{{ file.size }}</span>
                    </div>
                    <div class="text-weight-bold text-white font-mono text-caption truncate">
                      {{ file.name }}
                    </div>
                    <div class="text-caption text-grey-5 q-mb-sm">
                      Bucket: <span class="text-primary font-mono">{{ file.bucket }}</span> · Record
                      <span class="font-mono">{{ file.record }}</span>
                    </div>
                    <div class="flex q-gutter-xs">
                      <span class="mini-storage-btn">👁️ Preview</span>
                      <span class="mini-storage-btn">🔗 Copy URL</span>
                      <span class="mini-storage-btn">⬇️ Download</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6">
                  <div class="studio-highlight-box">
                    <div class="text-weight-bold text-primary text-caption">
                      🧹 Zero Orphaned Files Lifecycle
                    </div>
                    <div class="text-caption text-grey-4 q-mt-xs">
                      Replacing a file via <code>PATCH</code> or deleting a record automatically
                      purges old physical files from <code>padi_data/storage/</code>.
                    </div>
                  </div>
                </div>
                <div class="col-12 col-sm-6">
                  <div class="studio-highlight-box">
                    <div class="text-weight-bold text-warning text-caption">
                      🔒 Directory Traversal &amp; XSS Sandbox Guard
                    </div>
                    <div class="text-caption text-grey-4 q-mt-xs">
                      Canonical path verification blocks <code>..</code> traversal; active files
                      (<code>.svg</code>, <code>.html</code>, <code>.js</code>) enforce
                      <code>Content-Security-Policy: sandbox</code>.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- TAB 5: CUSTOM API, CRON & BACKUPS -->
            <div v-else-if="activeStudioTab === 'endpoints'" class="anim-fade">
              <div class="row items-center justify-between q-mb-md">
                <div>
                  <div class="text-h6 text-weight-bolder text-white">
                    Dynamic Custom SQL Endpoints, Cron Scheduler &amp; Atomic Backups
                  </div>
                  <div class="text-caption text-grey-4 q-mt-xs">
                    Extend your backend without recompiling: custom routes, scheduled jobs, HTML
                    email templates, and online snapshots.
                  </div>
                </div>
                <q-badge color="warning" text-color="dark" label="/api/custom/* & /api/cron/jobs" />
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6">
                  <div class="studio-highlight-box full-height">
                    <div class="text-weight-bold text-primary text-subtitle2 q-mb-xs">
                      ⚡ Dynamic Custom SQL Endpoints
                    </div>
                    <div class="text-caption text-grey-4 q-mb-sm">
                      Save any parameterized SQL query or Visual Builder query as a live REST
                      endpoint (e.g. <code>GET /api/custom/v2/report/summary</code>) with custom
                      prefixes and access rules.
                    </div>
                    <div class="font-mono text-caption text-emerald-3 bg-dark-code q-pa-sm rounded">
                      POST /api/transactions &rarr; ACID Batch &amp; Rollback
                    </div>
                  </div>
                </div>
                <div class="col-12 col-sm-6">
                  <div class="studio-highlight-box full-height">
                    <div class="text-weight-bold text-warning text-subtitle2 q-mb-xs">
                      ⏱️ Background Cron Scheduler &amp; SMTP Mailer
                    </div>
                    <div class="text-caption text-grey-4 q-mb-sm">
                      Schedule recurring SQL cleanups or webhook triggers (<code>*/15 * * * *</code>,
                      <code>@daily</code>) and customize HTML Email Templates with live iframe
                      preview.
                    </div>
                    <div class="font-mono text-caption text-amber bg-dark-code q-pa-sm rounded">
                      POST /api/backups &rarr; Online WAL VACUUM INTO Snapshot
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- TAB 6: REALTIME MONITOR -->
            <div v-else-if="activeStudioTab === 'realtime'" class="anim-fade">
              <div class="row items-center justify-between q-mb-md">
                <div>
                  <div class="text-h6 text-weight-bolder text-white">
                    Realtime SSE Pulse &amp; Event Broadcaster (<code>/api/realtime</code>)
                  </div>
                  <div class="text-caption text-grey-4 q-mt-xs">
                    Powered by Tokio broadcast channels. Every record create, update, and delete
                    streams to connected clients instantaneously.
                  </div>
                </div>
                <span class="studio-action-chip-primary">
                  <span class="pulse-dot q-mr-xs"></span>SSE Connected
                </span>
              </div>

              <div class="code-container q-pa-md">
                <div class="font-mono text-caption text-grey-4 q-mb-xs">
                  LIVE EVENT STREAM LOG (/_padibase/monitor)
                </div>
                <div class="q-gutter-y-xs font-mono text-caption">
                  <div class="sse-log-line">
                    <span class="text-grey-5">[20:59:12.041]</span>
                    <span class="sse-badge-create q-mx-sm">CREATE</span>
                    <span class="text-primary">table: "posts"</span> &rarr;
                    <span class="text-grey-3"
                      >{ "id": "rec_901", "title": "Hello PadiBase Studio" }</span
                    >
                  </div>
                  <div class="sse-log-line">
                    <span class="text-grey-5">[20:59:14.812]</span>
                    <span class="sse-badge-update q-mx-sm">UPDATE</span>
                    <span class="text-primary">table: "posts"</span> &rarr;
                    <span class="text-grey-3">{ "id": "rec_901", "views": 120 }</span>
                  </div>
                  <div class="sse-log-line">
                    <span class="text-grey-5">[20:59:19.105]</span>
                    <span class="sse-badge-delete q-mx-sm">DELETE</span>
                    <span class="text-primary">table: "comments"</span> &rarr;
                    <span class="text-grey-3">{ "id": "cmt_44" }</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= PHILOSOPHY (P.A.D.I) SECTION ================= -->
    <section class="q-py-xl container relative-position z-top reveal delay-1">
      <div class="row q-col-gutter-xl items-center">
        <div class="col-12 col-md-5">
          <div class="text-h3 text-weight-bolder text-white q-mb-lg leading-tight">
            {{ $t('philosophy.title1') }}
            <span class="text-primary">{{ $t('philosophy.titleSpeed') }}</span
            >,<br />
            {{ $t('philosophy.title2') }}
            <span class="text-gradient">{{ $t('philosophy.titleIndustrial') }}</span
            >.
          </div>
          <p class="text-body1 text-grey-4 text-weight-light line-height-1-8">
            {{ $t('philosophy.desc') }}
          </p>
          <q-btn
            flat
            color="primary"
            :label="$t('philosophy.readBtn')"
            size="lg"
            rounded
            to="/docs"
            class="q-mt-md no-padding hover-translate-x"
          />
        </div>

        <div class="col-12 col-md-7">
          <div class="row q-col-gutter-lg justify-center">
            <div v-for="(item, index) in philosophyItems" :key="item.l" class="col-12 col-sm-6">
              <div
                class="glass-card philosophy-card q-pa-xl column justify-center transition-all"
                :class="{ 'mt-xl': index % 2 !== 0 }"
              >
                <div class="philosophy-watermark pointer-events-none">{{ item.l }}</div>
                <div class="relative-position z-top">
                  <div class="text-h6 text-weight-bold text-white q-mb-sm">{{ item.t }}</div>
                  <div class="text-body2 text-grey-4 leading-relaxed">{{ item.d }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= KEY ADVANTAGES OVER TRADITIONAL BaaS ================= -->
    <section class="q-py-xl container reveal">
      <div class="text-center q-mb-xl">
        <div class="text-overline text-primary letter-spacing-2 text-weight-bold">
          {{ $t('advantages.overline') }}
        </div>
        <h2 class="text-h3 text-weight-bolder text-white q-mt-xs q-mb-sm">
          {{ $t('advantages.title') }}
        </h2>
        <p class="text-body1 text-grey-4 max-width-800 q-mx-auto">
          {{ $t('advantages.subtitle') }}
        </p>
      </div>

      <div class="row q-col-gutter-lg">
        <div v-for="adv in advantageItems" :key="adv.title" class="col-12 col-md-6">
          <div class="advantage-card glass-card q-pa-xl full-height flex column justify-between">
            <div>
              <div class="flex items-center justify-between q-mb-md">
                <span class="adv-badge">{{ adv.badge }}</span>
                <q-icon :name="adv.icon" size="28px" color="primary" />
              </div>
              <div class="text-h5 text-weight-bolder text-white q-mb-sm">{{ adv.title }}</div>
              <p class="text-body2 text-grey-4 line-height-1-8 q-mb-none">{{ adv.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= 12 CORE FEATURES BENTO GRID ================= -->
    <section id="features" class="q-py-100 container reveal">
      <div class="text-center q-mb-100">
        <div class="text-overline text-primary letter-spacing-2 text-weight-bold">
          {{ $t('features.subtitle') }}
        </div>
        <h2 class="text-h3 text-weight-bolder text-white q-mt-xs">{{ $t('features.title') }}</h2>
        <div class="h-line-gradient q-mx-auto q-mt-md"></div>
      </div>

      <div class="row q-col-gutter-xl">
        <div
          v-for="(feature, idx) in features"
          :key="feature.title"
          class="col-12 col-sm-6 col-md-4"
        >
          <div
            class="feature-box glass-card q-pa-xl text-white full-height flex column"
            :class="'delay-' + ((idx % 4) + 1)"
          >
            <div class="feature-icon-wrapper q-mb-lg">
              <q-icon :name="feature.icon" size="42px" color="primary" />
            </div>
            <div class="text-h6 text-weight-bold q-mb-sm">{{ feature.title }}</div>
            <p class="text-body2 text-grey-4 flex-grow-1">
              {{ feature.description }}
            </p>
            <div class="q-mt-md">
              <q-chip
                outline
                color="primary"
                text-color="white"
                :label="feature.tag"
                size="sm"
                dense
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= OFFICIAL JAVASCRIPT / TYPESCRIPT SDK SECTION ================= -->
    <section id="sdk" class="q-py-100 bg-premium-dark relative-position reveal">
      <div class="container">
        <div class="row q-col-gutter-xl items-center">
          <div class="col-12 col-lg-5">
            <div class="text-overline text-primary letter-spacing-2 text-weight-bold q-mb-sm">
              {{ $t('sdk.overline') }}
            </div>
            <h2 class="text-h3 text-weight-bolder text-white q-mb-md leading-tight">
              {{ $t('sdk.title') }}
            </h2>
            <p class="text-body1 text-grey-4 q-mb-lg line-height-1-8">
              {{ $t('sdk.subtitle') }}
            </p>

            <div class="q-gutter-y-sm">
              <div
                v-for="tab in sdkTabs"
                :key="tab.id"
                class="sdk-tab-item cursor-pointer q-pa-md rounded-borders transition-all"
                :class="{ 'sdk-tab-active': activeSdkTab === tab.id }"
                @click="activeSdkTab = tab.id"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <q-icon :name="tab.icon" size="20px" color="primary" class="q-mr-md" />
                    <div>
                      <div class="text-subtitle1 text-weight-bold text-white">{{ tab.title }}</div>
                      <div class="text-caption text-grey-4">{{ tab.subtitle }}</div>
                    </div>
                  </div>
                  <q-icon name="chevron_right" color="grey-5" />
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-lg-7">
            <div class="terminal-window shadow-24">
              <div class="terminal-header flex items-center justify-between q-px-md">
                <div class="flex items-center q-gutter-x-xs">
                  <div class="t-dot dot-red"></div>
                  <div class="t-dot dot-yellow"></div>
                  <div class="t-dot dot-green"></div>
                  <span class="q-ml-md text-caption text-grey-4 font-mono">
                    {{ currentSdkSnippet.filename }}
                  </span>
                </div>
                <q-btn
                  flat
                  dense
                  size="sm"
                  color="primary"
                  icon="content_copy"
                  :label="$t('sdk.copyBtn')"
                  @click="copySdkCode"
                />
              </div>
              <div class="terminal-body q-pa-lg font-mono text-body2 overflow-auto">
                <pre class="q-ma-none text-grey-2" style="line-height: 1.65"><code>{{
                  currentSdkSnippet.code
                }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= DASHBOARD GUIDE SECTION (PANDUAN DASHBOARD) ================= -->
    <section id="quickstart" class="q-py-100 container reveal">
      <div class="text-center q-mb-xl">
        <div class="hero-top-badge q-mb-md inline-flex items-center justify-center">
          <span class="pulse-dot q-mr-sm"></span>
          <span>{{ $t('quickStart.badge') }}</span>
        </div>
        <h2 class="text-h3 text-weight-bolder text-white q-mt-xs q-mb-sm">
          {{ $t('quickStart.title1') }} <span class="text-gradient">{{ $t('quickStart.title2') }}</span>
        </h2>
        <p class="text-body1 text-grey-4 max-width-800 q-mx-auto">
          {{ $t('quickStart.desc') }}
        </p>

        <!-- Guide Step Tabs -->
        <div class="row justify-center q-gutter-sm q-mt-lg">
          <button
            v-for="step in guideSteps"
            :key="step.id"
            type="button"
            class="guide-nav-pill"
            :class="{ 'guide-nav-pill-active': activeGuideStep === step.id }"
            @click="activeGuideStep = step.id"
          >
            <q-icon :name="step.icon" size="18px" :color="step.color" class="q-mr-xs" />
            <span>{{ step.label }}</span>
          </button>
        </div>
      </div>

      <!-- Active Guide Step Content -->
      <div class="guide-card shadow-24 q-pa-xl reveal delay-1">
        <div class="row q-col-gutter-xl items-center">
          <!-- Left: Step-by-Step Instructions -->
          <div class="col-12 col-lg-6">
            <div class="text-overline text-primary letter-spacing-2 text-weight-bold q-mb-xs">
              {{ $t(`quickStart.workflows.${activeGuideStep}.stepBadge`) }}
            </div>
            <h3 class="text-h4 text-weight-bolder text-white q-mt-none q-mb-sm">
              {{ $t(`quickStart.workflows.${activeGuideStep}.title`) }}
            </h3>
            <p class="text-body1 text-grey-4 q-mb-lg line-height-1-8">
              {{ $t(`quickStart.workflows.${activeGuideStep}.desc`) }}
            </p>

            <!-- Instructions list -->
            <div class="q-gutter-y-md q-mb-xl">
              <div
                v-for="(inst, i) in getWorkflowInstructions(activeGuideStep)"
                :key="i"
                class="flex items-start"
              >
                <div class="guide-step-badge q-mr-md">{{ i + 1 }}</div>
                <div class="text-body2 text-grey-2 q-pt-xs leading-relaxed">{{ inst }}</div>
              </div>
            </div>

            <!-- Pro Tip Box -->
            <div class="guide-tip-box q-pa-md q-mb-lg">
              <div class="flex items-center text-warning text-weight-bold text-subtitle2 q-mb-xs">
                <q-icon name="tips_and_updates" size="20px" class="q-mr-xs" />
                <span>{{ $t(`quickStart.workflows.${activeGuideStep}.tipTitle`) }}</span>
              </div>
              <p class="text-caption text-grey-4 q-mb-none line-height-1-8">
                {{ $t(`quickStart.workflows.${activeGuideStep}.tipDesc`) }}
              </p>
            </div>

            <!-- Action Button: Open tab in Studio Preview -->
            <q-btn
              color="primary"
              text-color="dark"
              size="md"
              unelevated
              :label="$t('quickStart.actionBtn')"
              icon="open_in_new"
              @click="openInStudioPreview(activeGuideStep)"
              class="premium-btn shadow-12"
            />
          </div>

          <!-- Right: Interactive Visual Dashboard Mockup Card -->
          <div class="col-12 col-lg-6">
            <!-- TAB 1 MOCKUP: TABLES & SCHEMA -->
            <div v-if="activeGuideStep === 'tables'" class="guide-mockup-window shadow-24 anim-fade">
              <div class="guide-mockup-header flex items-center justify-between q-px-md q-py-sm">
                <div class="flex items-center q-gutter-x-xs">
                  <div class="t-dot dot-red"></div>
                  <div class="t-dot dot-yellow"></div>
                  <div class="t-dot dot-green"></div>
                  <span class="q-ml-sm text-caption text-grey-4 font-mono">Collection: <strong class="text-white">teachers</strong> (Base)</span>
                </div>
                <span class="guide-pill-badge bg-emerald-trans text-primary">Live Sync Ready</span>
              </div>
              <div class="guide-mockup-body q-pa-md">
                <div class="q-mb-sm text-caption text-grey-5 font-mono">FIELD DEFINITION &amp; SCHEMA:</div>
                <div class="guide-field-list q-gutter-y-xs font-mono text-caption q-mb-md">
                  <div class="guide-field-row flex items-center justify-between q-pa-xs">
                    <span class="text-white text-weight-bold">id</span>
                    <span class="type-tag">INTEGER PRIMARY KEY</span>
                  </div>
                  <div class="guide-field-row flex items-center justify-between q-pa-xs">
                    <span class="text-white text-weight-bold">name</span>
                    <span class="type-tag">TEXT · NOT NULL</span>
                  </div>
                  <div class="guide-field-row flex items-center justify-between q-pa-xs">
                    <span class="text-amber text-weight-bold">user_id</span>
                    <span class="fk-tag">RELATION &rarr; users.id (CASCADE)</span>
                  </div>
                  <div class="guide-field-row flex items-center justify-between q-pa-xs">
                    <span class="text-info text-weight-bold">avatar</span>
                    <span class="file-tag">FILE · max 5MB</span>
                  </div>
                </div>
                <div class="flex items-center justify-between q-pt-sm border-top-dark">
                  <span class="studio-action-chip">+ Add Field</span>
                  <div class="flex q-gutter-x-xs">
                    <span class="studio-action-chip-primary">⚡ Sync DB Schema</span>
                    <span class="studio-action-chip bg-primary text-dark text-weight-bold">Save Changes</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- TAB 2 MOCKUP: ACCESS RULES & RBAC -->
            <div v-else-if="activeGuideStep === 'rules'" class="guide-mockup-window shadow-24 anim-fade">
              <div class="guide-mockup-header flex items-center justify-between q-px-md q-py-sm">
                <div class="flex items-center q-gutter-x-xs">
                  <div class="t-dot dot-red"></div>
                  <div class="t-dot dot-yellow"></div>
                  <div class="t-dot dot-green"></div>
                  <span class="q-ml-sm text-caption text-grey-4 font-mono">Access Rules: <strong class="text-white">posts</strong></span>
                </div>
                <span class="guide-pill-badge bg-amber-trans text-warning">RBAC Filter</span>
              </div>
              <div class="guide-mockup-body q-pa-md">
                <div class="q-mb-sm text-caption text-grey-5 font-mono">ENDPOINT PERMISSION MATRIX:</div>
                <div class="q-gutter-y-xs font-mono text-caption q-mb-md">
                  <div class="guide-rule-row flex items-center justify-between q-pa-xs">
                    <span class="text-grey-3">list_rule (GET /api/posts)</span>
                    <span class="rule-pill-public">public</span>
                  </div>
                  <div class="guide-rule-row flex items-center justify-between q-pa-xs">
                    <span class="text-grey-3">all_rule (GET /api/posts/all)</span>
                    <span class="rule-pill-admin">@request.auth.role = 'admin'</span>
                  </div>
                  <div class="guide-rule-row flex items-center justify-between q-pa-xs">
                    <span class="text-grey-3">create_rule (POST /api/posts)</span>
                    <span class="rule-pill-auth">@request.auth.id != ""</span>
                  </div>
                  <div class="guide-rule-row flex items-center justify-between q-pa-xs">
                    <span class="text-grey-3">update / delete (PATCH / DEL)</span>
                    <span class="rule-pill-owner">user_id = @request.auth.id</span>
                  </div>
                </div>
                <div class="q-mt-md">
                  <div class="text-caption text-primary text-weight-bold q-mb-xs">🛡️ Server-Side Projected Columns (Whitelist):</div>
                  <div class="flex q-gutter-xs">
                    <span class="projection-chip projection-chip-active">✓ id</span>
                    <span class="projection-chip projection-chip-active">✓ title</span>
                    <span class="projection-chip projection-chip-active">✓ content</span>
                    <span class="projection-chip projection-chip-active">✓ author</span>
                    <span class="projection-chip projection-chip-hidden">🔒 password (hidden)</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- TAB 3 MOCKUP: STORAGE -->
            <div v-else-if="activeGuideStep === 'storage'" class="guide-mockup-window shadow-24 anim-fade">
              <div class="guide-mockup-header flex items-center justify-between q-px-md q-py-sm">
                <div class="flex items-center q-gutter-x-xs">
                  <div class="t-dot dot-red"></div>
                  <div class="t-dot dot-yellow"></div>
                  <div class="t-dot dot-green"></div>
                  <span class="q-ml-sm text-caption text-grey-4 font-mono">Bucket: <strong class="text-white">avatars</strong></span>
                </div>
                <span class="guide-pill-badge bg-emerald-trans text-primary">Zero Orphan ON</span>
              </div>
              <div class="guide-mockup-body q-pa-md">
                <div class="guide-dropzone q-pa-md text-center q-mb-md">
                  <q-icon name="cloud_upload" size="32px" color="primary" class="q-mb-xs" />
                  <div class="text-caption text-grey-3 text-weight-bold">Drag &amp; Drop file gambar atau dokumen ke sini</div>
                  <div class="text-caption text-grey-6 font-mono">PNG, JPG, PDF, WEBP maks 10MB</div>
                </div>
                <div class="q-gutter-y-xs font-mono text-caption">
                  <div class="guide-file-item flex items-center justify-between q-pa-xs">
                    <div class="flex items-center truncate">
                      <q-icon name="image" size="18px" color="primary" class="q-mr-xs" />
                      <span class="text-grey-3">f1a2b3_avatar_budi.png</span>
                    </div>
                    <div class="flex q-gutter-x-xs">
                      <span class="mini-btn-chip">👁️ Preview</span>
                      <span class="mini-btn-chip text-primary">🔗 Copy URL</span>
                    </div>
                  </div>
                  <div class="guide-file-item flex items-center justify-between q-pa-xs">
                    <div class="flex items-center truncate">
                      <q-icon name="description" size="18px" color="warning" class="q-mr-xs" />
                      <span class="text-grey-3">syalabus_rust_2026.pdf</span>
                    </div>
                    <div class="flex q-gutter-x-xs">
                      <span class="mini-btn-chip">👁️ Preview</span>
                      <span class="mini-btn-chip text-primary">🔗 Copy URL</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- TAB 4 MOCKUP: REALTIME -->
            <div v-else-if="activeGuideStep === 'realtime'" class="guide-mockup-window shadow-24 anim-fade">
              <div class="guide-mockup-header flex items-center justify-between q-px-md q-py-sm">
                <div class="flex items-center q-gutter-x-xs">
                  <div class="t-dot dot-red"></div>
                  <div class="t-dot dot-yellow"></div>
                  <div class="t-dot dot-green"></div>
                  <span class="q-ml-sm text-caption text-grey-4 font-mono">Live SSE: <strong class="text-white">/api/realtime</strong></span>
                </div>
                <span class="guide-pill-badge bg-emerald-trans text-primary">
                  <span class="pulse-dot q-mr-xs"></span> Connected
                </span>
              </div>
              <div class="guide-mockup-body q-pa-md">
                <div class="q-mb-sm text-caption text-grey-5 font-mono">LIVE SSE BROADCAST LOG:</div>
                <div class="q-gutter-y-xs font-mono text-caption q-mb-md">
                  <div class="sse-log-line">
                    <span class="sse-badge-create q-mr-xs">CREATE</span>
                    <span class="text-primary">posts</span> &rarr;
                    <span class="text-grey-3">{ "id": 42, "title": "PadiBase Tutorial" }</span>
                  </div>
                  <div class="sse-log-line">
                    <span class="sse-badge-update q-mr-xs">UPDATE</span>
                    <span class="text-warning">posts</span> &rarr;
                    <span class="text-grey-3">{ "id": 42, "views": 105 }</span>
                  </div>
                  <div class="sse-log-line">
                    <span class="sse-badge-delete q-mr-xs">DELETE</span>
                    <span class="text-negative">comments</span> &rarr;
                    <span class="text-grey-3">{ "id": 99 }</span>
                  </div>
                </div>
                <div class="code-container q-pa-sm">
                  <div class="text-caption text-grey-5 font-mono q-mb-xs">// Hubungkan ke Vue / React via SDK:</div>
                  <pre class="code-content q-ma-none text-caption font-mono"><code class="text-primary">pb.collection('posts').subscribe((e) => {
  console.log(e.action, e.record)
})</code></pre>
                </div>
              </div>
            </div>

            <!-- TAB 5 MOCKUP: VISUAL SQL & CUSTOM API -->
            <div v-else-if="activeGuideStep === 'sqlbuilder'" class="guide-mockup-window shadow-24 anim-fade">
              <div class="guide-mockup-header flex items-center justify-between q-px-md q-py-sm">
                <div class="flex items-center q-gutter-x-xs">
                  <div class="t-dot dot-red"></div>
                  <div class="t-dot dot-yellow"></div>
                  <div class="t-dot dot-green"></div>
                  <span class="q-ml-sm text-caption text-grey-4 font-mono">SQL Query: <strong class="text-white">posts_with_stats</strong></span>
                </div>
                <span class="guide-pill-badge bg-info-trans text-info">Nested JSON_OBJECT</span>
              </div>
              <div class="guide-mockup-body q-pa-md">
                <div class="q-mb-sm text-caption text-grey-5 font-mono">VISUAL RELATIONS &amp; AGGREGATE NODES:</div>
                <div class="q-gutter-y-xs font-mono text-caption q-mb-md">
                  <div class="guide-rule-row flex items-center justify-between q-pa-xs">
                    <span class="text-grey-3">Base Table</span>
                    <span class="text-primary text-weight-bold">posts</span>
                  </div>
                  <div class="guide-rule-row flex items-center justify-between q-pa-xs">
                    <span class="text-grey-3">Relation (JOIN)</span>
                    <span class="text-info">users (posts.user_id = users.id)</span>
                  </div>
                  <div class="guide-rule-row flex items-center justify-between q-pa-xs">
                    <span class="text-grey-3">Aggregates</span>
                    <span class="text-warning">COUNT(comments.id) AS total_comments</span>
                  </div>
                </div>
                <div class="flex items-center justify-between q-pt-sm border-top-dark">
                  <div class="font-mono text-caption text-grey-4">
                    Route: <span class="text-primary">GET /api/custom/posts_with_stats</span>
                  </div>
                  <span class="studio-action-chip-primary">Run &amp; Save API</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= LEARNING PATHS SECTION ================= -->
    <section id="docs" class="q-py-100 bg-premium reveal">
      <div class="container">
        <div class="text-center q-mb-100">
          <h2 class="text-h3 text-weight-bolder text-white">{{ $t('learning.title') }}</h2>
          <p class="text-h6 text-grey-4">
            {{ $t('learning.subtitle') }}
          </p>
        </div>

        <div class="row q-col-gutter-xl">
          <div v-for="(path, idx) in learningPaths" :key="path.title" class="col-12 col-md-4">
            <div
              class="path-card glass-card hover-glow flex column reveal"
              :class="'delay-' + (idx + 1)"
            >
              <div class="q-pa-xl flex-grow-1">
                <div class="flex items-center q-mb-xl">
                  <div class="path-icon-box q-mr-md">
                    <q-icon :name="path.icon" size="sm" color="primary" />
                  </div>
                  <div class="text-h6 text-weight-bold text-white">{{ path.title }}</div>
                </div>
                <p class="text-body2 text-grey-5 q-mb-xl line-height-1-8">{{ path.description }}</p>
                <q-list dark>
                  <q-item
                    v-for="(step, idx2) in path.steps"
                    :key="idx2"
                    dense
                    padding
                    class="q-px-none"
                  >
                    <q-item-section side><div class="step-bullet"></div></q-item-section>
                    <q-item-section>
                      <span class="text-grey-3 text-weight-medium">{{ step }}</span>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
              <div class="q-pa-lg border-top-light">
                <q-btn
                  flat
                  color="primary"
                  :label="$t('learning.beginBtn')"
                  icon-right="east"
                  @click="goToDocs(path.target)"
                  class="full-width"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= CTA FINALE ================= -->
    <section class="q-py-100 text-center relative-position overflow-hidden reveal">
      <div class="container relative-position">
        <h2 class="text-h2 text-weight-bolder text-white q-mb-lg leading-tight">
          {{ $t('cta.title1') }} <br /><span class="text-gradient">{{ $t('cta.title2') }}</span>
        </h2>
        <p class="text-h5 q-mb-xl text-grey-4 opacity-80 max-width-800 q-mx-auto">
          {{ $t('cta.desc') }}
        </p>
        <div class="q-gutter-md flex justify-center">
          <q-btn
            color="primary"
            text-color="dark"
            size="xl"
            unelevated
            :label="$t('cta.installBtn')"
            icon="rocket_launch"
            @click="scrollTo('quickstart')"
            class="premium-btn shadow-24"
          />
          <q-btn
            outline
            color="white"
            size="xl"
            :label="$t('hero.documentation')"
            to="/docs"
            icon="menu_book"
            class="premium-btn-outline"
          />
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar, useMeta } from 'quasar'
import { useI18n } from 'vue-i18n'
import studioLogo from 'assets/brand/padibase_logo.svg'

useMeta({
  title: 'PadiBase Studio - Multi-Database Rust BaaS & Embedded Admin Studio',
  meta: {
    description: {
      name: 'description',
      content:
        'PadiBase Studio is a modern Backend-as-a-Service (BaaS) in Rust inspired by PocketBase & Supabase. Supports SQLite, MySQL, MariaDB & PostgreSQL, Embedded Studio Dashboard (/_padibase/), Visual SQL Builder, 2-Level Auto-Load Relations, Granular RBAC, Supabase-style File Storage, Realtime SSE, and Official JS/TS SDK.',
    },
    keywords: {
      name: 'keywords',
      content:
        'padibase, padibase studio, rust baas, pocketbase rust, supabase alternative rust, multi database baas, visual sql builder, realtime sse, padibase js sdk',
    },
  },
})

const router = useRouter()
const $q = useQuasar()
const { t } = useI18n()

const activeStudioTab = ref('tables')
const activeSdkTab = ref('singleton')

const techPills = [
  { label: 'SQLite (WAL Mode)', icon: 'bolt', color: 'primary' },
  { label: 'PostgreSQL', icon: 'storage', color: 'info' },
  { label: 'MySQL & MariaDB', icon: 'dns', color: 'warning' },
  { label: 'Visual SQL Builder', icon: 'auto_fix_high', color: 'primary' },
  { label: '2-Level Relations (No N+1)', icon: 'account_tree', color: 'positive' },
  { label: 'Supabase-Style Storage', icon: 'folder_special', color: 'warning' },
  { label: 'Realtime SSE', icon: 'sensors', color: 'info' },
  { label: 'Argon2id + JWT RBAC', icon: 'verified_user', color: 'primary' },
]

const studioTabs = computed(() => [
  {
    id: 'tables',
    label: t('studioPreview.tabs.tables'),
    icon: 'table_chart',
    color: 'primary',
    badge: 'No N+1',
  },
  {
    id: 'sqlbuilder',
    label: t('studioPreview.tabs.sqlBuilder'),
    icon: 'auto_fix_high',
    color: 'info',
    badge: 'JSON_OBJECT',
  },
  {
    id: 'rules',
    label: t('studioPreview.tabs.accessRules'),
    icon: 'admin_panel_settings',
    color: 'warning',
    badge: 'list vs all',
  },
  {
    id: 'storage',
    label: t('studioPreview.tabs.storage'),
    icon: 'inventory_2',
    color: 'primary',
    badge: 'Buckets',
  },
  {
    id: 'endpoints',
    label: t('studioPreview.tabs.customApi'),
    icon: 'code',
    color: 'warning',
    badge: 'Cron + SQL',
  },
  {
    id: 'realtime',
    label: t('studioPreview.tabs.realtime'),
    icon: 'sensors',
    color: 'info',
    badge: 'SSE Live',
  },
])

const sampleFiles = [
  {
    name: 'f1a2b3c4_teacher_avatar.png',
    bucket: 'teachers',
    record: 'rec_001',
    size: '182.4 KB',
    icon: 'image',
    color: 'primary',
  },
  {
    name: '8d9e0f1a_syllabus_2026.pdf',
    bucket: 'courses',
    record: 'rec_042',
    size: '1.4 MB',
    icon: 'picture_as_pdf',
    color: 'warning',
  },
  {
    name: '3b4c5d6e_intro_lesson.mp4',
    bucket: 'chapters',
    record: 'rec_486',
    size: '14.8 MB',
    icon: 'movie',
    color: 'info',
  },
]

const sdkTabs = [
  {
    id: 'singleton',
    title: '1. Shared Singleton Setup (DRY)',
    subtitle: 'Zero dependencies · Single SSE stream & shared AuthStore across your app',
    icon: 'hub',
    filename: 'src/lib/padi.js',
    code: `// src/lib/padi.js (or src/lib/padi.ts)
import PadiBase from 'padibase';

// Single shared client instance for the entire application
export const padi = new PadiBase(
  import.meta.env?.VITE_PADIBASE_URL || 'http://127.0.0.1:8085'
);

export default padi;`,
  },
  {
    id: 'crud',
    title: '2. Table CRUD & Backend-Managed Relations',
    subtitle: 'Paginated getList(), unpaginated getFullList(), create, update & delete',
    icon: 'table_rows',
    filename: 'src/services/posts.js',
    code: `import { padi } from '@/lib/padi';

// 1. Paginated list (2-level relations & field projections resolved by backend!)
const pageResult = await padi.table('posts').getList(1, 20, {
  filter: 'status = "published"',
  sort: '-created'
});

// 2. Fetch all records without pagination (/api/posts/all)
const allPosts = await padi.table('posts').getFullList({ sort: '-created' });

// 3. Create, Update & Delete
const created = await padi.table('posts').create({ title: 'Built with PadiBase Studio' });
await padi.table('posts').update(created.id, { views: 100 });
await padi.table('posts').delete(created.id);`,
  },
  {
    id: 'realtime',
    title: '3. Auto Realtime Subscriptions (SSE)',
    subtitle: 'Auto-connects on first listener, exponential backoff & token refresh',
    icon: 'sensors',
    filename: 'src/components/LiveFeed.vue',
    code: `import { padi } from '@/lib/padi';

// Subscribe to create, update, and delete events on 'posts'
const unsubscribe = padi.table('posts').subscribe('*', (e) => {
  console.log('Action:', e.action); // "create" | "update" | "delete"
  console.log('Table:', e.table);   // "posts"
  console.log('Record:', e.record); // { id: "...", title: "...", user: {...} }
});

// Cleanup listener when component unmounts
// unsubscribe();`,
  },
  {
    id: 'auth',
    title: '4. Auth Flows & Multipart File Upload',
    subtitle: 'Argon2id login, registration, reactive AuthStore & 1-line file upload',
    icon: 'verified_user',
    filename: 'src/services/auth_and_files.js',
    code: `import { padi } from '@/lib/padi';

// 1. Sign in with Email or Username + Password
await padi.table('users').authWithPassword('admin@example.com', 'secret_password_123');
console.log('Active User:', padi.authStore.record);

// 2. Upload file directly with record creation or standalone
const formData = new FormData();
formData.append('name', 'Budi Santoso');
formData.append('avatar', fileInput.files[0]);
const teacher = await padi.table('teachers').create(formData);

// 3. Build safe public or token-authenticated file URL
const avatarUrl = padi.files.getUrl('teachers', teacher.id, teacher.avatar);`,
  },
  {
    id: 'directHttp',
    title: '5. Direct HTTP Methods & Custom SQL Endpoints',
    subtitle: 'Call /api/custom/*, /api/transactions, or any REST route with auto Bearer token',
    icon: 'http',
    filename: 'src/services/custom_api.js',
    code: `import { padi } from '@/lib/padi';

// Call Dynamic Custom SQL Endpoints created in PadiBase Studio
const summary = await padi.get('/api/custom/report/summary', {
  query: { year: 2026 }
});

// Execute multi-table Atomic Database Transaction (BEGIN ... COMMIT)
const txResult = await padi.post('/api/transactions', {
  operations: [
    { action: 'create', table: 'orders', data: { total: 250000 } },
    { action: 'create', table: 'order_items', data: { order_id: ':last_insert_id', qty: 2 } }
  ]
});`,
  },
]

const currentSdkSnippet = computed(
  () => sdkTabs.find((item) => item.id === activeSdkTab.value) || sdkTabs[0],
)

// Animation Logic: Intersection Observer
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active')
        }
      })
    },
    { threshold: 0.1 },
  )

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

const activeGuideStep = ref('tables')

const guideSteps = computed(() => [
  {
    id: 'tables',
    label: t('quickStart.tabs.tables'),
    icon: 'table_chart',
    color: 'primary',
  },
  {
    id: 'rules',
    label: t('quickStart.tabs.rules'),
    icon: 'admin_panel_settings',
    color: 'warning',
  },
  {
    id: 'storage',
    label: t('quickStart.tabs.storage'),
    icon: 'inventory_2',
    color: 'primary',
  },
  {
    id: 'realtime',
    label: t('quickStart.tabs.realtime'),
    icon: 'sensors',
    color: 'info',
  },
  {
    id: 'sqlbuilder',
    label: t('quickStart.tabs.sqlbuilder'),
    icon: 'auto_fix_high',
    color: 'warning',
  },
])

function getWorkflowInstructions(stepId) {
  const steps = [0, 1, 2, 3, 4]
  return steps
    .map((i) => t(`quickStart.workflows.${stepId}.instructions[${i}]`))
    .filter((txt) => txt && !txt.startsWith('quickStart.'))
}

function openInStudioPreview(stepId) {
  activeStudioTab.value = stepId
  scrollTo('studio-preview')
}

const philosophyItems = computed(() => [
  {
    l: 'P',
    t: t('philosophy.items.p.t'),
    d: t('philosophy.items.p.d'),
  },
  {
    l: 'A',
    t: t('philosophy.items.a.t'),
    d: t('philosophy.items.a.d'),
  },
  {
    l: 'D',
    t: t('philosophy.items.d.t'),
    d: t('philosophy.items.d.d'),
  },
  {
    l: 'I',
    t: t('philosophy.items.i.t'),
    d: t('philosophy.items.i.d'),
  },
])

const advantageItems = computed(() => [
  {
    badge: t('advantages.items.multiDb.badge'),
    title: t('advantages.items.multiDb.title'),
    desc: t('advantages.items.multiDb.desc'),
    icon: 'dns',
  },
  {
    badge: t('advantages.items.relations.badge'),
    title: t('advantages.items.relations.title'),
    desc: t('advantages.items.relations.desc'),
    icon: 'account_tree',
  },
  {
    badge: t('advantages.items.rules.badge'),
    title: t('advantages.items.rules.title'),
    desc: t('advantages.items.rules.desc'),
    icon: 'gpp_good',
  },
  {
    badge: t('advantages.items.visualSql.badge'),
    title: t('advantages.items.visualSql.title'),
    desc: t('advantages.items.visualSql.desc'),
    icon: 'auto_fix_high',
  },
])

const features = computed(() => [
  {
    title: t('features.items.multiDb.t'),
    description: t('features.items.multiDb.d'),
    tag: t('features.items.multiDb.tag'),
    icon: 'storage',
  },
  {
    title: t('features.items.studioUi.t'),
    description: t('features.items.studioUi.d'),
    tag: t('features.items.studioUi.tag'),
    icon: 'dashboard_customize',
  },
  {
    title: t('features.items.sqlBuilder.t'),
    description: t('features.items.sqlBuilder.d'),
    tag: t('features.items.sqlBuilder.tag'),
    icon: 'auto_fix_high',
  },
  {
    title: t('features.items.relations.t'),
    description: t('features.items.relations.d'),
    tag: t('features.items.relations.tag'),
    icon: 'account_tree',
  },
  {
    title: t('features.items.rbac.t'),
    description: t('features.items.rbac.d'),
    tag: t('features.items.rbac.tag'),
    icon: 'admin_panel_settings',
  },
  {
    title: t('features.items.projections.t'),
    description: t('features.items.projections.d'),
    tag: t('features.items.projections.tag'),
    icon: 'view_column',
  },
  {
    title: t('features.items.storage.t'),
    description: t('features.items.storage.d'),
    tag: t('features.items.storage.tag'),
    icon: 'folder_special',
  },
  {
    title: t('features.items.realtime.t'),
    description: t('features.items.realtime.d'),
    tag: t('features.items.realtime.tag'),
    icon: 'sensors',
  },
  {
    title: t('features.items.auth.t'),
    description: t('features.items.auth.d'),
    tag: t('features.items.auth.tag'),
    icon: 'verified_user',
  },
  {
    title: t('features.items.transactions.t'),
    description: t('features.items.transactions.d'),
    tag: t('features.items.transactions.tag'),
    icon: 'sync_lock',
  },
  {
    title: t('features.items.cron.t'),
    description: t('features.items.cron.d'),
    tag: t('features.items.cron.tag'),
    icon: 'schedule',
  },
  {
    title: t('features.items.exporter.t'),
    description: t('features.items.exporter.d'),
    tag: t('features.items.exporter.tag'),
    icon: 'integration_instructions',
  },
])

const learningPaths = computed(() => [
  {
    title: t('learning.paths.basics.t'),
    description: t('learning.paths.basics.d'),
    icon: 'rocket_launch',
    target: 'quick_start',
    steps: [
      t('learning.paths.basics.steps[0]'),
      t('learning.paths.basics.steps[1]'),
      t('learning.paths.basics.steps[2]'),
      t('learning.paths.basics.steps[3]'),
    ],
  },
  {
    title: t('learning.paths.advanced.t'),
    description: t('learning.paths.advanced.d'),
    icon: 'auto_fix_high',
    target: 'query_builder',
    steps: [
      t('learning.paths.advanced.steps[0]'),
      t('learning.paths.advanced.steps[1]'),
      t('learning.paths.advanced.steps[2]'),
      t('learning.paths.advanced.steps[3]'),
    ],
  },
  {
    title: t('learning.paths.production.t'),
    description: t('learning.paths.production.d'),
    icon: 'devices',
    target: 'frontend_integration',
    steps: [
      t('learning.paths.production.steps[0]'),
      t('learning.paths.production.steps[1]'),
      t('learning.paths.production.steps[2]'),
      t('learning.paths.production.steps[3]'),
    ],
  },
])

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    const yOffset = -86
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

function goToDocs(section) {
  router.push({ path: '/docs', query: { section } })
}

function copySdkCode() {
  navigator.clipboard.writeText(currentSdkSnippet.value.code).then(() => {
    $q.notify({
      message: 'SDK snippet copied to clipboard',
      color: 'primary',
      textColor: 'dark',
      position: 'top',
      timeout: 2000,
    })
  })
}
</script>

<style lang="scss" scoped>
/* Base Animations */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.reveal-active {
  opacity: 1;
  transform: translateY(0);
}

.anim-fade {
  animation: fadeIn 0.28s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.delay-1 {
  transition-delay: 0.08s;
}
.delay-2 {
  transition-delay: 0.16s;
}
.delay-3 {
  transition-delay: 0.24s;
}
.delay-4 {
  transition-delay: 0.32s;
}

.index-page {
  background: #0b0f17;
  color: white;
  min-height: 100vh;
}

.container {
  max-width: 1340px;
  margin: 0 auto;
  padding: 0 32px;

  @media (max-width: 599px) {
    padding: 0 16px;
  }
}

/* Hero Section */
.hero-section {
  min-height: 78vh;
  padding-top: 48px;
  padding-bottom: 48px;
  background: radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.13) 0%, transparent 65%);
}

.hero-top-badge {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.35);
  color: #6ee7b7;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 1.2px;
  padding: 6px 16px;
  border-radius: 999px;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 10px #10b981;
  display: inline-block;
}

.hero-logo-wrap {
  filter: drop-shadow(0 10px 28px rgba(16, 185, 129, 0.25));
}

.text-h2 {
  font-size: 3.7rem;
  line-height: 0.96;
  letter-spacing: -2.5px;

  @media (max-width: 599px) {
    font-size: 2.3rem !important;
    letter-spacing: -1px;
    line-height: 1.1;
  }
}

.max-width-900 {
  max-width: 900px;
}

.max-width-800 {
  max-width: 800px;
}

.border-left-primary {
  border-left: 4px solid #10b981;
}

.premium-btn {
  border-radius: 10px;
  font-weight: 800;
  padding: 12px 34px;
  transition: all 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    background-color: #34d399 !important;
  }
}

.premium-btn-secondary {
  border-radius: 10px;
  font-weight: 700;
  padding: 12px 28px;
  transition: all 0.2s ease;
  &:hover {
    background: rgba(16, 185, 129, 0.12);
    transform: translateY(-2px);
  }
}

.premium-btn-outline {
  border-radius: 10px;
  font-weight: 700;
  padding: 12px 28px;
}

.tech-pill-badge {
  display: inline-flex;
  align-items: center;
  background: #111827;
  border: 1px solid #1f2937;
  color: #e5e7eb;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 999px;
  transition: all 0.2s ease;
  &:hover {
    border-color: #10b981;
    transform: translateY(-1px);
  }
}

/* Interactive Studio Mockup Window */
.studio-window {
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 18px;
  overflow: hidden;
}

.studio-topbar {
  background: #090d16;
  border-bottom: 1px solid #1e293b;
}

.studio-url-bar {
  background: #111827;
  border: 1px solid #1f2937;
  padding: 4px 14px;
  border-radius: 8px;
}

.studio-engine-chip {
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.3);
  color: #fbbf24;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 6px;
}

.studio-rail {
  background: #090d16;
  border-right: 1px solid #1e293b;
}

.studio-pill-mini {
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(16, 185, 129, 0.18);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.35);
}

.studio-rail-btn {
  background: transparent;
  border: 1px solid transparent;
  color: #94a3b8;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.18s ease;
  text-align: left;

  &:hover {
    background: #111827;
    color: #ffffff;
  }
}

.studio-rail-btn-active {
  background: rgba(16, 185, 129, 0.16) !important;
  border-color: rgba(16, 185, 129, 0.4) !important;
  color: #ffffff !important;
  font-weight: 700;
}

.rail-mini-badge {
  font-size: 0.65rem;
  font-family: 'JetBrains Mono', monospace;
  padding: 1px 6px;
  border-radius: 4px;
  background: #1e293b;
  color: #cbd5e1;
}

.studio-rail-footer {
  border-top: 1px solid #1e293b;
}

.studio-workspace {
  background: #0f172a;
  min-height: 410px;
}

.studio-action-chip {
  background: #1e293b;
  border: 1px solid #334155;
  color: #e2e8f0;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 5px 11px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
}

.studio-action-chip-primary {
  background: rgba(16, 185, 129, 0.18);
  border: 1px solid rgba(16, 185, 129, 0.45);
  color: #34d399;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
}

.studio-table-wrap {
  background: #090d16;
  border: 1px solid #1e293b;
  border-radius: 12px;
  overflow-x: auto;
}

.studio-table {
  border-collapse: collapse;
  font-size: 0.8rem;

  th {
    text-align: left;
    padding: 10px 14px;
    background: #111827;
    color: #94a3b8;
    font-weight: 700;
    border-bottom: 1px solid #1e293b;
  }

  td {
    padding: 11px 14px;
    border-bottom: 1px solid rgba(30, 41, 59, 0.7);
  }
}

.pk-tag,
.type-tag,
.fk-tag,
.file-tag {
  font-size: 0.65rem;
  font-family: 'JetBrains Mono', monospace;
  padding: 1px 5px;
  border-radius: 4px;
  margin-left: 4px;
}

.pk-tag {
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
}

.type-tag {
  background: #1e293b;
  color: #94a3b8;
}

.fk-tag {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
}

.file-tag {
  background: rgba(20, 184, 166, 0.15);
  color: #2dd4bf;
}

.json-relation-pill {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #6ee7b7;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 0.74rem;
}

.file-preview-pill {
  background: #1e293b;
  color: #cbd5e1;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 0.74rem;
  display: inline-flex;
  align-items: center;
}

.safe-edit-btn {
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.4);
  color: #fbbf24;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 0.74rem;
  font-weight: 700;
}

.studio-highlight-box {
  background: #090d16;
  border: 1px solid #1e293b;
  border-radius: 12px;
  padding: 14px;
}

.rule-pill-public {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  padding: 2px 8px;
  border-radius: 5px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
}

.rule-pill-admin {
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
  padding: 2px 8px;
  border-radius: 5px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
}

.rule-pill-auth {
  background: rgba(20, 184, 166, 0.15);
  color: #2dd4bf;
  padding: 2px 8px;
  border-radius: 5px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
}

.rule-pill-owner {
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
  padding: 2px 8px;
  border-radius: 5px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
}

.storage-card {
  background: #090d16;
  border: 1px solid #1e293b;
  border-radius: 12px;
}

.mini-storage-btn {
  background: #1e293b;
  color: #e2e8f0;
  font-size: 0.7rem;
  padding: 3px 8px;
  border-radius: 5px;
}

.bg-dark-code {
  background: #05080f;
  border: 1px solid #1e293b;
}

.sse-log-line {
  padding: 6px 10px;
  background: #111827;
  border-radius: 6px;
  border-left: 3px solid #10b981;
}

.sse-badge-create {
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.sse-badge-update {
  background: rgba(245, 158, 11, 0.2);
  color: #fbbf24;
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.sse-badge-delete {
  background: rgba(239, 68, 68, 0.2);
  color: #f87171;
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 700;
}

/* Advantage Cards */
.advantage-card {
  border-radius: 20px;
  border: 1px solid #1f2937;
  transition: all 0.25s ease;
  &:hover {
    border-color: #10b981;
    transform: translateY(-4px);
  }
}

.adv-badge {
  background: rgba(16, 185, 129, 0.14);
  border: 1px solid rgba(16, 185, 129, 0.35);
  color: #34d399;
  font-size: 0.74rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  padding: 4px 12px;
  border-radius: 999px;
}

/* SDK Tabs */
.sdk-tab-item {
  background: #111827;
  border: 1px solid #1f2937;
  &:hover {
    border-color: rgba(16, 185, 129, 0.5);
  }
}

.sdk-tab-active {
  background: rgba(16, 185, 129, 0.12) !important;
  border-color: #10b981 !important;
  border-left: 4px solid #10b981 !important;
}

.code-container {
  background: #090d16;
  border: 1px solid #1e293b;
  border-radius: 12px;
  overflow: hidden;
}

.code-content {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.78rem;
  line-height: 1.55;
  color: #e5e7eb;
  overflow-x: auto;
}

.h-line-gradient {
  height: 3px;
  width: 100px;
  background: linear-gradient(90deg, #10b981, #fbbf24);
  border-radius: 999px;
}

/* Philosophy Cards */
.philosophy-card {
  height: 100%;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  border: 1px solid #1f2937;
  transition: all 0.3s ease;
  &:hover {
    border-color: #10b981;
    transform: translateY(-5px);
    .philosophy-watermark {
      opacity: 0.35;
      transform: scale(1.05);
    }
  }
}

.philosophy-watermark {
  position: absolute;
  top: 5px;
  left: 15px;
  font-size: 130px;
  font-weight: 900;
  color: #10b981;
  opacity: 0.18;
  transition: all 0.3s ease;
  z-index: 0;
  user-select: none;
}

/* Feature Boxes */
.feature-box {
  border-radius: 22px;
  border: 1px solid #1f2937;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  .feature-icon-wrapper {
    width: 60px;
    height: 60px;
    border-radius: 16px;
    background: rgba(16, 185, 129, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }
  &:hover {
    background: rgba(16, 185, 129, 0.05);
    border-color: #10b981;
    transform: translateY(-6px);
    .feature-icon-wrapper {
      background: #10b981;
      :deep(.q-icon) {
        color: #0b0f17 !important;
      }
    }
  }
}

.bg-premium-dark {
  background: #080b11;
  border-top: 1px solid #1f2937;
  border-bottom: 1px solid #1f2937;
}

/* Terminal Styling */
.terminal-window {
  background: #090d16;
  border-radius: 16px;
  border: 1px solid #1e293b;
  overflow: hidden;
}

.terminal-header {
  height: 44px;
  background: #111827;
  border-bottom: 1px solid #1e293b;
}

.t-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.dot-red {
  background: #ff5f56;
}
.dot-yellow {
  background: #ffbd2e;
}
.dot-green {
  background: #27c93f;
}

.t-line {
  line-height: 1.8;
}
.t-prompt {
  color: #10b981;
  margin-right: 10px;
}
.t-cmd {
  color: #34d399;
  font-weight: bold;
}
.t-arg {
  color: #fbbf24;
}
.t-dim {
  color: #64748b;
}

/* Learning Cards */
.path-card {
  border-radius: 22px;
  height: 100%;
  border: 1px solid #1f2937;
  transition: all 0.3s ease;
  &:hover {
    border-color: #10b981;
    transform: translateY(-6px);
  }
}

.path-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(16, 185, 129, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-bullet {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
}

.step-num {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid #10b981;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  flex-shrink: 0;
}

.q-py-100 {
  padding-top: 90px;
  padding-bottom: 90px;

  @media (max-width: 599px) {
    padding-top: 50px;
    padding-bottom: 50px;
  }
}

.q-mb-100 {
  margin-bottom: 70px;

  @media (max-width: 599px) {
    margin-bottom: 36px;
  }
}

.mt-xl {
  margin-top: 36px;
  @media (max-width: 599px) {
    margin-top: 0;
  }
}

.leading-tight {
  line-height: 1.15;
}
.line-height-1-8 {
  line-height: 1.8;
}
.letter-spacing-2 {
  letter-spacing: 2px;
}
.border-top-light {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}
.hover-translate-x:hover {
  transform: translateX(8px);
}

/* Guide Section & Interactive Workflow Mockups */
.guide-nav-pill {
  background: rgba(17, 24, 39, 0.7);
  border: 1px solid #1f2937;
  color: #94a3b8;
  padding: 8px 18px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.88rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  transition: all 0.25s ease;

  &:hover {
    border-color: #10b981;
    color: #f1f5f9;
    background: rgba(16, 185, 129, 0.08);
  }
}

.guide-nav-pill-active {
  background: rgba(16, 185, 129, 0.15) !important;
  border-color: #10b981 !important;
  color: #10b981 !important;
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.25);
}

.guide-card {
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(11, 15, 25, 0.85);
  backdrop-filter: blur(16px);
}

.guide-step-badge {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.15);
  border: 1.5px solid #10b981;
  color: #10b981;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.guide-tip-box {
  background: rgba(245, 158, 11, 0.07);
  border-left: 3px solid #f59e0b;
  border-radius: 8px;
}

.guide-mockup-window {
  background: #090d16;
  border-radius: 16px;
  border: 1px solid #1e293b;
  overflow: hidden;
}

.guide-mockup-header {
  height: 44px;
  background: #111827;
  border-bottom: 1px solid #1e293b;
}

.guide-pill-badge {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
}

.bg-emerald-trans {
  background: rgba(16, 185, 129, 0.15);
}
.bg-amber-trans {
  background: rgba(245, 158, 11, 0.15);
}
.bg-info-trans {
  background: rgba(56, 189, 248, 0.15);
}

.guide-field-row,
.guide-rule-row,
.guide-file-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  padding: 8px 6px;
  transition: background 0.2s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }
}

.border-top-dark {
  border-top: 1px solid #1e293b;
}

.projection-chip {
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-family: monospace;
}
.projection-chip-active {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}
.projection-chip-hidden {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.25);
  text-decoration: line-through;
}

.guide-dropzone {
  border: 1.5px dashed #334155;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.4);
  transition: border-color 0.2s ease;
  &:hover {
    border-color: #10b981;
  }
}

.mini-btn-chip {
  padding: 2px 7px;
  font-size: 0.7rem;
  border-radius: 4px;
  background: #1e293b;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: #334155;
    color: #f8fafc;
  }
}
</style>
