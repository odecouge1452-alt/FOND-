import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, RefreshCw, ArrowUpRight, Droplet } from 'lucide-react';
import { Perfume } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface BentoSectionProps {
  onOpenQuiz?: () => void;
  onOpenShop?: () => void;
  onSelectPerfume?: (perfume: Perfume) => void;
}

export const BentoSection: React.FC<BentoSectionProps> = ({
  onOpenShop,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Optional subtle number counter animation for stat tile without hiding elements
      const statNumber = document.getElementById('bento-stat-count');
      if (statNumber) {
        gsap.fromTo(
          statNumber,
          { opacity: 0.7, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statNumber,
              start: 'top 90%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="relative bg-[#0E0D0C] text-[#EDE8E1] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background ambient lighting pools for Liquid Glass refraction (soft glows behind the grid) */}
      <div className="absolute top-20 -left-16 w-[550px] h-[550px] rounded-full bg-[rgba(200,140,60,0.12)] blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 -right-16 w-[600px] h-[600px] rounded-full bg-[rgba(120,140,100,0.10)] blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-[rgba(215,160,80,0.08)] blur-[85px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6 sm:pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C98A3B]" />
              <span className="eyebrow-text text-[#EDE8E1]/80 text-[10px]">
                THE ARCHIVAL COLLECTION
              </span>
            </div>
            <h2 className="editorial-title text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.12]">
              Sculpted in glass. <br />
              <span className="font-heading text-2xl sm:text-3xl lg:text-4xl text-white/80 font-semibold block mt-1.5 tracking-tight">
                Poured by hand.
              </span>
            </h2>
          </div>

          <div className="max-w-md space-y-4">
            <p className="text-sm sm:text-base text-white/65 font-light leading-relaxed">
              Every drop is distilled from rare raw botanicals and cured in French oak. 
              Explore our four signature expressions for this seasonal release.
            </p>
            <div className="flex items-center space-x-3">
              <button
                onClick={onOpenShop}
                className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#C98A3B] hover:text-white transition-colors cursor-pointer"
              >
                <span>View Full Olfactory Pyramid</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Architecture Grid (Strict 4-Tile CSS Grid directly below header with 32px/56px vertical gap) */}
        <div
          ref={gridRef}
          id="architecture-grid"
          className="mt-8 sm:mt-12 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch w-full"
        >
          {/* Row 1, Tile 1 (Left): Hand-poured in micro-batches */}
          <div
            id="tile-micro-batches"
            className="bento-tile-card bento-liquid-glass col-span-1 rounded-[24px] p-7 sm:p-9 relative overflow-hidden flex flex-col justify-between group min-h-[380px] sm:min-h-[420px]"
          >
            {/* Tile 1 Content */}
            <div className="space-y-4 z-10 relative">
              <div className="flex items-center justify-between">
                <span className="eyebrow-text text-[#C98A3B] font-semibold text-xs tracking-wider">THE ARCHITECTURE</span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] uppercase font-semibold text-white/90">
                  STRICT 250 BATCH LIMIT
                </span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-[1.15]">
                Hand-poured <br />
                <span className="text-white/90 font-semibold">
                  in micro-batches.
                </span>
              </h3>

              <p className="text-white/75 text-sm sm:text-base font-light leading-relaxed max-w-md">
                Unlike industrial perfumery with mass runs, our extraits mature for eight full weeks in toasted French oak barrels before single-flacon hand bottling.
              </p>
            </div>

            {/* Divider & 3-Stat Row */}
            <div className="pt-6 grid grid-cols-3 gap-3 border-t border-white/15 z-10 mt-6 relative">
              <div>
                <span className="text-[9.5px] eyebrow-text text-white/50 tracking-wider">MATURATION</span>
                <p className="font-serif text-lg sm:text-xl font-bold text-white mt-0.5">8 Weeks</p>
                <p className="text-[10px] text-white/60">Oak cask resting</p>
              </div>
              <div>
                <span className="text-[9.5px] eyebrow-text text-white/50 tracking-wider">CONCENTRATION</span>
                <p className="font-serif text-lg sm:text-xl font-bold text-[#C98A3B] mt-0.5">28–32%</p>
                <p className="text-[10px] text-white/60">Pure Extrait grade</p>
              </div>
              <div>
                <span className="text-[9.5px] eyebrow-text text-white/50 tracking-wider">FORMULATION</span>
                <p className="font-serif text-lg sm:text-xl font-bold text-white mt-0.5">100%</p>
                <p className="text-[10px] text-white/60">Phthalate-free</p>
              </div>
            </div>
          </div>

          {/* Row 1, Tile 2 (Right): +12,400 Bottles Stat */}
          <div
            id="tile-annual-allocation"
            className="bento-tile-card bento-liquid-glass col-span-1 rounded-[24px] p-7 sm:p-9 relative overflow-hidden flex flex-col justify-between group min-h-[380px] sm:min-h-[420px]"
          >
            {/* Tile 2 Top Row */}
            <div className="z-10 flex items-center justify-between relative">
              <span className="eyebrow-text text-white/75 font-semibold text-xs tracking-wider">ANNUAL ALLOCATION</span>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/15">
                <Droplet className="w-4 h-4 text-[#C98A3B]" />
              </div>
            </div>

            {/* Tile 2 Main Stat & Copy */}
            <div className="py-4 z-10 space-y-2 relative">
              <div className="flex items-baseline space-x-2">
                <span
                  id="bento-stat-count"
                  className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white"
                >
                  +12,400
                </span>
              </div>
              <p className="text-base sm:text-lg font-medium text-white/95">
                Bottles poured & hand-numbered this year
              </p>
              <p className="text-xs sm:text-sm text-white/65 leading-relaxed max-w-sm">
                Distributed exclusively to registered collectors across 32 countries.
              </p>
            </div>

            {/* Tile 2 Bottom Row */}
            <div className="z-10 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-white/75 relative">
              <span className="font-mono">Next Seasonal Drop: Autumn Equinox</span>
              <span className="flex items-center space-x-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-semibold">Active Casks</span>
              </span>
            </div>
          </div>

          {/* Row 2, Tile 3 (Full Width): 48-Hour Cold Dispatch */}
          <div
            id="tile-cold-dispatch"
            className="bento-tile-card bento-liquid-glass col-span-1 md:col-span-2 rounded-[24px] p-7 sm:p-9 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 group"
          >
            {/* Left Content */}
            <div className="z-10 max-w-xl space-y-3 relative">
              <div className="flex items-center space-x-3">
                <span className="eyebrow-text text-[#77A082] font-semibold text-xs tracking-wider">COLD-CHAIN TRANSIT</span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span className="text-[10px] font-mono text-white/60">GRASSE → GLOBAL</span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-snug">
                48-Hour Cold Dispatch
              </h3>

              <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed">
                All extraits ship in temperature-stabilized molded linen pulp packaging directly from our Grasse maturation compound to insulate fragile natural botanical terpenes from heat degradation.
              </p>
            </div>

            {/* Right Meta Badges */}
            <div className="z-10 shrink-0 flex flex-col sm:flex-row md:flex-col gap-3 justify-center md:items-end border-t md:border-t-0 md:border-l border-white/15 pt-4 md:pt-0 md:pl-8 relative">
              <div className="flex items-center space-x-2 text-xs font-mono text-white/90 bg-white/10 px-4 py-2 rounded-full border border-white/15">
                <Clock className="w-4 h-4 text-[#77A082]" />
                <span>Dispatched within 48 hours</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono text-white/70 px-4 py-1">
                <span className="w-2 h-2 rounded-full bg-[#77A082]" />
                <span>Complimentary Express Courier</span>
              </div>
            </div>
          </div>

          {/* Row 3, Tile 4 (Full Width): Refillable Flint Glass */}
          <div
            id="tile-refillable-glass"
            className="bento-tile-card bento-liquid-glass col-span-1 md:col-span-2 rounded-[24px] p-7 sm:p-9 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 group"
          >
            {/* Left Content */}
            <div className="z-10 max-w-xl space-y-3 relative">
              <div className="flex items-center space-x-3">
                <span className="eyebrow-text text-[#8FB599] font-semibold text-xs tracking-wider">CIRCULAR BOTANICALS</span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span className="text-[10px] font-mono text-[#8FB599]/90">ZERO-WASTE CHARTER</span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-snug">
                Refillable Flint Glass
              </h3>

              <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed">
                Our heavy-gauge flint glass flacons are engineered for lifelong endurance. Return your empty vessel for a 35% discount on your next seasonal replenishment decant, or order aluminum refilling cartridges.
              </p>
            </div>

            {/* Right Meta Badges */}
            <div className="z-10 shrink-0 flex flex-wrap md:flex-col gap-2.5 justify-center md:items-end border-t md:border-t-0 md:border-l border-white/15 pt-4 md:pt-0 md:pl-8 relative">
              <div className="flex items-center space-x-2 text-xs font-mono text-white/90 bg-white/10 px-4 py-2 rounded-full border border-white/15">
                <RefreshCw className="w-4 h-4 text-[#8FB599]" />
                <span>35% Refill Credit</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono text-white/70">
                <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[11px]">100% Recyclable</span>
                <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[11px]">Zero Plastic Tops</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

