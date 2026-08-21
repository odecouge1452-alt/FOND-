import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Droplet } from 'lucide-react';
import { REVIEWS } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export const ReviewsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from('.reviews-header-elem', {
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

      // Cards staggered entrance with alternating horizontal drift
      const cards = gsap.utils.toArray<HTMLElement>('.review-editorial-card');
      cards.forEach((card, idx) => {
        const xOffset = idx % 2 === 0 ? -30 : 30;
        gsap.from(card, {
          x: xOffset,
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative bg-[#EDE9E1] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-full bg-white/40 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="reviews-header-elem inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#141210]/5 border border-[#141210]/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C98A3B]" />
              <span className="eyebrow-text text-[#141210]/80">
                VERIFIED COLLECTOR NOTES
              </span>
            </div>
            <h2 className="reviews-header-elem editorial-title text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#141210] tracking-tight leading-[1.12]">
              Loved by noses <br />
              <span className="font-heading text-2xl sm:text-3xl lg:text-4xl text-[#141210]/80 font-semibold block mt-1.5 tracking-tight">
                everywhere.
              </span>
            </h2>
          </div>

          <div className="reviews-header-elem flex items-center space-x-4">
            <div className="flex -space-x-2">
              {['AD', 'HC', 'CV', 'KT'].map((initials, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-[#141210] text-[#F7F5F1] border-2 border-[#EDE9E1] flex items-center justify-center text-xs font-bold"
                >
                  {initials}
                </div>
              ))}
            </div>
            <div className="text-xs">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C98A3B] text-[#C98A3B]" />
                ))}
              </div>
              <p className="text-[#141210]/70 font-medium mt-0.5">4.92 / 5.0 Average rating across 840+ reviews</p>
            </div>
          </div>
        </div>

        {/* 2x2 Uniform Grid of Review Cards */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              id={`review-card-${review.id}`}
              className="review-editorial-card rounded-[28px] p-7 sm:p-8 bg-[#F7F5F1] border border-[#141210]/10 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 h-full"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-[#C98A3B]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center space-x-2.5">
                    {review.featured ? (
                      <span className="px-2.5 py-1 rounded-full bg-[#C98A3B]/10 border border-[#C98A3B]/20 text-[10px] uppercase font-semibold text-[#C98A3B]">
                        Featured Review
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-[#141210]/5 border border-[#141210]/10 text-[10px] uppercase font-semibold text-[#141210]/60">
                        Verified Collector
                      </span>
                    )}
                    <Droplet className="w-4 h-4 text-[#141210]/40 stroke-[1.5] shrink-0" />
                  </div>
                </div>

                <blockquote className="font-sans text-sm sm:text-base text-[#141210]/90 leading-relaxed line-clamp-3 italic">
                  "{review.quote}"
                </blockquote>
              </div>

              <div className="pt-4 border-t border-[#141210]/10 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-[#141210]">
                    {review.author}
                  </h4>
                  <p className="text-xs text-[#141210]/60">
                    {review.role} · {review.city}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[9px] eyebrow-text text-[#141210]/50 block">
                    SCENT
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#141210]">
                    {review.scent.split(' (')[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
