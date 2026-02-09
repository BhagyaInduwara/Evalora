"use client";

import { useState } from "react";

const initialItems: Array<{
  id: string;
  student: string;
  answer: string;
  question: string;
  subject: string;
}> = [];

export default function TeacherFlaggedPage() {
  const [items] = useState(initialItems);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold text-slate-900">Review Flagged Answers</h2>
        <p className="mt-2 text-slate-600">
          Review student answers that were flagged for manual grading.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M5 4h10l4 4v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
              <path d="M9 12h6" />
              <path d="M9 16h4" />
            </svg>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-slate-900">No Flagged Answers</h3>
          <p className="mt-2 text-sm text-slate-600">
            When students flag answers for review, they will appear here for grading.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.student}</p>
                  <p className="text-xs text-slate-500">{item.subject}</p>
                  <p className="mt-3 text-sm text-slate-700">Question: {item.question}</p>
                </div>
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                  Pending
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-600">{item.answer}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-500">
                  Approve
                </button>
                <button className="rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-700 hover:border-rose-300">
                  Request resubmit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
