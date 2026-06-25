'use client';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { MapPin, Clock, Droplets, Award, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';

// Fixed positions to avoid re-randomize on render
const DONORS = [
  { id: 1, top: 18, left: 20, group: 'O+', delay: 0.0 },
  { id: 2, top: 52, left: 72, group: 'A+', delay: 0.3 },
  { id: 3, top: 22, left: 76, group: 'B+', delay: 0.6 },
  { id: 4, top: 74, left: 30, group: 'AB+',delay: 0.9 },
  { id: 5, top: 14, left: 54, group: 'O-', delay: 0.4 },
  { id: 6, top: 66, left: 80, group: 'A-', delay: 0.7 },
  { id: 7, top: 80, left: 55, group: 'B-', delay: 0.2 },
  { id: 8, top: 42, left: 14, group: 'O+', delay: 1.0 },
];

const STATS = [
  { icon: MapPin,   value: '5 km',      labelKey: 'blood.matchingRadius', color: '#E63946' },
  { icon: Clock,    value: '15 min',    labelKey: 'blood.responseTime',   color: '#F77F00' },
  { icon: Droplets, value: 'SMS',       labelKey: 'blood.noAppNeeded',    color: '#457B9D' },
  { icon: Award,    value: 'Credits',   labelKey: 'blood.earnRewards',    color: '#2A9D8F' },
];

export default function BloodNetwork() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { t } = useLanguage();
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const id = setTimeout(() => setAlert(true), 2200);
    return () => clearTimeout(id);
  }, [isInView]);

  return (
    <section id="blood-network" className="py-16 md:py-24 bg-white overflow-hidden">
      <div ref={ref} className="w-[90vw] max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Text content ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="flex flex-col"
          >
            {/* Label */}
            <span className="inline-flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest border border-primary/20 bg-primary/5 px-3.5 py-1.5 rounded-full w-fit mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Emergency Network
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-4 tracking-tight leading-tight">
              {t('blood.title')}
            </h2>
            <p className="text-secondary/60 leading-relaxed mb-8 max-w-md">
              {t('blood.description')}
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {STATS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.labelKey}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-3 p-4 rounded-2xl border border-secondary/8 bg-secondary/[0.02] hover:bg-secondary/[0.04] transition-colors"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${s.color}12` }}
                    >
                      <Icon size={16} style={{ color: s.color }} />
                    </div>
                    <div>
                      <p className="font-extrabold text-secondary text-sm leading-none">{s.value}</p>
                      <p className="text-secondary/50 text-xs mt-0.5">{t(s.labelKey)}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <motion.a
              href="/blood"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.65 }}
              className="group inline-flex items-center gap-2.5 bg-primary text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 transition-all w-fit"
            >
              <Droplets size={15} />
              {t('blood.registerDonor')}
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>

          {/* ── RIGHT: Map visualization ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="relative"
          >
            {/* Map card */}
            <div className="relative rounded-3xl overflow-hidden border border-secondary/10 shadow-[0_20px_60px_rgba(29,53,87,0.08)]"
              style={{ background: 'linear-gradient(135deg,#fff5f5 0%,#fff0f0 50%,#fef2f2 100%)' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-secondary/8 bg-white/60">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-secondary/50 text-[10px] font-mono tracking-widest uppercase">Live Donor Map</span>
                </div>
                <div className="flex items-center gap-1.5 bg-success/10 border border-success/20 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  <span className="text-success text-[9px] font-bold tracking-wide">Network Active</span>
                </div>
              </div>

              {/* Map area */}
              <div className="relative" style={{ height: 280 }}>
                {/* Subtle dot-grid */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #1D355720 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                  }}
                />

                {/* Radius rings */}
                {[90, 150, 210].map((r, i) => (
                  <motion.div
                    key={r}
                    className="absolute rounded-full border border-primary/15"
                    style={{
                      width: r, height: r,
                      top: '50%', left: '50%',
                      transform: 'translate(-50%,-50%)',
                    }}
                    animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }}
                  />
                ))}

                {/* SVG connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {isInView && [
                    { x2: '20%', y2: '18%', d: 0.7 },
                    { x2: '72%', y2: '52%', d: 0.9 },
                    { x2: '30%', y2: '74%', d: 1.1 },
                    { x2: '54%', y2: '14%', d: 1.3 },
                  ].map((l, i) => (
                    <motion.line
                      key={i}
                      x1="50%" y1="50%"
                      x2={l.x2} y2={l.y2}
                      stroke="#E63946"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                      strokeOpacity="0.25"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: l.d }}
                    />
                  ))}
                </svg>

                {/* Donor dots */}
                {DONORS.map((d) => (
                  <motion.div
                    key={d.id}
                    className="absolute"
                    style={{ top: `${d.top}%`, left: `${d.left}%`, transform: 'translate(-50%,-50%)', zIndex: 10 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.35, delay: d.delay + 0.5 }}
                  >
                    {/* Pulse ring */}
                    <motion.div
                      className="absolute rounded-full bg-primary/20"
                      style={{ inset: -6 }}
                      animate={{ scale: [1, 1.9, 1], opacity: [0.25, 0, 0.25] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: d.delay }}
                    />
                    <div className="relative w-5 h-5 rounded-full bg-primary shadow-md shadow-primary/30 flex items-center justify-center border-2 border-white">
                      <span className="text-white font-black leading-none" style={{ fontSize: 5 }}>{d.group}</span>
                    </div>
                  </motion.div>
                ))}

                {/* Hospital center */}
                <motion.div
                  className="absolute"
                  style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 20 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
                >
                  <motion.div
                    className="absolute rounded-full bg-primary/15"
                    style={{ inset: -12 }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.25, 0, 0.25] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="relative w-10 h-10 rounded-full bg-primary shadow-lg shadow-primary/30 flex items-center justify-center border-2 border-white">
                    <span className="text-white font-black text-sm">H</span>
                  </div>
                </motion.div>

                {/* Alert toast */}
                <AnimatePresence>
                  {alert && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-3 left-3 right-3 z-30"
                    >
                      <div className="bg-white rounded-xl border border-secondary/10 shadow-lg px-3.5 py-2.5 flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Droplets size={12} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-secondary font-bold text-xs leading-none">O+ Donor found — 1.2 km away</p>
                          <p className="text-secondary/40 text-[10px] mt-0.5">SMS dispatched · ETA 8 min</p>
                        </div>
                        <span className="ml-auto text-success text-[9px] font-extrabold tracking-wide bg-success/10 border border-success/20 px-2 py-0.5 rounded-full flex-shrink-0">
                          MATCHED
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom stats row */}
              <div className="grid grid-cols-3 divide-x divide-secondary/8 border-t border-secondary/8 bg-white/60">
                {[
                  { label: 'Donors Nearby', value: '12' },
                  { label: 'Avg Response',  value: '11 min' },
                  { label: 'Lives Saved',   value: '2,400+' },
                ].map((s) => (
                  <div key={s.label} className="py-3 text-center">
                    <p className="text-secondary font-extrabold text-sm">{s.value}</p>
                    <p className="text-secondary/40 text-[9px] uppercase tracking-wider mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.0 }}
              className="absolute -top-3 right-2 sm:-right-3 bg-white rounded-xl shadow-lg border border-secondary/8 px-3.5 py-2.5 flex items-center gap-2"
            >
              <span className="text-base">🩸</span>
              <div>
                <p className="text-secondary font-extrabold text-xs leading-none">8 Blood Types</p>
                <p className="text-secondary/45 text-[9px] mt-0.5">All groups covered</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
