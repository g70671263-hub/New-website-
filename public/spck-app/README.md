# SkillRadar - Spck Editor Android Edition 🚀

An ultra-lightweight, 100% offline Developer Skill Radar spider chart application designed to run seamlessly in **Spck Editor** on Android devices.

---

## 📱 How to Run in Spck Editor on Android

### Method 1: Using the Project ZIP (Fastest)
1. Download `skill-radar-spck-android.zip` onto your Android phone.
2. Open **Spck Editor** on your Android phone.
3. Tap the **+** (New Project) button in the left sidebar or projects screen.
4. Select **"Import Zip"** and pick the downloaded `skill-radar-spck-android.zip`.
5. Open the newly imported project folder.
6. Open `index.html` and tap the green **Play (▶️)** button in the top right toolbar.
7. The interactive Skill Radar will launch instantly inside Spck's built-in browser!

### Method 2: Manual Folder Creation in Spck
1. Open Spck Editor and tap **+** -> **New Project** -> **HTML/CSS/JS**.
2. Name the project `SkillRadar`.
3. Copy and paste the contents into the 3 files:
   - `index.html`
   - `style.css`
   - `app.js`
4. Tap **Run (▶️)** to preview live!

---

## 🛠️ Features Included

- **Interactive HTML5 Canvas Radar**: Dual polygons showing your **Current Level** (Cyan) vs **Target Level** (Purple).
- **Career Presets**: Preloaded with Android & Mobile Dev, Full-Stack Web, AI & Data Science, and DevOps competencies.
- **Real-Time Sliders**: Adjust skill proficiencies (1-100%) and watch the radar polygon adapt smoothly.
- **Top Growth Priorities**: Automatically calculates and highlights your biggest skill gaps.
- **100% Offline & Auto-Save**: Saves data directly to Android's local storage (`localStorage`). No internet connection required!
- **Data Backup & Restore**: Backup your skills as a `.json` file or export your radar chart as a `.png` image.
- **Dark & Light Mode**: Built-in theme switcher optimized for mobile AMOLED screens.

---

## 📂 Project Structure

```text
SkillRadar/
├── index.html        # App layout, modal dialogues & canvas
├── style.css         # Modern responsive mobile styles
├── app.js            # Pure vanilla JavaScript radar engine & data handlers
├── manifest.json     # PWA manifest for Android home-screen installation
└── README.md         # Setup and customization guide
```

---

## 💡 Customization Tips for Spck Editor
- **Change Default Skills**: Open `app.js` and edit the `PRESET_DATA` object at the top of the file.
- **Add New Colors**: Open `style.css` and modify the CSS variables `:root { --accent-current: #38bdf8; }`.
- **Add to Android Home Screen**: In Spck's preview browser, tap the **Share / Open in Browser** icon to open in Chrome, then tap **Add to Home screen**!
