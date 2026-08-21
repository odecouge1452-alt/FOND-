import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Droplet, Leaf, RefreshCw, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

interface ServicesSectionProps {
  onOpenQuiz: () => void;
  onOpenShop: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenQuiz,
  onOpenShop,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from('.services-header-elem', {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      // Steps column reveal
      const stepCols = gsap.utils.toArray<HTMLElement>('.service-step-col');
      gsap.from(stepCols, {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stepsContainerRef.current,
          start: 'top 75%',
        },
      });

      // Number count up animation 00 -> 01, 02, 03
      const numElements = gsap.utils.toArray<HTMLElement>('.service-step-number');
      numElements.forEach((el, idx) => {
        const targetNumber = (idx + 1).toString().padStart(2, '0');
        const obj = { val: 0 };
        
        gsap.to(obj, {
          val: idx + 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toString().padStart(2, '0');
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const icons = [
    <Droplet className="w-5 h-5 text-[#C98A3B]" key="quiz" />,
    <Leaf className="w-5 h-5 text-[#526E59]" key="blend" />,
    <RefreshCw className="w-5 h-5 text-[#B65E43]" key="refill" />,
  ];

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative bg-[#F7F5F1] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="services-header-elem inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#141210]/5 border border-[#141210]/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#141210]" />
            <span className="eyebrow-text text-[#141210]/80">
              THE BESPOKE EXPERIENCE
            </span>
          </div>

          <h2 className="services-header-elem editorial-title text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#141210] tracking-tight leading-[1.12]">
            How Fond Works.
          </h2>

          <p className="services-header-elem text-base sm:text-lg text-[#141210]/65 leading-relaxed font-light">
            From algorithmic accord analysis to our temperature-controlled compounding atelier in Grasse.
          </p>
        </div>

        {/* 3-Column Layout with Dividers */}
        <div
          ref={stepsContainerRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-0 relative border-t border-b border-[#141210]/10 py-12 lg:py-16"
        >
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div
              key={step.number}
              id={`service-step-${step.number}`}
              className={`service-step-col flex flex-col justify-between space-y-8 px-0 lg:px-10 ${
                idx !== 0 ? 'lg:border-l lg:border-[#141210]/10' : ''
              }`}
            >
              {/* Top: Animated Number + Icon */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="service-step-number font-serif text-5xl sm:text-6xl font-medium tracking-tight text-[#141210]">
                      00
                    </span>
                    <span className="eyebrow-text text-xs text-[#141210]/40">
                      / 03
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-[#141210]/5 border border-[#141210]/10 flex items-center justify-center">
                    {icons[idx]}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="eyebrow-text text-[10px] text-[#C98A3B] font-semibold">
                    {step.tag}
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-[#141210] tracking-tight leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#141210]/50 uppercase tracking-wider">
                    {step.subtitle}
                  </p>
                </div>

                <p className="text-sm text-[#141210]/70 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Bottom: Feature Checklist */}
              <div className="pt-6 border-t border-[#141210]/10 space-y-2.5">
                {step.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start space-x-2 text-xs text-[#141210]/75">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#526E59] shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Action Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#EBE7DF] rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-heading text-xl sm:text-2xl font-semibold text-[#141210] tracking-tight leading-snug">
              Unsure which expression suits your skin?
            </h4>
            <p className="text-xs sm:text-sm text-[#141210]/70">
              Our scent diagnostic takes 120 seconds and pairs you with your definitive formula.
            </p>
          </div>

          <button
            onClick={onOpenQuiz}
            className="flex items-center space-x-2 px-6 py-3.5 rounded-full bg-[#141210] text-[#F7F5F1] text-xs font-semibold uppercase tracking-wider hover:bg-[#282522] transition-all shrink-0 shadow-md"
          >
            <Compass className="w-4 h-4 text-[#C98A3B]" />
            <span>Start Scent Diagnostic</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>

      </div>
    </section>
  );
};
