import Icon from "@/src/components/common/Icon";

const navItems = [
    { icon: "dashboard", label: "Dashboard", active: true },
    { icon: "inbox", label: "Inbox" },
    { icon: "analytics", label: "Analytics" },
    { icon: "settings", label: "Settings" },
];

const stats = [
    { icon: "mail", label: "Total Messages", value: "1,284", change: "+12%", accent: "text-accent", bg: "bg-accent-bg" },
    { icon: "auto_awesome", label: "AI Acceptance", value: "94.2%", change: "+5.4%", accent: "text-accent", bg: "bg-accent-bg" },
    { icon: "forward_to_inbox", label: "Auto-replies", value: "856", change: "+42", accent: "text-text-secondary", bg: "bg-bg-surface" },
    { icon: "bolt", label: "System Status", value: "Healthy", change: "Active", accent: "text-accent", bg: "bg-accent-bg" },
];

const channels = [
    { label: "Email", value: "1.2k", color: "bg-channel-email", height: "60%" },
    { label: "Website", value: "1.8k", color: "bg-channel-website", height: "85%" },
    { label: "WhatsApp", value: "856", color: "bg-channel-whatsapp", height: "45%" },
    { label: "LinkedIn", value: "512", color: "bg-text-muted", height: "30%" },
];

const actions = [
    { icon: "upload_file", label: "Upload Knowledge Base", desc: "Update AI with new docs" },
    { icon: "group_add", label: "Invite Team", desc: "Add collaborators" },
    { icon: "automation", label: "Workflow Setup", desc: "Define routing rules" },
];

