"use client";

import Link from "next/link";

const quickCards = [
  {
    title: "Manage Users",
    description: "Add, edit, or remove users",
    href: "/protected/admin/users",
    accent: "from-purple-600 to-fuchsia-600",
  },
  {
    title: "Upload Content",
    description: "Upload public content for all students",
    href: "/protected/admin/upload",
    accent: "from-emerald-500 to-emerald-600",
  },
  {
    title: "Content Review",
    description: "Moderate uploaded content",
    href: "/protected/admin/content",
    accent: "from-blue-500 to-blue-600",
  },
  {
    title: "Reports",
    description: "View system analytics",
    href: "/protected/admin/reports",
    accent: "from-green-500 to-green-600",
  },
  {
    title: "Settings",
    description: "System configuration",
    href: "/protected/admin/settings",
    accent: "from-orange-500 to-orange-600",
  },
];

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-semibold text-slate-900">Admin Dashboard</h2>
        <p className="mt-2 text-slate-600">System overview and management.</p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {quickCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className={`rounded-2xl bg-gradient-to-r ${card.accent} p-5 text-white shadow-md transition hover:-translate-y-1 hover:shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="mt-1 text-xs text-white/80">{card.description}</p>
              </div>
              <span className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="h-4 w-4 rounded-full bg-white/70" />
              </span>
            </div>
          </Link>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500">User Statistics</h3>
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>Students</span>
              <span className="font-semibold text-purple-600">156</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Teachers</span>
              <span className="font-semibold text-purple-600">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Parents</span>
              <span className="font-semibold text-purple-600">89</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Admins</span>
              <span className="font-semibold text-purple-600">3</span>
            </div>
          </div>
          <div className="mt-4 border-t border-slate-100 pt-3 text-sm font-semibold text-slate-700">
            Total Active <span className="float-right text-slate-900">234</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500">Content Statistics</h3>
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>Notes</span>
              <span className="font-semibold text-purple-600">342</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Papers</span>
              <span className="font-semibold text-purple-600">128</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Quizzes</span>
              <span className="font-semibold text-purple-600">215</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Pending Reviews</span>
              <span className="font-semibold text-rose-500">5</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500">System Health</h3>
          <div className="mt-4 space-y-4 text-sm text-slate-600">
            <div>
              <div className="flex items-center justify-between">
                <span>Server Status</span>
                <span className="font-semibold text-emerald-600">Online</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
                <div className="h-2 w-4/5 rounded-full bg-emerald-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span>Database</span>
                <span className="font-semibold text-emerald-600">Healthy</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
                <div className="h-2 w-3/5 rounded-full bg-emerald-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span>Storage</span>
                <span className="font-semibold text-blue-600">45% Used</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
                <div className="h-2 w-2/5 rounded-full bg-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
