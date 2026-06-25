'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/i18n/LanguageProvider';

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

const statKeys = [
  { value: 150000, prefix: '', suffix: '+', labelKey: 'impact.goldenHour', color: 'text-primary' },
  { value: 1, prefix: '<', suffix: ' sec', labelKey: 'impact.readTime', color: 'text-success' },
  { value: 20, prefix: '₹', suffix: '', labelKey: 'impact.cardCost', color: 'text-accent' },
  { value: 10, prefix: '', suffix: '+ yrs', labelKey: 'impact.cardLifespan', color: 'text-sky-400' },
];

export default function ImpactStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useLanguage();

  return (
    <section className="py-12 bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {statKeys.map((stat, i) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className={`text-2xl md:text-3xl font-bold ${stat.color}`}>
                <AnimatedCounter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className="text-white/50 text-xs mt-1.5 leading-tight">{t(stat.labelKey)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
