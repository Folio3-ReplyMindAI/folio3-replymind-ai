export default function AiDraftFooter() {
    return (<div className="p-gutter pt-0 border-t border-outline-variant/10 bg-white/40 backdrop-blur-md shrink-0">
      <div className="mt-md rounded-lg overflow-hidden border border-primary/20 shadow-xl shadow-primary/10">
        <div className="bg-[#2D1658] p-xs px-md flex items-center justify-between">
          <div className="flex items-center gap-sm">
            <span className="material-symbols-outlined text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            <span className="text-label-sm text-white/90 font-bold">AI DRAFT GENERATED</span>
          </div>
          <div className="flex items-center gap-xs">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"/>
            <span className="text-[10px] text-white/60 font-medium">Confidence: 98%</span>
          </div>
        </div>
        <div className="bg-[#382069]/95 p-md">
          <textarea className="w-full bg-transparent border-none focus:ring-0 text-white font-body-md leading-relaxed resize-none h-24" readOnly value="Hi Elena, that's perfect! I've scheduled a 15-minute call for us this Thursday at 3:00 PM EST. I'll send over a calendar invite shortly with the Zoom link. Looking forward to discussing the expansion further!"/>
          <div className="mt-md pt-sm border-t border-white/10 flex justify-end gap-sm">
            <button className="px-md py-2 bg-white/10 hover:bg-white/20 text-white rounded-DEFAULT font-label-md transition-all">Edit</button>
            <button className="px-lg py-2 bg-primary text-white rounded-DEFAULT font-label-md flex items-center gap-sm hover:bg-primary/90 shadow-lg active:scale-95 transition-all group">
              <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">send</span>
              Send
            </button>
          </div>
        </div>
      </div>
      <div className="mt-md flex items-center gap-md pb-md">
        <button className="p-sm hover:bg-surface-container-high rounded-full group">
          <span className="material-symbols-outlined group-hover:rotate-90 group-hover:text-primary transition-all">add_circle</span>
        </button>
        <div className="flex-1 bg-surface-container-low rounded-full px-md py-2 border border-outline-variant/30 flex items-center group focus-within:ring-2 focus-within:ring-primary transition-all">
          <input className="bg-transparent border-none focus:ring-0 w-full" placeholder="Write a message..." type="text"/>
          <button className="p-1 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">sentiment_satisfied</span>
          </button>
        </div>
      </div>
    </div>);
}
