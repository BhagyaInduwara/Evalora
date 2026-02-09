"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout, getCurrentUser } from "@/lib/mockAuth";
import { getStudentStats } from "@/lib/mockData";
import { useState, useEffect } from "react";

export default function StudentPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState(getStudentStats());

  useEffect(() => {
    setUser(getCurrentUser());
    setStats(getStudentStats());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header with purple gradient background */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">Evalora</h1>
              <p className="text-purple-200 text-sm mt-1">Student Dashboard</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/protected/student/settings"
                className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition"
              >
                Settings
              </Link>
              <button
                onClick={() => {
                  logout();
                  router.push("/auth/login");
                }}
                className="px-4 py-2 bg-white text-purple-600 hover:bg-opacity-90 rounded-lg transition font-medium"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="flex gap-8 mt-6 text-sm font-medium">
            {["Dashboard", "Notes", "Quizzes", "Papers", "Progress", "Leaderboard"].map((item) => {
              const href = item === "Dashboard" ? "/protected/student" : `/protected/student/${item.toLowerCase()}`;
              return (
                <Link
                  key={item}
                  href={href}
                  className={`pb-2 border-b-2 transition ${
                    item === "Dashboard"
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
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome, {user?.email?.split("@")[0]}
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "Subjects Enrolled",
              value: stats.subjectsEnrolled,
              color: "blue",
            },
            {
              label: "Average Score",
              value: `${stats.averageScore}%`,
              color: "green",
            },
            {
              label: "Quizzes Completed",
              value: stats.quizzesCompleted,
              color: "purple",
            },
            {
              label: "Current Streak",
              value: `${stats.currentStreak} days`,
              color: "red",
            },
          ].map((stat) => {
            const colorClasses = {
              blue: "bg-blue-50 dark:bg-blue-900/20 border-blue-200",
              green: "bg-green-50 dark:bg-green-900/20 border-green-200",
              purple: "bg-purple-50 dark:bg-purple-900/20 border-purple-200",
              red: "bg-red-50 dark:bg-red-900/20 border-red-200",
            };
            const textColors = {
              blue: "text-blue-900 dark:text-blue-300",
              green: "text-green-900 dark:text-green-300",
              purple: "text-purple-900 dark:text-purple-300",
              red: "text-red-900 dark:text-red-300",
            };
            const valueColors = {
              blue: "text-blue-600 dark:text-blue-400",
              green: "text-green-600 dark:text-green-400",
              purple: "text-purple-600 dark:text-purple-400",
              red: "text-red-600 dark:text-red-400",
            };

            return (
              <div
                key={stat.label}
                className={`p-6 rounded-xl border ${colorClasses[stat.color as keyof typeof colorClasses]}`}
              >
                <p
                  className={`text-sm font-medium ${
                    textColors[stat.color as keyof typeof textColors]
                  }`}
                >
                  {stat.label}
                </p>
                <p
                  className={`text-3xl font-bold mt-2 ${
                    valueColors[stat.color as keyof typeof valueColors]
                  }`}
                >
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Recent Performance and Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Performance */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Recent Performance
            </h3>
            <div className="space-y-6">
              {stats.performance.map((perf) => (
                <div key={perf.subject}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {perf.subject}
                    </span>
                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                      {perf.score}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${perf.score}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {perf.quizzesTaken} quiz{perf.quizzesTaken !== 1 ? "zes" : ""} taken
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Achievements
            </h3>
            <div className="space-y-4">
              {stats.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-start gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800"
                >
                  <span className="text-3xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {achievement.title}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Quizzes */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Upcoming Quizzes
          </h3>
          <div className="space-y-3">
            {stats.upcomingQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200 dark:border-purple-800"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {quiz.subject}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {quiz.topic}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {new Date(quiz.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Quick Access
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                href: "/protected/student/notes",
                icon: "📚",
                title: "Notes",
                description: "Study materials",
              },
              {
                href: "/protected/student/quizzes",
                icon: "✏️",
                title: "Quizzes",
                description: "Test yourself",
              },
              {
                href: "/protected/student/papers",
                icon: "📰",
                title: "Papers",
                description: "Exam papers",
              },
              {
                href: "/protected/student/leaderboard",
                icon: "🏆",
                title: "Leaderboard",
                description: "Top performers",
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 hover:shadow-md dark:hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600 transition group"
              >
                <p className="text-3xl mb-2 group-hover:scale-110 transition">{link.icon}</p>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {link.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {link.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
