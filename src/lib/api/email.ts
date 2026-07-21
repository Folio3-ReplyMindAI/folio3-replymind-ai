import { createClient } from "@/src/lib/supabase/client";

export interface EmailConnectionPayload {
  email: string;
  app_password: string;
  imap_host: string;
  imap_port: number;
  smtp_host: string;
  smtp_port: number;
}

export interface EmailConnectionStatus {
  email: string | null;
  status: "connected" | "not_configured" | "failed";
}

export class AuthExpiredError extends Error {}

async function authHeader() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new AuthExpiredError("You must be logged in to manage your email connection.");
  return { Authorization: `Bearer ${session.access_token}` };
}

async function parseError(res: Response, fallback: string) {
  const body = await res.json().catch(() => null);
  return body?.detail?.[0]?.msg ?? body?.detail ?? fallback;
}

export async function fetchEmailConnectionStatus(): Promise<EmailConnectionStatus> {
  const headers = await authHeader();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/settings/email/status`, { headers });

  if (res.status === 401) throw new AuthExpiredError("Your session has expired. Please sign in again.");
  if (!res.ok) throw new Error(await parseError(res, "Failed to load email connection status."));

  return res.json();
}

export async function connectEmailAccount(payload: EmailConnectionPayload): Promise<EmailConnectionStatus> {
  const headers = await authHeader();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/settings/email/connect`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(payload),
  });

  if (res.status === 401) throw new AuthExpiredError("Your session has expired. Please sign in again.");
  if (!res.ok) throw new Error(await parseError(res, "Failed to connect email."));

  return res.json();
}

export async function disconnectEmailAccount(): Promise<void> {
  const headers = await authHeader();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/settings/email/disconnect`, {
    method: "DELETE",
    headers,
  });

  if (res.status === 401) throw new AuthExpiredError("Your session has expired. Please sign in again.");
  if (!res.ok) throw new Error(await parseError(res, "Failed to disconnect email."));
}
