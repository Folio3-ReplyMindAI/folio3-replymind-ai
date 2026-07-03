export default function ConversationCard({ chat, onSelect, active = false }) {
    const unread = !chat.read;

    return (
        <div
            onClick={() => onSelect?.(chat)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer border transition-colors duration-150 ${
                active
                    ? "bg-primary/10 border-primary/40"
                    : "bg-white/60 border-outline-variant/20 hover:border-primary/30 hover:bg-white"
            }`}
            data-id={chat.id}
        >
            {/* Avatar */}
            <div className="relative shrink-0">
                <img
                    alt={chat.name}
                    src={chat.avatar}
                    className="w-12 h-12 rounded-full object-cover"
                />
                {unread && (
                    <span className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-white" />
                )}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                    <span className={`text-sm truncate ${unread ? "font-semibold text-on-surface" : "font-normal text-on-surface-variant"}`}>
                        {chat.name}
                    </span>
                    <span className="flex items-center gap-1.5 shrink-0">
                        {chat.starred && (
                            <span className="material-symbols-outlined text-[16px] text-amber-400" style={{ fontVariationSettings: "'FILL' 1" }}>
                                star
                            </span>
                        )}
                        <span className={`text-xs font-normal ${unread ? "text-primary" : "text-on-surface-variant opacity-50"}`}>
                            {chat.time}
                        </span>
                    </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                    <p className={`text-xs truncate flex-1 ${unread ? "font-medium text-on-surface" : "font-normal text-on-surface-variant"}`}>
                        {chat.preview}
                    </p>
                    {chat.draft && (
                        <span className="shrink-0 text-[10px] font-medium text-secondary bg-secondary-container px-1.5 py-0.5 rounded-full leading-none">
                            AI
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
