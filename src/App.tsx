/**
 * SkillRadar & Global Business Opportunity Matcher
 * Google Maps Business Search + AI Skill Opportunity Analysis + Hiring Radar
 */

import React, { useState, useEffect } from 'react';
import { AnalyzedBusiness, HiringPost } from './types/business';
import { ActiveTab, PresetKey, SkillItem } from './types';
import { CAREER_PRESETS } from './data/presets';
import { GoogleBusinessMap } from './components/GoogleBusinessMap';
import { BusinessAnalysisCard } from './components/BusinessAnalysisCard';
import { HiringPostsRadar } from './components/HiringPostsRadar';
import { OutreachModal } from './components/OutreachModal';
import { RadarChart } from './components/RadarChart';
import { SkillManager } from './components/SkillManager';
import { GapAnalysis } from './components/GapAnalysis';
import { SpckSimulator } from './components/SpckSimulator';
import { CodeViewer } from './components/CodeViewer';
import { SetupGuide } from './components/SetupGuide';
import { generateSpckZip, triggerDownloadBlob } from './utils/zipGenerator';
import { generateSpckGuidePdf } from './utils/pdfGenerator';
import {
  MapPin,
  Search,
  Briefcase,
  Sparkles,
  Sliders,
  Smartphone,
  Code2,
  BookOpen,
  FolderArchive,
  FileDown,
  RefreshCw,
  Building2,
  TrendingUp,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  Globe,
  Award
} from 'lucide-react';

const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyA7IrGlIcpfKb2RZBC2Djyae1cnl8KXb54';

const POPULAR_COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Germany',
  'India',
  'Australia',
  'United Arab Emirates',
  'Singapore',
  'France',
  'Japan',
  'Netherlands',
  'Brazil',
  'Spain',
  'Italy'
];

const BUSINESS_CATEGORIES = [
  { label: 'All Businesses', value: 'local businesses' },
  { label: 'Restaurants & Cafes', value: 'restaurants and cafes' },
  { label: 'Medical & Dental Clinics', value: 'dental and medical clinics' },
  { label: 'Real Estate Agencies', value: 'real estate agencies' },
  { label: 'Retail & Boutiques', value: 'retail stores and boutiques' },
  { label: 'Tech Startups & Agencies', value: 'tech companies and agencies' },
  { label: 'Law & Financial Firms', value: 'law firms and accounting services' },
  { label: 'Fitness & Gyms', value: 'gyms and fitness centers' },
  { label: 'Home Services & Contractors', value: 'contractors and home services' }
];

const SUGGESTED_SKILLS = [
  'Full-Stack Web Development',
  'SEO & Google Maps Ranking',
  'Mobile App Development (Flutter/React Native)',
  'UI/UX & Website Redesign',
  'E-Commerce & Online Ordering',
  'Cybersecurity & Network Security',
  'Social Media & Digital Marketing',
  'Automation & AI Chatbots',
  'Graphic Design & Branding'
];

