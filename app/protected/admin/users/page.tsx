"use client";

export default function AdminUsersPage() {
  const mock = [
    { email: "student@evalora.com", role: "student" },
    { email: "teacher@evalora.com", role: "teacher" },
  ];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Users</h1>
      <div className="mt-4 grid gap-2 max-w-lg">
        {mock.map((u) => (
          <div key={u.email} className="p-3 border rounded flex justify-between">
            <div>{u.email}</div>
            <div className="text-sm text-gray-600">{u.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
