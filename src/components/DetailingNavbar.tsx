import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Shield, Sparkles, LayoutDashboard, Calendar } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { Magnetic } from './Magnetic';

interface DetailingNavbarProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const DetailingNavbar: React.FC<DetailingNavbarProps> = ({ onOpenBooking, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const active = soundManager.toggleSound();
    setSoundOn(active);
  };

  const navLinks = [
    { label: 'Wash Experience', href: '#wash' },
    { label: 'Paint Inspection', href: '#inspection' },
    { label: 'Ceramic Beading', href: '#beading' },
    { label: 'Packages', href: '#packages' },
    { label: 'Studio Bays', href: '#studio' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-3.5 shadow-2xl shadow-black/50 border-b border-white/10'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="text-lg sm:text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 group flex items-center gap-2.5"
            onClick={() => soundManager.playClick()}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Shield className="w-4 h-4 fill-white/20" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-wider leading-none text-white">DETAILING SIKAR</span>
              <span className="text-[10px] font-mono text-cyan-400 tracking-widest mt-0.5">CERAMIC & PPF STUDIO</span>
            </div>
          </a>

          {/* Zone 2: 4-5 single-line clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-mono uppercase tracking-wider text-neutral-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative py-1 hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 group"
                onClick={() => soundManager.playClick()}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-cyan-400 transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action, sound & Admin Portal toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Audio feedback toggle */}
            <button
              onClick={handleToggleSound}
              type="button"
              className={`p-2 rounded-lg transition-colors border ${
                soundOn
                  ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300'
                  : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white'
              }`}
              title={soundOn ? 'Mute detailing audio' : 'Enable pressure wash & chime audio'}
              aria-label="Toggle sound"
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Studio Owner / CRM Portal Button (from 00:20 in reference video) */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onOpenAdmin();
              }}
              className="px-3.5 py-2 rounded-lg text-xs font-mono text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Shop Owner CRM Leads Portal"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Owner CRM</span>
            </button>

            {/* Primary Action Button */}
            <Magnetic strength={0.25} className="hidden md:inline-block">
              <button
                type="button"
                onClick={() => {
                  soundManager.playChime();
                  onOpenBooking();
                }}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 rounded-lg transition-all shadow-lg shadow-white/10 border border-white/40 whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer group"
              >
                <Calendar className="w-3.5 h-3.5 text-black" />
                <span>Book Detail</span>
              </button>
            </Magnetic>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 rounded-lg text-neutral-300 hover:text-white border border-white/10 bg-white/5"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-[#08080b]/98 backdrop-blur-2xl flex flex-col pt-24 px-8 pb-10">
          <nav className="flex flex-col gap-5 text-lg font-medium text-neutral-200">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  soundManager.playClick();
                  setMobileMenuOpen(false);
                }}
                className="border-b border-white/10 pb-3 flex items-center justify-between text-neutral-200 hover:text-cyan-400"
              >
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          <div className="mt-auto space-y-3 pt-6">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-3.5 text-center font-mono text-xs uppercase tracking-wider text-neutral-200 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4 text-cyan-400" />
              <span>Studio CRM Leads Portal</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playChime();
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-4 text-center font-bold uppercase tracking-wider text-black bg-white rounded-xl shadow-lg cursor-pointer"
            >
              Book Your Detail
            </button>
          </div>
        </div>
      )}
    </>
  );
};
