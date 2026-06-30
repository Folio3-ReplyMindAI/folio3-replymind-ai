"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import LoadingScreen from "@/src/components/common/LoadingScreen";
import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/common/Footer";
import Hero from "@/src/components/home/Hero";
import HowItWorks from "@/src/components/home/HowItWorks";
import ScrollTextReveal from "@/src/components/home/ScrollTextReveal";
import Pricing from "@/src/components/home/Pricing";
import Difference from "@/src/components/home/Difference";

export default function Landing() {
    const [loading, setLoading] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (
      <div className="relative min-h-screen bg-bg-base">
      <AnimatePresence initial={false}>
        {loading ? (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        ) : null}
      </AnimatePresence>
      {!loading ? (
          <motion.div
            key="landing-content"
            className="landing-reveal-root"
            initial={{
              opacity: 0,
              y: 72,
              scale: 0.96,
              rotateX: 10,
              filter: "blur(8px)",
              transformPerspective: 1200,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              filter: "blur(0px)",
              transformPerspective: 1200,
            }}
            transition={{
              duration: 1.05,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
    <div className="min-h-screen relative bg-bg-base text-text-primary">
      <Navbar scrolled={scrolled} />
      <Hero />
      <ScrollTextReveal
        phrases={["we listen", "we imagine", "we create", "beautiful things"]}
        height="100vh"
        background="#edefe7"
        textColor="#191c18"
      />
      <section id="how" className="scroll-mt-24">
        <HowItWorks />
      </section>
      <Pricing />
      <Difference />
      <Footer />
    </div>
    </motion.div>
    ) : null}
    </div>
    
  );
  
}
