"use client";

import { useState } from "react";

type RequestStatus = "pending" | "approved" | "rejected";

type StudentRequest = {
  id: string;
  student: string;
  requestedTeacher: string;
  status: RequestStatus;
};

const mockRequests: StudentRequest[] = [
  { id: "req1", student: "student@evalora.com", requestedTeacher: "teacher@evalora.com", status: "pending" },
];

export default function AdminRelationshipsPage() {
  const [requests, setRequests] = useState<StudentRequest[]>(mockRequests);

  const handleApprove = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "approved" as const } : r))
    );
  };

  const handleReject = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "rejected" as const } : r))
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold text-slate-900">Relationships</h2>
        <p className="mt-2 text-slate-600">Manage teacher-student assignments and requests.</p>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Student Requests</h3>
        <div className="mt-4 grid gap-3">
          {requests.map((req) => (
            <div key={req.id} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-900">{req.student}</p>
                  <p className="text-sm text-slate-600">Requesting: {req.requestedTeacher}</p>
                  <p className="text-xs mt-2 text-purple-700">Status: {req.status.toUpperCase()}</p>
                </div>
                {req.status === "pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(req.id)}
                      className="px-3 py-1 rounded-full bg-purple-600 text-white text-sm font-semibold hover:bg-purple-500"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(req.id)}
                      className="px-3 py-1 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 hover:border-slate-300"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Assign Teacher to Student</h3>
        <form className="mt-4 grid gap-4 max-w-xl">
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">Select Student</label>
            <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm">
              <option>student@evalora.com</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">Select Teacher</label>
            <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm">
              <option>teacher@evalora.com</option>
            </select>
          </div>
          <button type="button" className="px-4 py-2 rounded-full bg-purple-600 text-white text-sm font-semibold hover:bg-purple-500">
            Assign
          </button>
        </form>
      </section>
    </div>
  );
}
