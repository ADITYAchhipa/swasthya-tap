'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { IdCard, Wifi, Bell, Droplets, Heart, Globe, Smartphone, Shield } from 'lucide-react';
import CardFlowDetails from '@/assests/Card_FLow_details.png';
import { useLanguage } from '@/i18n/LanguageProvider';

const featureKeys = [
  { icon: IdCard, titleKey: 'features.emergencyId', descKey: 'features.emergencyIdDesc', color: 'text-primary', bg: 'bg-primary/8' },
  { icon: Wifi, titleKey: 'features.worksOffline', descKey: 'features.worksOfflineDesc', color: 'text-accent', bg: 'bg-accent/8' },
  { icon: Bell, titleKey: 'features.alertFamily', descKey: 'features.alertFamilyDesc', color: 'text-primary', bg: 'bg-primary/8' },
  { icon: Droplets, titleKey: 'features.bloodDonor', descKey: 'features.bloodDonorDesc', color: 'text-red-600', bg: 'bg-red-50' },
  { icon: Heart, titleKey: 'features.organDonation', descKey: 'features.organDonationDesc', color: 'text-success', bg: 'bg-success/8' },
  { icon: Globe, titleKey: 'features.multilingual', descKey: 'features.multilingualDesc', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: Smartphone, titleKey: 'features.noApp', descKey: 'features.noAppDesc', color: 'text-accent', bg: 'bg-accent/8' },
  { icon: Shield, titleKey: 'features.privacy', descKey: 'features.privacyDesc', color: 'text-secondary', bg: 'bg-secondary/8' },
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useLanguage();

  return (
    <section id="features" className="py-16 md:py-24 bg-gradient-to-b from-[#FAFCFD] to-white relative overflow-hidden">
      {/* Decorative background grid/blobs */}
      <div className="absolute top-10 right-0 w-80 h-80 bg-success/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
            {t('features.title')}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-secondary mt-4 tracking-tight">
            Everything in One Card
          </h2>
          <p className="mt-4 text-lg text-secondary/60 max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left: Features Grid (7 Columns on desktop) */}
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-6">
              {featureKeys.map((f, i) => (
                <motion.div
                  key={f.titleKey}
                  initial={{ opacity: 0, y: 25 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-success/30 hover:shadow-[0_15px_30px_rgba(42,157,143,0.08)] transition-all duration-300 group flex gap-4"
                >
                  <div className={`${f.bg} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <f.icon className={`${f.color}`} size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary text-base mb-1.5 group-hover:text-primary transition-colors duration-300">
                      {t(f.titleKey)}
                    </h3>
                    <p className="text-sm text-secondary/60 leading-relaxed">
                      {t(f.descKey)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Interactive / Beautiful Card Flow Detail Diagram (5 Columns on desktop) */}
          <div className="lg:col-span-5 flex justify-center lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative w-full max-w-[460px] bg-gradient-to-br from-slate-50/50 to-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 shadow-[0_30px_60px_rgba(29,53,87,0.06)] overflow-hidden group"
            >
              {/* Corner accent glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-success/20 to-transparent rounded-full blur-2xl group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-success bg-success/10 px-3 py-1 rounded-full">
                  Card Structure
                </span>
                <span className="text-xs font-medium text-secondary/40">
                  NFC Health Tag v1.2
                </span>
              </div>
              
              <div className="w-full relative bg-white/40 rounded-2xl p-2 border border-slate-100/60 shadow-sm flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:shadow-md">
                <img
                  src={CardFlowDetails.src || CardFlowDetails}
                  alt="How data is structured on the SwasthyaTap card"
                  width={600}
                  height={400}
                  className="rounded-xl object-contain w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              <div className="mt-6 flex items-start gap-3 p-4 bg-[#F2F8F6] rounded-2xl border border-success/10">
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0 text-success text-sm font-bold">
                  i
                </div>
                <div>
                  <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-0.5">
                    Universal Data Schema
                  </h4>
                  <p className="text-xs text-secondary/65 leading-relaxed">
                    Designed to map seamlessly to national registries and local hospital networks for instant extraction.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
