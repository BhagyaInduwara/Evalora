"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/mockAuth";

type NotificationState = {
  submissions: boolean;
  weeklyDigest: boolean;
  flaggedAlerts: boolean;
  parentMessages: boolean;
};

export default function TeacherSettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [notifications, setNotifications] = useState<NotificationState>({
    submissions: true,
    weeklyDigest: true,
    flaggedAlerts: true,
    parentMessages: false,
  });

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleNotificationChange = (key: keyof NotificationState) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold text-slate-900">Settings</h2>
        <p className="mt-2 text-slate-600">Manage your profile, classes, and preferences.</p>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Profile</h3>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-600">Full Name</label>
            <input
              defaultValue={user?.email?.split("@")[0] || "Teacher"}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-purple-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-600">Email Address</label>
            <input
              defaultValue={user?.email}
              disabled
              className="mt-2 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-400"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-600">Role</label>
            <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
              {user?.role || "Teacher"}
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-600">Primary Subject</label>
            <input
              defaultValue="Mathematics"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-purple-400 focus:outline-none"
            />
          </div>
        </div>
        <button className="mt-6 rounded-full bg-purple-700 px-5 py-2 text-sm font-semibold text-white hover:bg-purple-600">
          Save profile
        </button>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Class Preferences</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Default grading window: 5 days
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Auto-release feedback: Enabled
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Parent summaries: Weekly
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Attendance sync: Manual
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Notifications</h3>
        <p className="mt-2 text-sm text-slate-600">Choose which updates you receive.</p>
        <div className="mt-4 space-y-4">
          {[
            {
              key: "submissions",
              label: "Student submissions",
              desc: "Get alerted when a student submits new work.",
            },
            {
              key: "weeklyDigest",
              label: "Weekly digest",
              desc: "Summary of class performance and engagement.",
            },
            {
              key: "flaggedAlerts",
              label: "Flagged answer alerts",
              desc: "Notifications when answers need manual review.",
            },
            {
              key: "parentMessages",
              label: "Parent messages",
              desc: "Alerts for messages from parents and guardians.",
            },
          ].map((pref) => (
            <div
              key={pref.key}
              className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold text-slate-700">{pref.label}</p>
                <p className="text-xs text-slate-500">{pref.desc}</p>
              </div>
              <button
                onClick={() => handleNotificationChange(pref.key as keyof NotificationState)}
                className={`h-6 w-11 rounded-full p-1 transition ${
                  notifications[pref.key as keyof NotificationState]
                    ? "bg-purple-500"
                    : "bg-slate-300"
                }`}
              >
                <span
                  className={`block h-4 w-4 rounded-full bg-white transition ${
                    notifications[pref.key as keyof NotificationState] ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Security</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <button className="rounded-xl border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:border-sky-300">
            Change password
          </button>
          <button className="rounded-xl border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:border-sky-300">
            Manage devices
          </button>
          <button className="rounded-xl border border-rose-200 px-4 py-3 text-left text-sm font-semibold text-rose-600 hover:border-rose-300">
            Disable account
          </button>
        </div>
      </section>
    </div>
  );
}
