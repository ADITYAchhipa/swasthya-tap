'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { HardHat, UserCheck, Truck, Baby, Users } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';

const segmentKeys = [
  { icon: HardHat, segmentKey: 'whoIsThisFor.migrantWorkers', hookKey: 'whoIsThisFor.migrantWorkersHook', color: 'from-orange-400 to-orange-600' },
  { icon: UserCheck, segmentKey: 'whoIsThisFor.seniorCitizens', hookKey: 'whoIsThisFor.seniorCitizensHook', color: 'from-blue-400 to-blue-600' },
  { icon: Truck, segmentKey: 'whoIsThisFor.truckDrivers', hookKey: 'whoIsThisFor.truckDriversHook', color: 'from-green-400 to-green-600' },
  { icon: Baby, segmentKey: 'whoIsThisFor.children', hookKey: 'whoIsThisFor.childrenHook', color: 'from-pink-400 to-pink-600' },
  { icon: Users, segmentKey: 'whoIsThisFor.everyone', hookKey: 'whoIsThisFor.everyoneHook', color: 'from-primary to-accent' },
];

export default function WhoIsThisFor() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wide">Target Users</span>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-2">{t('whoIsThisFor.title')}</h2>
          <p className="mt-4 text-lg text-secondary/55">{t('whoIsThisFor.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {segmentKeys.map((s, i) => (
            <motion.div
              key={s.segmentKey}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative overflow-hidden rounded-card p-6 text-white text-center group cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
              <div className="relative z-10">
                <s.icon className="mx-auto mb-3" size={36} />
                <h3 className="font-bold mb-2 text-sm">{t(s.segmentKey)}</h3>
                <p className="text-xs text-white/95 leading-relaxed">{t(s.hookKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
