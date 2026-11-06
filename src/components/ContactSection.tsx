import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { Magnetic } from './Magnetic';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    scope: '3D WebGL Platform',
    budget: '$25k – $50k',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const scopes = [
    '3D WebGL Platform',
    'Spatial UI & Design System',
    'Experiential Showroom',
    'Motion & Kinetic Brand',
  ];

  const budgets = ['$15k – $25k', '$25k – $50k', '$50k – $100k', '$100k+'];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid work email address';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = 'Please provide a brief project summary (min 10 characters)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();

    if (!validate()) {
      soundManager.playTone(220, 'sawtooth', 0.1, 0.04);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      soundManager.playTone(587.33, 'sine', 0.25, 0.05);
      setTimeout(() => soundManager.playTone(880, 'sine', 0.35, 0.04), 150);
    }, 800);
  };

  return (
    <section id="contact" className="py-28 px-6 md:px-10 max-w-7xl mx-auto w-full relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Intent */}
        <div className="lg:col-span-5 space-y-6">
          <p className="text-xs md:text-sm font-mono tracking-widest uppercase text-indigo-400">
            05. Initiate Collaboration
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase text-balance">
            Let's Build Something Unforgettable
          </h2>
          <p className="text-neutral-400 text-base leading-relaxed">
            We partner with ambitious founders, innovation labs, and global brands to engineer digital experiences that dominate their category.
          </p>

          <div className="pt-6 border-t border-white/10 space-y-4 text-sm text-neutral-300">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Currently accepting select Q2 & Q3 2026 flagship commissions</span>
            </div>
            <div className="font-mono text-xs text-neutral-400">
              Direct: partnerships@kinetic-studio.io
            </div>
          </div>
        </div>

        {/* Right Column: Lead Capture Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl glass-panel border border-white/10 p-8 sm:p-10 shadow-2xl">
            {isSubmitted ? (
              <div className="py-16 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Project Inquiry Received</h3>
                <p className="text-neutral-400 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-medium">{formData.name}</span>. Our technical director will review your brief and send tailored architectural notes within 24 hours.
                </p>
                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        scope: '3D WebGL Platform',
                        budget: '$25k – $50k',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl glass-panel text-xs text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Full Name & Work Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Elena Rostova"
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                        errors.name ? 'border-red-500/80 focus:border-red-400' : 'border-white/10 focus:border-indigo-400'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="elena@company.com"
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500/80 focus:border-red-400' : 'border-white/10 focus:border-indigo-400'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Project Scope Selection */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                    Primary Capability Scope
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {scopes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          setFormData({ ...formData, scope: s });
                        }}
                        className={`px-4 py-3 rounded-xl text-xs font-medium text-left transition-all border cursor-pointer ${
                          formData.scope === s
                            ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-sm'
                            : 'bg-white/[0.03] border-white/5 text-neutral-400 hover:text-white hover:border-white/15'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Anticipated Budget */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                    Anticipated Investment Bracket
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgets.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          setFormData({ ...formData, budget: b });
                        }}
                        className={`py-2 px-3 rounded-xl text-xs font-mono text-center transition-all border cursor-pointer ${
                          formData.budget === b
                            ? 'bg-indigo-600/30 border-indigo-400 text-white'
                            : 'bg-white/[0.03] border-white/5 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Brief */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                    Project Overview & Timeline *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your brand, technical objectives, and ideal launch deadline..."
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors resize-none ${
                      errors.message ? 'border-red-500/80 focus:border-red-400' : 'border-white/10 focus:border-indigo-400'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <Magnetic strength={0.2} className="w-full">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm hover:from-indigo-500 hover:to-violet-500 transition-all shadow-xl shadow-indigo-600/20 border border-indigo-400/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Validating Submission...</span>
                      ) : (
                        <>
                          <span>Submit Project Brief</span>
                          <Send className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>
                  </Magnetic>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
