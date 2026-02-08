"use client";

import { useState } from "react";

const initial = [
  { id: "f1", student: "student@evalora.com", answer: "Answer text...", question: "Q1" },
];

export default function TeacherFlaggedPage() {
  const [items] = useState(initial);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Flagged Answers</h1>
      <p className="mt-2">Teacher review of flagged student answers (placeholder)</p>
      <div className="mt-4 grid gap-3">
        {items.map((it) => (
          <div key={it.id} className="p-3 border rounded">
            <div className="font-semibold">{it.student}</div>
            <div className="text-sm">Question: {it.question}</div>
            <div className="mt-2">{it.answer}</div>
            <div className="mt-2">
              <button className="px-2 py-1 border rounded mr-2">Approve</button>
              <button className="px-2 py-1 border rounded">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
