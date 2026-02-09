"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getPapers, Paper } from "@/lib/mockData";

export default function StudentPapersPage() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [subjectGroups, setSubjectGroups] = useState<Record<string, Record<string, Paper[]>>>({});

  useEffect(() => {
    const allPapers = getPapers();
    setPapers(allPapers);

    // Group papers by subject and term
    const grouped = allPapers.reduce(
      (acc, paper) => {
        if (!acc[paper.subject]) {
          acc[paper.subject] = {};
        }
        if (!acc[paper.subject][paper.term]) {
          acc[paper.subject][paper.term] = [];
        }
        acc[paper.subject][paper.term].push(paper);
        return acc;
      },
      {} as Record<string, Record<string, Paper[]>>
    );

    setSubjectGroups(grouped);
  }, []);

  const subjects = Object.keys(subjectGroups).sort();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header with purple gradient background */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">Evalora</h1>
              <p className="text-purple-200 text-sm mt-1">Past Papers</p>
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
              const href = item === "Dashboard" ? "/protected/student" : item === "Papers" ? "#" : `/protected/student/${item.toLowerCase()}`;
              return (
                <Link
                  key={item}
                  href={href}
                  className={`pb-2 border-b-2 transition ${
                    item === "Papers"
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Past Papers</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Select papers to review and practice
          </p>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subjects.map((subject) => {
            const terms = Object.keys(subjectGroups[subject]).sort().reverse();

            return (
              <div
                key={subject}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition"
              >
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 px-6 py-4 border-b border-gray-200 dark:border-slate-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {subject}
                  </h3>
                </div>

                <div className="p-6">
                  <div className="space-y-3">
                    {terms.map((term) => (
                      <div
                        key={term}
                        className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-600 hover:border-purple-300 dark:hover:border-purple-600 transition"
                      >
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {term}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {subjectGroups[subject][term].length} paper{subjectGroups[subject][term].length !== 1 ? "s" : ""} available
                        </p>
                        <Link
                          href={`/protected/student/papers/subject/${encodeURIComponent(subject)}/term/${encodeURIComponent(term)}`}
                          className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium mt-3 inline-block transition"
                        >
                          View Papers →
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No subjects message */}
        {subjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No papers available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
