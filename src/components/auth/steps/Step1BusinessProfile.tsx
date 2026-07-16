"use client";
import { useState } from "react";
import { createClient } from "@/src/lib/supabase/client";

const TONES = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "friendly", label: "Friendly" },
];

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "ur", label: "Urdu" },
  { value: "ar", label: "Arabic" },
  { value: "fr", label: "French" },
  { value: "es", label: "Spanish" },
];

const inputCls =
  "w-full rounded-xl border border-outline-variant/50 bg-surface-container-low text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary px-3 py-3 transition-all";

export default function Step1BusinessProfile({ onNext }) {
  const [name, setName] = useState("");
  const [tone, setTone] = useState("professional");
  const [lang, setLang] = useState("en");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleContinue = async () => {
    if (!name.trim()) {
      setError("Business name is required.");
      return;
    }
    setError("");
    setSubmitting(true);

    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        setError("You must be logged in to continue.");
        return;
      }

      const { error: userError } = await supabase.auth.getUser();
      if (userError) {
        setError("Your session expired. Please sign in again.");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tenant`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ business_name: name, bot_persona: tone, bot_language: lang }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.detail?.[0]?.msg ?? body?.detail ?? "Something went wrong. Please try again.");
        return;
      }

      onNext({ business_name: name, bot_persona: tone, bot_language: lang });
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-medium text-on-surface mb-1">
          Set up your business profile
        </h1>
        <p className="text-sm text-on-surface-variant">
          This helps the AI understand your tone and language when replying to customers.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {/* Business Name */}
        <div>
          <label className="block text-[11px] font-medium text-on-surface-variant uppercase tracking-[0.06em] mb-1.5">
            Business Name
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-[20px]">
              storefront
            </span>
            <input
              type="text"
              className={`${inputCls} pl-10`}
              placeholder="e.g. Artisan Brews Co."
              value={name}
              onChange={(e) => { setName(e.target.value); setError(""); }}
            />
          </div>
          {error && <p className="text-xs text-error mt-1.5">{error}</p>}
        </div>

        {/* Communication Tone */}
        <div>
          <label className="block text-[11px] font-medium text-on-surface-variant uppercase tracking-[0.06em] mb-1.5">
            Communication Tone
          </label>
          <div
            className="grid gap-2 p-1 bg-surface-container-low rounded-xl border border-outline-variant/40"
            style={{ gridTemplateColumns: `repeat(${TONES.length}, 1fr)` }}
          >
            {TONES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTone(t.value)}
                className={`py-2 px-2 rounded-lg text-xs font-medium transition-all text-center ${
                  tone === t.value
                    ? "bg-primary text-on-primary shadow-sm"
                    : "bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-on-surface-variant/60 mt-1.5">
            The AI will adopt this personality when replying to customers.
          </p>
        </div>

        {/* Primary Language */}
        <div>
          <label className="block text-[11px] font-medium text-on-surface-variant uppercase tracking-[0.06em] mb-1.5">
            Primary Language
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-[20px]">
              language
            </span>
            <select
              className={`${inputCls} pl-10 pr-8 appearance-none cursor-pointer`}
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              {LANGUAGES.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-[20px] pointer-events-none">
              expand_more
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-outline-variant/30">
        <button
          disabled
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-on-surface-variant opacity-30 cursor-not-allowed"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={submitting}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-full text-sm font-medium hover:bg-primary/90 active:scale-95 transition-all shadow-sm shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Saving..." : "Continue"}
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
