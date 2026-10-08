import React, { useState, useRef } from 'react';
import { Smartphone, RotateCw, ExternalLink, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';

export const SpckSimulator: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [deviceModel, setDeviceModel] = useState<'pixel' | 'galaxy' | 'tablet'>('pixel');
  const [isLandscape, setIsLandscape] = useState(false);
  const [isReloading, setIsReloading] = useState(false);

  const handleReload = () => {
    setIsReloading(true);
    if (iframeRef.current) {
      iframeRef.current.src = '/spck-app/index.html?t=' + Date.now();
    }
    setTimeout(() => setIsReloading(false), 500);
  };

  const getDimensions = () => {
    if (deviceModel === 'pixel') {
      return isLandscape ? { w: 680, h: 360 } : { w: 380, h: 720 };
    }
    if (deviceModel === 'galaxy') {
      return isLandscape ? { w: 720, h: 360 } : { w: 390, h: 740 };
    }
    return isLandscape ? { w: 800, h: 540 } : { w: 540, h: 760 };
  };

  const dims = getDimensions();

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Simulator Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 w-full bg-slate-900 border border-slate-800 p-3 rounded-xl">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-semibold text-slate-200">
            Spck Editor Android Live Emulator
          </span>
          <span className="text-xs text-slate-500">·</span>
          <span className="text-xs text-emerald-400">100% Vanilla HTML5 + CSS + JS</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Device Model Selector */}
          <select
            value={deviceModel}
            onChange={(e) => setDeviceModel(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 outline-none"
          >
            <option value="pixel">Google Pixel 7 (380x720)</option>
            <option value="galaxy">Galaxy S23 (390x740)</option>
            <option value="tablet">Android Tablet (540x760)</option>
          </select>

          {/* Rotate Orientation */}
          <button
            onClick={() => setIsLandscape(!isLandscape)}
            className={`p-1.5 rounded-lg border text-xs transition-colors ${
              isLandscape
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
            title="Rotate Orientation"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          {/* Refresh Frame */}
          <button
            onClick={handleReload}
            disabled={isReloading}
            className="p-1.5 rounded-lg border bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200 transition-colors"
            title="Reload Preview"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isReloading ? 'animate-spin text-sky-400' : ''}`} />
          </button>

          {/* Open full page */}
          <a
            href="/spck-app/index.html"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Standalone</span>
          </a>
        </div>
      </div>

      {/* Simulated Android Device Frame */}
      <div className="relative flex justify-center w-full py-2">
        <div
          className="relative bg-slate-950 rounded-[38px] p-3 shadow-2xl border-4 border-slate-700/80 transition-all duration-300"
          style={{ width: `${dims.w}px`, height: `${dims.h}px`, maxWidth: '100%' }}
        >
          {/* Device Speaker / Camera Punch-hole */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-900 rounded-full flex items-center justify-center gap-2 z-20">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
          </div>

          {/* Spck Internal Browser Bar Simulation */}
          <div className="w-full bg-slate-900 border-b border-slate-800 rounded-t-[26px] px-3 py-1.5 flex items-center justify-between text-[10px] text-slate-400 font-mono mb-1">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              localhost:8080/index.html
            </span>
            <span>Spck Preview</span>
          </div>

          {/* Iframe Viewport */}
          <div className="w-full h-[calc(100%-48px)] rounded-[22px] overflow-hidden bg-slate-950">
            <iframe
              ref={iframeRef}
              src="/spck-app/index.html"
              title="Spck Mobile Vanilla App"
              className="w-full h-full border-0 select-none"
            />
          </div>

          {/* Android Bottom Navigation Pill */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-slate-500/40 rounded-full"></div>
        </div>
      </div>

      {/* Feature Explainer */}
      <div className="w-full max-w-2xl bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 flex flex-col gap-2">
        <div className="flex items-center gap-2 font-semibold text-slate-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          Why this runs effortlessly in Spck Editor:
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400 text-[11px] list-disc list-inside">
          <li>Pure HTML5 Canvas 2D engine (no heavy external chart libraries).</li>
          <li>Zero NPM dependencies — no build step, no Webpack, no Vite needed.</li>
          <li>Auto-saves state directly in Android's Webview local storage.</li>
          <li>Supports high-DPI retina display scaling for pin-sharp mobile rendering.</li>
        </ul>
      </div>
    </div>
  );
};
