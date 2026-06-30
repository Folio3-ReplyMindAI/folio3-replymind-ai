"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/src/components/dashboard/Sidebar";
import Header from "@/src/components/dashboard/Header";
import StatsGrid from "@/src/components/dashboard/StatsGrid";
import BarChart from "@/src/components/dashboard/BarChart";
import QuickActions from "@/src/components/dashboard/QuickActions";
import ChatDetail from "@/src/components/dashboard/ChatDetail";

export default function Dashboard() {
    const [view, setView] = useState("dashboard");
    const [selectedChat, setSelectedChat] = useState(null);

    useEffect(() => {
        const options = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
        const el = document.getElementById("date-display");
        if (el) el.innerText = new Date().toLocaleDateString("en-US", options);
    }, []);

    return (<div className="flex h-screen w-full bg-surface">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,_rgba(0,96,41,0.08)_0%,_transparent_50%),radial-gradient(circle_at_20%_80%,_rgba(142,78,20,0.08)_0%,_transparent_50%)]"/>
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[140px]"/>
        <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-secondary/10 rounded-full blur-[140px]"/>
      </div>

      <Sidebar view={view} onViewChange={setView} />

      <main className="flex-1 ml-64 h-screen overflow-hidden relative bg-transparent flex flex-col min-w-0 z-10">
        {view === "dashboard" && (
          <div className="overflow-y-auto h-full p-gutter md:p-xl">
            <div className="max-w-[1600px] mx-auto flex flex-col gap-lg">
              <Header />
              <section className="shrink-0">
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs tracking-tight">Welcome back, Alex</h2>
                <div className="flex items-center gap-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                  <p className="font-body-md text-body-md" id="date-display">Loading…</p>
                </div>
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

        {view === "detail" && selectedChat && (
          <div className="flex-1 overflow-hidden">
            <ChatDetail chat={selectedChat} onBack={() => setView("dashboard")} />
          </div>
        )}
      </main>
    </div>);
}
