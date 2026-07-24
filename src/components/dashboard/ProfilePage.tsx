"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/src/lib/actions/auth";
import { useTenantStore } from "@/src/store/useTenantStore";
import { fetchBusinessInfo, updateBusinessInfo } from "@/src/lib/api/documents";

// Demo-only setup flags (not shared across pages, so kept local).
const ACCOUNT_STATUS = {
  onboarding_completed: true,
  profile_completed: true,
  documents_uploaded: true,
};

const BUSINESS_TYPES = [
  { value: "restaurant", label: "Restaurant" },
  { value: "clothing", label: "Clothing" },
  { value: "clinic", label: "Clinic" },
  { value: "salon", label: "Salon" },
  { value: "freelancer", label: "Freelancer" },
  { value: "retail", label: "Retail" },
  { value: "gym", label: "Gym" },
  { value: "real_estate", label: "Real Estate" },
  { value: "law_firm", label: "Law Firm" },
  { value: "school", label: "School" },
  { value: "hotel", label: "Hotel" },
  { value: "other", label: "Other" },
];

const PERSONAS = [
  {
    value: "professional",
    label: "Professional",
    desc: "Formal, precise, business-focused",
  },
  { value: "casual", label: "Casual", desc: "Relaxed, conversational" },
  { value: "friendly", label: "Friendly", desc: "Warm, approachable, upbeat" },
];

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "ur", label: "Urdu" },
  { value: "ar", label: "Arabic" },
  { value: "fr", label: "French" },
  { value: "es", label: "Spanish" },
];

const DRAFT_FREQUENCY_OPTIONS = [
  { value: "most", label: "Most of them" },
  { value: "average", label: "Average amount" },
  { value: "less", label: "Very less" },
];

const AUTO_SEND_OPTIONS = [
  { value: "everything", label: "Send everything" },
  { value: "safe", label: "Send mostly safe replies" },
  { value: "exact", label: "Only send exact matches" },
];

const PLAN_LABELS = { free: "Free", pro: "Pro", enterprise: "Enterprise" };
const PLAN_COLORS = {
  free: "bg-surface-container-high text-on-surface-variant",
  pro: "bg-primary-container/30 text-primary",
  enterprise: "bg-secondary-container text-on-secondary-container",
};

const MOCK_CHANNELS = {
  whatsapp: {
    connected: true,
    phone_number_id: "123456789",
    display: "+92 300 1234567",
  },
  email: {
    connected: false,
    inbound_domain: "",
    display: "",
  },
  livechat: {
    connected: true,
    widget_bot_id: "abc-123-xyz",
    display: "Embed code ready",
  },
};

