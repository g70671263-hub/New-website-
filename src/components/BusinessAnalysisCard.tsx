import React from 'react';
import { AnalyzedBusiness } from '../types/business';
import {
  Star,
  Globe,
  Phone,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  TrendingUp,
  Mail,
  Copy,
  ExternalLink,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface BusinessAnalysisCardProps {
  business: AnalyzedBusiness;
  skill: string;
  isSelected: boolean;
  onSelect: () => void;
  onOpenPitch: (business: AnalyzedBusiness) => void;
}

export const BusinessAnalysisCard: React.FC<BusinessAnalysisCardProps> = ({
  business,
  skill,
  isSelected,
  onSelect,
  onOpenPitch,
}) => {
  const isHighOpp = business.opportunityScore >= 85;

  return (
    <div
      onClick={onSelect}
      className={`relative rounded-2xl p-4 sm:p-5 transition-all cursor-pointer border flex flex-col gap-3.5 ${
        isSelected
          ? 'bg-slate-900 border-indigo-500 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-500/50'
          : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
      }`}
    >
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-bold text-slate-100 hover:text-indigo-300 transition-colors">
              {business.name}
            </h3>
            {business.website ? (
              <a
                href={business.website}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-slate-400 hover:text-sky-400 inline-flex items-center gap-1 text-[11px]"
                title="Open Website"
              >
                <Globe className="w-3 h-3" />
                <span className="truncate max-w-[130px]">
                  {business.website.replace(/^https?:\/\/(www\.)?/, '')}
                </span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            ) : (
              <span className="text-[11px] text-rose-400 font-semibold bg-rose-950/40 border border-rose-800/60 px-2 py-0.5 rounded-md">
                No Website Found
              </span>
            )}
          </div>

          <p className="text-xs text-slate-400 mt-1 line-clamp-1">{business.address}</p>
        </div>

        {/* Opportunity Score Indicator */}
        <div className="flex flex-col items-end shrink-0">
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl font-mono text-xs font-bold border ${
              isHighOpp
                ? 'bg-amber-950/40 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/20'
                : 'bg-indigo-950/40 text-indigo-300 border-indigo-500/40'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>{business.opportunityScore}% Match</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-0.5">Opportunity Level</span>
        </div>
      </div>

      {/* Ratings & Tags Bar */}
      <div className="flex items-center gap-3 text-xs text-slate-400 border-y border-slate-800/80 py-2">
        <div className="flex items-center gap-1 text-slate-200">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="font-bold text-slate-100">{business.rating || 'N/A'}</span>
          <span className="text-slate-500">({business.reviewsCount} reviews)</span>
        </div>
        <span className="text-slate-700">·</span>
        <div className="flex items-center gap-1.5 overflow-hidden text-[11px] text-slate-400">
          {business.types.slice(0, 3).map((t, idx) => (
            <span key={idx} className="capitalize">
              {t.replace(/_/g, ' ')}
              {idx < Math.min(2, business.types.length - 1) && ','}
            </span>
          ))}
        </div>
      </div>

      {/* Detected Weaknesses / Pain Points */}
      <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Identified Pain Points & Opportunities:</span>
        </div>
        <ul className="grid grid-cols-1 gap-1 text-xs text-slate-300 pl-1">
          {business.painPoints.map((point, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <span className="text-rose-400 text-xs leading-tight">•</span>
              <span className="text-slate-300">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Strategic Value: How You Can Help */}
      <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300">
          <Lightbulb className="w-3.5 h-3.5 text-indigo-400" />
          <span>How Your "{skill}" Skill Solves This:</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">{business.howWeCanHelp}</p>
      </div>

      {/* Services to Offer & ROI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
          <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
            Services to Pitch:
          </span>
          <div className="flex flex-wrap gap-1">
            {business.servicesToOffer.map((srv, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium text-slate-200 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-md"
              >
                {srv}
              </span>
            ))}
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-mono text-slate-400 block mb-0.5">
            Estimated Business ROI:
          </span>
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold font-mono text-xs">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{business.estimatedRoi}</span>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between gap-3 pt-1 border-t border-slate-800/60 mt-1">
        <span className="text-[11px] text-slate-500">
          Ready-to-use personalized proposal
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenPitch(business);
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-colors cursor-pointer"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>View Cold Pitch Email</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
