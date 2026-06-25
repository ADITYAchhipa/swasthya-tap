'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Building2, Zap, DollarSign } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';

export default function HospitalSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t, tArray } = useLanguage();

  const plans = [
    {
      nameKey: 'hospital.basic',
      price: '₹5K/mo',
      featuresKey: 'hospital.basicFeatures',
      highlight: false,
    },
    {
      nameKey: 'hospital.standard',
      price: '₹15K/mo',
      featuresKey: 'hospital.standardFeatures',
      highlight: true,
    },
    {
      nameKey: 'hospital.enterprise',
      price: '₹25K/mo',
      featuresKey: 'hospital.enterpriseFeatures',
      highlight: false,
    },
  ];

  return (
    <section id="hospital" className="py-16 md:py-24 bg-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wide">For Healthcare</span>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-2">{t('hospital.title')}</h2>
          <p className="mt-4 text-lg text-secondary/55">{t('hospital.subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <div className="flex items-center gap-3 bg-white p-4 rounded-card">
            <Building2 className="text-primary" size={24} />
            <span className="text-secondary text-sm font-medium">{t('hospital.identifyPatients')}</span>
          </div>
          <div className="flex items-center gap-3 bg-white p-4 rounded-card">
            <Zap className="text-accent" size={24} />
            <span className="text-secondary text-sm font-medium">{t('hospital.bloodApi')}</span>
          </div>
          <div className="flex items-center gap-3 bg-white p-4 rounded-card">
            <DollarSign className="text-success" size={24} />
            <span className="text-secondary text-sm font-medium">{t('hospital.zeroCost')}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => {
            const features = tArray(plan.featuresKey);
            return (
              <motion.div
                key={plan.nameKey}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15 }}
                className={`p-6 rounded-card ${plan.highlight ? 'bg-primary text-white md:scale-105 shadow-xl' : 'bg-white shadow-sm border border-gray-100'}`}
              >
                <h3 className="text-xl font-bold mb-2">{t(plan.nameKey)}</h3>
                <p className="text-3xl font-bold mb-4">{plan.price}</p>
                <ul className="space-y-2 mb-6">
                  {features.map((f) => (
                    <li key={f} className="text-sm flex items-center gap-2">
                      <span>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-2 rounded-btn font-bold ${plan.highlight ? 'bg-white text-primary' : 'bg-primary text-white'} hover:scale-105 transition-transform`}>
                  {t('hospital.requestDemo')}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
