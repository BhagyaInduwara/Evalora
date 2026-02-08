"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getNotes, Note } from "@/lib/mockData";

export default function StudentNotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    setNotes(getNotes());
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Notes</h1>
      <div className="mt-4 grid gap-4">
        {notes.map((n) => (
          <Link
            key={n.id}
            href={`/protected/student/notes/${n.id}`}
            className="p-4 border rounded hover:shadow-md transition cursor-pointer"
          >
            <h2 className="font-semibold">{n.title}</h2>
            <p className="text-sm text-gray-600">{n.subject}</p>
            <div className="mt-2 text-sm line-clamp-2">{n.content}</div>
            <div className="mt-2 text-xs text-gray-500">By {n.author}</div>
            <div className="mt-2 text-xs text-blue-600">Click to read →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
