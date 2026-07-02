import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthField } from "@/components/auth/AuthField";

export const metadata: Metadata = {
  title: "Sign up — ReplyMind",
};

// Static UI only — this project has no backend (see ARCHITECTURE.md#scope),
// so the submit button is intentionally non-functional (type="button").
export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-6 py-16">
      <AuthCard
        side="left"
        eyebrow="Get started"
        heading="We're so glad to have you on board!"
        subtext="Join businesses replying faster with ReplyMind — set up your inbox in under 10 minutes."
        illustrationSrc="/illustrations/team-celebrating.png"
        illustrationAlt="A team celebrating"
      >
        <h2 className="m-0 text-center font-display text-xl font-semibold text-text-primary">Sign Up</h2>

        <form className="mt-7 flex flex-col gap-4">
          <AuthField id="name" label="Name" type="text" placeholder="Your name" autoComplete="name" />
          <AuthField id="email" label="Email address" type="email" placeholder="you@business.com" autoComplete="email" />
          <AuthField id="password" label="Password" type="password" placeholder="••••••••" autoComplete="new-password" />
          <AuthField id="confirm" label="Confirm password" type="password" placeholder="••••••••" autoComplete="new-password" />

          <button
            type="button"
            className="mt-2 rounded-xl bg-gradient-brand p-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(30,34,148,.28)] transition-transform hover:-translate-y-px"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-secondary">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary no-underline">
            Sign in
          </Link>
        </p>
      </AuthCard>
    </main>
  );
}
