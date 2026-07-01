"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/src/components/dashboard/Sidebar";
import Header from "@/src/components/dashboard/Header";
import StatsGrid from "@/src/components/dashboard/StatsGrid";
import BarChart from "@/src/components/dashboard/BarChart";
import QuickActions from "@/src/components/dashboard/QuickActions";
import ChatDetail from "@/src/components/dashboard/ChatDetail";
import DocumentsPage from "@/src/components/dashboard/DocumentsPage";
import ProfilePage from "@/src/components/dashboard/ProfilePage";
import BillingPage from "@/src/components/dashboard/BillingPage";

export default function Dashboard() {
    const searchParams = useSearchParams();
    const [view, setView] = useState(() => searchParams.get("view") || "analytics");
    const [selectedChat, setSelectedChat] = useState(null);

    useEffect(() => {
        const v = searchParams.get("view");
        if (v) setView(v);
    }, [searchParams]);

    return (
        <div className="flex h-screen w-full bg-surface">
            {/* Background blobs */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,_rgba(0,96,41,0.08)_0%,_transparent_50%),radial-gradient(circle_at_20%_80%,_rgba(142,78,20,0.08)_0%,_transparent_50%)]" />
                <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[140px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-secondary/10 rounded-full blur-[140px]" />
            </div>

            {/* Fixed full-width header */}
            <Header onProfileClick={() => setView("profile")} />

            <Sidebar view={view} onViewChange={setView} />

            {/* pt-16 offsets the fixed header height */}
            <main className="flex-1 ml-64 pt-16 h-screen overflow-hidden relative bg-transparent flex flex-col min-w-0 z-10">
                {view === "analytics" && (
                    <div className="overflow-y-auto flex-1 px-gutter md:px-xl py-lg">
                        <div className="max-w-[1600px] mx-auto flex flex-col gap-lg">
                            <section className="shrink-0">
                                <h2 className="text-2xl font-medium text-on-surface mb-xs">Analytics</h2>
                                <p className="text-sm text-on-surface-variant">Overview of your AI messaging performance.</p>
                            </section>
                            <StatsGrid />
                            <div className="flex flex-col xl:flex-row gap-lg w-full min-h-[400px]">
                                <section className="xl:w-3/4 flex">
                                    <BarChart />
                                </section>
                                <section className="xl:w-1/4 flex flex-col gap-md">
                                    <QuickActions />
                                </section>
                            </div>
                        </div>
                    </div>
                )}

                {view === "documents" && <DocumentsPage />}

                {view === "profile" && <ProfilePage />}

                {view === "billing" && <BillingPage />}

                {view === "detail" && selectedChat && (
                    <div className="flex-1 overflow-hidden">
                        <ChatDetail chat={selectedChat} onBack={() => setView("analytics")} />
                    </div>
                )}
            </main>
        </div>
    );
}
