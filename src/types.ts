export type SkillCategory = 'Language' | 'Framework' | 'Architecture' | 'Tooling' | 'SoftSkill';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  current: number; // 0 - 100
  target: number;  // 0 - 100
  notes?: string;
}

export type PresetKey = 'android' | 'fullstack' | 'data_ai' | 'devops' | 'design' | 'cyber' | 'custom';

export interface CareerPreset {
  id: PresetKey;
  label: string;
  badge: string;
  description: string;
  skills: SkillItem[];
}

export type ActiveTab = 'radar' | 'simulator' | 'code' | 'guide';
