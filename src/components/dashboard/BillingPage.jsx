"use client";
import { useState } from "react";

const MOCK_PLAN = {
  name: "Growth Plan",
  status: "Active",
  price: 49,
  renewsOn: "August 1, 2026",
  messagesUsed: 3240,
  messagesTotal: 5000,
};

const MOCK_CARD = {
  brand: "Visa",
  last4: "4242",
  expires: "12/27",
};

function FieldLabel({ children }) {
  return (
    <p className="text-[11px] font-medium text-on-surface-variant uppercase tracking-[0.06em] mb-1.5">
      {children}
    </p>
  );
}

export default function BillingPage() {
  const [cancelConfirm, setCancelConfirm] = useState(false);

  const usagePct = Math.round(
    (MOCK_PLAN.messagesUsed / MOCK_PLAN.messagesTotal) * 100
  );

  const usageColor =
    usagePct >= 90
      ? "bg-error"
      : usagePct >= 70
      ? "bg-secondary"
      : "bg-primary";

  return (
    <div className="overflow-y-auto flex-1 px-gutter md:px-xl pb-gutter md:pb-xl pt-lg custom-scrollbar">
      <div className="max-w-3xl mx-auto flex flex-col gap-lg">
        {/* Page heading */}
        <section className="shrink-0">
          <h2 className="text-2xl font-medium text-on-surface">
            Billing &amp; Plan
          </h2>
          <p className="text-sm text-on-surface-variant mt-1">
            Manage your subscription, usage, and payment details.
          </p>
        </section>

        {/* ── Current Plan Card ── */}
        <div className="glass-card p-6 flex flex-col gap-6 !rounded-2xl hover:!translate-y-0 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <h3 className="text-base font-medium text-on-surface">
                  {MOCK_PLAN.name}
                </h3>
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container">
                  {MOCK_PLAN.status}
                </span>
              </div>
              <p className="text-sm text-on-surface-variant">
                Renews on {MOCK_PLAN.renewsOn}
              </p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[28px] font-semibold text-on-surface tracking-tight leading-tight">
                ${MOCK_PLAN.price}
              </span>
              <span className="text-sm text-on-surface-variant">/mo</span>
            </div>
          </div>

          {/* Usage bar */}
          <div className="relative z-10">
            <FieldLabel>Message Usage</FieldLabel>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-on-surface">
                {MOCK_PLAN.messagesUsed.toLocaleString()} /{" "}
                {MOCK_PLAN.messagesTotal.toLocaleString()} messages
              </span>
              <span className="text-xs text-on-surface-variant">
                {usagePct}% used
              </span>
            </div>
            <div className="w-full h-2.5 bg-surface-container-high rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${usageColor}`}
                style={{ width: `${usagePct}%` }}
              />
            </div>
          </div>

          <div className="relative z-10">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-full text-sm font-medium hover:bg-primary/90 active:scale-95 transition-all shadow-sm shadow-primary/20">
              <span className="material-symbols-outlined text-[18px]">
                upgrade
              </span>
              Upgrade Plan
            </button>
          </div>
        </div>

        {/* ── Plan Tiers ── */}
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-medium text-on-surface">
            Available Plans
          </h3>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              {
                name: "Free",
                price: 0,
                messages: "500 msg/mo",
                features: ["1 channel", "Basic AI drafts", "Community support"],
                current: false,
              },
              {
                name: "Growth",
                price: 49,
                messages: "5,000 msg/mo",
                features: [
                  "3 channels",
                  "AI drafts + auto-send",
                  "Priority support",
                ],
                current: true,
              },
              {
                name: "Enterprise",
                price: 149,
                messages: "Unlimited",
                features: [
                  "Unlimited channels",
                  "Custom AI persona",
                  "Dedicated support",
                ],
                current: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-5 flex flex-col gap-3 transition-all ${
                  plan.current
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container-low"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-sm font-medium text-on-surface">
                      {plan.name}
                    </p>
                    {plan.current && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-on-surface-variant">
                    {plan.messages}
                  </p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-medium text-on-surface">
                    {plan.price === 0 ? "Free" : `$${plan.price}`}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-xs text-on-surface-variant">/mo</span>
                  )}
                </div>
                <ul className="flex flex-col gap-1.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span
                        className="material-symbols-outlined text-[14px] text-primary shrink-0"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      <span className="text-xs text-on-surface-variant">{f}</span>
                    </li>
                  ))}
                </ul>
                {!plan.current && (
                  <button
                    className={`mt-auto text-sm font-medium py-2 rounded-xl border transition-all ${
                      plan.price > MOCK_PLAN.price
                        ? "bg-primary text-on-primary border-transparent hover:bg-primary/90 shadow-sm shadow-primary/20"
                        : "border-outline-variant text-on-surface-variant hover:bg-surface-container"
                    }`}
                  >
                    {plan.price > MOCK_PLAN.price ? "Upgrade" : "Downgrade"}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Payment Method ── */}
        <div className="glass-card p-6 flex flex-col gap-5 !rounded-2xl hover:!translate-y-0">
          <h3 className="text-base font-medium text-on-surface">
            Payment Method
          </h3>
          <div className="flex items-center justify-between rounded-xl border border-outline-variant/50 bg-surface-container-low px-4 py-3.5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-surface-container-lowest border border-outline-variant/40 rounded-lg flex items-center justify-center shrink-0">
                <span
                  className="material-symbols-outlined text-on-surface-variant text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  credit_card
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-on-surface">
                  {MOCK_CARD.brand} ending in {MOCK_CARD.last4}
                </p>
                <p className="text-xs text-on-surface-variant">
                  Expires {MOCK_CARD.expires}
                </p>
              </div>
            </div>
            <button className="text-sm font-medium text-primary hover:underline underline-offset-2 transition-all">
              Update
            </button>
          </div>
        </div>

        {/* ── Billing History ── */}
        <div className="glass-card p-6 flex flex-col gap-4 !rounded-2xl hover:!translate-y-0">
          <h3 className="text-base font-medium text-on-surface">
            Billing History
          </h3>
          <div className="rounded-xl border border-outline-variant/40 overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 px-4 py-2.5 bg-surface-container-low border-b border-outline-variant/30 text-[11px] font-medium text-on-surface-variant uppercase tracking-[0.06em]">
              <div className="col-span-4">Date</div>
              <div className="col-span-4">Description</div>
              <div className="col-span-2">Amount</div>
              <div className="col-span-2 text-right">Receipt</div>
            </div>
            <div className="divide-y divide-outline-variant/20">
              {[
                { date: "Jul 1, 2026", desc: "Growth Plan — Monthly", amount: "$49.00" },
                { date: "Jun 1, 2026", desc: "Growth Plan — Monthly", amount: "$49.00" },
                { date: "May 1, 2026", desc: "Growth Plan — Monthly", amount: "$49.00" },
              ].map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-12 px-4 py-3.5 text-sm items-center hover:bg-surface-container-low transition-colors"
                >
                  <div className="col-span-4 text-on-surface-variant">{row.date}</div>
                  <div className="col-span-4 text-on-surface">{row.desc}</div>
                  <div className="col-span-2 text-on-surface font-medium">{row.amount}</div>
                  <div className="col-span-2 flex justify-end">
                    <button className="text-primary hover:underline underline-offset-2 text-sm">
                      PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Cancel Subscription ── */}
        <div className="border-t border-outline-variant/40 pt-lg flex flex-col gap-3">
          <h3 className="text-base font-medium text-error">
            Cancel Subscription
          </h3>
          <p className="text-sm text-on-surface-variant max-w-xl leading-relaxed">
            Canceling will downgrade your account to the Free tier at the end of
            your current billing cycle. You will lose access to all premium
            features.
          </p>
          {!cancelConfirm ? (
            <button
              onClick={() => setCancelConfirm(true)}
              className="self-start text-sm font-medium text-error border border-error/50 px-4 py-2 rounded-xl hover:bg-error-container/50 transition-all"
            >
              Cancel Subscription
            </button>
          ) : (
            <div className="flex items-center gap-3 self-start">
              <p className="text-sm text-on-surface-variant">Are you sure?</p>
              <button className="text-sm font-medium text-on-error bg-error px-4 py-2 rounded-xl hover:bg-error/90 transition-all">
                Yes, cancel
              </button>
              <button
                onClick={() => setCancelConfirm(false)}
                className="text-sm font-medium text-on-surface-variant px-4 py-2 rounded-xl hover:bg-surface-container transition-all"
              >
                Keep plan
              </button>
            </div>
          )}
        </div>

        <div className="pb-xl" />
      </div>
    </div>
  );
}
