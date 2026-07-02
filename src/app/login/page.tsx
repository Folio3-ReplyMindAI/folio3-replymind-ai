import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthField } from "@/components/auth/AuthField";

export const metadata: Metadata = {
  title: "Sign in — ReplyMind",
};

// Static UI only — this project has no backend (see ARCHITECTURE.md#scope),
// so the submit button is intentionally non-functional (type="button").
export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-6 py-16">
      <AuthCard
        side="right"
        eyebrow="Welcome back"
        heading="Welcome back!"
        subtext="Pick up right where you left off — your inbox is waiting."
        illustrationSrc="/illustrations/high-five.png"
        illustrationAlt="Two people high-fiving"
      >
        <h2 className="m-0 text-center font-display text-xl font-semibold text-text-primary">Sign In</h2>

        <form className="mt-7 flex flex-col gap-4">
          <AuthField id="email" label="Email address" type="email" placeholder="you@business.com" autoComplete="email" />
          <AuthField id="password" label="Password" type="password" placeholder="••••••••" autoComplete="current-password" />

          <div className="-mt-1 text-right">
            <Link href="/login" className="text-xs font-medium text-text-muted no-underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="button"
            className="mt-1 rounded-xl bg-gradient-brand p-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(30,34,148,.28)] transition-transform hover:-translate-y-px"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-secondary">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-primary no-underline">
            Sign up
          </Link>
        </p>
      </AuthCard>
    </main>
  );
}
