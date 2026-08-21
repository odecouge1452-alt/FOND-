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
      // Header entrance
      gsap.from('.bento-header-elem', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      // Bento Tiles Staggered Entrance
      const tiles = gsap.utils.toArray<HTMLElement>('.bento-tile-card');
      gsap.from(tiles, {
        y: 45,
        opacity: 0,
        scale: 0.96,
        stagger: 0.08,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 75%',
        },
      });

      // Number counter animation for stat tile
      const statNumber = document.getElementById('bento-stat-count');
      if (statNumber) {
        gsap.from(statNumber, {
          textContent: '0',
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 100 },
          scrollTrigger: {
            trigger: statNumber,
            start: 'top 85%',
          },
        });
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
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-[#C98A3B]/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#526E59]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6 sm:pb-8">
          <div className="space-y-3">
            <div className="bento-header-elem inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C98A3B]" />
              <span className="eyebrow-text text-[#EDE8E1]/80 text-[10px]">
                THE ARCHIVAL COLLECTION
              </span>
            </div>
            <h2 className="bento-header-elem editorial-title text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.12]">
              Sculpted in glass. <br />
              <span className="font-heading text-2xl sm:text-3xl lg:text-4xl text-white/80 font-semibold block mt-1.5 tracking-tight">
                Poured by hand.
              </span>
            </h2>
          </div>

          <div className="bento-header-elem max-w-md space-y-4">
            <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed">
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
            className="bento-tile-card col-span-1 rounded-[28px] p-7 sm:p-9 border border-white/10 relative overflow-hidden flex flex-col justify-between group min-h-[380px] sm:min-h-[420px]"
          >
            {/* Background Photography Layer (Amber Liquid / Oak Cask ~18% Opacity) */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700 pointer-events-none"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1400&q=80')`,
              }}
            />
            {/* Dark Gradient Overlay for Maximum Text Contrast (WCAG AA) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-[#161412]/90 to-[#1A1714]/80 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#C98A3B]/10 blur-[80px] pointer-events-none" />

            {/* Tile 1 Content */}
            <div className="space-y-4 z-10">
              <div className="flex items-center justify-between">
                <span className="eyebrow-text text-[#C98A3B]">THE ARCHITECTURE</span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] uppercase font-semibold text-white/80">
                  Strict 250 Batch Limit
                </span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-[1.15]">
                Hand-poured <br />
                <span className="text-white/80 font-semibold">
                  in micro-batches.
                </span>
              </h3>

              <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed max-w-md">
                Unlike industrial perfumery with mass runs, our extraits mature for eight full weeks in toasted French oak barrels before single-flacon hand bottling.
              </p>
            </div>

            <div className="pt-6 grid grid-cols-3 gap-3 border-t border-white/10 z-10 mt-6">
              <div>
                <span className="text-[9.5px] eyebrow-text text-white/45">MATURATION</span>
                <p className="font-serif text-lg sm:text-xl font-bold text-white mt-0.5">8 Weeks</p>
                <p className="text-[10px] text-white/50">Oak cask resting</p>
              </div>
              <div>
                <span className="text-[9.5px] eyebrow-text text-white/45">CONCENTRATION</span>
                <p className="font-serif text-lg sm:text-xl font-bold text-[#C98A3B] mt-0.5">28–32%</p>
                <p className="text-[10px] text-white/50">Pure Extrait grade</p>
              </div>
              <div>
                <span className="text-[9.5px] eyebrow-text text-white/45">FORMULATION</span>
                <p className="font-serif text-lg sm:text-xl font-bold text-white mt-0.5">100%</p>
                <p className="text-[10px] text-white/50">Phthalate-free</p>
              </div>
            </div>
          </div>

          {/* Row 1, Tile 2 (Right): +12,400 Bottles Stat */}
          <div
            id="tile-annual-allocation"
            className="bento-tile-card col-span-1 rounded-[28px] p-7 sm:p-9 border border-white/10 relative overflow-hidden flex flex-col justify-between group min-h-[380px] sm:min-h-[420px]"
          >
            {/* Background Photography Layer (Bottling Workshop / Glass ~25% Opacity) */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700 pointer-events-none"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=1400&q=80')`,
              }}
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-[#161412]/90 to-[#1A1714]/80 pointer-events-none" />
            <div className="absolute top-1/3 left-1/4 w-52 h-52 rounded-full bg-gradient-to-r from-amber-400/15 to-emerald-400/15 blur-2xl pointer-events-none" />

            {/* Tile 2 Content */}
            <div className="z-10 flex items-center justify-between">
              <span className="eyebrow-text text-white/70">ANNUAL ALLOCATION</span>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Droplet className="w-4 h-4 text-[#C98A3B]" />
              </div>
            </div>

            <div className="py-4 z-10 space-y-2">
              <div className="flex items-baseline space-x-2">
                <span
                  id="bento-stat-count"
                  className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white"
                >
                  +12,400
                </span>
              </div>
              <p className="text-base sm:text-lg font-medium text-white/90">
                Bottles poured & hand-numbered this year
              </p>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-sm">
                Distributed exclusively to registered collectors across 32 countries.
              </p>
            </div>

            <div className="z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
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
            className="bento-tile-card col-span-1 md:col-span-2 rounded-[28px] p-7 sm:p-9 border border-white/10 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 group"
          >
            {/* Background Photography Layer (Cold-Mist / Linen Packaging ~20% Opacity) */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-25 group-hover:scale-105 transition-all duration-700 pointer-events-none"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1600&q=80')`,
              }}
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#12100E] via-[#151311]/92 to-[#191613]/85 pointer-events-none" />

            {/* Left Content */}
            <div className="z-10 max-w-xl space-y-3">
              <div className="flex items-center space-x-3">
                <span className="eyebrow-text text-[#77A082]">COLD-CHAIN TRANSIT</span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span className="text-[10px] font-mono text-white/50">GRASSE → GLOBAL</span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-snug">
                48-Hour Cold Dispatch
              </h3>

              <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
                All extraits ship in temperature-stabilized molded linen pulp packaging directly from our Grasse maturation compound to insulate fragile natural botanical terpenes from heat degradation.
              </p>
            </div>

            {/* Right Meta Badges */}
            <div className="z-10 shrink-0 flex flex-col sm:flex-row md:flex-col gap-3 justify-center md:items-end border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
              <div className="flex items-center space-x-2 text-xs font-mono text-white/80 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <Clock className="w-4 h-4 text-[#77A082]" />
                <span>Dispatched within 48 hours</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono text-white/60 px-4 py-1">
                <span className="w-2 h-2 rounded-full bg-[#77A082]" />
                <span>Complimentary Express Courier</span>
              </div>
            </div>
          </div>

          {/* Row 3, Tile 4 (Full Width): Refillable Flint Glass */}
          <div
            id="tile-refillable-glass"
            className="bento-tile-card col-span-1 md:col-span-2 rounded-[28px] p-7 sm:p-9 border border-white/10 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 group"
          >
            {/* Background Photography Layer (Macro Glass Fluting / Tinted Sage ~22% Opacity) */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-22 group-hover:opacity-28 group-hover:scale-105 transition-all duration-700 pointer-events-none"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1600&q=80')`,
              }}
            />
            {/* Sage-Tinted Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#111613] via-[#131915]/92 to-[#171F1A]/85 pointer-events-none" />
            <div className="absolute -bottom-10 right-1/4 w-72 h-72 rounded-full bg-[#526E59]/15 blur-3xl pointer-events-none" />

            {/* Left Content */}
            <div className="z-10 max-w-xl space-y-3">
              <div className="flex items-center space-x-3">
                <span className="eyebrow-text text-[#8FB599]">CIRCULAR BOTANICALS</span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span className="text-[10px] font-mono text-[#8FB599]/80">ZERO-WASTE CHARTER</span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-snug">
                Refillable Flint Glass
              </h3>

              <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
                Our heavy-gauge flint glass flacons are engineered for lifelong endurance. Return your empty vessel for a 35% discount on your next seasonal replenishment decant, or order aluminum refilling cartridges.
              </p>
            </div>

            {/* Right Meta Badges */}
            <div className="z-10 shrink-0 flex flex-wrap md:flex-col gap-2.5 justify-center md:items-end border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
              <div className="flex items-center space-x-2 text-xs font-mono text-white/80 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <RefreshCw className="w-4 h-4 text-[#8FB599]" />
                <span>35% Refill Credit</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono text-white/60">
                <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px]">100% Recyclable</span>
                <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px]">Zero Plastic Tops</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
