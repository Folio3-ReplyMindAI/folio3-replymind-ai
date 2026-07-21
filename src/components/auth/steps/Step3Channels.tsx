"use client";
import { useEffect, useState } from "react";
import EmailConnectForm from "@/src/components/channels/EmailConnectForm";
import { fetchEmailConnectionStatus } from "@/src/lib/api/email";

const CHANNELS = [
  {
    id: "whatsapp",
    label: "WhatsApp Business",
    desc: "Connect your WhatsApp Business number to receive and reply to messages.",
    icon: "chat",
    iconColor: "text-[#25D366]",
    iconBg: "bg-[#25D366]/10",
    badge: "Most Popular",
  },
  {
    id: "email",
    label: "Email",
    desc: "Forward a support inbox to ReplyMind and let the AI draft replies.",
    icon: "mail",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    badge: null,
  },
  {
    id: "website",
    label: "Website Widget",
    desc: "Embed a live chat widget on your website and handle messages from one place.",
    icon: "web",
    iconColor: "text-secondary",
    iconBg: "bg-secondary/10",
    badge: null,
  },
];

export default function Step3Channels({ onNext, onBack }) {
  const [connected, setConnected] = useState({});
  const [loading, setLoading] = useState({});
  const [emailFormOpen, setEmailFormOpen] = useState(false);

  // Email is the only channel with a real backend integration so far —
  // WhatsApp/Website stay on the simulated connect flow below.
  useEffect(() => {
    fetchEmailConnectionStatus()
      .then((status) => {
        if (status.status === "connected") {
          setConnected((p) => ({ ...p, email: true }));
        }
      })
      .catch(() => {});
  }, []);

  const handleConnect = (id) => {
    if (id === "email") {
      setEmailFormOpen(true);
      return;
    }
    setLoading((p) => ({ ...p, [id]: true }));
    setTimeout(() => {
      setLoading((p) => ({ ...p, [id]: false }));
      setConnected((p) => ({ ...p, [id]: true }));
    }, 1200);
  };

  const handleEmailConnected = () => {
    setEmailFormOpen(false);
    setConnected((p) => ({ ...p, email: true }));
  };

  const handleFinish = () => {
    onNext({ channels: Object.keys(connected).filter((k) => connected[k]) });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-medium text-on-surface mb-1">
          Connect your channels
        </h1>
        <p className="text-sm text-on-surface-variant">
          ReplyMind works across all your messaging platforms. Connect at least one to get started.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {CHANNELS.map((ch) => {
          const isConnected = connected[ch.id];
          const isLoading = loading[ch.id];
          const showEmailForm = ch.id === "email" && emailFormOpen && !isConnected;
          return (
            <div
              key={ch.id}
              className={`flex flex-col gap-4 p-4 rounded-2xl border transition-all ${
                isConnected
                  ? "border-primary/30 bg-primary/5"
                  : "border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container-low"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${ch.iconBg}`}>
                  <span
                    className={`material-symbols-outlined text-[22px] ${ch.iconColor}`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {ch.icon}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-on-surface">{ch.label}</p>
                    {ch.badge && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
                        {ch.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{ch.desc}</p>
                </div>
                <div className="shrink-0">
                  {isConnected ? (
                    <div className="flex items-center gap-1.5 text-primary text-sm font-medium">
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      Connected
                    </div>
                  ) : (
                    <button
                      onClick={() => handleConnect(ch.id)}
                      disabled={isLoading}
                      className="px-4 py-2 rounded-xl border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-on-primary active:scale-95 transition-all disabled:opacity-50"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                          Connecting…
                        </span>
                      ) : (
                        "Connect"
                      )}
                    </button>
                  )}
                </div>
              </div>

              {showEmailForm && (
                <div className="pt-1 border-t border-outline-variant/30">
                  <EmailConnectForm
                    onConnected={handleEmailConnected}
                    onCancel={() => setEmailFormOpen(false)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-outline-variant/30">
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-on-surface-variant hover:bg-surface-container transition-all"
        >
          Back
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={handleFinish}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-on-surface-variant hover:bg-surface-container transition-all"
          >
            Skip for now
          </button>
          <button
            onClick={handleFinish}
            disabled={Object.keys(connected).length === 0}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-full text-sm font-medium hover:bg-primary/90 active:scale-95 transition-all shadow-sm shadow-primary/20 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Finish Setup
            <span className="material-symbols-outlined text-[18px]">check</span>
          </button>
        </div>
      </div>
    </div>
  );
}
