import React, { useState } from 'react';
import { Download, FileDown, Smartphone, Play, Code2, FolderArchive, HelpCircle, CheckCircle2, Printer } from 'lucide-react';
import { generateSpckGuidePdf } from '../utils/pdfGenerator';
import { SkillItem } from '../types';

interface SetupGuideProps {
  skills: SkillItem[];
  presetName: string;
  onDownloadZip: () => void;
}

export const SetupGuide: React.FC<SetupGuideProps> = ({ skills, presetName, onDownloadZip }) => {
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const handleDownloadPdf = () => {
    setDownloadingPdf(true);
    try {
      generateSpckGuidePdf(skills, presetName);
    } catch (e) {
      console.error(e);
      // Fallback: direct download link
      window.open('/downloads/Spck_Editor_Skill_Radar_Guide.pdf', '_blank');
    } finally {
      setTimeout(() => setDownloadingPdf(false), 800);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full max-w-4xl mx-auto">
      {/* Top Action Box */}
      <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">
            Official Spck Editor Android Handbook
          </span>
          <h2 className="text-lg font-bold text-slate-100 mt-1">
            Setting Up SkillRadar on Android Spck Editor
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Everything you need: Download the complete standalone ZIP package and the printable PDF handbook for offline reference on your phone.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={onDownloadZip}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-colors cursor-pointer"
          >
            <FolderArchive className="w-4 h-4" />
            <span>Download Project ZIP</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={downloadingPdf}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 shadow transition-colors cursor-pointer"
          >
            <FileDown className="w-4 h-4 text-rose-400" />
            <span>{downloadingPdf ? 'Generating PDF...' : 'Download PDF Guide'}</span>
          </button>

          <a
            href="/downloads/Spck_Editor_Skill_Radar_Guide.pdf"
            download="Spck_Editor_Skill_Radar_Guide.pdf"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 transition-colors"
            title="Direct link fallback"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Direct PDF</span>
          </a>
        </div>
      </div>

      {/* Step by Step Visual Guide */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-slate-200">
          Step-by-Step Setup Walkthrough
        </h3>

        {/* Step 1 */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-500/40 text-indigo-400 flex items-center justify-center font-mono font-bold text-base shrink-0">
            01
          </div>
          <div className="flex-1 text-xs">
            <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              Install Spck Editor on Your Android Device
            </h4>
            <p className="text-slate-400 mt-1.5 leading-relaxed">
              Open the <strong>Google Play Store</strong> on your Android phone or tablet. Search for <strong>"Spck Editor"</strong> (by Spck). Tap <strong>Install</strong>. It is a completely free, lightweight code editor that allows you to run HTML, CSS, and JavaScript projects with a built-in mobile web server and browser inspector.
            </p>
            <div className="mt-2.5 p-2 rounded-lg bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-300 font-mono">
              Package: io.spck &middot; Requirements: Android 5.0+ &middot; No root or account needed
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row gap-4">
          <div className="w-10 h-10 rounded-xl bg-sky-950 border border-sky-500/40 text-sky-400 flex items-center justify-center font-mono font-bold text-base shrink-0">
            02
          </div>
          <div className="flex-1 text-xs">
            <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              Download and Import the Project ZIP
            </h4>
            <p className="text-slate-400 mt-1.5 leading-relaxed">
              Tap the <strong>"Download Project ZIP"</strong> button above. The file <code>skill-radar-spck-android.zip</code> will download to your phone's <code>Download</code> directory.
            </p>
            <div className="mt-2 space-y-1 text-slate-300">
              <div className="flex items-start gap-1.5">
                <span className="text-indigo-400 font-bold">•</span>
                <span>Open <strong>Spck Editor</strong> on your Android device.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-indigo-400 font-bold">•</span>
                <span>On the main screen or sidebar menu, tap the <strong>+ (New Project)</strong> icon.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-indigo-400 font-bold">•</span>
                <span>Select <strong>"Import Zip"</strong>.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-indigo-400 font-bold">•</span>
                <span>Browse to your phone's <strong>Download</strong> folder and select <code>skill-radar-spck-android.zip</code>.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-indigo-400 font-bold">•</span>
                <span>Spck will automatically extract the files into a project folder named <strong>SkillRadar</strong>.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-mono font-bold text-base shrink-0">
            03
          </div>
          <div className="flex-1 text-xs">
            <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              Run the Live Preview (Tap Play ▶️)
            </h4>
            <p className="text-slate-400 mt-1.5 leading-relaxed">
              Inside Spck Editor's project file tree, tap on <code>index.html</code> to open the editor.
            </p>
            <div className="mt-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
              Look at the top toolbar in Spck Editor and tap the green <strong>Play (▶️)</strong> button. Spck's internal web server will immediately boot and render your interactive Skill Radar chart in the built-in browser!
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-500/40 text-purple-400 flex items-center justify-center font-mono font-bold text-base shrink-0">
            04
          </div>
          <div className="flex-1 text-xs">
            <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              Customizing Skills & Code on Mobile
            </h4>
            <p className="text-slate-400 mt-1.5 leading-relaxed">
              You can adjust skills either through the live preview touch sliders or directly inside <code>app.js</code>:
            </p>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="font-semibold text-sky-400 block mb-1">Option A: Via App UI</span>
                <span className="text-slate-400 text-[11px]">
                  Use the sliders to adjust scores in real-time or tap <strong>+ Add Skill</strong> to register new skills directly from your phone.
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="font-semibold text-purple-400 block mb-1">Option B: In Code (`app.js`)</span>
                <span className="text-slate-400 text-[11px]">
                  Open <code>app.js</code> in Spck Editor, edit the <code>PRESET_DATA</code> object, save the file, and refresh preview.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-500/40 text-amber-400 flex items-center justify-center font-mono font-bold text-base shrink-0">
            05
          </div>
          <div className="flex-1 text-xs">
            <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              Add to Android Home Screen (PWA Mode)
            </h4>
            <p className="text-slate-400 mt-1.5 leading-relaxed">
              When viewing the app in Spck preview, tap the browser menu (or open in Chrome via Spck's <em>Open in Browser</em> icon) and choose <strong>"Add to Home Screen"</strong>. The app will install as a standalone mobile app with its own icon on your Android home screen!
            </p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col gap-3">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-sky-400" />
          Frequently Asked Questions & Mobile Tips
        </h3>

        <div className="space-y-2 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="font-semibold text-slate-200 mb-1">Does this require an internet connection?</div>
            <div className="text-slate-400 leading-relaxed">
              No! The entire project is written in vanilla HTML5, CSS3, and ES6 JavaScript. All fonts, styles, and radar rendering algorithms are self-contained without any external CDNs. It works 100% offline in Spck Editor.
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="font-semibold text-slate-200 mb-1">What if Spck Editor fails to import the zip?</div>
            <div className="text-slate-400 leading-relaxed">
              If your Android file picker restricts zip importing, you can extract the zip using your phone's built-in "Files" app (or ZArchiver/Solid Explorer), then in Spck tap <strong>"+" &rarr; "Open Directory"</strong> and select the extracted folder. Alternatively, copy the code from the <em>Spck Code Hub</em> tab directly into new files inside Spck.
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="font-semibold text-slate-200 mb-1">How is my data saved on Android?</div>
            <div className="text-slate-400 leading-relaxed">
              The app automatically saves your customized skills to Android WebView's <code>localStorage</code>. It also provides a <strong>Backup JSON</strong> button to export your skills to Google Drive or WhatsApp, and a <strong>Restore JSON</strong> button to load them back.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
