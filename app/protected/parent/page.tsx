"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout, getCurrentUser } from "@/lib/mockAuth";

export default function ParentPage() {
  const router = useRouter();
  const user = typeof window !== "undefined" ? getCurrentUser() : null;

  return (
    <div className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Parent Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome, {user?.email}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/protected/parent/settings" className="px-3 py-2 border rounded hover:bg-gray-100">
            Settings
          </Link>
          <button
            onClick={() => {
              logout();
              router.push("/auth/login");
            }}
            className="px-3 py-2 border rounded hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="p-4 border rounded">
          <h2 className="font-semibold text-lg">👥 Child Accounts</h2>
          <p className="text-sm text-gray-600 mt-2">View linked student accounts and progress</p>
        </div>
        <div className="p-4 border rounded">
          <h2 className="font-semibold text-lg">📊 Performance Overview</h2>
          <p className="text-sm text-gray-600 mt-2">Monitor your child's academic progress</p>
        </div>
      </div>
    </div>
  );
}
