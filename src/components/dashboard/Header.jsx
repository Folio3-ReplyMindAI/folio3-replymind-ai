"use client";
export default function Header() {
    return (<header className="flex justify-between items-center w-full h-16 shrink-0">
      <div className="flex items-center gap-md">
        <div className="md:hidden">
          <span className="material-symbols-outlined text-primary cursor-pointer">menu</span>
        </div>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-outline group-focus-within:text-primary transition-colors">search</span>
          </div>
          <input className="pl-xl pr-md py-xs bg-surface-container-low/50 border-none focus:ring-2 focus:ring-primary rounded-full font-body-sm w-64 md:w-[500px] transition-all backdrop-blur-sm" placeholder="Search analytics..." type="text"/>
        </div>
      </div>
      <div className="flex items-center gap-md">
        <button className="p-xs rounded-full hover:bg-surface-container-high transition-colors relative hover:scale-110 group">
          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">notifications</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full border-2 border-white"></span>
        </button>
        <div className="w-10 h-10 rounded-full border-2 border-primary-fixed overflow-hidden hover:scale-110 transition-transform cursor-pointer">
          <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvuz8Eh2dMUymOuL8i06E9aelD0w9Q2bGHIGBAerl63XhF7V5GIL1SFI3-0CSlCb4jXtaOsyYqDQpMNpOqYcY6OhkSn3IVJvrw4zWf_Dt5i5_fR-IMyUJFXh3ZccfqVxjzjCJxOBSKvz3Mfu_1TGaX5vmV-2Wfii8YBVMFPTP-VbiVeiOti5iWaEDR22_vuup9N-JnY172I9J_8NV9cEej-1qtikQNrvsws0hsecP_k9cFsxXZGNjQXAuFHyZYoGahVBN5b62MR8A"/>
        </div>
      </div>
    </header>);
}
