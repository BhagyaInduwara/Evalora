"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getQuizzes, Quiz } from "@/lib/mockData";

export default function StudentQuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [subjectGroups, setSubjectGroups] = useState<Record<string, Quiz[]>>({});

  useEffect(() => {
    const allQuizzes = getQuizzes();
    setQuizzes(allQuizzes);

    // Group quizzes by subject
    const grouped = allQuizzes.reduce(
      (acc, quiz) => {
        // Determine subject from quiz topic
        const subject = quiz.topic.split(" ")[0];
        if (!acc[subject]) {
          acc[subject] = [];
        }
        acc[subject].push(quiz);
        return acc;
      },
      {} as Record<string, Quiz[]>
    );

    setSubjectGroups(grouped);
  }, []);

  const subjects = Object.keys(subjectGroups).sort();
  const subjectEmojis: Record<string, string> = {
    Geography: "🌍",
    Ancient: "🏛️",
    Physics: "⚛️",
    Chemistry: "🧪",
    English: "📚",
    Biology: "🧬",
  };

  const subjectColors: Record<string, string> = {
    Geography: "from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30",
    Ancient: "from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30",
    Physics: "from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30",
    Chemistry: "from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30",
    English: "from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30",
    Biology: "from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30",
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header with purple gradient background */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">Evalora</h1>
              <p className="text-purple-200 text-sm mt-1">Quiz Center</p>
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
              const href = item === "Dashboard" ? "/protected/student" : item === "Quizzes" ? "#" : `/protected/student/${item.toLowerCase()}`;
              return (
                <Link
                  key={item}
                  href={href}
                  className={`pb-2 border-b-2 transition ${
                    item === "Quizzes"
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Quizzes</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Test your knowledge across all subjects
          </p>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subjects.map((subject) => {
            const emoji = subjectEmojis[subject] || "📝";
            const colorClass = subjectColors[subject] || "from-gray-100 to-gray-200 dark:from-gray-900/30 dark:to-gray-900/30";

            return (
              <div
                key={subject}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition"
              >
                <div className={`bg-gradient-to-r ${colorClass} px-6 py-4 border-b border-gray-200 dark:border-slate-700`}>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{emoji}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {subject}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {subjectGroups[subject].length} quiz{subjectGroups[subject].length !== 1 ? "zes" : ""} available
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    {subjectGroups[subject].slice(0, 1).map((quiz) => (
                      <div
                        key={quiz.id}
                        className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-600"
                      >
                        <p className="font-medium text-sm text-gray-900 dark:text-white">
                          {quiz.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {quiz.questions.length} question{quiz.questions.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg transition transform hover:scale-105">
                      Random Quiz
                    </button>
                    <Link
                      href={`/protected/student/quizzes/subject/${encodeURIComponent(subject)}`}
                      className="w-full block text-center py-3 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-900 dark:text-white font-semibold rounded-lg transition"
                    >
                      By Topic
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No subjects message */}
        {subjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No quizzes available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
