"use client";
import { useState, useEffect, useRef } from "react";
import ChatMessage from "@/src/components/dashboard/ChatMessage";
import AiDraftFooter from "@/src/components/dashboard/AiDraftFooter";

export default function ChatDetail({ chat, onBack, starred = false, onToggleStar = () => {}, onArchive = () => {} }) {
    const [messages, setMessages] = useState(chat.messages);
    const bottomRef = useRef(null);

    useEffect(() => {
        setMessages(chat.messages);
    }, [chat.id]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = (text) => {
        if (!text.trim()) return;
        const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setMessages((prev) => [
            ...prev,
            { id: Date.now(), from: "me", text: text.trim(), time: now },
        ]);
    };

    return (
        <div className="flex flex-col h-full bg-white w-full">
            {/* Header */}
            <header className="h-16 flex items-center justify-between gap-2 px-3 sm:px-gutter border-b border-outline-variant/30 bg-white/80 backdrop-blur-xl sticky top-0 z-10 shrink-0">
                <div className="flex items-center gap-2 sm:gap-md min-w-0">
                    <button onClick={onBack} className="p-xs hover:bg-surface-container-high rounded-full shrink-0 group">
                        <span className="material-symbols-outlined text-primary group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    </button>
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/20 transition-transform hover:scale-110 cursor-pointer shrink-0">
                        <img alt={chat.name} className="w-full h-full object-cover" src={chat.avatar} />
                    </div>
                    <div className="min-w-0">
                        <h3 className="text-base font-medium text-on-surface truncate">{chat.name}</h3>
                        <div className="flex items-center gap-2 min-w-0">
                            <span className="text-body-sm text-on-surface-variant truncate">{chat.email}</span>
                            <span className="hidden sm:inline px-2 py-0.5 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-medium shrink-0">{chat.channel}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-sm shrink-0">
                    <button
                        onClick={onToggleStar}
                        title={starred ? "Unstar conversation" : "Star conversation"}
                        className="p-sm hover:bg-surface-container-high rounded-full transition-all group"
                    >
                        <span
                            className={`material-symbols-outlined transition-all group-hover:scale-110 ${starred ? "text-amber-400" : "group-hover:text-amber-400"}`}
                            style={starred ? { fontVariationSettings: "'FILL' 1" } : {}}
                        >
                            star
                        </span>
                    </button>
                    {onArchive && (
                        <button
                            onClick={onArchive}
                            title="Archive conversation"
                            className="p-sm hover:bg-surface-container-high rounded-full transition-all group"
                        >
                            <span className="material-symbols-outlined group-hover:scale-110 group-hover:text-primary">archive</span>
                        </button>
                    )}
                </div>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-gutter space-y-lg custom-scrollbar bg-surface-bright/30">
                <div className="flex justify-center my-md">
                    <span className="px-md py-xs bg-surface-variant/50 text-[11px] font-medium text-on-surface-variant rounded-full uppercase tracking-widest">
                        October 24, 2023
                    </span>
                </div>
                {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                ))}
                <div ref={bottomRef} />
            </div>

            {/* Footer */}
            <AiDraftFooter draft={chat.draft} onSend={handleSend} />
        </div>
    );
}
