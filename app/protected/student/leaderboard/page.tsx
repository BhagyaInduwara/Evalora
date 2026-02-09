"use client";

import Link from "next/link";
import { useState } from "react";

const mockLeaderboard = [
  { id: 1, name: "Sarah Chen", rank: 1, points: 2850, badge: "🏆", trend: "+15%" },
  { id: 2, name: "Alex Johnson", rank: 2, points: 2720, badge: "🥈", trend: "+8%" },
  { id: 3, name: "Michael Brown", rank: 3, points: 2680, badge: "🥉", trend: "+3%" },
  { id: 4, name: "Emma Wilson", rank: 4, points: 2540, badge: "4", trend: "+12%" },
  { id: 5, name: "David Lee", rank: 5, points: 2430, badge: "5", trend: "-2%" },
  { id: 6, name: "Jessica Garcia", rank: 6, points: 2380, badge: "6", trend: "+6%" },
  { id: 7, name: "James Martinez", rank: 7, points: 2290, badge: "7", trend: "+4%" },
  { id: 8, name: "Lisa Wong", rank: 8, points: 2150, badge: "8", trend: "-5%" },
  { id: 9, name: "Ryan O'Brien", rank: 9, points: 2020, badge: "9", trend: "+11%" },
  { id: 10, name: "Rachel Green", rank: 10, points: 1950, badge: "10", trend: "+2%" },
];

const currentUserRank = 2;
const currentUserPoints = 2720;
const topPoints = mockLeaderboard[0].points;

export default function StudentLeaderboardPage() {
  const [filterPeriod, setFilterPeriod] = useState("month");

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "from-yellow-300 to-yellow-400 text-yellow-900";
    if (rank === 2) return "from-gray-300 to-gray-400 text-gray-900";
    if (rank === 3) return "from-orange-400 to-orange-500 text-white";
    return "from-purple-100 to-purple-200 text-purple-900";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header with purple gradient background */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="w-full px-4 sm:px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">Evalora</h1>
              <p className="text-purple-200 text-sm mt-1">Leaderboard</p>
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
              const href = item === "Dashboard" ? "/protected/student" : item === "Leaderboard" ? "#" : `/protected/student/${item.toLowerCase()}`;
              return (
                <Link
                  key={item}
                  href={href}
                  className={`pb-2 border-b-2 transition ${
                    item === "Leaderboard"
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
        {/* Filter Section */}
        <div className="mb-8 flex items-center gap-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Top Performers</h2>
          <div className="flex gap-2 ml-auto">
            {["week", "month", "year"].map((period) => (
              <button
                key={period}
                onClick={() => setFilterPeriod(period)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterPeriod === period
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white"
                    : "bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600"
                }`}
              >
                This {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Leaderboard Cards */}
        <div className="space-y-3 mb-8">
          {mockLeaderboard.map((player, index) => (
            <div
              key={player.id}
              className={`rounded-xl border transition transform hover:scale-101 ${
                player.rank === currentUserRank
                  ? "bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-300 dark:border-purple-600 ring-2 ring-purple-400"
                  : "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:shadow-md"
              }`}
            >
              <div className="p-6 flex items-center gap-4">
                {/* Rank Badge */}
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${getRankBadgeColor(player.rank)} flex items-center justify-center font-bold text-lg flex-shrink-0`}>
                  {player.badge}
                </div>

                {/* Player Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {player.name}
                    </h3>
                    {player.rank === currentUserRank && (
                      <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full font-semibold">
                        You
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Rank #{player.rank}
                  </p>
                </div>

                {/* Points and Trend */}
                <div className="text-right flex-shrink-0">
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {player.points.toLocaleString()}
                  </p>
                  <p className={`text-sm font-semibold mt-1 ${
                    player.trend.startsWith("+")
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}>
                    {player.trend}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Player Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Your Rank */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-900/50 flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Your Position</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">Top 10%</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Rank #{currentUserRank}</p>
              </div>
            </div>
          </div>

          {/* Rank Change */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-900/50 flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Rank Change</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">+5</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">This month</p>
              </div>
            </div>
          </div>

          {/* Points to Top */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-900/50 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Points to Top 5</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-1">250</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Keep learning!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress to Next Rank */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-8 mt-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Progress to Next Rank</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-900 dark:text-white">Current: #{currentUserRank}</span>
                <span className="font-semibold text-gray-900 dark:text-white">Target: #1</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-full rounded-full"
                  style={{ width: `${(currentUserPoints / topPoints) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {currentUserPoints.toLocaleString()} / {topPoints.toLocaleString()} points
              </p>
            </div>
          </div>

          {/* Achievement Section */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-slate-700">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Achievements</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "⭐", label: "Rising Star", desc: "Gain 100+ points" },
                { icon: "🔥", label: "On Fire", desc: "5-day streak" },
                { icon: "💪", label: "Consistent", desc: "30 days active" },
                { icon: "🎓", label: "Scholar", desc: "Master 10 topics" },
              ].map((achievement, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 text-center"
                >
                  <p className="text-3xl mb-2">{achievement.icon}</p>
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">{achievement.label}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{achievement.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
