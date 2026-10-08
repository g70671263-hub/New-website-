import React, { useRef, useState, useMemo } from 'react';
import { SkillItem } from '../types';
import { Camera, Check, Target, Eye, EyeOff } from 'lucide-react';

interface RadarChartProps {
  skills: SkillItem[];
  showTarget: boolean;
  onToggleTarget: () => void;
  showLabels: boolean;
  onToggleLabels: () => void;
  onUpdateSkillValue?: (id: string, type: 'current' | 'target', value: number) => void;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  skills,
  showTarget,
  onToggleTarget,
  showLabels,
  onToggleLabels,
  onUpdateSkillValue
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeDrag, setActiveDrag] = useState<{ id: string; type: 'current' | 'target' } | null>(null);

  const size = 480;
  const center = size / 2;
  const radius = center - 65;
  const count = skills.length;

  const angleStep = count > 0 ? (Math.PI * 2) / count : 0;
  const startAngle = -Math.PI / 2;

  // Concentric Web Levels
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Polygon Points Calculation
  const { currentPoints, targetPoints, axes } = useMemo(() => {
    if (count < 3) return { currentPoints: '', targetPoints: '', axes: [] };

    const cPts: string[] = [];
    const tPts: string[] = [];
    const axList = [];

    for (let i = 0; i < count; i++) {
      const angle = startAngle + i * angleStep;
      const skill = skills[i];

      const cDist = (Math.max(5, Math.min(100, skill.current)) / 100) * radius;
      const tDist = (Math.max(5, Math.min(100, skill.target)) / 100) * radius;

      const cx = center + Math.cos(angle) * cDist;
      const cy = center + Math.sin(angle) * cDist;

      const tx = center + Math.cos(angle) * tDist;
      const ty = center + Math.sin(angle) * tDist;

      cPts.push(`${cx.toFixed(1)},${cy.toFixed(1)}`);
      tPts.push(`${tx.toFixed(1)},${ty.toFixed(1)}`);

      // Outer Axis Endpoint
      const endX = center + Math.cos(angle) * radius;
      const endY = center + Math.sin(angle) * radius;

      // Label Position
      const labelDist = radius + 26;
      const labelX = center + Math.cos(angle) * labelDist;
      const labelY = center + Math.sin(angle) * labelDist;

      axList.push({
        index: i,
        skill,
        angle,
        endX,
        endY,
        labelX,
        labelY,
        currentPos: { x: cx, y: cy },
        targetPos: { x: tx, y: ty },
      });
    }

    return {
      currentPoints: cPts.join(' '),
      targetPoints: tPts.join(' '),
      axes: axList,
    };
  }, [skills, count, radius, center, angleStep, startAngle]);

  // Export Chart as PNG
  const handleExportPng = () => {
    if (!svgRef.current) return;
    const svgEl = svgRef.current;
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const canvas = document.createElement('canvas');
    canvas.width = size * 2;
    canvas.height = size * 2;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(2, 2);
    // Draw background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, size, size);

    const img = new Image();
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      const pngUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = `skill-radar-chart-${Date.now()}.png`;
      a.click();
    };
    img.src = url;
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Language': return 'text-sky-400';
      case 'Framework': return 'text-emerald-400';
      case 'Architecture': return 'text-amber-400';
      case 'Tooling': return 'text-pink-400';
      case 'SoftSkill': return 'text-indigo-400';
      default: return 'text-slate-300';
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Top Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 w-full mb-3 px-1 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTarget}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-medium transition-colors border ${
              showTarget
                ? 'bg-purple-950/40 text-purple-300 border-purple-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            Target Goals Layer
          </button>

          <button
            onClick={onToggleLabels}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-medium transition-colors border ${
              showLabels
                ? 'bg-slate-800 text-slate-200 border-slate-700'
                : 'bg-slate-900 text-slate-400 border-slate-800'
            }`}
          >
            {showLabels ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            Metric Labels
          </button>
        </div>

        <button
          onClick={handleExportPng}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          title="Save Chart as Image"
        >
          <Camera className="w-3.5 h-3.5 text-sky-400" />
          Export PNG
        </button>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center p-2 rounded-xl bg-slate-900/60 border border-slate-800 shadow-inner">
        {count < 3 ? (
          <div className="text-center text-slate-400 text-sm">
            Add at least 3 skills to render the radar chart.
          </div>
        ) : (
          <svg
            ref={svgRef}
            viewBox={`0 0 ${size} ${size}`}
            className="w-full h-full select-none"
            style={{ overflow: 'visible' }}
          >
            <defs>
              {/* Cyan / Blue Gradient for Current */}
              <linearGradient id="currentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.38" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.22" />
              </linearGradient>

              {/* Purple Gradient for Target */}
              <linearGradient id="targetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#9333ea" stopOpacity="0.08" />
              </linearGradient>
            </defs>

            {/* Concentric Grid Rings */}
            {levels.map((level) => {
              const r = radius * level;
              const ringPts = [];
              for (let i = 0; i < count; i++) {
                const angle = startAngle + i * angleStep;
                const rx = center + Math.cos(angle) * r;
                const ry = center + Math.sin(angle) * r;
                ringPts.push(`${rx.toFixed(1)},${ry.toFixed(1)}`);
              }
              return (
                <g key={level}>
                  <polygon
                    points={ringPts.join(' ')}
                    fill="none"
                    stroke="#334155"
                    strokeWidth="1"
                    strokeOpacity={level === 1.0 ? '0.7' : '0.35'}
                  />
                  {showLabels && (
                    <text
                      x={center}
                      y={center - r + 3}
                      fill="#64748b"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                      dominantBaseline="auto"
                    >
                      {Math.round(level * 100)}%
                    </text>
                  )}
                </g>
              );
            })}

            {/* Spokes (Center to Perimeter) */}
            {axes.map((ax) => (
              <line
                key={`spoke-${ax.index}`}
                x1={center}
                y1={center}
                x2={ax.endX}
                y2={ax.endY}
                stroke="#334155"
                strokeWidth="1"
                strokeOpacity="0.6"
              />
            ))}

            {/* Target Polygon Layer (Violet / Dashed) */}
            {showTarget && targetPoints && (
              <g>
                <polygon
                  points={targetPoints}
                  fill="url(#targetGradient)"
                  stroke="#a855f7"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                {axes.map((ax) => (
                  <circle
                    key={`target-pt-${ax.index}`}
                    cx={ax.targetPos.x}
                    cy={ax.targetPos.y}
                    r={hoveredIdx === ax.index ? 4.5 : 3}
                    fill="#c084fc"
                    stroke="#581c87"
                    strokeWidth="1.5"
                    className="transition-transform"
                  />
                ))}
              </g>
            )}

            {/* Current Polygon Layer (Cyan / Sky) */}
            {currentPoints && (
              <g>
                <polygon
                  points={currentPoints}
                  fill="url(#currentGradient)"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                />
                {axes.map((ax) => {
                  const isHovered = hoveredIdx === ax.index;
                  return (
                    <g key={`cur-pt-${ax.index}`}>
                      <circle
                        cx={ax.currentPos.x}
                        cy={ax.currentPos.y}
                        r={isHovered ? 6 : 4}
                        fill="#ffffff"
                        stroke="#0284c7"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:scale-125"
                        onMouseEnter={() => setHoveredIdx(ax.index)}
                        onMouseLeave={() => setHoveredIdx(null)}
                      />
                    </g>
                  );
                })}
              </g>
            )}

            {/* Axis Labels (Perimeter) */}
            {axes.map((ax) => {
              const isHovered = hoveredIdx === ax.index;
              const cos = Math.cos(ax.angle);
              const sin = Math.sin(ax.angle);

              let textAnchor: 'start' | 'middle' | 'end' = 'middle';
              if (cos > 0.25) textAnchor = 'start';
              else if (cos < -0.25) textAnchor = 'end';

              let baseline: 'central' | 'hanging' | 'auto' = 'central';
              if (sin > 0.35) baseline = 'hanging';
              else if (sin < -0.35) baseline = 'auto';

              return (
                <g
                  key={`label-${ax.index}`}
                  className="cursor-pointer group"
                  onMouseEnter={() => setHoveredIdx(ax.index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <text
                    x={ax.labelX}
                    y={ax.labelY}
                    textAnchor={textAnchor}
                    dominantBaseline={baseline}
                    fontSize={isHovered ? '12' : '11'}
                    fontWeight={isHovered ? '700' : '500'}
                    fill={isHovered ? '#38bdf8' : '#e2e8f0'}
                    className="transition-colors font-sans"
                  >
                    {ax.skill.name}
                  </text>
                  {showLabels && (
                    <text
                      x={ax.labelX}
                      y={ax.labelY + (sin > 0 ? 14 : -12)}
                      textAnchor={textAnchor}
                      dominantBaseline={baseline}
                      fontSize="9"
                      fontFamily="monospace"
                      fill={isHovered ? '#7dd3fc' : '#94a3b8'}
                    >
                      {ax.skill.current}%
                      {showTarget && ` · ${ax.skill.target}%`}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        )}

        {/* Hover Tooltip Overlay */}
        {hoveredIdx !== null && skills[hoveredIdx] && (
          <div className="absolute top-3 right-3 bg-slate-950/95 border border-sky-500/40 p-2.5 rounded-lg text-xs shadow-xl backdrop-blur-sm z-20 min-w-[140px] pointer-events-none">
            <div className="font-semibold text-slate-100 flex items-center justify-between gap-2">
              <span>{skills[hoveredIdx].name}</span>
              <span className={`text-[10px] font-mono ${getCategoryColor(skills[hoveredIdx].category)}`}>
                {skills[hoveredIdx].category}
              </span>
            </div>
            <div className="mt-1.5 flex items-center justify-between text-slate-300 font-mono text-[11px]">
              <span className="text-sky-400">Current: {skills[hoveredIdx].current}%</span>
              {showTarget && <span className="text-purple-400">Target: {skills[hoveredIdx].target}%</span>}
            </div>
            {skills[hoveredIdx].notes && (
              <p className="mt-1 text-[10px] text-slate-400 italic line-clamp-2">
                "{skills[hoveredIdx].notes}"
              </p>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-3 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-1.5 rounded-sm bg-sky-400"></span>
          <span>Current Level</span>
        </div>
        {showTarget && (
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1.5 rounded-sm bg-purple-500"></span>
            <span>Target Goal</span>
          </div>
        )}
      </div>
    </div>
  );
};
