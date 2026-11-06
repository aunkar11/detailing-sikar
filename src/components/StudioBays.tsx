import React from 'react';
import { ShieldCheck, Wind, Thermometer, Sparkles, Award, Star } from 'lucide-react';

export const StudioBays: React.FC = () => {
  const bays = [
    {
      num: '01',
      name: 'Decontamination & Wash Bay',
      specs: 'Reverse osmosis DI water · Touchless foam cannon · Iron fallout dissolution',
      temp: '68°F / 20°C',
      filtration: 'Active drainage & oil separator',
    },
    {
      num: '02',
      name: 'Paint Correction Cleanroom',
      specs: '5000K CRI 98+ Hex LED lighting · Rupes dual-action polishers · Micron depth scanning',
      temp: '70°F / 21°C',
      filtration: 'Dual positive air pressure',
    },
    {
      num: '03',
      name: 'Ceramic & PPF Sterile Bay',
      specs: 'Dust-free cleanroom · Shortwave infrared thermal curing lamps · XPEL DAP plotter',
      temp: '72°F / 22°C',
      filtration: 'Medical-grade HEPA H14 filtration',
    },
  ];

  const testimonials = [
    {
      quote:
        'They took my brand new Fortuner Legender with dealer delivery swirls and turned it into an absolute black mirror. The hydrophobic water beading on the highway during heavy rain is astonishing.',
      author: 'Vikram Shekhawat',
      car: '2025 Toyota Fortuner Legender 4x4',
      service: 'Full Body PPF + 5-Year Graphene Ceramic',
    },
    {
      quote:
        'Best auto detailing facility in Rajasthan. The cleanroom bays at Detailing Sikar are cleaner than an operating room. The booking experience and craftsmanship are unmatched.',
      author: 'Pooja Choudhary',
      car: '2026 Mahindra Thar Roxx 4x4',
      service: '2-Stage Paint Correction & Ceramic',
    },
  ];

  return (
    <section id="studio" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-cyan-400 mb-2">
          Step 05 · Cleanroom Facility Architecture
        </p>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase text-balance">
          ENGINEERED ENVIRONMENT. ZERO DUST.
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base mt-2">
          Ceramic coatings and paint protection film fail when applied in open garages. We operate 3 sealed climate-controlled cleanroom bays.
        </p>
      </div>

      {/* Bays Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {bays.map((bay) => (
          <div
            key={bay.num}
            className="rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-cyan-400/40 transition-all duration-300 group"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-4">
                <span className="text-cyan-400 font-bold">Bay {bay.num}</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Climate Stabilized</span>
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                {bay.name}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                {bay.specs}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-2 text-xs font-mono text-neutral-300">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Temp Target:</span>
                </span>
                <span className="text-white">{bay.temp}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Air Quality:</span>
                </span>
                <span className="text-white">{bay.filtration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Verified Client Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="rounded-3xl glass-panel-glow border border-white/10 p-8 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-neutral-200 leading-relaxed italic">
                "{t.quote}"
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white">{t.author}</div>
                <div className="text-xs text-cyan-400 font-mono mt-0.5">{t.car}</div>
              </div>
              <div className="text-xs font-mono text-neutral-500 text-right">
                {t.service}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
