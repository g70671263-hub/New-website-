export interface AnalyzedBusiness {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  rating: number;
  reviewsCount: number;
  website: string | null;
  phone: string | null;
  types: string[];
  opportunityScore: number; // 0 - 100
  painPoints: string[];
  howWeCanHelp: string;
  servicesToOffer: string[];
  estimatedRoi: string;
  coldPitch: string;
}

export interface HiringPost {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Freelance' | 'Part-time';
  budget: string;
  posted: string;
  matchRate: number; // 80 - 100
  description: string;
  keyRequirements: string[];
  platform: 'LinkedIn' | 'Indeed' | 'Upwork' | 'Wellfound' | 'Direct Company';
  applyLink?: string;
  customProposal: string;
}

export interface SearchQueryState {
  skill: string;
  country: string;
  city: string;
  category: string;
  customKeyword: string;
}
