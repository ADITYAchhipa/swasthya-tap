'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/i18n/LanguageProvider';

const stepKeys = ['cta.step1', 'cta.step2', 'cta.step3', 'cta.step4', 'cta.step5'];

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-secondary via-[#1a4060] to-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-success rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="inline-block bg-white/10 text-white/90 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            Takes just 2 minutes
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('cta.title')}
          </h2>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 sm:p-8 mb-10 text-left inline-block border border-white/10 w-full sm:w-auto">
            <ol className="space-y-4">
              {stepKeys.map((key, i) => (
                <li key={key} className="flex items-center gap-4 text-white">
                  <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm md:text-base">{t(key)}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="block">
            <a
              href="/register"
              className="inline-block bg-white text-primary px-10 py-4 rounded-btn font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-black/20"
            >
              {t('cta.registerFree')}
            </a>
            <p className="text-white/40 text-sm mt-4">No credit card required. Free forever for basic card.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
