import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Compass, Sparkles, Star, ShieldCheck, RefreshCw } from 'lucide-react';
import { PERFUMES, TESTIMONIAL_CHIPS } from '../data/perfumes';
import { PRESS_LOGOS } from '../data/content';
import { BottleVisual } from './BottleVisual';
import { Perfume } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onOpenQuiz: () => void;
  onOpenShop: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenQuiz,
  onOpenShop,
  onSelectPerfume,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottlesStackRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [activeBottleIndex, setActiveBottleIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left Column entrance animation
      gsap.from('.hero-text-elem', {
        y: 35,
        opacity: 0,
        stagger: 0.08,
        duration: 1.1,
        ease: 'power3.out',
        delay: 0.1,
      });

      // Fan out bottles animation on initial load
      const bottles = gsap.utils.toArray<HTMLElement>('.fanned-bottle-card');
      
      // Initial state is tightly stacked
      gsap.set(bottles, {
        opacity: 0,
        scale: 0.85,
        y: 60,
      });

      // Animate fan reveal
      gsap.to(bottles, {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.1,
        duration: 1.3,
        ease: 'power3.out',
        delay: 0.25,
      });

      // Testimonial chips entrance
      gsap.from('.hero-testimonial-chip', {
        x: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: 'power3.out',
        delay: 0.6,
      });

      // Parallax scroll effect on bottles
      if (bottlesStackRef.current) {
        bottles.forEach((bottle, i) => {
          const speed = (i + 1) * 0.15;
          gsap.to(bottle, {
            y: (index, target) => -80 * speed,
            rotation: (index, target) => {
              const baseRotations = [-14, -4, 6, 16];
              return baseRotations[i] + (i - 1.5) * 3;
            },
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          });
        });
      }

      // Parallax on testimonial floating chips
      gsap.to('.hero-testimonial-chip', {
        y: -40,
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // Marquee fade in
      gsap.from(marqueeRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out',
        delay: 0.9,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Defined angles and positions for the card-fan diagonal stack
  // Cascading top-right to bottom-left like a deck of high-end cards
  const fanStyles = [
    {
      rotate: '-14deg',
      translateX: '-42%',
      translateY: '18%',
      zIndex: 10,
    },
    {
      rotate: '-5deg',
      translateX: '-14%',
      translateY: '6%',
      zIndex: 20,
    },
    {
      rotate: '6deg',
      translateX: '14%',
      translateY: '-6%',
      zIndex: 30,
    },
    {
      rotate: '16deg',
      translateX: '42%',
      translateY: '-18%',
      zIndex: 40,
    },
  ];

  return (
    <section
      ref={containerRef}
      id="hero-section"
      className="relative min-h-screen pt-28 sm:pt-36 pb-16 overflow-hidden flex flex-col justify-between"
    >
      {/* Subtle Background Grain Texture (tactile paper/film warmth, background only) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Background Subtle Ambient Glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#EAD3A6]/30 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[#D6E4D9]/25 blur-[100px] pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-4 pb-12">
          
          {/* Left Column: Editorial Copy */}
          <div ref={leftColRef} className="lg:col-span-6 space-y-6 sm:space-y-8 z-20">
            
            {/* Eyebrow Label */}
            <div className="hero-text-elem inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#141210]/5 border border-[#141210]/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C98A3B] animate-pulse" />
              <span className="eyebrow-text text-[#141210]/75">
                CRAFT YOUR SIGNATURE
              </span>
            </div>

            {/* Headline */}
            <div className="hero-text-elem space-y-1 sm:space-y-2">
              <h1 className="editorial-title text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-semibold text-[#141210] tracking-tight leading-[1.06]">
                <span className="font-heading block">Find your Fond.</span>
                <span className="font-heading block text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-[#141210]/85 mt-1 font-semibold tracking-tight">
                  Small-batch scent.
                </span>
              </h1>
            </div>

            {/* 2-Line Supporting Copy */}
            <p className="hero-text-elem text-base sm:text-lg md:text-xl text-[#141210]/70 font-normal leading-relaxed max-w-xl">
              Niche fragrances hand-poured in micro-editions of 250 flacons. Formulated with rare botanical distillations and pure extracts, cured for eight weeks in oak.
            </p>

            {/* Interactive Call-to-Actions */}
            <div className="hero-text-elem flex flex-wrap items-center gap-4 pt-2">
              {/* Primary Dark Pill */}
              <button
                id="hero-cta-shop"
                onClick={onOpenShop}
                className="group flex items-center space-x-3 px-7 py-4 rounded-full bg-[#141210] text-[#F7F5F1] text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-[#282522] hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>Shop the Edit</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary Ghost Pill */}
              <button
                id="hero-cta-quiz"
                onClick={onOpenQuiz}
                className="flex items-center space-x-2 px-6 py-4 rounded-full border border-[#141210]/20 text-[#141210] text-xs sm:text-sm font-semibold uppercase tracking-wider hover:border-[#141210] hover:bg-[#141210]/5 transition-all duration-300"
              >
                <Compass className="w-4 h-4 text-[#C98A3B]" />
                <span>Take the Scent Quiz</span>
              </button>
            </div>

            {/* Micro Highlights Pill Row */}
            <div className="hero-text-elem pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#141210]/60 font-medium">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C98A3B]" />
                <span>Zero Phthalates or Synthetics</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <RefreshCw className="w-4 h-4 text-[#526E59]" />
                <span>Circular Refill System</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Star className="w-3.5 h-3.5 fill-[#C98A3B] text-[#C98A3B]" />
                <span>4.9 / 5.0 Olfactory Rating</span>
              </div>
            </div>

          </div>

          {/* Right Column: Fanned Bottle Stack & Floating Chips */}
          <div className="lg:col-span-6 relative mt-8 lg:mt-0 flex items-center justify-center min-h-[480px] sm:min-h-[560px]">
            
            {/* The Fanned Bottle Stage */}
            <div
              ref={bottlesStackRef}
              className="relative w-full max-w-[460px] sm:max-w-[540px] h-[400px] sm:h-[480px] flex items-center justify-center"
            >
              {PERFUMES.map((perfume, idx) => {
                const fan = fanStyles[idx];
                const isActive = activeBottleIndex === idx;

                return (
                  <div
                    key={perfume.id}
                    id={`fanned-bottle-${perfume.id}`}
                    onMouseEnter={() => setActiveBottleIndex(idx)}
                    onMouseLeave={() => setActiveBottleIndex(null)}
                    onClick={() => onSelectPerfume(perfume)}
                    style={{
                      transform: isActive
                        ? `translate(${fan.translateX}, ${fan.translateY}) rotate(0deg) scale(1.08)`
                        : `translate(${fan.translateX}, ${fan.translateY}) rotate(${fan.rotate})`,
                      zIndex: isActive ? 50 : fan.zIndex,
                    }}
                    className="fanned-bottle-card absolute transition-all duration-500 ease-out origin-bottom cursor-pointer hover:z-50"
                  >
                    {/* Bottle Tooltip on Hover */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                      <div className="px-3 py-1 rounded-full bg-[#141210] text-[#F7F5F1] text-[10px] font-semibold tracking-wider flex items-center space-x-1.5 shadow-lg">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: perfume.palette.primary }} />
                        <span>{perfume.name} · {perfume.price}$</span>
                      </div>
                    </div>

                    <BottleVisual
                      perfume={perfume}
                      size="hero"
                      interactive={true}
                    />
                  </div>
                );
              })}
            </div>

            {/* Floating Testimonial Chips (Staggered bottom-right) */}
            <div
              ref={chipsRef}
              className="absolute -bottom-6 sm:-bottom-8 right-0 sm:right-2 z-40 flex flex-col space-y-2.5 max-w-[280px] sm:max-w-[320px] pointer-events-auto"
            >
              {TESTIMONIAL_CHIPS.map((chip, i) => (
                <div
                  key={chip.id}
                  id={`testimonial-chip-${chip.id}`}
                  className="hero-testimonial-chip frosted-glass-subtle rounded-2xl p-3 shadow-lg flex items-center space-x-3 transition-transform duration-300 hover:scale-[1.03] cursor-pointer"
                  onClick={() => {
                    const found = PERFUMES.find(p => p.id === chip.perfumeId);
                    if (found) onSelectPerfume(found);
                  }}
                >
                  <div className="w-9 h-9 rounded-full bg-[#141210] text-[#F7F5F1] flex items-center justify-center text-xs font-semibold shrink-0">
                    {chip.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold text-[#141210] truncate">
                        {chip.author}
                      </h4>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#C98A3B]/15 text-[#8B531B] font-semibold tracking-wider">
                        {chip.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#141210]/70 truncate mt-0.5">
                      {chip.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Bottom Row: Grayscale Press Marquee */}
        <div
          ref={marqueeRef}
          id="hero-press-marquee"
          className="pt-12 pb-4 border-t border-[#141210]/10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <span className="eyebrow-text text-[#141210]/50 shrink-0">
              AS ACCLAIMED IN
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-8 items-center w-full max-w-4xl justify-items-center opacity-60 hover:opacity-90 transition-opacity">
              {PRESS_LOGOS.map((press) => (
                <div
                  key={press.name}
                  className="group flex flex-col items-center justify-center text-center cursor-default"
                >
                  <span className="font-serif text-sm sm:text-base font-bold tracking-wider text-[#141210]">
                    {press.name}
                  </span>
                  <span className="text-[9px] text-[#141210]/60 italic hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity">
                    {press.quote}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
