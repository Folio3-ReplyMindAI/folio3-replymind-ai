"use client";
import Link from "next/link";

export default function Header({ onProfileClick }) {
    return (
        <header className="fixed top-0 left-0 right-0 h-16 z-50 flex items-center justify-between px-6 bg-white/80 backdrop-blur-xl border-b border-outline-variant/20 shadow-sm">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-sm">
                <div className="bg-primary p-xs rounded-full flex items-center justify-center shadow-lg shadow-primary/20 ring-4 ring-primary/5 transition-transform hover:scale-110">
                    <span className="material-symbols-outlined text-white text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                </div>
                <div>
                    <h1 className="text-[18px] font-medium text-primary tracking-tight leading-none">ReplyMind</h1>
                    <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 mt-0.5">Business Intelligence</p>
                </div>
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-md">
                <div className="relative group/avatar">
                    <button
                        onClick={onProfileClick}
                        className="w-10 h-10 rounded-full border-2 border-primary-fixed overflow-hidden hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-primary/40"
                    >
                        <img
                            alt="Profile"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvuz8Eh2dMUymOuL8i06E9aelD0w9Q2bGHIGBAerl63XhF7V5GIL1SFI3-0CSlCb4jXtaOsyYqDQpMNpOqYcY6OhkSn3IVJvrw4zWf_Dt5i5_fR-IMyUJFXh3ZccfqVxjzjCJxOBSKvz3Mfu_1TGaX5vmV-2Wfii8YBVMFPTP-VbiVeiOti5iWaEDR22_vuup9N-JnY172I9J_8NV9cEej-1qtikQNrvsws0hsecP_k9cFsxXZGNjQXAuFHyZYoGahVBN5b62MR8A"
                        />
                    </button>
                    <span className="pointer-events-none absolute -bottom-8 right-0 bg-on-surface text-surface-container-lowest text-xs font-medium px-2 py-1 rounded-lg opacity-0 group-hover/avatar:opacity-100 transition-opacity whitespace-nowrap shadow-md">
                        Profile
                    </span>
                </div>
            </div>
        </header>
    );
}
