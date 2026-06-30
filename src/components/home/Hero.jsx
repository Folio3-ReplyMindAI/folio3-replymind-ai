import HeroIntro from "@/src/components/home/HeroIntro";
import HeroDashboard from "@/src/components/home/HeroDashboard";

export default function Hero() {
    return (
      <>
        <section className="relative px-6 pt-24 pb-10 hero-bg md:pt-32 md:pb-14">
          <div className="mx-auto max-w-7xl">
            <HeroIntro />
          </div>
        </section>

        <HeroDashboard />
      </>
    );
}
