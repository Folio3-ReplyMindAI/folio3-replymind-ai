"use client";
import ConversationsView from "@/src/components/dashboard/ConversationsView";
import { REJECTED_CONVERSATIONS } from "@/src/data/mockConversations";

const BANNER = (
    <div className="px-6 py-2 bg-surface-container-low border-b border-outline-variant/30 flex items-center gap-2 text-xs text-on-surface-variant shrink-0">
        <span className="material-symbols-outlined text-[16px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
            info
        </span>
        These messages were not identified as questions by the AI (<code className="font-medium text-on-surface">is_question = false</code>) and were skipped for drafting.
    </div>
);

export default function RejectedPage() {
    return (
        <ConversationsView
            view="rejected"
            heading="Rejected"
            conversations={REJECTED_CONVERSATIONS}
            emptyIcon="block"
            banner={BANNER}
        />
    );
}
