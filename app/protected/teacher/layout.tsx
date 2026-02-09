"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { logout, getCurrentUser } from "@/lib/mockAuth";
import { Space_Grotesk, Source_Sans_3 } from "next/font/google";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const navItems = [
  { label: "Dashboard", href: "/protected/teacher" },
  { label: "Upload", href: "/protected/teacher/upload" },
  { label: "Review Flagged", href: "/protected/teacher/flagged" },
  { label: "Analytics", href: "/protected/teacher/analysis" },
  { label: "Settings", href: "/protected/teacher/settings" },
];

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [userName, setUserName] = useState("Teacher");

  useEffect(() => {
    const user = getCurrentUser();
    const nameFromEmail = user?.email?.split("@")[0];
    setUserName(nameFromEmail ? nameFromEmail : "Teacher");
  }, []);

  const activeHref = useMemo(() => {
    if (!pathname) return "/protected/teacher";
    if (pathname.startsWith("/protected/teacher/upload")) return "/protected/teacher/upload";
    if (pathname.startsWith("/protected/teacher/flagged")) return "/protected/teacher/flagged";
    if (pathname.startsWith("/protected/teacher/analysis")) return "/protected/teacher/analysis";
    if (pathname.startsWith("/protected/teacher/settings")) return "/protected/teacher/settings";
    return "/protected/teacher";
  }, [pathname]);

  return (
    <div className={`${bodyFont.className} min-h-screen bg-slate-50 text-slate-900`}>
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-900 text-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-purple-300 blur-3xl" />
          <div className="absolute -bottom-28 left-[-5%] h-72 w-72 rounded-full bg-pink-300 blur-3xl" />
        </div>
        <div className="relative w-full px-4 sm:px-6 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-purple-200">Evalora</p>
              <h1
                className="text-3xl sm:text-4xl font-semibold"
                style={{ fontFamily: displayFont.style.fontFamily }}
              >
                Teacher Workspace
              </h1>
              <p className="text-sm text-purple-200 mt-1">
                Welcome, {userName}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/protected/teacher/settings")}
                className="px-4 py-2 rounded-full border border-white/30 text-sm font-semibold text-white/90 hover:text-white hover:border-white/60 transition"
              >
                Settings
              </button>
              <button
                onClick={() => {
                  logout();
                  router.push("/auth/login");
                }}
                className="px-4 py-2 rounded-full bg-white text-purple-900 text-sm font-semibold shadow-sm hover:bg-purple-50 transition"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-6 text-sm font-semibold">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`pb-2 border-b-2 transition ${
                  activeHref === item.href
                    ? "border-white text-white"
                    : "border-transparent text-purple-200 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full px-4 sm:px-6 py-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-16 top-12 h-40 w-40 rounded-full bg-purple-200/30 blur-3xl" />
          <div className="absolute left-10 bottom-10 h-44 w-44 rounded-full bg-pink-200/30 blur-3xl" />
        </div>
        <div className="relative">
          {children}
        </div>
      </div>
    </div>
  );
}
