import { BentoTileData, StepItem, ReviewItem, PressLogo } from '../types';

export const PRESS_LOGOS: PressLogo[] = [
  { name: 'VOGUE SCENT', quote: '“The quiet revolution in artisanal perfumery.”' },
  { name: 'WALLPAPER*', quote: '“Fluted glass meets rare botanical distillation.”' },
  { name: 'MONOCLE', quote: '“The antithesis of mass luxury fragrance.”' },
  { name: 'HOW TO SPEND IT', quote: '“Intoxicatingly subtle, impeccably blended.”' },
  { name: 'NUMÉRO', quote: '“Sculptural vessels housing uncompromising compositions.”' },
];

export const BENTO_TILES: BentoTileData[] = [
  {
    id: 'tile-handpoured',
    eyebrow: 'THE ARCHITECTURE',
    title: 'Hand-poured in micro-batches.',
    description: 'Each formulation rests for eight weeks in temperature-controlled oak casks before single-flacon bottling.',
    tag: 'Strict Batch Limits',
    type: 'feature-large',
    badge: 'Craft Philosophy',
  },
  {
    id: 'tile-bottles-stat',
    eyebrow: 'ANNUAL RESERVE',
    title: 'Precision Sillage',
    stat: '+12,400',
    statLabel: 'Bottles poured across 4 seasonal editions this year',
    tag: 'Numbered flacons',
    type: 'macro-stat',
  },
  {
    id: 'tile-ai-match',
    eyebrow: 'OLFACTORY PROFILING',
    title: 'Intelligent Scent Match',
    description: 'Our proprietary note-resonance algorithm translates personal memory & climate into your signature accord.',
    tag: '2-Min Diagnostic',
    type: 'medium-tech',
  },
  {
    id: 'tile-express-ship',
    eyebrow: 'EXPEDITED DISPATCH',
    title: '48-Hour Cold Ship',
    description: 'Temperature-insulated linen parcels dispatched directly from our Grasse & London compounding ateliers.',
    tag: 'Climate Safe',
    type: 'medium-speed',
  },
  {
    id: 'tile-refill-glass',
    eyebrow: 'CIRCULAR LUXURY',
    title: 'Refillable Fluted Glass',
    description: 'Return your empty flacon for our seasonal refill programme and receive our wax-sealed replenishment decant.',
    tag: '100% Recyclable Flint Glass',
    type: 'bottom-refill',
  },
  {
    id: 'tile-waitlist-only',
    eyebrow: 'ALLOCATION MODEL',
    title: 'Seasonal Drops Only',
    stat: '4 Scents',
    statLabel: '1 Drop per season. Guaranteed zero overproduction.',
    tag: 'Private Allocation',
    type: 'bottom-waitlist',
  },
];

