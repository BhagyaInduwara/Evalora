"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout, getCurrentUser } from "@/lib/mockAuth";

export default function StudentPage() {
  const router = useRouter();
  const user = typeof window !== "undefined" ? getCurrentUser() : null;

  return (
    <div className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome, {user?.email}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/protected/student/settings" className="px-3 py-2 border rounded hover:bg-gray-100">
            Settings
          </Link>
          <button
            onClick={() => {
              logout();
              router.push("/auth/login");
            }}
            className="px-3 py-2 border rounded hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/protected/student/notes" className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1">
          <h2 className="font-semibold text-lg">📚 Notes</h2>
          <p className="text-sm text-gray-600 dark:text-slate-300">Study materials and topics</p>
        </Link>
        <Link href="/protected/student/quizzes" className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1">
          <h2 className="font-semibold text-lg">✏️ Quizzes</h2>
          <p className="text-sm text-gray-600 dark:text-slate-300">Test your knowledge</p>
        </Link>
        <Link href="/protected/student/papers" className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1">
          <h2 className="font-semibold text-lg">📰 Papers</h2>
          <p className="text-sm text-gray-600 dark:text-slate-300">Exam papers by term</p>
        </Link>
        <Link href="/protected/student/progress" className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1">
          <h2 className="font-semibold text-lg">📊 Progress</h2>
          <p className="text-sm text-gray-600 dark:text-slate-300">Your learning progress</p>
        </Link>
        <Link href="/protected/student/leaderboard" className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1">
          <h2 className="font-semibold text-lg">🏆 Leaderboard</h2>
          <p className="text-sm text-gray-600 dark:text-slate-300">Top performers</p>
        </Link>
      </div>
    </div>
  );
}
