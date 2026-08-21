import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, Sparkles, Mail, Instagram, Twitter, Compass, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FondLogo } from './FondLogo';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  onOpenQuiz: () => void;
  onOpenShop: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenQuiz,
  onOpenShop,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const formBoxRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline + form fade & scale in on scroll
      gsap.from('.waitlist-anim-elem', {
        y: 40,
        opacity: 0,
        scale: 0.97,
        stagger: 0.1,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#C98A3B', '#EDE8E1', '#526E59', '#B65E43'],
      });
    }, 400);
  };

  return (
    <section
      ref={sectionRef}
      id="waitlist"
      className="relative bg-[#0E0D0C] text-[#EDE8E1] pt-24 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Ambient Radial Warm Glow behind the card */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[850px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(201,138,59,0.11)_0%,rgba(182,94,67,0.05)_45%,transparent_70%)] blur-[120px] pointer-events-none -z-10" />

      {/* Faint Background Tactile Grain across the dark section */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-overlay -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Main Waitlist Card */}
        <div
          ref={formBoxRef}
          className="waitlist-anim-elem relative rounded-[32px] sm:rounded-[44px] bg-[#161413] border border-white/10 p-6 sm:p-12 lg:p-16 text-center max-w-3xl mx-auto shadow-2xl overflow-hidden"
        >
          {/* Top Label Header in standard document flow */}
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 mb-8 text-[10px] eyebrow-text">
            <span className="text-white/40 text-left">EST. 2024 · GRASSE & LONDON</span>
            <span className="text-[#C98A3B] text-right">BATCH N° 25 ROSTER</span>
          </div>

          <div className="max-w-xl mx-auto space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C98A3B] animate-pulse" />
              <span className="eyebrow-text text-white/80 text-[9.5px]">
                PRIVATE ALLOCATION ACCESS
              </span>
            </div>

            <h2 className="editorial-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.1]">
              Find your Fond.
            </h2>

            <p className="text-sm sm:text-base text-white/65 font-light leading-relaxed max-w-md mx-auto">
              Each seasonal edition is capped at 250 bottles. Enter your email to be notified when the next maturation vessel is tapped.
            </p>

            {/* Email Input + Button */}
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                id="waitlist-form"
                className="pt-4 max-w-md mx-auto"
              >
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-[#211E1B] rounded-2xl sm:rounded-full p-2 border border-white/15 focus-within:border-[#C98A3B] transition-colors shadow-inner gap-2 sm:gap-0">
                  <div className="flex items-center pl-3 sm:pl-4 flex-1">
                    <Mail className="w-4 h-4 text-white/40 shrink-0" />
                    <input
                      id="waitlist-email-input"
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent px-3 py-2 sm:py-3 text-sm text-white placeholder-white/40 focus:outline-none font-sans"
                    />
                  </div>

                  <button
                    id="waitlist-submit-btn"
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl sm:rounded-full bg-[#F7F5F1] text-[#141210] text-xs font-semibold uppercase tracking-wider hover:bg-[#C98A3B] hover:text-[#141210] hover:shadow-lg transition-all shrink-0 active:scale-95 cursor-pointer"
                  >
                    {submitting ? (
                      <span>Reserving...</span>
                    ) : (
                      <>
                        <span>Join the Waitlist</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-white/40 font-light mt-3">
                  New drop every season. No spam, just scent.
                </p>
              </form>
            ) : (
              <div className="pt-4 max-w-md mx-auto bg-white/5 border border-emerald-500/30 rounded-3xl p-6 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-xl font-bold text-white">
                  You are on the Private Roster.
                </h4>
                <p className="text-xs text-white/70">
                  We’ve reserved your priority allocation for Batch 25. Check your inbox for your bespoke olfactory welcome card.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Row */}
        <footer className="waitlist-anim-elem pt-16 border-t border-white/10 space-y-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Logo & Manifesto */}
            <div className="flex flex-col items-center lg:items-start space-y-3 text-center lg:text-left">
              <div id="footer-brand-logo" className="flex items-center space-x-3">
                <FondLogo id="footer-fond-logo" className="h-9 sm:h-10 w-auto text-white" />
                <div className="border-l border-white/20 pl-3 py-0.5">
                  <span className="eyebrow-text text-[7.5px] sm:text-[8px] text-white/60 tracking-[0.22em] font-medium leading-tight block">
                    SMALL-BATCH SCENT
                  </span>
                </div>
              </div>
              <p className="text-xs text-white/50 max-w-xs">
                Niche small-batch perfumery formulated in Grasse, hand-bottled in limited seasonal editions.
              </p>
            </div>

            {/* Nav Links */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs uppercase font-semibold tracking-wider text-white/70">
              <a href="#collection" className="hover:text-white transition-colors">The Collection</a>
              <button onClick={onOpenQuiz} className="hover:text-white transition-colors">Scent Quiz</button>
              <a href="#how-it-works" className="hover:text-white transition-colors">How Fond Works</a>
              <a href="#reviews" className="hover:text-white transition-colors">Client Notes</a>
              <a href="#waitlist" className="hover:text-white transition-colors">Allocation</a>
            </div>

            {/* Social & Badge */}
            <div className="flex items-center space-x-4">
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Atelier"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <Compass className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Legal / Copyright Bottom Line */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40 pt-8 border-t border-white/5">
            <p>© {new Date().getFullYear()} Fond Parfums Atelier Ltd. All rights reserved.</p>
            <div className="flex items-center space-x-6">
              <span className="hover:text-white/60 cursor-pointer">Terms of Allocation</span>
              <span className="hover:text-white/60 cursor-pointer">Refill Guarantee</span>
              <span className="hover:text-white/60 cursor-pointer">Grasse Compound Registry</span>
            </div>
          </div>
        </footer>

      </div>
    </section>
  );
};
