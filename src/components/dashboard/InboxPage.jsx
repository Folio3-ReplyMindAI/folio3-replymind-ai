"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/src/components/dashboard/Sidebar";
import Header from "@/src/components/dashboard/Header";
import ConversationList from "@/src/components/dashboard/ConversationList";
import ChatDetail from "@/src/components/dashboard/ChatDetail";
import { INBOX_CONVERSATIONS } from "@/src/data/mockConversations";

export default function InboxPage() {
    const [selectedChat, setSelectedChat] = useState(null);
    const router = useRouter();

    return (
        <div className="flex h-screen w-full bg-surface">
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,_rgba(0,96,41,0.08)_0%,_transparent_50%),radial-gradient(circle_at_20%_80%,_rgba(142,78,20,0.08)_0%,_transparent_50%)]" />
                <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[140px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-secondary/10 rounded-full blur-[140px]" />
            </div>

            {/* Fixed full-width header */}
            <Header onProfileClick={() => router.push("/dashboard?view=profile")} />

            <Sidebar view="inbox" />

            {/* pt-16 offsets the fixed header height */}
            <main className="flex-1 ml-64 pt-16 h-screen overflow-hidden relative bg-transparent flex min-w-0 z-10">
                <div className={`h-full border-r border-outline-variant/30 bg-transparent flex-shrink-0 w-80 ${selectedChat ? "hidden lg:flex lg:flex-col" : "flex flex-col w-full lg:w-80"}`}>
                    <ConversationList conversations={INBOX_CONVERSATIONS} heading="Inbox" onSelectChat={setSelectedChat} />
                </div>

                {selectedChat ? (
                    <div className="flex-1 h-full min-w-0">
                        <ChatDetail key={selectedChat.id} chat={selectedChat} onBack={() => setSelectedChat(null)} />
                    </div>
                ) : (
                    <div className="hidden lg:flex flex-1 h-full items-center justify-center text-on-surface-variant opacity-40 flex-col gap-3">
                        <span className="material-symbols-outlined text-5xl">forum</span>
                        <p className="text-sm">Select a conversation to open it</p>
                    </div>
                )}
            </main>
        </div>
    );
}
