import React, { useState } from 'react';
import { X, ArrowRight, RotateCcw, Check, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/content';
import { PERFUMES } from '../data/perfumes';
import { BottleVisual } from './BottleVisual';
import { Perfume } from '../types';

interface ScentQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

export const ScentQuizModal: React.FC<ScentQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectPerfume,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [resultPerfume, setResultPerfume] = useState<Perfume | null>(null);

  if (!isOpen) return null;

  const handleSelectOption = (perfumeId: string) => {
    const nextAnswers = { ...answers, [currentStep]: perfumeId };
    setAnswers(nextAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate match
      const counts: Record<string, number> = {};
      Object.values(nextAnswers).forEach((id: string) => {
        counts[id] = (counts[id] || 0) + 1;
      });

      let bestId = 'amber-santal';
      let maxCount = 0;
      Object.entries(counts).forEach(([id, count]) => {
        if (count > maxCount) {
          maxCount = count;
          bestId = id;
        }
      });

      const matched = PERFUMES.find((p) => p.id === bestId) || PERFUMES[0];
      setResultPerfume(matched);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setResultPerfume(null);
  };

  const currentQ = QUIZ_QUESTIONS[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#F7F5F1] text-[#141210] rounded-[32px] sm:rounded-[40px] shadow-2xl border border-[#141210]/10 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-[#141210]/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Compass className="w-4 h-4 text-[#C98A3B]" />
            <span className="eyebrow-text text-[#141210]/70 text-[10px]">
              {resultPerfume ? 'DIAGNOSTIC COMPLETE' : `QUESTION ${currentStep + 1} OF ${QUIZ_QUESTIONS.length}`}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#141210]/5 text-[#141210]/60 hover:text-[#141210] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 overflow-y-auto">
          {!resultPerfume ? (
            <div className="space-y-8">
              {/* Question Title */}
              <div className="space-y-2">
                <h3 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-[#141210]">
                  {currentQ.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#141210]/60">
                  Select the sensation that resonates with your personal olfactory memory.
                </p>
              </div>

              {/* Options List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentQ.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.perfumeId)}
                    className="text-left p-5 rounded-2xl border border-[#141210]/10 hover:border-[#141210] hover:bg-[#141210]/5 transition-all duration-200 group flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <h4 className="font-heading text-base font-semibold text-[#141210] group-hover:text-[#C98A3B] transition-colors">
                        {option.label}
                      </h4>
                      <p className="text-xs text-[#141210]/60 mt-1">
                        {option.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center justify-end text-xs font-semibold text-[#141210]/40 group-hover:text-[#141210]">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Step indicator dots */}
              <div className="flex items-center justify-center space-x-2 pt-4">
                {QUIZ_QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentStep
                        ? 'w-8 bg-[#141210]'
                        : i < currentStep
                        ? 'w-3 bg-[#C98A3B]'
                        : 'w-3 bg-[#141210]/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Result Screen */
            <div className="space-y-6 text-center sm:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C98A3B]/10 text-[#8B531B] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>98.4% Olfactory Accord Match</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-5 flex justify-center py-4">
                  <BottleVisual perfume={resultPerfume} size="md" interactive={false} />
                </div>

                <div className="sm:col-span-7 space-y-4 text-left">
                  <div>
                    <span className="eyebrow-text text-xs text-[#C98A3B]">{resultPerfume.number} · {resultPerfume.season}</span>
                    <h3 className="font-heading text-3xl font-semibold text-[#141210] tracking-tight mt-0.5">
                      {resultPerfume.name}
                    </h3>
                    <p className="text-xs text-[#141210]/60 italic">
                      {resultPerfume.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-[#141210]/75 leading-relaxed">
                    {resultPerfume.description}
                  </p>

                  <div className="p-3.5 rounded-2xl bg-[#EDE8E1] space-y-1.5 text-xs">
                    <span className="eyebrow-text text-[9px] text-[#141210]/50 block">KEY EXTRACTS</span>
                    <p className="font-medium text-[#141210]">
                      {resultPerfume.notes.top.slice(0, 2).join(', ')} · {resultPerfume.notes.heart[0]} · {resultPerfume.notes.base[0]}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectPerfume(resultPerfume);
                      }}
                      className="w-full sm:w-auto flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-[#141210] text-[#F7F5F1] text-xs font-semibold uppercase tracking-wider hover:bg-[#282522] transition-colors"
                    >
                      <span>Inspect Bottle (${resultPerfume.price})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={handleReset}
                      className="p-3 rounded-full border border-[#141210]/20 hover:bg-[#141210]/5 text-[#141210]/70 hover:text-[#141210] transition-colors"
                      title="Retake Quiz"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
