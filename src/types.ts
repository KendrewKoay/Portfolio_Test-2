export interface Project {
  id: string;
  title: string;
  titleZh?: string;
  meta: string;
  year: number;
  category: string;
  shortDesc: string;
  shortDescZh?: string;
  longDesc?: string;
  longDescZh?: string;
  image: string;
  gallery?: string[];
  tags: string[];
  clientOrInstitution?: string;
  clientOrInstitutionZh?: string;
  role?: string;
  roleZh?: string;
  deliverables?: string[];
  deliverablesZh?: string[];
  featured?: boolean;
  interactiveType?: 'type-specimen' | 'color-perception' | 'sonic-waveform' | 'default';
}

export interface TeachingExperience {
  id: string;
  title: string;
  titleZh?: string;
  institution: string;
  institutionZh?: string;
  period: string;
  description: string;
  descriptionZh?: string;
  topics?: string[];
  topicsZh?: string[];
  icon: string;
}

export interface ResearchItem {
  id: string;
  title: string;
  titleZh?: string;
  meta: string;
  year: number;
  description: string;
  descriptionZh?: string;
  image: string;
  tags: string[];
  keyQuestion?: string;
  keyQuestionZh?: string;
}

export type CategoryFilter = 'All' | 'Typography' | 'Identity' | 'Education' | 'Editorial' | 'Installation' | 'Sound' | 'Research' | 'Branding';
