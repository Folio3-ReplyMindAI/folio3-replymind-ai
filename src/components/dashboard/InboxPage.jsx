"use client";
import ConversationsView from "@/src/components/dashboard/ConversationsView";
import { INBOX_CONVERSATIONS } from "@/src/data/mockConversations";

export default function InboxPage() {
    return <ConversationsView view="inbox" heading="Inbox" conversations={INBOX_CONVERSATIONS} />;
}
