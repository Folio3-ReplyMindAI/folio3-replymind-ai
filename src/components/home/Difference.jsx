import Icon from "@/src/components/common/Icon";

function DiffItem({ icon, bg, fg, title, desc }) {
    return (<div className="flex gap-8 group">
      <div className={`shrink-0 w-16 h-16 rounded-lg ${bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
        <Icon name={icon} className={`${fg} text-3xl`}/>
      </div>
      <div>
        <h4 className="text-headline-md text-text-primary mb-3">{title}</h4>
        <p className="text-text-secondary text-body-lg">{desc}</p>
      </div>
    </div>);
}

export default function Difference() {
    return (<section className="relative py-32 px-6 bg-surface-container overflow-hidden">
      <div className="gradient-orb pointer-events-none absolute -right-60 -top-60 h-[600px] w-[600px] opacity-20" />
      <div className="gradient-orb pointer-events-none absolute -left-60 -bottom-60 h-[500px] w-[500px] opacity-10" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-24">
          <div className="flex-1">
            <h2 className="text-headline-lg mb-10">
              <span className="text-text-primary">Experience the </span>
              <span className="hero-gradient-text">ReplyMind difference</span>
            </h2>
            <div className="space-y-10">
              <DiffItem icon="brush" bg="bg-accent-bg" fg="text-accent" title="Organic Aesthetics" desc="Inspired by the serenity of nature, our interface uses forest greens and sunset oranges to reduce digital fatigue and keep you focused."/>
              <DiffItem icon="psychology" bg="bg-accent-bg" fg="text-accent" title="Cognitive Load Reduction" desc="Our AI predicts your priority emails, surfacing what matters and archiving the rest before you even open your app, saving you hours every week."/>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-accent/10 via-transparent to-accent/5 blur-2xl" />
            <img alt="Modern desk setup with ReplyMind interface" className="relative rounded-[2rem] border border-border w-full object-cover aspect-4/3 transition-transform duration-500 hover:scale-[1.02] shadow-[0_8px_32px_rgba(84,129,90,0.08)]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMj5gvHLCD1s60wqKCfPQnndNbljO_3ViJvK3ggvB7qMK1bIQ-Vw7KAOxFp3pVE4k76dWfv6puBIEQzE6z3q8ecvBWhZq8SZwSGp5zbJ7d3tXPYQ4c8tx9InLa5x-XN8UqdbkAooGWxv9Ie9Qdk5ZmU51dbjDyXmOeAwfLb28mUoaVmjdnClFXFs-MkpXk81aESL1m9t24Iyz_SORP_7ecD7xw3hZ9x3xT8bN9HyX31rQyvn7Sj6uGshA4FEid4SoKv48I88xHoEo"/>
          </div>
        </div>
      </div>
    </section>);
}
