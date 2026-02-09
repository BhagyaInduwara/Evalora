"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getQuizzes, Quiz } from "@/lib/mockData";

export default function SubjectQuizzesPage() {
  const params = useParams();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [subject, setSubject] = useState<string>("");

  useEffect(() => {
    const subjectName = decodeURIComponent(params.subject as string);
    setSubject(subjectName);

    const allQuizzes = getQuizzes();
    const filtered = allQuizzes.filter(
      (q) => q.topic.split(" ")[0] === subjectName
    );
    setQuizzes(filtered);
  }, [params.subject]);

  const subjectEmojis: Record<string, string> = {
    Geography: "🌍",
    Ancient: "🏛️",
    Physics: "⚛️",
    Chemistry: "🧪",
    English: "📚",
    Biology: "🧬",
  };

  const emoji = subjectEmojis[subject] || "📝";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header with purple gradient background */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="w-full px-4 sm:px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">Evalora</h1>
              <p className="text-purple-200 text-sm mt-1">Quiz Center</p>
            </div>
            <Link
              href="/protected/student/quizzes"
              className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition"
            >
              ← Back to Subjects
            </Link>
          </div>

          {/* Navigation tabs */}
          <div className="flex gap-8 mt-6 text-sm font-medium">
            {["Dashboard", "Notes", "Quizzes", "Papers", "Progress", "Leaderboard"].map((item) => {
              const href = item === "Dashboard" ? "/protected/student" : item === "Quizzes" ? "/protected/student/quizzes" : `/protected/student/${item.toLowerCase()}`;
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
      <div className="w-full px-4 sm:px-6 py-8">
        <div className="mb-8 flex items-center gap-3">
          <span className="text-5xl">{emoji}</span>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {subject} Quizzes
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {quizzes.length} quiz{quizzes.length !== 1 ? "zes" : ""} available
            </p>
          </div>
        </div>

        {/* Quizzes List */}
        <div className="space-y-4">
          {quizzes.map((quiz) => (
            <Link
              key={quiz.id}
              href={`/protected/student/quizzes/${quiz.id}`}
              className="block p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 hover:shadow-lg dark:hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600 transition group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-2xl mb-2">✏️</p>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">
                    {quiz.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {quiz.questions.length} question{quiz.questions.length !== 1 ? "s" : ""} • Topic: {quiz.topic}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    By {quiz.author}
                  </p>
                </div>
                <div className="text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition text-2xl">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No quizzes message */}
        {quizzes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No quizzes available for {subject} yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
