import React, { useState } from 'react';
import { X, ArrowRight, Check, ShieldCheck, RefreshCw, Sparkles, Heart, ShoppingBag } from 'lucide-react';
import { Perfume } from '../types';
import { BottleVisual } from './BottleVisual';
import { PERFUMES } from '../data/perfumes';
import confetti from 'canvas-confetti';

interface BottleDetailDrawerProps {
  perfume: Perfume | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectAnother: (perfume: Perfume) => void;
  onAddToCart: (perfume: Perfume, isSample?: boolean) => void;
}

export const BottleDetailDrawer: React.FC<BottleDetailDrawerProps> = ({
  perfume,
  isOpen,
  onClose,
  onSelectAnother,
  onAddToCart,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'full' | 'sample'>('full');
  const [added, setAdded] = useState(false);

  if (!isOpen || !perfume) return null;

  const handleAdd = () => {
    onAddToCart(perfume, selectedFormat === 'sample');
    setAdded(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6, x: 0.8 },
      colors: [perfume.palette.primary, '#141210', '#F7F5F1'],
    });
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  const percentageRemaining = Math.round((perfume.remainingBottles / perfume.totalBottles) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-[#F7F5F1] text-[#141210] shadow-2xl flex flex-col justify-between border-l border-[#141210]/10 overflow-y-auto">
          
          {/* Drawer Header */}
          <div className="p-6 sm:p-8 border-b border-[#141210]/10 flex items-center justify-between sticky top-0 bg-[#F7F5F1]/95 backdrop-blur-md z-30">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: perfume.palette.primary }} />
              <span className="eyebrow-text text-xs text-[#141210]/70">
                {perfume.number} · {perfume.season}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#141210]/5 text-[#141210]/60 hover:text-[#141210] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Visual Flacon Stage */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#EDE8E1] border border-[#141210]/5 flex items-center justify-center relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-20 blur-3xl pointer-events-none"
                style={{ background: perfume.palette.glow }}
              />
              <BottleVisual perfume={perfume} size="md" interactive={false} />
            </div>

            {/* Title & Batch Metadata */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-[#141210] leading-snug">
                    {perfume.name}
                  </h2>
                  <p className="text-xs text-[#141210]/60 italic mt-0.5">
                    {perfume.tagline}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-2xl font-bold text-[#141210]">
                    ${selectedFormat === 'full' ? perfume.price : 24}
                  </span>
                  <span className="text-[10px] eyebrow-text text-[#141210]/50 block">
                    {selectedFormat === 'full' ? '50ML FLACON' : '2X 2ML SAMPLES'}
                  </span>
                </div>
              </div>

              <p className="text-sm text-[#141210]/75 font-light leading-relaxed">
                {perfume.description}
              </p>
            </div>

            {/* Format Selection (Full 50ml vs Discovery Vial) */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedFormat('full')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedFormat === 'full'
                    ? 'border-[#141210] bg-[#141210] text-[#F7F5F1] shadow-md'
                    : 'border-[#141210]/15 bg-white/40 hover:bg-white/80 text-[#141210]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Full Flacon
                  </span>
                  <span className="text-xs font-mono font-bold">${perfume.price}</span>
                </div>
                <p className="text-[11px] opacity-70">50ml Heavy Fluted Glass</p>
              </button>

              <button
                onClick={() => setSelectedFormat('sample')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedFormat === 'sample'
                    ? 'border-[#141210] bg-[#141210] text-[#F7F5F1] shadow-md'
                    : 'border-[#141210]/15 bg-white/40 hover:bg-white/80 text-[#141210]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Discovery Duo
                  </span>
                  <span className="text-xs font-mono font-bold">$24</span>
                </div>
                <p className="text-[11px] opacity-70">2x 2ml Extrait Sprays</p>
              </button>
            </div>

            {/* Allocation & Remaining Stock Meter */}
            <div className="p-4 rounded-2xl bg-[#EDE8E1] border border-[#141210]/5 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#141210]">
                <span>{perfume.batch} — Live Allocation</span>
                <span className="text-[#A43E2B] font-mono">{perfume.remainingBottles} of {perfume.totalBottles} left</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#141210]/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#A43E2B] transition-all duration-500"
                  style={{ width: `${percentageRemaining}%` }}
                />
              </div>
              <p className="text-[10px] text-[#141210]/50 italic">
                Once allocation reaches zero, this formulation enters the archive vault until next year.
              </p>
            </div>

            {/* Olfactory Notes Pyramid */}
            <div className="space-y-4 pt-2">
              <span className="eyebrow-text text-xs text-[#141210]/60 block border-b border-[#141210]/10 pb-2">
                OLFACTORY PYRAMID
              </span>

              <div className="space-y-3 text-xs">
                {/* Top Notes */}
                <div className="flex items-start space-x-3">
                  <div className="w-20 eyebrow-text text-[9px] text-[#141210]/50 shrink-0 pt-0.5">
                    HEAD (TOP)
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {perfume.notes.top.map((note) => (
                      <span key={note} className="px-2.5 py-1 rounded-full bg-white/70 border border-[#141210]/10 font-medium">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Heart Notes */}
                <div className="flex items-start space-x-3">
                  <div className="w-20 eyebrow-text text-[9px] text-[#141210]/50 shrink-0 pt-0.5">
                    HEART
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {perfume.notes.heart.map((note) => (
                      <span key={note} className="px-2.5 py-1 rounded-full bg-white/70 border border-[#141210]/10 font-medium">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Base Notes */}
                <div className="flex items-start space-x-3">
                  <div className="w-20 eyebrow-text text-[9px] text-[#141210]/50 shrink-0 pt-0.5">
                    FOUNDATION
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {perfume.notes.base.map((note) => (
                      <span key={note} className="px-2.5 py-1 rounded-full bg-white/70 border border-[#141210]/10 font-medium">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Other Scents in Edition */}
            <div className="space-y-3 pt-4 border-t border-[#141210]/10">
              <span className="eyebrow-text text-[10px] text-[#141210]/60 block">
                EXPLORE OTHER FLACONS IN THIS DROP
              </span>

              <div className="grid grid-cols-3 gap-2">
                {PERFUMES.filter((p) => p.id !== perfume.id).map((other) => (
                  <button
                    key={other.id}
                    onClick={() => onSelectAnother(other)}
                    className="p-2.5 rounded-xl bg-[#EDE8E1] hover:bg-[#E2DDD3] text-left transition-colors border border-[#141210]/5"
                  >
                    <div className="flex items-center space-x-1 mb-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: other.palette.primary }} />
                      <span className="eyebrow-text text-[8px] opacity-70">{other.number}</span>
                    </div>
                    <p className="font-serif text-xs font-semibold text-[#141210] truncate">{other.name}</p>
                    <p className="text-[9px] text-[#141210]/50 truncate">${other.price}</p>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Drawer Footer Actions */}
          <div className="p-6 sm:p-8 border-t border-[#141210]/10 bg-[#F7F5F1] sticky bottom-0 z-30 space-y-3">
            <button
              onClick={handleAdd}
              className="w-full flex items-center justify-center space-x-2 py-4 rounded-full bg-[#141210] text-[#F7F5F1] text-xs font-semibold uppercase tracking-wider hover:bg-[#282522] hover:shadow-xl transition-all"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Added to Allocation Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    Add to Bag — ${selectedFormat === 'full' ? perfume.price : 24}
                  </span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center space-x-4 text-[10px] text-[#141210]/50">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-[#C98A3B]" />
                <span>Certificate Included</span>
              </span>
              <span>·</span>
              <span className="flex items-center space-x-1">
                <RefreshCw className="w-3 h-3 text-[#526E59]" />
                <span>Refillable Vessel</span>
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
