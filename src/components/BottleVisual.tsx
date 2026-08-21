import React from 'react';
import { Perfume } from '../types';

interface BottleVisualProps {
  perfume: Perfume;
  className?: string;
  isHero?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showDetails?: boolean;
  onClick?: () => void;
  interactive?: boolean;
}

export const BottleVisual: React.FC<BottleVisualProps> = ({
  perfume,
  className = '',
  size = 'md',
  showDetails = true,
  onClick,
  interactive = true,
}) => {
  // Dimensions based on size
  const sizeMap = {
    sm: { width: 'w-24', height: 'h-40', cap: 'h-7 w-12', label: 'text-[9px] p-2' },
    md: { width: 'w-36 sm:w-44', height: 'h-64 sm:h-72', cap: 'h-10 w-20', label: 'text-xs p-3' },
    lg: { width: 'w-48 sm:w-56', height: 'h-80 sm:h-96', cap: 'h-12 w-24', label: 'text-sm p-4' },
    hero: { width: 'w-44 sm:w-56 md:w-64', height: 'h-72 sm:h-96 md:h-[410px]', cap: 'h-10 sm:h-12 w-20 sm:w-28', label: 'text-xs sm:text-sm p-3 sm:p-4' },
  };

  const currentSize = sizeMap[size];

  return (
    <div
      id={`bottle-${perfume.id}`}
      onClick={onClick}
      className={`relative select-none flex flex-col items-center justify-end transition-transform duration-500 ease-out group ${
        interactive ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Glow aura */}
      <div
        className="absolute inset-0 rounded-[36px] blur-2xl opacity-40 group-hover:opacity-75 transition-opacity duration-700 pointer-events-none"
        style={{ background: perfume.palette.glow }}
      />

      {/* Cap - Sculptural cylindrical metallic / stone cap with knurling & monogram */}
      <div className="relative z-20 flex flex-col items-center mb-1">
        {/* Cap top chamfer */}
        <div
          className={`${currentSize.cap} rounded-t-lg relative shadow-md overflow-hidden transition-all duration-300`}
          style={{
            background: `linear-gradient(135deg, #3A3530 0%, #1E1B18 50%, #4D4741 100%)`,
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.4), 0 4px 10px rgba(0,0,0,0.3)',
          }}
        >
          {/* Knurled grip line */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-white/10" />
          <div className="absolute inset-y-0 left-2 w-[1px] bg-white/20" />
          <div className="absolute inset-y-0 right-2 w-[1px] bg-black/40" />

          {/* Monogram */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] sm:text-xs font-serif italic text-[#D8C7B0] tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
              F
            </span>
          </div>
        </div>

        {/* Neck collar (brass / gunmetal ring) */}
        <div
          className="w-10 sm:w-12 h-2 sm:h-2.5 rounded-sm relative -mt-0.5 z-10"
          style={{
            background: 'linear-gradient(90deg, #8A775C 0%, #E3D3B8 45%, #C2AC8A 70%, #6E5C44 100%)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-[1px] bg-white/60" />
        </div>
      </div>

      {/* Glass Body (Heavy fluted crystal flacon) */}
      <div
        className={`${currentSize.width} ${currentSize.height} relative rounded-[28px] sm:rounded-[34px] overflow-hidden border transition-all duration-500 shadow-2xl flex flex-col items-center justify-between p-3 sm:p-5`}
        style={{
          backdropFilter: 'blur(12px)',
          background: 'rgba(255, 255, 255, 0.12)',
          borderColor: 'rgba(255, 255, 255, 0.35)',
          boxShadow: '0 25px 50px -12px rgba(20, 18, 16, 0.35), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -4px 12px rgba(0,0,0,0.2)',
        }}
      >
        {/* Fluted Vertical Glass Grooves */}
        <div className="absolute inset-0 fluted-glass-overlay pointer-events-none opacity-60 mix-blend-overlay" />

        {/* Outer Glass Bevel Reflections */}
        <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-white/40 via-white/10 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-3 bg-gradient-to-l from-black/25 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />

        {/* Liquid Reservoir (Floating colored extrait) */}
        <div
          className="absolute inset-x-2.5 sm:inset-x-3 bottom-2.5 sm:bottom-3 top-8 sm:top-12 rounded-[22px] sm:rounded-[26px] overflow-hidden transition-all duration-700"
          style={{
            background: `linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.05) 30%, ${perfume.palette.primary}CC 70%, ${perfume.palette.accent}EE 100%)`,
          }}
        >
          {/* Liquid Meniscus & Shimmer */}
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-white/40 to-transparent opacity-80" />

          {/* Internal Dip Tube (Atomizer straw) */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/25 blur-[0.5px]" />
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-black/20" />

          {/* Micro bubble / suspension highlights */}
          <div className="absolute top-1/4 left-1/3 w-1 h-1 rounded-full bg-white/40 blur-[0.2px] animate-pulse" />
          <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 rounded-full bg-white/30 blur-[0.3px]" />
        </div>

        {/* Heavy Glass Base Pedestal */}
        <div
          className="absolute inset-x-0 bottom-0 h-5 sm:h-7 bg-gradient-to-t from-white/30 via-white/10 to-transparent pointer-events-none border-t border-white/15"
        />

        {/* Tactile Letterpress Paper Label (Centered on the flacon) */}
        <div
          className={`relative z-10 w-full max-w-[85%] my-auto rounded-xl sm:rounded-2xl shadow-lg border border-black/5 flex flex-col justify-between transition-all duration-300 ${currentSize.label}`}
          style={{
            backgroundColor: perfume.palette.labelBg,
            color: perfume.palette.labelText,
            boxShadow: '0 8px 24px rgba(0,0,0,0.18), inset 0 1px 1px rgba(255,255,255,0.8)',
          }}
        >
          {/* Top Label Eyebrow */}
          <div className="flex items-center justify-between pb-1.5 sm:pb-2 border-b border-current/10">
            <span className="eyebrow-text tracking-widest text-[8px] sm:text-[9px] opacity-70">
              {perfume.number}
            </span>
            <span className="eyebrow-text tracking-widest text-[8px] sm:text-[9px] opacity-70">
              50 ML
            </span>
          </div>

          {/* Center Brand & Fragrance Name */}
          <div className="py-2 sm:py-3 text-center">
            <h4 className="font-heading text-sm sm:text-base md:text-lg font-semibold tracking-tight leading-none mb-0.5">
              {perfume.name}
            </h4>
            <p className="eyebrow-text text-[7px] sm:text-[8.5px] opacity-60 tracking-[0.2em] font-medium">
              EAU DE PARFUM
            </p>
          </div>

          {/* Bottom Micro Stamp & Batch */}
          <div className="flex items-center justify-between pt-1.5 sm:pb-0.5 border-t border-current/10 text-[7px] sm:text-[8px] font-mono opacity-65">
            <span>FOND</span>
            <span className="text-[#A43E2B] font-semibold">{perfume.batch.replace('Batch ', '')}</span>
          </div>
        </div>

        {/* Base Brand Imprint at bottom of glass (as described in spec) */}
        <div className="relative z-10 flex items-center justify-center space-x-1 opacity-75">
          <span className="eyebrow-text text-[7.5px] sm:text-[9px] tracking-[0.28em] text-white drop-shadow-md">
            FOND · GRASSE
          </span>
        </div>
      </div>

      {/* Floor Cast Reflection Shadow */}
      <div
        className="w-3/4 h-3 sm:h-4 rounded-[100%] blur-md mt-2 opacity-50 transition-all duration-300 group-hover:w-4/5 group-hover:opacity-70"
        style={{
          background: `radial-gradient(ellipse at center, ${perfume.palette.primary} 0%, rgba(0,0,0,0.4) 50%, transparent 80%)`,
        }}
      />
    </div>
  );
};
