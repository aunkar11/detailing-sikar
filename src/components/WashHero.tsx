import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Droplets, RotateCcw, Play, ArrowDown, ShieldCheck } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { Magnetic } from './Magnetic';

// Pixel-perfect identical twin images of the exact same vehicle in the exact same studio bay
const DIRTY_CAR = '/src/assets/images/car_suv_dirty_exact_1793944391936.jpg';
const CLEAN_CAR = '/src/assets/images/car_clean_gloss_ceramic_suv_1793943890545.jpg';

interface WashHeroProps {
  onOpenBooking: () => void;
}

export const WashHero: React.FC<WashHeroProps> = ({ onOpenBooking }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [washProgress, setWashProgress] = useState<number>(40); // 0 = completely dirty, 100 = completely washed
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoWashing, setIsAutoWashing] = useState(false);

  // Scroll to Wash Trigger using GSAP ScrollTrigger
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: '+=120%',
      pin: true,
      scrub: 0.6,
      onUpdate: (self) => {
        // Map scroll progress to wash progress from 0% to 100%
        if (!isDragging && !isAutoWashing) {
          const p = Math.round(self.progress * 100);
          setWashProgress(p);
        }
      },
    });

    return () => {
      st.kill();
    };
  }, [isDragging, isAutoWashing]);

  // Dragging interaction logic
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    soundManager.playWashSpray();
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = () => {
    if (isDragging) {
      setIsDragging(false);
      soundManager.playWaterDrop();
    }
  };

  const updatePosition = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setWashProgress(percent);
  };

  // Automated Pressure Wash Sweep
  const triggerAutoWash = () => {
    soundManager.playWashSpray();
    setIsAutoWashing(true);
    const obj = { val: washProgress };
    gsap.to(obj, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => setWashProgress(obj.val),
      onComplete: () => {
        setIsAutoWashing(false);
        soundManager.playChime();
      },
    });
  };

  const resetToMud = () => {
    soundManager.playClick();
    const obj = { val: washProgress };
    gsap.to(obj, {
      val: 0,
      duration: 1.2,
      ease: 'power2.out',
      onUpdate: () => setWashProgress(obj.val),
    });
  };

  return (
    <section
      ref={containerRef}
      id="wash"
      className="relative w-full min-h-screen bg-[#08080b] flex flex-col items-center justify-center pt-28 pb-16 px-4 sm:px-8 select-none overflow-hidden"
    >
      {/* Ambient Hex Ceiling Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-cyan-500/10 blur-[130px] pointer-events-none -z-10 rounded-full" />

      {/* Hero Headline & POV Kicker */}
      <div className="text-center max-w-4xl mx-auto mb-8 z-10">
        <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-cyan-400 mb-2">
          POV: Your Detailing Website Finally Looks As Good As Your Work
        </p>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase text-balance">
          BRING IT DIRTY.
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base font-medium mt-3 flex items-center justify-center gap-2">
          <span>{washProgress < 95 ? 'SCROLL OR DRAG TO WASH IT' : 'MIRROR CERAMIC COATING ACTIVATED'}</span>
          <ArrowDown className={`w-4 h-4 text-cyan-400 ${washProgress < 95 ? 'animate-bounce' : ''}`} />
        </p>
      </div>

      {/* Main Car Wash Comparison Stage */}
      <div className="w-full max-w-6xl mx-auto relative px-2 sm:px-4">
        <div
          ref={sliderRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="relative w-full aspect-[16/9] md:aspect-[21/10] rounded-2xl md:rounded-3xl overflow-hidden border border-white/20 shadow-2xl shadow-cyan-950/40 bg-black cursor-ew-resize group"
        >
          {/* Base Layer: Exact Same Car (Covered in Mud & Dirt) */}
          <img
            src={DIRTY_CAR}
            alt="Muddy off-road luxury vehicle before detailing"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Clean Car Overlay (Pixel-perfect identical geometry revealed via clip-path inset) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: `inset(0 ${100 - washProgress}% 0 0)`,
            }}
          >
            <img
              src={CLEAN_CAR}
              alt="Mirror gloss ceramic coated luxury vehicle after detailing"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gloss light shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent pointer-events-none" />
          </div>

          {/* High-Pressure Water Jet / Dividing Divider Line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-300 via-white to-blue-400 pointer-events-none shadow-[0_0_20px_rgba(6,182,212,0.9)] z-20"
            style={{ left: `${washProgress}%` }}
          >
            {/* Water Spray Mist Foam Emitter */}
            <div className="absolute -top-3 -bottom-3 -left-3 -right-3 bg-cyan-400/20 blur-sm pointer-events-none" />

            {/* Draggable Water Spray Jet Nozzle Handle */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/85 backdrop-blur-md border-2 border-cyan-400 text-white flex items-center justify-center shadow-xl shadow-cyan-500/50 group-hover:scale-110 transition-transform cursor-ew-resize">
              <Droplets className="w-5 h-5 sm:w-6 h-6 text-cyan-300 animate-pulse" />
            </div>

            {/* Water Spray Particles Simulator */}
            {isDragging || isAutoWashing ? (
              <div className="absolute inset-y-0 -left-6 w-12 pointer-events-none overflow-hidden">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-white/80 blur-[1px] animate-ping"
                    style={{
                      top: `${(i / 8) * 100}%`,
                      left: `${Math.random() * 20}px`,
                      animationDuration: '0.6s',
                    }}
                  />
                ))}
              </div>
            ) : null}
          </div>

          {/* Floating Badges */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none">
            <div className="glass-panel px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-mono text-neutral-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>BEFORE: Heavy Mud & Road Film</span>
            </div>
          </div>

          <div className="absolute top-4 right-4 z-20 pointer-events-none">
            <div className="glass-panel px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-mono text-cyan-300 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>AFTER: 9H Ceramic Matrix</span>
            </div>
          </div>

          {/* Bottom Interactive HUD Bar */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
            <div className="glass-panel px-4 py-2 rounded-xl border border-white/10 text-xs font-mono text-neutral-300 flex items-center gap-3">
              <span className="text-cyan-400 font-bold tabular-nums">{Math.round(washProgress)}%</span>
              <span className="text-neutral-500">|</span>
              <span>{washProgress > 90 ? 'Deep Obsidian Reflection' : 'Pressure Wash Active'}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={triggerAutoWash}
                disabled={isAutoWashing}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono transition-all flex items-center gap-1.5 shadow-lg shadow-cyan-600/30 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Auto Wash</span>
              </button>

              <button
                type="button"
                onClick={resetToMud}
                className="px-3.5 py-2 rounded-xl glass-panel text-neutral-300 hover:text-white text-xs font-mono border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Reset to dirty state"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick CTA strip below wash stage */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400 border-t border-white/10 pt-6">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-white">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Certified Gtechniq & XPEL Installers</span>
            </span>
            <span className="hidden md:inline text-neutral-600">·</span>
            <span className="hidden md:inline">Climate Controlled Cleanroom Bay</span>
          </div>

          <Magnetic strength={0.2}>
            <button
              type="button"
              onClick={() => {
                soundManager.playChime();
                onOpenBooking();
              }}
              className="px-5 py-2.5 rounded-xl bg-white text-black font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Book Your Transformation</span>
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
};
