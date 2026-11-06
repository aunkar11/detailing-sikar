import React, { useState, useEffect } from 'react';
import { ArrowUp, ShieldCheck, MapPin, Phone, Clock, Mail } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { soundManager } from '../utils/audio';

interface DetailingFooterProps {
  onScrollToTop: () => void;
  onOpenAdmin: () => void;
}

export const DetailingFooter: React.FC<DetailingFooterProps> = ({ onScrollToTop, onOpenAdmin }) => {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }) + ' IST (Sikar Studio)'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-white/10 bg-[#060609] py-16 px-4 sm:px-8 text-neutral-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10">
        {/* Brand Lockup */}
        <div className="space-y-4 max-w-sm">
          <div className="flex items-center gap-2 text-white font-extrabold tracking-wider text-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span>DETAILING SIKAR</span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Sikar's premier automotive aesthetic studio. Dedicated to multi-stage paint correction, 9H ceramic coatings, and precision self-healing paint protection film (PPF).
          </p>

          <div className="pt-2 flex items-center gap-4 text-xs font-mono text-cyan-400">
            <span>IDA Certified</span>
            <span>·</span>
            <span>XPEL Master Installer</span>
            <span>·</span>
            <span>Gtechniq Accredited</span>
          </div>
        </div>

        {/* Studio Coordinates & Hours */}
        <div className="space-y-2 text-xs font-mono">
          <div className="text-white font-bold uppercase tracking-wider mb-2">
            Sikar Cleanroom Detailing Facility
          </div>
          <div className="flex items-center gap-2 text-neutral-300">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Piprali Road, Near Jaipur-Bikaner Bypass, Sikar, Rajasthan 332001</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-300">
            <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Mon – Sun: 9:00 AM – 8:00 PM IST</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-300">
            <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>+91 98290 14500 (Concierge Direct)</span>
          </div>
          <div className="text-cyan-300 pt-1">{timeStr}</div>
        </div>

        {/* Action Column */}
        <div className="flex flex-col items-start md:items-end gap-4">
          <Magnetic strength={0.3}>
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onScrollToTop();
              }}
              className="w-12 h-12 rounded-full glass-panel border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer shadow-lg group"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
            </button>
          </Magnetic>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onOpenAdmin();
            }}
            className="text-xs font-mono text-neutral-500 hover:text-cyan-400 transition-colors cursor-pointer mt-2"
          >
            Studio Owner & Staff Login →
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 mt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-600">
        <p>© 2026 Detailing Sikar. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#wash" className="hover:text-neutral-400 transition-colors">
            Scroll to Wash
          </a>
          <a href="#inspection" className="hover:text-neutral-400 transition-colors">
            Paint Inspection
          </a>
          <a href="#packages" className="hover:text-neutral-400 transition-colors">
            Packages
          </a>
          <a href="#studio" className="hover:text-neutral-400 transition-colors">
            Cleanroom Bays
          </a>
        </div>
      </div>
    </footer>
  );
};
