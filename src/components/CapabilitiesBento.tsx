import React, { useRef, useState } from 'react';
import { ArrowUpRight, Cpu, Compass, Sparkles, Activity } from 'lucide-react';
import { soundManager } from '../utils/audio';

const SPATIAL_IMG = '/src/assets/images/bento_spatial_computing_1793942554832.jpg';
const MOTION_IMG = '/src/assets/images/bento_motion_design_1793942554627.jpg';
const EXPERIENCE_IMG = '/src/assets/images/bento_interactive_experience_1793942553471.jpg';

interface CardSpotlightProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const BentoCard: React.FC<CardSpotlightProps> = ({ children, className = '', onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        soundManager.playHover();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: -1000, y: -1000 });
      }}
      onClick={onClick}
      className={`relative group rounded-3xl overflow-hidden glass-panel border border-white/10 transition-all duration-300 hover:border-indigo-400/30 hover:shadow-2xl hover:shadow-indigo-500/10 ${className}`}
    >
      {/* Radial Hover Spotlight Overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.12), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};

interface CapabilitiesBentoProps {
  onSelectCapability: (title: string) => void;
}

export const CapabilitiesBento: React.FC<CapabilitiesBentoProps> = ({ onSelectCapability }) => {
  const [benchmarkState, setBenchmarkState] = useState<'idle' | 'testing' | 'optimal'>('optimal');

  const runBenchmark = () => {
    soundManager.playClick();
    setBenchmarkState('testing');
    setTimeout(() => {
      setBenchmarkState('optimal');
      soundManager.playTone(660, 'sine', 0.2, 0.05);
    }, 700);
  };

  return (
    <section id="capabilities" className="py-28 px-6 md:px-10 max-w-7xl mx-auto w-full relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <p className="text-xs md:text-sm font-mono tracking-widest uppercase text-indigo-400 mb-3">
            02. Core Capabilities
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase text-balance">
            Engineered for Visceral Immersion
          </h2>
        </div>
        <p className="text-sm md:text-base text-neutral-400 max-w-md">
          Every dimension of our digital architecture is built from atomic mathematical principles, delivering unflinching frame rates and tactile responsiveness.
        </p>
      </div>

      {/* Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Card 1: Large Spatial Computing (8 cols) */}
        <BentoCard
          className="md:col-span-12 lg:col-span-8 flex flex-col justify-between min-h-[460px] cursor-pointer"
          onClick={() => onSelectCapability('Immersive 3D Viewports & Spatial UX')}
        >
          <div className="relative h-64 sm:h-72 w-full overflow-hidden">
            <img
              src={SPATIAL_IMG}
              alt="Spatial Computing Architecture"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-transparent to-black/30" />
            
            {/* Top clean index */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-300">01 / Spatial Computing</span>
              <div className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-10 flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Immersive 3D Viewports & Spatial UX
              </h3>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl">
                We craft custom GLSL shaders, camera choreography, and volumetric lighting pipelines directly into responsive web interfaces, unlocking cinematic depth without plugin friction.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex flex-wrap items-center gap-3 text-xs text-neutral-400">
              <span className="text-indigo-400 font-medium">Core Stack</span>
              <span>·</span>
              <span>WebGL 2.0</span>
              <span>·</span>
              <span>Three.js</span>
              <span>·</span>
              <span>GLSL Fragment Shaders</span>
              <span>·</span>
              <span>Hardware Acceleration</span>
            </div>
          </div>
        </BentoCard>

        {/* Card 2: Kinetic Motion (4 cols) */}
        <BentoCard
          className="md:col-span-6 lg:col-span-4 flex flex-col justify-between min-h-[460px] cursor-pointer"
          onClick={() => onSelectCapability('Sculptural Motion & Fluid Dynamics')}
        >
          <div className="relative h-56 w-full overflow-hidden">
            <img
              src={MOTION_IMG}
              alt="Sculptural Motion Design"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-transparent to-black/20" />
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-300">02 / Motion Design</span>
              <div className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="p-8 flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Sculptural Motion & Fluid Dynamics
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Physics-based micro-interactions and scroll-synchronized transformations calibrated for organic weight and zero perceptual latency.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
              <span>GSAP ScrollTrigger</span>
              <span>·</span>
              <span>Lenis Inertia</span>
              <span>·</span>
              <span>Spring Curves</span>
            </div>
          </div>
        </BentoCard>

        {/* Card 3: Tangible Installations (4 cols) */}
        <BentoCard
          className="md:col-span-6 lg:col-span-4 flex flex-col justify-between min-h-[420px] cursor-pointer"
          onClick={() => onSelectCapability('Experiential Showrooms & Physical-Digital Kiosks')}
        >
          <div className="relative h-52 w-full overflow-hidden">
            <img
              src={EXPERIENCE_IMG}
              alt="Experiential Installations"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-transparent to-black/20" />
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-300">03 / Experiential</span>
              <div className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="p-8 flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Showrooms & Physical Kiosks
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Seamless multi-display synchronizations, gestural sensors, and high-fidelity kiosk runtime apps for luxury retail pavilions.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
              <span>Touch Kiosks</span>
              <span>·</span>
              <span>Spatial Projections</span>
              <span>·</span>
              <span>Sensor I/O</span>
            </div>
          </div>
        </BentoCard>

        {/* Card 4: Frame Discipline & Benchmark Engine (8 cols) */}
        <BentoCard className="md:col-span-12 lg:col-span-8 p-8 sm:p-10 flex flex-col justify-between min-h-[420px]">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-mono text-neutral-300 mb-2">04 / Performance Engineering</div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Unflinching 120Hz Frame Budget Discipline
              </h3>
              <p className="text-neutral-400 text-sm sm:text-base max-w-xl">
                We ban expensive DOM layout reflows on scroll. Every animation leverages hardware compositor layers with sub-millisecond calculation budgets.
              </p>
            </div>

            <button
              type="button"
              onClick={runBenchmark}
              className="px-4 py-2 rounded-xl glass-panel text-xs font-mono text-indigo-300 hover:text-white hover:border-indigo-400/40 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>{benchmarkState === 'testing' ? 'Benchmarking...' : 'Test Performance'}</span>
            </button>
          </div>

          {/* Interactive Benchmark Telemetry Graph Display */}
          <div className="w-full bg-black/40 rounded-2xl p-6 border border-white/5">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-4 pb-2 border-b border-white/5">
              <span className="flex items-center gap-2 text-white">
                <Cpu className="w-4 h-4 text-indigo-400" />
                <span>Runtime GPU Diagnostic</span>
              </span>
              <span className="text-emerald-400 tabular-nums">
                {benchmarkState === 'testing' ? 'Calculating...' : 'Status: Optimal (59.8–60.0 FPS)'}
              </span>
            </div>

            {/* Visualizer bars */}
            <div className="grid grid-cols-12 gap-1.5 h-16 items-end">
              {[42, 58, 70, 85, 92, 64, 78, 95, 88, 98, 92, 96].map((height, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-t from-indigo-950 to-indigo-500 rounded-sm transition-all duration-500 hover:brightness-125"
                  style={{
                    height: benchmarkState === 'testing' ? `${Math.random() * 80 + 20}%` : `${height}%`,
                    opacity: 0.7 + (i / 12) * 0.3,
                  }}
                />
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between text-xs font-mono text-neutral-400 gap-4">
              <span>Main Thread: 0.8ms</span>
              <span>GPU Memory: 12.4MB</span>
              <span>Composite Time: 0.3ms</span>
              <span className="text-white font-medium">Layout Shifts: 0.000</span>
            </div>
          </div>
        </BentoCard>
      </div>
    </section>
  );
};
