export default function ConversationCard({ chat, onSelect }) {
    return (<div onClick={() => onSelect?.(chat)} className="conversation-card glass-card p-md rounded-xl cursor-pointer hover:shadow-md transition-all duration-200 group relative overflow-hidden" data-id={chat.id}>
      <div className="flex gap-md relative z-10">
        <div className="relative">
          <img alt={chat.name} className="w-14 h-14 rounded-full object-cover border-2 border-white group-hover:scale-105 transition-transform" src={chat.avatar}/>
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-secondary-container rounded-full border-2 border-white flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[14px] text-on-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>public</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-xs">
            <h3 className="font-label-md text-label-md text-on-surface truncate pr-4 group-hover:text-primary transition-colors">{chat.name}</h3>
            <span className="font-label-sm text-label-sm text-on-surface-variant opacity-60">{chat.time}</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 mb-sm">{chat.preview}</p>
          <div className="ai-draft-chip p-xs pl-sm pr-md rounded-lg flex items-center gap-sm transition-transform group-hover:translate-x-1">
            <span className="material-symbols-outlined text-[16px] text-secondary">auto_awesome</span>
            <p className="font-label-sm text-label-sm text-on-primary-container truncate">Draft: &ldquo;{chat.draft}&rdquo;</p>
          </div>
        </div>
      </div>
    </div>);
}
