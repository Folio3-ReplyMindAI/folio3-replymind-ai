import Image from "next/image";
import Icon from "@/src/components/common/Icon";
import Link from "next/link";
import bgImage from "@/src/assets/screen.png";

export default function HeroIntro() {
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden rounded-[28px] text-center">
      <Image
        src={bgImage}
        alt=""
        fill
        className="object-cover"
        priority
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-base/95 via-bg-base/70 to-bg-base/80" />
      <div className="relative z-10 flex w-full flex-col items-center px-6 py-10 md:py-14">
        <div className="mb-10 inline-flex items-center gap-2 rounded-full bg-tertiary-container px-6 py-3 text-label-sm text-on-tertiary-container backdrop-blur-sm">
          <Icon name="spark" filled className="text-[18px] text-on-tertiary-container" />
          AI-Powered Personalization Engine v2.0
        </div>

        <h1 className="mb-8 max-w-5xl font-display text-[44px] font-bold leading-[50px] tracking-[0] text-text-primary md:text-[72px] md:leading-[80px]">
          Every customer message. One inbox.{" "}
          <span className="hero-gradient-text">AI-Powered Responses, Human Confidence.</span>
        </h1>

        <p className="mb-12 max-w-3xl text-body-lg text-text-secondary">
          ReplyMind pulls your WhatsApp, Email, and Website messages into one place, writes
          a reply draft for each, and waits for your tap to send. Never miss a lead or lose
          a weekend to busywork again.
        </p>

        <div className="mb-10 flex flex-col gap-6 sm:flex-row">
          <Link
            href="/register"
            className="rounded-full bg-accent px-10 py-5 text-label-md text-accent-on shadow-[0_0_32px_rgba(84,129,90,0.3)] transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_0_48px_rgba(84,129,90,0.45)] active:scale-[0.98]"
          >
            Start My Free Trial
          </Link>
          <a href="#how" className="inline-block rounded-full border border-accent px-10 py-5 text-label-md text-accent no-underline backdrop-blur-sm transition-all duration-300 hover:bg-accent-bg active:scale-[0.98]">
            See How It Works
          </a>
        </div>
      </div>
    </section>
  );
}
