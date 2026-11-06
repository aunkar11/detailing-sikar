import React, { useState } from 'react';
import { ArrowUpRight, TrendingUp, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { soundManager } from '../utils/audio';

const PROJECT_1_IMG = '/src/assets/images/hero_cinematic_showcase_1793942553123.jpg';
const PROJECT_2_IMG = '/src/assets/images/bento_spatial_computing_1793942554832.jpg';
const PROJECT_3_IMG = '/src/assets/images/bento_interactive_experience_1793942553471.jpg';

interface Project {
  id: string;
  title: string;
  client: string;
  year: string;
  tagline: string;
  metric: string;
  metricLabel: string;
  description: string;
  image: string;
  stack: string[];
  challenge: string;
  outcome: string;
}

export const CaseStudies: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 'arcturus',
      title: 'Arcturus Spatial OS',
      client: 'Arcturus Robotics',
      year: '2026',
      tagline: 'Browser-native multi-user operating canvas for autonomous fleet management',
      metric: '+240%',
      metricLabel: 'Operator Engagement Rate in 90 Days',
      description: 'A WebGL 2.0 operating environment enabling telemetry visualization and robotic fleet orchestration with zero client lag.',
      image: PROJECT_1_IMG,
      stack: ['WebGL 2.0', 'Three.js', 'WebSockets', 'Tailwind CSS', 'GLSL'],
      challenge: 'Fleet operators were suffering from cognitive fatigue due to fragmented 2D dashboard tables and delayed sensor feeds.',
      outcome: 'Reduced mission turnaround latency by 68% while handling 1,200 simultaneous spatial telemetry streams in real time.',
    },
    {
      id: 'volta',
      title: 'Volta Hypercar Configurator',
      client: 'Volta Mobility Europe',
      year: '2025',
      tagline: 'Photorealistic real-time raytraced vehicle customizer with fluid physics',
      metric: '$14.2M',
      metricLabel: 'Pre-order Pipeline Generated at Launch',
      description: 'Ultra-high-fidelity browser 3D customizer reproducing carbon weave, ambient reflections, and dynamic paint aerodynamics.',
      image: PROJECT_2_IMG,
      stack: ['Three.js', 'PBR Shaders', 'GSAP', 'Lenis Smooth Scroll', 'Web Audio API'],
      challenge: 'High-net-worth buyers needed luxury showroom fidelity without downloading heavy desktop applications or experiencing long load buffers.',
      outcome: 'Achieved sub-2.4s initial asset load time across mobile Safari and desktop Chrome, driving 42% higher completed customizations.',
    },
    {
      id: 'prism',
      title: 'Prism Harmonic Audio Studio',
      client: 'Prism Audio Lab',
      year: '2026',
      tagline: 'Interactive sound synthesis platform merging generative audio with spatial graphics',
      metric: '4.8M+',
      metricLabel: 'Global Interactive Audio Sessions',
      description: 'Real-time procedural synthesizer transforming user keystrokes into spatial soundscapes and responsive kinetic typography.',
      image: PROJECT_3_IMG,
      stack: ['Web Audio API', 'Canvas 2D', 'GSAP', 'Fast Fourier Transform (FFT)'],
      challenge: 'Bridging technical synthesis tools with intuitive consumer creative expression without audio clipping or latency anomalies.',
      outcome: 'Awarded FWA of the Day and Awwwards Site of the Day with an average dwell time of 6 minutes 40 seconds per user.',
    },
  ];

  return (
    <section id="works" className="py-28 px-6 md:px-10 max-w-7xl mx-auto w-full relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <p className="text-xs md:text-sm font-mono tracking-widest uppercase text-indigo-400 mb-3">
            04. Selected Works & Quantified Proof
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase text-balance">
            Real Impact. Uncompromising Craft.
          </h2>
        </div>
        <p className="text-sm md:text-base text-neutral-400 max-w-md">
          Measurable commercial transformations backed by verified engineering metrics and critical acclaim.
        </p>
      </div>

      {/* Projects List */}
      <div className="space-y-10">
        {projects.map((project, index) => (
          <div
            key={project.id}
            onClick={() => {
              soundManager.playClick();
              setSelectedProject(project);
            }}
            className="group relative rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-indigo-400/40 transition-all duration-500 cursor-pointer p-6 sm:p-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Project Image Preview */}
              <div className="lg:col-span-5 relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 text-xs font-mono text-neutral-200 glass-panel px-3 py-1 rounded-md">
                  {project.client} · {project.year}
                </div>
              </div>

              {/* Project Info & Metric */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="text-xs font-mono text-neutral-400">Project 0{index + 1}</span>
                    <div className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-bold text-white mb-2 group-hover:text-indigo-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                    {project.tagline}
                  </p>
                </div>

                {/* Quantified Metric Callout */}
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-2xl sm:text-3xl font-mono font-bold text-indigo-400 tabular-nums">
                      {project.metric}
                    </div>
                    <div className="text-xs sm:text-sm text-neutral-300 font-medium">
                      {project.metricLabel}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>

                {/* Tech Stack Unboxed */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400 pt-2 border-t border-white/5">
                  {project.stack.map((tech, i) => (
                    <React.Fragment key={tech}>
                      <span>{tech}</span>
                      {i < project.stack.length - 1 && <span className="text-neutral-600">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel-glow border border-white/20 p-6 sm:p-10 bg-[#0c0c12]">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setSelectedProject(null);
              }}
              className="absolute top-6 right-6 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-neutral-300 hover:text-white hover:scale-105 transition-all cursor-pointer"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="text-xs font-mono text-indigo-400 uppercase tracking-widest">
                Case Study Dossier · {selectedProject.client}
              </div>

              <h3 className="text-3xl sm:text-4xl font-bold text-white">
                {selectedProject.title}
              </h3>

              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-4">
                  <h4 className="text-sm font-mono text-neutral-300 uppercase tracking-wider">
                    The Architectural Challenge
                  </h4>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {selectedProject.challenge}
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-mono text-indigo-300 uppercase tracking-wider">
                    The Quantified Outcome
                  </h4>
                  <p className="text-neutral-300 text-sm leading-relaxed">
                    {selectedProject.outcome}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400">
                  <span className="text-white font-medium">Stack:</span>
                  {selectedProject.stack.join(' · ')}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedProject(null);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