export const HOW_IT_WORKS_STEPS: StepItem[] = [
  {
    number: '01',
    title: 'Take the Diagnostic',
    subtitle: '2-Minute Scent Quiz',
    description: 'Explore your olfactory instincts across woody, botanical, smoked, and earthen accords. We isolate your ideal base concentration.',
    tag: 'Bespoke Matching',
    details: ['Climate & skin warmth analysis', 'Sillage preference calibration', 'Sample vial duo included with order'],
  },
  {
    number: '02',
    title: 'We Hand-Blend & Bottle',
    subtitle: 'Cured in Small Batches',
    description: 'Your chosen extrait is drawn from the maturation vessel, hand-filtered through unbleached cotton, and sealed with stamped wax.',
    tag: 'Batch Certified',
    details: ['Numbered certificate of provenance', 'Hand-stamped batch code', 'Zero synthetic fixatives or phthalates'],
  },
  {
    number: '03',
    title: 'Delivered & Refillable',
    subtitle: 'Enduring Vessel Lifetime',
    description: 'Arrives in shock-absorbing linen pulp packaging within 48 hours. When finished, order our twist-lock replenishment flacons.',
    tag: 'Lifetime Glass',
    details: ['Signature heavy-weight glass', '48-hour cold chain dispatch', 'Complimentary return refill logistics'],
  },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    quote: '“Santal Doré is unlike anything in commercial fragrance. It has a dry, creamy warmth that feels tailored specifically to my skin chemistry. I’m stopped daily.”',
    author: 'Aurelia D’Souza',
    role: 'Architectural Director',
    city: 'London',
    scent: 'Santal Doré (N° 01)',
    rating: 5,
    featured: true,
  },
  {
    id: 'rev-2',
    quote: '“Fumoir Noir feels like reading rare first editions in a dimly lit library surrounded by birch smoke. Hypnotic and commanding without ever shouting.”',
    author: 'Henri Chevalier',
    role: 'Gallery Curator',
    city: 'Paris',
    scent: 'Fumoir Noir (N° 03)',
    rating: 5,
  },
  {
    id: 'rev-3',
    quote: '“The weight of the bottle alone speaks volumes. Terre Cuite brings me right back to warm Tuscan afternoons. The refill concept is executed flawlessly.”',
    author: 'Clara Van Der Bilt',
    role: 'Creative Director',
    city: 'Amsterdam',
    scent: 'Terre Cuite (N° 04)',
    rating: 5,
  },
  {
    id: 'rev-4',
    quote: '“Mousse Botanique is pure morning rain on wet pine needles and crushed fig leaves. Green, ozonic, and endlessly refreshing in the heat.”',
    author: 'Kaelen Thorne',
    role: 'Editorial Stylist',
    city: 'Stockholm',
    scent: 'Mousse Botanique (N° 02)',
    rating: 5,
  },
];

export const QUIZ_QUESTIONS = [
  {
    id: 'vibe',
    title: 'Which atmosphere calls to you most?',
    options: [
      { id: 'golden', label: 'Golden Hour & Cashmere', subtitle: 'Warm amber, creamy woods, glowing hearth', perfumeId: 'amber-santal' },
      { id: 'forest', label: 'Damp Forest & Morning Dew', subtitle: 'Crushed galbanum, fresh moss, petrichor', perfumeId: 'verdant-moss' },
      { id: 'midnight', label: 'Midnight Salon & Leather', subtitle: 'Smoked birch, dark incense, obsidian resin', perfumeId: 'fumoir-noir' },
      { id: 'sunbaked', label: 'Sun-Drenched Terracotta', subtitle: 'Spiced saffron, baked clay, dry iris', perfumeId: 'terre-cuite' },
    ],
  },
  {
    id: 'intensity',
    title: 'What is your preferred sillage & presence?',
    options: [
      { id: 'intimate', label: 'Intimate Skin Scent', subtitle: 'Subtle, personal aura noticed only when close', perfumeId: 'amber-santal' },
      { id: 'radiant', label: 'Radiant & Breezy', subtitle: 'Leaves a clean, botanical trail in your wake', perfumeId: 'verdant-moss' },
      { id: 'commanding', label: 'Commanding & Enigmatic', subtitle: 'Rich, deep extrait with strong lasting presence', perfumeId: 'fumoir-noir' },
      { id: 'balanced', label: 'Warm & Earthy Medium', subtitle: 'Harmonious projection throughout the entire day', perfumeId: 'terre-cuite' },
    ],
  },
  {
    id: 'season',
    title: 'In which setting will you wear your signature?',
    options: [
      { id: 'evenings', label: 'Crisp Evenings & Overcoats', subtitle: 'Cozy layers, candlelit dinners, late hours', perfumeId: 'amber-santal' },
      { id: 'daytime', label: 'Early Mornings & Studio Time', subtitle: 'Clear mind, fresh air, focused vitality', perfumeId: 'verdant-moss' },
      { id: 'occasions', label: 'Grand Occasions & Nightfall', subtitle: 'Formal gatherings, private clubs, night air', perfumeId: 'fumoir-noir' },
      { id: 'travel', label: 'Sunlit Escapes & Mediterranean', subtitle: 'Coastal warm breezes, linen shirts, sun', perfumeId: 'terre-cuite' },
    ],
  },
];
