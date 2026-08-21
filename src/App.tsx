import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BentoSection } from './components/BentoSection';
import { ServicesSection } from './components/ServicesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { ScentQuizModal } from './components/ScentQuizModal';
import { BottleDetailDrawer } from './components/BottleDetailDrawer';
import { PERFUMES } from './data/perfumes';
import { Perfume } from './types';

export default function App() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleOpenQuiz = () => {
    setIsQuizOpen(true);
  };

  const handleCloseQuiz = () => {
    setIsQuizOpen(false);
  };

  const handleOpenShop = () => {
    setSelectedPerfume(PERFUMES[0]);
    setIsDrawerOpen(true);
  };

  const handleSelectPerfume = (perfume: Perfume) => {
    setSelectedPerfume(perfume);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleAddToCart = (perfume: Perfume, isSample?: boolean) => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F1] text-[#141210] selection:bg-[#141210] selection:text-[#F7F5F1] relative font-sans">
      {/* Top Fixed Navigation */}
      <Navbar
        onOpenQuiz={handleOpenQuiz}
        onOpenShop={handleOpenShop}
        cartCount={cartCount}
      />

      {/* Main Page Sections */}
      <main>
        {/* Section 1: Hero with Fanned Bottle Stack */}
        <HeroSection
          onOpenQuiz={handleOpenQuiz}
          onOpenShop={handleOpenShop}
          onSelectPerfume={handleSelectPerfume}
        />

        {/* Section 2: Dark Bento Grid ("The Collection") */}
        <BentoSection
          onOpenQuiz={handleOpenQuiz}
          onOpenShop={handleOpenShop}
          onSelectPerfume={handleSelectPerfume}
        />

        {/* Section 3: Services ("How Fond Works") */}
        <ServicesSection
          onOpenQuiz={handleOpenQuiz}
          onOpenShop={handleOpenShop}
        />

        {/* Section 4: Reviews ("Loved by Noses Everywhere") */}
        <ReviewsSection />

        {/* Section 5: Contact / Waitlist & Footer */}
        <ContactSection
          onOpenQuiz={handleOpenQuiz}
          onOpenShop={handleOpenShop}
        />
      </main>

      {/* Interactive Scent Quiz Modal */}
      <ScentQuizModal
        isOpen={isQuizOpen}
        onClose={handleCloseQuiz}
        onSelectPerfume={handleSelectPerfume}
      />

      {/* Bottle Detail / Shop Drawer */}
      <BottleDetailDrawer
        perfume={selectedPerfume}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        onSelectAnother={(perfume) => setSelectedPerfume(perfume)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
