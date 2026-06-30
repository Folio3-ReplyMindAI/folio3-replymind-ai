"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
    { id: "dashboard", icon: "dashboard", label: "Dashboard" },
    { id: "inbox", icon: "inbox", label: "Inbox" },
    { id: "rejected", icon: "block", label: "Rejected" },
    { id: "documents", icon: "description", label: "Documents" },
    { id: "analytics", icon: "analytics", label: "Analytics" },
    { id: "settings", icon: "settings", label: "Settings" },
];

const ROUTE_ITEMS = ["dashboard", "inbox"];

function isRouteItem(id) {
    return ROUTE_ITEMS.includes(id);
}

function getHref(id) {
    return id === "dashboard" ? "/dashboard" : `/${id}`;
}

export default function Sidebar({ view, onViewChange }) {
    const pathname = usePathname();
    const router = useRouter();

    return (<aside className="flex flex-col h-screen w-64 fixed left-0 top-0 z-50 bg-white/40 backdrop-blur-xl border-r border-white/10 shrink-0 sidebar-glass">
      <div className="mb-xl px-4 pt-margin">
        <Link href="/" className="flex items-center gap-sm">
          <div className="bg-primary p-xs rounded-full flex items-center justify-center shadow-lg shadow-primary/20 ring-4 ring-primary/5 transition-transform hover:scale-110">
            <span className="material-symbols-outlined text-white text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
          </div>
          <div>
            <h1 className="font-headline-md text-[20px] font-bold text-primary tracking-tight leading-none">ReplyMind</h1>
            <p className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant/60 mt-1">Business Intelligence</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto font-body-md">
        {NAV_ITEMS.map((item) => {
            const isRoute = isRouteItem(item.id);
            const active = isRoute ? pathname === getHref(item.id) : view === item.id;
            return (<button key={item.id} onClick={() => {
                if (isRoute) {
                    router.push(getHref(item.id));
                } else {
                    if (pathname !== "/dashboard") router.push("/dashboard");
                    onViewChange?.(item.id);
                }
            }} className={`nav-item w-full flex items-center gap-md px-md py-3 rounded-r-full transition-all duration-300 group shadow-sm ${
                active
                    ? "nav-item-active shadow-primary/5 border-l-[2px]"
                    : "text-on-surface-variant nav-item-hover border-l-[2px] border-transparent"
            }`}>
              <span className="material-symbols-outlined text-[22px]" style={active ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>);
        })}
      </nav>

      <div className="px-md pt-base mt-auto pb-margin">
        <button className="w-full bg-primary text-white rounded-xl py-3 font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-xs shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 active:scale-95 group">
          <span className="material-symbols-outlined text-[20px] transition-transform group-hover:rotate-90">add</span>
          New Message
        </button>
        <a className="mt-md flex items-center gap-md text-on-surface-variant/70 hover:text-primary px-md py-3 rounded-xl transition-all duration-300 group" href="#">
          <span className="material-symbols-outlined text-[20px] group-hover:scale-110">contact_support</span>
          <span className="font-medium">Help Center</span>
        </a>
      </div>
    </aside>);
}
