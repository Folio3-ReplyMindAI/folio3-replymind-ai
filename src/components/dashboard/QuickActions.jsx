const ACTIONS = [
    { icon: "upload_file", color: "bg-primary-container/10 text-primary hover:bg-primary hover:text-white", label: "Upload Knowledge Base", desc: "Update AI with new docs" },
    { icon: "group_add", color: "bg-secondary-container/10 text-secondary hover:bg-secondary hover:text-white", label: "Invite Team", desc: "Add collaborators" },
    { icon: "automation", color: "bg-tertiary-container/10 text-tertiary hover:bg-tertiary hover:text-white", label: "Workflow Setup", desc: "Define routing rules" },
];

export default function QuickActions() {
    return (<>
      <h3 className="text-base font-medium mb-md">Quick Actions</h3>
      <div className="flex flex-col gap-sm flex-1">
        {ACTIONS.map((a) => (<button key={a.label} className="glass-card flex items-center gap-md p-md rounded-xl text-left hover:border-primary/50 transition-all group w-full">
          <div className={`w-12 h-12 shrink-0 rounded-lg flex items-center justify-center transition-all duration-300 ${a.color}`}>
            <span className="material-symbols-outlined group-hover:scale-110">{a.icon}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate">{a.label}</p>
            <p className="text-sm text-on-surface-variant opacity-70 truncate">{a.desc}</p>
          </div>
        </button>))}
        <div className="glass-card p-md rounded-xl bg-primary-container/10 overflow-hidden relative group cursor-pointer hover:bg-primary-container/20 transition-all flex-1 mt-sm">
          <div className="relative z-10">
            <h4 className="text-sm font-medium text-primary mb-xs">Pro Tip</h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">Try enabling &apos;Auto-Pilot&apos; for your Website channel to reduce manual drafting by 60%.</p>
          </div>
          <span className="material-symbols-outlined absolute -bottom-6 -right-6 text-primary/10 text-[100px] transition-transform group-hover:scale-110 group-hover:rotate-12" style={{ fontVariationSettings: "'FILL' 1" }}>tips_and_updates</span>
        </div>
      </div>
    </>);
}
