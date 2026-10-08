import React, { useState, useEffect } from 'react';
import { Copy, Check, FileCode, FileText, Code2, Sparkles } from 'lucide-react';
import { SPCK_FILE_TEMPLATES } from '../data/presets';

export const CodeViewer: React.FC = () => {
  const [activeFile, setActiveFile] = useState<string>('index.html');
  const [fileContents, setFileContents] = useState<Record<string, string>>(SPCK_FILE_TEMPLATES);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch live files from /spck-app/
  useEffect(() => {
    async function loadFiles() {
      try {
        const [resHtml, resCss, resJs, resManifest, resReadme] = await Promise.all([
          fetch('/spck-app/index.html').then(r => r.text()),
          fetch('/spck-app/style.css').then(r => r.text()),
          fetch('/spck-app/app.js').then(r => r.text()),
          fetch('/spck-app/manifest.json').then(r => r.text()),
          fetch('/spck-app/README.md').then(r => r.text()),
        ]);

        setFileContents({
          'index.html': resHtml,
          'style.css': resCss,
          'app.js': resJs,
          'manifest.json': resManifest,
          'README.md': resReadme,
        });
      } catch (e) {
        console.warn('Could not fetch external files, using templates', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadFiles();
  }, []);

  const currentCode = fileContents[activeFile] || '';
  const lines = currentCode.split('\n');
  const fileSizeKB = (new Blob([currentCode]).size / 1024).toFixed(1);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getFileIcon = (file: string) => {
    if (file.endsWith('.html')) return <Code2 className="w-3.5 h-3.5 text-orange-400" />;
    if (file.endsWith('.css')) return <FileCode className="w-3.5 h-3.5 text-sky-400" />;
    if (file.endsWith('.js')) return <FileCode className="w-3.5 h-3.5 text-amber-400" />;
    return <FileText className="w-3.5 h-3.5 text-slate-400" />;
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* File Navigation & Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900 border border-slate-800 p-2 rounded-xl">
        {/* File Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto text-xs py-0.5">
          {Object.keys(fileContents).map((fileName) => {
            const isActive = activeFile === fileName;
            return (
              <button
                key={fileName}
                onClick={() => setActiveFile(fileName)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono transition-colors ${
                  isActive
                    ? 'bg-slate-800 text-slate-100 font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {getFileIcon(fileName)}
                <span>{fileName}</span>
              </button>
            );
          })}
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
            {lines.length} lines &middot; {fileSizeKB} KB
          </span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy File</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Editor Container */}
      <div className="relative rounded-xl border border-slate-800 bg-slate-950/90 overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/50 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
            <span className="ml-2 text-slate-300 font-medium">/{activeFile}</span>
          </div>
          <span>UTF-8 &middot; Ready for Spck Editor</span>
        </div>

        {/* Code Content */}
        <div className="max-h-[560px] overflow-auto p-4 font-mono text-xs text-slate-300 leading-relaxed">
          <pre className="table w-full">
            <code>
              {lines.map((line, idx) => (
                <div key={idx} className="table-row hover:bg-slate-900/40">
                  <span className="table-cell select-none pr-4 text-right text-slate-600 text-[10px] w-8">
                    {idx + 1}
                  </span>
                  <span className="table-cell whitespace-pre">{line || ' '}</span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
