import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { soundManager } from '../utils/audio';

interface FooterProps {
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop }) => {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          timeZone: 'UTC',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-white/10 bg-[#060608] py-16 px-6 md:px-10 text-neutral-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand & Mission Statement */}
        <div className="space-y-2">
          <a
            href="#"
            className="text-lg font-bold tracking-tight text-white flex items-center gap-2"
            onClick={() => soundManager.playClick()}
          >
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <span className="tracking-wider">KINETIC DIGITAL STUDIO</span>
          </a>
          <p className="text-xs text-neutral-500 max-w-sm">
            Engineering spatial computing environments and fluid motion systems for forward-thinking global brands.
          </p>
        </div>

        {/* Live Studio Time & Coordinates */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-xs font-mono">
          <div>
            <span className="text-neutral-500">Global Clock: </span>
            <span className="text-neutral-200 tabular-nums">{timeString || '00:00:00 UTC'}</span>
          </div>
          <div>
            <span className="text-neutral-500">Studios: </span>
            <span className="text-neutral-300">Paris · London · San Francisco</span>
          </div>
        </div>

        {/* Back to top magnetic trigger */}
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
      </div>

      <div className="max-w-7xl mx-auto pt-10 mt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <p>© 2026 Kinetic Experience Studio Inc. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#capabilities" className="hover:text-neutral-300 transition-colors">
            Capabilities
          </a>
          <a href="#works" className="hover:text-neutral-300 transition-colors">
            Works
          </a>
          <a href="#lab" className="hover:text-neutral-300 transition-colors">
            Lab
          </a>
          <a href="#contact" className="hover:text-neutral-300 transition-colors">
            Inquire
          </a>
        </div>
      </div>
    </footer>
  );
};
