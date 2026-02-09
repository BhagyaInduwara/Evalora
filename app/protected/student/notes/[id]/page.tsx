"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getNotes, Note } from "@/lib/mockData";
import Link from "next/link";

export default function NoteViewerPage() {
  const params = useParams();
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    const notes = getNotes();
    const found = notes.find((n) => n.id === params.id);
    setNote(found || null);
  }, [params.id]);

  if (!note)
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Note not found</p>
          <Link
            href="/protected/student/notes"
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 underline"
          >
            Back to Notes
          </Link>
            {["Dashboard", "Notes", "Quizzes", "Papers", "Progress", "Leaderboard"].map((item) => {
              const href = item === "Dashboard" ? "/protected/student" : item === "Notes" ? "/protected/student/notes" : `/protected/student/${item.toLowerCase()}`;
              return (
                <Link
                  key={item}
                  href={href}
                  className={`pb-2 border-b-2 transition ${
                    item === "Notes"
                      ? "border-white text-white"
                      : "border-transparent text-purple-200 hover:text-white"
                  }`}
                >
                  {item}
                </Link>
              );
            })}
          </div>

          {/* Navigation tabs */}
          <div className="flex gap-8 mt-6 text-sm font-medium">
            {["Dashboard", "Notes", "Quizzes", "Papers", "Progress", "Leaderboard"].map((item) => (
              <a
                key={item}
                href={item === "Notes" ? "/protected/student/notes" : `/protected/student/${item.toLowerCase()}`}
                className={`pb-2 border-b-2 transition ${
                  item === "Notes"
                    ? "border-white text-white"
                    : "border-transparent text-purple-200 hover:text-white"
                }`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Note Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-4xl mb-3">📖</div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                {note.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-2">
                  <span className="font-medium">By</span>
                  <span className="text-gray-900 dark:text-white font-semibold">
                    {note.author}
                  </span>
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-900 dark:text-white font-semibold">
                  {note.subject}
                </span>
              </div>
            </div>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
            >
              ✕
            </button>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-slate-700">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">SUBJECT</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                {note.subject}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">VISIBILITY</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                {note.visibility === "admin" ? "All Students" : "Teacher Only"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">AUTHOR</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                {note.author}
              </p>
            </div>
          </div>
        </div>

        {/* Note Content */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-8 prose dark:prose-invert max-w-none">
          <div
            className="text-gray-900 dark:text-gray-100 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: note.content
                .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mb-4 mt-6">$1</h1>')
                .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold mb-3 mt-5">$1</h2>')
                .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mb-2 mt-4">$1</h3>')
                .replace(/^- (.+)$/gm, '<li class="ml-5 mb-1">$1</li>')
                .replace(/(<li.+<\/li>)/s, '<ul class="space-y-2 mb-4">$1</ul>')
                .replace(/\n\n/g, '</p><p class="mb-4">'),
            }}
          />
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex gap-3 justify-center">
          <Link
            href={`/protected/student/notes/subject/${encodeURIComponent(note.subject)}`}
            className="px-6 py-2 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-600 hover:from-gray-300 hover:to-gray-400 text-gray-900 dark:text-white font-semibold rounded-lg transition"
          >
            ← Back to {note.subject}
          </Link>
          <Link
            href="/protected/student/notes"
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg transition"
          >
            All Subjects
          </Link>
        </div>
      </div>
    </div>
  );
}
