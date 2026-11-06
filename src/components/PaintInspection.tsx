import React, { useState, useRef } from 'react';
import { Eye, Sparkles, Droplet } from 'lucide-react';
import { soundManager } from '../utils/audio';

// Direct ESM asset imports for Vite/Vercel production bundling
import swirlAsset from '../assets/images/car_paint_swirl_macro_1793943891132.jpg';
import correctedAsset from '../assets/images/car_paint_swirl_corrected_exact_1793944410426.jpg';
import beadingAsset from '../assets/images/car_paint_ceramic_macro_1793943891793.jpg';

// Public directory fallbacks for static deployments (Vercel, Netlify, Cloud Run)
const SWIRL_IMG = swirlAsset || '/images/paint_swirl.jpg';
const CORRECTED_IMG = correctedAsset || '/images/paint_corrected.jpg';
const BEADING_IMG = beadingAsset || '/images/paint_beading.jpg';

export const PaintInspection: React.FC = () => {
  // Swirl Inspection Slider
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isInspecting, setIsInspecting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Hydrophobic Water Beading Simulation
  const [waterBeads, setWaterBeads] = useState<Array<{ id: number; x: number; y: number; size: number }>>([
    { id: 1, x: 25, y: 35, size: 14 },
    { id: 2, x: 42, y: 55, size: 20 },
    { id: 3, x: 60, y: 28, size: 16 },
    { id: 4, x: 75, y: 65, size: 24 },
    { id: 5, x: 85, y: 40, size: 18 },
  ]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsInspecting(true);
    soundManager.playClick();
    updateInspection(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isInspecting) return;
    updateInspection(e.clientX);
  };

  const handlePointerUp = () => {
    setIsInspecting(false);
  };

  const updateInspection = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const sprayWater = () => {
    soundManager.playWaterDrop();
    const newBeads = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 70 + 15,
      size: Math.random() * 16 + 10,
    }));
    setWaterBeads(newBeads);
  };

  return (
    <section id="inspection" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full select-none">
      {/* 1. LOOK CLOSER */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-cyan-400 mb-2">
          Step 02 · Surface Micro-Metrology
        </p>
        <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase text-balance">
          LOOK CLOSER.
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base mt-3">
          Automotive dealerships deliver cars riddled with rotary buffer trails and spiderweb scratches. We measure paint thickness down to the micron before corrective compounding.
        </p>

        {/* Micron Thickness Telemetry */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl glass-panel border border-white/10 text-xs font-mono">
          <div className="flex flex-col">
            <span className="text-neutral-500">Total Depth</span>
            <span className="text-lg font-bold text-white tabular-nums mt-0.5">138 µm</span>
          </div>
          <div className="flex flex-col">
            <span className="text-neutral-500">OEM Clear Coat</span>
            <span className="text-lg font-bold text-cyan-400 tabular-nums mt-0.5">45 µm</span>
          </div>
          <div className="flex flex-col">
            <span className="text-neutral-500">Ceramic Build</span>
            <span className="text-lg font-bold text-emerald-400 tabular-nums mt-0.5">+3.5 µm</span>
          </div>
          <div className="flex flex-col">
            <span className="text-neutral-500">Pencil Hardness</span>
            <span className="text-lg font-bold text-white mt-0.5">9H+ Diamond</span>
          </div>
        </div>
      </div>

      {/* 2. SWIRLS OUT. GLASS ON. (Before / After Correction Slider) */}
      <div className="mb-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
              SWIRLS OUT. GLASS ON.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-mono mt-1">
              Drag inspection light across the hood panel to reveal 2-stage multi-step paint correction on the exact same panel.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-amber-400">Left: Swirled Holograms</span>
            <span className="text-neutral-600">|</span>
            <span className="text-cyan-400">Right: Flawless Glass Matrix</span>
          </div>
        </div>

        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black cursor-ew-resize group"
        >
          {/* Swirled Base Image (Before) */}
          <img
            src={SWIRL_IMG}
            alt="Paint with severe swirl marks under detailing inspection light"
            referrerPolicy="no-referrer"
            onError={(e) => {
              if (e.currentTarget.src !== window.location.origin + '/images/paint_swirl.jpg') {
                e.currentTarget.src = '/images/paint_swirl.jpg';
              }
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Corrected Ceramic Overlay Image (After: Exact same panel & light, scratches eliminated) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
            }}
          >
            <img
              src={CORRECTED_IMG}
              alt="Immaculate paint with deep reflection after ceramic coating"
              referrerPolicy="no-referrer"
              onError={(e) => {
                if (e.currentTarget.src !== window.location.origin + '/images/paint_corrected.jpg') {
                  e.currentTarget.src = '/images/paint_corrected.jpg';
                }
              }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Dividing Inspection Beam */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_25px_rgba(255,255,255,1)] z-20 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-black/85 backdrop-blur-md border-2 border-white text-white flex items-center justify-center shadow-2xl shadow-cyan-500/50">
              <Eye className="w-5 h-5 text-cyan-300" />
            </div>
          </div>

          {/* Interactive Badges */}
          <div className="absolute bottom-5 left-5 glass-panel px-4 py-2 rounded-xl border border-white/10 text-xs font-mono text-cyan-300 z-10">
            <span>Glass On: 99.4% Specular Reflection</span>
          </div>
          <div className="absolute bottom-5 right-5 glass-panel px-4 py-2 rounded-xl border border-white/10 text-xs font-mono text-neutral-400 z-10">
            <span>Swirls Removed: 95%+ Defect Elimination</span>
          </div>
        </div>
      </div>

      {/* 3. KEYS BACK. JAW DROPS. (Hydrophobic Ceramic Demonstration) */}
      <div id="beading" className="rounded-3xl glass-panel border border-white/10 p-8 sm:p-12 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-mono tracking-widest uppercase text-cyan-400">
              Step 03 · Hydrophobic Ceramic Shell
            </p>
            <h3 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              KEYS BACK. JAW DROPS.
            </h3>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              When water, acid rain, bird droppings, or winter salt hit our ceramic-infused clear coats, they form 115° hydrophobic beads that slide off instantly with no water spotting.
            </p>

            <div className="pt-4 flex items-center gap-4">
              <button
                type="button"
                onClick={sprayWater}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-600/25 flex items-center gap-2 cursor-pointer"
              >
                <Droplet className="w-4 h-4 fill-white" />
                <span>Simulate Water Spray</span>
              </button>
            </div>
          </div>

          {/* Interactive Hydrophobic Hood Simulation */}
          <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-neutral-950">
            <img
              src={BEADING_IMG}
              alt="Hydrophobic water beading on car hood"
              referrerPolicy="no-referrer"
              onError={(e) => {
                if (e.currentTarget.src !== window.location.origin + '/images/paint_beading.jpg') {
                  e.currentTarget.src = '/images/paint_beading.jpg';
                }
              }}
              className="w-full h-full object-cover filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* Dynamic Water Beads */}
            {waterBeads.map((bead) => (
              <div
                key={bead.id}
                onClick={() => {
                  soundManager.playWaterDrop();
                  setWaterBeads(waterBeads.filter((b) => b.id !== bead.id));
                }}
                className="absolute rounded-full bg-cyan-100/40 backdrop-blur-md border border-white/80 shadow-[0_4px_10px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-125 cursor-pointer animate-in zoom-in"
                style={{
                  top: `${bead.y}%`,
                  left: `${bead.x}%`,
                  width: `${bead.size}px`,
                  height: `${bead.size}px`,
                  boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.8), 0 4px 8px rgba(0,0,0,0.4)',
                }}
                title="Click water bead to roll off"
              />
            ))}

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-neutral-300">
              <span className="glass-panel px-3 py-1.5 rounded-lg border border-white/10">
                Contact Angle: 115° Superhydrophobic
              </span>
              <span className="text-cyan-400">Tap beads to disperse</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
