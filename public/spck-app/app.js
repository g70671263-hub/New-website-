/**
 * SkillRadar - Spck Mobile Edition
 * Pure Vanilla JavaScript (ES6) - 100% Offline Compatible for Android Spck Editor
 */

(function () {
  'use strict';

  // --- PRESET PROFILES ---
  const PRESET_DATA = {
    android: [
      { id: '1', name: 'Kotlin', category: 'Language', current: 85, target: 95, notes: 'Mastering coroutines & context receivers' },
      { id: '2', name: 'Jetpack Compose', category: 'Framework', current: 75, target: 90, notes: 'Declarative UI, custom animations' },
      { id: '3', name: 'Java & OOP', category: 'Language', current: 70, target: 80, notes: 'Legacy codebase maintenance & JVM internals' },
      { id: '4', name: 'Architecture (MVVM/MVI)', category: 'Architecture', current: 80, target: 90, notes: 'Clean architecture, ViewModel, state flow' },
      { id: '5', name: 'Coroutines & Flow', category: 'Architecture', current: 65, target: 85, notes: 'Channels, exception handling, reactive streams' },
      { id: '6', name: 'Room & Offline DB', category: 'Tooling', current: 70, target: 85, notes: 'Migrations, DAO, caching strategies' },
      { id: '7', name: 'Retrofit & REST', category: 'Tooling', current: 85, target: 90, notes: 'OkHttp interceptors, serialization' },
      { id: '8', name: 'Git & Gradle Build', category: 'Tooling', current: 60, target: 75, notes: 'Gradle Kotlin DSL, ProGuard / R8' },
    ],
    fullstack: [
      { id: '101', name: 'JavaScript & TS', category: 'Language', current: 85, target: 95, notes: 'Advanced typing, async pipelines' },
      { id: '102', name: 'React & Next.js', category: 'Framework', current: 80, target: 90, notes: 'Server components, state management' },
      { id: '103', name: 'Node.js & Express', category: 'Framework', current: 75, target: 85, notes: 'REST API, middleware, auth' },
      { id: '104', name: 'HTML5 & CSS3', category: 'Language', current: 90, target: 95, notes: 'Responsive layouts, animations, accessibility' },
      { id: '105', name: 'PostgreSQL & DB', category: 'Architecture', current: 65, target: 80, notes: 'Indexing, relational schemas, ORMs' },
      { id: '106', name: 'System Design', category: 'Architecture', current: 60, target: 80, notes: 'Caching, horizontal scaling, queues' },
      { id: '107', name: 'Docker & Git', category: 'Tooling', current: 70, target: 85, notes: 'Containerization, branch workflows' },
      { id: '108', name: 'Code Review & Team', category: 'SoftSkill', current: 75, target: 90, notes: 'Mentoring, constructive feedback' },
    ],
    data_ai: [
      { id: '201', name: 'Python', category: 'Language', current: 85, target: 95, notes: 'OOP, generators, vectorization' },
      { id: '202', name: 'Pandas & NumPy', category: 'Framework', current: 80, target: 90, notes: 'Data wrangling, matrix ops' },
      { id: '203', name: 'SQL & Warehousing', category: 'Language', current: 70, target: 85, notes: 'Complex joins, window functions' },
      { id: '204', name: 'Machine Learning', category: 'Architecture', current: 65, target: 85, notes: 'Scikit-Learn, regression, trees' },
      { id: '205', name: 'Deep Learning', category: 'Architecture', current: 55, target: 80, notes: 'PyTorch, neural network training' },
      { id: '206', name: 'Data Visualization', category: 'Tooling', current: 75, target: 85, notes: 'Matplotlib, Seaborn, dashboards' },
      { id: '207', name: 'Model Deployment', category: 'Tooling', current: 50, target: 75, notes: 'FastAPI, Docker inference endpoints' },
    ],
    devops: [
      { id: '301', name: 'Linux Admin', category: 'Architecture', current: 80, target: 90, notes: 'Shell scripting, systemd, networking' },
      { id: '302', name: 'Docker Containers', category: 'Tooling', current: 85, target: 95, notes: 'Multi-stage builds, security rootless' },
      { id: '303', name: 'Kubernetes (K8s)', category: 'Tooling', current: 60, target: 85, notes: 'Pods, services, ingress, Helm charts' },
      { id: '304', name: 'Cloud (AWS / GCP)', category: 'Architecture', current: 70, target: 85, notes: 'IAM, VPC, managed databases, S3' },
      { id: '305', name: 'CI/CD Pipelines', category: 'Tooling', current: 75, target: 90, notes: 'GitHub Actions, GitLab CI automated tests' },
      { id: '306', name: 'Terraform & IaC', category: 'Tooling', current: 55, target: 80, notes: 'Modular declarative infrastructure' },
      { id: '307', name: 'Observability & Logs', category: 'Tooling', current: 65, target: 80, notes: 'Prometheus, Grafana, alerting' },
    ],
    custom: []
  };

  const STORAGE_KEY = 'skill_radar_spck_data_v1';
  const THEME_KEY = 'skill_radar_spck_theme';

  // --- STATE ---
  let state = {
    preset: 'android',
    skills: [],
    showTarget: true,
    showValues: true,
    filterCategory: 'all',
    hoveredIndex: -1,
    theme: 'dark'
  };

  // --- DOM ELEMENTS ---
  const canvas = document.getElementById('radarCanvas');
  const ctx = canvas.getContext('2d');
  const tooltipEl = document.getElementById('chartTooltip');
  const skillsListEl = document.getElementById('skillsList');
  const gapPrioritiesListEl = document.getElementById('gapPrioritiesList');
  const avgCurrentScoreEl = document.getElementById('avgCurrentScore');
  const avgTargetScoreEl = document.getElementById('avgTargetScore');
  const totalGapScoreEl = document.getElementById('totalGapScore');
  const profilePresetSelect = document.getElementById('profilePresetSelect');
  const toggleTargetBtn = document.getElementById('toggleTargetBtn');
  const toggleValuesBtn = document.getElementById('toggleValuesBtn');
  const categoryTabsEl = document.getElementById('categoryTabs');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const toastEl = document.getElementById('toast');

  // Modal elements
  const skillModal = document.getElementById('skillModal');
  const skillForm = document.getElementById('skillForm');
  const modalTitle = document.getElementById('modalTitle');
  const editSkillId = document.getElementById('editSkillId');
  const skillNameInput = document.getElementById('skillNameInput');
  const skillCategorySelect = document.getElementById('skillCategorySelect');
  const skillCurrentInput = document.getElementById('skillCurrentInput');
  const skillTargetInput = document.getElementById('skillTargetInput');
  const skillNotesInput = document.getElementById('skillNotesInput');
  const currentValBadge = document.getElementById('currentValBadge');
  const targetValBadge = document.getElementById('targetValBadge');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCancelBtn = document.getElementById('modalCancelBtn');
  const addSkillModalBtn = document.getElementById('addSkillModalBtn');

  // Storage action buttons
  const exportJsonBtn = document.getElementById('exportJsonBtn');
  const importJsonBtn = document.getElementById('importJsonBtn');
  const importFileInput = document.getElementById('importFileInput');
  const exportImageBtn = document.getElementById('exportImageBtn');
  const resetDefaultsBtn = document.getElementById('resetDefaultsBtn');

  // --- INITIALIZATION ---
  function init() {
    loadSavedData();
    setupCanvasDPI();
    bindEvents();
    renderAll();
  }

  // --- STORAGE & PERSISTENCE ---
  function loadSavedData() {
    // Theme
    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    setTheme(savedTheme);

    // Profile & Skills
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        state.preset = parsed.preset || 'android';
        state.skills = Array.isArray(parsed.skills) && parsed.skills.length > 0
          ? parsed.skills
          : [...PRESET_DATA.android];
      } catch (e) {
        state.skills = [...PRESET_DATA.android];
      }
    } else {
      state.skills = [...PRESET_DATA.android];
    }

    profilePresetSelect.value = state.preset;
  }

  function saveCurrentData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        preset: state.preset,
        skills: state.skills
      }));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }

  function setTheme(t) {
    state.theme = t;
    document.documentElement.setAttribute('data-theme', t);
    themeIcon.textContent = t === 'light' ? '☀️' : '🌙';
    localStorage.setItem(THEME_KEY, t);
    renderRadar();
  }

  // --- HIGH-DPI CANVAS SETUP ---
  let canvasSize = 440;
  function setupCanvasDPI() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || canvasSize;
    const height = rect.height || canvasSize;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.resetTransform?.();
    ctx.scale(dpr, dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvasSize = width;
  }

  // --- EVENT BINDINGS ---
  function bindEvents() {
    window.addEventListener('resize', () => {
      setupCanvasDPI();
      renderRadar();
    });

    // Theme toggle
    themeToggleBtn.addEventListener('click', () => {
      setTheme(state.theme === 'dark' ? 'light' : 'dark');
    });

    // Preset selector
    profilePresetSelect.addEventListener('change', (e) => {
      const selected = e.target.value;
      state.preset = selected;
      if (selected !== 'custom' && PRESET_DATA[selected]) {
        state.skills = JSON.parse(JSON.stringify(PRESET_DATA[selected]));
      }
      saveCurrentData();
      renderAll();
      showToast(`Switched to ${selected.toUpperCase()} preset`);
    });

    // View toggles
    toggleTargetBtn.addEventListener('click', () => {
      state.showTarget = !state.showTarget;
      toggleTargetBtn.classList.toggle('active', state.showTarget);
      renderRadar();
    });

    toggleValuesBtn.addEventListener('click', () => {
      state.showValues = !state.showValues;
      toggleValuesBtn.classList.toggle('active', state.showValues);
      renderRadar();
    });

    // Category filter tabs
    categoryTabsEl.addEventListener('click', (e) => {
      const tab = e.target.closest('.cat-tab');
      if (!tab) return;
      categoryTabsEl.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.filterCategory = tab.getAttribute('data-category');
      renderSkillsList();
    });

    // Modal controls
    addSkillModalBtn.addEventListener('click', () => openSkillModal());
    modalCloseBtn.addEventListener('click', () => closeSkillModal());
    modalCancelBtn.addEventListener('click', () => closeSkillModal());

    skillCurrentInput.addEventListener('input', (e) => {
      currentValBadge.textContent = `${e.target.value}%`;
    });

    skillTargetInput.addEventListener('input', (e) => {
      targetValBadge.textContent = `${e.target.value}%`;
    });

    skillForm.addEventListener('submit', handleSkillFormSubmit);

    // Backup & Restore
    exportJsonBtn.addEventListener('click', handleExportJson);
    importJsonBtn.addEventListener('click', () => importFileInput.click());
    importFileInput.addEventListener('change', handleImportFile);
    exportImageBtn.addEventListener('click', handleExportImage);
    resetDefaultsBtn.addEventListener('click', handleResetPreset);

    // Canvas interactivity (touch & mouse)
    canvas.addEventListener('mousemove', handleCanvasPointerMove);
    canvas.addEventListener('mouseleave', () => {
      state.hoveredIndex = -1;
      tooltipEl.style.display = 'none';
      renderRadar();
    });

    canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handleCanvasPointerMove(touch);
      }
    }, { passive: true });

    canvas.addEventListener('touchend', () => {
      state.hoveredIndex = -1;
      tooltipEl.style.display = 'none';
      renderRadar();
    });
  }

  // --- RADAR CHART RENDERING (PURE CANVAS 2D) ---
  function renderRadar() {
    const dpr = window.devicePixelRatio || 1;
    const width = canvasSize;
    const height = canvasSize;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 46;

    ctx.clearRect(0, 0, width, height);

    const skills = state.skills;
    const count = skills.length;
    if (count < 3) {
      ctx.fillStyle = '#64748b';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Add at least 3 skills to render radar chart', centerX, centerY);
      return;
    }

    const isDark = state.theme === 'dark';
    const gridColor = isDark ? 'rgba(51, 65, 85, 0.45)' : 'rgba(203, 213, 225, 0.75)';
    const gridTextColor = isDark ? '#64748b' : '#94a3b8';
    const axisColor = isDark ? 'rgba(51, 65, 85, 0.65)' : 'rgba(203, 213, 225, 0.9)';
    const labelColor = isDark ? '#e2e8f0' : '#1e293b';

    const angleStep = (Math.PI * 2) / count;
    const startAngle = -Math.PI / 2;

    // 1. Draw Concentric Polygonal Web (Levels: 20%, 40%, 60%, 80%, 100%)
    const levels = [0.2, 0.4, 0.6, 0.8, 1.0];
    levels.forEach((level) => {
      const levelRadius = radius * level;
      ctx.beginPath();
      for (let i = 0; i < count; i++) {
        const angle = startAngle + i * angleStep;
        const x = centerX + Math.cos(angle) * levelRadius;
        const y = centerY + Math.sin(angle) * levelRadius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Numeric rings label
      if (state.showValues) {
        ctx.fillStyle = gridTextColor;
        ctx.font = '10px ui-monospace, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(`${Math.round(level * 100)}%`, centerX, centerY - levelRadius + 2);
      }
    });

    // 2. Draw Spokes / Axes from Center to Perimeter
    for (let i = 0; i < count; i++) {
      const angle = startAngle + i * angleStep;
      const endX = centerX + Math.cos(angle) * radius;
      const endY = centerY + Math.sin(angle) * radius;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = axisColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Axis Labels
      const labelDistance = radius + 22;
      const labelX = centerX + Math.cos(angle) * labelDistance;
      const labelY = centerY + Math.sin(angle) * labelDistance;

      const skill = skills[i];
      const isHovered = state.hoveredIndex === i;

      ctx.font = isHovered ? 'bold 11px sans-serif' : '500 11px sans-serif';
      ctx.fillStyle = isHovered ? '#38bdf8' : labelColor;
      ctx.textAlign = Math.cos(angle) > 0.1 ? 'left' : (Math.cos(angle) < -0.1 ? 'right' : 'center');
      ctx.textBaseline = Math.sin(angle) > 0.1 ? 'top' : (Math.sin(angle) < -0.1 ? 'bottom' : 'middle');

      // Shorten label if too long for small phone screens
      let displayLabel = skill.name;
      if (displayLabel.length > 15) {
        displayLabel = displayLabel.slice(0, 13) + '…';
      }
      ctx.fillText(displayLabel, labelX, labelY);
    }

    // 3. Draw Target Polygon (Purple) if toggled
    if (state.showTarget) {
      drawPolygon({
        skills,
        key: 'target',
        radius,
        centerX,
        centerY,
        startAngle,
        angleStep,
        fillColor: isDark ? 'rgba(168, 85, 247, 0.15)' : 'rgba(126, 34, 206, 0.12)',
        strokeColor: '#a855f7',
        vertexColor: '#c084fc',
        isDashed: true
      });
    }

    // 4. Draw Current Level Polygon (Cyan/Blue)
    drawPolygon({
      skills,
      key: 'current',
      radius,
      centerX,
      centerY,
      startAngle,
      angleStep,
      fillColor: isDark ? 'rgba(56, 189, 248, 0.28)' : 'rgba(2, 132, 199, 0.22)',
      strokeColor: '#38bdf8',
      vertexColor: '#0284c7',
      isDashed: false
    });

    // 5. Highlight Vertex if Hovered
    if (state.hoveredIndex >= 0 && state.hoveredIndex < count) {
      const idx = state.hoveredIndex;
      const angle = startAngle + idx * angleStep;
      const curDist = (skills[idx].current / 100) * radius;
      const hx = centerX + Math.cos(angle) * curDist;
      const hy = centerY + Math.sin(angle) * curDist;

      ctx.beginPath();
      ctx.arc(hx, hy, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }

  function drawPolygon(opts) {
    const { skills, key, radius, centerX, centerY, startAngle, angleStep, fillColor, strokeColor, vertexColor, isDashed } = opts;
    const count = skills.length;
    const vertices = [];

    for (let i = 0; i < count; i++) {
      const angle = startAngle + i * angleStep;
      const val = Math.min(100, Math.max(0, skills[i][key]));
      const dist = (val / 100) * radius;
      vertices.push({
        x: centerX + Math.cos(angle) * dist,
        y: centerY + Math.sin(angle) * dist,
        val: val
      });
    }

    // Fill polygon
    ctx.beginPath();
    vertices.forEach((pt, i) => {
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.closePath();

    ctx.fillStyle = fillColor;
    ctx.fill();

    // Outline
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    if (isDashed) {
      ctx.setLineDash([4, 4]);
    } else {
      ctx.setLineDash([]);
    }
    ctx.stroke();
    ctx.setLineDash([]); // reset

    // Draw dots at vertices
    vertices.forEach((pt, i) => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = vertexColor;
      ctx.fill();
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
  }

  // Pointer detection for chart interaction
  function handleCanvasPointerMove(e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const count = state.skills.length;
    if (count < 3) return;

    const centerX = canvasSize / 2;
    const centerY = canvasSize / 2;
    const radius = Math.min(centerX, centerY) - 46;
    const angleStep = (Math.PI * 2) / count;
    const startAngle = -Math.PI / 2;

    let closestIdx = -1;
    let minDistance = 24; // detection threshold in px

    for (let i = 0; i < count; i++) {
      const angle = startAngle + i * angleStep;
      const curDist = (state.skills[i].current / 100) * radius;
      const vx = centerX + Math.cos(angle) * curDist;
      const vy = centerY + Math.sin(angle) * curDist;

      const d = Math.hypot(mouseX - vx, mouseY - vy);
      if (d < minDistance) {
        minDistance = d;
        closestIdx = i;
      }
    }

    if (closestIdx !== state.hoveredIndex) {
      state.hoveredIndex = closestIdx;
      renderRadar();
    }

    if (closestIdx >= 0) {
      const s = state.skills[closestIdx];
      tooltipEl.style.display = 'block';
      tooltipEl.style.left = `${mouseX + 12}px`;
      tooltipEl.style.top = `${mouseY - 10}px`;
      tooltipEl.innerHTML = `<strong>${s.name}</strong><br>Current: ${s.current}% | Target: ${s.target}%`;
    } else {
      tooltipEl.style.display = 'none';
    }
  }

  // --- RENDER SKILLS LIST & CONTROLS ---
  function renderSkillsList() {
    skillsListEl.innerHTML = '';

    const filter = state.filterCategory;
    const filtered = filter === 'all'
      ? state.skills
      : state.skills.filter(s => s.category === filter);

    // Update count in All tab
    const countAllEl = document.getElementById('countAll');
    if (countAllEl) countAllEl.textContent = state.skills.length;

    if (filtered.length === 0) {
      skillsListEl.innerHTML = `
        <div style="text-align: center; padding: 20px; color: var(--text-muted); font-size: 0.8rem;">
          No skills found in this category. Tap <strong>+ Add Skill</strong> to create one!
        </div>
      `;
      return;
    }

    filtered.forEach((skill) => {
      const card = document.createElement('div');
      card.className = 'skill-row-card';
      card.innerHTML = `
        <div class="skill-row-top">
          <div class="skill-name-group">
            <span class="skill-name">${escapeHtml(skill.name)}</span>
            <span class="category-indicator">${skill.category}</span>
          </div>
          <div class="skill-badges">
            <span class="current-badge" id="valCurrent_${skill.id}">${skill.current}%</span>
            ${state.showTarget ? `<span class="target-badge" id="valTarget_${skill.id}">Goal: ${skill.target}%</span>` : ''}
          </div>
        </div>

        <div class="skill-sliders-container">
          <div class="slider-line">
            <span class="slider-label">Current:</span>
            <input type="range" class="range-slider" min="0" max="100" value="${skill.current}" step="5" data-id="${skill.id}" data-type="current">
          </div>
          ${state.showTarget ? `
          <div class="slider-line">
            <span class="slider-label">Target:</span>
            <input type="range" class="range-slider target-slider" min="0" max="100" value="${skill.target}" step="5" data-id="${skill.id}" data-type="target">
          </div>` : ''}
        </div>

        <div class="skill-actions-row">
          <span class="skill-notes-text">${skill.notes ? escapeHtml(skill.notes) : 'No notes added'}</span>
          <div class="row-action-btns">
            <button class="text-btn" data-action="edit" data-id="${skill.id}">Edit</button>
            <button class="text-btn text-danger" data-action="delete" data-id="${skill.id}">Delete</button>
          </div>
        </div>
      `;

      // Slider event listeners (real-time live update!)
      card.querySelectorAll('.range-slider').forEach(slider => {
        slider.addEventListener('input', (e) => {
          const id = e.target.getAttribute('data-id');
          const type = e.target.getAttribute('data-type');
          const val = parseInt(e.target.value, 10);
          updateSkillValue(id, type, val);
        });
      });

      // Edit / Delete actions
      card.querySelector('[data-action="edit"]')?.addEventListener('click', () => {
        openSkillModal(skill.id);
      });

      card.querySelector('[data-action="delete"]')?.addEventListener('click', () => {
        deleteSkill(skill.id);
      });

      skillsListEl.appendChild(card);
    });
  }

  function updateSkillValue(id, type, val) {
    const skill = state.skills.find(s => s.id === id);
    if (!skill) return;

    skill[type] = val;
    if (type === 'current') {
      const badge = document.getElementById(`valCurrent_${id}`);
      if (badge) badge.textContent = `${val}%`;
    } else {
      const badge = document.getElementById(`valTarget_${id}`);
      if (badge) badge.textContent = `Goal: ${val}%`;
    }

    renderRadar();
    renderStats();
    renderGapList();
    saveCurrentData();
  }

  // --- STATS & GAP ANALYSIS ---
  function renderStats() {
    if (state.skills.length === 0) {
      avgCurrentScoreEl.textContent = '0%';
      avgTargetScoreEl.textContent = '0%';
      totalGapScoreEl.textContent = '0%';
      return;
    }

    const totalCur = state.skills.reduce((acc, s) => acc + s.current, 0);
    const totalTgt = state.skills.reduce((acc, s) => acc + s.target, 0);
    const avgCur = Math.round(totalCur / state.skills.length);
    const avgTgt = Math.round(totalTgt / state.skills.length);
    const gap = Math.max(0, avgTgt - avgCur);

    avgCurrentScoreEl.textContent = `${avgCur}%`;
    avgTargetScoreEl.textContent = `${avgTgt}%`;
    totalGapScoreEl.textContent = `+${gap}%`;
  }

  function renderGapList() {
    gapPrioritiesListEl.innerHTML = '';

    // Calculate gap for each skill
    const gaps = state.skills
      .map(s => ({
        ...s,
        gap: Math.max(0, s.target - s.current)
      }))
      .filter(s => s.gap > 0)
      .sort((a, b) => b.gap - a.gap)
      .slice(0, 4);

    if (gaps.length === 0) {
      gapPrioritiesListEl.innerHTML = `
        <div style="font-size: 0.75rem; color: var(--text-muted); text-align: center; padding: 8px;">
          🎉 All current skills meet or exceed your target goals!
        </div>
      `;
      return;
    }

    gaps.forEach(g => {
      const item = document.createElement('div');
      item.className = 'gap-item';
      item.innerHTML = `
        <div>
          <span class="gap-skill-title">${escapeHtml(g.name)}</span>
          <div style="font-size: 0.68rem; color: var(--text-muted);">${g.current}% &rarr; ${g.target}% target</div>
        </div>
        <div class="gap-bar-container">
          <div class="gap-bar-fill" style="width: ${Math.min(100, g.gap * 2.5)}%;"></div>
        </div>
        <span class="gap-metric">+${g.gap}%</span>
      `;
      gapPrioritiesListEl.appendChild(item);
    });
  }

  function renderAll() {
    renderRadar();
    renderStats();
    renderSkillsList();
    renderGapList();
  }

  // --- MODAL: ADD / EDIT SKILL ---
  function openSkillModal(skillId = null) {
    skillModal.classList.remove('hidden');
    if (skillId) {
      const skill = state.skills.find(s => s.id === skillId);
      if (skill) {
        modalTitle.textContent = 'Edit Competency';
        editSkillId.value = skill.id;
        skillNameInput.value = skill.name;
        skillCategorySelect.value = skill.category;
        skillCurrentInput.value = skill.current;
        skillTargetInput.value = skill.target;
        skillNotesInput.value = skill.notes || '';
        currentValBadge.textContent = `${skill.current}%`;
        targetValBadge.textContent = `${skill.target}%`;
      }
    } else {
      modalTitle.textContent = 'Add New Skill';
      editSkillId.value = '';
      skillNameInput.value = '';
      skillCategorySelect.value = 'Language';
      skillCurrentInput.value = 65;
      skillTargetInput.value = 85;
      skillNotesInput.value = '';
      currentValBadge.textContent = '65%';
      targetValBadge.textContent = '85%';
    }
    skillNameInput.focus();
  }

  function closeSkillModal() {
    skillModal.classList.add('hidden');
    skillForm.reset();
  }

  function handleSkillFormSubmit(e) {
    e.preventDefault();
    const id = editSkillId.value;
    const name = skillNameInput.value.trim();
    if (!name) return;

    const category = skillCategorySelect.value;
    const current = parseInt(skillCurrentInput.value, 10);
    const target = parseInt(skillTargetInput.value, 10);
    const notes = skillNotesInput.value.trim();

    if (id) {
      // Edit existing
      const skill = state.skills.find(s => s.id === id);
      if (skill) {
        skill.name = name;
        skill.category = category;
        skill.current = current;
        skill.target = target;
        skill.notes = notes;
      }
      showToast(`Updated "${name}"`);
    } else {
      // Add new
      const newSkill = {
        id: Date.now().toString(),
        name,
        category,
        current,
        target,
        notes
      };
      state.skills.push(newSkill);
      state.preset = 'custom';
      profilePresetSelect.value = 'custom';
      showToast(`Added "${name}"`);
    }

    closeSkillModal();
    saveCurrentData();
    renderAll();
  }

  function deleteSkill(id) {
    const s = state.skills.find(item => item.id === id);
    const name = s ? s.name : 'Skill';
    if (confirm(`Remove "${name}" from your radar?`)) {
      state.skills = state.skills.filter(item => item.id !== id);
      state.preset = 'custom';
      profilePresetSelect.value = 'custom';
      saveCurrentData();
      renderAll();
      showToast(`Removed "${name}"`);
    }
  }

  // --- BACKUP & EXPORT ---
  function handleExportJson() {
    const payload = {
      app: 'SkillRadar - Spck Mobile Edition',
      version: '1.0',
      exportedAt: new Date().toISOString(),
      preset: state.preset,
      skills: state.skills
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `skill-radar-backup-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Backup JSON downloaded');
  }

  function handleImportFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.skills && Array.isArray(parsed.skills)) {
          state.skills = parsed.skills;
          state.preset = parsed.preset || 'custom';
          profilePresetSelect.value = state.preset;
          saveCurrentData();
          renderAll();
          showToast(`Restored ${parsed.skills.length} skills successfully!`);
        } else {
          alert('Invalid backup JSON file structure');
        }
      } catch (err) {
        alert('Could not parse JSON file');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // reset file input
  }

  function handleExportImage() {
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `skill-radar-chart-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      showToast('Radar chart PNG exported');
    } catch (e) {
      alert('Could not generate chart image');
    }
  }

  function handleResetPreset() {
    const curPreset = state.preset;
    if (confirm(`Reset skills back to the default ${curPreset.toUpperCase()} preset?`)) {
      if (PRESET_DATA[curPreset]) {
        state.skills = JSON.parse(JSON.stringify(PRESET_DATA[curPreset]));
      } else {
        state.skills = JSON.parse(JSON.stringify(PRESET_DATA.android));
        state.preset = 'android';
        profilePresetSelect.value = 'android';
      }
      saveCurrentData();
      renderAll();
      showToast('Preset reset to defaults');
    }
  }

  // --- UTILS ---
  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.remove('hidden');
    setTimeout(() => {
      toastEl.classList.add('hidden');
    }, 2400);
  }

  function escapeHtml(str) {
    return (str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Bootstrap app
  window.addEventListener('DOMContentLoaded', init);
})();
