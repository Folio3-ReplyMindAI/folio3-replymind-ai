"use client";
import { motion } from "framer-motion";
import { ScrollStack } from "@/src/components/home/ScrollStack";

const STEPS = [
  {
    title: "Connect Channels",
    desc: "Securely link your email, WhatsApp Business, and website chat in under two minutes.",
    pills: ["2 min setup", "Secure Sync", "Omnichannel"],
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800",
  },
  {
    title: "AI Drafts Context",
    desc: "Our AI reads previous threads to write personalized drafts that sound exactly like your brand voice.",
    pills: ["Context aware", "Brand Voice", "Auto-Draft"],
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
  },
  {
    title: "Review & Tap",
    desc: "Check the draft, make a quick edit if needed, and tap send. Done.",
    pills: ["Human approved", "One-tap send", "Inbox Zero"],
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
  },
];

const StackContent = ({ activeIndex }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="gradient-orb pointer-events-none absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 opacity-20" />
      <div className="gradient-orb pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] opacity-15" />

      <div className="relative z-10 mx-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] overflow-hidden rounded-[32px] border border-border bg-white/70 shadow-[0_8px_32px_rgba(84,129,90,0.08)] backdrop-blur-xl">
        <div className="pointer-events-none absolute -left-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
        <div className="flex h-full w-full items-center justify-center">
          <div className="max-w-[1440px] w-full grid grid-cols-1 lg:grid-cols-12 px-12 lg:px-20 items-center gap-x-30">
            <div className="lg:col-span-4">
              <h2 className="text-[70px] xl:text-[94px] font-black leading-[0.85] uppercase font-display -translate-x-40">
                <span className="text-text-primary">BUILT TO <br/> DRIVE <br/></span>
                <span className="hero-gradient-text">RESULTS.</span>
              </h2>
            </div>

            <div className="lg:col-span-4 relative h-[500px] flex justify-center items-center">
              {STEPS.map((step, i) => (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{
                    x: i < activeIndex ? -180 : i > activeIndex ? 45 : 0,
                    y: i > activeIndex ? 25 : 0,
                    opacity: i < activeIndex ? 0 : 1,
                    scale: i === activeIndex ? 1 : 0.9,
                    rotate: i === activeIndex ? 0 : i > activeIndex ? 6 : -9,
                    zIndex: STEPS.length - i,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  className="absolute w-[280px] h-[380px] xl:w-[320px] xl:h-[420px]"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] border border-border/50 bg-white/80 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-base/80 to-transparent z-10" />
                    <img
                      src={step.img}
                      className="object-cover h-full w-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center gap-y-4">
              {STEPS.map((step, i) => (
                <div
                  key={i}
                  onClick={() => {}}
                  className="border-b border-border/30 py-8 cursor-pointer group"
                >
                  <h3 className={`text-[36px] xl:text-[46px] font-black uppercase leading-none transition-all duration-500 tracking-tight
                    ${activeIndex === i ? 'hero-gradient-text translate-x-2' : 'text-text-primary hover:text-text-secondary'}`}>
                    {step.title}
                  </h3>

                  <motion.div
                    initial={false}
                    animate={{
                      height: activeIndex === i ? "auto" : 0,
                      opacity: activeIndex === i ? 1 : 0,
                    }}
                    className="overflow-hidden"
                  >
                    <p className="text-text-secondary mt-6 text-base xl:text-lg leading-relaxed font-medium max-w-[90%]">
                      {step.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-6">
                      {step.pills?.map((pill, idx) => (
                        <span key={idx} className="bg-accent-bg text-accent px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          {pill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HowItWorks() {
  return (
    <ScrollStack totalItems={STEPS.length}>
      <StackContent />
    </ScrollStack>
  );
}
