"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPapers, Paper } from "@/lib/mockData";

export default function TermPapersPage() {
  const params = useParams();
  const [papers, setPapers] = useState<Paper[]>([]);
  const [subject, setSubject] = useState<string>("");
  const [term, setTerm] = useState<string>("");

  useEffect(() => {
    const subjectName = decodeURIComponent(params.subject as string);
    const termName = decodeURIComponent(params.term as string);
    setSubject(subjectName);
    setTerm(termName);

    const allPapers = getPapers();
    const filtered = allPapers.filter(
      (p) => p.subject === subjectName && p.term === termName
    );
    setPapers(filtered);
  }, [params.subject, params.term]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header with purple gradient background */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="w-full px-4 sm:px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">Evalora</h1>
              <p className="text-purple-200 text-sm mt-1">Exam Papers</p>
            </div>
            <Link
              href="/protected/student/papers"
              className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition"
            >
              ← Back to Subjects
            </Link>
          </div>

          {/* Navigation tabs */}
          <div className="flex gap-8 mt-6 text-sm font-medium">
            {["Dashboard", "Notes", "Quizzes", "Papers", "Progress", "Leaderboard"].map((item) => {
              const href = item === "Dashboard" ? "/protected/student" : item === "Papers" ? "/protected/student/papers" : `/protected/student/${item.toLowerCase()}`;
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
      <div className="w-full px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {term} Papers
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {subject} • {papers.length} paper{papers.length !== 1 ? "s" : ""} available
          </p>
        </div>

        {/* Papers Grid */}
        <div className="space-y-4">
          {papers.map((paper) => (
            <Link
              key={paper.id}
              href={`/protected/student/papers/${paper.id}`}
              className="block p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 hover:shadow-lg dark:hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600 transition group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition mb-2">
                    {paper.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <span>📋 {paper.marks} marks</span>
                    <span>⏱️ {paper.duration} mins</span>
                    <span>✅ Pass: {paper.passPercentage}%</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {paper.questionTypes.join(" • ")}
                  </p>
                </div>
                <div className="text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition text-2xl">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No papers message */}
        {papers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No papers available for {term} {subject} yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
