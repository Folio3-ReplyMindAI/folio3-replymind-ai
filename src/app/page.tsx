import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageLoader } from "@/components/loader/PageLoader";
import { Hero } from "@/components/sections/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ScatteredVsUnified } from "@/components/sections/ScatteredVsUnified";
import { FeatureDeepDive } from "@/components/sections/FeatureDeepDive";
import { LiveDemo } from "@/components/sections/LiveDemo";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { CTABanner } from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      <PageLoader />
      <Navbar />
      <Hero />
      <SocialProof />
      <HowItWorks />
      <ScatteredVsUnified />
      <FeatureDeepDive />
      <LiveDemo />
      <Pricing />
      <FAQ />
      <CTABanner />
      <Footer />
    </>
  );
}
