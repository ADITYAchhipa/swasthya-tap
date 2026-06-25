'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';

const productKeys = [
  { nameKey: 'pricing.standardCard', price: 'FREE', descKey: 'pricing.standardDesc', badgeKey: 'pricing.badgePopular', features: ['NFC enabled', 'Emergency alerts', 'Basic health info'] },
  { nameKey: 'pricing.premiumCard', price: '₹499', descKey: 'pricing.premiumDesc', badgeKey: 'pricing.badgePremium', features: ['All Standard features', 'Metal build', 'Laser engraved'] },
  { nameKey: 'pricing.wristband', price: '₹299', descKey: 'pricing.wristbandDesc', badgeKey: '', features: ['Waterproof', 'Adjustable size', 'Durable silicone'] },
  { nameKey: 'pricing.ring', price: '₹999', descKey: 'pricing.ringDesc', badgeKey: 'pricing.badgeLuxury', features: ['Titanium/ceramic', 'Stylish design', 'Always accessible'] },
  { nameKey: 'pricing.familyPack', price: '₹299', descKey: 'pricing.familyDesc', badgeKey: 'pricing.badgeValue', features: ['4 PVC cards', 'Family dashboard', 'Group alerts'] },
];

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useLanguage();

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wide">Plans</span>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-2">{t('pricing.title')}</h2>
          <p className="mt-4 text-lg text-secondary/55">{t('pricing.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
          {productKeys.map((p, i) => {
            const badge = p.badgeKey ? t(p.badgeKey) : '';
            return (
              <motion.div
                key={p.nameKey}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 }}
                className={`relative bg-white p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 group ${
                  i === 0 ? 'border-primary/30 shadow-lg shadow-primary/10' : 'border-gray-100 shadow-sm hover:shadow-lg'
                }`}
              >
                {badge && (
                  <span className={`absolute -top-3 left-4 text-white text-xs px-3 py-1 rounded-full font-semibold ${
                    i === 0 ? 'bg-primary' : 'bg-accent'
                  }`}>
                    {badge}
                  </span>
                )}
                <h3 className="font-bold text-secondary mt-2 text-sm">{t(p.nameKey)}</h3>
                <p className="text-2xl font-bold text-primary mt-2">{p.price === 'FREE' ? t('common.free') : p.price}</p>
                <p className="text-xs text-secondary/50 mt-1 mb-4">{t(p.descKey)}</p>
                <ul className="space-y-2 mb-5">
                  {p.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-xs text-secondary/60">
                      <Check size={14} className="text-success flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-2.5 rounded-btn font-semibold text-sm transition-all ${
                  i === 0
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'bg-secondary/5 text-secondary hover:bg-primary hover:text-white'
                }`}>
                  {t('pricing.orderNow')}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
