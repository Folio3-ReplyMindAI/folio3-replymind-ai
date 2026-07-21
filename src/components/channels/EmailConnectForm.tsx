"use client";
import { useState } from "react";
import { connectEmailAccount, type EmailConnectionPayload } from "@/src/lib/api/email";

const DEFAULT_FORM: EmailConnectionPayload = {
  email: "",
  app_password: "",
  imap_host: "imap.gmail.com",
  imap_port: 993,
  smtp_host: "smtp.gmail.com",
  smtp_port: 465,
};

const inputCls =
  "w-full rounded-xl border border-outline-variant/50 bg-surface-container-low text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary px-3 py-2.5 transition-all";

interface EmailConnectFormProps {
  onConnected: (email: string) => void;
  onCancel?: () => void;
}

export default function EmailConnectForm({ onConnected, onCancel }: EmailConnectFormProps) {
  const [form, setForm] = useState<EmailConnectionPayload>(DEFAULT_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: keyof EmailConnectionPayload, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const result = await connectEmailAccount(form);
      onConnected(result.email ?? form.email);
    } catch (err: any) {
      setError(err.message ?? "Failed to connect email.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div>
        <label className="block text-xs font-medium text-on-surface-variant mb-1">Email Address</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="you@yourbusiness.com"
          className={inputCls}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-on-surface-variant mb-1">App Password</label>
        <input
          type="password"
          required
          value={form.app_password}
          onChange={(e) => handleChange("app_password", e.target.value)}
          placeholder="16-character app password"
          className={inputCls}
        />
        <p className="text-[11px] text-on-surface-variant/70 mt-1 leading-relaxed">
          Not your regular password. For Gmail:{" "}
          <a
            href="https://myaccount.google.com/apppasswords"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            generate an app password here
          </a>
          .
        </p>
      </div>

      <details className="text-xs text-on-surface-variant">
        <summary className="cursor-pointer select-none">Advanced (non-Gmail email)</summary>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <input
            value={form.imap_host}
            onChange={(e) => handleChange("imap_host", e.target.value)}
            placeholder="IMAP Host"
            className={`${inputCls} !py-2 text-xs`}
          />
          <input
            type="number"
            value={form.imap_port}
            onChange={(e) => handleChange("imap_port", Number(e.target.value))}
            placeholder="IMAP Port"
            className={`${inputCls} !py-2 text-xs`}
          />
          <input
            value={form.smtp_host}
            onChange={(e) => handleChange("smtp_host", e.target.value)}
            placeholder="SMTP Host"
            className={`${inputCls} !py-2 text-xs`}
          />
          <input
            type="number"
            value={form.smtp_port}
            onChange={(e) => handleChange("smtp_port", Number(e.target.value))}
            placeholder="SMTP Port"
            className={`${inputCls} !py-2 text-xs`}
          />
        </div>
      </details>

      {error && (
        <div className="flex items-start gap-2 rounded-xl bg-error-container/60 px-3 py-2 text-xs text-error">
          <span className="material-symbols-outlined text-[16px] shrink-0">error</span>
          {error}
        </div>
      )}

      <div className="flex items-center gap-2 pt-1">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-sm font-medium text-on-surface-variant hover:bg-surface-container transition-all"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-medium hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-50"
        >
          {submitting ? (
            <>
              <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
              Connecting…
            </>
          ) : (
            "Connect Email"
          )}
        </button>
      </div>
    </form>
  );
}
