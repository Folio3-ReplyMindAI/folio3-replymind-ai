"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const NAV_ITEMS = [
    { id: "inbox", icon: "inbox", label: "Inbox" },
    { id: "rejected", icon: "block", label: "Rejected" },
    { id: "documents", icon: "description", label: "Documents" },
    { id: "analytics", icon: "analytics", label: "Analytics" },
    { id: "billing", icon: "receipt_long", label: "Billing & Plan" },
    { id: "settings", icon: "settings", label: "Settings" },
];

const ROUTE_ITEMS = ["inbox", "rejected"];

function isRouteItem(id) {
    return ROUTE_ITEMS.includes(id);
}

function getHref(id) {
    return `/${id}`;
}

export default function Sidebar({ view, onViewChange }) {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    return (
        <aside className="flex flex-col fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 z-40 bg-white/40 backdrop-blur-xl border-r border-white/10 shrink-0 sidebar-glass">
            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto font-body-md">
                {NAV_ITEMS.map((item) => {
                    const isRoute = isRouteItem(item.id);
                    const urlView = searchParams.get("view") || "analytics";
                    const active = isRoute
                        ? pathname === getHref(item.id)
                        : pathname === "/dashboard" && (view === item.id || urlView === item.id);
                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                if (isRoute) {
                                    router.push(getHref(item.id));
                                } else {
                                    router.push(`/dashboard?view=${item.id}`);
                                    onViewChange?.(item.id);
                                }
                            }}
                            className={`nav-item w-full flex items-center gap-md px-md py-3 rounded-r-full transition-all duration-300 group shadow-sm ${
                                active
                                    ? "nav-item-active shadow-primary/5 border-l-[2px]"
                                    : "text-on-surface-variant nav-item-hover border-l-[2px] border-transparent"
                            }`}
                        >
                            <span className="material-symbols-outlined text-[22px]" style={active ? { fontVariationSettings: "'FILL' 1" } : {}}>
                                {item.icon}
                            </span>
                            <span className={`text-sm ${active ? "font-medium" : "font-normal"}`}>{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            <div className="px-md pt-base mt-auto pb-6">
                <button className="w-full bg-primary text-white rounded-xl py-3 font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-xs shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 active:scale-95 group">
                    <span className="material-symbols-outlined text-[20px] transition-transform group-hover:rotate-90">add</span>
                    New Message
                </button>
                <a className="mt-md flex items-center gap-md text-on-surface-variant/70 hover:text-primary px-md py-3 rounded-xl transition-all duration-300 group" href="#">
                    <span className="material-symbols-outlined text-[20px] group-hover:scale-110">contact_support</span>
                    <span className="font-medium">Help Center</span>
                </a>
            </div>
        </aside>
    );
}
