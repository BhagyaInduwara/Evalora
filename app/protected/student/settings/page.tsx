"use client";

import { useRouter } from "next/navigation";
import { logout, getCurrentUser } from "@/lib/mockAuth";

export default function StudentSettingsPage() {
  const router = useRouter();
  const user = typeof window !== "undefined" ? getCurrentUser() : null;

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="mt-6 grid gap-4">
        <section className="p-4 border rounded">
          <h2 className="font-semibold">Account Information</h2>
          <div className="mt-3 text-sm">
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> {user?.role}</p>
            <p><strong>Grade:</strong> {user?.grade || "Not specified"}</p>
          </div>
        </section>

        <section className="p-4 border rounded">
          <h2 className="font-semibold">Notifications</h2>
          <div className="mt-3">
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-2" />
              Email notifications for new assignments
            </label>
            <label className="flex items-center mt-2">
              <input type="checkbox" defaultChecked className="mr-2" />
              Quiz reminders
            </label>
          </div>
        </section>

        <section className="p-4 border rounded">
          <h2 className="font-semibold">Preferences</h2>
          <div className="mt-3">
            <label>
              Theme
              <select defaultValue="light" className="ml-2 border rounded px-2 py-1">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
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
