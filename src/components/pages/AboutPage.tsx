import { Activity, Shield, Users, Heart, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/i18n/LanguageProvider';

import { LanguageProvider } from '@/i18n/LanguageProvider';

function AboutContent() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col justify-between">
      <Navbar />

      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(230,57,70,0.03)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(42,157,143,0.02)_0%,transparent_50%)]" />

      {/* Main Content (pt-24 for fixed Navbar spacing) */}
      <div className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 pt-24 pb-16 relative z-10">
        <a href="/" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors">
          <ArrowLeft size={16} /> {t('about.backHome')}
        </a>

        {/* Hero Section */}
        <div className="text-center mt-12 mb-16">
          <span className="text-primary font-semibold tracking-widest uppercase text-xs border border-primary/20 px-4 py-1.5 rounded-full bg-primary/5 inline-block">
            {t('about.tagline')}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary mt-6 mb-6 tracking-tight">
            {t('about.heroTitle')}
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-secondary/70 leading-relaxed">
            {t('about.heroDesc')}
          </p>
        </div>

        {/* Our Story */}
        <div className="bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-secondary/10 shadow-[0_15px_40px_rgba(29,53,87,0.04)] mb-12">
          <h2 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
            <Heart className="text-primary fill-primary/10" size={24} /> {t('about.storyTitle')}
          </h2>
          <div className="space-y-4 text-secondary/80 leading-relaxed">
            <p>
              {t('about.storyP1')}
            </p>
            <p>
              {t('about.storyP2')}
            </p>
          </div>
        </div>

        {/* Core Pillars */}
        <h2 className="text-2xl font-bold text-secondary mb-6 text-center">{t('about.pillarsTitle')}</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-secondary/5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Users size={20} />
            </div>
            <h3 className="font-bold text-secondary mb-2">{t('about.pillar1Title')}</h3>
            <p className="text-sm text-secondary/75 leading-relaxed">
              {t('about.pillar1Desc')}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-secondary/5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center mb-4">
              <Activity size={20} />
            </div>
            <h3 className="font-bold text-secondary mb-2">{t('about.pillar2Title')}</h3>
            <p className="text-sm text-secondary/75 leading-relaxed">
              {t('about.pillar2Desc')}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-secondary/5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center mb-4">
              <Shield size={20} />
            </div>
            <h3 className="font-bold text-secondary mb-2">{t('about.pillar3Title')}</h3>
            <p className="text-sm text-secondary/75 leading-relaxed">
              {t('about.pillar3Desc')}
            </p>
          </div>
        </div>

        {/* Founders / Leadership Section */}
        <h2 className="text-2xl font-bold text-secondary mb-6 text-center">{t('about.foundersTitle')}</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
          <div className="bg-white p-6 rounded-2xl border border-secondary/5 shadow-sm text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 font-bold text-xl">
              AC
            </div>
            <h3 className="font-extrabold text-secondary text-lg">Aditya Chhipa</h3>
            <p className="text-sm text-primary font-semibold mb-2">{t('about.founder1Role')}</p>
            <p className="text-xs text-secondary/70 leading-relaxed">
              {t('about.founder1Desc')}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-secondary/5 shadow-sm text-center">
            <div className="w-16 h-16 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto mb-4 font-bold text-xl">
              HB
            </div>
            <h3 className="font-extrabold text-secondary text-lg">Harshit Borana</h3>
            <p className="text-sm text-success font-semibold mb-2">{t('about.founder2Role')}</p>
            <p className="text-xs text-secondary/70 leading-relaxed">
              {t('about.founder2Desc')}
            </p>
          </div>
        </div>

        {/* Company Background */}
        <div className="text-center border-t border-secondary/10 pt-12">
          <div className="flex justify-center items-center gap-2 mb-3">
            <Activity className="text-primary" size={20} />
            <span className="font-bold text-secondary text-lg">{t('common.swasthyaTap')}</span>
          </div>
          <p className="text-sm text-secondary/60 max-w-md mx-auto leading-relaxed">
            {t('about.companyDesc')}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function AboutPage() {
  return (
    <LanguageProvider>
      <AboutContent />
    </LanguageProvider>
  );
}
