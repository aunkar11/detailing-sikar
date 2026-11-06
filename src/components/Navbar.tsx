import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { Magnetic } from './Magnetic';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
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
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Selected Works', href: '#works' },
    { label: 'Experience Lab', href: '#lab' },
    { label: 'Impact', href: '#impact' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-3.5 shadow-2xl shadow-black/40'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark (single text element) */}
          <a
            href="#"
            className="text-lg md:text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 group flex items-center gap-2"
            onClick={() => soundManager.playClick()}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-400 group-hover:scale-125 transition-transform" />
            <span className="tracking-wider">KINETIC</span>
          </a>

          {/* Zone 2: 4-5 single-line clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative py-1 hover:text-white transition-colors whitespace-nowrap shrink-0 group"
                onClick={() => soundManager.playClick()}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-indigo-400 to-violet-400 transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action & sound control */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Audio feedback toggle */}
            <button
              onClick={handleToggleSound}
              type="button"
              className={`p-2 rounded-lg transition-colors border ${
                soundOn
                  ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-300'
                  : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white'
              }`}
              title={soundOn ? 'Mute interactive audio' : 'Enable ambient sound feedback'}
              aria-label="Toggle sound"
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Primary Action Button */}
            <Magnetic strength={0.25} className="hidden sm:inline-block">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onOpenContact();
                }}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-600/25 border border-indigo-400/30 whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Start Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
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

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-[#08080b]/95 backdrop-blur-2xl flex flex-col pt-24 px-8 pb-10">
          <nav className="flex flex-col gap-6 text-xl font-medium text-neutral-200">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  soundManager.playClick();
                  setMobileMenuOpen(false);
                }}
                className="border-b border-white/10 pb-4 flex items-center justify-between text-neutral-200 hover:text-white"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-5 h-5 text-neutral-500" />
              </a>
            ))}
          </nav>
          <div className="mt-auto pt-8">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-4 text-center font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl shadow-lg border border-indigo-400/30 cursor-pointer"
            >
              Start Project
            </button>
          </div>
        </div>
      )}
    </>
  );
};