export default function App() {
  // Main view tab: 'business_finder' | 'hiring_radar' | 'skill_radar_suite'
  const [mainView, setMainView] = useState<'business_finder' | 'hiring_radar' | 'skill_radar_suite'>('business_finder');

  // Search parameters
  const [skill, setSkill] = useState<string>('Full-Stack Web Development');
  const [country, setCountry] = useState<string>('United Kingdom');
  const [city, setCity] = useState<string>('London');
  const [category, setCategory] = useState<string>('local businesses');
  const [customKeyword, setCustomKeyword] = useState<string>('');

  // Results state
  const [businesses, setBusinesses] = useState<AnalyzedBusiness[]>([]);
  const [hiringPosts, setHiringPosts] = useState<HiringPost[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<AnalyzedBusiness | null>(null);
  const [pitchModalBusiness, setPitchModalBusiness] = useState<AnalyzedBusiness | null>(null);

  // Loading states
  const [isSearchingBusinesses, setIsSearchingBusinesses] = useState(false);
  const [isSearchingHiring, setIsSearchingHiring] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Skill Radar sub-states (for the Spck suite tab)
  const [spckSubTab, setSpckSubTab] = useState<ActiveTab>('radar');
  const [selectedPreset, setSelectedPreset] = useState<PresetKey>('android');
  const [radarSkills, setRadarSkills] = useState<SkillItem[]>(() => {
    const defaultPreset = CAREER_PRESETS.find(p => p.id === 'android');
    return defaultPreset ? JSON.parse(JSON.stringify(defaultPreset.skills)) : [];
  });
  const [showTarget, setShowTarget] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [isZipping, setIsZipping] = useState(false);

  // Initial search on mount
  useEffect(() => {
    handleSearchBusinesses();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // 1. Search Businesses on Google Maps & Analyze with Gemini
  const handleSearchBusinesses = async () => {
    if (!skill.trim() || !country.trim()) {
      triggerToast('Please provide a skill and country');
      return;
    }

    setIsSearchingBusinesses(true);
    try {
      const res = await fetch('/api/search-businesses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skill: skill.trim(),
          country: country.trim(),
          city: city.trim(),
          category,
          customKeyword: customKeyword.trim()
        }),
      });

      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      setBusinesses(data.businesses || []);
      if (data.businesses && data.businesses.length > 0) {
        setSelectedBusiness(data.businesses[0]);
        triggerToast(`Found & analyzed ${data.businesses.length} businesses in ${country}!`);
      } else {
        triggerToast('No businesses found. Try widening search.');
      }
    } catch (err: any) {
      console.error(err);
      triggerToast('Error searching businesses. Please try again.');
    } finally {
      setIsSearchingBusinesses(false);
    }
  };

  // 2. Search Hiring & Need Posts for that Skill
  const handleSearchHiring = async () => {
    if (!skill.trim() || !country.trim()) {
      triggerToast('Please provide a skill and country');
      return;
    }

    setIsSearchingHiring(true);
    try {
      const res = await fetch('/api/search-hiring', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skill: skill.trim(),
          country: country.trim(),
          remoteOnly: false
        }),
      });

      if (!res.ok) throw new Error('Hiring search failed');
      const data = await res.json();
      setHiringPosts(data.jobs || []);
      triggerToast(`Found ${data.jobs?.length || 0} active hiring & gig posts!`);
    } catch (err: any) {
      console.error(err);
      triggerToast('Error searching hiring posts.');
    } finally {
      setIsSearchingHiring(false);
    }
  };

  // Trigger search on hiring tab switch if empty
  const handleSwitchToHiring = () => {
    setMainView('hiring_radar');
    if (hiringPosts.length === 0) {
      handleSearchHiring();
    }
  };

  // Download ZIP
  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zipBlob = await generateSpckZip(radarSkills, 'Developer Suite');
      triggerDownloadBlob(zipBlob, 'skill-radar-spck-android.zip');
      triggerToast('Downloaded Spck Android ZIP package!');
    } catch (e) {
      console.error(e);
      window.open('/downloads/skill-radar-spck-android.zip', '_blank');
    } finally {
      setIsZipping(false);
    }
  };

  // Download PDF
  const handleDownloadPdf = () => {
    try {
      generateSpckGuidePdf(radarSkills, 'Developer Suite');
      triggerToast('PDF Setup Guide generated & downloaded!');
    } catch (e) {
      console.error(e);
      window.open('/downloads/Spck_Editor_Skill_Radar_Guide.pdf', '_blank');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* =========================================================================
          Top Bar Contract (3 Zones: Brand wordmark - Clean Nav - Primary actions)
          ========================================================================= */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-sky-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white font-sans">
              SkillRadar &middot; Business Matcher
            </span>
          </div>

          {/* Zone 2: Navigation views */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 border border-slate-800 p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => setMainView('business_finder')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                mainView === 'business_finder'
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-sky-300" />
              <span>Google Maps Business Finder</span>
            </button>

            <button
              onClick={handleSwitchToHiring}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                mainView === 'hiring_radar'
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-amber-300" />
              <span>Hiring & Need Posts Radar</span>
              {hiringPosts.length > 0 && (
                <span className="bg-slate-800 text-slate-200 px-1.5 py-0.2 rounded text-[10px] font-mono">
                  {hiringPosts.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setMainView('skill_radar_suite')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                mainView === 'skill_radar_suite'
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-300" />
              <span>Spck Android Suite & ZIP</span>
            </button>
          </nav>

          {/* Zone 3: Primary action button */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm shadow-indigo-600/30 transition-colors whitespace-nowrap cursor-pointer"
            >
              <FolderArchive className="w-3.5 h-3.5" />
              <span>{isZipping ? 'Bundling...' : 'Download Spck ZIP'}</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5 text-rose-400" />
              <span>PDF Guide</span>
            </button>
          </div>
        </div>

        {/* Mobile View Switcher */}
        <div className="flex md:hidden items-center gap-1 mt-2.5 overflow-x-auto text-xs pb-1">
          <button
            onClick={() => setMainView('business_finder')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              mainView === 'business_finder' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400'
            }`}
          >
            🗺️ Google Maps Finder
          </button>
          <button
            onClick={handleSwitchToHiring}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              mainView === 'hiring_radar' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400'
            }`}
          >
            💼 Hiring Radar ({hiringPosts.length})
          </button>
          <button
            onClick={() => setMainView('skill_radar_suite')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              mainView === 'skill_radar_suite' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400'
            }`}
          >
            📱 Spck & Radar Suite
          </button>
        </div>
      </header>

      {/* Global Search & Skill Input Bar */}
      <section className="bg-slate-900/90 border-b border-slate-800 px-4 sm:px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
            {/* Skill Input */}
            <div className="md:col-span-4 flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-indigo-400" />
                <span>Your Skill / Service:</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Full-Stack Web Development, SEO, Flutter"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 shadow-inner"
              />
            </div>

            {/* Country Selector */}
            <div className="md:col-span-3 flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-sky-400" />
                <span>Country:</span>
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                {POPULAR_COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* City / Region (Optional) */}
            <div className="md:col-span-2 flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>City / State:</span>
              </label>
              <input
                type="text"
                placeholder="e.g. London, Austin"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Business Category Filter */}
            <div className="md:col-span-3 flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Target Business Sector:</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                {BUSINESS_CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Row: Quick Skills Suggestions + Dual Search Buttons */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1">
            {/* Suggestions Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 lg:pb-0">
              <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">Suggested:</span>
              {SUGGESTED_SKILLS.slice(0, 4).map((s) => (
                <button
                  key={s}
                  onClick={() => setSkill(s)}
                  className={`px-2 py-0.5 rounded-lg border text-[11px] transition-colors whitespace-nowrap ${
                    skill === s
                      ? 'bg-indigo-950 text-indigo-300 border-indigo-500/50'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Search Triggers */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleSearchBusinesses}
                disabled={isSearchingBusinesses}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
              >
                <Search className={`w-3.5 h-3.5 ${isSearchingBusinesses ? 'animate-spin' : ''}`} />
                <span>
                  {isSearchingBusinesses ? 'Searching Maps...' : 'Scan Businesses & Analyze Skill Fit'}
                </span>
              </button>

              <button
                onClick={() => {
                  setMainView('hiring_radar');
                  handleSearchHiring();
                }}
                disabled={isSearchingHiring}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              >
                <Briefcase className={`w-3.5 h-3.5 text-amber-400 ${isSearchingHiring ? 'animate-spin' : ''}`} />
                <span>Scan Hiring Posts</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-6">
        {/* =========================================================================
            VIEW 1: GOOGLE MAPS BUSINESS FINDER & AI SKILL ANALYSIS (FIRST TASK)
            ========================================================================= */}
        {mainView === 'business_finder' && (
          <div className="flex flex-col gap-5">
            {/* Summary Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gradient-to-r from-slate-900 to-slate-900/60 border border-slate-800 p-4 rounded-2xl">
              <div>
                <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <span>Google Maps Opportunity Radar</span>
                  <span className="text-xs font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-800 px-2 py-0.5 rounded-md">
                    Skill: {skill}
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Analyzing how your skill creates tangible revenue & operational improvements for businesses in {country}.
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px] uppercase">Businesses Found</span>
                  <span className="text-sm font-bold text-slate-200">{businesses.length}</span>
                </div>
                <div className="w-px h-8 bg-slate-800"></div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px] uppercase">High Potential Matches</span>
                  <span className="text-sm font-bold text-amber-400">
                    {businesses.filter(b => b.opportunityScore >= 85).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Two Column Layout: Map (Left) + Opportunity List (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Interactive Google Map (5 Columns) */}
              <div className="lg:col-span-5 sticky top-20 flex flex-col gap-3">
                <div className="h-[460px] lg:h-[580px] w-full">
                  <GoogleBusinessMap
                    apiKey={MAPS_API_KEY}
                    businesses={businesses}
                    selectedBusiness={selectedBusiness}
                    onSelectBusiness={(b) => setSelectedBusiness(b)}
                    country={country}
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Click any pin to inspect the business & view custom pitch.</span>
                  <button
                    onClick={() => {
                      setMainView('hiring_radar');
                      if (hiringPosts.length === 0) handleSearchHiring();
                    }}
                    className="text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    Check Hiring Posts &rarr;
                  </button>
                </div>
              </div>

              {/* Analyzed Businesses Feed (7 Columns) */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                    <span>Ranked Business Opportunities</span>
                    <span className="text-xs text-slate-500 font-normal">
                      (Click card to focus on map)
                    </span>
                  </h3>

                  <button
                    onClick={handleSearchBusinesses}
                    disabled={isSearchingBusinesses}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
                  >
                    <RefreshCw className={`w-3 h-3 ${isSearchingBusinesses ? 'animate-spin' : ''}`} />
                    <span>Re-analyze</span>
                  </button>
                </div>

                {isSearchingBusinesses ? (
                  <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
                    <RefreshCw className="w-8 h-8 animate-spin text-indigo-400" />
                    <span className="text-xs font-medium">
                      Scanning Google Maps & generating AI skill-fit analysis...
                    </span>
                  </div>
                ) : businesses.length === 0 ? (
                  <div className="p-12 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/40">
                    <Building2 className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <h4 className="text-sm font-semibold text-slate-300">No businesses found</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Try selecting another country or expanding your keyword search.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3.5">
                    {businesses.map((biz) => (
                      <BusinessAnalysisCard
                        key={biz.id}
                        business={biz}
                        skill={skill}
                        isSelected={selectedBusiness?.id === biz.id}
                        onSelect={() => setSelectedBusiness(biz)}
                        onOpenPitch={(b) => setPitchModalBusiness(b)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: HIRING, GIGS & NEED POSTS RADAR (SECOND TASK)
            ========================================================================= */}
        {mainView === 'hiring_radar' && (
          <HiringPostsRadar
            jobs={hiringPosts}
            skill={skill}
            country={country}
            isLoading={isSearchingHiring}
            onRefresh={handleSearchHiring}
          />
        )}

        {/* =========================================================================
            VIEW 3: SKILL RADAR & SPCK ANDROID MOBILE SUITE (PREVIOUS WORK INTACT)
            ========================================================================= */}
        {mainView === 'skill_radar_suite' && (
          <div className="flex flex-col gap-5">
            {/* Sub-nav for Spck Suite */}
            <div className="flex items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-2.5 rounded-2xl">
              <div className="flex items-center gap-1 overflow-x-auto text-xs">
                <button
                  onClick={() => setSpckSubTab('radar')}
                  className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                    spckSubTab === 'radar' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400'
                  }`}
                >
                  Radar Studio
                </button>
                <button
                  onClick={() => setSpckSubTab('simulator')}
                  className={`px-3 py-1.5 rounded-xl font-medium transition-colors flex items-center gap-1.5 ${
                    spckSubTab === 'simulator' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 text-sky-400" />
                  <span>Android Emulator</span>
                </button>
                <button
                  onClick={() => setSpckSubTab('code')}
                  className={`px-3 py-1.5 rounded-xl font-medium transition-colors flex items-center gap-1.5 ${
                    spckSubTab === 'code' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Spck Code Hub</span>
                </button>
                <button
                  onClick={() => setSpckSubTab('guide')}
                  className={`px-3 py-1.5 rounded-xl font-medium transition-colors flex items-center gap-1.5 ${
                    spckSubTab === 'guide' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                  <span>Setup Guide & PDF</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadZip}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                >
                  Download ZIP
                </button>
              </div>
            </div>

            {/* Sub-tab 1: Radar Studio */}
            {spckSubTab === 'radar' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-5 flex flex-col gap-4 bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl shadow-sm">
                  <RadarChart
                    skills={radarSkills}
                    showTarget={showTarget}
                    onToggleTarget={() => setShowTarget(!showTarget)}
                    showLabels={showLabels}
                    onToggleLabels={() => setShowLabels(!showLabels)}
                  />
                </div>

                <div className="lg:col-span-7 flex flex-col gap-4">
                  <GapAnalysis skills={radarSkills} />
                  <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl">
                    <SkillManager
                      skills={radarSkills}
                      onAddSkill={(s) => setRadarSkills(prev => [...prev, { ...s, id: Date.now().toString() }])}
                      onEditSkill={(s) => setRadarSkills(prev => prev.map(item => item.id === s.id ? s : item))}
                      onDeleteSkill={(id) => setRadarSkills(prev => prev.filter(item => item.id !== id))}
                      onUpdateValue={(id, type, val) => setRadarSkills(prev => prev.map(s => s.id === id ? { ...s, [type]: val } : s))}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Sub-tab 2: Simulator */}
            {spckSubTab === 'simulator' && <SpckSimulator />}

            {/* Sub-tab 3: Code Viewer */}
            {spckSubTab === 'code' && <CodeViewer />}

            {/* Sub-tab 4: Setup Guide */}
            {spckSubTab === 'guide' && (
              <SetupGuide
                skills={radarSkills}
                presetName="Developer"
                onDownloadZip={handleDownloadZip}
              />
            )}
          </div>
        )}
      </main>

      {/* Personalized Outreach Pitch Modal */}
      {pitchModalBusiness && (
        <OutreachModal
          business={pitchModalBusiness}
          skill={skill}
          onClose={() => setPitchModalBusiness(null)}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 border border-indigo-500 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-medium animate-in fade-in slide-in-from-bottom-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 px-6 py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span>SkillRadar Global Suite</span>
            <span aria-hidden="true">&middot;</span>
            <span>Google Maps Business Matcher</span>
            <span aria-hidden="true">&middot;</span>
            <span>Hiring & Need Posts Radar</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setMainView('skill_radar_suite');
                setSpckSubTab('guide');
              }}
              className="hover:text-slate-300 transition-colors"
            >
              Spck Android Setup Guide
            </button>
            <a
              href="/spck-app/index.html"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              Offline Spck Web App
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
