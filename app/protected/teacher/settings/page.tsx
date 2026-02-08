"use client";

import { useRouter } from "next/navigation";
import { logout, getCurrentUser } from "@/lib/mockAuth";

export default function TeacherSettingsPage() {
  const router = useRouter();
  const user = typeof window !== "undefined" ? getCurrentUser() : null;

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold">Teacher Settings</h1>
      <div className="mt-6 grid gap-4">
        <section className="p-4 border rounded">
          <h2 className="font-semibold">Account Information</h2>
          <div className="mt-3 text-sm">
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> {user?.role}</p>
          </div>
        </section>

        <section className="p-4 border rounded">
          <h2 className="font-semibold">Class Management</h2>
          <div className="mt-3 text-sm">
            <p>Manage your classes and students here (placeholder)</p>
          </div>
        </section>

        <section className="p-4 border rounded">
          <h2 className="font-semibold">Notifications</h2>
          <div className="mt-3">
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-2" />
              Student submission alerts
            </label>
          </div>
        </section>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => {
              logout();
              router.push("/auth/login");
            }}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
          <button onClick={() => router.back()} className="px-4 py-2 border rounded">
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
