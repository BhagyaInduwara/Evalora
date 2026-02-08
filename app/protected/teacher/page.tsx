"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout, getCurrentUser } from "@/lib/mockAuth";

export default function TeacherPage() {
  const router = useRouter();
  const user = typeof window !== "undefined" ? getCurrentUser() : null;

  return (
    <div className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome, {user?.email}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/protected/teacher/settings" className="px-3 py-2 border rounded hover:bg-gray-100">
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

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/protected/teacher/upload" className="p-4 border rounded hover:shadow-md transition cursor-pointer">
          <h2 className="font-semibold text-lg">📤 Upload</h2>
          <p className="text-sm text-gray-600">Publish notes, quizzes, papers</p>
        </Link>
        <Link href="/protected/teacher/flagged" className="p-4 border rounded hover:shadow-md transition cursor-pointer">
          <h2 className="font-semibold text-lg">🚩 Flagged Answers</h2>
          <p className="text-sm text-gray-600">Review student responses</p>
        </Link>
        <Link href="/protected/teacher/analysis" className="p-4 border rounded hover:shadow-md transition cursor-pointer">
          <h2 className="font-semibold text-lg">📈 Analysis</h2>
          <p className="text-sm text-gray-600">Student performance insights</p>
        </Link>
      </div>
    </div>
  );
}
