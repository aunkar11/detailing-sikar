import React, { useEffect, useState, useRef } from 'react';
import { X, Volume2, VolumeX, Play, Pause, RotateCcw, Maximize, Award, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(24);
  const [isMuted, setIsMuted] = useState(false);
  const [activeSegment, setActiveSegment] = useState(0);

  const segments = [
    { title: 'Arcturus Spatial Engine', timestamp: '0:00 - 0:42', client: 'Autonomous Robotics' },
    { title: 'Volta Photoreal Raytracing', timestamp: '0:43 - 1:15', client: 'Electric Hypercar' },
    { title: 'Prism Kinetic Audio Lab', timestamp: '1:16 - 1:58', client: 'Generative Sound' },
    { title: 'Zenith Multi-User Canvas', timestamp: '1:59 - 2:30', client: 'Spatial Computing' },
  ];

  // Simulated playback timer
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 0.5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden glass-panel-glow border border-white/20 bg-[#08080b] shadow-2xl flex flex-col">
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-300">
              Kinetic Studio · 2026 Architectural Showreel (4K 60FPS)
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close showreel modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Viewport Stage */}
        <div className="relative aspect-[16/9] w-full bg-neutral-950 overflow-hidden flex items-center justify-center">
          <img
            src="/src/assets/images/hero_cinematic_showcase_1793942553123.jpg"
            alt="Kinetic Studio Showreel Reel"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-95"
          />

          {/* Ambient Lighting Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

          {/* Simulated Audio Visualizer Wave */}
          <div className="absolute bottom-16 left-8 right-8 flex items-end gap-1 h-12 pointer-events-none opacity-70">
            {Array.from({ length: 48 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-indigo-500 to-violet-300 rounded-t-sm transition-all duration-150"
                style={{
                  height: isPlaying ? `${Math.sin(i * 0.4 + progress * 0.2) * 20 + 24}px` : '4px',
                }}
              />
            ))}
          </div>

          {/* Big Play / Pause Overlay Button */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setIsPlaying(!isPlaying);
            }}
            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white flex items-center justify-center hover:scale-110 hover:bg-white hover:text-black transition-all cursor-pointer shadow-2xl"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-0.5" />
            )}
          </button>
        </div>

        {/* Playback Scrubber & Transport Controls */}
        <div className="p-4 sm:p-6 bg-[#0e0e14] border-t border-white/10 space-y-4">
          {/* Progress bar */}
          <div
            className="relative w-full h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = ((e.clientX - rect.left) / rect.width) * 100;
              setProgress(pct);
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-400 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Bottom Bar Controls & Chapters */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-300">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setIsPlaying(!isPlaying);
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setProgress(0);
                }}
                className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setIsMuted(!isMuted);
                }}
                className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isMuted ? 'Muted' : 'Audio On'}</span>
              </button>
            </div>

            {/* Segments / Chapters list */}
            <div className="hidden md:flex items-center gap-4 text-neutral-400">
              {segments.map((seg, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setActiveSegment(idx);
                    setProgress(idx * 25);
                  }}
                  className={`hover:text-white transition-colors cursor-pointer ${
                    activeSegment === idx ? 'text-indigo-400 font-semibold' : ''
                  }`}
                >
                  {seg.title}
                </button>
              ))}
            </div>

            <div className="text-neutral-400">
              <span>{Math.floor((progress * 150) / 100 / 60)}:{String(Math.floor((progress * 150) / 100) % 60).padStart(2, '0')}</span>
              <span className="mx-1">/</span>
              <span>2:30</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
