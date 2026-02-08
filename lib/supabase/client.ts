import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (url && key) {
    return createBrowserClient(url, key);
  }

  // If Supabase is not configured (local/dev), return a lightweight
  // fallback that matches the shape used by the app. This prevents
  // createClient from throwing at runtime and allows the code to
  // fall back to the local mock auth implementation.
  return {
    auth: {
      signInWithPassword: async (creds: { email?: string; password?: string }) => {
        return { error: new Error("Supabase not configured") };
      },
    },
  } as any;
}
