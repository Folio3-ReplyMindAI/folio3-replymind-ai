"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Field from "@/src/components/common/Field";

const variants = {
  enter: (dir) => ({ x: dir * 100, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir * -100, opacity: 0 }),
};

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const MOCK_EMAIL = "demo@replymind.com";
  const MOCK_PASSWORD = "demo123";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
        window.location.href = "/inbox";
        return;
      }
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      window.location.href = data.redirect || "/inbox";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
      <Field
        label="Email Address"
        type="email"
        placeholder="owner@business.com"
        value={email}
        onChange={setEmail}
      />
      <Field
        label="Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={setPassword}
        rightLabel={
          <a
            className="text-sm text-primary font-medium hover:underline"
            href="#"
          >
            Forgot?
          </a>
        }
      />
      <button
        disabled={loading}
        className="w-full h-[48px] bg-primary text-on-primary rounded-xl font-semibold shadow-lg shadow-primary/15 hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Signing in…" : "Sign In"}
      </button>
      <p className="text-xs text-center text-on-surface-variant/60 pt-1">
        Demo: <span className="font-medium text-on-surface-variant">demo@replymind.com</span> / <span className="font-medium text-on-surface-variant">demo123</span>
      </p>
    </form>
  );
}

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Full name is required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      window.location.href = data.redirect || "/dashboard";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
      <Field
        label="Full Name"
        type="text"
        placeholder="Jane Doe"
        value={name}
        onChange={setName}
      />
      <Field
        label="Work Email"
        type="email"
        placeholder="jane@company.com"
        value={email}
        onChange={setEmail}
      />
      <Field
        label="Password"
        type="password"
        placeholder="Create complex password"
        value={password}
        onChange={setPassword}
      />
      <button
        disabled={loading}
        className="w-full h-[48px] bg-primary text-on-primary rounded-xl font-semibold shadow-lg shadow-primary/15 hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Creating account…" : "Create Account"}
      </button>
    </form>
  );
}

export default function AuthForm({ initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode);
  const [prevMode, setPrevMode] = useState(initialMode);

  const switchMode = (next) => {
    setPrevMode(mode);
    setMode(next);
  };

  const direction = mode === "signup" ? -1 : 1;
  const prevDirection = prevMode === "signup" ? -1 : 1;

  return (
    <div>
      {/* Pill Toggle */}
      <div className="bg-surface-container-high p-1 rounded-full flex mb-6 w-full max-w-[340px] mx-auto border border-outline-variant/20 shadow-inner">
        {["login", "signup"].map((t) => (
          <button
            key={t}
            onClick={() => switchMode(t)}
            className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              mode === t
                ? "bg-primary text-on-primary shadow-md"
                : "text-on-surface-variant hover:bg-white/50"
            }`}
          >
            {t === "login" ? "Login" : "Sign Up"}
          </button>
        ))}
      </div>

      {/* Animated Form Content */}
      <div className="relative w-full max-w-[380px] min-h-[340px] mx-auto overflow-hidden">
        <AnimatePresence mode="popLayout" custom={direction}>
          {mode === "login" ? (
            <motion.div
              key="login"
              custom={prevDirection}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <LoginForm />
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              custom={prevDirection}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <SignupForm />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
