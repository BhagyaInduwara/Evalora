"use client";

export default function AdminUsersPage() {
  const mock = [
    { email: "student@evalora.com", role: "student" },
    { email: "teacher@evalora.com", role: "teacher" },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-slate-900">Users</h2>
        <p className="mt-2 text-slate-600">Manage platform accounts and roles.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-3">
          {mock.map((user) => (
            <div key={user.email} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
              <div className="font-semibold text-slate-900">{user.email}</div>
              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                {user.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
