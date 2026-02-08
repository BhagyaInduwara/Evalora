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
    <div className="p-6">
      <h1 className="text-2xl font-bold">Relationships</h1>
      <p className="mt-2 text-gray-600">Manage teacher-student assignments and requests</p>
      
      <div className="mt-6">
        <h2 className="font-semibold text-lg mb-4">Student Requests</h2>
        <div className="grid gap-3">
          {requests.map((req) => (
            <div key={req.id} className="p-4 border rounded">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{req.student}</p>
                  <p className="text-sm text-gray-600">Requesting: {req.requestedTeacher}</p>
                  <p className={`text-xs mt-2 ${req.status === 'pending' ? 'text-yellow-600' : req.status === 'approved' ? 'text-green-600' : 'text-red-600'}`}>
                    Status: {req.status.toUpperCase()}
                  </p>
                </div>
                {req.status === "pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(req.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(req.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-semibold text-lg mb-4">Assign Teacher to Student</h2>
        <form className="max-w-lg grid gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Select Student</label>
            <select className="w-full border rounded px-3 py-2">
              <option>student@evalora.com</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Select Teacher</label>
            <select className="w-full border rounded px-3 py-2">
              <option>teacher@evalora.com</option>
            </select>
          </div>
          <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Assign
          </button>
        </form>
      </div>
    </div>
  );
}
