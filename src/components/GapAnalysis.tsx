import React from 'react';
import { SkillItem } from '../types';
import { TrendingUp, Award, Target, AlertCircle } from 'lucide-react';

interface GapAnalysisProps {
  skills: SkillItem[];
}

export const GapAnalysis: React.FC<GapAnalysisProps> = ({ skills }) => {
  const count = skills.length;
  if (count === 0) return null;

  const totalCurrent = skills.reduce((sum, s) => sum + s.current, 0);
  const totalTarget = skills.reduce((sum, s) => sum + s.target, 0);
  const avgCurrent = Math.round(totalCurrent / count);
  const avgTarget = Math.round(totalTarget / count);
  const totalGap = Math.max(0, avgTarget - avgCurrent);

  // Sorted by largest gap
  const prioritizedGaps = [...skills]
    .map(s => ({
      ...s,
      gap: Math.max(0, s.target - s.current)
    }))
    .filter(s => s.gap > 0)
    .sort((a, b) => b.gap - a.gap);

  // Top strengths (highest current scores)
  const topStrengths = [...skills]
    .sort((a, b) => b.current - a.current)
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-3.5 w-full">
      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col">
          <span className="text-[11px] font-medium text-slate-400">Current Average</span>
          <span className="text-xl font-bold font-mono text-sky-400 tabular-nums">{avgCurrent}%</span>
          <span className="text-[10px] text-slate-500 mt-0.5">Across {count} skills</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col">
          <span className="text-[11px] font-medium text-slate-400">Target Average</span>
          <span className="text-xl font-bold font-mono text-purple-400 tabular-nums">{avgTarget}%</span>
          <span className="text-[10px] text-slate-500 mt-0.5">Goal benchmark</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col">
          <span className="text-[11px] font-medium text-slate-400">Average Gap</span>
          <span className="text-xl font-bold font-mono text-amber-400 tabular-nums">+{totalGap}%</span>
          <span className="text-[10px] text-slate-500 mt-0.5">Growth runway</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col">
          <span className="text-[11px] font-medium text-slate-400">Top Focus Priority</span>
          <span className="text-sm font-bold text-slate-100 truncate mt-1">
            {prioritizedGaps[0]?.name || 'All Goals Met'}
          </span>
          <span className="text-[10px] text-amber-400 font-mono">
            {prioritizedGaps[0] ? `+${prioritizedGaps[0].gap}% gap` : 'Optimal state'}
          </span>
        </div>
      </div>

      {/* Two Column Grid: Top Gaps vs Top Strengths */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Growth Priorities */}
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
            <Target className="w-3.5 h-3.5 text-amber-400" />
            Highest Priority Skill Gaps
          </div>

          <div className="flex flex-col gap-2">
            {prioritizedGaps.slice(0, 4).map((item) => (
              <div key={item.id} className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-200">{item.name}</span>
                  <span className="font-mono text-amber-400 font-semibold">+{item.gap}%</span>
                </div>
                <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-400">
                  <span className="font-mono text-sky-400">{item.current}%</span>
                  <div className="flex-1 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-400 to-rose-400 h-full rounded-full"
                      style={{ width: `${Math.min(100, item.gap * 2.5)}%` }}
                    />
                  </div>
                  <span className="font-mono text-purple-400">{item.target}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths */}
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            Top Core Strengths
          </div>

          <div className="flex flex-col gap-2">
            {topStrengths.map((item) => (
              <div key={item.id} className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-200">{item.name}</span>
                  <span className="font-mono text-emerald-400 font-semibold">{item.current}%</span>
                </div>
                <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-400">
                  <div className="flex-1 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${item.current}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500">{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
