export default function StatsCard({ icon, label, value, change, variant = "green" }) {
    const cardStyles = {
        green: "card-saturated-green",
        orange: "card-saturated-orange",
        tertiary: "card-saturated-tertiary",
    };
    const iconBg = {
        green: "bg-primary-container/20 text-primary",
        orange: "bg-secondary-container/30 text-secondary",
        tertiary: "bg-on-tertiary-fixed-variant/20 text-on-tertiary-fixed-variant",
    };
    const changeColors = {
        green: "text-primary",
        orange: "text-secondary",
        tertiary: "text-on-tertiary-fixed-variant",
    };

    return (
        <div className={`glass-card ${cardStyles[variant]} rounded-xl p-md flex flex-col gap-sm shadow-sm transition-all hover:scale-[1.02] cursor-default min-h-[140px]`}>
            <div className="flex justify-between items-start">
                <div className={`p-xs rounded-DEFAULT ${iconBg[variant]}`}>
                    <span className="material-symbols-outlined">{icon}</span>
                </div>
                {change && (
                    <span className={`text-[12px] font-medium ${changeColors[variant]}`}>{change}</span>
                )}
            </div>
            <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-on-surface-variant opacity-70">{label}</p>
                <h3 className="text-[28px] font-semibold text-on-surface tracking-tight leading-tight">{value}</h3>
            </div>
        </div>
    );
}
