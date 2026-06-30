"use client";
import Link from "next/link";

export default function Navbar({ scrolled }) {
    return (<nav className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-full border border-border backdrop-blur-xl flex justify-between items-center px-8 py-3 z-50 transition-all ${scrolled ? "bg-white/80 shadow-lg shadow-[rgba(84,129,90,0.08)]" : "bg-white/70"}`}>
      <div className="flex items-center gap-8">
        <span className="font-display text-headline-md tracking-tight">
          <span className="hero-gradient-text">ReplyMind</span>
        </span>
        <div className="hidden md:flex gap-8 items-center">
          <a className="nav-link active text-label-md text-text-primary font-bold transition-colors" href="#">Product</a>
          <a className="nav-link text-label-md text-text-secondary hover:text-text-primary transition-colors" href="#how">How It Works</a>
          <a className="nav-link text-label-md text-text-secondary hover:text-text-primary transition-colors" href="#pricing">Pricing</a>
          <a className="nav-link text-label-md text-text-secondary hover:text-text-primary transition-colors" href="#">Resources</a>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Link href="/login" className="hidden sm:block text-label-md text-text-secondary hover:text-text-primary transition-colors">
          Log In
        </Link>
        <Link href="/register" className="bg-accent text-accent-on px-7 py-2.5 rounded-full text-label-md active:scale-95 transition-all hover:bg-accent-hover shadow-[0_0_24px_rgba(84,129,90,0.25)]">
          Start Free
        </Link>
      </div>
    </nav>);
}
