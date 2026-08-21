import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Compass } from 'lucide-react';
import { FondLogo } from './FondLogo';

interface NavbarProps {
  onOpenQuiz: () => void;
  onOpenShop: () => void;
  cartCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQuiz,
  onOpenShop,
  cartCount = 0,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3.5 bg-[#F7F5F1]/85 backdrop-blur-md border-b border-[#141210]/10 shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <a
          href="#"
          id="nav-brand-logo"
          className="flex items-center space-x-3 group cursor-pointer"
          aria-label="Fond Perfumes Home"
        >
          <FondLogo className="h-9 sm:h-10 md:h-11 w-auto text-[#141210] group-hover:text-[#C98A3B] transition-colors" />
          <div className="flex flex-col justify-center border-l border-[#141210]/20 pl-3 py-0.5">
            <span className="eyebrow-text text-[7.5px] sm:text-[8px] text-[#141210]/60 tracking-[0.22em] font-medium leading-tight">
              SMALL-BATCH SCENT
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#141210]/80">
          <a
            href="#collection"
            id="nav-link-collection"
            className="hover:text-[#141210] transition-colors hover:underline underline-offset-8 decoration-[#141210]/30"
          >
            The Collection
          </a>
          <a
            href="#how-it-works"
            id="nav-link-how-it-works"
            className="hover:text-[#141210] transition-colors hover:underline underline-offset-8 decoration-[#141210]/30"
          >
            How Fond Works
          </a>
          <a
            href="#reviews"
            id="nav-link-reviews"
            className="hover:text-[#141210] transition-colors hover:underline underline-offset-8 decoration-[#141210]/30"
          >
            Reviews
          </a>
          <a
            href="#waitlist"
            id="nav-link-waitlist"
            className="hover:text-[#141210] transition-colors hover:underline underline-offset-8 decoration-[#141210]/30"
          >
            Seasonal Allocation
          </a>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden sm:flex items-center space-x-3">
          <button
            id="nav-btn-quiz"
            onClick={onOpenQuiz}
            className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-full border border-[#141210]/20 hover:border-[#141210] hover:bg-[#141210]/5 transition-all text-[#141210]"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Scent Quiz</span>
          </button>

          <button
            id="nav-btn-shop"
            onClick={onOpenShop}
            className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full bg-[#141210] text-[#F7F5F1] hover:bg-[#2A2724] hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Shop the Edit</span>
            {cartCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#C98A3B] text-[#141210] text-[10px] flex items-center justify-center font-bold ml-1">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center space-x-2 sm:hidden">
          <button
            id="nav-btn-shop-mobile"
            onClick={onOpenShop}
            className="p-2 rounded-full bg-[#141210] text-[#F7F5F1]"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
          <button
            id="nav-toggle-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#141210] hover:bg-[#141210]/5"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#F7F5F1] border-b border-[#141210]/10 px-6 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3 text-base font-medium">
            <a
              href="#collection"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-[#141210]"
            >
              The Collection
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-[#141210]"
            >
              How Fond Works
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-[#141210]"
            >
              Reviews
            </a>
            <a
              href="#waitlist"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-[#141210]"
            >
              Seasonal Allocation
            </a>
          </nav>

          <div className="pt-4 border-t border-[#141210]/10 flex flex-col space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuiz();
              }}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-full border border-[#141210]/30 text-xs font-semibold uppercase tracking-wider"
            >
              <Compass className="w-4 h-4" />
              <span>Take the Scent Quiz</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenShop();
              }}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-full bg-[#141210] text-[#F7F5F1] text-xs font-semibold uppercase tracking-wider"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shop the Edit (50ml)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
