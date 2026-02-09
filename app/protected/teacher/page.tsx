"use client";

import Link from "next/link";

const stats = [
  {
    label: "Total Students",
    value: "32",
    helper: "Across 3 classes",
    accent: "from-purple-100 to-purple-50",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M16 11a4 4 0 1 0-8 0" />
        <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" />
        <circle cx="12" cy="7" r="3" />
      </svg>
    ),
  },
  {
    label: "Class Average",
    value: "72%",
    helper: "Up 4% this week",
    accent: "from-indigo-100 to-indigo-50",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M4 19V5" />
        <path d="M9 19V10" />
        <path d="M14 19V7" />
        <path d="M19 19V3" />
      </svg>
    ),
  },
  {
    label: "Pending Reviews",
    value: "5",
    helper: "Flagged for grading",
    accent: "from-pink-100 to-pink-50",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-pink-600" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M5 4h10l4 4v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        <path d="M9 12h6" />
        <path d="M9 16h4" />
      </svg>
    ),
  },
  {
    label: "Recent Uploads",
    value: "12",
    helper: "Last 30 days",
    accent: "from-purple-100/60 to-white",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 16V4" />
        <path d="M8 8l4-4 4 4" />
        <path d="M4 20h16" />
      </svg>
    ),
  },
];

const students = [
  {
    name: "Alex Johnson",
    grade: "Grade 11",
    subjects: ["Mathematics", "Physics"],
    average: "87%",
    status: "Excellent",
    lastActive: "2 hours ago",
  },
  {
    name: "Emma Davis",
    grade: "Grade 11",
    subjects: ["Mathematics"],
    average: "72%",
    status: "Active",
    lastActive: "1 day ago",
  },
  {
    name: "Michael Chen",
    grade: "Grade 11",
    subjects: ["Physics", "Chemistry"],
    average: "58%",
    status: "At Risk",
    lastActive: "3 days ago",
  },
];

const statusStyles: Record<string, string> = {
  Excellent: "bg-emerald-100 text-emerald-700",
  Active: "bg-purple-100 text-purple-700",
  "At Risk": "bg-rose-100 text-rose-700",
};

export default function TeacherPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h2 className="text-3xl font-semibold text-slate-900">Teacher Dashboard</h2>
        <p className="text-slate-600">Manage your students and track their progress.</p>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-2xl border border-slate-200 bg-gradient-to-br ${stat.accent} p-5 shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-600">{stat.label}</span>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow">
                {stat.icon}
              </span>
            </div>
            <div className="mt-4 text-3xl font-semibold text-slate-900">{stat.value}</div>
            <p className="mt-1 text-xs text-slate-500">{stat.helper}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">My Students</h3>
            <button className="text-sm font-semibold text-purple-700 hover:text-purple-600">
              View all
            </button>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="pb-3">Student</th>
                  <th className="pb-3">Grade</th>
                  <th className="pb-3">Subjects</th>
                  <th className="pb-3">Average Score</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Last Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((student) => (
                  <tr key={student.name} className="text-slate-700">
                    <td className="py-4 font-semibold text-slate-900">{student.name}</td>
                    <td className="py-4">{student.grade}</td>
                    <td className="py-4">
                      <div className="flex flex-wrap gap-2">
                        {student.subjects.map((subject) => (
                          <span
                            key={subject}
                            className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 font-semibold text-slate-900">{student.average}</td>
                    <td className="py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          statusStyles[student.status]
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="py-4 text-slate-500">{student.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Today at a Glance</h3>
            <div className="mt-4 space-y-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-700">1 new upload</p>
                <p className="text-xs text-slate-500">Physics mock exam added</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-700">3 submissions</p>
                <p className="text-xs text-slate-500">Waiting for review</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-700">Next class</p>
                <p className="text-xs text-slate-500">Grade 11 Algebra, 2:00 PM</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-purple-50 to-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
            <div className="mt-4 space-y-3">
              <Link
                href="/protected/teacher/upload"
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-purple-200 hover:text-purple-700"
              >
                Create new upload
                <span aria-hidden="true">&gt;</span>
              </Link>
              <Link
                href="/protected/teacher/flagged"
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-purple-200 hover:text-purple-700"
              >
                Review flagged answers
                <span aria-hidden="true">&gt;</span>
              </Link>
              <Link
                href="/protected/teacher/analysis"
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-purple-200 hover:text-purple-700"
              >
                Open analytics
                <span aria-hidden="true">&gt;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
