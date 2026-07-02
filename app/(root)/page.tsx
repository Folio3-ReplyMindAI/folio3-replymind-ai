import { Navbar } from "@/src/components/layout/Navbar";
import { Footer } from "@/src/components/layout/Footer";
import { Hero } from "@/src/components/home/Hero";
import { SocialProof } from "@/src/components/home/SocialProof";
import { HowItWorks } from "@/src/components/home/HowItWorks";
import { ScatteredVsUnified } from "@/src/components/home/ScatteredVsUnified";
import { FeatureDeepDive } from "@/src/components/home/FeatureDeepDive";
import { LiveDemo } from "@/src/components/home/LiveDemo";
import { Pricing } from "@/src/components/home/Pricing";
import { FAQ } from "@/src/components/home/FAQ";
import { CTABanner } from "@/src/components/home/CTABanner";

export default function HomePage() {
  return (
    <>
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