function SegmentedGroup({ options, value, onChange }) {
  return (
    <div
      className={`grid gap-2 p-1 bg-surface-container-low rounded-xl border border-outline-variant/40`}
      style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`py-2 px-2 rounded-lg text-xs font-medium transition-all text-center ${
            value === opt.value
              ? "bg-primary text-on-primary shadow-sm"
              : "bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 ${checked ? "bg-primary" : "bg-surface-container-highest"}`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`}
      />
    </button>
  );
}

function SectionCard({ title, description, children }) {
  return (
    <div className="glass-card p-6 flex flex-col gap-5 !rounded-2xl hover:!translate-y-0">
      <div>
        <h3 className="text-base font-medium text-on-surface">{title}</h3>
        {description && (
          <p className="text-xs text-on-surface-variant mt-0.5">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

function FieldLabel({ children }) {
  return (
    <label className="block text-[11px] font-medium text-on-surface-variant uppercase tracking-[0.06em] mb-1.5">
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-outline-variant/50 bg-surface-container-low text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary px-3 py-2.5 transition-all";

function SaveButton({ saved, saving = false, disabled = false, onClick }) {
  return (
    <div className="flex justify-end pt-1">
      <button
        onClick={onClick}
        disabled={saving || disabled}
        className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-full text-sm font-medium hover:bg-primary/90 active:scale-95 transition-all shadow-sm shadow-primary/20 disabled:opacity-50"
      >
        {saved ? (
          <>
            <span className="material-symbols-outlined text-[16px]">check</span>{" "}
            Saved
          </>
        ) : saving ? (
          "Saving…"
        ) : (
          "Save Changes"
        )}
      </button>
    </div>
  );
}

function useSaved() {
  const [saved, setSaved] = useState(false);
  const trigger = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  return [saved, trigger] as const;
}

export default function ProfilePage() {
  const router = useRouter();
  // Shared tenant data comes from the store, so a Save here is visible on
  // every other page that reads the same store (e.g. the Documents page).
  const tenant = useTenantStore();
  const [biz, setBiz] = useState({
    business_name: tenant.businessName,
    business_type: tenant.businessType,
  });
  const [ai, setAi] = useState({
    bot_persona: tenant.botPersona,
    bot_language: tenant.botLanguage,
  });
  const [conf, setConf] = useState({
    enabled: true,
    draft_frequency: "average",
    auto_reply_enabled: true,
    auto_send_threshold: "safe",
  });
  const [autoReplyError, setAutoReplyError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  // Core business info — the same business_profile blob the Documents page and
  // onboarding write. Seeded from the shared store, then refreshed from the API
  // so every field the backend returns (whatever onboarding collected) shows up.
  const [coreBiz, setCoreBiz] = useState({
    operating_hours: tenant.businessProfile.operatingHours,
    location: tenant.businessProfile.location,
    delivery_options: tenant.businessProfile.deliveryOptions,
  });
  const [coreLoading, setCoreLoading] = useState(true);
  const [savingCore, setSavingCore] = useState(false);
  const [coreError, setCoreError] = useState("");

  useEffect(() => {
    fetchBusinessInfo()
      .then((info) => {
        setCoreBiz({
          operating_hours: info.operating_hours ?? "",
          location: info.location ?? "",
          delivery_options: info.delivery_options ?? "",
        });
        tenant.setBusinessProfile({
          operatingHours: info.operating_hours ?? "",
          location: info.location ?? "",
          deliveryOptions: info.delivery_options ?? "",
        });
      })
      .catch((err) => setCoreError(err.message ?? "Failed to load business info."))
      .finally(() => setCoreLoading(false));
    // Store setters are stable; run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [channels, setChannels] = useState(MOCK_CHANNELS); // ← add this

  const [coreSaved, triggerCoreSave] = useSaved();
  const [bizSaved, triggerBizSave] = useSaved();
  const [aiSaved, triggerAiSave] = useSaved();
  const [confSaved, triggerConfSave] = useSaved();
  const [channelSaved, triggerChannelSave] = useSaved();

  const handleBizSave = () => {
    // Write the edited values into the shared store; the heading (and any
    // other page reading the store) updates from here.
    tenant.setBusinessName(biz.business_name);
    tenant.setBusinessType(biz.business_type);
    triggerBizSave();
  };

  const handleCoreSave = async () => {
    setCoreError("");
    setSavingCore(true);
    try {
      // Persists to the business_profile blob — the same one the Documents
      // page edits — and mirrors it into the shared store so both pages stay
      // in sync in-session.
      const updated = await updateBusinessInfo(coreBiz);
      setCoreBiz({
        operating_hours: updated.operating_hours ?? "",
        location: updated.location ?? "",
        delivery_options: updated.delivery_options ?? "",
      });
      tenant.setBusinessProfile({
        operatingHours: updated.operating_hours ?? "",
        location: updated.location ?? "",
        deliveryOptions: updated.delivery_options ?? "",
      });
      triggerCoreSave();
    } catch (err) {
      setCoreError(err.message ?? "Failed to save business info.");
    } finally {
      setSavingCore(false);
    }
  };

  // Confidence master toggle drives auto-reply: turning it off switches
  // auto-reply off too, turning it on brings auto-reply back on.
  const handleConfidenceToggle = (v) => {
    setAutoReplyError("");
    setConf({ ...conf, enabled: v, auto_reply_enabled: v });
  };

  const handleAutoReplyToggle = (v) => {
    if (!conf.enabled) {
      setAutoReplyError(
        "Auto-reply can't be turned on while Confidence & Autonomy is off — the AI needs drafting enabled to send replies. Turn the toggle above on first."
      );
      return;
    }
    setAutoReplyError("");
    setConf({ ...conf, auto_reply_enabled: v });
  };
  return (
    <div className="overflow-y-auto flex-1 px-gutter md:px-xl pb-gutter md:pb-xl pt-lg custom-scrollbar">
      <div className="max-w-2xl mx-auto flex flex-col gap-lg">
        {/* Page heading + avatar */}
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="relative shrink-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-primary-fixed overflow-hidden shadow-md">
              <img
                alt="Profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvuz8Eh2dMUymOuL8i06E9aelD0w9Q2bGHIGBAerl63XhF7V5GIL1SFI3-0CSlCb4jXtaOsyYqDQpMNpOqYcY6OhkSn3IVJvrw4zWf_Dt5i5_fR-IMyUJFXh3ZccfqVxjzjCJxOBSKvz3Mfu_1TGaX5vmV-2Wfii8YBVMFPTP-VbiVeiOti5iWaEDR22_vuup9N-JnY172I9J_8NV9cEej-1qtikQNrvsws0hsecP_k9cFsxXZGNjQXAuFHyZYoGahVBN5b62MR8A"
              />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-xl sm:text-2xl font-medium text-on-surface leading-tight truncate">
              {tenant.businessName}
            </h2>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
              <span
                className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${PLAN_COLORS[tenant.planTier]}`}
              >
                {PLAN_LABELS[tenant.planTier]}
              </span>
              <span className="text-xs text-on-surface-variant/60">
                Member since{" "}
                {new Date(tenant.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
          <button
            type="button"
            disabled={loggingOut}
            onClick={async () => {
              setLoggingOut(true);
              await signOut();
              router.push("/");
            }}
            className="shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-outline-variant/50 text-sm font-medium text-on-surface-variant hover:border-error hover:text-error hover:bg-error-container/40 active:scale-95 transition-all disabled:opacity-60"
          >
            <span className={`material-symbols-outlined text-[18px] ${loggingOut ? "animate-spin" : ""}`}>
              {loggingOut ? "progress_activity" : "logout"}
            </span>
            <span className="hidden sm:inline">{loggingOut ? "Logging out…" : "Log out"}</span>
          </button>
        </div>

        {/* ── Business Details ── */}
        <SectionCard
          title="Business Details"
          description="Your public-facing business information."
        >
          <div className="flex flex-col gap-4">
            <div>
              <FieldLabel>Business Name</FieldLabel>
              <input
                type="text"
                className={inputCls}
                value={biz.business_name}
                onChange={(e) =>
                  setBiz({ ...biz, business_name: e.target.value })
                }
                placeholder="Your business name"
              />
            </div>
            <div>
              <FieldLabel>Business Type</FieldLabel>
              <select
                className={inputCls}
                value={biz.business_type}
                onChange={(e) =>
                  setBiz({ ...biz, business_type: e.target.value })
                }
              >
                {BUSINESS_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <SaveButton saved={bizSaved} onClick={handleBizSave} />
        </SectionCard>

        {/* ── Core Business Information ── */}
        <SectionCard
          title="Core Business Information"
          description="Static details the AI references instantly — shared with your Knowledge Base and collected during onboarding."
        >
          {coreError && (
            <div className="flex items-start gap-2 rounded-xl bg-error-container px-4 py-3 text-sm text-error">
              <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
              <span className="min-w-0">{coreError}</span>
            </div>
          )}
          <div className="flex flex-col gap-4">
            <div>
              <FieldLabel>Operating Hours</FieldLabel>
              <textarea
                rows={2}
                disabled={coreLoading}
                className={`${inputCls} resize-none disabled:opacity-50`}
                value={coreBiz.operating_hours}
                onChange={(e) => setCoreBiz({ ...coreBiz, operating_hours: e.target.value })}
                placeholder="e.g. Mon–Fri: 9 AM – 6 PM"
              />
            </div>
            <div>
              <FieldLabel>Business Location</FieldLabel>
              <input
                type="text"
                disabled={coreLoading}
                className={`${inputCls} disabled:opacity-50`}
                value={coreBiz.location}
                onChange={(e) => setCoreBiz({ ...coreBiz, location: e.target.value })}
                placeholder="e.g. 123 Main Street, Lahore"
              />
            </div>
            <div>
              <FieldLabel>Delivery Options &amp; Rates</FieldLabel>
              <textarea
                rows={2}
                disabled={coreLoading}
                className={`${inputCls} resize-none disabled:opacity-50`}
                value={coreBiz.delivery_options}
                onChange={(e) => setCoreBiz({ ...coreBiz, delivery_options: e.target.value })}
                placeholder="e.g. Free delivery on orders over $50"
              />
            </div>
          </div>
          <SaveButton saved={coreSaved} saving={savingCore} disabled={coreLoading} onClick={handleCoreSave} />
        </SectionCard>

        {/* ── AI Configuration ── */}
        <SectionCard
          title="AI Configuration"
          description="Control how the AI behaves when replying on your behalf."
        >
          <div className="flex flex-col gap-5">
            {/* Bot Persona */}
            <div>
              <FieldLabel>Bot Persona</FieldLabel>
              <div className="flex flex-col gap-2">
                {PERSONAS.map((p) => (
                  <label
                    key={p.value}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      ai.bot_persona === p.value
                        ? "border-primary bg-primary/5"
                        : "border-outline-variant/40 hover:bg-surface-container-low"
                    }`}
                  >
                    <input
                      type="radio"
                      name="bot_persona"
                      value={p.value}
                      checked={ai.bot_persona === p.value}
                      onChange={() => setAi({ ...ai, bot_persona: p.value })}
                      className="accent-primary"
                    />
                    <div>
                      <p
                        className={`text-sm font-medium ${ai.bot_persona === p.value ? "text-primary" : "text-on-surface"}`}
                      >
                        {p.label}
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        {p.desc}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <SaveButton saved={aiSaved} onClick={triggerAiSave} />
        </SectionCard>

        {/* ── Confidence & Autonomy ── */}
        <SectionCard
          title={
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">
                tune
              </span>
              Confidence &amp; Autonomy
            </span>
          }
          description="Control how often the AI drafts answers and when it can send them automatically."
        >
          <div className="flex flex-col gap-6">
            {/* Master toggle — on by default; switching it off also turns
                auto-reply off */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-on-surface mb-0.5">
                  Enable AI Drafting
                </p>
                <p className="text-xs text-on-surface-variant">
                  Let the AI read your knowledge documents and draft answers.
                  Turning this off also disables Auto-Reply.
                </p>
              </div>
              <Toggle checked={conf.enabled} onChange={handleConfidenceToggle} />
            </div>

            {/* Draft frequency — only relevant while drafting is enabled */}
            {conf.enabled && (
              <div className="flex flex-col gap-3 pl-4 border-l-2 border-primary-fixed-dim">
                <div>
                  <p className="text-sm font-medium text-on-surface mb-0.5">
                    How often should the AI draft an answer?
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    Choose how active the AI should be when reading your uploaded
                    knowledge documents.
                  </p>
                </div>
                <SegmentedGroup
                  options={DRAFT_FREQUENCY_OPTIONS}
                  value={conf.draft_frequency}
                  onChange={(v) => setConf({ ...conf, draft_frequency: v })}
                />
              </div>
            )}

            <div className="h-px bg-outline-variant/40 w-full" />

            {/* Auto-reply toggle */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-on-surface mb-0.5">
                  Auto-Reply
                </p>
                <p className="text-xs text-on-surface-variant">
                  Allow the AI to automatically send responses without manual
                  review when confidence is high.
                </p>
              </div>
              <Toggle
                checked={conf.auto_reply_enabled}
                onChange={handleAutoReplyToggle}
              />
            </div>

            {autoReplyError && (
              <div className="flex items-start gap-2 rounded-xl bg-error-container/60 px-4 py-3 text-xs text-error animate-rm-slidein">
                <span className="material-symbols-outlined text-[16px] shrink-0">error</span>
                {autoReplyError}
              </div>
            )}

            {/* Auto-send threshold — shown only when auto-reply is on */}
            {conf.auto_reply_enabled && (
              <div className="flex flex-col gap-3 pl-4 border-l-2 border-primary-fixed-dim">
                <div>
                  <p className="text-sm font-medium text-on-surface mb-0.5">
                    When should the AI automatically send without your review?
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    Control the strictness of automatic messaging when
                    confidence is high.
                  </p>
                </div>
                <SegmentedGroup
                  options={AUTO_SEND_OPTIONS}
                  value={conf.auto_send_threshold}
                  onChange={(v) => setConf({ ...conf, auto_send_threshold: v })}
                />
              </div>
            )}
          </div>
          <SaveButton saved={confSaved} onClick={triggerConfSave} />
        </SectionCard>

        {/* ── Channel Connections ── */}
        <SectionCard
          title="Channel Connections"
          description="Manage the platforms where your customers message you."
        >
          <div className="flex flex-col gap-3">
            {/* WhatsApp */}
            <div
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                channels.whatsapp.connected
                  ? "border-primary/30 bg-primary/5"
                  : "border-outline-variant/40 bg-surface-container-low"
              }`}
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  channels.whatsapp.connected
                    ? "bg-primary/10"
                    : "bg-surface-container-high"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[22px] ${
                    channels.whatsapp.connected
                      ? "text-primary"
                      : "text-on-surface-variant"
                  }`}
                >
                  chat
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-on-surface">WhatsApp</p>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  {channels.whatsapp.connected
                    ? channels.whatsapp.display
                    : "Not connected"}
                </p>
                {channels.whatsapp.connected && (
                  <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    <span
                      className="material-symbols-outlined text-[10px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      circle
                    </span>
                    Connected
                  </span>
                )}
              </div>

              {/* Action */}
              {channels.whatsapp.connected ? (
                <button
                  onClick={() =>
                    setChannels({
                      ...channels,
                      whatsapp: {
                        ...channels.whatsapp,
                        connected: false,
                        display: "",
                      },
                    })
                  }
                  className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg border border-outline-variant/50 text-on-surface-variant hover:bg-surface-container hover:text-error transition-all"
                >
                  Disconnect
                </button>
              ) : (
                <button
                  onClick={() =>
                    setChannels({
                      ...channels,
                      whatsapp: {
                        ...channels.whatsapp,
                        connected: true,
                        display: "+92 300 0000000",
                      },
                    })
                  }
                  className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg border border-primary text-primary hover:bg-primary/5 transition-all"
                >
                  Connect
                </button>
              )}
            </div>

            {/* WhatsApp credentials — shown only when connected */}
            {channels.whatsapp.connected && (
              <div className="ml-14 flex flex-col gap-2 pl-4 border-l-2 border-primary-fixed-dim">
                <div>
                  <FieldLabel>Phone Number ID</FieldLabel>
                  <input
                    type="text"
                    className={inputCls}
                    value={channels.whatsapp.phone_number_id}
                    onChange={(e) =>
                      setChannels({
                        ...channels,
                        whatsapp: {
                          ...channels.whatsapp,
                          phone_number_id: e.target.value,
                        },
                      })
                    }
                    placeholder="Meta phone number ID"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                channels.email.connected
                  ? "border-primary/30 bg-primary/5"
                  : "border-outline-variant/40 bg-surface-container-low"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  channels.email.connected
                    ? "bg-primary/10"
                    : "bg-surface-container-high"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[22px] ${
                    channels.email.connected
                      ? "text-primary"
                      : "text-on-surface-variant"
                  }`}
                >
                  mail
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-on-surface">Email</p>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  {channels.email.connected
                    ? channels.email.display
                    : "Not connected"}
                </p>
                {channels.email.connected && (
                  <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    <span
                      className="material-symbols-outlined text-[10px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      circle
                    </span>
                    Connected
                  </span>
                )}
              </div>

              {channels.email.connected ? (
                <button
                  onClick={() =>
                    setChannels({
                      ...channels,
                      email: {
                        ...channels.email,
                        connected: false,
                        display: "",
                      },
                    })
                  }
                  className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg border border-outline-variant/50 text-on-surface-variant hover:bg-surface-container hover:text-error transition-all"
                >
                  Disconnect
                </button>
              ) : (
                <button
                  onClick={() =>
                    setChannels({
                      ...channels,
                      email: {
                        ...channels.email,
                        connected: true,
                        display: "support@yourdomain.com",
                      },
                    })
                  }
                  className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg border border-primary text-primary hover:bg-primary/5 transition-all"
                >
                  Connect
                </button>
              )}
            </div>

            {/* Email domain field — shown only when connected */}
            {channels.email.connected && (
              <div className="ml-14 flex flex-col gap-2 pl-4 border-l-2 border-primary-fixed-dim">
                <div>
                  <FieldLabel>Inbound Domain</FieldLabel>
                  <input
                    type="text"
                    className={inputCls}
                    value={channels.email.inbound_domain}
                    onChange={(e) =>
                      setChannels({
                        ...channels,
                        email: {
                          ...channels.email,
                          inbound_domain: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g. support@yourdomain.com"
                  />
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant shrink-0">
                    info
                  </span>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Add the MX record shown in your DNS provider pointing to{" "}
                    <span className="font-medium text-on-surface">
                      mx.sendgrid.net
                    </span>
                    , then click Verify DNS below.
                  </p>
                </div>
                <button className="self-start text-xs font-medium px-3 py-1.5 rounded-lg border border-outline-variant/50 text-on-surface-variant hover:bg-surface-container transition-all">
                  Verify DNS
                </button>
              </div>
            )}

            {/* Website Widget */}
            <div
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                channels.livechat.connected
                  ? "border-primary/30 bg-primary/5"
                  : "border-outline-variant/40 bg-surface-container-low"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  channels.livechat.connected
                    ? "bg-primary/10"
                    : "bg-surface-container-high"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[22px] ${
                    channels.livechat.connected
                      ? "text-primary"
                      : "text-on-surface-variant"
                  }`}
                >
                  support_agent
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-on-surface">
                  Website Widget
                </p>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  {channels.livechat.connected
                    ? channels.livechat.display
                    : "Not connected"}
                </p>
                {channels.livechat.connected && (
                  <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    <span
                      className="material-symbols-outlined text-[10px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      circle
                    </span>
                    Connected
                  </span>
                )}
              </div>

              {channels.livechat.connected ? (
                <button
                  onClick={() =>
                    setChannels({
                      ...channels,
                      livechat: {
                        ...channels.livechat,
                        connected: false,
                        display: "",
                      },
                    })
                  }
                  className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg border border-outline-variant/50 text-on-surface-variant hover:bg-surface-container hover:text-error transition-all"
                >
                  Disconnect
                </button>
              ) : (
                <button
                  onClick={() =>
                    setChannels({
                      ...channels,
                      livechat: {
                        ...channels.livechat,
                        connected: true,
                        display: "Embed code ready",
                      },
                    })
                  }
                  className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg border border-primary text-primary hover:bg-primary/5 transition-all"
                >
                  Connect
                </button>
              )}
            </div>

            {/* Widget embed code — shown only when connected */}
            {channels.livechat.connected && (
              <div className="ml-14 flex flex-col gap-2 pl-4 border-l-2 border-primary-fixed-dim">
                <FieldLabel>Embed Code</FieldLabel>
                <div className="relative">
                  <pre className="text-[11px] text-on-surface-variant bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-3 overflow-x-auto leading-relaxed">
                    {`<script src="https://replymind.com/widget.js"\n  data-bot-id="${channels.livechat.widget_bot_id}"\n  defer>\n</script>`}
                  </pre>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `<script src="https://replymind.com/widget.js" data-bot-id="${channels.livechat.widget_bot_id}" defer></script>`,
                      )
                    }
                    className="absolute top-2 right-2 p-1.5 rounded-lg hover:bg-surface-container-high transition-all"
                    title="Copy to clipboard"
                  >
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                      content_copy
                    </span>
                  </button>
                </div>
                <p className="text-xs text-on-surface-variant">
                  Paste this before the{" "}
                  <span className="font-mono text-on-surface">
                    &lt;/body&gt;
                  </span>{" "}
                  tag on your website.
                </p>
              </div>
            )}
          </div>

          <SaveButton saved={channelSaved} onClick={triggerChannelSave} />
        </SectionCard>
        {/* ── Account Status (read-only) ── */}
        <SectionCard
          title="Account Status"
          description="Read-only overview of your account setup."
        >
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Onboarding", done: ACCOUNT_STATUS.onboarding_completed },
              { label: "Profile", done: ACCOUNT_STATUS.profile_completed },
              { label: "Documents", done: ACCOUNT_STATUS.documents_uploaded },
            ].map(({ label, done }) => (
              <div
                key={label}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border ${
                  done
                    ? "border-primary/20 bg-primary/5"
                    : "border-outline-variant/30 bg-surface-container-low"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[22px] ${done ? "text-primary" : "text-on-surface-variant/40"}`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {done ? "check_circle" : "radio_button_unchecked"}
                </span>
                <p
                  className={`text-xs font-medium ${done ? "text-primary" : "text-on-surface-variant/50"}`}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>

        <div className="pb-xl" />
      </div>
    </div>
  );
}
