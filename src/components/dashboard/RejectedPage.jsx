"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/src/components/dashboard/Sidebar";
import Header from "@/src/components/dashboard/Header";
import ConversationList from "@/src/components/dashboard/ConversationList";
import ChatDetail from "@/src/components/dashboard/ChatDetail";
import { REJECTED_CONVERSATIONS } from "@/src/data/mockConversations";

export default function RejectedPage() {
    const [selectedChat, setSelectedChat] = useState(null);
    const router = useRouter();

    return (
        <div className="flex h-screen w-full bg-surface">
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,_rgba(0,96,41,0.08)_0%,_transparent_50%),radial-gradient(circle_at_20%_80%,_rgba(142,78,20,0.08)_0%,_transparent_50%)]" />
                <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[140px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-secondary/10 rounded-full blur-[140px]" />
            </div>

            <Header onProfileClick={() => router.push("/dashboard?view=profile")} />

            <Sidebar view="rejected" />

            <main className="flex-1 ml-64 pt-16 h-screen overflow-hidden relative bg-transparent flex min-w-0 z-10">
                {/* Info banner */}
                {!selectedChat && (
                    <div className="absolute top-0 left-0 right-0 z-10 px-4 py-2 bg-surface-container-low border-b border-outline-variant/30 flex items-center gap-2 text-xs text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                            info
                        </span>
                        These messages were not identified as questions by the AI (<code className="font-medium text-on-surface">is_question = false</code>) and were skipped for drafting.
                    </div>
                )}

                <div
                    className={`h-full border-r border-outline-variant/30 bg-transparent flex-shrink-0 w-80 ${
                        selectedChat ? "hidden lg:flex lg:flex-col" : "flex flex-col w-full lg:w-80"
                    } ${!selectedChat ? "pt-9" : ""}`}
                >
                    <ConversationList
                        conversations={REJECTED_CONVERSATIONS}
                        heading="Rejected"
                        onSelectChat={setSelectedChat}
                    />
                </div>

                {selectedChat ? (
                    <div className="flex-1 h-full min-w-0">
                        <ChatDetail
                            key={selectedChat.id}
                            chat={selectedChat}
                            onBack={() => setSelectedChat(null)}
                        />
                    </div>
                ) : (
                    <div className="hidden lg:flex flex-1 h-full items-center justify-center flex-col gap-3 text-on-surface-variant/40">
                        <span className="material-symbols-outlined text-5xl">block</span>
                        <p className="text-sm">Select a conversation to review it</p>
                    </div>
                )}
            </main>
        </div>
    );
}
