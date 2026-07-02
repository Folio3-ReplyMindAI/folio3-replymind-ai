"use client";
import { useState } from "react";

export default function AiDraftFooter({ draft, onSend }) {
    const [draftText, setDraftText] = useState(draft || "");
    const [dismissed, setDismissed] = useState(false);
    const [inputText, setInputText] = useState("");

    const showDraft = draft && !dismissed;

    const sendDraft = () => {
        if (!draftText.trim()) return;
        onSend?.(draftText);
        setDismissed(true);
    };

    const sendInput = () => {
        if (!inputText.trim()) return;
        onSend?.(inputText);
        setInputText("");
    };

    const handleInputKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendInput();
        }
    };

    return (
        <div className="px-gutter pb-gutter pt-sm bg-white/40 backdrop-blur-md shrink-0 border-t border-outline-variant/10">
            {showDraft && (
                <div className="flex flex-col items-end mb-3">
                    <div className="w-full max-w-[70%]">
                        <div className="flex items-center gap-1 mb-1.5 justify-end">
                            <span
                                className="material-symbols-outlined text-[14px] text-primary/50"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                auto_awesome
                            </span>
                            <span className="text-[11px] text-primary/50 font-medium">AI draft · click to edit</span>
                        </div>

                        <textarea
                            value={draftText}
                            onChange={(e) => setDraftText(e.target.value)}
                            rows={3}
                            className="w-full bg-primary-container text-on-primary-container rounded-tl-2xl rounded-bl-2xl rounded-br-2xl p-3 text-sm leading-relaxed resize-none border border-dashed border-primary/40 hover:border-primary/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all cursor-text"
                        />

                        <div className="flex items-center justify-between mt-1.5">
                            <button
                                onClick={() => setDismissed(true)}
                                className="p-1.5 rounded-full hover:bg-red-50 text-on-surface-variant/40 hover:text-red-400 transition-colors"
                                title="Dismiss draft"
                            >
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                            <button
                                onClick={sendDraft}
                                className="flex items-center gap-1.5 px-4 py-1.5 bg-primary text-on-primary rounded-full text-sm font-medium hover:bg-primary/90 active:scale-95 transition-all shadow-sm shadow-primary/20"
                            >
                                <span className="material-symbols-outlined text-[16px]">send</span>
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center gap-2">
                <div className="flex-1 bg-surface-container-low rounded-full px-4 py-2.5 border border-outline-variant/30 flex items-center focus-within:ring-2 focus-within:ring-primary/40 transition-all">
                    <input
                        className="bg-transparent border-none focus:outline-none w-full text-sm placeholder:text-on-surface-variant/50"
                        placeholder="Write a message…"
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                    />
                </div>
                <button
                    onClick={sendInput}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-on-primary hover:bg-primary/90 active:scale-95 transition-all shadow-sm shadow-primary/20 shrink-0"
                >
                    <span className="material-symbols-outlined text-[20px]">send</span>
                </button>
            </div>
        </div>
    );
}