function DashboardPreview() {
    return (
      <div className="relative mt-2 w-full overflow-hidden rounded-[28px] border border-border bg-white/75 backdrop-blur-xl p-4 pointer-events-none select-none md:p-5 shadow-[0_8px_32px_rgba(84,129,90,0.06)]" aria-label="Static ReplyMind dashboard preview">
        <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-accent/5 blur-3xl" />
        <div className="flex h-[640px] overflow-hidden rounded-[22px] bg-white/60 backdrop-blur-sm">
          <aside className="hidden w-[190px] shrink-0 border-r border-border bg-surface-container-low p-4 text-left md:flex md:flex-col">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-accent shadow-[0_0_20px_rgba(84,129,90,0.3)]">
                <span className="material-symbols-outlined text-[21px] text-accent-on msym-fill">psychology</span>
              </div>
              <div>
                <p className="text-[16px] font-bold leading-none text-text-primary">ReplyMind</p>
                <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-text-muted">Business Intel</p>
              </div>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => (
                <div key={item.label} className={`flex items-center gap-3 rounded-r-full border-l-2 px-3 py-2.5 text-[13px] font-medium ${item.active ? "border-accent bg-accent-bg text-accent" : "border-transparent text-text-muted"}`}>
                  <span className="material-symbols-outlined text-[19px]" style={item.active ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </nav>

            <div className="mt-auto rounded-xl bg-accent px-3 py-3 text-center text-[12px] font-semibold text-accent-on shadow-[0_0_20px_rgba(84,129,90,0.25)]">
              + New Message
            </div>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col gap-5 overflow-hidden bg-gradient-to-br from-white via-surface-container-low to-surface-container p-4 sm:p-6">
            <header className="flex h-12 shrink-0 items-center justify-between gap-4">
              <div className="flex h-10 min-w-0 flex-1 items-center gap-3 rounded-full bg-white px-4 text-text-muted sm:max-w-[420px]">
                <span className="material-symbols-outlined text-[19px]">search</span>
                <span className="h-2.5 w-full max-w-[220px] rounded-full bg-border" />
              </div>
              <div className="flex items-center gap-3">
                <div className="relative flex size-10 items-center justify-center rounded-full bg-white">
                  <span className="material-symbols-outlined text-[20px] text-text-secondary">notifications</span>
                  <span className="absolute right-2 top-2 size-2 rounded-full bg-accent" />
                </div>
                <div className="size-10 rounded-full border-2 border-border bg-[linear-gradient(135deg,#54815a,#3c6843)]" />
              </div>
            </header>

            <section className="text-left">
              <h3 className="font-display text-[30px] font-semibold leading-[36px] tracking-[0] text-text-primary">Welcome back, Alex</h3>
              <div className="mt-2 flex items-center gap-2 text-[14px] text-text-secondary">
                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                <span>Tuesday, Jun 30, 2026</span>
              </div>
            </section>

            <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="min-h-[112px] rounded-[16px] border border-border premium-gradient-card p-4 text-left">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className={`flex size-9 items-center justify-center rounded-[10px] ${stat.bg} ${stat.accent}`}>
                      <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
                    </div>
                    <span className={`text-[12px] font-bold ${stat.accent}`}>{stat.change}</span>
                  </div>
                  <p className="truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">{stat.label}</p>
                  <p className="mt-1 font-display text-[24px] font-semibold leading-[30px] tracking-[0] text-text-primary">{stat.value}</p>
                </div>
              ))}
            </section>

            <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_260px]">
              <section className="flex min-h-[230px] flex-col rounded-[18px] border border-border premium-gradient-card p-5 text-left">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-display text-[24px] font-semibold leading-[30px] tracking-[0] text-text-primary">Messages by Channel</h4>
                    <p className="mt-1 text-[14px] text-text-secondary">Visual distribution of incoming inquiries</p>
                  </div>
                  <div className="rounded-full bg-bg-surface px-4 py-2 text-[12px] font-semibold text-text-secondary">Last 7 Days</div>
                </div>

                <div className="relative flex flex-1 items-end justify-around gap-4 border-b border-border px-2 pb-2">
                  <span className="absolute inset-x-0 bottom-1/4 border-t border-dashed border-border" />
                  <span className="absolute inset-x-0 bottom-1/2 border-t border-dashed border-border" />
                  <span className="absolute inset-x-0 bottom-3/4 border-t border-dashed border-border" />
                  {channels.map((channel) => (
                    <div key={channel.label} className="relative z-10 flex h-full flex-1 flex-col items-center justify-end gap-2">
                      <span className="text-[12px] font-semibold text-text-muted">{channel.value}</span>
                      <div className={`w-full max-w-[72px] rounded-t-[10px] ${channel.color}`} style={{ height: channel.height, minHeight: "28px" }} />
                      <span className="text-[12px] font-semibold text-text-secondary">{channel.label}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="hidden min-h-[230px] flex-col gap-3 text-left xl:flex">
                <h4 className="font-display text-[24px] font-semibold leading-[30px] tracking-[0] text-text-primary">Quick Actions</h4>
                {actions.map((action) => (
                  <div key={action.label} className="flex items-center gap-3 rounded-[16px] border border-border premium-gradient-card p-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-[12px] bg-accent-bg text-accent">
                      <span className="material-symbols-outlined text-[22px]">{action.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-bold text-text-primary">{action.label}</p>
                      <p className="truncate text-[12px] text-text-muted">{action.desc}</p>
                    </div>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </div>
      </div>
    );
}

export default function HeroDashboard() {
    return (
      <section className="relative px-6 pb-20 hero-bg">
        <div className="mx-auto max-w-7xl">
          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-12">
            <section className="rounded-[28px] border border-border premium-gradient-card p-6 text-left md:col-span-9 md:p-9 lg:p-12">
              <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-headline-md font-medium text-text-primary">Unified Message Center</h2>
                </div>
                <div className="rounded-full border border-border bg-bg-surface px-4 py-2 text-label-sm text-text-secondary">
                  Static Dashboard Preview
                </div>
              </div>

              <DashboardPreview />
            </section>

            <section className="flex flex-col justify-between rounded-[28px] border border-border premium-gradient-card p-10 text-left md:col-span-3">
              <div>
                <div className="mb-8 flex size-14 items-center justify-center rounded-[20px] bg-accent-bg shadow-[0_0_24px_rgba(84,129,90,0.15)]">
                  <Icon name="speed" className="text-3xl text-accent" />
                </div>
                <h2 className="mb-3 text-headline-md font-medium text-text-primary">Instant Response</h2>
                <p className="text-body-md text-text-secondary">
                  Slash your average response time from hours to seconds with pre-written,
                  high-quality drafts.
                </p>
              </div>
              <div className="mt-10">
                <span className="font-display text-[72px] font-semibold leading-[80px] tracking-[0] text-accent">92%</span>
                <span className="mt-2 block text-label-md text-text-secondary">
                  Faster response rate
                </span>
              </div>
            </section>
          </div>
        </div>
      </section>
    );
}
