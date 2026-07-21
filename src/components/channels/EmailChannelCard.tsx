"use client";
import { useEffect, useState } from "react";
import EmailConnectForm from "@/src/components/channels/EmailConnectForm";
import {
  disconnectEmailAccount,
  fetchEmailConnectionStatus,
  type EmailConnectionStatus,
} from "@/src/lib/api/email";

export default function EmailChannelCard() {
  const [status, setStatus] = useState<EmailConnectionStatus>({ email: null, status: "not_configured" });
  const [loading, setLoading] = useState(true);
  const [disconnecting, setDisconnecting] = useState(false);
  const [error, setError] = useState("");

  const loadStatus = async () => {
    try {
      setStatus(await fetchEmailConnectionStatus());
    } catch (err: any) {
      setError(err.message ?? "Failed to load email connection status.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatus();
  }, []);

  const handleDisconnect = async () => {
    setDisconnecting(true);
    setError("");
    try {
      await disconnectEmailAccount();
      setStatus({ email: null, status: "not_configured" });
    } catch (err: any) {
      setError(err.message ?? "Failed to disconnect email.");
    } finally {
      setDisconnecting(false);
    }
  };

  return (
    <section className="glass-card p-6 flex flex-col gap-4 !rounded-2xl hover:!translate-y-0">
      <div>
        <h3 className="text-base font-medium text-text-primary">Email</h3>
        <p className="text-xs text-text-secondary mt-0.5">
          Connect your own email so customer messages land in your inbox and replies go out from your real address.
        </p>
      </div>

      {loading ? (
        <p className="text-xs text-text-muted">Checking connection…</p>
      ) : status.status === "connected" ? (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-text-primary">
            <span className="material-symbols-outlined text-[18px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
            <span>
              Connected — <span className="font-medium">{status.email}</span>
            </span>
          </div>
          <button
            onClick={handleDisconnect}
            disabled={disconnecting}
            className="text-sm text-error hover:underline disabled:opacity-50 shrink-0"
          >
            {disconnecting ? "Disconnecting…" : "Disconnect"}
          </button>
        </div>
      ) : (
        <EmailConnectForm onConnected={() => loadStatus()} />
      )}

      {error && (
        <div className="flex items-start gap-2 rounded-xl bg-error-container/60 px-3 py-2 text-xs text-error">
          <span className="material-symbols-outlined text-[16px] shrink-0">error</span>
          {error}
        </div>
      )}
    </section>
  );
}
