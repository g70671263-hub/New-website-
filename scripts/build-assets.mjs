import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';
import { jsPDF } from 'jspdf';

const rootDir = process.cwd();
const spckDir = path.join(rootDir, 'public', 'spck-app');
const downloadsDir = path.join(rootDir, 'public', 'downloads');

if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}

async function buildZip() {
  console.log('Generating skill-radar-spck-android.zip...');
  const zip = new JSZip();

  const filesToZip = ['index.html', 'style.css', 'app.js', 'manifest.json', 'README.md'];
  for (const filename of filesToZip) {
    const filePath = path.join(spckDir, filename);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      zip.file(filename, content);
    }
  }

  const zipBuffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 }
  });

  const zipPath = path.join(downloadsDir, 'skill-radar-spck-android.zip');
  fs.writeFileSync(zipPath, zipBuffer);
  console.log(`ZIP created successfully at: ${zipPath} (${zipBuffer.length} bytes)`);
}

function buildPdf() {
  console.log('Generating Spck_Editor_Skill_Radar_Guide.pdf...');
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  function checkPageBreak(requiredHeight) {
    if (y + requiredHeight > pageHeight - 18) {
      doc.addPage();
      drawPageHeaderFooter();
      y = 22;
    }
  }

  function drawPageHeaderFooter() {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(120, 140, 160);
    doc.text('SkillRadar &middot; Setup Guide for Spck Editor on Android', margin, 10);
    doc.setDrawColor(220, 225, 235);
    doc.line(margin, 12, pageWidth - margin, 12);

    const pageCount = doc.internal.getNumberOfPages();
    doc.text(`Page ${pageCount}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
    doc.text('Personal Competency Radar &middot; 100% Offline Android Suite', margin, pageHeight - 10);
  }

  // --- PAGE 1: TITLE & COVER ---
  // Top Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(margin, y, contentWidth, 34, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('SkillRadar: Spck Editor Android Setup Guide', margin + 8, y + 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(148, 163, 184);
  doc.text('Complete Handbook: Import, Run, Customize & Export on Mobile', margin + 8, y + 24);

  y += 44;

  // Metadata block
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, y, contentWidth, 20, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.rect(margin, y, contentWidth, 20, 'D');

  doc.setFontSize(9);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.text('Stack: Pure Vanilla HTML5, CSS3 & ES6 JavaScript', margin + 6, y + 8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Target Environment: Spck Editor (or Spck JS) for Android | Zero npm/Node build required', margin + 6, y + 14);

  y += 28;

  // Section 1: Overview
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text('1. Overview & What is Spck Editor?', margin, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85);
  const overviewText = 'Spck Editor is a popular Android code editor that provides an integrated developer environment for writing and running HTML, CSS, and JavaScript directly on your smartphone or tablet. It features code syntax highlighting, an internal web server, live browser preview with inspector/console, and Git integration without needing any computer or terminal.';
  const splitOverview = doc.splitTextToSize(overviewText, contentWidth);
  doc.text(splitOverview, margin, y);
  y += splitOverview.length * 5 + 4;

  // Section 2: Quick Start Steps
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text('2. Step-by-Step Installation & Setup', margin, y);
  y += 6;

  const steps = [
    {
      num: 'Step 1: Install Spck Editor',
      desc: 'Open Google Play Store on your Android device. Search for "Spck Editor" (or "Spck Code Editor / Git Client") and install the free app. No account registration is required.'
    },
    {
      num: 'Step 2: Obtain the Project ZIP',
      desc: 'Download the file "skill-radar-spck-android.zip" onto your phone (usually saved in your Android "Download" directory).'
    },
    {
      num: 'Step 3: Import into Spck Editor',
      desc: 'Open Spck Editor. On the start screen, tap the "+" (New Project) icon at the bottom or open the left navigation drawer. Select "Import Zip", browse to your "Download" folder, and choose "skill-radar-spck-android.zip". Spck will automatically unpack the files into a new project.'
    },
    {
      num: 'Step 4: Launch Live Preview',
      desc: 'Inside the project tree, tap on "index.html" to open the file editor. Look at the top toolbar and tap the green Play icon (▶). Spck\'s built-in mobile browser will launch and display your interactive Skill Radar chart!'
    }
  ];

  steps.forEach(st => {
    checkPageBreak(20);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, y, contentWidth, 16, 2, 2, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, y, contentWidth, 16, 2, 2, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(79, 70, 229);
    doc.text(st.num, margin + 4, y + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    const splitDesc = doc.splitTextToSize(st.desc, contentWidth - 8);
    doc.text(splitDesc, margin + 4, y + 10.5);

    y += 19;
  });

  // PAGE 2: ARCHITECTURE & CUSTOMIZATION
  doc.addPage();
  drawPageHeaderFooter();
  y = 20;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text('3. Project Files Explained', margin, y);
  y += 7;

  const fileInfo = [
    { name: 'index.html', role: 'Semantic structure, Canvas viewbox, competency list, modal forms, and toolbar.' },
    { name: 'style.css', role: 'Mobile-first layout, touch targets (>=44px), dark & light themes, sliders, and responsive typography.' },
    { name: 'app.js', role: 'Pure HTML5 2D Canvas radar engine, presets (Android, Full-Stack, AI, DevOps), local storage, and export tools.' },
    { name: 'manifest.json', role: 'Allows you to "Add to Home Screen" as a standalone PWA on Android.' },
    { name: 'README.md', role: 'Quick instructions and documentation for future reference on your phone.' }
  ];

  fileInfo.forEach(f => {
    checkPageBreak(12);
    doc.setFont('courier', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(2, 132, 199);
    doc.text(f.name, margin + 2, y + 4);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    const splitRole = doc.splitTextToSize(f.role, contentWidth - 36);
    doc.text(splitRole, margin + 34, y + 4);
    y += 9;
  });

  y += 4;
  checkPageBreak(25);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text('4. Customizing Your Skills in Spck Editor', margin, y);
  y += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  const customGuide = 'You have two ways to adjust and add skills:\n' +
    '1. Visual UI: Open the live preview, tap "+ Add Skill", or use the interactive sliders directly on your phone.\n' +
    '2. In Code: Open app.js in Spck Editor, find the PRESET_DATA object near line 10, and customize names, default current scores, target goals, and categories. Save the file (Ctrl+S or Spck save button) and refresh preview!';
  const splitCustom = doc.splitTextToSize(customGuide, contentWidth);
  doc.text(splitCustom, margin, y);
  y += splitCustom.length * 4.8 + 6;

  // Code snippet box
  checkPageBreak(30);
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'F');
  doc.setFont('courier', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(248, 250, 252);
  doc.text('// Example skill item in app.js:', margin + 4, y + 5);
  doc.setTextColor(56, 189, 248);
  doc.text('{ id: "1", name: "Kotlin", category: "Language", current: 85, target: 95,', margin + 4, y + 11);
  doc.text('  notes: "Mastering coroutines & context receivers" },', margin + 4, y + 16);
  y += 30;

  // Section 5: Offline & Storage Tips
  checkPageBreak(30);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text('5. Offline Storage & Backup Tips', margin, y);
  y += 7;

  const storageTips = [
    '• Auto-Save: Every adjustment is automatically saved to your mobile browser\'s localStorage.',
    '• Backup JSON: Tap "Backup JSON" at the bottom of the app to save your custom profile as a .json file.',
    '• Restore JSON: If you switch devices, tap "Restore JSON" and select your previously saved backup.',
    '• Export PNG: Tap "Save PNG Chart" to generate a high-resolution snapshot of your radar polygon to share on GitHub or LinkedIn!'
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  storageTips.forEach(tip => {
    doc.text(tip, margin + 2, y);
    y += 5.5;
  });

  // Footer note
  y += 6;
  doc.setFillColor(240, 253, 244);
  doc.rect(margin, y, contentWidth, 14, 'F');
  doc.setDrawColor(187, 247, 208);
  doc.rect(margin, y, contentWidth, 14, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(22, 101, 52);
  doc.text('Congratulations!', margin + 4, y + 5.5);
  doc.setFont('helvetica', 'normal');
  doc.text('You now have a fully portable, professional Skill Radar app running on your Android phone!', margin + 4, y + 10);

  const pdfPath = path.join(downloadsDir, 'Spck_Editor_Skill_Radar_Guide.pdf');
  doc.save(pdfPath);
  console.log(`PDF created successfully at: ${pdfPath}`);
}

async function run() {
  await buildZip();
  buildPdf();
  console.log('All static downloads created successfully!');
}

run().catch(console.error);
