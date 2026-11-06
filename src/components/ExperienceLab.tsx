import React, { useRef, useEffect, useState } from 'react';
import { Sliders, RefreshCw, Zap, Sparkles, Maximize2 } from 'lucide-react';
import { soundManager } from '../utils/audio';

type Mode = 'wave' | 'gravity' | 'quantum';
type Palette = 'violet' | 'cyan' | 'amber';

export const ExperienceLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<Mode>('wave');
  const [palette, setPalette] = useState<Palette>('violet');
  const [speed, setSpeed] = useState<number>(1.2);
  const [density, setDensity] = useState<number>(120);
  const [particleCount, setParticleCount] = useState<number>(120);

  // Canvas animation logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 480);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 480;
    };
    window.addEventListener('resize', handleResize);

    // Particle state
    interface Particle {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;
      size: number;
      angle: number;
      speed: number;
    }

    const count = density;
    setParticleCount(count);

    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 2.5 + 1,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    let isMouseDown = false;

    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const onPointerDown = () => {
      isMouseDown = true;
      soundManager.playTone(440, 'triangle', 0.15, 0.03);
    };

    const onPointerUp = () => {
      isMouseDown = false;
    };

    const onPointerLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      isMouseDown = false;
    };

    canvas.addEventListener('mousemove', onPointerMove);
    canvas.addEventListener('mousedown', onPointerDown);
    canvas.addEventListener('mouseup', onPointerUp);
    canvas.addEventListener('mouseleave', onPointerLeave);

    // Color definitions
    const getColors = (p: Palette) => {
      if (p === 'cyan') {
        return {
          primary: 'rgba(6, 182, 212, ',
          secondary: 'rgba(59, 130, 246, ',
          line: 'rgba(6, 182, 212, 0.12)',
        };
      }
      if (p === 'amber') {
        return {
          primary: 'rgba(245, 158, 11, ',
          secondary: 'rgba(239, 68, 68, ',
          line: 'rgba(245, 158, 11, 0.12)',
        };
      }
      return {
        primary: 'rgba(129, 140, 248, ',
        secondary: 'rgba(168, 85, 247, ',
        line: 'rgba(129, 140, 248, 0.14)',
      };
    };

    let step = 0;

    const render = () => {
      step += 0.015 * speed;
      ctx.clearRect(0, 0, width, height);

      // Deep dark background
      ctx.fillStyle = '#08080b';
      ctx.fillRect(0, 0, width, height);

      const colors = getColors(palette);

      // Render mode variations
      if (mode === 'wave') {
        // Fluid sine lines connecting particles
        ctx.beginPath();
        ctx.strokeStyle = colors.line;
        ctx.lineWidth = 1;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.angle += p.speed * speed;
          p.y = p.originY + Math.sin(p.angle + step * 2) * 28;
          p.x = p.originX + Math.cos(p.angle + step) * 15;

          // Mouse interaction (repel)
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const force = (140 - dist) / 140;
            p.x -= (dx / dist) * force * 25;
            p.y -= (dy / dist) * force * 25;
          }

          // Connect adjacent nodes
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const d = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (d < 75) {
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
            }
          }

          // Draw node
          ctx.fillStyle = colors.primary + `${0.3 + Math.sin(p.angle) * 0.3})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.stroke();
      } else if (mode === 'gravity') {
        // Particles flock toward center or mouse
        const targetX = mouseX > 0 ? mouseX : width / 2;
        const targetY = mouseY > 0 ? mouseY : height / 2;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = targetX - p.x;
          const dy = targetY - p.y;
          const dist = Math.hypot(dx, dy) || 1;

          const strength = (isMouseDown ? 0.08 : 0.02) * speed;
          p.vx += (dx / dist) * strength;
          p.vy += (dy / dist) * strength;

          p.vx *= 0.94;
          p.vy *= 0.94;

          p.x += p.vx;
          p.y += p.vy;

          ctx.fillStyle = colors.secondary + '0.7)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (isMouseDown ? 1.5 : 1), 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        // Quantum Swarm: Brownian floating with light trails
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx * speed;
          p.y += p.vy * speed;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          ctx.fillStyle = colors.primary + '0.6)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.2, 0, Math.PI * 2);
          ctx.fill();

          // Mouse orbital attractor
          if (mouseX > 0) {
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const d = Math.hypot(dx, dy);
            if (d < 160) {
              ctx.strokeStyle = colors.line;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mouseX, mouseY);
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onPointerMove);
      canvas.removeEventListener('mousedown', onPointerDown);
      canvas.removeEventListener('mouseup', onPointerUp);
      canvas.removeEventListener('mouseleave', onPointerLeave);
    };
  }, [mode, palette, speed, density]);

  return (
    <section id="lab" className="py-28 px-6 md:px-10 max-w-7xl mx-auto w-full relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-xs md:text-sm font-mono tracking-widest uppercase text-indigo-400 mb-3">
            03. Experience Lab
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase text-balance">
            Realtime Generative Physics Sandbox
          </h2>
        </div>
        <p className="text-sm md:text-base text-neutral-400 max-w-md">
          Interact with our generative fluid simulator. Drag your pointer across the canvas to distort gravitational trajectories in real time.
        </p>
      </div>

      {/* Main Interactive Sandbox Card */}
      <div
        ref={containerRef}
        className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl"
      >
        {/* Top Control Bar */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-[#0e0e14]/90 backdrop-blur-md">
          {/* Mode Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10">
            {(['wave', 'gravity', 'quantum'] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setMode(m);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono capitalize transition-all cursor-pointer ${
                  mode === m
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {m === 'wave' ? 'Fluid Wave' : m === 'gravity' ? 'Gravitational Vortex' : 'Quantum Swarm'}
              </button>
            ))}
          </div>

          {/* Palette Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-neutral-400 hidden sm:inline">Palette:</span>
            {(['violet', 'cyan', 'amber'] as Palette[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setPalette(p);
                }}
                className={`w-6 h-6 rounded-full transition-all border ${
                  palette === p ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'
                } ${
                  p === 'violet'
                    ? 'bg-gradient-to-tr from-indigo-500 to-purple-500 border-indigo-400'
                    : p === 'cyan'
                    ? 'bg-gradient-to-tr from-cyan-400 to-blue-500 border-cyan-300'
                    : 'bg-gradient-to-tr from-amber-400 to-red-500 border-amber-300'
                }`}
                title={`Select ${p} theme`}
              />
            ))}
          </div>

          {/* Interactive Sliders */}
          <div className="flex items-center gap-6 text-xs font-mono text-neutral-300">
            <div className="flex items-center gap-2">
              <span>Speed:</span>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-20 accent-indigo-500 cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-2">
              <span>Nodes:</span>
              <input
                type="range"
                min="60"
                max="180"
                step="20"
                value={density}
                onChange={(e) => setDensity(parseInt(e.target.value, 10))}
                className="w-20 accent-indigo-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Canvas Display Viewport */}
        <div className="relative w-full h-[480px] bg-[#08080b] cursor-crosshair overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Subtle floating overlay hint */}
          <div className="absolute bottom-5 left-6 pointer-events-none flex items-center gap-3 text-xs font-mono text-neutral-400">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Interactive: Move or click to create gravitational displacement</span>
          </div>

          <div className="absolute bottom-5 right-6 pointer-events-none text-xs font-mono text-neutral-500">
            Active Nodes: {particleCount} · Refresh: 60 FPS
          </div>
        </div>
      </div>
    </section>
  );
};
