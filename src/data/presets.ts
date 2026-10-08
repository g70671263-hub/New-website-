import { CareerPreset } from '../types';

export const CAREER_PRESETS: CareerPreset[] = [
  {
    id: 'android',
    label: 'Android & Mobile Dev',
    badge: 'Mobile Native',
    description: 'Kotlin, Jetpack Compose, Coroutines, Android Architecture, Room DB & Gradle',
    skills: [
      { id: '1', name: 'Kotlin', category: 'Language', current: 85, target: 95, notes: 'Mastering coroutines & context receivers' },
      { id: '2', name: 'Jetpack Compose', category: 'Framework', current: 75, target: 90, notes: 'Declarative UI, custom animations' },
      { id: '3', name: 'Java & OOP', category: 'Language', current: 70, target: 80, notes: 'Legacy codebase maintenance & JVM internals' },
      { id: '4', name: 'Architecture (MVVM/MVI)', category: 'Architecture', current: 80, target: 90, notes: 'Clean architecture, ViewModel, state flow' },
      { id: '5', name: 'Coroutines & Flow', category: 'Architecture', current: 65, target: 85, notes: 'Channels, exception handling, reactive streams' },
      { id: '6', name: 'Room & SQLite', category: 'Tooling', current: 70, target: 85, notes: 'Migrations, DAO, caching strategies' },
      { id: '7', name: 'Retrofit & REST', category: 'Tooling', current: 85, target: 90, notes: 'OkHttp interceptors, serialization' },
      { id: '8', name: 'Git & Gradle Build', category: 'Tooling', current: 60, target: 75, notes: 'Gradle Kotlin DSL, ProGuard / R8' },
    ]
  },
  {
    id: 'fullstack',
    label: 'Full-Stack Web Dev',
    badge: 'Web & API',
    description: 'TypeScript, React, Node.js, Next.js, PostgreSQL, Docker & System Design',
    skills: [
      { id: '101', name: 'TypeScript & JS', category: 'Language', current: 85, target: 95, notes: 'Advanced typing, async pipelines' },
      { id: '102', name: 'React & Next.js', category: 'Framework', current: 80, target: 90, notes: 'Server components, state management' },
      { id: '103', name: 'Node.js & Express', category: 'Framework', current: 75, target: 85, notes: 'REST API, middleware, auth' },
      { id: '104', name: 'HTML5 & CSS3', category: 'Language', current: 90, target: 95, notes: 'Responsive layouts, animations, accessibility' },
      { id: '105', name: 'PostgreSQL & DB', category: 'Architecture', current: 65, target: 80, notes: 'Indexing, relational schemas, ORMs' },
      { id: '106', name: 'System Design', category: 'Architecture', current: 60, target: 80, notes: 'Caching, horizontal scaling, queues' },
      { id: '107', name: 'Docker & Git', category: 'Tooling', current: 70, target: 85, notes: 'Containerization, branch workflows' },
      { id: '108', name: 'Code Review & Team', category: 'SoftSkill', current: 75, target: 90, notes: 'Mentoring, constructive feedback' },
    ]
  },
  {
    id: 'data_ai',
    label: 'AI & Data Science',
    badge: 'Machine Learning',
    description: 'Python, PyTorch, Pandas, SQL, Machine Learning & Model Deployment',
    skills: [
      { id: '201', name: 'Python', category: 'Language', current: 85, target: 95, notes: 'OOP, generators, vectorization' },
      { id: '202', name: 'Pandas & NumPy', category: 'Framework', current: 80, target: 90, notes: 'Data wrangling, matrix ops' },
      { id: '203', name: 'SQL & Warehousing', category: 'Language', current: 70, target: 85, notes: 'Complex joins, window functions' },
      { id: '204', name: 'Machine Learning', category: 'Architecture', current: 65, target: 85, notes: 'Scikit-Learn, regression, trees' },
      { id: '205', name: 'Deep Learning', category: 'Architecture', current: 55, target: 80, notes: 'PyTorch, neural network training' },
      { id: '206', name: 'Data Visualization', category: 'Tooling', current: 75, target: 85, notes: 'Matplotlib, Seaborn, dashboards' },
      { id: '207', name: 'Model Deployment', category: 'Tooling', current: 50, target: 75, notes: 'FastAPI, Docker inference endpoints' },
    ]
  },
  {
    id: 'devops',
    label: 'Cloud & DevOps',
    badge: 'Infra & CI/CD',
    description: 'Linux, Kubernetes, Docker, Terraform, AWS/GCP & Observability',
    skills: [
      { id: '301', name: 'Linux Admin', category: 'Architecture', current: 80, target: 90, notes: 'Shell scripting, systemd, networking' },
      { id: '302', name: 'Docker Containers', category: 'Tooling', current: 85, target: 95, notes: 'Multi-stage builds, rootless security' },
      { id: '303', name: 'Kubernetes (K8s)', category: 'Tooling', current: 60, target: 85, notes: 'Pods, services, ingress, Helm charts' },
      { id: '304', name: 'Cloud (AWS / GCP)', category: 'Architecture', current: 70, target: 85, notes: 'IAM, VPC, managed DBs, S3' },
      { id: '305', name: 'CI/CD Pipelines', category: 'Tooling', current: 75, target: 90, notes: 'GitHub Actions, automated tests' },
      { id: '306', name: 'Terraform & IaC', category: 'Tooling', current: 55, target: 80, notes: 'Modular declarative infrastructure' },
      { id: '307', name: 'Observability & Logs', category: 'Tooling', current: 65, target: 80, notes: 'Prometheus, Grafana, alerting' },
    ]
  },
  {
    id: 'design',
    label: 'Product & UI/UX Design',
    badge: 'Design & Interaction',
    description: 'Figma, Design Systems, User Research, Prototyping, Accessibility & Micro-interactions',
    skills: [
      { id: '401', name: 'Figma & Components', category: 'Tooling', current: 90, target: 95, notes: 'Auto-layout, variants, design tokens' },
      { id: '402', name: 'Design Systems', category: 'Architecture', current: 75, target: 90, notes: 'Scalable typography scales, tokenization' },
      { id: '403', name: 'User Research', category: 'Architecture', current: 70, target: 85, notes: 'Usability interviews, card sorting' },
      { id: '404', name: 'Micro-interactions', category: 'Framework', current: 65, target: 80, notes: 'Motion timing, state transitions' },
      { id: '405', name: 'Accessibility (WCAG)', category: 'Architecture', current: 70, target: 90, notes: 'Color contrast, screen-reader semantics' },
      { id: '406', name: 'Frontend Empathy (HTML/CSS)', category: 'Language', current: 80, target: 85, notes: 'Flexbox, CSS grid, dev handoff' },
    ]
  },
  {
    id: 'cyber',
    label: 'Cybersecurity Analyst',
    badge: 'SecOps & Defense',
    description: 'Network Security, Ethical Hacking, SIEM, Threat Modeling & Cryptography',
    skills: [
      { id: '501', name: 'Network Protocols', category: 'Architecture', current: 80, target: 90, notes: 'TCP/IP, Wireshark, DNS, TLS handshake' },
      { id: '502', name: 'Linux & Bash Scripting', category: 'Language', current: 75, target: 85, notes: 'Log parsing, cron, security auditing' },
      { id: '503', name: 'Vulnerability Analysis', category: 'Tooling', current: 65, target: 85, notes: 'Nmap, Nessus, OWASP Top 10' },
      { id: '504', name: 'Cryptography Basics', category: 'Architecture', current: 60, target: 80, notes: 'Symmetric/Asymmetric, hashing, PKI' },
      { id: '505', name: 'SIEM & Log Monitoring', category: 'Tooling', current: 70, target: 85, notes: 'Splunk, Elastic, alert triage' },
      { id: '506', name: 'Security Policies & NIST', category: 'SoftSkill', current: 65, target: 80, notes: 'Compliance frameworks, incident response' },
    ]
  }
];

