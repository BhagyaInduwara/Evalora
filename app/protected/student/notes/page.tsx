"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getNotes, Note } from "@/lib/mockData";
import { useRouter } from "next/navigation";

export default function StudentNotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [subjectGroups, setSubjectGroups] = useState<Record<string, Note[]>>({});
  const router = useRouter();

  useEffect(() => {
    const allNotes = getNotes();
    setNotes(allNotes);

    // Group notes by subject
    const grouped = allNotes.reduce(
      (acc, note) => {
        if (!acc[note.subject]) {
          acc[note.subject] = [];
        }
        acc[note.subject].push(note);
        return acc;
      },
      {} as Record<string, Note[]>
    );

    setSubjectGroups(grouped);
  }, []);

  const subjects = Object.keys(subjectGroups);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header with purple gradient background */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">Evalora</h1>
              <p className="text-purple-200 text-sm mt-1">Student Study Notes</p>
            </div>
            <Link
              href="/protected/student"
              className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition"
            >
              ← Back to Dashboard
            </Link>
          </div>

          {/* Navigation tabs */}
          <div className="flex gap-8 mt-6 text-sm font-medium">
            {["Dashboard", "Notes", "Quizzes", "Papers", "Progress", "Leaderboard"].map((item) => {
              const href = item === "Dashboard" ? "/protected/student" : item === "Notes" ? "#" : `/protected/student/${item.toLowerCase()}`;
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Study Notes</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Access study materials organized by subject
          </p>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition"
            >
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 px-6 py-4 border-b border-gray-200 dark:border-slate-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {subject}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {subjectGroups[subject].length} topic{subjectGroups[subject].length !== 1 ? "s" : ""} available
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-3 mb-6">
                  {subjectGroups[subject].slice(0, 2).map((note) => (
                    <div
                      key={note.id}
                      className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-600"
                    >
                      <p className="font-medium text-sm text-gray-900 dark:text-white">
                        {note.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        1 note
                      </p>
                    </div>
                  ))}
                  {subjectGroups[subject].length > 2 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 px-3">
                      +{subjectGroups[subject].length - 2} more topic{subjectGroups[subject].length - 2 !== 1 ? "s" : ""}
                    </p>
                  )}
                </div>

                <Link
                  href={`/protected/student/notes/subject/${encodeURIComponent(subject)}`}
                  className="w-full block text-center py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg transition transform hover:scale-105"
                >
                  View All Topics
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No subjects message */}
        {subjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No notes available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
