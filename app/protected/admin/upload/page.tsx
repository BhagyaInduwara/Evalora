"use client";

import Link from "next/link";

const uploadOptions = [
  {
    title: "Upload Notes",
    description: "Share study materials and notes with all students.",
    href: "/protected/admin/upload/notes",
    accent: "from-purple-100 via-white to-purple-50",
  },
  {
    title: "Upload Papers",
    description: "Create and upload past papers and model papers.",
    href: "/protected/admin/upload/papers",
    accent: "from-indigo-100 via-white to-indigo-50",
  },
  {
    title: "Upload Quizzes",
    description: "Create quizzes to test student knowledge.",
    href: "/protected/admin/upload/quizzes",
    accent: "from-pink-100 via-white to-pink-50",
  },
];

export default function AdminUploadPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold text-slate-900">Upload Content</h2>
        <p className="mt-2 text-slate-600">Upload notes, papers, and quizzes for all students.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {uploadOptions.map((option) => (
          <Link
            key={option.title}
            href={option.href}
            className={`group rounded-2xl border border-slate-200 bg-gradient-to-br ${option.accent} p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">{option.title}</h3>
              <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-slate-600 group-hover:text-slate-900">
                Start
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-600">{option.description}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 p-6 text-sm text-slate-700">
        <p className="font-semibold text-purple-700">Admin Upload Privileges</p>
        <ul className="mt-3 space-y-2">
          <li>Public content is visible to all students across classes.</li>
          <li>System-wide resources are highlighted on student dashboards.</li>
          <li>Teacher-only content remains scoped to assigned cohorts.</li>
        </ul>
      </div>
    </div>
  );
}