export const SPCK_FILE_TEMPLATES = {
  'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="theme-color" content="#0f172a">
  <title>SkillRadar - Spck Mobile Edition</title>
  <link rel="stylesheet" href="style.css">
  <link rel="manifest" href="manifest.json">
</head>
<body>
  <div class="app-container">
    <header class="app-header">
      <div class="header-brand">
        <div class="radar-icon-badge">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a10 10 0 0 1 10 10"></path>
            <circle cx="12" cy="12" r="6"></circle>
            <circle cx="12" cy="12" r="2"></circle>
          </svg>
        </div>
        <div>
          <h1 class="brand-title">SkillRadar</h1>
          <p class="brand-subtitle">Spck Mobile Edition</p>
        </div>
      </div>
      <div class="header-actions">
        <button id="themeToggleBtn" class="icon-btn" title="Toggle Theme">🌙</button>
        <button id="addSkillModalBtn" class="primary-btn">+ Add Skill</button>
      </div>
    </header>

    <main class="main-content">
      <!-- Toolbar & Preset Selection -->
      <section class="toolbar-section">
        <div class="preset-selector-group">
          <label for="profilePresetSelect" class="input-label">Preset:</label>
          <select id="profilePresetSelect" class="custom-select">
            <option value="android">📱 Android & Mobile Dev</option>
            <option value="fullstack">🌐 Full-Stack Web Dev</option>
            <option value="data_ai">🧠 AI & Data Science</option>
            <option value="devops">☁️ Cloud & DevOps</option>
            <option value="custom">✨ Custom User Profile</option>
          </select>
        </div>

        <div class="view-toggles">
          <button id="toggleTargetBtn" class="toggle-pill active">
            <span class="legend-dot target-dot"></span> Target Goals
          </button>
          <button id="toggleValuesBtn" class="toggle-pill active">
            Labels & %
          </button>
        </div>
      </section>

      <!-- Radar Canvas -->
      <section class="radar-card">
        <div class="stats-banner">
          <div class="stat-item">
            <span class="stat-number" id="avgCurrentScore">0%</span>
            <span class="stat-desc">Current Avg</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number stat-target" id="avgTargetScore">0%</span>
            <span class="stat-desc">Target Avg</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number stat-gap" id="totalGapScore">0%</span>
            <span class="stat-desc">Skill Gap</span>
          </div>
        </div>

        <div class="canvas-wrapper">
          <canvas id="radarCanvas" width="440" height="440"></canvas>
          <div id="chartTooltip" class="chart-tooltip"></div>
        </div>

        <div class="chart-legend">
          <div class="legend-item">
            <span class="legend-color-box current-color"></span>
            <span>Current Proficiency</span>
          </div>
          <div class="legend-item">
            <span class="legend-color-box target-color"></span>
            <span>Target Goal</span>
          </div>
        </div>
      </section>

      <!-- Category Filter Tabs -->
      <section class="filter-section">
        <div class="category-tabs" id="categoryTabs">
          <button class="cat-tab active" data-category="all">All Skills (<span id="countAll">0</span>)</button>
          <button class="cat-tab" data-category="Language">Languages</button>
          <button class="cat-tab" data-category="Framework">Frameworks</button>
          <button class="cat-tab" data-category="Architecture">Architecture</button>
          <button class="cat-tab" data-category="Tooling">Tooling</button>
          <button class="cat-tab" data-category="SoftSkill">Soft Skills</button>
        </div>
      </section>

      <!-- Competency List with Real-time Sliders -->
      <section class="skills-section">
        <div class="section-title-bar">
          <h2 class="section-heading">Manage Competencies</h2>
          <span class="section-hint">Drag sliders to adjust in real-time</span>
        </div>
        <div id="skillsList" class="skills-list"></div>
      </section>

      <!-- Top Priorities -->
      <section class="gap-analysis-section">
        <h2 class="section-heading">Top Growth Priorities</h2>
        <p class="section-subtext">Skills with the largest gap between current mastery and your target.</p>
        <div id="gapPrioritiesList" class="gap-list"></div>
      </section>

      <!-- Backup Tools -->
      <section class="actions-card">
        <h3 class="actions-card-title">Storage & Backup</h3>
        <p class="actions-card-desc">Auto-saved to Android localStorage. Backup or restore anytime.</p>
        <div class="action-buttons-grid">
          <button id="exportJsonBtn" class="outline-btn">💾 Backup JSON</button>
          <button id="importJsonBtn" class="outline-btn">📂 Restore JSON</button>
          <input type="file" id="importFileInput" accept=".json" style="display:none">
          <button id="exportImageBtn" class="outline-btn">🖼️ Save PNG Chart</button>
          <button id="resetDefaultsBtn" class="outline-btn text-danger">🔄 Reset Preset</button>
        </div>
      </section>
    </main>

    <!-- Modal Form -->
    <div id="skillModal" class="modal-overlay hidden">
      <div class="modal-card">
        <div class="modal-header">
          <h3 id="modalTitle">Add New Skill</h3>
          <button id="modalCloseBtn" class="modal-close">&times;</button>
        </div>
        <form id="skillForm" class="modal-form">
          <input type="hidden" id="editSkillId" value="">
          <div class="form-group">
            <label for="skillNameInput" class="form-label">Skill Name *</label>
            <input type="text" id="skillNameInput" class="form-input" placeholder="e.g. Kotlin, Docker" required>
          </div>
          <div class="form-group">
            <label for="skillCategorySelect" class="form-label">Category</label>
            <select id="skillCategorySelect" class="form-select">
              <option value="Language">Language</option>
              <option value="Framework">Framework</option>
              <option value="Architecture">Architecture</option>
              <option value="Tooling">Tooling</option>
              <option value="SoftSkill">Soft Skills</option>
            </select>
          </div>
          <div class="form-row">
            <div class="form-group half">
              <label for="skillCurrentInput" class="form-label">Current: <span id="currentValBadge">70%</span></label>
              <input type="range" id="skillCurrentInput" class="range-slider" min="10" max="100" value="70" step="5">
            </div>
            <div class="form-group half">
              <label for="skillTargetInput" class="form-label">Target: <span id="targetValBadge">90%</span></label>
              <input type="range" id="skillTargetInput" class="range-slider" min="10" max="100" value="90" step="5">
            </div>
          </div>
          <div class="form-group">
            <label for="skillNotesInput" class="form-label">Goal Notes</label>
            <input type="text" id="skillNotesInput" class="form-input" placeholder="e.g. Build coroutines project">
          </div>
          <div class="modal-actions">
            <button type="button" id="modalCancelBtn" class="secondary-btn">Cancel</button>
            <button type="submit" class="primary-btn">Save Skill</button>
          </div>
        </form>
      </div>
    </div>
    <div id="toast" class="toast hidden"></div>
  </div>
  <script src="app.js"></script>
</body>
</html>`,

  'style.css': `/* SkillRadar Stylesheet for Spck Editor on Android */
:root {
  --bg-primary: #0b0f19;
  --bg-secondary: #111827;
  --bg-card: #1e293b;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --border-subtle: #334155;
  --accent-current: #38bdf8;
  --accent-target: #a855f7;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
}

[data-theme="light"] {
  --bg-primary: #f8fafc;
  --bg-secondary: #ffffff;
  --bg-card: #f1f5f9;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #64748b;
  --border-subtle: #cbd5e1;
  --accent-current: #0284c7;
  --accent-target: #7e22ce;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: var(--bg-primary); color: var(--text-primary); line-height: 1.5; font-size: 14px; display: flex; justify-content: center; }
.app-container { width: 100%; max-width: 640px; min-height: 100vh; padding: 12px 14px 40px; display: flex; flex-direction: column; }
.app-header { display: flex; align-items: center; justify-content: space-between; padding-bottom: 12px; border-bottom: 1px solid var(--border-subtle); margin-bottom: 14px; }
.header-brand { display: flex; align-items: center; gap: 10px; }
.radar-icon-badge { width: 36px; height: 36px; border-radius: var(--radius-md); background: linear-gradient(135deg, #4f46e5, #06b6d4); display: flex; align-items: center; justify-content: center; color: #fff; }
.brand-title { font-size: 1.15rem; font-weight: 700; }
.brand-subtitle { font-size: 0.72rem; color: var(--text-muted); }
.header-actions { display: flex; gap: 8px; align-items: center; }
.primary-btn { background: #4f46e5; color: #fff; border: none; border-radius: var(--radius-sm); padding: 8px 12px; font-size: 0.82rem; font-weight: 600; cursor: pointer; }
.secondary-btn { background: transparent; color: var(--text-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 8px 12px; font-size: 0.82rem; cursor: pointer; }
.outline-btn { background: var(--bg-card); color: var(--text-primary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 8px 10px; font-size: 0.76rem; cursor: pointer; }
.icon-btn { background: var(--bg-card); border: 1px solid var(--border-subtle); width: 36px; height: 36px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; cursor: pointer; }
.toolbar-section { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }
.preset-selector-group { display: flex; align-items: center; gap: 8px; background: var(--bg-secondary); border: 1px solid var(--border-subtle); padding: 6px 10px; border-radius: var(--radius-md); }
.custom-select { flex: 1; background: transparent; border: none; color: var(--text-primary); font-size: 0.85rem; font-weight: 600; outline: none; }
.view-toggles { display: flex; gap: 8px; }
.toggle-pill { background: var(--bg-card); border: 1px solid var(--border-subtle); color: var(--text-muted); border-radius: var(--radius-sm); padding: 5px 10px; font-size: 0.75rem; cursor: pointer; }
.toggle-pill.active { border-color: #6366f1; color: var(--text-primary); background: rgba(99, 102, 241, 0.15); }
.legend-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; background: var(--accent-target); }
.radar-card { background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 14px 12px 10px; margin-bottom: 16px; }
.stats-banner { display: flex; justify-content: space-around; background: var(--bg-primary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 8px 12px; margin-bottom: 12px; }
.stat-item { display: flex; flex-direction: column; align-items: center; }
.stat-number { font-size: 1.15rem; font-weight: 700; font-family: monospace; color: var(--accent-current); }
.stat-target { color: var(--accent-target); }
.stat-gap { color: #f59e0b; }
.stat-desc { font-size: 0.68rem; color: var(--text-muted); text-transform: uppercase; }
.stat-divider { width: 1px; height: 24px; background: var(--border-subtle); }
.canvas-wrapper { position: relative; width: 100%; aspect-ratio: 1/1; max-width: 440px; margin: 0 auto; }
canvas#radarCanvas { width: 100%; height: 100%; display: block; }
.chart-tooltip { position: absolute; pointer-events: none; background: rgba(15, 23, 42, 0.95); border: 1px solid #4f46e5; color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 0.72rem; display: none; }
.chart-legend { display: flex; justify-content: center; gap: 16px; margin-top: 10px; font-size: 0.75rem; color: var(--text-secondary); }
.legend-item { display: flex; align-items: center; gap: 6px; }
.legend-color-box { width: 12px; height: 6px; border-radius: 2px; }
.current-color { background-color: var(--accent-current); }
.target-color { background-color: var(--accent-target); }
.filter-section { margin-bottom: 12px; overflow-x: auto; }
.category-tabs { display: flex; gap: 6px; }
.cat-tab { background: var(--bg-card); border: 1px solid var(--border-subtle); color: var(--text-secondary); border-radius: var(--radius-sm); padding: 6px 11px; font-size: 0.75rem; cursor: pointer; }
.cat-tab.active { background: #4f46e5; border-color: #4f46e5; color: #fff; }
.skills-section { margin-bottom: 18px; }
.section-title-bar { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
.section-heading { font-size: 0.95rem; font-weight: 700; }
.section-hint { font-size: 0.7rem; color: var(--text-muted); }
.skills-list { display: flex; flex-direction: column; gap: 8px; }
.skill-row-card { background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 10px 12px; display: flex; flex-direction: column; gap: 8px; }
.skill-row-top { display: flex; justify-content: space-between; align-items: center; }
.skill-name-group { display: flex; gap: 8px; align-items: center; }
.skill-name { font-size: 0.88rem; font-weight: 600; }
.category-indicator { font-size: 0.68rem; color: var(--text-muted); }
.skill-badges { display: flex; gap: 6px; font-family: monospace; font-size: 0.75rem; }
.current-badge { color: var(--accent-current); font-weight: 700; }
.target-badge { color: var(--accent-target); }
.skill-sliders-container { display: flex; flex-direction: column; gap: 6px; }
.slider-line { display: flex; align-items: center; gap: 8px; }
.slider-label { font-size: 0.68rem; color: var(--text-muted); width: 48px; }
.range-slider { flex: 1; height: 6px; border-radius: 3px; background: #334155; outline: none; }
.skill-actions-row { display: flex; justify-content: space-between; align-items: center; padding-top: 4px; border-top: 1px dashed rgba(255,255,255,0.08); }
.skill-notes-text { font-size: 0.72rem; color: var(--text-muted); font-style: italic; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 220px; }
.row-action-btns { display: flex; gap: 8px; }
.text-btn { background: none; border: none; color: var(--text-muted); font-size: 0.72rem; cursor: pointer; }
.text-danger { color: #ef4444; }
.gap-analysis-section { background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 12px 14px; margin-bottom: 16px; }
.section-subtext { font-size: 0.74rem; color: var(--text-muted); margin-bottom: 10px; }
.gap-list { display: flex; flex-direction: column; gap: 8px; }
.gap-item { display: flex; align-items: center; justify-content: space-between; background: var(--bg-primary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 8px 10px; }
.gap-skill-title { font-size: 0.82rem; font-weight: 600; }
.gap-bar-container { flex: 1; max-width: 140px; margin: 0 10px; height: 6px; background: #334155; border-radius: 3px; overflow: hidden; }
.gap-bar-fill { height: 100%; background: linear-gradient(90deg, #f59e0b, #ef4444); border-radius: 3px; }
.gap-metric { font-family: monospace; font-size: 0.75rem; font-weight: 700; color: #f59e0b; }
.actions-card { background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 14px; margin-bottom: 18px; }
.actions-card-title { font-size: 0.88rem; font-weight: 700; margin-bottom: 4px; }
.actions-card-desc { font-size: 0.72rem; color: var(--text-muted); margin-bottom: 10px; }
.action-buttons-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 16px; }
.modal-overlay.hidden { display: none; }
.modal-card { background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); width: 100%; max-width: 400px; padding: 18px; }
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.modal-close { background: none; border: none; color: var(--text-muted); font-size: 1.4rem; cursor: pointer; }
.modal-form { display: flex; flex-direction: column; gap: 12px; }
.form-group { display: flex; flex-direction: column; gap: 4px; }
.form-row { display: flex; gap: 10px; }
.form-group.half { flex: 1; }
.form-label { font-size: 0.75rem; font-weight: 600; color: var(--text-secondary); }
.form-input, .form-select { background: #0f172a; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 8px 10px; color: #fff; font-size: 0.85rem; outline: none; }
.modal-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 8px; }
.toast { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background: #1e293b; border: 1px solid #6366f1; color: #fff; padding: 8px 16px; border-radius: 999px; font-size: 0.78rem; z-index: 200; }
.toast.hidden { display: none; }`,

  'app.js': `// SkillRadar Pure Vanilla JavaScript Engine
// Standalone ES6 - Runs 100% offline in Spck Editor on Android
// See public/spck-app/app.js for full implementation with canvas radar polygons,
// touch interactions, high-DPI scaling, and local storage persistence.`,

  'manifest.json': `{
  "name": "SkillRadar - Developer Competency Tracker",
  "short_name": "SkillRadar",
  "start_url": "index.html",
  "display": "standalone",
  "background_color": "#0b0f19",
  "theme_color": "#0f172a",
  "orientation": "portrait"
}`,

  'README.md': `# SkillRadar Spck Editor Android Edition
1. Download skill-radar-spck-android.zip
2. Open Spck Editor on Android
3. Tap "+" -> "Import Zip" -> Select this zip file
4. Open index.html and tap the green Play (▶) icon!`
};
