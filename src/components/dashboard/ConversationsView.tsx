"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/src/components/dashboard/Sidebar";
import Header from "@/src/components/dashboard/Header";
import ConversationList from "@/src/components/dashboard/ConversationList";
import ChatDetail from "@/src/components/dashboard/ChatDetail";
import { fetchConversationDetail } from "@/src/lib/api/conversations";
import { useInboxStore } from "@/src/store/useInboxStore";

/**
 * Shared shell for the Inbox and Rejected pages (they only differ in data,
 * heading and the optional info banner). Owns the conversation list state so
 * interactions actually stick:
 *  - opening a chat marks it read (unbolds it in the list)
 *  - the star toggles per-conversation and colors when active
 *  - archiving (Rejected only) removes the conversation and returns to the list
 * The list is full-width until a chat is opened; opening one switches to a
 * two-column layout — chat names stay visible on the left, the open chat on
 * the right — and the back button returns to the full-width list.
 */
export default function ConversationsView({ view, heading, conversations, emptyIcon = null, banner = null }) {
    const [chats, setChats] = useState(conversations);
    const [selectedId, setSelectedId] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [detailLoading, setDetailLoading] = useState(false);
    const [detailError, setDetailError] = useState("");
    const router = useRouter();

    const cachedDetails = useInboxStore((s) => s.detailsById);
    const isDetailFresh = useInboxStore((s) => s.isDetailFresh);
    const setDetailCache = useInboxStore((s) => s.setDetail);

    const selectedChat = chats.find((c) => c.id === selectedId) || null;

    const loadDetail = (chatId, { silent = false } = {}) => {
        if (!silent) setDetailLoading(true);
        return fetchConversationDetail(chatId)
            .then((detail) => {
                setChats((prev) => prev.map((c) => (c.id === chatId ? { ...c, ...detail, read: true } : c)));
                setDetailCache(chatId, detail);
            })
            .catch((err) => {
                if (!silent) setDetailError(err.message);
            })
            .finally(() => {
                if (!silent) setDetailLoading(false);
            });
    };

    const handleSelect = (chat) => {
        setSelectedId(chat.id);
        setDetailError("");
        // Opening a conversation marks it read — the bold styling drops off.
        setChats((prev) => prev.map((c) => (c.id === chat.id ? { ...c, read: true } : c)));

        // Fresh cached detail (e.g. re-opening the same chat within a minute)
        // renders instantly with no fetch at all.
        if (isDetailFresh(chat.id)) {
            const cached = cachedDetails[chat.id].data;
            setChats((prev) => prev.map((c) => (c.id === chat.id ? { ...c, ...cached, read: true } : c)));
            return;
        }

        loadDetail(chat.id);
    };

    // After a reply actually sends, silently re-pull that one conversation's
    // detail (bypassing the cache) so the draft clears and the new outbound
    // message shows up — without a loading flicker on the chat already open.
    const handleSent = (chatId) => loadDetail(chatId, { silent: true });

    const handleToggleStar = (id) =>
        setChats((prev) => prev.map((c) => (c.id === id ? { ...c, starred: !c.starred } : c)));

    const handleArchive = (id) => {
        setChats((prev) => prev.filter((c) => c.id !== id));
        setSelectedId(null);
    };

    return (
        <div className="flex h-screen w-full bg-surface">
            <Header onProfileClick={() => router.push("/dashboard?view=profile")} onMenuClick={() => setMenuOpen(true)} />

            <Sidebar view={view} mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />

            {/* pt-16 offsets the fixed header height; ml only from lg where the sidebar is docked */}
            <main className="flex-1 lg:ml-64 pt-16 h-screen overflow-hidden relative flex flex-col min-w-0">
                {selectedChat ? (
                    <div className="flex-1 flex min-h-0 min-w-0">
                        {/* Left column — the chat list. Hidden on mobile once a chat is open
                            (the open chat takes the full width; Back returns to the list). */}
                        <div className="hidden md:flex w-72 xl:w-96 shrink-0 border-r border-outline-variant/30 bg-surface flex-col min-h-0">
                            <ConversationList
                                compact
                                conversations={chats}
                                heading={heading}
                                selectedId={selectedId}
                                onSelectChat={handleSelect}
                                emptyIcon={emptyIcon}
                            />
                        </div>
                        {/* Right column — the open chat */}
                        <div className="flex-1 min-w-0 h-full">
                            <ChatDetail
                                key={selectedChat.id}
                                chat={selectedChat}
                                starred={!!selectedChat.starred}
                                onToggleStar={() => handleToggleStar(selectedChat.id)}
                                onArchive={view === "rejected" ? () => handleArchive(selectedChat.id) : undefined}
                                onBack={() => setSelectedId(null)}
                                loading={detailLoading}
                                error={detailError}
                                onSent={() => handleSent(selectedChat.id)}
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        {banner}
                        <div className="flex-1 min-h-0 w-full flex flex-col">
                            <ConversationList conversations={chats} heading={heading} onSelectChat={handleSelect} emptyIcon={emptyIcon} />
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
