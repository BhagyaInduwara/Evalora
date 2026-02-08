"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getNotes, Note } from "@/lib/mockData";

export default function NoteViewerPage() {
  const params = useParams();
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    const notes = getNotes();
    const found = notes.find((n) => n.id === params.id);
    setNote(found || null);
  }, [params.id]);

  if (!note) return <div className="p-6">Note not found</div>;

  return (
    <div className="p-6 max-w-3xl">
      <button onClick={() => router.back()} className="mb-4 text-blue-600 underline">
        ← Back to Notes
      </button>
      <h1 className="text-3xl font-bold">{note.title}</h1>
      <p className="text-sm text-gray-600 mt-1">
        Subject: {note.subject} | By: {note.author}
      </p>
      <p className="text-xs text-gray-500 mt-1">
        Visibility: {note.visibility === "admin" ? "All Students" : "Teacher-only"}
      </p>
      <div className="mt-6 border rounded p-6 bg-gray-50">
        <div className="prose">{note.content}</div>
      </div>
    </div>
  );
}
