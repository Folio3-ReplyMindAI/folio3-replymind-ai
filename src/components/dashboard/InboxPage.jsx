"use client";
import Sidebar from "@/src/components/dashboard/Sidebar";
import ConversationList from "@/src/components/dashboard/ConversationList";

export default function InboxPage() {
    return (<div className="flex h-screen w-full bg-surface">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,_rgba(0,96,41,0.08)_0%,_transparent_50%),radial-gradient(circle_at_20%_80%,_rgba(142,78,20,0.08)_0%,_transparent_50%)]"/>
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[140px]"/>
        <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-secondary/10 rounded-full blur-[140px]"/>
      </div>
      <Sidebar view="inbox" />
      <main className="flex-1 ml-64 h-screen overflow-hidden relative bg-transparent flex flex-col min-w-0 z-10">
        <ConversationList />
      </main>
    </div>);
}
