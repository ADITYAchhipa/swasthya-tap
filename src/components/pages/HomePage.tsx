import { LanguageProvider } from '@/i18n/LanguageProvider';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import ImpactStats from '@/components/ImpactStats';
import TechnicalArchitecture from '@/components/TechnicalArchitecture';
import ComparisonTable from '@/components/ComparisonTable';
import Features from '@/components/Features';
import WhoIsThisFor from '@/components/WhoIsThisFor';
import TrustSecurity from '@/components/TrustSecurity';
import BloodNetwork from '@/components/BloodNetwork';
import Testimonials from '@/components/Testimonials';
import HospitalSection from '@/components/HospitalSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <LanguageProvider>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <ImpactStats />
      <TechnicalArchitecture />
      <ComparisonTable />
      <Features />
      <WhoIsThisFor />
      <TrustSecurity />
      <BloodNetwork />
      <Testimonials />
      <HospitalSection />
      <Footer />
    </LanguageProvider>
  );
}
