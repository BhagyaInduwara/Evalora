"use client";

import { useEffect, useState } from "react";
import { getQuizzes, getPapers, Quiz, Paper } from "@/lib/mockData";

export default function StudentProgressPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [papers, setPapers] = useState<Paper[]>([]);

  useEffect(() => {
    setQuizzes(getQuizzes());
    setPapers(getPapers());
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Progress</h1>
      <p className="mt-2">Overview of recent attempts (mock data)</p>
      <div className="mt-4 grid gap-4">
        <section className="p-4 border rounded">
          <h2 className="font-semibold">Quizzes attempted</h2>
          <ul className="mt-2 list-disc pl-6">
            {quizzes.map((q: any) => (
              <li key={q.id}>{q.title}</li>
            ))}
          </ul>
        </section>
        <section className="p-4 border rounded">
          <h2 className="font-semibold">Papers attempted</h2>
          <ul className="mt-2 list-disc pl-6">
            {papers.map((p: any) => (
              <li key={p.id}>{p.title} — {p.term}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
