import { jsPDF } from 'jspdf';
import { SkillItem } from '../types';

export function generateSpckGuidePdf(skills?: SkillItem[], presetName?: string): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = 18;

  function checkPageBreak(requiredHeight: number) {
    if (y + requiredHeight > pageHeight - 18) {
      doc.addPage();
      drawPageHeaderFooter();
      y = 20;
    }
  }

  function drawPageHeaderFooter() {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('SkillRadar &middot; Spck Editor Android Setup Handbook', margin, 10);
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, 12, pageWidth - margin, 12);

    const pageCount = doc.getNumberOfPages();
    doc.text(`Page ${pageCount}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
    doc.text('Portable 100% Offline Mobile Web Developer Suite', margin, pageHeight - 10);
  }

  // --- COVER BANNER ---
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(margin, y, contentWidth, 36, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('SkillRadar: Spck Editor Android Guide', margin + 8, y + 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Step-by-Step Setup, Mobile Live Preview & Skill Customization', margin + 8, y + 24);

  y += 46;

  // Metadata Card
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, y, contentWidth, 22, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.rect(margin, y, contentWidth, 22, 'D');

  doc.setFontSize(9);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.text('Environment: Android (Spck Code Editor / WebView) &middot; Zero Node/npm Build Required', margin + 6, y + 8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Language: Pure Vanilla HTML5 + Modern CSS + ES6 JavaScript | Preset: ${presetName || 'Android Developer'}`, margin + 6, y + 15);

  y += 30;

  // Section 1
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text('1. Introduction: What is Spck Editor?', margin, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  const introText = 'Spck Editor is a leading mobile code editor for Android that lets you write, run, and preview HTML, CSS, and JavaScript projects directly on your phone or tablet without needing a laptop or terminal server. It includes built-in live preview with a console inspector, Git cloning/pushing, and zip file extraction.';
  const splitIntro = doc.splitTextToSize(introText, contentWidth);
  doc.text(splitIntro, margin, y);
  y += splitIntro.length * 5 + 4;

  // Section 2: Steps
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text('2. Step-by-Step Installation Instructions', margin, y);
  y += 6;

  const steps = [
    {
      title: 'Step 1: Download & Install Spck Editor',
      body: 'Open Google Play Store on your Android device. Search for "Spck Editor" (by Spck). Tap Install. It is free and requires no sign-up or root permissions.'
    },
    {
      title: 'Step 2: Download the Project ZIP',
      body: 'Download "skill-radar-spck-android.zip" from this app onto your Android device. It will save into your device\'s "Download" folder.'
    },
    {
      title: 'Step 3: Import into Spck Editor',
      body: 'Open Spck Editor. On the home/projects screen, tap the "+" (Plus) button or open the left drawer. Select "Import Zip". Browse into your "Download" folder and choose "skill-radar-spck-android.zip". Spck will instantly unzip all files into a new project.'
    },
    {
      title: 'Step 4: Launch Live Preview',
      body: 'Tap on "index.html" to open the code editor. Then tap the green Play (▶) icon in the top right header. The interactive Skill Radar will start immediately inside Spck\'s built-in web browser!'
    }
  ];

  steps.forEach(st => {
    checkPageBreak(22);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(79, 70, 229);
    doc.text(st.title, margin + 4, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    const splitBody = doc.splitTextToSize(st.body, contentWidth - 8);
    doc.text(splitBody, margin + 4, y + 11.5);

    y += 22;
  });

  // PAGE 2
  doc.addPage();
  drawPageHeaderFooter();
  y = 20;

  // Section 3
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text('3. Project Files & Architecture', margin, y);
  y += 7;

  const files = [
    { name: 'index.html', desc: 'Main HTML5 structure with responsive viewport, Canvas tag, modal dialog, and buttons.' },
    { name: 'style.css', desc: 'Modern CSS with dark/light themes, touch sliders (>=44px), and mobile card layout.' },
    { name: 'app.js', desc: 'Pure vanilla JavaScript radar chart engine, local storage persistence, and gap analysis.' },
    { name: 'manifest.json', desc: 'Android Web App Manifest for installing the radar directly to your home screen.' },
    { name: 'README.md', desc: 'Offline quick-reference documentation stored inside your phone.' }
  ];

  files.forEach(f => {
    checkPageBreak(12);
    doc.setFont('courier', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(2, 132, 199);
    doc.text(f.name, margin + 2, y + 4);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    const splitDesc = doc.splitTextToSize(f.desc, contentWidth - 36);
    doc.text(splitDesc, margin + 34, y + 4);
    y += 10;
  });

  y += 4;
  checkPageBreak(25);

  // Section 4
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text('4. Customizing Your Competencies', margin, y);
  y += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  const editGuide = 'You can customize your competencies in two quick ways:\n' +
    '1. Through the Mobile Interface: Open preview, tap "+ Add Skill", or use the live sliders.\n' +
    '2. Directly in app.js: Open app.js in Spck, locate the PRESET_DATA dictionary, and edit names, scores, or categories. Save and re-run.';
  const splitEdit = doc.splitTextToSize(editGuide, contentWidth);
  doc.text(splitEdit, margin, y);
  y += splitEdit.length * 4.8 + 6;

  // Code Snippet Box
  checkPageBreak(30);
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'F');
  doc.setFont('courier', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(248, 250, 252);
  doc.text('// In app.js (lines 10-25):', margin + 4, y + 5);
  doc.setTextColor(56, 189, 248);
  doc.text('{ id: "1", name: "Kotlin", category: "Language", current: 85, target: 95 },', margin + 4, y + 11);
  doc.text('{ id: "2", name: "Jetpack Compose", category: "Framework", current: 75, target: 90 }', margin + 4, y + 16);
  y += 30;

  // Section 5
  checkPageBreak(30);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text('5. Pro-Tips for Android Developers in Spck', margin, y);
  y += 7;

  const tips = [
    '• Install to Home Screen: In Spck preview, tap the browser menu (three dots) -> "Add to Home Screen" to use it as a standalone app.',
    '• Offline Reliability: All styles and JavaScript logic are bundled locally with zero external CDNs.',
    '• Backup & Share: Use "Backup JSON" at the bottom of the app to export your skillset to your Google Drive or email.',
    '• Git Sync: Spck has built-in Git support! You can push your SkillRadar repo directly to your GitHub repository.'
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  tips.forEach(t => {
    doc.text(t, margin + 2, y);
    y += 5.5;
  });

  // Green note
  y += 6;
  doc.setFillColor(240, 253, 244);
  doc.rect(margin, y, contentWidth, 14, 'F');
  doc.setDrawColor(187, 247, 208);
  doc.rect(margin, y, contentWidth, 14, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(22, 101, 52);
  doc.text('Ready to Code!', margin + 4, y + 5.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Enjoy building and tracking your developer career path right from your Android device!', margin + 4, y + 10);

  doc.save('Spck_Editor_Skill_Radar_Guide.pdf');
}
