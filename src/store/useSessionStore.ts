import { create } from "zustand";

/**
 * Session store — the app-wide source of truth for "who is signed in".
 *
 * Before this store, the auth cookie was written/cleared by hand in three
 * different components. Now every screen reads `isAuthenticated` / `email`
 * from one place, and `login()` / `logout()` are the only functions that
 * touch the cookie.
 *
 * Note: the `rm_auth` cookie is still what the server-side route guard
 * (proxy.ts) checks — this store keeps the client UI in sync with it.
 */

const AUTH_COOKIE = "rm_auth";

function writeCookie() {
  // 7-day session cookie the proxy checks on every protected request.
  document.cookie = `${AUTH_COOKIE}=1; path=/; max-age=604800; samesite=lax`;
}

function clearCookie() {
  document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0`;
}

// Read the cookie once on load so a returning user (valid cookie) is treated
// as signed in without having to log in again.
function cookiePresent() {
  if (typeof document === "undefined") return false; // SSR guard
  return document.cookie.split("; ").some((c) => c.startsWith(`${AUTH_COOKIE}=1`));
}

interface SessionState {
  email: string | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  email: null,
  isAuthenticated: cookiePresent(),

  login: (email) => {
    writeCookie();
    set({ email, isAuthenticated: true });
  },

  logout: () => {
    clearCookie();
    set({ email: null, isAuthenticated: false });
  },
}));
