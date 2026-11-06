import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CustomCursor } from './components/CustomCursor';
import { DetailingNavbar } from './components/DetailingNavbar';
import { WashHero } from './components/WashHero';
import { PaintInspection } from './components/PaintInspection';
import { BookingConfigurator } from './components/BookingConfigurator';
import { StudioBays } from './components/StudioBays';
import { DetailingFooter } from './components/DetailingFooter';
import { AdminPortal } from './components/AdminPortal';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);

  // Initialize Lenis Inertial Momentum Smooth Scrolling & GSAP ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  const handleScrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleScrollToBooking = () => {
    const bookingEl = document.getElementById('book') || document.getElementById('packages');
    if (bookingEl) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(bookingEl, { offset: -60, duration: 1.2 });
      } else {
        bookingEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#08080b] text-[#f1f1f4] selection:bg-cyan-500/30 selection:text-white relative">
      {/* Custom Fluid Reactive Cursor */}
      <CustomCursor />

      {/* Floating Glassmorphism Detailing Navbar */}
      <DetailingNavbar
        onOpenBooking={handleScrollToBooking}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Experience Sections */}
      <main>
        {/* 1. SCROLL TO WASH IT: Dirty to Mirror Ceramic Car Stage */}
        <WashHero onOpenBooking={handleScrollToBooking} />

        {/* 2. LOOK CLOSER / SWIRLS OUT. GLASS ON. / KEYS BACK. JAW DROPS. */}
        <PaintInspection />

        {/* 3. CHOOSE YOUR DETAIL: Interactive Booking Configurator */}
        <BookingConfigurator />

        {/* 4. CLEANROOM FACILITY & VERIFIED REVIEWS */}
        <StudioBays />
      </main>

      {/* Detailing Studio Footer */}
      <DetailingFooter
        onScrollToTop={handleScrollToTop}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Studio Owner & Staff CRM Leads Portal (from reference video 00:20) */}
      <AdminPortal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />
    </div>
  );
}
