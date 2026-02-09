"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/mockAuth";

export default function ParentSettingsPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold text-slate-900">Settings</h2>
        <p className="mt-2 text-slate-600">Manage your account and child profiles.</p>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Account Information</h3>
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-600">Full Name</label>
            <input
              defaultValue={user?.email?.split("@")[0] || "Parent"}
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
              {user?.role || "Parent"}
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-600">Preferred Contact</label>
            <input
              defaultValue="Email"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-purple-400 focus:outline-none"
            />
          </div>
        </div>
        <button className="mt-6 rounded-full bg-purple-700 px-5 py-2 text-sm font-semibold text-white hover:bg-purple-600">
          Save changes
        </button>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Child Accounts</h3>
        <p className="mt-2 text-sm text-slate-600">View and manage linked student accounts.</p>
        <div className="mt-4 space-y-3">
          <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Student: grade 11, active
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Student: grade 9, active
          </div>
        </div>
      </section>
    </div>
  );
}
