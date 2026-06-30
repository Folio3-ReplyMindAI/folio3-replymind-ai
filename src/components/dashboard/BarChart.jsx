const CHANNELS = [
    { label: "Email", color: "bg-primary", height: "60%", value: "1.2k" },
    { label: "Website", color: "bg-secondary", height: "85%", value: "1.8k" },
    { label: "WhatsApp", color: "bg-tertiary", height: "45%", value: "856" },
    { label: "LinkedIn", color: "bg-primary-fixed-dim", height: "30%", value: "512" },
];

const GRID_LINES = ["25%", "50%", "75%"];

export default function BarChart() {
    return (<div className="glass-card rounded-xl p-lg flex flex-col flex-1">
      <div className="flex justify-between items-center mb-md">
        <div>
          <h3 className="font-headline-md text-headline-md tracking-tight">Messages by Channel</h3>
          <p className="text-on-surface-variant font-body-sm">Visual distribution of incoming inquiries</p>
        </div>
        <select className="bg-surface-container/50 backdrop-blur-sm rounded-full border-none px-md py-xs text-label-md focus:ring-primary cursor-pointer hover:bg-surface-container-high transition-colors">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>
      <div className="flex-1 w-full flex items-end justify-around gap-md pt-md px-md pb-base relative">
        {GRID_LINES.map((pct) => (
          <div key={pct} className="absolute left-0 right-0 border-t border-dashed border-outline-variant/10 pointer-events-none" style={{ bottom: pct }}/>
        ))}
        <div className="absolute left-0 right-0 bottom-0 border-t border-outline-variant/20 pointer-events-none"/>
        {CHANNELS.map((ch, i) => (<div key={ch.label} className="w-full flex flex-col items-center gap-xs group z-10">
          <span className="text-[12px] text-on-surface-variant/60 font-medium opacity-0 group-hover:opacity-100 transition-opacity">{ch.value}</span>
          <div className={`w-full max-w-[120px] ${ch.color} rounded-t-lg transition-all duration-500 group-hover:brightness-110 group-hover:scale-x-105`} style={{ height: ch.height, animation: `barGrow 0.6s ease-out ${i * 0.1}s both` }}/>
          <span className="text-label-sm text-on-surface-variant font-medium mt-1">{ch.label}</span>
        </div>))}
      </div>
    </div>);
}
