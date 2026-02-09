"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getQuizzes, getPapers, Quiz, Paper } from "@/lib/mockData";

export default function StudentProgressPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [papers, setPapers] = useState<Paper[]>([]);

  useEffect(() => {
    setQuizzes(getQuizzes());
    setPapers(getPapers());
  }, []);

  // Mock subject performance data
  const subjectPerformance = [
    { name: "Mathematics", score: 85, trend: "↑ +5%" },
    { name: "Physics", score: 92, trend: "↑ +3%" },
    { name: "Chemistry", score: 78, trend: "↓ -2%" },
    { name: "English", score: 88, trend: "→ 0%" },
    { name: "Biology", score: 81, trend: "↑ +6%" },
    { name: "Geography", score: 79, trend: "↑ +4%" },
  ];

  const weeklyData = [
    { week: "Week 1", quizzes: 2, papers: 1, avgScore: 82 },
    { week: "Week 2", quizzes: 3, papers: 1, avgScore: 85 },
    { week: "Week 3", quizzes: 2, papers: 2, avgScore: 87 },
    { week: "Week 4", quizzes: 4, papers: 1, avgScore: 84 },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600 dark:text-green-400";
    if (score >= 75) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getProgressBarColor = (score: number) => {
    if (score >= 85) return "bg-green-500";
    if (score >= 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header with purple gradient background */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">Evalora</h1>
              <p className="text-purple-200 text-sm mt-1">Your Progress</p>
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
              const href = item === "Dashboard" ? "/protected/student" : item === "Progress" ? "#" : `/protected/student/${item.toLowerCase()}`;
              return (
                <Link
                  key={item}
                  href={href}
                  className={`pb-2 border-b-2 transition ${
                    item === "Progress"
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Learning Progress</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track your academic performance across all subjects
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="p-6 rounded-xl border bg-blue-50 dark:bg-blue-900/20 border-blue-200">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-300">Quizzes Completed</p>
            <p className="text-3xl font-bold mt-2 text-blue-600 dark:text-blue-400">{quizzes.length}</p>
          </div>
          <div className="p-6 rounded-xl border bg-purple-50 dark:bg-purple-900/20 border-purple-200">
            <p className="text-sm font-medium text-purple-900 dark:text-purple-300">Papers Attempted</p>
            <p className="text-3xl font-bold mt-2 text-purple-600 dark:text-purple-400">{papers.length}</p>
          </div>
          <div className="p-6 rounded-xl border bg-green-50 dark:bg-green-900/20 border-green-200">
            <p className="text-sm font-medium text-green-900 dark:text-green-300">Avg. Score</p>
            <p className="text-3xl font-bold mt-2 text-green-600 dark:text-green-400">85%</p>
          </div>
          <div className="p-6 rounded-xl border bg-orange-50 dark:bg-orange-900/20 border-orange-200">
            <p className="text-sm font-medium text-orange-900 dark:text-orange-300">Consistency</p>
            <p className="text-3xl font-bold mt-2 text-orange-600 dark:text-orange-400">4 weeks</p>
          </div>
        </div>

        {/* Performance Over Time */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Performance Over Time</h3>
          <div className="space-y-6">
            {weeklyData.map((week) => (
              <div key={week.week} className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900 dark:text-white">{week.week}</span>
                  <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>📝 {week.quizzes} quiz{week.quizzes !== 1 ? "zes" : ""}</span>
                    <span>📄 {week.papers} paper{week.papers !== 1 ? "s" : ""}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">Avg: {week.avgScore}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-full rounded-full"
                    style={{ width: `${week.avgScore}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Subject Performance Cards */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Subject Breakdown</h3>
            <div className="space-y-4">
              {subjectPerformance.map((subject) => (
                <div key={subject.name} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900 dark:text-white">{subject.name}</span>
                    <div className="flex gap-2 items-center">
                      <span className={`text-lg font-bold ${getScoreColor(subject.score)}`}>{subject.score}%</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{subject.trend}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`${getProgressBarColor(subject.score)} h-full rounded-full transition-all`}
                      style={{ width: `${subject.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Summary */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Activity Summary</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-900 dark:text-blue-300 mb-1">Total Learning Hours</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">24.5 hrs</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">+2.3 hrs this week</p>
              </div>

              <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                <p className="text-sm text-purple-900 dark:text-purple-300 mb-1">Streak</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">5 days 🔥</p>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">Keep it up!</p>
              </div>

              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <p className="text-sm text-green-900 dark:text-green-300 mb-1">Topics Mastered</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">12</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-2">Topics with 80%+ score</p>
              </div>

              <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                <p className="text-sm text-orange-900 dark:text-orange-300 mb-1">Next Goal</p>
                <p className="text-lg font-bold text-orange-600 dark:text-orange-400">Chemistry: 85%</p>
                <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">Current: 78% (7% to go)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-8 mt-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { type: "quiz", title: "Physics Quiz", date: "Today", score: "92%" },
              { type: "paper", title: "Mathematics Paper", date: "Yesterday", score: "88%" },
              { type: "quiz", title: "Chemistry Quiz", date: "2 days ago", score: "76%" },
              { type: "notes", title: "Completed Geography Notes", date: "3 days ago", action: "Viewed" },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 transition">
                <div className="text-2xl">{activity.type === "quiz" ? "✏️" : activity.type === "paper" ? "📄" : "📝"}</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white">{activity.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">{activity.score || activity.action || "—"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
