import Link from "next/link";
import Icon from "@/src/components/common/Icon";

export default function AuthLayout({ children }) {
  return (
    /* Background base color ko pure page standard par map kiya */
    <div className="min-h-svh flex items-center justify-center bg-bg-base p-4 md:p-6 overflow-x-hidden">
      <main className="w-full max-w-[1040px] bg-white rounded-[2rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] flex flex-col md:flex-row overflow-hidden">
        {/* Left Panel */}
        <section className="hidden md:flex flex-col w-[55%] bg-bg-base p-6 lg:p-8 relative overflow-hidden">
          {/* Same overlay treatment as the landing page hero, using bg-base tokens instead of raw black */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-base/95 via-bg-base/70 to-bg-base/80 z-0" />

          <div className="relative z-10 flex flex-col h-full justify-between gap-6">
            <div className="space-y-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
              >
                <Icon name="arrow_back" className="text-[18px]" />
                Back to home
              </Link>

              <h2 className="text-[38px] lg:text-[44px] leading-[1.08] text-text-primary font-bold tracking-tight font-display">
                Experience the Future
              </h2>
            </div>

            {/* Cards Layout */}
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  icon: "bolt",
                  title: "12x Faster",
                  desc: "Cut down response times with smart automation.",
                },
                {
                  icon: "shield_person",
                  title: "100% Control",
                  desc: "Review every draft or let AI handle routine.",
                },
                {
                  icon: "link",
                  title: "Instant Setup",
                  desc: "Integration takes seconds. No coding.",
                },
                {
                  icon: "rocket_launch",
                  title: "Scale Up",
                  desc: "Grow your reach without adding overhead.",
                },
              ].map((b) => (
                <div
                  key={b.title}
                  className="bg-tertiary-container border border-outline-variant/20 rounded-xl p-3 lg:p-4 flex flex-col gap-2 backdrop-blur-sm"
                >
                  <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center shrink-0 text-accent-on">
                    <Icon name={b.icon} filled className="text-[20px]" />
                  </div>
                  <div>
                    <h3 className="text-on-tertiary-container font-bold text-base lg:text-lg mb-1">
                      {b.title}
                    </h3>
                    <p className="text-sm text-on-tertiary-container/80 leading-snug">
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/30">
              <div className="flex -space-x-3">
                <img
                  alt=""
                  className="w-9 h-9 rounded-full border-2 border-bg-base object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCseStnfjL13W5YyaQI-XnmGNENRqYD4tssz6Iu3o3Ig18Accr0L9InvC4GEjyB_IzZK-Oyyxt71nrcSyakJsTbsH28ll79pasT0I_oa2yEL3IifVtNozi_m-IavHsffevaBSXzGbKZnG0wDnRdwTkGJrigqQl4a1jk_UPCeDRLN1FmsW0rP7FE8jsQR863VCxfjELpKbepUieFTXa5XTNqPmgSvKsnJK8M9ay_PeHhkU0K4VHk1zt2Hp7gT1RPDuW03dV5TEeU7CA"
                />
                <img
                  alt=""
                  className="w-9 h-9 rounded-full border-2 border-bg-base object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKwhvDEk7SJRMdASeGYXSsYklNs5cdjTK5Sypx6OJXSLqc8VhCDy6_CQy63evl8Gd036QS5R6QzNSdFH8XaDyDtP6xJckBR8-ypidv6kUTwj2pJ_PM3sGGVBW3LRbglutLeOyWW6qy3dLj3_G7RRQGyMRUybPNDErp0xjVgTDN1HPKoM96iaVnk5P5ZWXaetBk4U7xwH8vhxORCZ6hF9KMisCxM1Pb3m4pfluFF1Pl57VU6ehUTOELkpEPykm-ZDHSaH5mmEZGxAo"
                />
              </div>
              <span className="text-xs text-text-secondary font-medium tracking-wide">
                Trusted by 2,000+ business owners
              </span>
            </div>
          </div>
        </section>

        {/* Right Panel */}
        <section className="flex-1 flex flex-col p-6 lg:p-8 justify-center bg-white">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-3">
              {/* Icon container updated from primary to landing page's main theme token */}
              <div className="w-11 h-11 bg-accent rounded-xl flex items-center justify-center text-accent-on shadow-lg shadow-accent/15">
                <Icon name="psychology" filled className="text-2xl" />
              </div>
              {/* Logo label set to text-text-primary */}
              <h1 className="text-2xl tracking-tight text-text-primary font-display font-bold">
                ReplyMind
              </h1>
            </div>
            <p className="text-text-secondary text-sm">
              The intelligence your inbox deserves.
            </p>
          </div>

          {/* Children contains the forms */}
          {children}

          <div className="flex items-center my-6 max-w-[380px] mx-auto w-full">
            <div className="flex-grow border-t border-outline-variant/30" />
            <span className="px-6 text-xs text-text-secondary/60 font-medium tracking-widest uppercase">
              OR
            </span>
            <div className="flex-grow border-t border-outline-variant/30" />
          </div>

          {/* Google Button with subtle shadows and scaling properties matching the theme */}
          <button className="w-full max-w-[380px] mx-auto flex items-center justify-center gap-3 bg-white border border-outline-variant h-[48px] rounded-xl text-sm font-medium text-text-primary hover:bg-surface-container-low hover:shadow-sm transition-all active:scale-[0.98] duration-200">
            <svg height="18" viewBox="0 0 24 24" width="18">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          <p className="mt-5 text-center text-xs text-text-secondary max-w-[380px] mx-auto leading-relaxed">
            By continuing, you agree to our{" "}
            <a className="text-accent font-semibold hover:underline" href="#">
              Terms
            </a>{" "}
            and{" "}
            <a className="text-accent font-semibold hover:underline" href="#">
              Privacy Policy
            </a>
            .
          </p>
        </section>
      </main>
    </div>
  );
}
