"use client";

import { useEffect, useState } from "react";
import { getPapers, Paper } from "@/lib/mockData";

export default function StudentPapersPage() {
  const [papers, setPapers] = useState<Paper[]>([]);

  useEffect(() => {
    setPapers(getPapers());
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Papers</h1>
      <p className="text-gray-600 mt-2">Select and attempt exam papers by term</p>
      <div className="mt-4 grid gap-4">
        {papers.map((p) => (
          <div key={p.id} className="p-4 border rounded hover:shadow-md transition">
            <h2 className="font-semibold">{p.title}</h2>
            <p className="text-sm text-gray-600">{p.term}</p>
            <div className="mt-2 text-sm line-clamp-2">{p.content}</div>
            <div className="mt-2 text-xs text-gray-500">By {p.author}</div>
            <div className="mt-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                Start Attempt
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
