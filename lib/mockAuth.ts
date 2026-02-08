"use client";

type Role = "student" | "teacher" | "parent" | "admin";

type User = {
  email: string;
  role: Role;
  grade?: string;
};

const CREDENTIALS: Record<string, { password: string; role: Role }> = {
  "student@evalora.com": { password: "password", role: "student" },
  "teacher@evalora.com": { password: "password", role: "teacher" },
  "parent@evalora.com": { password: "password", role: "parent" },
  "admin@evalora.com": { password: "password", role: "admin" },
};

const STORAGE_KEY = "evalora_user";

export async function login(email: string, password: string): Promise<User> {
  const key = email.trim().toLowerCase();
  const cred = CREDENTIALS[key];
  if (!cred || cred.password !== password) {
    return Promise.reject(new Error("Invalid email or password"));
  }
  const user: User = { email: key, role: cred.role };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch (e) {}
  return Promise.resolve(user);
}

export async function signup(
  email: string,
  password: string,
  role: Role,
  grade?: string
): Promise<User> {
  // For now we accept any signup but do not persist to server.
  const user: User = { email: email.trim().toLowerCase(), role, grade };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch (e) {}
  return Promise.resolve(user);
}

export function getCurrentUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch (e) {
    return null;
  }
}

export function logout() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
}

export type { User, Role };
