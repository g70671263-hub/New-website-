import React, { useState } from 'react';
import { HiringPost } from '../types/business';
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Sparkles,
  ExternalLink,
  FileText,
  CheckCircle2,
  Filter,
  Copy,
  Check,
  Building2,
  RefreshCw
} from 'lucide-react';

interface HiringPostsRadarProps {
  jobs: HiringPost[];
  skill: string;
  country: string;
  isLoading: boolean;
  onRefresh: () => void;
}

export const HiringPostsRadar: React.FC<HiringPostsRadarProps> = ({
  jobs,
  skill,
  country,
  isLoading,
  onRefresh,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedProposalJob, setSelectedProposalJob] = useState<HiringPost | null>(null);
  const [copiedProposal, setCopiedProposal] = useState(false);

  const filteredJobs = jobs.filter((j) => {
    if (filterType === 'all') return true;
    if (filterType === 'remote') return j.location.toLowerCase().includes('remote');
    return j.type.toLowerCase() === filterType.toLowerCase();
  });

  const handleCopyProposal = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedProposal(true);
    setTimeout(() => setCopiedProposal(false), 2000);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-sky-400" />
            <h2 className="text-base font-bold text-slate-100">
              Hiring, Gigs & Need Posts Radar
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time opportunities for <span className="text-indigo-400 font-semibold">"{skill}"</span> in <span className="text-slate-200 font-semibold">{country}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Filter Types */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 p-1 rounded-xl text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filterType === 'all'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({jobs.length})
            </button>
            <button
              onClick={() => setFilterType('Freelance')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filterType === 'Freelance'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Freelance / Gigs
            </button>
            <button
              onClick={() => setFilterType('Contract')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filterType === 'Contract'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Contract
            </button>
            <button
              onClick={() => setFilterType('Full-time')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filterType === 'Full-time'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Full-time
            </button>
            <button
              onClick={() => setFilterType('remote')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filterType === 'remote'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Remote
            </button>
          </div>

          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-sky-400' : ''}`} />
            <span>Refresh Posts</span>
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-400">
          <RefreshCw className="w-7 h-7 animate-spin text-indigo-400" />
          <span className="text-xs font-medium">Scanning live hiring & need posts in {country}...</span>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/40">
          <Briefcase className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-slate-300">No active posts found</h3>
          <p className="text-xs text-slate-500 mt-1">Try widening your search or refreshing results.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-3.5 transition-all shadow-md"
            >
              {/* Header */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950/60 border border-sky-800/60 px-2 py-0.5 rounded-md">
                      {job.type}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {job.posted}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5 rounded-md">
                    <Sparkles className="w-3 h-3" />
                    <span>{job.matchRate}% Match</span>
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-100 hover:text-indigo-300 transition-colors mt-1">
                  {job.title}
                </h3>

                <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
                  <span className="flex items-center gap-1 text-slate-200 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    {job.company}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {job.location}
                  </span>
                  <span>·</span>
                  <span className="font-mono text-emerald-300 font-semibold">
                    {job.budget}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                {job.description}
              </p>

              {/* Key Requirements */}
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col gap-1 text-xs">
                <span className="text-[10px] uppercase font-mono text-slate-400 font-semibold">
                  Required Skills & Need:
                </span>
                <ul className="grid grid-cols-1 gap-1 text-[11px] text-slate-300">
                  {job.keyRequirements.slice(0, 3).map((req, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 truncate">
                      <span className="text-sky-400">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                <span className="text-[11px] font-mono text-slate-500">
                  Via {job.platform}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedProposalJob(job)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Proposal Pitch</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tailored Proposal Modal */}
      {selectedProposalJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider font-semibold">
                  Custom AI Proposal & Pitch
                </span>
                <h3 className="text-base font-bold text-slate-100 mt-0.5">
                  Proposal for: {selectedProposalJob.title}
                </h3>
                <p className="text-xs text-slate-400">
                  Company: {selectedProposalJob.company} &middot; {selectedProposalJob.location}
                </p>
              </div>
              <button
                onClick={() => setSelectedProposalJob(null)}
                className="text-slate-400 hover:text-slate-200 text-lg leading-none p-1"
              >
                &times;
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-200 font-mono leading-relaxed max-h-[360px] overflow-y-auto whitespace-pre-wrap">
              {selectedProposalJob.customProposal}
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <span className="text-[11px] text-slate-400">
                Tailored with your skill: <strong>{skill}</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedProposalJob(null)}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200"
                >
                  Close
                </button>
                <button
                  onClick={() => handleCopyProposal(selectedProposalJob.customProposal)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow transition-colors"
                >
                  {copiedProposal ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Full Proposal</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
