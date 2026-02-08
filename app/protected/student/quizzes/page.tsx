"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getQuizzes, Quiz } from "@/lib/mockData";

export default function StudentQuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    setQuizzes(getQuizzes());
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Quizzes</h1>
      <div className="mt-4">
        <div className="mb-6 flex gap-2">
          <button className="px-3 py-2 border rounded hover:bg-gray-100">Random Quiz</button>
          <button className="px-3 py-2 border rounded hover:bg-gray-100">By Topic</button>
        </div>
        <div className="grid gap-4">
          {quizzes.map((q) => (
            <Link
              key={q.id}
              href={`/protected/student/quizzes/${q.id}`}
              className="p-4 border rounded hover:shadow-md transition cursor-pointer"
            >
              <h2 className="font-semibold">{q.title}</h2>
              <p className="text-sm text-gray-600">Topic: {q.topic}</p>
              <div className="text-xs text-gray-500 mt-2">By {q.author}</div>
              <div className="mt-2 text-xs text-blue-600">Click to attempt →</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
