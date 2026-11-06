import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { Play, Sparkles, MoveRight, Layers, Eye } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { soundManager } from '../utils/audio';

// Path to high-fidelity generated hero asset
const HERO_IMAGE_PATH = '/src/assets/images/hero_cinematic_showcase_1793942553123.jpg';

interface HeroProps {
  onOpenShowreel: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenShowreel, onOpenContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const mediaContainerRef = useRef<HTMLDivElement>(null);
  const mediaTiltRef = useRef<HTMLDivElement>(null);
  
  const [interactiveMode, setInteractiveMode] = useState<'visual' | 'wireframe'>('visual');
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        kickerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      )
        .fromTo(
          headlineRef.current?.querySelectorAll('.headline-word') || [],
          { opacity: 0, y: 40, rotateX: -20 },
          { opacity: 1, y: 0, rotateX: 0, stagger: 0.08, duration: 1 },
          '-=0.5'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          ctaGroupRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          mediaContainerRef.current,
          { opacity: 0, scale: 0.95, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power2.out' },
          '-=0.8'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 3D Parallax Tilt Effect on Media Showcase
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = mediaTiltRef.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(el, {
      rotateX,
      rotateY,
      transformPerspective: 1200,
      duration: 0.6,
      ease: 'power1.out',
    });
  };

  const handleMouseLeave = () => {
    const el = mediaTiltRef.current;
    if (!el) return;
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  };

  const words = ['ARCHITECTING', 'VISCERAL', 'DIGITAL', 'EXPERIENCES'];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen pt-32 pb-20 md:pt-40 md:pb-32 px-6 md:px-10 overflow-hidden flex flex-col justify-center"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-indigo-600/15 via-violet-600/10 to-transparent blur-[120px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-1/3 left-10 w-[350px] h-[350px] bg-blue-600/10 blur-[100px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Top Kicker - Editorial Style */}
        <p
          ref={kickerRef}
          className="text-xs md:text-sm font-mono tracking-widest uppercase text-indigo-400 mb-6 flex items-center gap-3"
        >
          <span>01. Spatial Engineering & Motion Design</span>
          <span className="w-8 h-[1px] bg-indigo-500/40 inline-block" />
          <span className="text-neutral-500 hidden sm:inline">Paris · Tokyo · San Francisco</span>
        </p>

        {/* Hero Headline with split word staggered reveal */}
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white uppercase text-balance leading-[1.05] mb-8"
        >
          {words.map((word, i) => (
            <span
              key={i}
              className={`headline-word inline-block mr-3 md:mr-5 ${
                i === 1 ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-violet-200 to-indigo-100' : ''
              }`}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Subtitle & Value Proposition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          <p
            ref={subtitleRef}
            className="lg:col-span-8 text-lg sm:text-xl text-neutral-300 font-normal leading-relaxed max-w-3xl"
          >
            We merge tactile 3D spatial computing, fluid inertial physics, and bespoke GLSL shaders to craft digital flagships that convert passive audiences into devoted brand advocates.
          </p>

          {/* Action CTAs */}
          <div
            ref={ctaGroupRef}
            className="lg:col-span-4 flex flex-wrap items-center gap-4 lg:justify-end"
          >
            <Magnetic strength={0.3}>
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onOpenShowreel();
                }}
                className="px-6 py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-100 transition-all shadow-xl shadow-white/10 flex items-center gap-2.5 cursor-pointer group"
              >
                <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center transition-transform group-hover:scale-110">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Play Showreel</span>
              </button>
            </Magnetic>

            <Magnetic strength={0.2}>
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onOpenContact();
                }}
                className="px-6 py-3.5 rounded-xl glass-panel text-white font-medium text-sm hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Schedule Discovery</span>
                <MoveRight className="w-4 h-4 text-neutral-400" />
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Integrated Media Showcase Element */}
        <div
          ref={mediaContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative mt-4 w-full"
        >
          <div
            ref={mediaTiltRef}
            className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden glass-panel-glow border border-white/15 transition-transform duration-300 ease-out group"
          >
            {/* Main Showcase Image */}
            <img
              src={HERO_IMAGE_PATH}
              alt="Kinetic Digital Experience Interactive Showcase"
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] ${
                interactiveMode === 'wireframe' ? 'filter invert contrast-125 brightness-75 hue-rotate-180' : ''
              }`}
            />

            {/* Cinematic Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08080b]/90 via-[#08080b]/30 to-transparent pointer-events-none" />

            {/* Interactive HUD / Canvas scanline simulation */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />

            {/* Floating Top Badge */}
            <div className="absolute top-4 md:top-6 left-4 md:left-6 flex items-center gap-3">
              <div className="glass-panel px-3.5 py-1.5 rounded-lg text-xs font-mono text-neutral-200 flex items-center gap-2 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Spatial WebGL Engine · 60 FPS</span>
              </div>
            </div>

            {/* Interactive Viewport Controls (Top Right) */}
            <div className="absolute top-4 md:top-6 right-4 md:right-6 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setInteractiveMode(interactiveMode === 'visual' ? 'wireframe' : 'visual');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 border cursor-pointer ${
                  interactiveMode === 'wireframe'
                    ? 'bg-indigo-600/80 text-white border-indigo-400'
                    : 'glass-panel text-neutral-300 hover:text-white border-white/10'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Shader Mode:</span>
                <span>{interactiveMode === 'visual' ? 'Rendered' : 'Mesh View'}</span>
              </button>
            </div>

            {/* Central Interactive Play Pulse */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setIsPlayingPreview(!isPlayingPreview);
                  onOpenShowreel();
                }}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white hover:text-black group/btn cursor-pointer shadow-2xl"
                aria-label="Launch interactive showreel video"
              >
                <Play className="w-6 h-6 md:w-8 md:h-8 fill-current ml-1 transition-transform group-hover/btn:scale-110" />
              </button>
            </div>

            {/* Bottom floating details bar */}
            <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs md:text-sm text-neutral-300">
              <div className="glass-panel px-4 py-2 rounded-xl border border-white/10 flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="font-medium text-white">Arcturus Spatial Canvas v3.2</span>
                <span className="text-neutral-500">/</span>
                <span className="text-neutral-400 hidden sm:inline">Interactive Multi-User WebGL</span>
              </div>

              <div className="glass-panel px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2 font-mono text-xs text-neutral-400">
                <Eye className="w-3.5 h-3.5 text-indigo-400" />
                <span>Interactions: Realtime Reactive</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
