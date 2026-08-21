export interface PerfumeNote {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Perfume {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  number: string;
  batch: string;
  season: string;
  volume: string;
  concentration: string;
  price: number;
  remainingBottles: number;
  totalBottles: number;
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    liquid: string;
    glass: string;
    labelBg: string;
    labelText: string;
    glow: string;
  };
  notes: PerfumeNote;
  description: string;
  mood: string;
  personality: string;
  character: string;
}

export interface TestimonialChip {
  id: string;
  author: string;
  location: string;
  badge: string;
  text: string;
  rating: number;
  perfumeId: string;
  avatar: string;
}

export interface BentoTileData {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  stat?: string;
  statLabel?: string;
  tag?: string;
  type: 'feature-large' | 'macro-stat' | 'medium-tech' | 'medium-speed' | 'bottom-refill' | 'bottom-waitlist';
  badge?: string;
}

export interface StepItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  details: string[];
}

export interface ReviewItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  city: string;
  scent: string;
  rating: number;
  featured?: boolean;
}

export interface PressLogo {
  name: string;
  quote: string;
}
