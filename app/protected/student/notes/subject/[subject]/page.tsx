"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getNotes, Note } from "@/lib/mockData";

export default function SubjectNotesPage() {
  const params = useParams();
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [subject, setSubject] = useState<string>("");

  useEffect(() => {
    const subjectName = decodeURIComponent(params.subject as string);
    setSubject(subjectName);

    const allNotes = getNotes();
    const filtered = allNotes.filter((n) => n.subject === subjectName);
    setNotes(filtered);
  }, [params.subject]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header with purple gradient background */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">Evalora</h1>
              <p className="text-purple-200 text-sm mt-1">Study Materials</p>
            </div>
            <Link
              href="/protected/student/notes"
              className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition"
            >
              ← Back to Subjects
            </Link>
          </div>

          {/* Navigation tabs */}
          <div className="flex gap-8 mt-6 text-sm font-medium">
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
        </div>
      </div>

      {/* Main content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {subject} Topics
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {notes.length} available topic{notes.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Topics List */}
        <div className="space-y-4">
          {notes.map((note) => (
            <Link
              key={note.id}
              href={`/protected/student/notes/${note.id}`}
              className="block p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 hover:shadow-lg dark:hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600 transition group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-2xl mb-2">📖</p>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">
                    {note.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    1 note • Latest: {note.author}
                  </p>
                </div>
                <div className="text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition text-2xl">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No topics message */}
        {notes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No topics available for {subject} yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
