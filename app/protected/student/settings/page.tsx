"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logout, getCurrentUser } from "@/lib/mockAuth";

export default function StudentSettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState({
    assignments: true,
    quizReminders: true,
    newNotes: true,
    weeklyReport: true,
  });

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleNotificationChange = (key: string) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header with purple gradient background */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="w-full px-4 sm:px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">Evalora</h1>
              <p className="text-purple-200 text-sm mt-1">Settings</p>
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
              const href = item === "Dashboard" ? "/protected/student" : `/protected/student/${item.toLowerCase()}`;
              return (
                <Link
                  key={item}
                  href={href}
                  className="pb-2 border-b-2 border-transparent text-purple-200 hover:text-white transition"
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
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Account Settings</h2>

        {/* Profile Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-8 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                defaultValue={user?.email?.split("@")[0] || "Student"}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                defaultValue={user?.email}
                disabled
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-gray-400 cursor-not-allowed opacity-70"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Role
              </label>
              <div className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-600">
                {user?.role || "Student"}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Grade
              </label>
              <input
                type="text"
                defaultValue={user?.grade || "Grade 10"}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <button className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg transition">
            Save Changes
          </button>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-8 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Notifications</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Manage how you receive updates</p>
          <div className="space-y-4">
            {[
              {
                key: "assignments",
                label: "Assignment Notifications",
                desc: "Get notified when new assignments are posted",
              },
              {
                key: "quizReminders",
                label: "Quiz Reminders",
                desc: "Receive reminders before quiz deadlines",
              },
              {
                key: "newNotes",
                label: "New Study Materials",
                desc: "Get notified when new notes and resources are available",
              },
              {
                key: "weeklyReport",
                label: "Weekly Progress Report",
                desc: "Receive your weekly learning progress summary",
              },
            ].map((pref) => (
              <div key={pref.key} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white">{pref.label}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{pref.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4 flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={notifications[pref.key as keyof typeof notifications]}
                    onChange={() => handleNotificationChange(pref.key)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Display & Theme */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-8 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Display & Theme</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Theme Preference
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "light", label: "☀️ Light", color: "from-yellow-100 to-orange-100" },
                  { value: "dark", label: "🌙 Dark", color: "from-slate-800 to-slate-900" },
                  { value: "auto", label: "🔄 Auto", color: "from-purple-100 to-blue-100" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTheme(option.value)}
                    className={`p-4 rounded-lg border-2 transition font-medium ${
                      theme === option.value
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                        : "border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white hover:border-purple-300 dark:hover:border-purple-600"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Text Size
              </label>
              <div className="flex gap-3">
                {["Small", "Normal", "Large"].map((size) => (
                  <button
                    key={size}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 hover:border-purple-500 dark:hover:border-purple-500 text-gray-900 dark:text-white hover:bg-purple-50 dark:hover:bg-purple-900/20 transition"
                  >
                    {size === "Small" ? "A" : size === "Normal" ? "A" : "A"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-8 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Privacy & Security</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 transition border border-gray-200 dark:border-slate-600">
              <div className="text-left">
                <p className="font-semibold text-gray-900 dark:text-white">Change Password</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Update your password</p>
              </div>
              <span className="text-xl">→</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 transition border border-gray-200 dark:border-slate-600">
              <div className="text-left">
                <p className="font-semibold text-gray-900 dark:text-white">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Add an extra layer of security</p>
              </div>
              <span className="text-xl">→</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 transition border border-gray-200 dark:border-slate-600">
              <div className="text-left">
                <p className="font-semibold text-gray-900 dark:text-white">Login History</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">View your recent login activity</p>
              </div>
              <span className="text-xl">→</span>
            </button>
          </div>
        </div>

        {/* Learning Preferences */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-8 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Learning Preferences</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Difficulty Level
              </label>
              <select defaultValue="intermediate" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Preferred Study Time
              </label>
              <select defaultValue="afternoon" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="morning">Morning (6 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (12 PM - 6 PM)</option>
                <option value="evening">Evening (6 PM - 12 AM)</option>
                <option value="night">Night (12 AM - 6 AM)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl border-2 border-red-200 dark:border-red-800 p-8 mb-6">
          <h3 className="text-2xl font-bold text-red-900 dark:text-red-300 mb-6">Danger Zone</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-white dark:bg-slate-800 border border-red-200 dark:border-red-800">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Logout</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Sign out from this device</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
              >
                Logout
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-white dark:bg-slate-800 border border-red-200 dark:border-red-800">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Delete Account</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Permanently delete your account and all data</p>
              </div>
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
