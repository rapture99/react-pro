/**
 * Shape of every piece of content on the site.
 * Structure lives here, values live in `src/data/resume.ts`.
 */

export interface ContactLink {
  id: string;
  label: string;
  value: string;
  href: string;
  /** Hook for the styling pass: swap in an icon per kind. */
  kind: 'email' | 'phone' | 'linkedin' | 'location';
}

export interface Profile {
  name: string;
  role: string;
  location: string;
  summary: string;
  links: ContactLink[];
}

export interface BlacklistRival {
  id: string;
  rank: string;
  alias: string;
  name: string;
  role: string;
  ride: string;
  bounty: string;
  heat: number;
  bio: string;
  stats: {
    topSpeed: number;
    acceleration: number;
    handling: number;
    nitro: number;
  };
  techStack: string[];
  projectImg?: string;
  carImg?: string;
  characterImg?: string;
  projectDetails?: {
    overview: string;
    keyFeatures: string[];
    performanceMetric?: string;
    challengesSolved?: string;
    liveUrl?: string;
    githubUrl?: string;
  };
}

export interface SkillGroup {
  id: string;
  label: string;
  items: string[];
  tunerStats?: {
    topSpeed: number;
    acceleration: number;
    handling: number;
    nitro: number;
  };
}

export interface Highlight {
  id: string;
  /** Short bold lead-in, e.g. "Offline-First Architecture (KEEL Platform)". */
  title: string;
  description: string;
  /** Optional pull-out number for a stat/badge treatment later. */
  metric?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  highlights: Highlight[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface SectionMeta {
  id: string;
  navLabel: string;
  heading: string;
  eyebrow?: string;
}

export interface Resume {
  profile: Profile;
  skills: SkillGroup[];
  experience: Experience[];
  education: Education[];
  sections: SectionMeta[];
  blacklist: BlacklistRival[];
}
