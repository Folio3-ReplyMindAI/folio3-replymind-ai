"use client";
import { useEffect, useState } from "react";
import ConversationsView from "@/src/components/dashboard/ConversationsView";
import { fetchConversations } from "@/src/lib/api/conversations";

export default function InboxPage() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchConversations()
      .then(setConversations)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-surface text-on-surface-variant text-sm">
        Loading conversations…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-surface text-error text-sm">
        {error}
      </div>
    );
  }

  return <ConversationsView view="inbox" heading="Inbox" conversations={conversations} />;
}
