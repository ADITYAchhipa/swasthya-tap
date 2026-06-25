'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Server, Lock, Eye } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';

export default function TrustSecurity() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useLanguage();

  const tiers = [
    { levelKey: 'trust.publicLevel', descKey: 'trust.publicDesc', icon: Eye, color: 'bg-green-100 text-green-700' },
    { levelKey: 'trust.pinLevel', descKey: 'trust.pinDesc', icon: Lock, color: 'bg-yellow-100 text-yellow-700' },
    { levelKey: 'trust.ownerLevel', descKey: 'trust.ownerDesc', icon: Shield, color: 'bg-red-100 text-red-700' },
  ];

  const badges = [
    { icon: Shield, textKey: 'trust.dpdp' },
    { icon: Server, textKey: 'trust.dataIndia' },
    { icon: Lock, textKey: 'trust.encryption' },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wide">Security</span>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-2">{t('trust.title')}</h2>
          <p className="mt-4 text-lg text-secondary/55">{t('trust.subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-xl font-bold text-secondary mb-6">{t('trust.privacyTiers')}</h3>
            <div className="space-y-4">
              {tiers.map((tier, i) => (
                <motion.div
                  key={tier.levelKey}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-center gap-4 p-4 rounded-card bg-gray-50"
                >
                  <div className={`p-2 rounded-lg ${tier.color}`}>
                    <tier.icon size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-secondary">{t(tier.levelKey)}</p>
                    <p className="text-sm text-secondary/60">{t(tier.descKey)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {badges.map((item, i) => (
              <motion.div
                key={item.textKey}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15 }}
                className="flex items-center gap-4 p-4 bg-secondary/5 rounded-card"
              >
                <item.icon className="text-success" size={24} />
                <span className="font-medium text-secondary">{t(item.textKey)}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
