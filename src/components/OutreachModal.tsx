import React, { useState } from 'react';
import { AnalyzedBusiness } from '../types/business';
import { Mail, Copy, Check, Sparkles, Building, Globe } from 'lucide-react';

interface OutreachModalProps {
  business: AnalyzedBusiness | null;
  skill: string;
  onClose: () => void;
}

export const OutreachModal: React.FC<OutreachModalProps> = ({ business, skill, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [pitchText, setPitchText] = useState(business ? business.coldPitch : '');

  if (!business) return null;

  const subject = `Question regarding ${business.name}'s digital experience in ${business.address.split(',')[1]?.trim() || 'your area'}`;

  const fullEmail = `Subject: ${subject}\n\nHi ${business.name} Team,\n\n${pitchText}\n\nKey value offer for you:\n${business.servicesToOffer.map((s) => `• ${s}`).join('\n')}\n\nExpected outcome: ${business.estimatedRoi}\n\nWould you be open to a quick 5-minute chat or loom video walkthrough this week?\n\nBest regards,\n[Your Name] - Specialist in ${skill}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-semibold text-indigo-400 uppercase tracking-wider">
                Personalized Cold Outreach Pitch
              </span>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800/60">
                {business.opportunityScore}% Match
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-100 mt-1">
              Outreach for: {business.name}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 truncate max-w-md">
              {business.address}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 text-lg leading-none p-1"
          >
            &times;
          </button>
        </div>

        {/* Value Highlights */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex flex-col gap-1.5">
          <div className="text-indigo-400 font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Why this outreach converts:</span>
          </div>
          <div className="text-slate-300">
            Addresses their exact vulnerability: <em>"{business.painPoints[0]}"</em> and proposes a concrete ROI of <em>{business.estimatedRoi}</em> based on your skill ({skill}).
          </div>
        </div>

        {/* Email Body Editor */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-300">
            Drafted Pitch Email:
          </label>
          <textarea
            rows={8}
            value={fullEmail}
            onChange={(e) => setPitchText(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed resize-none"
          />
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800">
          <span className="text-[11px] text-slate-400">
            Ready to paste into Gmail, LinkedIn or contact forms
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Cold Pitch</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
