import React from 'react';

export const TrustTicker: React.FC = () => {
  const stackItems = [
    'WebGL 2.0',
    'Three.js Spatial',
    'Custom GLSL Shaders',
    'GSAP Motion Engine',
    'Inertial Lenis Physics',
    'Interactive Audio Synthesis',
    'High-Density 3D Assets',
    'Spatial UI Systems',
  ];

  const metrics = [
    { value: '18ms', label: 'Average Frame Latency', detail: 'Consistent 60/120 FPS execution' },
    { value: '4.8M+', label: 'Global Experience Users', detail: 'Across 42 international territories' },
    { value: '99.9%', label: 'Frame Budget Compliance', detail: 'Zero layout shift or jank' },
    { value: '16', label: 'International Honors', detail: 'Awwwards SOTD, FWA of the Day, Red Dot' },
  ];

  return (
    <div className="w-full border-y border-white/10 bg-[#0c0c11]/80 backdrop-blur-md py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {metrics.map((m, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-3xl md:text-4xl font-bold font-mono text-white tracking-tight tabular-nums">
                {m.value}
              </span>
              <span className="text-sm font-medium text-neutral-300 mt-1">
                {m.label}
              </span>
              <span className="text-xs text-neutral-500 mt-0.5">
                {m.detail}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Horizontal Marquee */}
      <div className="relative flex overflow-x-hidden border-t border-white/5 pt-6 select-none">
        <div className="animate-marquee flex whitespace-nowrap gap-12 text-xs md:text-sm font-mono tracking-widest uppercase text-neutral-400 items-center">
          {stackItems.concat(stackItems).map((item, i) => (
            <span key={i} className="flex items-center gap-6 shrink-0">
              <span className="text-neutral-300 hover:text-white transition-colors">{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/60" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
