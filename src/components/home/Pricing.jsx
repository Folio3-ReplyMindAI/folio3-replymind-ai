import Icon from "@/src/components/common/Icon";

function PricingCard({ name, price, features, cta, highlighted }) {
    return (<div className={`rounded-[2rem] border p-12 flex flex-col relative ${highlighted
            ? "border-accent shadow-[0_0_40px_rgba(84,129,90,0.12)] relative md:scale-105 z-10 bg-white/80 backdrop-blur-xl"
            : "border-border bg-white/70 backdrop-blur-sm"}`}>
      {highlighted && (
        <>
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-accent/5 via-transparent to-accent/5 pointer-events-none" />
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-accent text-accent-on px-6 py-1.5 rounded-full text-label-sm tracking-wider shadow-[0_0_24px_rgba(84,129,90,0.35)]">
            MOST POPULAR
          </div>
        </>
      )}
      <h3 className="text-headline-md text-text-primary mb-3 relative z-10">{name}</h3>
      <div className="flex items-baseline gap-1 mb-8 relative z-10">
        <span className="text-5xl font-display font-bold text-text-primary">{price}</span>
        <span className="text-text-secondary text-body-lg">/mo</span>
      </div>
      <ul className="space-y-5 mb-12 flex-1 relative z-10">
        {features.map((f) => (<li key={f} className="flex items-center gap-4 text-body-md text-text-secondary">
            <Icon name="check_circle" className="text-accent text-[24px]"/>
            {f}
          </li>))}
      </ul>
      <button className={`relative z-10 w-full py-4 rounded-full text-label-md transition-all ${highlighted
            ? "bg-accent text-accent-on hover:bg-accent-hover shadow-[0_0_24px_rgba(84,129,90,0.3)]"
            : "border border-accent text-accent hover:bg-accent-bg"}`}>
        {cta}
      </button>
    </div>);
}

export default function Pricing() {
    return (<section id="pricing" className="relative py-32 px-6 overflow-hidden">
      <div className="gradient-orb pointer-events-none absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 opacity-30" />
      <div className="gradient-orb pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] opacity-20" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-headline-lg mb-6">
            <span className="text-text-primary">Simple, </span>
            <span className="hero-gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-body-lg text-text-secondary">
            Choose the plan that fits your business scale.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          <PricingCard name="Starter" price="$0" features={["1 Messaging Channel", "50 AI Drafts/month", "Basic Support"]} cta="Get Started"/>
          <PricingCard name="Professional" price="$19" highlighted features={[
            "Unlimited Channels",
            "500 AI Drafts/month",
            "Custom Brand Voice",
            "Priority Support",
          ]} cta="Start 14-Day Trial"/>
          <PricingCard name="Scale" price="$49" features={["Unlimited Drafts", "Team Shared Inbox", "API Access"]} cta="Contact Sales"/>
        </div>
      </div>
    </section>);
}
