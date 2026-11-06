import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { soundManager } from '../utils/audio';

interface MagneticProps {
  children: React.ReactElement<{ className?: string; onMouseEnter?: React.MouseEventHandler; onMouseLeave?: React.MouseEventHandler }>;
  strength?: number;
  className?: string;
}

export const Magnetic: React.FC<MagneticProps> = ({ children, strength = 0.35, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if touch device - skip magnetic on touch
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.3)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.3)' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = (e.clientX - centerX) * strength;
      const distanceY = (e.clientY - centerY) * strength;

      xTo(distanceX);
      yTo(distanceY);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      className={`inline-block transition-transform will-change-transform ${className}`}
      onMouseEnter={() => soundManager.playHover()}
    >
      {children}
    </div>
  );
};
